export type SiteConfig = {
  name: string;
  headline: string;
  site_url: string;
  email: string;
  linkedin: string;
  cv_url: string;
  print_portfolio_url: string;
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

export type PhotoItem = {
  src: string;
  alt: string;
  title: string;
  detail: string;
  width: number;
  height: number;
  collection: string;
  featured: boolean;
  wide?: boolean;
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

export type CampaignMediaItem = {
  id: string;
  title: string;
  poster: string;
  alt: string;
  video?: string;
  duration?: string;
  youtube_id?: string | null;
};

export type VideoCampaign = {
  title: string;
  campaign_url: string;
  description: string;
  items: CampaignMediaItem[];
  reactions: MediaReaction[];
};

export type MediaReaction = {
  id: string;
  title: string;
  outlet: string;
  date?: string;
  duration: string;
  video?: string;
  poster?: string;
  facebook_url?: string;
  youtube_id?: string;
  context?: string;
  quote?: string;
  excerpt?: string;
  summary: string;
  source_url: string;
  transcript_url?: string;
  captions_url?: string;
  segments?: { start: number; end: number; text: string }[];
};
