'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Grid3X3, Puzzle, ArrowRight, Sparkles, Code, Palette } from "lucide-react";
import Link from "next/link";
import { PageContainer } from "@/components/mtrx";

interface Mtrx {
  date: string;
  theme: string;
  rows: Array<{
    clue: string;
    solution: string;
  }>;
}

export default function Home() {
  const [recentMtrx, setRecentMtrx] = useState<Mtrx | null>(null);
  const [totalMtrcs, setTotalMtrcs] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all mtrcs to get the most recent one and total count
        const response = await fetch('/api/mtrcs');
        if (response.ok) {
          const mtrcs: Mtrx[] = await response.json();
          setTotalMtrcs(mtrcs.length);

          // Get the most recent mtrx (assuming they're sorted by date)
          if (mtrcs.length > 0) {
            // Sort by date descending to get the most recent
            const sortedMtrcs = mtrcs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            setRecentMtrx(sortedMtrcs[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching mtrcs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <PageContainer>
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center space-y-12">
        {/* Hero Section */}
        <div className="space-y-6 max-w-2xl">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                MTRX
              </h1>
              <p className="absolute -top-2 -right-9 h-6 w-6">BETA</p>
              <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-500" />
            </div>
          </div>

          <p className="text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Daily themed word puzzles
          </p>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Grid3X3 className="h-3 w-3" />
              {loading ? "..." : totalMtrcs} {totalMtrcs === 1 ? "Puzzle" : "Puzzles"} Available
            </Badge>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid gap-6 md:grid-cols-2 w-full max-w-2xl">
          {/* Browse All Mtrcs */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <Grid3X3 className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Browse All Puzzles</CardTitle>
                  <CardDescription>Explore our complete collection</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full group-hover:scale-105 transition-transform">
                <Link href="/mtrcs">
                  View All Mtrcs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Featured/Recent Mtrx */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                  <Puzzle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">
                    {recentMtrx ? "Latest Puzzle" : "Start Playing"}
                  </CardTitle>
                  <CardDescription>
                    {recentMtrx ? `${recentMtrx.theme}` : "Jump right into the fun"}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {recentMtrx ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {recentMtrx.date}
                  </div>
                  <Button asChild variant="outline" className="w-full group-hover:scale-105 transition-transform">
                    <Link href={`/mtrx/${encodeURIComponent(recentMtrx.date)}`}>
                      Play &quot;{recentMtrx.theme}&quot;
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ) : (
                <Button asChild variant="outline" className="w-full group-hover:scale-105 transition-transform">
                  <Link href="/mtrcs">
                    {loading ? "Loading..." : "Explore Puzzles"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats or Info */}
        <div className="bg-muted/50 rounded-xl p-6 max-w-md">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
            <Sparkles className="h-4 w-4" />
            <span className="font-medium">How a MTRX Works</span>
          </div>
          <p className="text-sm text-center">
            Each puzzle presents a theme and clues. The answer to all the clues combined will fit the theme, though inidividual answers might not.
          </p>
        </div>

        {/* Developer Links */}
        <div>
          <span>
              Dev Links (Nothing interesting here)
            </span>
          <div className="flex flex-wrap gap-3 justify-center">

            <Button variant="outline" size="sm" asChild className="text-blue-600 border-blue-200 hover:bg-blue-50">
              <Link href="/api-usage">
                <Code className="h-4 w-4 mr-2" />
                API Usage
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild className="text-purple-600 border-purple-200 hover:bg-purple-50">
              <Link href="/components-demo">
                <Palette className="h-4 w-4 mr-2" />
                Components Demo
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
