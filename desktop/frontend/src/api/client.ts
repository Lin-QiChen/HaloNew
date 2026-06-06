/**
 * HTTP API client — wrapper around fetch with base URL configuration.
 * Designed to connect to a Python backend (Flask/FastAPI).
 */

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000';

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  params?: Record<string, string>;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private buildUrl(path: string, params?: Record<string, string>): string {
    const url = new URL(`${this.baseUrl}${path}`);
    if (params) {
      Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    }
    return url.toString();
  }

  private async request<T>(method: string, path: string, opts: RequestOptions = {}): Promise<T> {
    const { body, params, ...init } = opts;
    const url = this.buildUrl(path, params);

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(init.headers as Record<string, string>),
    };

    const res = await fetch(url, {
      ...init,
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => 'Unknown error');
      throw new Error(`API ${res.status}: ${text}`);
    }

    return res.json();
  }

  get<T>(path: string, opts?: RequestOptions) {
    return this.request<T>('GET', path, opts);
  }

  post<T>(path: string, body?: unknown, opts?: RequestOptions) {
    return this.request<T>('POST', path, { ...opts, body });
  }

  put<T>(path: string, body?: unknown, opts?: RequestOptions) {
    return this.request<T>('PUT', path, { ...opts, body });
  }

  delete<T>(path: string, opts?: RequestOptions) {
    return this.request<T>('DELETE', path, opts);
  }
}

export const apiClient = new ApiClient(API_BASE);
