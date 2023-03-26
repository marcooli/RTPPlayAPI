export type Pagination = {
  total: number;
  current_page: number;
  rpp: number;
};

export type ResultWithPagination = {
  paging?: Pagination;
};

export type RTPResponse<T> = {
  result: T & ResultWithPagination;
};

export type Categories = {
  [a: string]: string;
};

export type ProgramColletion = {
  program_id: string;
  program_podcast: string;
  program_offline: string;
  program_download: string;
  program_rewrite: string;
  program_title: string;
  program_lead: string;
  program_promotion: string;
  program_image: string;
  program_info: string;
  program_lastchanged: string;
  program_season: string;
  program_is_serie: string;
  program_type_serie: string;
  program_serie_img: string;
  program_image_169_wide: string;
  program_image_podcast: string;
  program_media_type: string;
  program_onair_site: string;
  channel_id: string;
  channel_type: string;
  episode_id: string;
  episode_date: string;
  program_epg: string;
  channel_name: string;
  program_total_episodes: string;
  program_serie_label: string;
};

export type Program = {
  program_id: string;
  program_title: string;
  program_rewrite: string;
  program_is_serie: string;
  program_type_serie: string;
  program_lifetime: string;
  program_lifedate: string;
  program_order_by: string;
  program_media_type: string;
  program_onair_site: string;
  program_related_link: string;
  program_type: string;
  program_image: string;
  program_serie_label: string;
  program_total_episodes: string;
};

export type Subtitles = {
  vtt: string;
  ebutt: string;
  vtt_list: string[];
};

export type ProgramEpisode = {
  season: string;
  episode_number: string;
  episode_title: string;
  episode_id: string;
  episode_description: string;
  episode_summary: string;
  episode_air_date: string;
  episode_date_onair: string;
  episode_related_link: string;
  episode_date: string;
  episode_image: string;
  asset_thumb: string;
  asset_video_preview: string;
  asset_id: string;
  asset_duration: string;
  subtitles: Subtitles;
};

type EpisodeAsset = {
  asset_id: string;
  asset_internal_id: string;
  asset_duration: string;
  asset_is_live: string;
  asset_thumbnail: string;
  asset_video_preview: string;
  asset_date: string;
  asset_base_dir: string;
  asset_internal_id_info: string;
  asset_lastchanged: string;
  asset_geoblock_info: string;
  asset_screenshot_preview: string;
  asset_type: string;
  asset_size: string;
  asset_path: string;
  hls_url: string;
  hls_url_new: string;
  dash_url: string;
  mss_url: string;
  asset_url: unknown[];
  rights_api: string;
  stream_url: unknown[];
  TESTE: string;
  download_url: string;
  subtitles: unknown[];
  web: unknown[];
};

type Episode = {
  channel_id: string;
  channel_name: string;
  channel_rewrite: string;
  channel_summary: string;
  channel_image: string;
  channel_card_logo: string;
  channel_card_logo_1x1: string;
  channel_card_logo_9x16: string;
  channel_type: string;
  channel_homepage: string;
  channel_list_order: string;
  channel_lastchanged: string;
  program_id: string;
  program_technical_metadata: string;
  program_lifetime: string;
  program_lifedate: string;
  program_podcast: string;
  program_offline: string;
  program_download: string;
  program_rewrite: string;
  program_title: string;
  program_lead: string;
  program_image: string;
  program_info: string;
  program_lastchanged: string;
  program_season: string;
  program_type_serie: string;
  program_media_type: string;
  program_onair_site: string;
  program_related_link: string;
  program_is_serie: string;
  program_category: string;
  program_category_name: string;
  episode_id: string;
  program_type: string;
  episode_date: string;
  episode_title: string;
  episode_subtitle: string | null;
  episode_description: string;
  episode_summary: string;
  episode_date_onair: string;
  episode_is_live: string;
  episode_lastchanged: string;
  episode_number: string;
  episode_related_link: string;
  episode_image: string;
  program_epg: string;
  program_category_ads_key: string;
  web: {
    url: string;
  };
  episode_duration_complete: string;
  analytics: {
    title: string;
    program_collections: unknown[];
    episode_collections: unknown[];
    program_categories: unknown[];
  };
};

export type ProgramSearch = {
  program_id: number;
  program_rewrite: string;
  program_title: string;
  program_lead: string;
  program_promotion: string;
  program_image: string;
  program_season: string;
  program_media_type: string;
  program_onair_site: string;
  media_type: string;
  channel_id: number;
  channel_name: string;
  channel_type: string;
  episode_id: number;
  program_type: string | null;
  episode_date: string;
  episode_title: string;
  episode_subtitle: string;
  episode_description: string;
  episode_summary: string;
  episode_is_live: number;
  episode_number: string;
  episode_air_date: string;
  episode_date_onair: string;
  episode_lastchanged: string;
  total_episodes: number;
  program_lifetime: number;
  program_lifedate: string;
  program_total_episodes: number;
};

export type GetCollectionResponse = RTPResponse<{
  programs: ProgramColletion[];
}>;

export type GetCategoriesResponse = RTPResponse<Categories>;
export type GetProgramResponse = RTPResponse<{
  program: Program;
  episodes: ProgramEpisode[];
}>;

export type GetEpisodeResponse = RTPResponse<{
  episode: Episode;
  assets: EpisodeAsset[];
}>;

export type GetSearchResponse = RTPResponse<{
  programs: ProgramSearch[];
}>;
