import { useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import FieldItem from './FieldItem';
import ContainerConfig from './ContainerConfig';
import type { Field } from '../../types';

export default function FieldList() {
  const { state, openDialog, deleteField, clearFields, addLog, setResults } = useApp();

  const handleAdd = useCallback(() => {
    openDialog(null);
  }, [openDialog]);

  const handleEdit = useCallback(
    (field: Field) => {
      openDialog(field);
    },
    [openDialog]
  );

  const handleDelete = useCallback(
    (id: string) => {
      deleteField(id);
      addLog(`[字段] 已删除字段 (${id})`);
    },
    [deleteField, addLog]
  );

  const handleClear = useCallback(() => {
    if (state.fields.length === 0) return;
    clearFields();
    addLog('[字段] 已清空所有字段');
  }, [state.fields.length, clearFields, addLog]);

  const handleBatchScrape = useCallback(async () => {
    if (state.fields.length === 0) {
      addLog('[错误] 请先添加字段');
      return;
    }
    if (!state.project.url) {
      addLog('[错误] 请先输入目标网址');
      return;
    }

    addLog(`[提取] 开始批量提取 (${state.fields.length} 个字段)`);

    try {
      // TODO: Replace with actual API call when backend is ready
      // const res = await api.extract({
      //   url: state.project.url,
      //   containerSelector: state.containerSelector,
      //   fields: state.fields,
      // });
      // setResults(res.data ?? []);

      // Placeholder result
      const sample: Record<string, unknown> = {};
      state.fields.forEach((f) => {
        sample[f.name] = `[${f.selector}]`;
      });
      setResults([sample, sample, sample]);
      addLog(`[提取] 成功提取 ${state.fields.length} 个字段`);
    } catch (err) {
      addLog(`[错误] 提取失败: ${err instanceof Error ? err.message : String(err)}`);
    }
  }, [state.fields, state.project.url, addLog, setResults]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">📋 字段定义</h2>
        <div className="flex gap-2">
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
          >
            ➕ 添加字段
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded hover:bg-gray-200 transition-colors"
            disabled={state.fields.length === 0}
          >
            🗑️ 清空
          </button>
        </div>
      </div>

      {/* Field list */}
      <div className="space-y-2">
        {state.fields.length === 0 ? (
          <p className="text-gray-400 text-sm py-8 text-center">
            还没有字段。点击「添加字段」或先在预览页面点击元素来创建。
          </p>
        ) : (
          state.fields.map((field) => (
            <FieldItem
              key={field.id}
              field={field}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      {/* Container config */}
      <ContainerConfig />

      {/* Batch scrape */}
      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={handleBatchScrape}
          className="w-full px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors text-lg"
          id="scrape-btn"
        >
          ▶️ 开始批量提取
        </button>
      </div>
    </div>
  );
}
