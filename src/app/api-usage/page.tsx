"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageContainer, HomeButton } from "@/components/mtrx";
import { Code, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function ApiUsagePage() {
  useEffect(() => {
    // Set page title
    document.title = "API Usage - MTRX";
  }, []);

  return (
    <PageContainer>
      <HomeButton />

      <div className="container mx-auto p-8 max-w-4xl">
        <div className="flex flex-col items-center mb-8">
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-3">
              <Code className="h-8 w-8 text-blue-600" />
              API Usage Guide
            </h1>
            <p className="text-muted-foreground">
              How to direclty interact with the database (for dev purposes)
            </p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/components-demo">
              <ExternalLink className="h-4 w-4 mr-2" />
              Components
            </Link>
          </Button>
        </div>

        <div className="space-y-6">
          {/* API Overview */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">MTRX API Overview</CardTitle>
              <CardDescription className="text-blue-700">
                The MTRX API allows you to programmatically create and retrieve word puzzles.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">🎯 Available Endpoints</h4>
                  <ul className="space-y-1 text-blue-700">
                    <li>• GET /api/mtrcs - Retrieve all puzzles</li>
                    <li>• POST /api/mtrcs - Create a new puzzle</li>
                    <li>• GET /api/mtrcs/[date] - Get specific puzzle</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">📋 Data Format</h4>
                  <ul className="space-y-1 text-blue-700">
                    <li>• JSON request/response format</li>
                    <li>• Date in YYYY-MM-DD format</li>
                    <li>• Each puzzle has theme and clue rows</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Create Puzzle Example */}
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-900">Create a New Puzzle</CardTitle>
              <CardDescription className="text-green-700">
                Use this POST request to add a new MTRX puzzle to the database.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 border-green-300">
                    POST /api/mtrcs
                  </Badge>
                  <span className="text-sm text-green-700">Creates a new puzzle</span>
                </div>
                <div className="bg-white border border-green-200 rounded-md p-4 font-mono text-sm overflow-x-auto">
                  <pre className="text-green-800">
{`curl -X POST http://localhost:3000/api/mtrcs \\
  -H "Content-Type: application/json" \\
  -d '{
    "date": "2025-09-20",
    "theme": "Space Exploration",
    "rows": [
      {
        "clue": "First human to walk on the moon",
        "solution": "NEIL ARMSTRONG"
      },
      {
        "clue": "Red planet in our solar system",
        "solution": "MARS"
      },
      {
        "clue": "Space agency that landed on the moon",
        "solution": "NASA"
      }
    ]
  }'`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Get All Puzzles Example */}
          <Card className="bg-purple-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-purple-900">Retrieve All Puzzles</CardTitle>
              <CardDescription className="text-purple-700">
                Fetch a list of all available MTRX puzzles.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-800 border-purple-300">
                    GET /api/mtrcs
                  </Badge>
                  <span className="text-sm text-purple-700">Returns array of all puzzles</span>
                </div>
                <div className="bg-white border border-purple-200 rounded-md p-4 font-mono text-sm">
                  <pre className="text-purple-800">curl http://localhost:3000/api/mtrcs</pre>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Get Specific Puzzle Example */}
          <Card className="bg-orange-50 border-orange-200">
            <CardHeader>
              <CardTitle className="text-orange-900">Get Specific Puzzle</CardTitle>
              <CardDescription className="text-orange-700">
                Retrieve a specific puzzle by its date.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-800 border-orange-300">
                    GET /api/mtrcs/[date]
                  </Badge>
                  <span className="text-sm text-orange-700">Returns specific puzzle</span>
                </div>
                <div className="bg-white border border-orange-200 rounded-md p-4 font-mono text-sm">
                  <pre className="text-orange-800">curl http://localhost:3000/api/mtrcs/2025-09-20</pre>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Response Format */}
          <Card>
            <CardHeader>
              <CardTitle>Response Format</CardTitle>
              <CardDescription>
                All API responses return JSON data in this format.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 border rounded-md p-4 font-mono text-sm overflow-x-auto">
                <pre className="text-gray-800">
{`{
  "date": "2025-09-20",
  "theme": "Space Exploration",
  "rows": [
    {
      "clue": "First human to walk on the moon",
      "solution": "NEIL ARMSTRONG"
    },
    {
      "clue": "Red planet in our solar system",
      "solution": "MARS"
    }
  ]
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Tips Section */}
          <Card className="bg-yellow-50 border-yellow-200">
            <CardHeader>
              <CardTitle className="text-yellow-900">💡 Tips & Best Practices</CardTitle>
              <CardDescription className="text-yellow-700">
                Guidelines for creating great MTRX puzzles via the API.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-2">🎯 Puzzle Design</h4>
                  <ul className="space-y-1 text-yellow-700">
                    <li>• Choose a cohesive theme</li>
                    <li>• Make clues challenging but fair</li>
                    <li>• Aim for 3-5 clue/solution pairs</li>
                    <li>• Solutions should relate to the theme</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-2">⚙️ Technical</h4>
                  <ul className="space-y-1 text-yellow-700">
                    <li>• Use YYYY-MM-DD date format</li>
                    <li>• Solutions should be UPPERCASE</li>
                    <li>• Ensure proper JSON formatting</li>
                    <li>• Test endpoints with curl or Postman</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
