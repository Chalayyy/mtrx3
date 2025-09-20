'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar, Plus } from "lucide-react";
import Link from "next/link";
import { CreateMtrxModal } from "@/components/mtrcs";
import { HomeButton } from "@/components/mtrx";

interface MtrxRow {
  clue: string;
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
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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
            Add a new mtrx or view all previous mtrcs.
          </p>
        </div>
        <div className="flex gap-3">
          <HomeButton />
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white"
            size="lg"
          >
            <Plus className="mr-2 h-5 w-5" />
            Create New Mtrx
          </Button>
        </div>
      </div>

      <CreateMtrxModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onMtrxCreated={fetchMtrcs}
      />

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
            const rows = mtrx.rows;
            return (
            <Link key={mtrx.date} href={`/mtrx/${encodeURIComponent(mtrx.date)}`} className="block group">
              <Card className="hover:shadow-lg hover:border-blue-300 transition-all duration-200 cursor-pointer">
                <CardHeader className="pb-3 flex justify-between item-start">
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors mb-2">
                    {mtrx.theme}
                  </CardTitle>
                  <CardDescription className="text-base text-muted-foreground flex items-center justify-center gap-1">
                    <Calendar className="h-4 w-4" />
                      {mtrx.date}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {rows.map((row, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <span className="text-sm text-muted-foreground">Clue:</span>
                            <p className="text-sm text-gray-700 flex-1">
                              {row.clue}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
