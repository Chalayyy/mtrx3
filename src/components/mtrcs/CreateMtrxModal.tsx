'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { DynamicRowEditor } from './DynamicRowEditor';

interface CreateMtrxModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMtrxCreated: () => void;
}

export function CreateMtrxModal({ open, onOpenChange, onMtrxCreated }: CreateMtrxModalProps) {
  const [creating, setCreating] = useState(false);
  const [newDate, setNewDate] = useState('');
  const [newTheme, setNewTheme] = useState('');
  const [newRows, setNewRows] = useState<Array<{clue: string; solution: string}>>([
    { clue: '', solution: '' }
  ]);

  const handleCreate = async () => {
    if (!newDate || !newTheme || newRows.some(row => !row.clue.trim() || !row.solution.trim())) {
      alert('Please fill in all fields');
      return;
    }

    setCreating(true);
    try {
      const response = await fetch('/api/mtrcs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: newDate,
          theme: newTheme,
          rows: newRows
        })
      });

      if (response.ok) {
        // Reset form
        setNewDate('');
        setNewTheme('');
        setNewRows([{ clue: '', solution: '' }]);
        // Close modal and refresh data
        onOpenChange(false);
        onMtrxCreated();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch {
      alert('Error creating mtrx');
    } finally {
      setCreating(false);
    }
  };

  const handleClose = () => {
    // Reset form when closing
    setNewDate('');
    setNewTheme('');
    setNewRows([{ clue: '', solution: '' }]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-green-50 border-green-200">
        <DialogClose onClose={handleClose} />
        <DialogHeader>
          <DialogTitle>
            <span className="text-green-900 flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Create New Mtrx
            </span>
          </DialogTitle>
          <DialogDescription>
            <span className="text-green-700">
            Add a new publicly-accessible MTRX
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-green-900 mb-1 block">Date</label>
              <Input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                placeholder="2025-09-19"
                className="border-green-200 focus:border-green-400"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-green-900 mb-1 block">Theme</label>
              <Input
                value={newTheme}
                onChange={(e) => setNewTheme(e.target.value)}
                placeholder="Space Exploration"
                className="border-green-200 focus:border-green-400"
              />
            </div>
          </div>

          <DynamicRowEditor
            rows={newRows}
            onRowsChange={setNewRows}
          />

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleClose}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={creating}
              className="bg-green-600 hover:bg-green-700 text-white flex-1"
            >
              {creating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Mtrx ({newRows.length} clue{newRows.length !== 1 ? 's' : ''})
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
