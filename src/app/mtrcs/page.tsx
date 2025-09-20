'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Loader2, Eye } from "lucide-react";
import Link from "next/link";

interface MtrxRow {
  clue: string | { text: string; category: string };
  solution: string;
}

interface Mtrx {
  date: string;
  theme: string;
  rows: MtrxRow[];
}

export default function MtrcsPage() {
  const [allMtrcs, setAllMtrcs] = useState<Mtrx[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  // Form state
  const [newDate, setNewDate] = useState('');
  const [newTheme, setNewTheme] = useState('');
  const [newRows, setNewRows] = useState<Array<{clue: string; solution: string}>>([
    { clue: '', solution: '' }
  ]);

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
    fetchMtrcs();
  }, []);

  // Handle adding new row
  const addNewRow = () => {
    setNewRows([...newRows, { clue: '', solution: '' }]);
  };

  // Handle removing row
  const removeRow = (index: number) => {
    if (newRows.length > 1) {
      setNewRows(newRows.filter((_, i) => i !== index));
    }
  };

  // Handle updating row
  const updateRow = (index: number, field: 'clue' | 'solution', value: string) => {
    const updatedRows = [...newRows];
    updatedRows[index][field] = value;
    setNewRows(updatedRows);
  };

  // Handle creating new mtrx
  const handleCreate = async () => {
    // Validate inputs
    if (!newDate || !newTheme) {
      alert('Please fill in date and theme');
      return;
    }

    // Check if all rows have both clue and solution
    const hasEmptyFields = newRows.some(row => !row.clue.trim() || !row.solution.trim());
    if (hasEmptyFields) {
      alert('Please fill in all clue and solution fields');
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
        // Refresh data
        fetchMtrcs();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      alert('Error creating mtrx');
    } finally {
      setCreating(false);
    }
  };

  // Handle deleting mtrx
  const handleDelete = async (date: string) => {
    if (!confirm(`Are you sure you want to delete the mtrx from ${date}?`)) {
      return;
    }

    setDeleting(date);
    try {
      const response = await fetch('/api/mtrcs', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date })
      });

      if (response.ok) {
        fetchMtrcs();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      alert('Error deleting mtrx');
    } finally {
      setDeleting(null);
    }
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
    <div className="container mx-auto p-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mtrcs Database</h1>
          <p className="text-muted-foreground">
            Manage and view all mtrcs in your Neon database.
          </p>
        </div>
      </div>

      {/* Create New Mtrx Card */}
      <Card className="mb-8 bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-900 flex items-center gap-2">
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

          {/* Dynamic Clue/Solution Rows */}
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
              {newRows.map((row, index) => (
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
                    {newRows.length > 1 && (
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

      {allMtrcs.length === 0 ? (
        <Card className="text-center py-12">
          <CardHeader>
            <CardTitle className="text-xl text-muted-foreground">No Mtrcs Found</CardTitle>
            <CardDescription>
              Create some mtrcs via the API to get started!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="outline" className="font-mono">
              POST /api/mtrcs
            </Badge>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 mb-8">
          {allMtrcs.map((mtrx) => {
            const rows = mtrx.rows as any[];
            return (
            <Card key={mtrx.date} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg hover:text-blue-600 transition-colors">
                      <Link href={`/mtrx/${encodeURIComponent(mtrx.date)}`} className="hover:underline">
                        {mtrx.theme}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-base">{mtrx.date}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">ID: {mtrx.date}</Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="h-8 w-8 p-0"
                    >
                      <Link href={`/mtrx/${encodeURIComponent(mtrx.date)}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(mtrx.date)}
                      disabled={deleting === mtrx.date}
                      className="h-8 w-8 p-0"
                    >
                      {deleting === mtrx.date ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-muted-foreground mb-3">
                      Clues & Solutions ({rows.length} rows)
                    </h4>
                    <div className="grid gap-3">
                      {rows.map((row: any, index: number) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                          <div className="space-y-2">
                            <div className="flex items-start gap-2">
                              <span className="text-xs text-muted-foreground">Clue:</span>
                              <p className="text-sm text-gray-700 flex-1">
                                {typeof row.clue === 'string' ? row.clue : row.clue.text}
                              </p>
                              {typeof row.clue === 'object' && row.clue.category && (
                                <Badge variant="outline" className="text-xs">
                                  {row.clue.category}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">API Usage Examples</CardTitle>
          <CardDescription className="text-blue-700">
            Use these commands to interact with your database via the API.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Create a mtrx:</h4>
            <div className="bg-white border border-blue-200 rounded-md p-3 font-mono text-sm overflow-x-auto">
              <pre className="text-blue-800">
{`curl -X POST http://localhost:3000/api/mtrcs \\
  -H "Content-Type: application/json" \\
  -d '{
    "date": "2025-09-19",
    "theme": "Space Exploration",
    "rows": [
      {"clue": "First human to walk on the moon", "solution": "NEIL ARMSTRONG"},
      {"clue": "Red planet in our solar system", "solution": "MARS"}
    ]
  }'`
}
              </pre>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Get all mtrcs:</h4>
            <div className="bg-white border border-blue-200 rounded-md p-3 font-mono text-sm">
              <pre className="text-blue-800">curl http://localhost:3000/api/mtrcs</pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
