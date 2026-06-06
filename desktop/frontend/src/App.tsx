import { useApp } from './context/AppContext';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import PreviewPane from './components/Scrape/PreviewPane';
import FieldList from './components/Fields/FieldList';
import ResultsView from './components/Results/ResultsView';
import SettingsPanel from './components/Settings/SettingsPanel';
import FieldDialog from './components/Fields/FieldDialog';

export default function App() {
  const { state } = useApp();

  const renderTab = () => {
    switch (state.tab) {
      case 'scrape':
        return <PreviewPane />;
      case 'fields':
        return <FieldList />;
      case 'results':
        return <ResultsView />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-white">
          {renderTab()}
        </main>
      </div>
      <FieldDialog />
    </div>
  );
}
