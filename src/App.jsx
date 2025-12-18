import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

const App = () => {
  const [data, setData] = useState({
    jobTitle: "",
    hoursPerDay: "",
    daysPerWeek: "",
    grossMonthlySalary: "",
    taxPercentage: "",
    overtimeHours: "",
    overtimeRate: "",
  });

  const [result, setResult] = useState(null);
  const [currency, setCurrency] = useState("₹");

  let exchangeRates = {
    "₹": 1,
    "$": 0.012,
    "€": 0.011,
    "£": 0.0095,
    "¥": 1.8,
  };

  let handleCalculate = () => {
    const hours = Number(data.hoursPerDay);
    const days = Number(data.daysPerWeek);
    const gross = Number(data.grossMonthlySalary);
    const tax = Number(data.taxPercentage);
    const otHours = Number(data.overtimeHours);
    const otRate = Number(data.overtimeRate);

    if (!data.jobTitle || !days || !hours || !gross) {
      alert("Please enter required details in the form!");
      return;
    }

    if (days > 7 || days <= 0) {
      alert("Days per week must be between 1 and 7.");
      return;
    }

    if (hours > 24 || hours <= 0) {
      alert("Hours per day must be between 1 and 24.");
      return;
    }

    let hourlySalary = gross / (days * 4 * hours);
    let dailySalary = gross / (days * 4);
    let taxAmount = (gross * tax) / 100;
    let netMonthly = gross - taxAmount;
    let netYearly = netMonthly * 12;
    let totalOvertimeEarning = otHours * otRate;
    let totalSalary = netMonthly + totalOvertimeEarning;

    let rate = exchangeRates[currency];

    let converted = {
      jobTitle: data.jobTitle,
      hourlySalary: Math.round(hourlySalary * rate),
      dailySalary: Math.round(dailySalary * rate),
      taxAmount: Math.round(taxAmount * rate),
      netMonthly: Math.round(netMonthly * rate),
      netYearly: Math.round(netYearly * rate),
      totalOvertimeEarning: Math.round(totalOvertimeEarning * rate),
      totalSalary: Math.round(totalSalary * rate),
    };

    setResult(converted);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#121212] text-gray-100">
      {/* ===== Left Side: Neumorphic Dark Form ===== */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="md:w-1/2 w-full p-8 flex flex-col justify-center"
        style={{
          background: "#1c1c1c",
          boxShadow: "10px 10px 20px #0e0e0e, -10px -10px 20px #2a2a2a",
        }}
      >
        <h1 className="text-4xl font-bold text-emerald-400 mb-6 text-center md:text-left">
          💼 Salary Calculator
        </h1>
        <p className="text-gray-400 mb-8 text-center md:text-left">
          Enter your details to calculate your salary and deductions.
        </p>

        <form className="space-y-5">
          {/* Job Title */}
          <div>
            <label className="block text-sm mb-1 font-medium">Job Title</label>
            <input
              type="text"
              placeholder="e.g. Software Engineer"
              className="w-full bg-[#222] border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 transition"
              onChange={(e) => setData({ ...data, jobTitle: e.target.value })}
              value={data.jobTitle}
            />
          </div>

          {/* Hours and Days */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 font-medium">Hours per Day</label>
              <input
                type="number"
                placeholder="8"
                className="w-full bg-[#222] border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 transition"
                onChange={(e) => setData({ ...data, hoursPerDay: e.target.value })}
                value={data.hoursPerDay}
              />
            </div>
            <div>
              <label className="block text-sm mb-1 font-medium">Days per Week</label>
              <input
                type="number"
                placeholder="5"
                className="w-full bg-[#222] border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 transition"
                onChange={(e) => setData({ ...data, daysPerWeek: e.target.value })}
                value={data.daysPerWeek}
              />
            </div>
          </div>

          {/* Gross Salary */}
          <div>
            <label className="block text-sm mb-1 font-medium">
              Gross Monthly Salary (₹)
            </label>
            <input
              type="number"
              placeholder="e.g. 40000"
              className="w-full bg-[#222] border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 transition"
              onChange={(e) => setData({ ...data, grossMonthlySalary: e.target.value })}
              value={data.grossMonthlySalary}
            />
          </div>

          {/* Tax */}
          <div>
            <label className="block text-sm mb-1 font-medium">Tax Percentage (%)</label>
            <input
              type="number"
              placeholder="e.g. 10"
              className="w-full bg-[#222] border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 transition"
              onChange={(e) => setData({ ...data, taxPercentage: e.target.value })}
              value={data.taxPercentage}
            />
          </div>

          {/* Overtime */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 font-medium">Overtime Hours</label>
              <input
                type="number"
                placeholder="e.g. 10"
                className="w-full bg-[#222] border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 transition"
                onChange={(e) => setData({ ...data, overtimeHours: e.target.value })}
                value={data.overtimeHours}
              />
            </div>
            <div>
              <label className="block text-sm mb-1 font-medium">Overtime Rate (₹/hr)</label>
              <input
                type="number"
                placeholder="e.g. 200"
                className="w-full bg-[#222] border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 transition"
                onChange={(e) => setData({ ...data, overtimeRate: e.target.value })}
                value={data.overtimeRate}
              />
            </div>
          </div>

          {/* Currency */}
          <div>
            <label className="block text-sm mb-1 font-medium">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full bg-[#222] border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500"
            >
              <option value="₹">₹ (INR)</option>
              <option value="$">$ (USD)</option>
              <option value="€">€ (EUR)</option>
              <option value="£">£ (GBP)</option>
              <option value="¥">¥ (JPY)</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
            <button
              type="button"
              className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg transition"
              onClick={handleCalculate}
            >
              Calculate
            </button>
            <button
              type="reset"
              onClick={() => {
                setData({
                  jobTitle: "",
                  hoursPerDay: "",
                  daysPerWeek: "",
                  grossMonthlySalary: "",
                  taxPercentage: "",
                  overtimeHours: "",
                  overtimeRate: "",
                });
                setResult(null);
              }}
              className="bg-gray-700 hover:bg-gray-800 text-white font-semibold px-6 py-2 rounded-lg shadow-lg transition"
            >
              Reset
            </button>
          </div>
        </form>
      </motion.div>

      {/* ===== Right Side: Animated Result Section ===== */}
      <div className="md:w-1/2 w-full bg-gray-100 text-gray-900 flex flex-col justify-center items-center p-8">
        <h2 className="text-3xl font-semibold text-emerald-700 mb-6">
          Salary Summary
        </h2>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 border border-emerald-200 space-y-5"
            >
              <div className="flex justify-between text-lg font-medium">
                <span>Job Title:</span>
                <span className="font-semibold text-emerald-700">
                  {result.jobTitle}
                </span>
              </div>
              <div className="flex justify-between text-lg font-medium">
                <span>Hourly Salary:</span>
                <span className="font-semibold text-emerald-700">
                  {currency}{result.hourlySalary}
                </span>
              </div>
              <div className="flex justify-between text-lg font-medium">
                <span>Daily Salary:</span>
                <span className="font-semibold text-emerald-700">
                  {currency}{result.dailySalary}
                </span>
              </div>
              <div className="flex justify-between text-lg font-medium">
                <span>Tax Amount:</span>
                <span className="font-semibold text-emerald-700">
                  {currency}{result.taxAmount}
                </span>
              </div>
              <div className="flex justify-between text-lg font-medium">
                <span>Net Monthly Salary:</span>
                <span className="font-semibold text-emerald-700">
                  {currency}{result.netMonthly}
                </span>
              </div>
              <div className="flex justify-between text-lg font-medium">
                <span>Yearly Net Salary:</span>
                <span className="font-semibold text-emerald-700">
                  {currency}{result.netYearly}
                </span>
              </div>
              <div className="flex justify-between text-lg font-medium">
                <span>Overtime Earnings:</span>
                <span className="font-semibold text-emerald-700">
                  {currency}{result.totalOvertimeEarning}
                </span>
              </div>

              <hr className="border-emerald-200" />

              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center"
              >
                <p className="text-2xl font-bold text-emerald-600">
                  Total Salary: {currency}{result.totalSalary}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
