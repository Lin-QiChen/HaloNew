import { useApp } from '../../context/AppContext';

export default function ContainerConfig() {
  const { state, setContainerSelector, addLog } = useApp();

  const handleSelectFromPreview = () => {
    addLog('[容器] 从页面选取容器 — 待集成');
    // TODO: Communicate with iframe to select element
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-1">📦 列表模式（可选）</h3>
      <p className="text-xs text-gray-500 mb-3">
        如果页面包含多个重复项（如商品列表），先指定容器选择器
      </p>
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="如 .product-card"
          value={state.containerSelector}
          onChange={(e) => setContainerSelector(e.target.value)}
        />
        <button
          onClick={handleSelectFromPreview}
          className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors shrink-0"
        >
          从页面选取
        </button>
      </div>
    </div>
  );
}
