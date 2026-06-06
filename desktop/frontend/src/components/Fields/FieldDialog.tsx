import { useState, useEffect, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import type { Field, SelectorType, ExtractionMode } from '../../types';

/** Generate a short unique ID */
let idCounter = 0;
function genId(): string {
  return `field_${Date.now()}_${++idCounter}`;
}

export default function FieldDialog() {
  const { state, closeDialog, addField, updateField, addLog } = useApp();
  const editingField = state.editingField;
  const isEditing = editingField !== null;

  // Local form state
  const [name, setName] = useState('');
  const [selectorType, setSelectorType] = useState<SelectorType>('css');
  const [selector, setSelector] = useState('');
  const [extraction, setExtraction] = useState<ExtractionMode>('text');
  const [attribute, setAttribute] = useState('');
  const [many, setMany] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (editingField) {
      setName(editingField.name);
      setSelectorType(editingField.selectorType);
      setSelector(editingField.selector);
      setExtraction(editingField.extraction);
      setAttribute(editingField.attribute ?? '');
      setMany(editingField.many);
    } else {
      setName('');
      setSelectorType('css');
      setSelector('');
      setExtraction('text');
      setAttribute('');
      setMany(false);
    }
  }, [editingField]);

  const handleSave = useCallback(() => {
    if (!name.trim()) {
      alert('请输入字段名称');
      return false;
    }
    if (!selector.trim()) {
      alert('请输入选择器');
      return false;
    }

    const field: Field = {
      id: editingField?.id ?? genId(),
      name: name.trim(),
      selectorType,
      selector: selector.trim(),
      extraction,
      attribute: extraction === 'attribute' ? attribute : undefined,
      many,
    };

    if (isEditing) {
      updateField(field);
      addLog(`[字段] 已更新字段: ${field.name}`);
    } else {
      addField(field);
      addLog(`[字段] 已添加字段: ${field.name}`);
    }

    closeDialog();
  }, [name, selectorType, selector, extraction, attribute, many, editingField, isEditing, updateField, addField, addLog, closeDialog]);

  const handleCancel = useCallback(() => {
    closeDialog();
  }, [closeDialog]);

  if (!state.dialogOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              ✏️ {isEditing ? '编辑字段' : '添加字段'}
            </h3>

            {/* Field name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">字段名称</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="如：标题、价格"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </div>

            {/* Selector type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">选择器类型</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={selectorType}
                onChange={(e) => setSelectorType(e.target.value as SelectorType)}
              >
                <option value="css">CSS 选择器</option>
                <option value="xpath">XPath</option>
              </select>
            </div>

            {/* Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">选择器</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={selectorType === 'css' ? '如 h2.title' : '如 //h2[@class="title"]'}
                value={selector}
                onChange={(e) => setSelector(e.target.value)}
              />
            </div>

            {/* Extraction mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">提取方式</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={extraction}
                onChange={(e) => setExtraction(e.target.value as ExtractionMode)}
              >
                <option value="text">文本</option>
                <option value="attribute">属性</option>
                <option value="html">HTML</option>
                <option value="count">计数</option>
              </select>
            </div>

            {/* Attribute name (only for attribute extraction) */}
            {extraction === 'attribute' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">属性名</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="如 href"
                  value={attribute}
                  onChange={(e) => setAttribute(e.target.value)}
                />
              </div>
            )}

            {/* Many toggle */}
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="rounded border-gray-300"
                checked={many}
                onChange={(e) => setMany(e.target.checked)}
              />
              获取所有匹配（不勾选则只取第一个）
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 px-6 pb-6">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
            >
              ✅ 保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
