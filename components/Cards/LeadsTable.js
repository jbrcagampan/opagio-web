import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import moment from "moment";
import { useRouter } from "next/router";
// components
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ReactPaginate from "react-paginate";

export default function LeadsTable({ leads, isLoading }) {
  const router = useRouter();
  const [formattedLeads, setFormattedLeads] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [selectedPage, setSelectedPage] = useState(0);
  const [sorting, setSorting] = useState({ field: "_id", asc: true });

  const sortFields = (a, b) => (a < b ? -1 : a > b ? 1 : 0);

  useEffect(() => {
    const formattedData = leads.map((l, i) => ({
      index: i,
      ...l,
    }));
    setFormattedLeads(formattedData);
    const tempData = [...formattedData].splice(0, 10);
    setDataSource(tempData);
    setPageCount(leads.length ? Math.floor(leads.length / 10) + 1 : 0);
    setSorting({ field: "_id", asc: true });
    setSelectedPage(0);
  }, [leads]);

  const handlePageClick = ({ selected }) => {
    const tempData = [...formattedLeads].splice(selected * 10, 10);
    setDataSource(tempData);
    setSelectedPage(selected);
  };

  const handleSort = (field) => {
    let asc = true;
    if (sorting.field === field) {
      asc = !sorting.asc;
      setSorting({ field, asc });
    } else {
      setSorting({ field, asc: true });
    }
    let tempData = [...formattedLeads];
    switch (field) {
      case "studio":
      case "description":
      case "device":
      case "date":
      case "price":
        tempData = tempData.sort((a, b) =>
          asc ? sortFields(b[field], a[field]) : sortFields(a[field], b[field])
        );
        break;
      case "name":
        tempData = tempData.sort((a, b) =>
          asc
            ? sortFields(
                `${b.last_name}, ${b.first_name}`,
                `${a.last_name}, ${a.first_name}`
              )
            : sortFields(
                `${a.last_name}, ${a.first_name}`,
                `${b.last_name}, ${b.first_name}`
              )
        );
        break;
      default:
        break;
    }
    setFormattedLeads(tempData);
    setDataSource([...tempData].splice(selectedPage * 10, 10));
  };

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                Purchases
              </h6>
              <h2 className="text-blueGray-700 text-xl font-semibold">
                Summary
              </h2>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "cursor-pointer px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  }
                  onClick={() => handleSort("studio")}
                >
                  <span className="mr-1">Studio</span>
                  <i
                    className={
                      sorting.field === "studio" && sorting.asc === true
                        ? "fas fa-arrow-up"
                        : "fas fa-arrow-down"
                    }
                  ></i>
                </th>
                <th
                  className={
                    "cursor-pointer px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  }
                  onClick={() => handleSort("name")}
                >
                  <span className="mr-1">Name</span>
                  <i
                    className={
                      sorting.field === "name" && sorting.asc === true
                        ? "fas fa-arrow-up"
                        : "fas fa-arrow-down"
                    }
                  ></i>
                </th>
                <th
                  className={
                    "cursor-pointer px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  }
                  onClick={() => handleSort("description")}
                >
                  <span className="mr-1">Description</span>
                  <i
                    className={
                      sorting.field === "description" && sorting.asc === true
                        ? "fas fa-arrow-up"
                        : "fas fa-arrow-down"
                    }
                  ></i>
                </th>
                <th
                  className={
                    "cursor-pointer px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  }
                  onClick={() => handleSort("price")}
                >
                  <span className="mr-1">Price</span>
                  <i
                    className={
                      sorting.field === "price" && sorting.asc === true
                        ? "fas fa-arrow-up"
                        : "fas fa-arrow-down"
                    }
                  ></i>
                </th>
                <th
                  className={
                    "cursor-pointer px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  }
                >
                  Type
                </th>
                <th
                  className={
                    "cursor-pointer px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  }
                  onClick={() => handleSort("device")}
                >
                  <span className="mr-1">Device</span>
                  <i
                    className={
                      sorting.field === "device" && sorting.asc === true
                        ? "fas fa-arrow-up"
                        : "fas fa-arrow-down"
                    }
                  ></i>
                </th>
                <th
                  className={
                    "cursor-pointer px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  }
                  onClick={() => handleSort("date")}
                >
                  <span className="mr-1">Date</span>
                  <i
                    className={
                      sorting.field === "date" && sorting.asc === true
                        ? "fas fa-arrow-up"
                        : "fas fa-arrow-down"
                    }
                  ></i>
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from(Array(10).keys()).map((i) => (
                  <>
                    <tr key={i}>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <Skeleton count={1} />
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <Skeleton count={1} />
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <Skeleton count={1} />
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <Skeleton count={1} />
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <Skeleton count={1} />
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <Skeleton count={1} />
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <Skeleton count={1} />
                      </td>
                    </tr>
                  </>
                ))
              ) : dataSource.length ? (
                dataSource.map((lead) => (
                  <>
                    <tr key={lead.index}>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {lead.studio}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {`${lead.last_name ? lead.last_name + ", " : ""} ${
                          lead.first_name ? lead.first_name : ""
                        }`}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {lead.description}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        £{(Math.round(lead.price * 100) / 100).toFixed(2)}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {!lead.recur && (
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-emerald-600 bg-emerald-200 uppercase last:mr-0 mr-1 w-25-px text-center">
                            O
                          </span>
                        )}
                        {lead.recur && (
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 uppercase last:mr-0 mr-1 w-25-px text-center">
                            R
                          </span>
                        )}
                        {lead.invite_a_friend && (
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200 uppercase last:mr-0 mr-1 w-25-px text-center">
                            I
                          </span>
                        )}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {lead.device}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {moment(lead.date).format("MM-DD-YYYY hh:mm")}
                      </td>
                    </tr>
                  </>
                ))
              ) : (
                <>
                  <tr>
                    <td
                      className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                      colSpan={7}
                    >
                      {router.query
                        ? "We couldn't find any matches. Try another Search."
                        : "No Data from the Database."}
                    </td>
                  </tr>
                </>
              )}
            </tbody>
            <tfoot>
              <tr>
                <th
                  colSpan={7}
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  }
                >
                  <div className="flex">
                    {leads.length > 0 && <div className="flex-1">
                      {`Showing results ${(selectedPage*10)+1} to ${(selectedPage*10)+10 <= leads.length ? (selectedPage*10)+10 : leads.length} of ${leads.length}`}
                    </div>}
                    <ReactPaginate
                      breakLabel="..."
                      nextLabel="NEXT"
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={4}
                      pageCount={pageCount}
                      previousLabel="PREVIOUS"
                      renderOnZeroPageCount={null}
                      className="pagination flex-1"
                      forcePage={selectedPage}
                    />
                  </div>
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
}

LeadsTable.defaultProps = {
  leads: [],
  isLoading: false,
};

LeadsTable.propTypes = {
  leads: PropTypes.array,
  isLoading: PropTypes.bool,
};
