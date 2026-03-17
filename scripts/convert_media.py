#!/usr/bin/env python3
"""Convert JPG/PNG masters into WebP variants for web delivery."""

from __future__ import annotations

import argparse
import subprocess
from pathlib import Path

SUPPORTED = {'.jpg', '.jpeg', '.png'}


def run_sips_convert(src: Path, dst: Path) -> bool:
    dst.parent.mkdir(parents=True, exist_ok=True)
    cmd = ['sips', '-s', 'format', 'webp', str(src), '--out', str(dst)]
    result = subprocess.run(cmd, capture_output=True, text=True)
    return result.returncode == 0


def convert(src_root: Path, dst_root: Path) -> tuple[int, int]:
    converted = 0
    failed = 0

    for path in src_root.rglob('*'):
        if not path.is_file():
            continue
        if path.suffix.lower() not in SUPPORTED:
            continue

        rel = path.relative_to(src_root)
        out_file = (dst_root / rel).with_suffix('.webp')
        if run_sips_convert(path, out_file):
            converted += 1
            print(f'converted: {rel} -> {out_file.relative_to(dst_root)}')
        else:
            failed += 1
            print(f'failed: {rel}')

    return converted, failed


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument('--src', required=True, help='Source folder with original files')
    parser.add_argument('--dest', required=True, help='Destination media folder')
    args = parser.parse_args()

    src = Path(args.src).resolve()
    dest = Path(args.dest).resolve()

    if not src.exists():
        raise SystemExit(f'source not found: {src}')

    converted, failed = convert(src, dest)
    print(f'\nsummary: converted={converted}, failed={failed}')
    if failed:
        raise SystemExit(1)


if __name__ == '__main__':
    main()
