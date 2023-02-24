/* eslint-disable no-loop-func */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

//Components
import Chart from "chart.js";

// Utilities
import { formatDate, subtractDays, subtractMonths, subtractYears, getNextSunday } from "utils/Date";
export default function LeadsBarChart({ leads }) {
  const [filter, setFilter] = useState("Daily");
  const changeFilter = (f) => {
    setFilter(f);
  };

  useEffect(() => {
    let labels = [];
    let oneTimeData = [];
    let recurringData = [];
    const leadsOneTime = leads.filter((l) => l.recur === false);
    const leadsRecur = leads.filter((l) => l.recur === true);
    if (filter === "Daily") {
      let startDate = new Date();
      for (let i = 0; i < 20; i++) {
        labels.push(formatDate(startDate, true, true, true, true));
        const oneTime = leadsOneTime.filter(
          (l) =>
          formatDate(startDate, true, true, true) === formatDate(l.date, true, true, true)
        );
        oneTimeData.push(oneTime.length);
        const recur = leadsRecur.filter(
          (l) =>
          formatDate(startDate, true, true, true) === formatDate(l.date, true, true, true)
        );
        recurringData.push(recur.length);
        startDate = subtractDays(startDate, 1);
      }
      labels = labels.reverse();
      oneTimeData = oneTimeData.reverse();
      recurringData = recurringData.reverse();
    } else if (filter === "Yearly") {
      let startDate = new Date();
      for (let i = 0; i < 20; i++) {
        labels.push(formatDate(startDate,false,false,true));
        const oneTime = leadsOneTime.filter(
          (l) =>
          formatDate(startDate, false, false, true) === formatDate(l.date, false, false, true)
        );
        oneTimeData.push(oneTime.length);
        const recur = leadsRecur.filter(
          (l) =>
          formatDate(startDate, false, false, true) === formatDate(l.date, false, false, true)
        );
        recurringData.push(recur.length);
        startDate = subtractYears(startDate, 1);
      }
      labels = labels.reverse();
      oneTimeData = oneTimeData.reverse();
      recurringData = recurringData.reverse();
    } else if (filter === "Monthly") {
      let startDate = new Date();
      for (let i = 0; i < 20; i++) {
        labels.push(formatDate(startDate,true,false,true, true));
        const oneTime = leadsOneTime.filter(
          (l) =>
          formatDate(startDate, true, false, true) === formatDate(l.date, true, false, true)
        );
        oneTimeData.push(oneTime.length);
        const recur = leadsRecur.filter(
          (l) =>
          formatDate(startDate, true, false, true) === formatDate(l.date, true, false, true)
        );
        recurringData.push(recur.length);
        startDate = subtractMonths(startDate, 1);
      }
      labels = labels.reverse();
      oneTimeData = oneTimeData.reverse();
      recurringData = recurringData.reverse();
    } else if (filter === "Weekly") {
      let endDate = getNextSunday(new Date(), 0);
      let startDate = subtractDays(endDate, 7);
      for (let i = 0; i < 20; i++) {
        labels.push(
          `${formatDate(startDate, true,true,false, true)} - ${formatDate(endDate,true,true,false, true)}`
        );
        const oneTime = leadsOneTime.filter(
          (l) =>
            new Date(l.date) > new Date(startDate) &&
            new Date(l.date) <= new Date(endDate)
        );
        oneTimeData.push(oneTime.length);
        const recur = leadsRecur.filter(
          (l) =>
            new Date(l.date) > new Date(startDate) &&
            new Date(l.date) <= new Date(endDate)
        );
        recurringData.push(recur.length);
        startDate = subtractDays(startDate, 7);
        endDate = subtractDays(endDate, 7);
      }
      labels = labels.reverse();
      oneTimeData = oneTimeData.reverse();
      recurringData = recurringData.reverse();
    }
    let config = {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "One Time",
            backgroundColor: "#A7F3D0",
            borderColor: "#A7F3D0",
            data: oneTimeData,
            fill: false,
            barThickness: 8,
          },
          {
            label: "Recurring",
            fill: false,
            backgroundColor: "#BAE6FD",
            borderColor: "#BAE6FD",
            data: recurringData,
            barThickness: 8,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Orders Chart",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        legend: {
          labels: {
            fontColor: "rgba(0,0,0,.4)",
          },
          align: "end",
          position: "bottom",
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
              },
              gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(33, 37, 41, 0.3)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
              },
              gridLines: {
                borderDash: [2],
                drawBorder: false,
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.2)",
                zeroLineColor: "rgba(33, 37, 41, 0.15)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };

    var ctx = document.getElementById("bar-chart").getContext("2d");
    if (window.bar !== undefined) window.bar.destroy();
    window.bar = new Chart(ctx, config);
  }, [filter, leads]);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                Purchases
              </h6>
              <h2 className="text-blueGray-700 text-xl font-semibold">
                Statistics
              </h2>
            </div>
            <div className="flex justify-center">
              <button
                className={`mb-3 text-xs px-4 py-2 rounded shadow outline-none focus:outline-none mr-1 mb-1 
                ${
                  filter === "Daily"
                    ? "bg-blueGray-800 text-white active:bg-blueGray-600 cursor-default"
                    : "bg-lightBlue-500 text-white active:bg-lightBlue-600 hover:shadow-lg ease-linear transition-all duration-150"
                }`}
                type="button"
                onClick={() => changeFilter("Daily")}
                disabled={filter === "Daily"}
              >
                Daily
              </button>
              <button
                className={`mb-3 text-xs px-4 py-2 rounded shadow outline-none focus:outline-none mr-1 mb-1 
                ${
                  filter === "Weekly"
                    ? "bg-blueGray-800 text-white active:bg-blueGray-600 cursor-default"
                    : "bg-lightBlue-500 text-white active:bg-lightBlue-600 hover:shadow-lg ease-linear transition-all duration-150"
                }`}
                type="button"
                onClick={() => changeFilter("Weekly")}
                disabled={filter === "Weekly"}
              >
                Weekly
              </button>
              <button
                className={`mb-3 text-xs px-4 py-2 rounded shadow outline-none focus:outline-none mr-1 mb-1 
                ${
                  filter === "Monthly"
                    ? "bg-blueGray-800 text-white active:bg-blueGray-600 cursor-default"
                    : "bg-lightBlue-500 text-white active:bg-lightBlue-600 hover:shadow-lg ease-linear transition-all duration-150"
                }`}
                type="button"
                onClick={() => changeFilter("Monthly")}
                disabled={filter === "Monthly"}
              >
                Monthly
              </button>
              <button
                className={`mb-3 text-xs px-4 py-2 rounded shadow outline-none focus:outline-none mr-1 mb-1 
                ${
                  filter === "Yearly"
                    ? "bg-blueGray-800 text-white active:bg-blueGray-600 cursor-default"
                    : "bg-lightBlue-500 text-white active:bg-lightBlue-600 hover:shadow-lg ease-linear transition-all duration-150"
                }`}
                type="button"
                onClick={() => changeFilter("Yearly")}
                disabled={filter === "Yearly"}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="bar-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}

LeadsBarChart.defaultProps = {
  leads: [],
};

LeadsBarChart.propTypes = {
  leads: PropTypes.array,
};
