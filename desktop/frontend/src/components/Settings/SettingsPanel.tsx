import { useApp } from '../../context/AppContext';

export default function SettingsPanel() {
  const { state, clearLogs } = useApp();

  return (
    <div className="p-6 space-y-6">
      {/* About */}
      <section className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">关于</h3>
        <p className="text-sm text-gray-600">Scrapling Desktop v0.1.0</p>
        <p className="text-sm text-gray-600">
          基于 Scrapling 库构建 —
          <a
            href="https://github.com/D4Vinci/Scrapling"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline ml-1"
          >
            GitHub
          </a>
        </p>
      </section>

      {/* Logs */}
      <section className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-700">日志</h3>
          <button
            onClick={clearLogs}
            className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
          >
            清空
          </button>
        </div>
        <pre
          id="log-output"
          className="bg-gray-900 text-gray-100 text-xs p-4 rounded-lg h-64 overflow-y-auto font-mono leading-relaxed"
        >
          {state.logs.map((log, i) => (
            <div key={i}>{log}</div>
          ))}
        </pre>
      </section>
    </div>
  );
}
