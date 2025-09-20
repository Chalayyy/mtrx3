import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";

interface DynamicRowEditorProps {
  rows: Array<{clue: string; solution: string}>;
  onRowsChange: (rows: Array<{clue: string; solution: string}>) => void;
}

export function DynamicRowEditor({ rows, onRowsChange }: DynamicRowEditorProps) {
  const addNewRow = () => {
    onRowsChange([...rows, { clue: '', solution: '' }]);
  };

  const removeRow = (index: number) => {
    onRowsChange(rows.filter((_, i) => i !== index));
  };

  const updateRow = (index: number, field: 'clue' | 'solution', value: string) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    onRowsChange(newRows);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-medium text-green-900">Clues & Solutions</label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addNewRow}
          className="border-green-200 text-green-700 hover:bg-green-50"
        >
          <Plus className="mr-1 h-3 w-3" />
          Add Row
        </Button>
      </div>

      <div className="space-y-3">
        {rows.map((row, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 border border-green-200 rounded-lg bg-green-25">
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
            <div className="flex gap-2">
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
              {rows.length > 1 && (
                <div className="flex items-end">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeRow(index)}
                    className="h-9 w-9 p-0 border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
