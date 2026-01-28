import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";

export interface PuzzleRow {
  clue: string;
  solution: string;
  prefix?: string;
  suffix?: string;
}

interface DynamicRowEditorProps {
  rows: Array<PuzzleRow>;
  onRowsChange: (rows: Array<PuzzleRow>) => void;
}

export function DynamicRowEditor({ rows, onRowsChange }: DynamicRowEditorProps) {
  const addNewRow = () => {
    onRowsChange([...rows, { clue: '', solution: '', prefix: '', suffix: '' }]);
  };

  const removeRow = (index: number) => {
    onRowsChange(rows.filter((_, i) => i !== index));
  };

  const updateRow = (index: number, field: keyof PuzzleRow, value: string) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [field]: value };
    onRowsChange(newRows);
  };

  return (
    <div>
      <label className="text-sm font-medium text-green-900 mb-3 block">Clues & Solutions</label>

      <div className="space-y-3">
        {rows.map((row, index) => (
          <div key={index} className="p-3 border border-green-200 rounded-lg bg-green-25 space-y-3">
            {/* Clue row */}
            <div>
              <label className="text-xs text-green-700 font-medium mb-1 block">
                Clue {index + 1}
              </label>
              <Input
                value={row.clue}
                onChange={(e) => updateRow(index, 'clue', e.target.value)}
                placeholder="Enter the clue..."
                className="border-green-200 focus:border-green-400 text-sm"
              />
            </div>
            {/* Solution row with prefix/suffix */}
            <div className="flex gap-2 items-end">
              <div className="w-16">
                <label className="text-xs text-green-700 font-medium mb-1 block">
                  Prefix
                </label>
                <Input
                  value={row.prefix || ''}
                  onChange={(e) => updateRow(index, 'prefix', e.target.value.toUpperCase())}
                  placeholder="A..."
                  maxLength={5}
                  className="border-green-200 focus:border-green-400 text-sm text-center font-mono"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-green-700 font-medium mb-1 block">
                  Solution {index + 1}
                </label>
                <Input
                  value={row.solution}
                  onChange={(e) => updateRow(index, 'solution', e.target.value)}
                  placeholder="Enter the solution..."
                  className="border-green-200 focus:border-green-400 text-sm"
                />
              </div>
              <div className="w-16">
                <label className="text-xs text-green-700 font-medium mb-1 block">
                  Suffix
                </label>
                <Input
                  value={row.suffix || ''}
                  onChange={(e) => updateRow(index, 'suffix', e.target.value.toUpperCase())}
                  placeholder="...S"
                  maxLength={5}
                  className="border-green-200 focus:border-green-400 text-sm text-center font-mono"
                />
              </div>
              {rows.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeRow(index)}
                  className="h-9 w-9 p-0 border-red-200 text-red-600 hover:bg-red-50 flex-shrink-0"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addNewRow}
        className="mt-3 w-full border-green-200 text-green-700 hover:bg-green-50"
      >
        <Plus className="mr-1 h-3 w-3" />
        Add Row
      </Button>
    </div>
  );
}
