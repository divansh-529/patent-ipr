"use client";

import React, { useState, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-screen bg-[#F5F7FA] flex overflow-hidden">

      {/* ================= SIDEBAR ================= */}
   <motion.aside
animate={{
  x: isMobile
    ? sidebarOpen
      ? 0
      : -260
    : 0,
  width: !isMobile
    ? sidebarOpen
      ? 260
      : 80
    : 260,
}}
  transition={{ duration: 0.25 }}
  className={`
    bg-white border-r shadow-sm flex flex-col shrink-0
    ${isMobile ? "fixed z-40 h-full" : ""}
    ${isMobile && !sidebarOpen ? "overflow-hidden pointer-events-none" : ""}
  `}
>
      
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
  onClick={() => {
    setActiveTab(item);
    if (isMobile) setSidebarOpen(false);
  }}
  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl capitalize transition ${
    activeTab === item
      ? "bg-blue-600 text-white"
      : "text-gray-600 hover:bg-blue-50"
  }`}
>
  <span className="hidden lg:inline">●</span>

  {sidebarOpen && (
    <span>{item}</span>
  )}
</button>

          ))}
        </nav>
      </motion.aside>

      {/* ================= RIGHT PANEL ================= */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* HEADER */}
        <header className="h-20 bg-white border-b flex items-center justify-between px-4 sm:px-6 lg:px-10 shrink-0">

          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-gray-600 mr-4"
          >
            ☰
          </button>

          <div className="flex-1">
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
              Welcome back, {USER.name}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">
              Here’s what’s happening with your IP portfolio.
            </p>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 relative">

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
                    className="absolute right-0 mt-4 w-48  sm:w-80 bg-white border shadow-xl rounded-2xl p-6 z-50"
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
              className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-medium cursor-pointer hover:scale-105 transition"
            >
              {USER.name.charAt(0)}
            </div>

          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10">

          {activeTab === "dashboard" && (
            <DashboardView setActiveTab={setActiveTab} />
          )}

        {activeTab === "portfolio" && (
  <PortfolioView setActiveTab={setActiveTab} />
)}

<main className="flex-1 overflow-y-auto p-10">
{/* 
  {activeTab === "dashboard" && (
    <DashboardView setActiveTab={setActiveTab} />
  )}

  {activeTab === "portfolio" && (
    <PortfolioView setActiveTab={setActiveTab} />
  )} */}

  {activeTab === "new filing" && (
    <NewFilingView setActiveTab={setActiveTab} />
  )}

 {activeTab === "estimator" && (
  <CostEstimatorView setActiveTab={setActiveTab} />
)}


  {activeTab === "messages" && (
    <div>Will Be Integrated by Sumanyu sir...</div>
  )}

 {activeTab === "calendar" && (
  <CalendarView />
)}


  {activeTab === "settings" && (
    <div>Settings coming next...</div>
  )}

</main>



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
    <div className="space-y-8">

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <StatCard title="Total Assets" value={totalAssets} />
        <StatCard title="Active Filings" value={activeFilings} />
        <div className="col-span-2 lg:col-span-1">
          <StatCard title="Upcoming Renewals" value={upcomingRenewals} />
        </div>
      </div>

      {/* CTA Card (Mobile Friendly) */}
      <div className="bg-white border rounded-2xl shadow-sm p-6 lg:p-10">

        <h2 className="text-lg lg:text-2xl font-semibold mb-2 text-gray-900">
          Start Your First Filing
        </h2>

        <p className="text-sm lg:text-base text-gray-500 mb-6">
          You don’t have any intellectual property assets yet.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setActiveTab("new filing")}
            className="bg-blue-600 text-white px-5 py-3 rounded-xl font-medium hover:scale-105 transition"
          >
            New Filing
          </button>

          <button
            onClick={() => setActiveTab("estimator")}
            className="border border-blue-600 text-blue-600 px-5 py-3 rounded-xl font-medium hover:bg-blue-50 transition"
          >
            Cost Estimator
          </button>
        </div>
      </div>

      {/* Empty State */}
      <div className="bg-white border rounded-2xl shadow-sm p-6 lg:p-10 text-center">

        <h3 className="text-base lg:text-lg font-semibold mb-2">
          No Activity Yet
        </h3>

        <p className="text-gray-500 text-sm mb-5">
          Your filing activity will appear here.
        </p>

        <button
          onClick={() => setActiveTab("new filing")}
          className="bg-blue-600 text-white px-5 py-2 rounded-xl"
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
    <div className="bg-white border rounded-2xl shadow-sm p-5 lg:p-6 hover:-translate-y-1 transition">
      <p className="text-gray-500 text-[11px] lg:text-xs">
        {title}
      </p>
      <h2 className="text-2xl lg:text-3xl font-semibold mt-1 text-gray-900">
        {value}
      </h2>
    </div>
  );
}
/* ================= PORTFOLIO ================= */

function PortfolioView({ setActiveTab }) {

  const assets = [
    {
      id: 1,
      name: "AI Traffic Optimization System",
      type: "Patent",
      appNo: "IN2024P00123",
      status: "Under Review",
      filingDate: "12 Jan 2024",
      renewal: "12 Jan 2025",
    },
    {
      id: 2,
      name: "GreenSpark Logo",
      type: "Trademark",
      appNo: "TM2024T00981",
      status: "Registered",
      filingDate: "05 Feb 2024",
      renewal: "05 Feb 2034",
    },
    {
      id: 3,
      name: "Solar Grid Algorithm",
      type: "Patent",
      appNo: "IN2023P00455",
      status: "Pending",
      filingDate: "18 Nov 2023",
      renewal: "18 Nov 2024",
    },
    {
      id: 4,
      name: "EduLearn Course Material",
      type: "Copyright",
      appNo: "CR2024C00045",
      status: "Draft",
      filingDate: "01 Mar 2024",
      renewal: "-",
    },
  ];

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            My Portfolio
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Track and manage your intellectual property assets
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab("new filing")}
            className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition"
          >
            + New Filing
          </button>
        </div>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">

        <PortfolioStat title="Total" value={assets.length} />
        <PortfolioStat title="Patents" value={assets.filter(a => a.type === "Patent").length} />
        <PortfolioStat title="Trademarks" value={assets.filter(a => a.type === "Trademark").length} />
        <PortfolioStat title="Copyrights" value={assets.filter(a => a.type === "Copyright").length} />
        <PortfolioStat title="Designs" value="0" />

      </div>

      {/* TABLE - Desktop */}
      <div className="hidden lg:block bg-white border rounded-3xl shadow-sm overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="text-left px-6 py-4">Asset</th>
              <th className="text-left px-6 py-4">Type</th>
              <th className="text-left px-6 py-4">Application No</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-left px-6 py-4">Filing Date</th>
              <th className="text-left px-6 py-4">Renewal</th>
            </tr>
          </thead>

          <tbody>
            {assets.map((asset) => (
              <tr
                key={asset.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {asset.name}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {asset.type}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {asset.appNo}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={asset.status} />
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {asset.filingDate}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {asset.renewal}
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

      {/* MOBILE CARD VERSION */}
      <div className="lg:hidden space-y-4">

        {assets.map((asset) => (
          <div
            key={asset.id}
            className="bg-white border rounded-2xl shadow-sm p-5"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-900 text-sm">
                {asset.name}
              </h4>
              <StatusBadge status={asset.status} />
            </div>

            <p className="text-xs text-gray-500">
              {asset.type} • {asset.appNo}
            </p>

            <p className="text-xs text-gray-500 mt-2">
              Renewal: {asset.renewal}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}

/* ================= STATUS BADGE ================= */

function StatusBadge({ status }) {

  const styles = {
    Registered: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    "Under Review": "bg-blue-100 text-blue-700",
    Draft: "bg-gray-200 text-gray-700",
  };

  return (
    <span
      className={`px-3 py-1 text-xs rounded-full font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

/* ================= PORTFOLIO STAT ================= */

function PortfolioStat({ title, value }) {
  return (
    <div className="bg-white border rounded-2xl p-5 shadow-sm">
      <p className="text-xs text-gray-500">{title}</p>
      <h4 className="text-lg font-semibold text-gray-900 mt-1">
        {value}
      </h4>
    </div>
  );
}



//// new filing page


/* ================= NEW FILING ================= */

function NewFilingView({ setActiveTab }) {

  const [step, setStep] = React.useState(1);
  const [selectedService, setSelectedService] = React.useState(null);
  const [formData, setFormData] = React.useState({
    title: "",
    field: "",
    shortDesc: "",
    detailedDesc: "",
    file: null,
  });
  const [submitted, setSubmitted] = React.useState(false);
  const [referenceNo, setReferenceNo] = React.useState("");

  const services = [
    { key: "Patent", desc: "Protect technical inventions" },
    { key: "Trademark", desc: "Protect brand identity" },
    { key: "Copyright", desc: "Protect creative works" },
    { key: "Design", desc: "Protect product appearance" },
  ];

  const generateReference = () => {
    return "IPR-" + Math.floor(100000 + Math.random() * 900000);
  };

  const handleSubmit = () => {
    const ref = generateReference();
    setReferenceNo(ref);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 text-2xl">
          ✓
        </div>

        <h2 className="text-2xl font-semibold text-gray-900">
          Filing Submitted Successfully
        </h2>

        <p className="text-gray-500">
          Reference Number: <span className="font-medium text-gray-900">{referenceNo}</span>
        </p>

        <button
          onClick={() => setActiveTab("dashboard")}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10">

      {/* STEP INDICATOR */}
      <div className="flex items-center justify-between text-sm">
        {["Service", "Details", "Review"].map((label, index) => (
          <div
            key={index}
            className={`flex-1 text-center pb-3 border-b-2 ${
              step === index + 1
                ? "border-blue-600 text-blue-600 font-medium"
                : "border-gray-200 text-gray-400"
            }`}
          >
            {label}
          </div>
        ))}
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="grid sm:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.key}
              onClick={() => setSelectedService(service.key)}
              className={`border rounded-2xl p-6 cursor-pointer transition ${
                selectedService === service.key
                  ? "border-blue-600 ring-2 ring-blue-100"
                  : "hover:border-gray-400"
              }`}
            >
              <h3 className="font-semibold text-gray-900">
                {service.key}
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="space-y-6">

          <input
            type="text"
            placeholder="Project Title"
            className="w-full border rounded-xl px-4 py-3"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <select
            className="w-full border rounded-xl px-4 py-3"
            value={formData.field}
            onChange={(e) =>
              setFormData({ ...formData, field: e.target.value })
            }
          >
            <option value="">Select Field</option>
            <option>Technology</option>
            <option>Healthcare</option>
            <option>Education</option>
            <option>Energy</option>
          </select>

          <textarea
            placeholder="Short Description"
            className="w-full border rounded-xl px-4 py-3"
            rows={3}
            value={formData.shortDesc}
            onChange={(e) =>
              setFormData({ ...formData, shortDesc: e.target.value })
            }
          />

          <textarea
            placeholder="Detailed Description"
            className="w-full border rounded-xl px-4 py-3"
            rows={5}
            value={formData.detailedDesc}
            onChange={(e) =>
              setFormData({ ...formData, detailedDesc: e.target.value })
            }
          />

          <input
            type="file"
            onChange={(e) =>
              setFormData({ ...formData, file: e.target.files[0] })
            }
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="bg-white border rounded-2xl p-8 space-y-4">

          <p><strong>Service:</strong> {selectedService}</p>
          <p><strong>Title:</strong> {formData.title}</p>
          <p><strong>Field:</strong> {formData.field}</p>
          <p><strong>Short Description:</strong> {formData.shortDesc}</p>
          <p><strong>Detailed Description:</strong> {formData.detailedDesc}</p>
          <p><strong>Document:</strong> {formData.file ? formData.file.name : "None"}</p>

        </div>
      )}

      {/* NAVIGATION BUTTONS */}
      <div className="flex justify-between pt-6">

        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="px-6 py-2 border rounded-xl"
          >
            Back
          </button>
        ) : (
          <div />
        )}

        {step < 3 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={step === 1 && !selectedService}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl disabled:opacity-50"
          >
            Continue
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl"
          >
            Submit Filing
          </button>
        )}

      </div>

    </div>
  );
}




////// cost estimator page

/* ================= COST ESTIMATOR ================= */

function CostEstimatorView({ setActiveTab }) {

  const [selected, setSelected] = React.useState(null);
  const [addons, setAddons] = React.useState([]);

  const services = {
    Patent: {
      govFee: 6600,
      profFee: 6000,
      optional: [
        { name: "Patent Drafting", cost: 8000 },
        { name: "Prior Art Search", cost: 2000 },
        { name: "Expedited Examination", cost: 10000 },
      ],
    },
    Trademark: {
      govFee: 4500,
      profFee: 5000,
      optional: [
        { name: "Logo Search", cost: 3000 },
        { name: "Opposition Handling", cost: 7000 },
      ],
    },
    Copyright: {
      govFee: 500,
      profFee: 3000,
      optional: [
        { name: "Expedited Registration", cost: 4000 },
      ],
    },
    Design: {
      govFee: 1000,
      profFee: 5000,
      optional: [
        { name: "3D Drawing Support", cost: 2500 },
      ],
    },
  };

  const calculateTotal = () => {
    if (!selected) return 0;

    const base =
      services[selected].govFee +
      services[selected].profFee;

    const optionalTotal = addons.reduce(
      (sum, item) => sum + item.cost,
      0
    );

    return base + optionalTotal;
  };

  const toggleAddon = (addon) => {
    if (addons.find((a) => a.name === addon.name)) {
      setAddons(addons.filter((a) => a.name !== addon.name));
    } else {
      setAddons([...addons, addon]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">

      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-semibold text-gray-900">
          Cost Estimator
        </h2>
        <p className="text-gray-500 mt-2">
          Estimate your intellectual property filing cost
        </p>
      </div>

      {/* SERVICE SELECTION */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.keys(services).map((service) => (
          <div
            key={service}
            onClick={() => {
              setSelected(service);
              setAddons([]);
            }}
            className={`cursor-pointer border rounded-2xl p-6 transition ${
              selected === service
                ? "border-blue-600 ring-2 ring-blue-100"
                : "hover:border-gray-400"
            }`}
          >
            <h3 className="font-semibold text-gray-900">
              {service}
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Estimate filing cost
            </p>
          </div>
        ))}
      </div>

      {/* BREAKDOWN */}
      {selected && (
        <div className="bg-white border rounded-3xl shadow-sm p-8 space-y-6">

          <h3 className="text-lg font-semibold text-gray-900">
            {selected} Fee Breakdown
          </h3>

          <div className="space-y-3 text-sm">
            <FeeRow
              label="Government Fee"
              value={services[selected].govFee}
            />
            <FeeRow
              label="Professional Fee"
              value={services[selected].profFee}
            />
          </div>

          {/* OPTIONAL SERVICES */}
          {services[selected].optional.length > 0 && (
            <div className="pt-6 border-t space-y-4">
              <h4 className="font-medium text-gray-900">
                Optional Services
              </h4>

              {services[selected].optional.map((addon) => (
                <div
                  key={addon.name}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="text-sm text-gray-700">
                      {addon.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      ₹{addon.cost}
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={addons.find(
                      (a) => a.name === addon.name
                    )}
                    onChange={() => toggleAddon(addon)}
                  />
                </div>
              ))}
            </div>
          )}

          {/* TOTAL */}
          <div className="pt-6 border-t flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">
              Total Estimated Cost
            </span>
            <span className="text-xl font-semibold text-blue-600">
              ₹{calculateTotal()}
            </span>
          </div>

          {/* CTA */}
          <div className="pt-6">
            <button
              onClick={() => setActiveTab("new filing")}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition"
            >
              Start Filing
            </button>
          </div>

        </div>
      )}

    </div>
  );
}

/* ================= FEE ROW ================= */

function FeeRow({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-600">{label}</span>
      <span className="text-gray-900 font-medium">
        ₹{value}
      </span>
    </div>
  );
}



/// calender

/* ================= PREMIUM CALENDAR ================= */

function CalendarView() {

  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState(
    new Date().getDate()
  );

  const renewals = [
    {
      id: 1,
      name: "GreenSpark Logo",
      date: "2024-03-26",
      status: "Upcoming",
    },
    {
      id: 2,
      name: "AI Traffic Optimization",
      date: "2024-03-30",
      status: "Urgent",
    },
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const formatDate = (day) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  const getRenewalsForDay = (day) => {
    return renewals.filter(r => r.date === formatDate(day));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900">
          Renewal Calendar
        </h2>

        <div className="flex items-center gap-4">

          <button
            onClick={() =>
              setCurrentDate(new Date(year, month - 1, 1))
            }
            className="px-3 py-1 border rounded-lg"
          >
            ←
          </button>

          <span className="font-medium text-gray-700 text-sm">
            {monthNames[month]} {year}
          </span>

          <button
            onClick={() =>
              setCurrentDate(new Date(year, month + 1, 1))
            }
            className="px-3 py-1 border rounded-lg"
          >
            →
          </button>

        </div>
      </div>

      {/* ================= DESKTOP GRID ================= */}
      <div className="hidden lg:block bg-white border rounded-3xl shadow-sm p-6">

        <div className="grid grid-cols-7 text-xs text-gray-500 mb-4">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
            <div key={d} className="text-center">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const hasRenewal = getRenewalsForDay(day).length > 0;

            return (
              <div
                key={day}
                className={`p-4 rounded-xl border text-center transition ${
                  hasRenewal
                    ? "border-blue-600 bg-blue-50"
                    : "hover:bg-gray-50"
                }`}
              >
                {day}
              </div>
            );
          })}

        </div>
      </div>

      {/* ================= MOBILE VIEW ================= */}
     {/* ================= MOBILE GRID ================= */}
<div className="lg:hidden bg-white border rounded-3xl shadow-sm p-5">

  {/* Week Days */}
  <div className="grid grid-cols-7 text-xs text-gray-500 mb-3">
    {["S","M","T","W","T","F","S"].map((d) => (
      <div key={d} className="text-center font-medium">
        {d}
      </div>
    ))}
  </div>

  {/* Dates */}
  <div className="grid grid-cols-7 gap-2">

    {Array.from({ length: daysInMonth }).map((_, i) => {
      const day = i + 1;
      const dayRenewals = getRenewalsForDay(day);

      return (
        <div
          key={day}
          onClick={() => setSelectedDate(day)}
          className={`h-14 flex flex-col items-center justify-center rounded-xl cursor-pointer transition border ${
            selectedDate === day
              ? "bg-blue-600 text-white border-blue-600"
              : dayRenewals.length > 0
                ? "bg-blue-50 border-blue-200"
                : "border-gray-200"
          }`}
        >
          <span className="text-sm font-medium">
            {day}
          </span>

          {dayRenewals.length > 0 && (
            <span className="text-[10px] mt-1 font-medium">
              {dayRenewals.length} due
            </span>
          )}
        </div>
      );
    })}

  </div>

  {/* Renewal List */}
  <div className="mt-6 space-y-4">

    <h3 className="text-sm font-semibold text-gray-900">
      Renewals on {selectedDate}
    </h3>

    {getRenewalsForDay(selectedDate).length === 0 && (
      <p className="text-sm text-gray-500">
        No renewals scheduled.
      </p>
    )}

    {getRenewalsForDay(selectedDate).map((item) => (
      <div
        key={item.id}
        className="border rounded-xl p-4 flex justify-between items-center"
      >
        <div>
          <p className="font-medium text-gray-900 text-sm">
            {item.name}
          </p>
          <p className="text-xs text-gray-500">
            {item.date}
          </p>
        </div>

        <span className={`text-xs px-2 py-1 rounded-full ${
          item.status === "Urgent"
            ? "bg-red-100 text-red-600"
            : "bg-blue-100 text-blue-600"
        }`}>
          {item.status}
        </span>
      </div>
    ))}

  </div>

</div>


    </div>
  );
}
