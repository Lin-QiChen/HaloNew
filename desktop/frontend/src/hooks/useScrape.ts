import { useCallback } from 'react';
import type { FetcherConfig } from '../types';

interface UseScrapeProps {
  url: string;
  fetcher: FetcherConfig;
  onStatusChange: (status: 'idle' | 'loading' | 'loaded' | 'error') => void;
  onPreviewUrl: (url: string) => void;
  onLog: (msg: string) => void;
}

export function useScrape({ url, fetcher, onStatusChange, onPreviewUrl, onLog }: UseScrapeProps) {
  const fetchPage = useCallback(async () => {
    if (!url) {
      onLog('[错误] 请先输入目标网址');
      return;
    }

    onStatusChange('loading');
    onLog(`[抓取] 开始抓取: ${url} (${fetcher.type})`);

    try {
      // TODO: Replace with actual API call when backend is ready
      // const res = await api.scrape({ url, fetcher });
      // onPreviewUrl(res.data?.url ?? url);

      // For now, preview the URL directly in iframe
      onPreviewUrl(url);
      onStatusChange('loaded');
      onLog(`[抓取] 页面加载完成: ${url}`);
    } catch (err) {
      onStatusChange('error');
      onLog(`[错误] 抓取失败: ${err instanceof Error ? err.message : String(err)}`);
    }
  }, [url, fetcher, onStatusChange, onPreviewUrl, onLog]);

  return { fetchPage };
}
