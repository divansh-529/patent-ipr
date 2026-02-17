"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ================= USER ================= */

const USER = {
  name: "User User",
};

/* ================= MAIN ================= */

export default function EnterpriseApp() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="h-screen bg-[#F5F7FA] flex overflow-hidden">

      {/* ================= SIDEBAR ================= */}
      <motion.aside
        animate={{ width: sidebarOpen ? 260 : 80 }}
        transition={{ duration: 0.25 }}
        className="bg-white border-r shadow-sm flex flex-col shrink-0"
      >
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-6 border-b shrink-0">
          {sidebarOpen && (
            <h2 className="text-xl font-semibold text-blue-700">
              PatentIPR
            </h2>
          )}

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-500"
          >
            ☰
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 text-sm">
          {[
            "dashboard",
            "portfolio",
            "new filing",
            "estimator",
            "messages",
            "calendar",
            "settings",
          ].map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl capitalize transition ${
                activeTab === item
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-blue-50"
              }`}
            >
              <span>●</span>
              {sidebarOpen && <span>{item}</span>}
            </button>
          ))}
        </nav>
      </motion.aside>

      {/* ================= RIGHT PANEL ================= */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* ================= HEADER ================= */}
        <header className="h-20 bg-white border-b flex items-center justify-between px-10 shrink-0">

          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Welcome back, {USER.name}
            </h1>
            <p className="text-sm text-gray-500">
              Here’s what’s happening with your IP portfolio.
            </p>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-6 relative">

            {/* Notifications */}
            <div
              className="relative"
              onMouseEnter={() => setShowNotifications(true)}
              onMouseLeave={() => setShowNotifications(false)}
            >
              <button
                onClick={() =>
                  setShowNotifications(!showNotifications)
                }
                className="text-gray-600 hover:text-gray-900 transition"
              >
                🔔
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute right-0 mt-4 w-80 bg-white border shadow-xl rounded-2xl p-6 z-50"
                  >
                    <h3 className="font-semibold mb-4">
                      Notifications
                    </h3>

                    <p className="text-sm text-gray-500">
                      You don’t have any notifications right now.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Avatar */}
            <div
              onClick={() => setActiveTab("settings")}
              className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-medium cursor-pointer hover:scale-105 transition"
            >
              {USER.name.charAt(0)}
            </div>

          </div>
        </header>

        {/* ================= SCROLLABLE CONTENT ================= */}
        <main className="flex-1 overflow-y-auto p-10">

          {activeTab === "dashboard" && (
            <DashboardView setActiveTab={setActiveTab} />
          )}

          {activeTab !== "dashboard" && (
            <div className="text-gray-500 text-lg">
              {activeTab} page coming soon...
            </div>
          )}

        </main>

      </div>
    </div>
  );
}

/* ================= DASHBOARD ================= */

function DashboardView({ setActiveTab }) {
  const totalAssets = 0;
  const activeFilings = 0;
  const upcomingRenewals = 0;

  return (
    <div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Assets" value={totalAssets} />
        <StatCard title="Active Filings" value={activeFilings} />
        <StatCard title="Upcoming Renewals" value={upcomingRenewals} />
      </div>

      {/* CTA */}
      <div className="rounded-3xl p-10 mb-10 text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
        <h2 className="text-2xl font-semibold mb-2">
          Start Your First Filing
        </h2>

        <p className="mb-6 text-blue-100">
          You don’t have any assets yet. Begin by filing your first intellectual property.
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("new filing")}
            className="bg-white text-blue-600 px-6 py-3 rounded-xl font-medium hover:scale-105 transition"
          >
            New Filing
          </button>

          <button
            onClick={() => setActiveTab("estimator")}
            className="border border-white px-6 py-3 rounded-xl font-medium hover:bg-white/10 transition"
          >
            Cost Estimator
          </button>
        </div>
      </div>

      {/* Empty State Section */}
      <div className="bg-white border rounded-2xl shadow-sm p-10 text-center">
        <h3 className="text-lg font-semibold mb-3">
          No Activity Yet
        </h3>
        <p className="text-gray-500 mb-6">
          Once you start filing applications, your recent activity will appear here.
        </p>

        <button
          onClick={() => setActiveTab("new filing")}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl"
        >
          Create First Filing
        </button>
      </div>

    </div>
  );
}

/* ================= STAT CARD ================= */

function StatCard({ title, value }) {
  return (
    <div className="bg-white border rounded-2xl shadow-sm p-6 hover:-translate-y-1 transition">
      <p className="text-gray-500 text-xs">{title}</p>
      <h2 className="text-3xl font-semibold mt-2 text-gray-900">
        {value}
      </h2>
    </div>
  );
}
