'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Calendar, Trash2, AlertTriangle, Edit3, Save, X, Plus } from "lucide-react";
import { HomeButton } from "@/components/mtrx";

interface MtrxRow {
  clue: string;
  solution: string;
  prefix?: string;
  suffix?: string;
}

interface Mtrx {
  date: string;
  theme: string;
  rows: MtrxRow[];
}

export default function ManagePage() {
  const [allMtrcs, setAllMtrcs] = useState<Mtrx[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingDates, setDeletingDates] = useState<Set<string>>(new Set());
  const [editingDate, setEditingDate] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Mtrx | null>(null);
  const [updating, setUpdating] = useState(false);

  // Fetch mtrcs data
  const fetchMtrcs = async () => {
    try {
      const response = await fetch('/api/mtrcs');
      const data = await response.json();
      setAllMtrcs(data);
    } catch (error) {
      console.error('Error fetching mtrcs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Set page title
    document.title = "Manage - MTRX";

    fetchMtrcs();
  }, []);

  const startEditing = (mtrx: Mtrx) => {
    setEditingDate(mtrx.date);
    setEditForm({ ...mtrx, rows: [...mtrx.rows] });
  };

  const cancelEditing = () => {
    setEditingDate(null);
    setEditForm(null);
  };

  const updateMtrx = async () => {
    if (!editForm) return;

    setUpdating(true);
    try {
      const response = await fetch(`/api/mtrcs/${encodeURIComponent(editForm.date)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          theme: editForm.theme,
          rows: editForm.rows,
        }),
      });

      if (response.ok) {
        const updatedMtrx = await response.json();
        setAllMtrcs(prev => prev.map(m => m.date === editForm.date ? updatedMtrx : m));
        cancelEditing();
        console.log(`Successfully updated MTRX for ${editForm.date}`);
      } else {
        const error = await response.json();
        alert(`Failed to update MTRX: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error updating mtrx:', error);
      alert('Failed to update MTRX. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (date: string, theme: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the MTRX "${theme}" from ${date}? This action cannot be undone.`
    );

    if (!confirmed) return;

    setDeletingDates(prev => new Set(prev.add(date)));

    try {
      const response = await fetch('/api/mtrcs', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date }),
      });

      if (response.ok) {
        setAllMtrcs(prev => prev.filter(mtrx => mtrx.date !== date));
        console.log(`Successfully deleted MTRX for ${date}`);
      } else {
        const error = await response.json();
        alert(`Failed to delete MTRX: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error deleting mtrx:', error);
      alert('Failed to delete MTRX. Please try again.');
    } finally {
      setDeletingDates(prev => {
        const newSet = new Set(prev);
        newSet.delete(date);
        return newSet;
      });
    }
  };

  const addRow = () => {
    if (!editForm) return;
    setEditForm({
      ...editForm,
      rows: [...editForm.rows, { clue: '', solution: '', prefix: '', suffix: '' }]
    });
  };

  const removeRow = (index: number) => {
    if (!editForm) return;
    setEditForm({
      ...editForm,
      rows: editForm.rows.filter((_, i) => i !== index)
    });
  };

  const updateRow = (index: number, field: keyof MtrxRow, value: string) => {
    if (!editForm) return;
    const newRows = [...editForm.rows];
    newRows[index] = { ...newRows[index], [field]: value };
    setEditForm({ ...editForm, rows: newRows });
  };

  if (loading) {
    return (
      <div className="container mx-auto p-8 max-w-6xl">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 max-w-6xl relative">
      <HomeButton />

      <div className="flex flex-col items-center mb-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2 text-blue-600 flex items-center justify-center gap-3">
            <Edit3 className="h-8 w-8" />
            Manage MTRCs
          </h1>
          <p className="text-muted-foreground">
            Edit themes, clues, and solutions, or delete MTRX puzzles from your database.
          </p>
        </div>
      </div>

      {allMtrcs.length === 0 ? (
        <Card className="text-center py-12">
          <CardHeader>
            <CardTitle className="text-xl text-muted-foreground">No MTRCs Found</CardTitle>
            <CardDescription>
              There are no MTRX puzzles in your database to manage.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-4">
          {allMtrcs.map((mtrx) => (
            <Card key={mtrx.date} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    {editingDate === mtrx.date ? (
                      <div className="space-y-3">
                        <Input
                          value={editForm?.theme || ''}
                          onChange={(e) => setEditForm(prev => prev ? { ...prev, theme: e.target.value } : null)}
                          placeholder="Theme"
                          className="text-xl font-semibold"
                        />
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {mtrx.date}
                          <Badge variant="outline">
                            {editForm?.rows.length} {editForm?.rows.length === 1 ? 'clue' : 'clues'}
                          </Badge>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <CardTitle className="text-xl mb-2">{mtrx.theme}</CardTitle>
                        <CardDescription className="text-base flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {mtrx.date}
                          <Badge variant="outline" className="ml-2">
                            {mtrx.rows.length} {mtrx.rows.length === 1 ? 'clue' : 'clues'}
                          </Badge>
                        </CardDescription>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    {editingDate === mtrx.date ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={cancelEditing}
                          disabled={updating}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={updateMtrx}
                          disabled={updating}
                        >
                          {updating ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="h-4 w-4 mr-1" />
                              Save
                            </>
                          )}
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startEditing(mtrx)}
                        >
                          <Edit3 className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(mtrx.date, mtrx.theme)}
                          disabled={deletingDates.has(mtrx.date)}
                        >
                          {deletingDates.has(mtrx.date) ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                              Deleting...
                            </>
                          ) : (
                            <>
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </>
                          )}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {editingDate === mtrx.date ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Clues & Solutions:</h4>
                      <Button variant="outline" size="sm" onClick={addRow}>
                        <Plus className="h-4 w-4 mr-1" />
                        Add Row
                      </Button>
                    </div>
                    {editForm?.rows.map((row, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg border space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <label className="text-xs font-medium text-muted-foreground mb-1 block">Clue {index + 1}</label>
                            <Textarea
                              value={row.clue}
                              onChange={(e) => updateRow(index, 'clue', e.target.value)}
                              placeholder="Enter clue..."
                              className="min-h-[60px]"
                            />
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeRow(index)}
                            disabled={editForm.rows.length <= 1}
                            className="ml-2"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex gap-2 items-end">
                          <div className="w-20">
                            <label className="text-xs font-medium text-muted-foreground mb-1 block">Prefix</label>
                            <Input
                              value={row.prefix || ''}
                              onChange={(e) => updateRow(index, 'prefix', e.target.value.toUpperCase())}
                              placeholder="A..."
                              maxLength={5}
                              className="font-mono text-center"
                            />
                          </div>
                          <div className="flex-1">
                            <label className="text-xs font-medium text-muted-foreground mb-1 block">Solution</label>
                            <Input
                              value={row.solution}
                              onChange={(e) => updateRow(index, 'solution', e.target.value)}
                              placeholder="SOLUTION"
                              className="font-mono uppercase"
                            />
                          </div>
                          <div className="w-20">
                            <label className="text-xs font-medium text-muted-foreground mb-1 block">Suffix</label>
                            <Input
                              value={row.suffix || ''}
                              onChange={(e) => updateRow(index, 'suffix', e.target.value.toUpperCase())}
                              placeholder="...S"
                              maxLength={5}
                              className="font-mono text-center"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {mtrx.rows.slice(0, 3).map((row, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                        <div className="space-y-2">
                          <div className="flex items-baseline gap-2">
                            <span className="text-xs font-medium text-muted-foreground w-16">Clue:</span>
                            <p className="text-sm text-gray-700 flex-1">
                              {row.clue}
                            </p>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-xs font-medium text-muted-foreground w-16">Solution:</span>
                            <p className="text-sm font-mono text-green-700 font-medium flex items-center">
                              {row.prefix && <span className="text-muted-foreground">{row.prefix}</span>}
                              <span className="px-1 py-0.5 bg-green-50 rounded border border-green-200">{row.solution}</span>
                              {row.suffix && <span className="text-muted-foreground">{row.suffix}</span>}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {mtrx.rows.length > 3 && (
                      <p className="text-sm text-muted-foreground italic text-center py-2">
                        ... and {mtrx.rows.length - 3} more clue{mtrx.rows.length - 3 === 1 ? '' : 's'}
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Total: {allMtrcs.length} MTRX {allMtrcs.length === 1 ? 'puzzle' : 'puzzles'} in database
        </p>
      </div>
    </div>
  );
}
