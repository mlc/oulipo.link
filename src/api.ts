import createError from 'create-error';

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

const ApiError = createError('ApiError');

export const shrink = async (url: string): Promise<ApiSuccess> => {
  const body: ApiRequest = {
    url_long: url,
    cdn_prefix: 'oulipo.link',
  };

  const resp = await fetch('https://api.oulipo.link/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(body),
  });
  if (!resp.ok) {
    throw new ApiError(resp.statusText);
  }
  const json: ApiResponse = await resp.json();
  if ('error' in json) {
    throw new ApiError(json.error);
  }
  return json;
};
