import { useApp } from '../../context/AppContext';

export default function PreviewPane() {
  const { state } = useApp();

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Status banner */}
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 text-sm text-gray-500">
        {state.previewStatus === 'idle' && <p>输入网址并点击「抓取」开始</p>}
        {state.previewStatus === 'loading' && (
          <p className="text-blue-600">🔄 正在加载页面...</p>
        )}
        {state.previewStatus === 'loaded' && (
          <p className="text-green-600">✅ 页面已加载: {state.previewUrl}</p>
        )}
        {state.previewStatus === 'error' && (
          <p className="text-red-600">❌ 页面加载失败</p>
        )}
      </div>

      {/* Preview iframe */}
      <div className="flex-1 bg-white">
        {state.previewUrl ? (
          <iframe
            id="page-preview"
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin"
            src={state.previewUrl}
            title="Page preview"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <p className="text-5xl mb-4">🕷️</p>
              <p className="text-lg">在侧边栏输入网址并点击「抓取」</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
