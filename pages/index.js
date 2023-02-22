import React, { useEffect, useState } from "react";

// components
import LeadsTable from "components/Cards/LeadsTable.js";
import HeaderStats from "components/Headers/HeaderStats";
import { test } from "services/LeadsService";

// layout for page

import Admin from "layouts/Admin.js";

// services
import { getLeads } from "services/LeadsService";

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  useEffect(async () => {
    console.log(await test());
    const res = await getLeads();
    if (res.data) {
      setLeads(res.data);
    }
  }, []);

  return (
    <>
      {/* Header */}
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 xl:mb-0 px-4">
          <LeadsTable leads={leads} />
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Admin;
