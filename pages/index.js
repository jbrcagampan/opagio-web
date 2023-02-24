import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// components
import LeadsTable from "components/Cards/LeadsTable.js";
import LeadsFilter from "components/Cards/LeadsFilter";

// layout for page

import Admin from "layouts/Admin.js";

// services
import { getLeads, getStudios } from "services/LeadsService";

export default function Dashboard() {
  const router = useRouter();
  const [leads, setLeads] = useState([]);
  const [studios, setStudios] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLeads = async () => {
      setIsLoading(true);
      const res = await getLeads(router.query);
      setLeads(res.data);
      setIsLoading(false);
    };
    const fetchStudios = async () => {
      const res = await getStudios();
      setStudios(res.data);
    };
    fetchStudios();
    fetchLeads();
  }, [router]);

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 xl:mb-0 px-4">
          <LeadsFilter studios={studios} />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 xl:mb-0 px-4">
          <LeadsTable leads={leads} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Admin;
