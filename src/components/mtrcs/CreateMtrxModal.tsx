'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Loader2, Lock, Calendar, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { DynamicRowEditor, type PuzzleRow } from './DynamicRowEditor';

const PUZZLE_PASSWORD = '6454';
const AUTH_STORAGE_KEY = 'mtrx-create-auth';

interface CreateMtrxModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMtrxCreated: () => void;
}

export function CreateMtrxModal({ open, onOpenChange, onMtrxCreated }: CreateMtrxModalProps) {
  const [creating, setCreating] = useState(false);
  const [newDate, setNewDate] = useState('');
  const [newTheme, setNewTheme] = useState('');
  const [newRows, setNewRows] = useState<Array<PuzzleRow>>([
    { clue: '', solution: '', prefix: '', suffix: '' }
  ]);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check localStorage for existing authentication on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePasswordSubmit = () => {
    if (password === PUZZLE_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

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
        setNewRows([{ clue: '', solution: '', prefix: '', suffix: '' }]);
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
    // Reset form when closing (but keep authentication)
    setNewDate('');
    setNewTheme('');
    setNewRows([{ clue: '', solution: '', prefix: '', suffix: '' }]);
    setPassword('');
    setPasswordError(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-green-50 border-green-200">
        <DialogClose onClose={handleClose} />
        {!isAuthenticated ? (
          <>
            <DialogHeader>
              <DialogTitle>
                <span className="text-green-900 flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Enter Password
                </span>
              </DialogTitle>
              <DialogDescription>
                <span className="text-green-700">
                  A password is required to create new puzzles
                </span>
              </DialogDescription>
            </DialogHeader>

            <div className="px-6 pb-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-green-900 mb-1 block">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handlePasswordSubmit();
                    }
                  }}
                  placeholder="Enter password"
                  className={`border-green-200 focus:border-green-400 ${passwordError ? 'border-red-500 focus:border-red-500' : ''}`}
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1">Incorrect password</p>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handlePasswordSubmit}
                  className="bg-green-600 hover:bg-green-700 text-white flex-1"
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Unlock
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
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

              {/* Live Preview */}
              <div className="border-t border-green-200 pt-4 mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="h-4 w-4 text-green-700" />
                  <span className="text-sm font-medium text-green-900">Live Preview</span>
                </div>

                <div className="bg-white rounded-lg border border-green-100 p-4">
                  {/* Preview Header */}
                  <div className="mb-4 text-center">
                    <h3 className="text-xl font-bold mb-1">
                      {newTheme || <span className="text-gray-300 italic">Theme...</span>}
                    </h3>
                    <p className="text-muted-foreground flex items-center justify-center gap-1 text-sm">
                      <Calendar className="h-3 w-3" />
                      {newDate || <span className="text-gray-300 italic">Date...</span>}
                    </p>
                  </div>

                  {/* Preview Clues */}
                  <Card className="shadow-sm">
                    <CardContent className="space-y-3 py-4">
                      {newRows.map((row, index) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                          <p className="text-sm font-medium flex-1">
                            {row.clue || <span className="text-gray-300 italic">Clue {index + 1}...</span>}
                          </p>
                          <div className="sm:flex-shrink-0 flex items-center">
                            {row.prefix && (
                              <span className="text-xs text-foreground">{row.prefix}</span>
                            )}
                            <Input
                              type="text"
                              placeholder="Enter your answer..."
                              disabled
                              className="w-28 text-xs h-8 bg-gray-50 px-2"
                            />
                            {row.suffix && (
                              <span className="text-xs text-foreground">{row.suffix}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>

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
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
