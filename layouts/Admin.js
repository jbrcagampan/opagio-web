import React, { useState, useEffect } from "react";

// components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// services
import { getStats } from "services/LeadsService";

export default function Admin({ children }) {
  const [stats, setStats] = useState({
    users: 0,
    web: 0,
    android: 0,
    iphone: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getHeaderStatsData = async () => {
      setIsLoading(true);
      const res = await getStats();
      if (res.data) {
        setStats(res.data);
      }
      setIsLoading(false);
    };
    getHeaderStatsData();
  }, []);
  return (
    <>
      <Sidebar />
      <div className="md:ml-64 bg-blueGray-100 flex flex-col min-h-screen">
        <AdminNavbar />
        <HeaderStats stats={stats} isLoading={isLoading} />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
        </div>
      </div>
    </>
  );
}
