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
        'cv_styled_url',
        'cv_ats_url',
        'photography_url',
        'hero_video_url',
        'hero_video_poster_url',
        'hero_video_mobile_mode',
    ]
    for key in required_site:
        ensure(key in site, f'missing site key: {key}', errors)

    for cv_key in ['cv_styled_url', 'cv_ats_url']:
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
