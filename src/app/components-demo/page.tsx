"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HomeButton } from "@/components/mtrx";
import Link from "next/link";

export default function ComponentsDemo() {
  return (
    <div className="container mx-auto p-8 max-w-4xl relative">
      <HomeButton />

      <div className="flex flex-col items-center mb-8">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold mb-2">Shadcn/ui Components Demo</h1>
          <p className="text-muted-foreground">
            Showcase of Shadcn/ui components (for dev purposes)
          </p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/mtrcs">View Mtrcs</Link>
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Buttons Section */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>
              Different button variants and sizes for various use cases.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-3 text-muted-foreground">Button Variants</h4>
              <div className="flex flex-wrap gap-3">
                <div className="text-center">
                  <Button className="mb-1">Primary</Button>
                  <p className="text-xs text-muted-foreground">Default</p>
                </div>
                <div className="text-center">
                  <Button variant="secondary" className="mb-1">Secondary</Button>
                  <p className="text-xs text-muted-foreground">Light gray</p>
                </div>
                <div className="text-center">
                  <Button variant="destructive" className="mb-1">Destructive</Button>
                  <p className="text-xs text-muted-foreground">Red/danger</p>
                </div>
                <div className="text-center">
                  <Button variant="outline" className="mb-1">Outline</Button>
                  <p className="text-xs text-muted-foreground">Border only</p>
                </div>
                <div className="text-center">
                  <Button variant="ghost" className="mb-1">Ghost</Button>
                  <p className="text-xs text-muted-foreground">Transparent</p>
                </div>
                <div className="text-center">
                  <Button variant="link" className="mb-1">Link</Button>
                  <p className="text-xs text-muted-foreground">Text only</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-3 text-muted-foreground">Button Sizes</h4>
              <div className="flex flex-wrap items-end gap-3">
                <div className="text-center">
                  <Button size="sm" className="mb-1">Small</Button>
                  <p className="text-xs text-muted-foreground">32px</p>
                </div>
                <div className="text-center">
                  <Button size="default" className="mb-1">Default</Button>
                  <p className="text-xs text-muted-foreground">36px</p>
                </div>
                <div className="text-center">
                  <Button size="lg" className="mb-1">Large</Button>
                  <p className="text-xs text-muted-foreground">40px</p>
                </div>
                <div className="text-center">
                  <Button size="icon" className="mb-1">🚀</Button>
                  <p className="text-xs text-muted-foreground">Square</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-3 text-muted-foreground">Interactive Examples</h4>
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => alert('Primary button clicked!')}>
                  Click Me
                </Button>
                <Button variant="outline" onClick={() => alert('Outline button clicked!')}>
                  Outline Button
                </Button>
                <Button variant="destructive" onClick={() => confirm('Are you sure?')}>
                  Delete Item
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cards Section */}
        <Card>
          <CardHeader>
            <CardTitle>Cards</CardTitle>
            <CardDescription>
              Flexible containers for grouping related content.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Example Card</CardTitle>
                  <CardDescription>
                    This is a card description that explains what this card is about.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Card content goes here. This could be any type of content like text,
                    forms, or other components.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Another Card</CardTitle>
                  <CardDescription>
                    Cards are perfect for displaying information in an organized way.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Badge>Feature</Badge>
                    <Badge variant="secondary">New</Badge>
                    <Badge variant="outline">Available</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Badges Section */}
        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
            <CardDescription>
              Small status indicators and labels for categorization.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
