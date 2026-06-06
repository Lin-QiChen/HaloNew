import { useApp } from '../../context/AppContext';

export default function ResultsView() {
  const { state, addLog } = useApp();

  const handleExport = (format: 'json' | 'csv' | 'xlsx') => {
    addLog(`[导出] 导出格式: ${format.toUpperCase()}`);
    // TODO: Implement actual export via API or client-side
    if (state.results.length === 0) {
      addLog('[错误] 没有可导出的结果');
      return;
    }

    try {
      if (format === 'json') {
        const blob = new Blob([JSON.stringify(state.results, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `scrapling-results-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        addLog(`[导出] ${format.toUpperCase()} 导出 — 待后端集成`);
      }
      addLog(`[导出] 成功导出 ${state.results.length} 条数据`);
    } catch (err) {
      addLog(`[错误] 导出失败: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const keys =
    state.results.length > 0
      ? Object.keys(state.results[0])
      : [];

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">📊 提取结果</h2>
        <div className="flex gap-2">
          <button
            onClick={() => handleExport('json')}
            className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            disabled={state.results.length === 0}
          >
            📄 JSON
          </button>
          <button
            onClick={() => handleExport('csv')}
            className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            disabled={state.results.length === 0}
          >
            📃 CSV
          </button>
          <button
            onClick={() => handleExport('xlsx')}
            className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            disabled={state.results.length === 0}
          >
            📗 Excel
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        {state.results.length === 0 ? (
          <p className="text-gray-400 text-sm py-16 text-center">
            还没有结果。在「字段」选项卡中配置好字段后运行批量提取。
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {keys.map((key) => (
                  <th key={key} className="px-4 py-2 text-left font-medium text-gray-600">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {state.results.map((row, i) => (
                <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  {keys.map((key) => (
                    <td key={key} className="px-4 py-2 text-gray-700">
                      {String(row[key] ?? '')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {state.results.length > 0 && (
        <p className="text-sm text-gray-500">共 {state.results.length} 条结果</p>
      )}
    </div>
  );
}
