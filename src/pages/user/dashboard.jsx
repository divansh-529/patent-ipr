import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

/* ================== DATA MAPS (BACKEND READY) ================== */

const services = [
  { id: 1, key: "patent", title: "Patent", desc: "File & track patent requests", icon: "💡" },
  { id: 2, key: "trademark", title: "Trademark", desc: "Protect your brand identity", icon: "🛡️" },
  { id: 3, key: "copyright", title: "Copyright", desc: "Secure creative work", icon: "📄" },
  { id: 4, key: "design", title: "Design", desc: "Register your design", icon: "✏️" },
];

const recentApplications = []; // backend will fill
const portfolio = []; // backend will fill

/* ================== MAIN COMPONENT ================== */

export default function UserDashboard() {
  const { auth, logout } = useAuth();
  const user = auth?.user || { name: "User", email: "Not available" };

  const [activeTab, setActiveTab] = useState("dashboard");
  const [filingStep, setFilingStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="min-h-screen bg-[#F4F7FF] p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">

        {/* ================= SIDEBAR ================= */}
        <aside className="bg-gradient-to-b from-blue-600 to-blue-700 text-white rounded-3xl p-5 shadow-xl sticky top-6 h-fit">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-12 w-12 rounded-2xl bg-white text-blue-700 font-extrabold flex items-center justify-center">
              {user.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div>
              <p className="font-bold">{user.name}</p>
              <p className="text-xs text-white/70">{user.email}</p>
            </div>
          </div>

          <SidebarButton label="Dashboard" tab="dashboard" active={activeTab} setTab={setActiveTab} />
          <SidebarButton label="My Requests" tab="requests" active={activeTab} setTab={setActiveTab} />
          <SidebarButton label="My Portfolio" tab="portfolio" active={activeTab} setTab={setActiveTab} />
          <SidebarButton label="Cost Estimator" tab="estimator" active={activeTab} setTab={setActiveTab} />
          <SidebarButton label="Settings" tab="settings" active={activeTab} setTab={setActiveTab} />

          <button
            onClick={logout}
            className="mt-8 w-full bg-white text-blue-700 font-extrabold py-3 rounded-2xl hover:scale-[1.02] transition"
          >
            Logout
          </button>
        </aside>

        {/* ================= CONTENT ================= */}
        <main className="bg-white rounded-3xl p-8 shadow-xl overflow-hidden">

          <AnimatePresence mode="wait">
            {activeTab === "dashboard" && (
              <DashboardTab
                key="dashboard"
                user={user}
                services={services}
                recentApplications={recentApplications}
                onStartFiling={() => {
                  setActiveTab("newFiling");
                  setFilingStep(1);
                }}
              />
            )}

            {activeTab === "newFiling" && (
              <NewFilingTab
                key="newFiling"
                services={services}
                filingStep={filingStep}
                setFilingStep={setFilingStep}
                selectedService={selectedService}
                setSelectedService={setSelectedService}
                goBack={() => setActiveTab("dashboard")}
              />
            )}

            {activeTab === "requests" && <SimpleTab key="req" title="My Requests" text="All submitted requests will appear here." />}
            {activeTab === "portfolio" && <SimpleTab key="port" title="My Portfolio" text="Your approved IP assets will appear here." />}
            {activeTab === "estimator" && <SimpleTab key="est" title="Cost Estimator" text="Estimate filing costs before submission." />}
            {activeTab === "settings" && <SimpleTab key="set" title="Settings" text="Manage your profile and preferences." />}
          </AnimatePresence>

        </main>
      </div>
    </div>
  );
}

/* ================= SIDEBAR BUTTON ================= */

function SidebarButton({ label, tab, active, setTab }) {
  return (
    <button
      onClick={() => setTab(tab)}
      className={`w-full mb-2 px-4 py-3 rounded-2xl font-bold text-left transition
        ${active === tab ? "bg-white text-blue-700 shadow" : "hover:bg-white/10"}`}
    >
      {label}
    </button>
  );
}

/* ================= DASHBOARD TAB ================= */

function DashboardTab({ user, services, recentApplications, onStartFiling }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.35 }}
    >
      <h1 className="text-3xl font-extrabold text-slate-900">
        Welcome back, {user.name} 👋
      </h1>
      <p className="text-slate-500 mt-2">
        Manage and track all your IP requests from one dashboard.
      </p>

      {/* START NEW FILING CTA */}
      <div className="mt-8 rounded-[32px] bg-gradient-to-br from-blue-600 to-indigo-700 p-8 shadow-xl text-white flex flex-col md:flex-row justify-between gap-6">
        <div>
          <h2 className="text-2xl font-extrabold">Start New Filing</h2>
          <p className="text-white/85 mt-2 max-w-lg">
            Submit your request in minutes and track progress anytime.
          </p>
        </div>
        <button
          onClick={onStartFiling}
          className="px-8 py-4 rounded-2xl bg-white text-blue-700 font-extrabold hover:scale-105 transition"
        >
          ➕ Start New Filing
        </button>
      </div>

      {/* SERVICES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
        {services.map((s) => (
          <div key={s.id} className="rounded-3xl p-6 bg-slate-50 border">
            <div className="text-2xl">{s.icon}</div>
            <h3 className="mt-4 font-extrabold">{s.title}</h3>
            <p className="text-sm text-slate-500">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* RECENT APPLICATIONS */}
      <div className="mt-10">
        <h2 className="text-xl font-extrabold mb-4">Recent Applications</h2>
        {recentApplications.length === 0 ? (
          <div className="rounded-2xl bg-slate-50 border p-6 text-slate-500">
            No recent activity yet.
          </div>
        ) : (
          recentApplications.map((a) => <div key={a.id}>{a.title}</div>)
        )}
      </div>
    </motion.div>
  );
}

/* ================= NEW FILING FLOW ================= */

function NewFilingTab({
  services,
  filingStep,
  setFilingStep,
  selectedService,
  setSelectedService,
  goBack,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.35 }}
    >
      <p className="text-sm font-bold text-blue-600 mb-4">
        Step {filingStep} of 3
      </p>

      {/* STEP 1 */}
      {filingStep === 1 && (
        <>
          <h2 className="text-xl font-extrabold mb-4">
            What would you like to protect?
          </h2>
          {services.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setSelectedService(s);
                setFilingStep(2);
              }}
              className="w-full mb-3 p-4 rounded-2xl border hover:border-blue-500 text-left"
            >
              <p className="font-bold">{s.title}</p>
              <p className="text-sm text-slate-500">{s.desc}</p>
            </button>
          ))}
        </>
      )}

      {/* STEP 2 */}
      {filingStep === 2 && (
        <>
          <h2 className="text-xl font-extrabold mb-4">
            Basic Project Information
          </h2>

          <input className="w-full border rounded-xl p-3 mb-3" placeholder="Project Title" />
          <textarea className="w-full border rounded-xl p-3" placeholder="Brief summary" />

          <div className="flex justify-between mt-4">
            <button onClick={() => setFilingStep(1)}>Back</button>
            <button
              onClick={() => setFilingStep(3)}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* STEP 3 */}
      {filingStep === 3 && (
        <>
          <h2 className="text-xl font-extrabold mb-4">
            Review & Submit
          </h2>

          <div className="bg-slate-50 rounded-xl p-4 mb-4">
            <p><b>Service:</b> {selectedService?.title}</p>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setFilingStep(2)}>Back</button>
            <button
              onClick={goBack}
              className="px-5 py-2 bg-green-600 text-white rounded-xl"
            >
              Submit for Review
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
}

/* ================= SIMPLE TABS ================= */

function SimpleTab({ title, text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-2xl font-extrabold">{title}</h1>
      <p className="text-slate-500 mt-3">{text}</p>
    </motion.div>
  );
}
