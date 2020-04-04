export interface ApiSuccess {
  url_long: string;
  url_short: string;
}

export interface ApiFailure {
  error: string;
}

export type ApiResponse = ApiSuccess | ApiFailure;

export interface ApiRequest {
  url_long: string;
  cdn_prefix: 'oulipo.link';
}
