import { useApp } from '../../context/AppContext';
import { useScrape } from '../../hooks/useScrape';

export default function Sidebar() {
  const {
    state,
    setProjectName,
    setProjectUrl,
    setFetcherType,
    setFetcher,
    setPreviewStatus,
    setPreviewUrl,
    addLog,
  } = useApp();

  const { fetchPage } = useScrape({
    url: state.project.url,
    fetcher: state.fetcher,
    onStatusChange: setPreviewStatus,
    onPreviewUrl: setPreviewUrl,
    onLog: addLog,
  });

  const fetcherOptions = () => {
    switch (state.fetcher.type) {
      case 'basic':
        return (
          <div className="space-y-2 mt-2">
            <label className="block text-xs text-gray-500">模拟浏览器</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="chrome_120"
              value={state.fetcher.impersonate}
              onChange={(e) => setFetcher({ impersonate: e.target.value })}
            />
          </div>
        );
      case 'dynamic':
        return (
          <div className="space-y-2 mt-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="rounded border-gray-300"
                checked={state.fetcher.networkIdle}
                onChange={(e) => setFetcher({ networkIdle: e.target.checked })}
              />
              等待网络空闲
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="rounded border-gray-300"
                checked={state.fetcher.blockAds}
                onChange={(e) => setFetcher({ blockAds: e.target.checked })}
              />
              拦截广告
            </label>
          </div>
        );
      case 'stealthy':
        return (
          <div className="space-y-2 mt-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="rounded border-gray-300"
                checked={state.fetcher.solveCloudflare}
                onChange={(e) => setFetcher({ solveCloudflare: e.target.checked })}
              />
              绕过 Cloudflare
            </label>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <aside className="w-72 bg-white border-r border-gray-200 p-4 overflow-y-auto flex flex-col gap-5 shrink-0">
      {/* ── Project Section ── */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">📌 项目</h3>
        <div className="flex gap-1 mb-2">
          <button
            onClick={() => addLog('[项目] 新建项目')}
            className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            title="新建项目"
          >
            ➕ 新建
          </button>
          <button
            onClick={() => addLog('[项目] 保存项目')}
            className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            title="保存项目"
          >
            💾 保存
          </button>
          <button
            onClick={() => addLog('[项目] 加载项目')}
            className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            title="加载项目"
          >
            📂 加载
          </button>
        </div>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="项目名称"
          value={state.project.name}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </section>

      {/* ── URL Section ── */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">🔗 目标网址</h3>
        <input
          type="url"
          className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
          placeholder="https://example.com"
          value={state.project.url}
          onChange={(e) => setProjectUrl(e.target.value)}
        />
        <button
          onClick={fetchPage}
          className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          id="fetch-btn"
        >
          🚀 抓取
        </button>
      </section>

      {/* ── Fetcher Config ── */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">⚙️ 抓取配置</h3>

        <label className="block text-xs text-gray-500 mb-1">抓取方式</label>
        <select
          className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
          value={state.fetcher.type}
          onChange={(e) => setFetcherType(e.target.value as 'basic' | 'dynamic' | 'stealthy')}
        >
          <option value="basic">Basic HTTP</option>
          <option value="dynamic">Dynamic (Browser)</option>
          <option value="stealthy">Stealthy Browser</option>
        </select>

        {fetcherOptions()}

        <label className="block text-xs text-gray-500 mt-3 mb-1">超时 (ms)</label>
        <input
          type="number"
          className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
          value={state.fetcher.timeout}
          onChange={(e) => setFetcher({ timeout: Number(e.target.value) })}
        />

        <label className="block text-xs text-gray-500 mb-1">代理 (可选)</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="http://user:pass@host:port"
          value={state.fetcher.proxy}
          onChange={(e) => setFetcher({ proxy: e.target.value })}
        />
      </section>
    </aside>
  );
}
