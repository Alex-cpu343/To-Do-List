import React, { useState, useEffect } from "react";

const Settings: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <main
      className={`h-screen w-screen flex flex-col items-center justify-center px-5 transition-colors duration-500 ${
        darkMode ? "bg-[#1F1C2C] text-[#C3BDD4]" : "bg-[#928DAB] text-[#1F1C2C]"
      }`}
    >
      <h1 className="font-black text-4xl mb-8 font-serif select-none">Settings</h1>

      <div
        className={`rounded-lg p-8 w-full max-w-md
          ${
            darkMode
              ? "bg-[#928DAB]/30 text-white shadow-lg"
              : "bg-white bg-opacity-80 text-[#1F1C2C] shadow-md"
          }
          transition-colors duration-500
        `}
      >
        <div className="flex items-center justify-between mb-6">
          <label
            htmlFor="darkMode"
            className={`font-semibold text-lg select-none ${
              darkMode ? "text-[#C3BDD4]" : "text-[#1F1C2C]"
            }`}
          >
            Dark Mode
          </label>
          <input
            type="checkbox"
            id="darkMode"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="w-6 h-6 cursor-pointer accent-[#928DAB]"
          />
        </div>

        <div className="flex items-center justify-between">
          <label
            htmlFor="notifications"
            className={`font-semibold text-lg select-none ${
              darkMode ? "text-[#C3BDD4]" : "text-[#1F1C2C]"
            }`}
          >
            Show Notifications
          </label>
          <input
            type="checkbox"
            id="notifications"
            checked={showNotifications}
            onChange={() => setShowNotifications(!showNotifications)}
            className="w-6 h-6 cursor-pointer accent-[#928DAB]"
          />
        </div>

        {showNotifications && (
          <div
            className={`mt-6 p-4 rounded border ${
              darkMode ? "border-[#C3BDD4]" : "border-[#928DAB]"
            } text-center font-medium select-none`}
          >
            Notifications are enabled!
          </div>
        )}
      </div>
    </main>
  );
};

export default Settings;
