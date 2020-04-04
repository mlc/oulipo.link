interface Success {
  url_long: string;
  url_short: string;
}

interface Failure {
  error: string;
}

export type ApiResponse = Success | Failure;

export interface ApiRequest {
  url_long: string;
  cdn_prefix: 'oulipo.link';
}
