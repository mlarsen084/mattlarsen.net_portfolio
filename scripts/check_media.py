#!/usr/bin/env python3
"""Validate content contracts and ensure referenced files exist."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / 'content'
PUBLIC = ROOT / 'public'


def load_json(path: Path):
    with path.open('r', encoding='utf-8') as f:
        return json.load(f)


def parse_frontmatter(md_text: str) -> dict:
    if not md_text.startswith('---\n'):
        return {}
    end = md_text.find('\n---\n', 4)
    if end == -1:
        return {}

    lines = md_text[4:end].splitlines()
    data: dict = {}
    current: str | None = None

    for line in lines:
        if line.strip().startswith('- ') and current:
            data.setdefault(current, [])
            data[current].append(line.strip()[2:].strip().strip('"'))
            continue

        current = None
        if ':' not in line:
            continue
        key, raw = line.split(':', 1)
        key = key.strip()
        value = raw.strip()

        if value == '':
            data[key] = []
            current = key
            continue

        if value in {'true', 'false'}:
            data[key] = value == 'true'
            continue

        data[key] = value.strip('"')

    return data


def resolve_public_path(ref: str) -> Path:
    rel = ref[1:] if ref.startswith('/') else ref
    return PUBLIC / rel


def ensure(condition: bool, message: str, errors: list[str]) -> None:
    if not condition:
        errors.append(message)


def main() -> None:
    errors: list[str] = []

    site = load_json(CONTENT / 'site.json')
    required_site = [
        'name',
        'headline',
        'site_url',
        'email',
        'linkedin',
        'cv_url',
        'photography_url',
        'hero_video_url',
        'hero_video_poster_url',
        'hero_video_mobile_mode',
    ]
    for key in required_site:
        ensure(key in site, f'missing site key: {key}', errors)

    for cv_key in ['cv_url']:
        cv_ref = site.get(cv_key, '')
        if isinstance(cv_ref, str) and cv_ref.startswith('/'):
            ensure(resolve_public_path(cv_ref).exists(), f'missing cv file: {cv_ref}', errors)

    for hero_key in ['hero_video_url', 'hero_video_poster_url']:
        hero_ref = site.get(hero_key, '')
        if isinstance(hero_ref, str) and hero_ref.startswith('/'):
            ensure(resolve_public_path(hero_ref).exists(), f'missing hero media file: {hero_ref}', errors)

    ensure(
        site.get('hero_video_mobile_mode') in {'poster', 'video', 'hidden'},
        'hero_video_mobile_mode must be one of: poster, video, hidden',
        errors,
    )

    photos = load_json(CONTENT / 'photography.json')
    ensure(isinstance(photos, list) and len(photos) > 0, 'photography.json must contain photos', errors)
    photo_sources: set[str] = set()
    for photo in photos:
        for key in ['src', 'alt', 'title', 'detail', 'width', 'height', 'collection', 'featured']:
            ensure(key in photo, f'photo missing key: {key}', errors)
        ref = photo.get('src', '')
        ensure(isinstance(ref, str) and ref.startswith('/media/photography/'), f'invalid photo path: {ref}', errors)
        if isinstance(ref, str):
            ensure(resolve_public_path(ref).is_file(), f'missing photo: {ref}', errors)
            ensure(ref not in photo_sources, f'duplicate photo: {ref}', errors)
            photo_sources.add(ref)
        for key in ['width', 'height']:
            value = photo.get(key)
            ensure(type(value) is int and value > 0, f'photo {ref}: {key} must be positive', errors)
        ensure(type(photo.get('featured')) is bool, f'photo {ref}: featured must be boolean', errors)

    campaign = load_json(CONTENT / 'wcal-campaign.json')
    for key in ['title', 'campaign_url', 'description', 'items']:
        ensure(key in campaign, f'video campaign missing key: {key}', errors)
    campaign_items = campaign.get('items', [])
    ensure(isinstance(campaign_items, list) and len(campaign_items) > 0, 'video campaign needs media', errors)
    campaign_ids: set[str] = set()
    for item in campaign_items:
        for key in ['id', 'title', 'poster', 'alt']:
            ensure(key in item, f'campaign media missing key: {key}', errors)
        item_id = item.get('id', '')
        ensure(item_id not in campaign_ids, f'duplicate campaign media: {item_id}', errors)
        campaign_ids.add(item_id)
        for key in ['poster', 'video']:
            ref = item.get(key)
            if isinstance(ref, str) and ref.startswith('/'):
                path = resolve_public_path(ref)
                ensure(path.is_file(), f'missing campaign {key}: {ref}', errors)
                if key == 'video' and path.is_file():
                    ensure(path.stat().st_size < 25 * 1024 * 1024, f'campaign video exceeds hosting limit: {ref}', errors)
        youtube_id = item.get('youtube_id')
        if youtube_id:
            ensure(isinstance(youtube_id, str) and len(youtube_id) == 11 and all(c.isalnum() or c in '-_' for c in youtube_id),
                   f'invalid campaign YouTube ID: {youtube_id}', errors)

    reactions = load_json(CONTENT / 'wcal-media-reactions.json')
    reaction_ids: set[str] = set()
    for reaction in reactions:
        for key in ['id', 'title', 'outlet', 'duration', 'summary', 'source_url']:
            ensure(key in reaction, f'media reaction missing key: {key}', errors)
        reaction_id = reaction.get('id', '')
        ensure(reaction_id not in reaction_ids, f'duplicate reaction: {reaction_id}', errors)
        reaction_ids.add(reaction_id)
        logo = reaction.get('logo')
        if logo:
            ensure((PUBLIC / logo.get('src', '').lstrip('/')).is_file(), f'missing reaction logo: {reaction_id}', errors)
            ensure(bool(logo.get('alt')), f'missing reaction logo alt text: {reaction_id}', errors)
        ensure(bool(reaction.get('video') or reaction.get('facebook_url') or reaction.get('youtube_id')), f'reaction has no video: {reaction_id}', errors)
        youtube_id = reaction.get('youtube_id')
        if youtube_id:
            ensure(isinstance(youtube_id, str) and len(youtube_id) == 11 and all(c.isalnum() or c in '-_' for c in youtube_id),
                   f'invalid reaction YouTube ID: {youtube_id}', errors)
        for key in ['video', 'poster', 'captions_url', 'transcript_url']:
            ref = reaction.get(key)
            if isinstance(ref, str) and ref.startswith('/'):
                path = resolve_public_path(ref)
                ensure(path.is_file(), f'missing reaction {key}: {ref}', errors)
                if key == 'video' and path.is_file():
                    ensure(path.stat().st_size < 25 * 1024 * 1024, f'reaction exceeds hosting limit: {ref}', errors)
        if reaction.get('video'):
            ensure(bool(reaction.get('transcript_url') and reaction.get('captions_url')), f'reaction needs transcript and captions: {reaction_id}', errors)
            segments = reaction.get('segments', [])
            ensure(len(segments) > 0, f'missing transcript segments: {reaction_id}', errors)
            previous_end = 0
            for segment in segments:
                start, end = segment.get('start', -1), segment.get('end', -1)
                ensure(0 <= start < end and start >= previous_end - 0.05, f'invalid reaction transcript timing: {reaction_id}', errors)
                ensure(bool(segment.get('text')), f'empty transcript segment: {reaction_id}', errors)
                previous_end = end

    wall = load_json(CONTENT / 'wall-items.json')
    ensure(isinstance(wall, list), 'wall-items.json must be an array', errors)
    ensure(len(wall) == 30, f'wall-items count must be 30, found {len(wall)}', errors)

    focus_items = [item for item in wall if item.get('focus_slot') is True]
    focus_count = len(focus_items)
    ensure(focus_count == 5, f'focus_slot count must be 5, found {focus_count}', errors)
    focus_orders: list[int] = []

    for item in wall:
        for key in ['id', 'image', 'title', 'blurb', 'focus_slot']:
            ensure(key in item, f'wall item missing key: {key}', errors)
        image = item.get('image', '')
        if isinstance(image, str) and image.startswith('/'):
            ensure(resolve_public_path(image).exists(), f'missing wall image: {image}', errors)

        is_focus = item.get('focus_slot') is True
        has_focus_order = 'focus_order' in item
        if is_focus:
            ensure(has_focus_order, f"focus item {item.get('id', '<unknown>')} missing focus_order", errors)
            if has_focus_order:
                order = item.get('focus_order')
                ensure(type(order) is int, f"focus item {item.get('id', '<unknown>')} focus_order must be integer", errors)
                if type(order) is int:
                    focus_orders.append(order)
        else:
            ensure(not has_focus_order, f"non-focus item {item.get('id', '<unknown>')} should not define focus_order", errors)

    ensure(len(set(focus_orders)) == len(focus_orders), 'focus_order values must be unique', errors)
    ensure(sorted(focus_orders) == [1, 2, 3, 4, 5], f'focus_order values must be [1..5], found {sorted(focus_orders)}', errors)

    featured_reel = load_json(CONTENT / 'featured-reel.json')
    for key in ['id', 'title', 'video', 'poster', 'caption', 'duration', 'has_audio', 'aspect_ratio', 'draft_note']:
        ensure(key in featured_reel, f'featured reel missing key: {key}', errors)

    ensure(type(featured_reel.get('has_audio')) is bool, 'featured reel has_audio must be boolean', errors)

    featured_video = featured_reel.get('video', '')
    if isinstance(featured_video, str) and featured_video.startswith('/'):
        ensure(resolve_public_path(featured_video).exists(), f'missing featured reel video file: {featured_video}', errors)

    featured_poster = featured_reel.get('poster', '')
    if isinstance(featured_poster, str) and featured_poster.startswith('/'):
        ensure(resolve_public_path(featured_poster).exists(), f'missing featured reel poster file: {featured_poster}', errors)

    reel = load_json(CONTENT / 'reel.json')
    ensure(isinstance(reel, list) and len(reel) > 0, 'reel.json must contain entries', errors)
    for clip in reel:
        for key in ['id', 'title', 'video', 'poster', 'caption', 'duration']:
            ensure(key in clip, f'reel clip missing key: {key}', errors)
        if 'has_audio' in clip:
            ensure(type(clip.get('has_audio')) is bool, f"reel clip {clip.get('id', '<unknown>')} has_audio must be boolean", errors)
        video = clip.get('video', '')
        if isinstance(video, str) and video.startswith('/'):
            ensure(resolve_public_path(video).exists(), f'missing reel video file: {video}', errors)
        poster = clip.get('poster', '')
        if isinstance(poster, str) and poster.startswith('/'):
            ensure(resolve_public_path(poster).exists(), f'missing reel poster file: {poster}', errors)

    case_files = sorted((CONTENT / 'cases').glob('*.md'))
    ensure(len(case_files) >= 4, f'need at least 4 case files, found {len(case_files)}', errors)

    required_case_keys = [
        'title',
        'slug',
        'year',
        'client_or_org',
        'role',
        'challenge',
        'approach',
        'outcome',
        'metrics',
        'cover_image',
        'gallery',
    ]

    for path in case_files:
        data = parse_frontmatter(path.read_text(encoding='utf-8'))
        for key in required_case_keys:
            ensure(key in data, f'{path.name}: missing key {key}', errors)

        metrics = data.get('metrics', [])
        gallery = data.get('gallery', [])
        ensure(isinstance(metrics, list) and len(metrics) >= 1, f'{path.name}: metrics needs >= 1 item', errors)
        ensure(isinstance(gallery, list) and len(gallery) >= 5, f'{path.name}: gallery needs >= 5 items', errors)

        cover = data.get('cover_image', '')
        if isinstance(cover, str) and cover.startswith('/'):
            ensure(resolve_public_path(cover).exists(), f'{path.name}: missing cover file {cover}', errors)

        video = data.get('video', '')
        if isinstance(video, str) and video.startswith('/'):
            ensure(resolve_public_path(video).exists(), f'{path.name}: missing video file {video}', errors)

        poster = data.get('video_poster', '')
        if isinstance(poster, str) and poster.startswith('/'):
            ensure(resolve_public_path(poster).exists(), f'{path.name}: missing video poster file {poster}', errors)

        for g in gallery:
            if isinstance(g, str) and g.startswith('/'):
                ensure(resolve_public_path(g).exists(), f'{path.name}: missing gallery file {g}', errors)

    if errors:
        print('validation failed:')
        for err in errors:
            print(f'- {err}')
        raise SystemExit(1)

    print('validation passed')


if __name__ == '__main__':
    main()
