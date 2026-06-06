/** Tab identifiers */
export type TabId = 'scrape' | 'fields' | 'results' | 'settings';

/** Fetcher type */
export type FetcherType = 'basic' | 'dynamic' | 'stealthy';

/** Field selector type */
export type SelectorType = 'css' | 'xpath';

/** Field extraction mode */
export type ExtractionMode = 'text' | 'attribute' | 'html' | 'count';

/** A defined field for scraping */
export interface Field {
  id: string;
  name: string;
  selectorType: SelectorType;
  selector: string;
  extraction: ExtractionMode;
  attribute?: string;
  many: boolean;
}

/** Fetcher configuration */
export interface FetcherConfig {
  type: FetcherType;
  impersonate: string;
  networkIdle: boolean;
  blockAds: boolean;
  solveCloudflare: boolean;
  timeout: number;
  proxy: string;
}

/** Project information */
export interface Project {
  name: string;
  url: string;
}

/** Preview status */
export type PreviewStatus = 'idle' | 'loading' | 'loaded' | 'error';

/** API response wrapper */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

/** Scrape endpoint payload */
export interface ScrapeRequest {
  url: string;
  fetcher: FetcherConfig;
}

/** Batch extract payload */
export interface ExtractRequest {
  url: string;
  containerSelector: string;
  fields: Field[];
}

/** App global state */
export interface AppState {
  tab: TabId;
  project: Project;
  fetcher: FetcherConfig;
  fields: Field[];
  containerSelector: string;
  results: Record<string, unknown>[];
  previewStatus: PreviewStatus;
  previewUrl: string;
  logs: string[];
  dialogOpen: boolean;
  editingField: Field | null;
}

/** App actions */
export type AppAction =
  | { type: 'SET_TAB'; payload: TabId }
  | { type: 'SET_PROJECT_NAME'; payload: string }
  | { type: 'SET_PROJECT_URL'; payload: string }
  | { type: 'SET_FETCHER'; payload: Partial<FetcherConfig> }
  | { type: 'SET_FETCHER_TYPE'; payload: FetcherType }
  | { type: 'ADD_FIELD'; payload: Field }
  | { type: 'UPDATE_FIELD'; payload: Field }
  | { type: 'DELETE_FIELD'; payload: string }
  | { type: 'CLEAR_FIELDS' }
  | { type: 'SET_CONTAINER_SELECTOR'; payload: string }
  | { type: 'SET_RESULTS'; payload: Record<string, unknown>[] }
  | { type: 'SET_PREVIEW_STATUS'; payload: PreviewStatus }
  | { type: 'SET_PREVIEW_URL'; payload: string }
  | { type: 'ADD_LOG'; payload: string }
  | { type: 'CLEAR_LOGS' }
  | { type: 'OPEN_DIALOG'; payload: Field | null }
  | { type: 'CLOSE_DIALOG' };
