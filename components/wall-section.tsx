'use client';

import Image from 'next/image';
import { CSSProperties, MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WallItem } from '@/lib/types';

type Props = {
  items: WallItem[];
};

type TilePose = {
  key: string;
  item: WallItem;
  x: number;
  y: number;
  z: number;
  rotateY: number;
  rotateX: number;
  opacity: number;
  scale: number;
  isFocus: boolean;
};

function clamp(value: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, value));
}

function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

function layoutForStage(viewWidth: number, stageWidth: number, stageHeight: number) {
  if (viewWidth >= 1280) {
    const tileWidth = 146;
    const spacingX = 170;
    const spacingY = 210;
    const cols = Math.max(8, Math.ceil((stageWidth + spacingX * 2.6) / spacingX));
    const rows = Math.max(6, Math.ceil((stageHeight + spacingY * 2.5) / spacingY));
    return { cols, rows, target: cols * rows, spacingX, spacingY, baseScale: 1.02, tileWidth };
  }
  if (viewWidth >= 920) {
    const tileWidth = 124;
    const spacingX = 146;
    const spacingY = 184;
    const cols = Math.max(7, Math.ceil((stageWidth + spacingX * 2.5) / spacingX));
    const rows = Math.max(6, Math.ceil((stageHeight + spacingY * 2.5) / spacingY));
    return { cols, rows, target: cols * rows, spacingX, spacingY, baseScale: 1.01, tileWidth };
  }

  const tileWidth = 94;
  const spacingX = 112;
  const spacingY = 140;
  const cols = Math.max(5, Math.ceil((stageWidth + spacingX * 2.3) / spacingX));
  const rows = Math.max(6, Math.ceil((stageHeight + spacingY * 2.6) / spacingY));
  return { cols, rows, target: cols * rows, spacingX, spacingY, baseScale: 1, tileWidth };
}

export function WallSection({ items }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const [width, setWidth] = useState(1400);
  const [stageSize, setStageSize] = useState({ width: 1300, height: 760 });
  const [progress, setProgress] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [copyCard, setCopyCard] = useState<WallItem | null>(items[0] ?? null);
  const [copyVisible, setCopyVisible] = useState(true);

  const focusItems = useMemo(
    () =>
      items
        .filter((item) => item.focus_slot)
        .sort((a, b) => (a.focus_order ?? Number.MAX_SAFE_INTEGER) - (b.focus_order ?? Number.MAX_SAFE_INTEGER))
        .slice(0, 5),
    [items],
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const onResize = () => setWidth(window.innerWidth);
    onResize();

    let observer: ResizeObserver | null = null;
    if (stageRef.current && 'ResizeObserver' in window) {
      observer = new ResizeObserver((entries) => {
        const first = entries[0];
        if (!first) return;
        setStageSize({
          width: Math.max(320, first.contentRect.width),
          height: Math.max(420, first.contentRect.height),
        });
      });
      observer.observe(stageRef.current);
    }

    let trigger: ScrollTrigger | null = null;
    if (sectionRef.current) {
      trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.1,
        onUpdate: (self) => {
          setProgress(self.progress);
        },
      });
    }

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      observer?.disconnect();
      trigger?.kill();
    };
  }, []);

  const config = layoutForStage(width, stageSize.width, stageSize.height);

  const pool = useMemo(() => {
    if (!items.length) return [] as Array<{ key: string; item: WallItem; index: number }>;
    return Array.from({ length: config.target }, (_, idx) => ({
      key: `${items[idx % items.length].id}-${idx}`,
      item: items[idx % items.length],
      index: idx,
    }));
  }, [config.target, items]);

  const activeFocusIndex = useMemo(() => {
    if (!focusItems.length) return 0;
    const normalized = clamp((progress - 0.04) / 0.92);
    return Math.min(focusItems.length - 1, Math.floor(normalized * focusItems.length));
  }, [focusItems.length, progress]);

  const activeFocusId = focusItems[activeFocusIndex]?.id ?? null;

  const focusKeyById = useMemo(() => {
    const map: Record<string, string> = {};
    for (const entry of pool) {
      if (focusItems.some((item) => item.id === entry.item.id) && !map[entry.item.id]) {
        map[entry.item.id] = entry.key;
      }
    }
    return map;
  }, [pool, focusItems]);

  const activeCard = useMemo(() => {
    if (focusItems.length) return focusItems[activeFocusIndex];
    return items[0] ?? null;
  }, [activeFocusIndex, focusItems, items]);

  useEffect(() => {
    if (!copyCard && items.length) {
      setCopyCard(items[0]);
    }
  }, [copyCard, items]);

  useEffect(() => {
    if (!activeCard) return;
    if (copyCard?.id === activeCard.id) return;
    setCopyVisible(false);
    const timer = window.setTimeout(() => {
      setCopyCard(activeCard);
      setCopyVisible(true);
    }, 180);
    return () => window.clearTimeout(timer);
  }, [activeCard, copyCard?.id]);

  const layerTransform = useMemo(() => {
    const x = lerp(128, -108, progress) + pointer.x * 18;
    const y = lerp(44, -54, progress) + pointer.y * 9;
    const rotX = lerp(10, 6.5, progress) - pointer.y * 3;
    const rotY = lerp(-14, -5, progress) + pointer.x * 3.8;
    const scale = lerp(1.08, config.baseScale, progress);
    return `translate3d(${x}px, ${y}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`;
  }, [config.baseScale, pointer.x, pointer.y, progress]);

  const tiles: TilePose[] = useMemo(() => {
    const startX = -((config.cols - 1) * config.spacingX) / 2;
    const startY = -((config.rows - 1) * config.spacingY) / 2;
    const centerCol = (config.cols - 1) / 2;
    const centerDiv = Math.max(1, centerCol);

    return pool.map(({ key, item, index }) => {
      const row = Math.floor(index / config.cols);
      const col = index % config.cols;
      const rowRatio = config.rows > 1 ? row / (config.rows - 1) : 0.5;
      const colRatio = Math.abs(col - centerCol) / centerDiv;
      const brickOffset = row % 2 ? config.spacingX * 0.5 : 0;

      const depthBase = lerp(-430, -210, rowRatio) - colRatio * 48;
      const baseX = startX + col * config.spacingX + brickOffset;
      const baseY = startY + row * config.spacingY;
      const driftX = -progress * lerp(24, 176, rowRatio);
      const driftY = -progress * lerp(16, 122, rowRatio);
      const pointerX = pointer.x * lerp(7, 14, rowRatio);
      const pointerY = pointer.y * lerp(3, 8, rowRatio);
      const isFocus = activeFocusId ? key === focusKeyById[activeFocusId] : false;

      return {
        key,
        item,
        x: baseX + driftX + pointerX,
        y: baseY + driftY + pointerY,
        z: depthBase + (isFocus ? 180 : 0),
        rotateY: (col - centerCol) * 0.22,
        rotateX: lerp(-0.9, -0.15, rowRatio),
        opacity: isFocus ? 0.96 : lerp(0.58, 0.86, rowRatio),
        scale: isFocus ? 1.025 : 1,
        isFocus,
      };
    });
  }, [pool, config.cols, config.rows, config.spacingX, config.spacingY, progress, pointer.x, pointer.y, activeFocusId, focusKeyById]);

  const spotlightScale = lerp(0.93, 1.02, clamp((progress - 0.06) / 0.5));
  const spotlightLift = lerp(66, 6, clamp((progress - 0.02) / 0.5));
  const copyOpacity = clamp((progress - 0.06) / 0.14) * (1 - clamp((progress - 0.94) / 0.06));

  const onStageMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const px = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const py = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    setPointer({ x: clamp(px, -1, 1), y: clamp(py, -1, 1) });
  };

  const onStageLeave = () => {
    setPointer({ x: 0, y: 0 });
  };

  return (
    <section id="wall" className="wall-section" ref={sectionRef}>
      <div className="wall-sticky">
        <div className="wall-header">
          <h2 className="section-title">social wall</h2>
          <p className="section-sub">A live cross-section of campaign work, with five selected pieces pulled forward through the page.</p>
        </div>

        <div className="wall-stage" ref={stageRef} onMouseMove={onStageMove} onMouseLeave={onStageLeave} aria-live="polite">
          <div
            className="brick-layer"
            style={
              {
                transform: layerTransform,
                ['--wall-tile-width' as string]: `${config.tileWidth}px`,
              } as CSSProperties
            }
          >
            {tiles.map((tile) => (
              <article
                key={tile.key}
                className={`brick-card ${tile.isFocus ? 'is-focus' : ''}`}
                style={{
                  opacity: tile.opacity,
                  transform: `translate3d(${tile.x}px, ${tile.y}px, ${tile.z}px) rotateY(${tile.rotateY}deg) rotateX(${tile.rotateX}deg) scale(${tile.scale})`,
                }}
              >
                <Image src={tile.item.image} alt={tile.item.title} width={900} height={1125} priority={tile.key === tiles[0]?.key} />
              </article>
            ))}
          </div>

          {activeCard ? (
            <article className="wall-spotlight" style={{ transform: `translate3d(0, ${spotlightLift}px, 0) scale(${spotlightScale})` }}>
              <Image src={activeCard.image} alt={activeCard.title} width={900} height={1125} priority />
            </article>
          ) : null}

          <div className={`focus-copy ${copyVisible ? 'is-visible' : 'is-hidden'}`} style={{ opacity: copyOpacity * (copyVisible ? 1 : 0) }}>
            <h3>{copyCard?.title ?? 'Campaign Tile'}</h3>
            <p>{copyCard?.blurb ?? 'Clear hierarchy and narrative control across fast-turnaround campaign visuals.'}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
