import React, { createContext, useContext, useReducer, useCallback } from 'react';
import type { AppState, AppAction, TabId, Field, FetcherConfig, FetcherType, PreviewStatus } from '../types';

// ── Initial state ──
const initialFetcher: FetcherConfig = {
  type: 'basic',
  impersonate: 'chrome_120',
  networkIdle: false,
  blockAds: false,
  solveCloudflare: false,
  timeout: 30000,
  proxy: '',
};

const initialState: AppState = {
  tab: 'scrape',
  project: { name: '未命名项目', url: '' },
  fetcher: initialFetcher,
  fields: [],
  containerSelector: '',
  results: [],
  previewStatus: 'idle',
  previewUrl: '',
  logs: ['[系统] Scrapling Desktop 已启动'],
  dialogOpen: false,
  editingField: null,
};

// ── Reducer ──
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_TAB':
      return { ...state, tab: action.payload };

    case 'SET_PROJECT_NAME':
      return { ...state, project: { ...state.project, name: action.payload } };
    case 'SET_PROJECT_URL':
      return { ...state, project: { ...state.project, url: action.payload } };

    case 'SET_FETCHER':
      return { ...state, fetcher: { ...state.fetcher, ...action.payload } };
    case 'SET_FETCHER_TYPE':
      return { ...state, fetcher: { ...state.fetcher, type: action.payload } };

    case 'ADD_FIELD':
      return { ...state, fields: [...state.fields, action.payload] };
    case 'UPDATE_FIELD':
      return {
        ...state,
        fields: state.fields.map((f) => (f.id === action.payload.id ? action.payload : f)),
      };
    case 'DELETE_FIELD':
      return { ...state, fields: state.fields.filter((f) => f.id !== action.payload) };
    case 'CLEAR_FIELDS':
      return { ...state, fields: [] };

    case 'SET_CONTAINER_SELECTOR':
      return { ...state, containerSelector: action.payload };

    case 'SET_RESULTS':
      return { ...state, results: action.payload };

    case 'SET_PREVIEW_STATUS':
      return { ...state, previewStatus: action.payload };
    case 'SET_PREVIEW_URL':
      return { ...state, previewUrl: action.payload };

    case 'ADD_LOG':
      return { ...state, logs: [...state.logs, action.payload] };
    case 'CLEAR_LOGS':
      return { ...state, logs: [] };

    case 'OPEN_DIALOG':
      return { ...state, dialogOpen: true, editingField: action.payload };
    case 'CLOSE_DIALOG':
      return { ...state, dialogOpen: false, editingField: null };

    default:
      return state;
  }
}

// ── Context ──
interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  // Convenience action creators
  setTab: (tab: TabId) => void;
  setProjectName: (name: string) => void;
  setProjectUrl: (url: string) => void;
  setFetcher: (partial: Partial<FetcherConfig>) => void;
  setFetcherType: (type: FetcherType) => void;
  addField: (field: Field) => void;
  updateField: (field: Field) => void;
  deleteField: (id: string) => void;
  clearFields: () => void;
  setContainerSelector: (sel: string) => void;
  setResults: (results: Record<string, unknown>[]) => void;
  setPreviewStatus: (status: PreviewStatus) => void;
  setPreviewUrl: (url: string) => void;
  addLog: (msg: string) => void;
  clearLogs: () => void;
  openDialog: (field?: Field | null) => void;
  closeDialog: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

// ── Provider ──
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setTab = useCallback((tab: TabId) => dispatch({ type: 'SET_TAB', payload: tab }), []);
  const setProjectName = useCallback((name: string) => dispatch({ type: 'SET_PROJECT_NAME', payload: name }), []);
  const setProjectUrl = useCallback((url: string) => dispatch({ type: 'SET_PROJECT_URL', payload: url }), []);
  const setFetcher = useCallback((partial: Partial<FetcherConfig>) => dispatch({ type: 'SET_FETCHER', payload: partial }), []);
  const setFetcherType = useCallback((type: FetcherType) => dispatch({ type: 'SET_FETCHER_TYPE', payload: type }), []);
  const addField = useCallback((field: Field) => dispatch({ type: 'ADD_FIELD', payload: field }), []);
  const updateField = useCallback((field: Field) => dispatch({ type: 'UPDATE_FIELD', payload: field }), []);
  const deleteField = useCallback((id: string) => dispatch({ type: 'DELETE_FIELD', payload: id }), []);
  const clearFields = useCallback(() => dispatch({ type: 'CLEAR_FIELDS' }), []);
  const setContainerSelector = useCallback((sel: string) => dispatch({ type: 'SET_CONTAINER_SELECTOR', payload: sel }), []);
  const setResults = useCallback((results: Record<string, unknown>[]) => dispatch({ type: 'SET_RESULTS', payload: results }), []);
  const setPreviewStatus = useCallback((status: PreviewStatus) => dispatch({ type: 'SET_PREVIEW_STATUS', payload: status }), []);
  const setPreviewUrl = useCallback((url: string) => dispatch({ type: 'SET_PREVIEW_URL', payload: url }), []);
  const addLog = useCallback((msg: string) => dispatch({ type: 'ADD_LOG', payload: msg }), []);
  const clearLogs = useCallback(() => dispatch({ type: 'CLEAR_LOGS' }), []);
  const openDialog = useCallback((field?: Field | null) => dispatch({ type: 'OPEN_DIALOG', payload: field ?? null }), []);
  const closeDialog = useCallback(() => dispatch({ type: 'CLOSE_DIALOG' }), []);

  const value: AppContextValue = {
    state,
    dispatch,
    setTab,
    setProjectName,
    setProjectUrl,
    setFetcher,
    setFetcherType,
    addField,
    updateField,
    deleteField,
    clearFields,
    setContainerSelector,
    setResults,
    setPreviewStatus,
    setPreviewUrl,
    addLog,
    clearLogs,
    openDialog,
    closeDialog,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// ── Hook ──
export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
