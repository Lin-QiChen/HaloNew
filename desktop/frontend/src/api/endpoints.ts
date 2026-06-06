/**
 * API endpoint definitions — centralised for easy maintenance.
 * All endpoints are prefixed with /api by convention.
 */

import { apiClient } from './client';
import type { ApiResponse, ScrapeRequest, ExtractRequest } from '../types';

export const api = {
  /** Fetch a page via the scraper */
  scrape: (data: ScrapeRequest) =>
    apiClient.post<ApiResponse<{ html: string; url: string }>>('/api/scrape', data),

  /** Batch extract fields from a page */
  extract: (data: ExtractRequest) =>
    apiClient.post<ApiResponse<Record<string, unknown>[]>>('/api/extract', data),

  /** Save a project */
  saveProject: (data: { name: string; fields: unknown; config: unknown }) =>
    apiClient.post<ApiResponse<{ id: string }>>('/api/projects', data),

  /** Load a project */
  loadProject: (id: string) =>
    apiClient.get<ApiResponse>(`/api/projects/${id}`),

  /** List saved projects */
  listProjects: () =>
    apiClient.get<ApiResponse<{ id: string; name: string }[]>>('/api/projects'),

  /** Export data */
  exportData: (format: 'json' | 'csv' | 'xlsx', data: Record<string, unknown>[]) =>
    apiClient.post<Blob>(`/api/export/${format}`, data, {
      headers: { Accept: 'application/octet-stream' },
    }),
};
