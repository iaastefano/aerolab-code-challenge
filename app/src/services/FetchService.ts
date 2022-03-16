import { API_URL, API_TOKEN } from '../config/general-config';

interface FetchParams {
  url: string;
  baseUrl?: string;
  id?: number;
  body?: object;
  callback?: (error?: Error) => void;
  showGenericError?: boolean;
  mode?: RequestMode
}

interface SingleFetchParams {
  url: string;
  id?: string;
  body?: object;
  callback?: (error?: Error) => void;
  showGenericError?: boolean;
}

class FetchService {
  public static async getString<T>(params: SingleFetchParams): Promise<T> {
    const { id, url } = params;

    const idParam = id ? `/${id}` : '';

    const response = await fetch(`${API_URL}${url}${idParam}`, {
      method: 'GET',
      headers: FetchService.getHeaders(),
    });
    return FetchService.processStringResponse<T>(response, params);
  }

  public static async get<T>(params: FetchParams): Promise<T> {
    const { id, url, baseUrl } = params;

    const idParam = id ? `/${id}` : '';

    const response = await fetch(
      `${baseUrl || API_URL}${url}${idParam}`,
      {
        method: 'GET',
        headers: FetchService.getHeaders(),
      }
    );

    return FetchService.processResponse<T>(response, params);
  }

  public static async getExternalUrl<T>(params: SingleFetchParams): Promise<T> {
    const { url } = params;

    const response = await fetch(url, {
      method: 'GET',
      headers: FetchService.getHeaders(),
    });
    return FetchService.processStringResponse<T>(response, params);
  }

  public static async post<T>(params: FetchParams): Promise<T> {
    const { baseUrl, url } = params;

    const response = await fetch(`${baseUrl || API_URL}${url}`, {
      method: 'POST',
      body: JSON.stringify(params.body),
      headers: FetchService.getHeaders(),
    });

    return FetchService.processResponse<T>(response, params);
  }

  public static async put<T>(params: FetchParams): Promise<T> {
    const { baseUrl, url } = params;

    const response = await fetch(`${baseUrl || API_URL}${url}`, {
      method: 'PUT',
      body: JSON.stringify(params.body),
      headers: FetchService.getHeaders(),
    });

    return FetchService.processResponse<T>(response, params);
  }

  public static async delete<T>(params: FetchParams): Promise<T> {
    const { baseUrl, url } = params;

    const response = await fetch(`${baseUrl || API_URL}${url}`, {
      method: 'DELETE',
      headers: FetchService.getHeaders(),
      body: JSON.stringify(params.body),
    });

    return FetchService.processResponse<T>(response, params);
  }

  private static getHeaders() {
    return new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    });
  }

  private static async processResponse<T>(
    response: Response,
    params: FetchParams
  ) {

    if (response.status === 404) {
      return {} as T;
    }

    if (response.ok) {
      if (params.callback) {
        params.callback();
      }

      if (response.status === 200) {
        return (await response.json()) as T;
      }
      return {} as T;
    }

    const error = new Error(await response.text());
    if (params.callback) {
      params.callback(error);
    } else if (params.showGenericError) {
      // message.error(error.message);
    }
    if (!params.callback) throw error;
    else return {} as T;
  }

  private static async processStringResponse<T>(
    response: Response,
    params: SingleFetchParams
  ) {
    if (response.status === 401) {
      return {} as T;
    }

    if (response.status === 404) {
      return {} as T;
    }

    if (response.ok) {
      if (params.callback) {
        params.callback();
      }

      if (response.status === 200) {
        return (await response.json()) as T;
      }
      return {} as T;
    }

    const error = new Error(await response.text());
    if (params.callback) {
      params.callback(error);
    } else if (params.showGenericError) {
      // message.error(error.message);
    }
    throw error;
  }
}

export default FetchService;
