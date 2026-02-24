import React, { useState } from 'react';
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export const ResourcesAnalytics = () => {
  const [selectedType, setSelectedType] = useState(null);

  const resourceStats = [
    { name: 'PDFs', count: 648 },
    { name: 'Documents', count: 428 },
    { name: 'Videos', count: 234 },
  ];

  const dummyResources = {
    PDFs: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `PDF Resource ${i + 1}`,
    })),
    Documents: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `Document Resource ${i + 1}`,
    })),
    Videos: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `Video Resource ${i + 1}`,
    })),
  };

  const barColors = ['#0f766e', '#2563eb', '#f97316'];

  return (
    <div className="dashboard-wrapper dashboard-wrapper--bottom-nav">
      <main className="dashboard-main dashboard-main--bottom-nav">
        <section className="dashboard-welcome admin-welcome">
          <h1 className="heading-entrance heading-premium">Resources Analytics</h1>
          <p className="heading-entrance heading-entrance-delay-1">Overview of resource distribution by type</p>
        </section>

        <section className="dashboard-section">
          <h2 className="section-title heading-entrance heading-premium">Resource Breakdown</h2>
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={resourceStats}>
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar
                    dataKey="count"
                    cursor="pointer"
                    onClick={(data) => setSelectedType(data?.payload?.name || null)}
                  >
                    {resourceStats.map((entry, index) => (
                      <Cell key={entry.name} fill={barColors[index % barColors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {selectedType && (
              <div className="mt-6 space-y-2">
                <h3 className="text-sm font-semibold text-slate-900">{selectedType} Resources</h3>
                {dummyResources[selectedType].map((item) => (
                  <div key={item.id} className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-slate-700">
                    {item.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};
