export type SiteConfig = {
  name: string;
  headline: string;
  site_url: string;
  email: string;
  linkedin: string;
  cv_styled_url: string;
  cv_ats_url: string;
  photography_url: string | null;
  hero_video_url: string;
  hero_video_poster_url: string;
  hero_video_mobile_mode: 'poster' | 'video' | 'hidden';
};

export type WallItem = {
  id: string;
  image: string;
  title: string;
  blurb: string;
  focus_slot: boolean;
  focus_order?: number;
};

export type CaseStudy = {
  title: string;
  slug: string;
  year: string;
  client_or_org: string;
  role: string;
  challenge: string;
  approach: string;
  outcome: string;
  metrics: string[];
  cover_image: string;
  gallery: string[];
  video?: string;
  video_poster?: string;
  video_embed_url?: string;
  external_url?: string;
  external_label?: string;
  featured: boolean;
  tags: string[];
  body: string;
};

export type ReelItem = {
  id: string;
  title: string;
  video: string;
  poster: string;
  caption: string;
  duration: string;
  has_audio?: boolean;
  aspect_ratio?: string;
};
