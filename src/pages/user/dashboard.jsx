// FINAL ENTERPRISE USER DASHBOARD
// Blue Gradient Professional Version

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

/* ============================= DATA ============================= */

const SERVICES = [
  {
    id: 1,
    key: "patent",
    title: "Patent",
    filingFee: 6600,
    examFee: 6000,
  },
  {
    id: 2,
    key: "trademark",
    title: "Trademark",
    filingFee: 4500,
    examFee: 0,
  },
  {
    id: 3,
    key: "copyright",
    title: "Copyright",
    filingFee: 2000,
    examFee: 0,
  },
  {
    id: 4,
    key: "design",
    title: "Design",
    filingFee: 3500,
    examFee: 0,
  },
];

const OPTIONAL_SERVICES = [
  { id: 1, name: "Drafting Assistance", cost: 4000 },
  { id: 2, name: "Expedited Examination", cost: 8000 },
  { id: 3, name: "3D Drawing Support", cost: 3000 },
  { id: 4, name: "Legal Consultation", cost: 5000 },
];

const MOCK_ASSETS = [
  {
    id: 1,
    type: "Patent",
    name: "AI-based Traffic System",
    status: "Registered",
    renewal: "2026-09-10",
  },
];

const MOCK_ACTIVITY = [
  { id: 1, text: "Patent filed successfully", date: "2h ago" },
  { id: 2, text: "Trademark approved", date: "3 days ago" },
];

/* ============================= MAIN ============================= */

export default function UserDashboard() {
  const { auth } = useAuth();
  const user = auth?.user || {
    name: "User",
    email: "user@email.com",
    photo: null,
  };

  const [tab, setTab] = useState("dashboard");
  const [showFiling, setShowFiling] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [projectData, setProjectData] = useState({
    title: "",
    field: "",
    summary: "",
  });
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [successRef, setSuccessRef] = useState(null);

  /* ====================== HELPERS ====================== */

  const generateRef = () => {
    return "IPR-" + Math.floor(100000 + Math.random() * 900000);
  };

  const totalCost = () => {
    if (!selectedService) return 0;
    let base =
      selectedService.filingFee + selectedService.examFee;

    selectedOptions.forEach((opt) => {
      base += opt.cost;
    });

    return base;
  };

  const handleSubmit = () => {
    const ref = generateRef();
    setSuccessRef(ref);

    setTimeout(() => {
      setSuccessRef(null);
      setTab("dashboard");
      setShowFiling(false);
      setStep(1);
    }, 10000);
  };

  /* ====================== UI ====================== */

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex">

      {/* ================= SIDEBAR ================= */}
      <aside className="hidden lg:flex w-72 flex-col bg-gradient-to-b from-blue-600 via-blue-500 to-indigo-600 text-white shadow-2xl p-8">

        <h2 className="text-2xl font-semibold mb-10 tracking-tight">
          PatientIPR
        </h2>

        <SidebarItem label="Dashboard" tab="dashboard" active={tab} setTab={setTab} />
        <SidebarItem label="Cost Estimator" tab="estimator" active={tab} setTab={setTab} />
        <SidebarItem label="Portfolio" tab="portfolio" active={tab} setTab={setTab} />
        <SidebarItem label="Settings" tab="settings" active={tab} setTab={setTab} />
      </aside>

      {/* ================= CONTENT ================= */}
      <div className="flex-1 p-6 xl:p-12 max-w-[1700px] mx-auto w-full">

        {/* TOP MESSAGE */}
        <div className="mb-8 bg-blue-600 text-white p-4 rounded-xl shadow-md">
          🔔 Reminder: Check your upcoming renewals inside Portfolio tab.
        </div>

        <AnimatePresence mode="wait">

          {/* ================= DASHBOARD ================= */}
          {tab === "dashboard" && (
            <motion.div key="dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

              <h1 className="text-3xl font-semibold mb-2">
                Welcome, {user.name}
              </h1>
              <p className="text-gray-500 mb-10">
                Manage your intellectual property assets.
              </p>

              {/* CTA */}
              <div className="bg-white rounded-2xl shadow-md p-8 mb-10 flex flex-col xl:flex-row justify-between items-center gap-6">
                <div>
                  <h2 className="text-lg font-semibold">
                    Start a new application
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    File and track your intellectual property.
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setShowFiling(true);
                      setStep(1);
                    }}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:opacity-90"
                  >
                    New Filing
                  </button>

                  <button
                    onClick={() => setTab("estimator")}
                    className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg text-sm font-medium"
                  >
                    Cost Estimator
                  </button>
                </div>
              </div>

              {/* RECENT ACTIVITY */}
              <div className="bg-white rounded-2xl shadow-md p-8">
                <h3 className="text-lg font-semibold mb-6">
                  Recent Activities
                </h3>

                {MOCK_ACTIVITY.length === 0 ? (
                  <p className="text-gray-500 text-sm">
                    No recent activity.
                  </p>
                ) : (
                  MOCK_ACTIVITY.map((act) => (
                    <div key={act.id} className="flex justify-between border-b py-3 text-sm">
                      <span>{act.text}</span>
                      <span className="text-gray-400">{act.date}</span>
                    </div>
                  ))
                )}
              </div>

              {/* FILING FLOW */}
              {showFiling && (
                <FilingSection
                  step={step}
                  setStep={setStep}
                  selectedService={selectedService}
                  setSelectedService={setSelectedService}
                  projectData={projectData}
                  setProjectData={setProjectData}
                  handleSubmit={handleSubmit}
                  user={user}
                />
              )}

            </motion.div>
          )}

          {/* ================= ESTIMATOR ================= */}
          {tab === "estimator" && (
            <EstimatorTab
              selectedService={selectedService}
              setSelectedService={setSelectedService}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
              totalCost={totalCost}
              setTab={setTab}
              setShowFiling={setShowFiling}
            />
          )}

          {/* ================= PORTFOLIO ================= */}
          {tab === "portfolio" && (
            <PortfolioTab />
          )}

          {/* ================= SETTINGS ================= */}
          {tab === "settings" && (
            <SettingsTab />
          )}

        </AnimatePresence>

        {/* SUCCESS MODAL */}
        {successRef && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          >
            <div className="bg-white p-10 rounded-2xl text-center shadow-xl max-w-md w-full">
              <div className="text-blue-600 text-4xl mb-4">✓</div>
              <h2 className="text-xl font-semibold mb-2">
                Submission Successful
              </h2>
              <p className="text-sm text-gray-500">
                Reference Number: {successRef}
              </p>
              <p className="text-xs text-gray-400 mt-4">
                Returning to dashboard...
              </p>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function SidebarItem({ label, tab, active, setTab }) {
  return (
    <button
      onClick={() => setTab(tab)}
      className={`text-left py-3 px-4 rounded-lg mb-2 transition ${
        active === tab
          ? "bg-white text-blue-600 font-semibold"
          : "hover:bg-white/20"
      }`}
    >
      {label}
    </button>
  );
}

/* ================= ESTIMATOR ================= */

function EstimatorTab({
  selectedService,
  setSelectedService,
  selectedOptions,
  setSelectedOptions,
  totalCost,
  setTab,
  setShowFiling,
}) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

      <h1 className="text-3xl font-semibold mb-10">
        Cost Estimator
      </h1>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {SERVICES.map((service) => (
          <button
            key={service.id}
            onClick={() => setSelectedService(service)}
            className={`rounded-xl p-6 shadow-md bg-white border ${
              selectedService?.id === service.id
                ? "border-blue-600"
                : ""
            }`}
          >
            <div className="text-blue-600 text-2xl mb-4">◉</div>
            <h3 className="font-semibold">{service.title}</h3>
          </button>
        ))}
      </div>

      {selectedService && (
        <div className="bg-white rounded-2xl p-8 shadow-md max-w-3xl">

          <h3 className="text-lg font-semibold mb-6">
            {selectedService.title} Breakdown
          </h3>

          <CostRow label="Filing Fee" value={selectedService.filingFee} />
          <CostRow label="Examination Fee" value={selectedService.examFee} />

          <h4 className="font-semibold mt-6 mb-4">
            Optional Services
          </h4>

          {OPTIONAL_SERVICES.map((opt) => (
            <label key={opt.id} className="flex justify-between mb-3 text-sm">
              <span>{opt.name}</span>
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedOptions([...selectedOptions, opt]);
                  } else {
                    setSelectedOptions(
                      selectedOptions.filter((o) => o.id !== opt.id)
                    );
                  }
                }}
              />
            </label>
          ))}

          <div className="border-t mt-6 pt-4 text-lg font-semibold">
            Total: ₹{totalCost()}
          </div>

          <button
            onClick={() => {
              setTab("dashboard");
              setShowFiling(true);
            }}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg text-sm"
          >
            Start Filing
          </button>
        </div>
      )}
    </motion.div>
  );
}

function CostRow({ label, value }) {
  return (
    <div className="flex justify-between mb-3 text-sm">
      <span>{label}</span>
      <span>₹{value}</span>
    </div>
  );
}

/* ================= PORTFOLIO ================= */

function PortfolioTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

      <h1 className="text-3xl font-semibold mb-10">
        My Portfolio
      </h1>

      <div className="bg-white p-8 rounded-2xl shadow-md mb-10">
        <h3 className="text-lg font-semibold mb-6">
          Assets
        </h3>

        {MOCK_ASSETS.map((asset) => (
          <div key={asset.id} className="border-b py-4">
            <div className="flex justify-between text-sm">
              <span>{asset.name}</span>
              <span>{asset.status}</span>
            </div>
            <div className="text-xs text-gray-400 mt-2">
              Renewal Date: {asset.renewal}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">
          Renewal Calendar
        </h3>
        <p className="text-sm text-gray-500">
          Upcoming renewals will appear here.
        </p>
      </div>
    </motion.div>
  );
}

/* ================= SETTINGS ================= */

function SettingsTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

      <h1 className="text-3xl font-semibold mb-10">
        Settings
      </h1>

      <div className="bg-white p-8 rounded-2xl shadow-md max-w-xl">
        <input className="w-full border p-3 rounded-lg mb-4 text-sm" placeholder="Full Name" />
        <input className="w-full border p-3 rounded-lg mb-4 text-sm" placeholder="Email" />
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm">
          Save Changes
        </button>
      </div>
    </motion.div>
  );
}
