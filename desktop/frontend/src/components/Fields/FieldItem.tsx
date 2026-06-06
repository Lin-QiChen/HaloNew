import type { Field } from '../../types';

interface FieldItemProps {
  field: Field;
  onEdit: (field: Field) => void;
  onDelete: (id: string) => void;
}

export default function FieldItem({ field, onEdit, onDelete }: FieldItemProps) {
  return (
    <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm text-gray-800">{field.name}</span>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
            {field.selectorType.toUpperCase()}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-0.5 truncate">
          {field.selector}
          {field.extraction !== 'text' && ` → ${field.extraction}${field.attribute ? `(${field.attribute})` : ''}`}
          {field.many ? ' [多条]' : ' [单条]'}
        </p>
      </div>
      <div className="flex gap-1 ml-3 shrink-0">
        <button
          onClick={() => onEdit(field)}
          className="px-2 py-1 text-xs text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
          title="编辑"
        >
          ✏️
        </button>
        <button
          onClick={() => onDelete(field.id)}
          className="px-2 py-1 text-xs text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
          title="删除"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
