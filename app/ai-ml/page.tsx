// app/ai-ml/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Brain, AlertTriangle, Target, TrendingUp } from "lucide-react";

/* ---------------- Sample Data ---------------- */
const topStats = {
  avgConfidence: "78%",
  highRiskAreas: 3,
  predictions: 24,
  accuracy: "94.2%",
};

const diseasePredictions = [
  { disease: "Cholera", risk: "High", confidence: 82, area: "Majuli, Assam" },
  { disease: "Diarrhea", risk: "Medium", confidence: 74, area: "Churachandpur, Manipur" },
  { disease: "Typhoid", risk: "Low", confidence: 65, area: "Aizawl, Mizoram" },
];

const diseaseChartData = [
  { name: "Diarrhea", value: 45 },
  { name: "Cholera", value: 25 },
  { name: "Typhoid", value: 18 },
  { name: "Hepatitis A", value: 12 },
  { name: "Dysentery", value: 8 },
];

const confidenceDistributionData = [
  { name: "High Confidence", value: 65 },
  { name: "Medium Confidence", value: 25 },
  { name: "Low Confidence", value: 10 },
];

const predictionConfidenceByDisease = [
  { disease: "Diarrhea", confidence: 87 },
  { disease: "Cholera", confidence: 76 },
  { disease: "Typhoid", confidence: 82 },
  { disease: "Hepatitis A", confidence: 71 },
  { disease: "Dysentery", confidence: 68 },
];

const weeklyTrendsData = [
  { day: "Mon", risk1: 32, risk2: 28, risk3: 15 },
  { day: "Tue", risk1: 34, risk2: 30, risk3: 15 },
  { day: "Wed", risk1: 33, risk2: 32, risk3: 16 },
  { day: "Thu", risk1: 35, risk2: 36, risk3: 18 },
  { day: "Fri", risk1: 36, risk2: 40, risk3: 19 },
  { day: "Sat", risk1: 34, risk2: 39, risk3: 20 },
  { day: "Sun", risk1: 37, risk2: 44, risk3: 22 },
];
/* ------------------------------------------------------------------------------ */

export default function AIMLInsightsPage() {
  // Strongly typed tab state
  const [activeTab, setActiveTab] = useState<
    "predictions" | "confidence" | "trends" | "correlation"
  >("predictions");

  const [query, setQuery] = useState("");
  const [area, setArea] = useState("All Areas");
  const [device, setDevice] = useState("All Devices");

  const areas = ["All Areas", "Area A", "Area B", "Area C"];
  const devices = ["All Devices", "WQ-001", "WQ-002", "WQ-003"];

  // filtered predictions
  const filteredPredictions = useMemo(() => {
    return diseasePredictions.filter((d) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q.length === 0 ||
        d.disease.toLowerCase().includes(q) ||
        d.area?.toLowerCase().includes(q);
      const matchesArea = area === "All Areas" || d.area === area;
      const matchesDevice = device === "All Devices" || device === "";
      return matchesQuery && matchesArea && matchesDevice;
    });
  }, [query, area, device]);

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-teal-50 min-h-screen">
      {/* Header */}
      <div className="mb-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900">AI/ML Insights</h1>
        <p className="text-gray-600 mt-1">
          Advanced disease outbreak predictions and analysis
        </p>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-[220px]">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search by disease, area, or device..."
              aria-label="Search predictions"
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {areas.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>

          <select
            value={device}
            onChange={(e) => setDevice(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {devices.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-gray-500">Avg Confidence</p>
              <div className="mt-2 text-2xl font-bold text-blue-600">
                {topStats.avgConfidence}
              </div>
            </div>
            <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <Brain className="w-5 h-5 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-gray-500">High Risk Areas</p>
              <div className="mt-2 text-2xl font-bold text-red-600">
                {topStats.highRiskAreas}
              </div>
            </div>
            <div className="h-10 w-10 rounded-lg bg-red-50 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-gray-500">Predictions</p>
              <div className="mt-2 text-2xl font-bold text-green-600">
                {topStats.predictions}
              </div>
            </div>
            <div className="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center">
              <Target className="w-5 h-5 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-gray-500">Accuracy</p>
              <div className="mt-2 text-2xl font-bold text-purple-600">
                {topStats.accuracy}
              </div>
            </div>
            <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto">
      <Tabs
        defaultValue={activeTab}
      >
          <TabsList>
            <TabsTrigger value="predictions">Disease Predictions</TabsTrigger>
            <TabsTrigger value="confidence">Model Confidence</TabsTrigger>
            <TabsTrigger value="trends">Weekly Trends</TabsTrigger>
            <TabsTrigger value="correlation">Data Correlation</TabsTrigger>
          </TabsList>

          {/* Tab Contents */}
          <TabsContent value="predictions">
            <Card>
              <CardHeader>
                <CardTitle>Disease Predictions</CardTitle>
              </CardHeader>
              <CardContent>
                {filteredPredictions.map((p, i) => (
                  <div key={i} className="p-2 border-b last:border-none">
                    <p className="font-medium">{p.disease}</p>
                    <p className="text-sm text-gray-600">
                      Risk: {p.risk} | Confidence: {p.confidence}% | Area: {p.area}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="confidence">
            <Card>
              <CardHeader>
                <CardTitle>Model Confidence Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={confidenceDistributionData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={100}
                      fill="#8884d8"
                      label
                    >
                      {confidenceDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={["#4CAF50", "#FF9800", "#F44336"][index % 3]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Risk Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="risk1" stroke="#8884d8" />
                    <Line type="monotone" dataKey="risk2" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="risk3" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="correlation">
            <Card>
              <CardHeader>
                <CardTitle>Disease Correlation</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={predictionConfidenceByDisease}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="disease" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="confidence" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
