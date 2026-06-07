import { useApp } from '../../context/AppContext';
import { useTab } from '../../hooks/useTab';
import type { TabId } from '../../types';

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'scrape', label: '抓取', icon: '🔄' },
  { id: 'fields', label: '字段', icon: '📋' },
  { id: 'results', label: '结果', icon: '📊' },
  { id: 'settings', label: '设置', icon: '⚙️' },
];

export default function Header() {
  const { state, setTab } = useApp();
  const { isActive, switchTo } = useTab({ currentTab: state.tab, onTabChange: setTab });

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold text-gray-800">💼 HaloNew</h1>
        <span className="text-sm text-gray-400 hidden sm:inline">智能招聘助手</span>
      </div>
      <nav className="flex gap-1">
        {TABS.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => switchTo(id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive(id)
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
            }`}
          >
            {icon} {label}
          </button>
        ))}
      </nav>
    </header>
  );
}
