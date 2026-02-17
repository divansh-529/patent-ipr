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
    <div className="min-h-screen bg-[#F5F7FA] flex">

      {/* ================= SIDEBAR ================= */}

      <motion.aside
        animate={{ width: sidebarOpen ? 260 : 80 }}
        transition={{ duration: 0.25 }}
        className="bg-white border-r shadow-sm flex flex-col"
      >
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-6 border-b">
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

      {/* ================= MAIN CONTENT ================= */}

      <div className="flex-1 flex flex-col">

        {/* ================= HEADER ================= */}

        <header className="h-20 bg-white border-b flex items-center justify-between px-10">

          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Welcome back, {USER.name}
            </h1>
            <p className="text-sm text-gray-500">
              Here’s what’s happening with your IP portfolio.
            </p>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-6 relative">

            {/* Notification */}
            <button
              onClick={() =>
                setShowNotifications(!showNotifications)
              }
              className="text-gray-600 hover:text-gray-900"
            >
              🔔
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute right-20 top-14 w-80 bg-white border shadow-xl rounded-2xl p-5"
                >
                  <h3 className="font-medium mb-4">
                    Notifications
                  </h3>

                  <p className="text-sm text-gray-500">
                    You don’t have any notifications right now.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Avatar */}
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-medium">
              {USER.name.charAt(0)}
            </div>

          </div>
        </header>

        {/* ================= PAGE CONTENT ================= */}

        <main className="p-10 flex-1">

          {activeTab === "dashboard" && (
            <DashboardView setActiveTab={setActiveTab} />
          )}

          {activeTab !== "dashboard" && (
            <div className="text-gray-500">
              {activeTab} page coming next...
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

/* ================= DASHBOARD VIEW ================= */

function DashboardView({ setActiveTab }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <StatCard title="Total Assets" value="28" />
        <StatCard title="Active Filings" value="12" />
        <StatCard title="Upcoming Renewals" value="3" />

      </div>

      {/* Primary Action Card */}
      <div className="rounded-3xl p-10 mb-10 text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">

        <h2 className="text-2xl font-semibold mb-2">
          Start New Application
        </h2>

        <p className="mb-6 text-blue-100">
          Secure your intellectual property today.
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
            Estimator
          </button>
        </div>

      </div>

      {/* Lower Grid */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white border rounded-2xl shadow-sm p-6">

          <h3 className="font-semibold mb-6">
            Recent Activities
          </h3>

          <div className="space-y-4 text-sm">
            <ActivityItem
              title="Eco-Friendly Battery System"
              status="Pending"
              time="2h ago"
            />
            <ActivityItem
              title="GreenSpark Logo"
              status="Registered"
              time="Yesterday"
            />
            <ActivityItem
              title="Solar Grid Algorithm"
              status="Filed"
              time="2 days ago"
            />
          </div>
        </div>

        {/* Upcoming Renewals */}
        <div className="bg-white border rounded-2xl shadow-sm p-6">

          <h3 className="font-semibold mb-6">
            Upcoming Renewals
          </h3>

          <div className="text-sm space-y-4">
            <div>
              <p className="font-medium">Aura Tech</p>
              <p className="text-gray-500">26 days left</p>
            </div>

            <button className="w-full bg-blue-600 text-white py-2 rounded-xl">
              View Calendar
            </button>
          </div>

        </div>

      </div>

    </motion.div>
  );
}

/* ================= STAT CARD ================= */

function StatCard({ title, value }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="bg-white border rounded-2xl shadow-sm p-6"
    >
      <p className="text-gray-500 text-xs">{title}</p>
      <h2 className="text-3xl font-semibold mt-2 text-gray-900">
        {value}
      </h2>
    </motion.div>
  );
}

/* ================= ACTIVITY ITEM ================= */

function ActivityItem({ title, status, time }) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="font-medium text-gray-900">
          {title}
        </p>
        <p className="text-gray-500 text-xs">
          {status}
        </p>
      </div>
      <span className="text-gray-400 text-xs">
        {time}
      </span>
    </div>
  );
}
