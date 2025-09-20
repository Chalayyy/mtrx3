'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Loader2 } from "lucide-react";
import { DynamicRowEditor } from '@/components/mtrcs/DynamicRowEditor';

interface CreateMtrxCardProps {
  onMtrxCreated: () => void;
}

export function CreateMtrxCard({ onMtrxCreated }: CreateMtrxCardProps) {
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
        setNewDate('');
        setNewTheme('');
        setNewRows([{ clue: '', solution: '' }]);
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

  return (
    <Card className="mb-8 bg-green-50 border-green-200">
      <CardHeader>
        <CardTitle className="text-green-900 items-center gap-2">
          <Plus className="h-5 w-5" />
          Create New Mtrx
        </CardTitle>
        <CardDescription className="text-green-700">
          Add a new mtrx entry to your database.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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

        <Button
          onClick={handleCreate}
          disabled={creating}
          className="bg-green-600 hover:bg-green-700 text-white w-full"
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
      </CardContent>
    </Card>
  );
}
