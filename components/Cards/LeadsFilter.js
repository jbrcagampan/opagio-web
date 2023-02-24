import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

export default function LeadsFilter({ studios }) {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [studio, setStudio] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [typeOneTime, setTypeOneTime] = useState(false);
  const [typeRecurring, setTypeRecurring] = useState(false);
  const [typeInvite, setTypeInvite] = useState(false);
  const [deviceWeb, setDeviceWeb] = useState(false);
  const [deviceIphone, setDeviceIphone] = useState(false);
  const [deviceAndroid, setDeviceAndroid] = useState(false);

  useEffect(() => {
    if (router.query) {
      if (router.query.search) {
        setSearch(router.query.search);
      }
      if (router.query.min) {
        setPriceMin(router.query.min);
      }
      if (router.query.max) {
        setPriceMax(router.query.max);
      }
      if (router.query.studio) {
        setStudio(router.query.studio);
      }
      if (router.query.type) {
        const selectedTypes = router.query.type.split(",");
        setTypeOneTime(selectedTypes.indexOf("oneTime") > -1);
        setTypeRecurring(selectedTypes.indexOf("recurring") > -1);
        setTypeInvite(selectedTypes.indexOf("invite") > -1);
      }
      if (router.query.device) {
        const selectedDevices = router.query.device.split(",");
        setDeviceWeb(selectedDevices.indexOf("Web") > -1);
        setDeviceIphone(selectedDevices.indexOf("iPhone") > -1);
        setDeviceAndroid(selectedDevices.indexOf("Android") > -1);
      }
    }
  }, [router, studios]);

  const handleChange = (e) => {
    const inputName = e.target.name;
    switch (inputName) {
      case "search":
        setSearch(e.target.value);
        break;
      case "studio":
        setStudio(e.target.value);
        break;
      case "priceMin":
        const minVal = /^\d*\.?\d*$/;
        if (e.target.value === "" || minVal.test(e.target.value)) {
          setPriceMin(e.target.value);
        }
        break;
      case "priceMax":
        const maxVal = /^\d*\.?\d*$/;
        if (e.target.value === "" || maxVal.test(e.target.value)) {
          setPriceMax(e.target.value);
        }
        break;
      case "typeOneTime":
        setTypeOneTime(e.target.checked);
        break;
      case "typeRecurring":
        setTypeRecurring(e.target.checked);
        break;
      case "typeInvite":
        setTypeInvite(e.target.checked);
        break;
      case "deviceWeb":
        setDeviceWeb(e.target.checked);
        break;
      case "deviceIphone":
        setDeviceIphone(e.target.checked);
        break;
      case "deviceAndroid":
        setDeviceAndroid(e.target.checked);
        break;
      default:
        break;
    }
  };

  const onSearch = () => {
    let purchaseType = [];
    let deviceType = [];

    if (typeOneTime) {
      purchaseType.push("oneTime");
    }
    if (typeRecurring) {
      purchaseType.push("recurring");
    }
    if (typeInvite) {
      purchaseType.push("invite");
    }
    if (deviceWeb) {
      deviceType.push("Web");
    }
    if (deviceIphone) {
      deviceType.push("iPhone");
    }
    if (deviceAndroid) {
      deviceType.push("Android");
    }
    let urlParams = [];
    if (search) {
      urlParams.push("search=" + search);
    }
    if (studio) {
      urlParams.push("studio=" + studio);
    }
    if (priceMin) {
      urlParams.push("min=" + priceMin);
    }
    if (priceMax) {
      urlParams.push("max=" + priceMax);
    }
    if (purchaseType.length) {
      urlParams.push("type=" + purchaseType.join(","));
    }
    if (deviceType.length) {
      urlParams.push("device=" + deviceType.join(","));
    }
    router.push("/" + (urlParams.length > 0 ? "?" + urlParams.join("&") : ""));
  };

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-end">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className={"font-semibold text-lg text-blueGray-700"}>
                What are you looking for?
              </h3>
              <div className="relative flex w-full flex-wrap items-stretch mb-3">
                <input
                  name="search"
                  value={search}
                  onChange={handleChange}
                  type="text"
                  placeholder="Name / Description"
                  className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pr-10"
                />
                <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                  <i className="fas fa-search"></i>
                </span>
              </div>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className={"font-semibold text-lg text-blueGray-700"}>
                Studio
              </h3>
              <div className="relative flex w-full flex-wrap items-stretch mb-3">
                <select
                  name="studio"
                  value={studio}
                  onChange={handleChange}
                  placeholder="Regular Input"
                  className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pr-10"
                >
                  <option></option>
                  {studios.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className={"font-semibold text-lg text-blueGray-700"}>
                Price
              </h3>
              <div className="relative flex w-full gap-10 mb-3">
                <div className="flex mr-1">
                  <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                    <i className="fas fa-pound-sign"></i>
                  </span>
                  <input
                    name="priceMin"
                    value={priceMin}
                    onChange={handleChange}
                    type="text"
                    placeholder="Min"
                    className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10"
                  />
                </div>
                <div className="flex ml-1">
                  <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                    <i className="fas fa-pound-sign"></i>
                  </span>
                  <input
                    name="priceMax"
                    value={priceMax}
                    onChange={handleChange}
                    type="text"
                    placeholder="Max"
                    className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-end">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className={"font-semibold text-lg text-blueGray-700"}>
                Purchase Type
              </h3>
              <div className="flex mb-3 items-center">
                <input
                  name="typeOneTime"
                  value={typeOneTime}
                  checked={typeOneTime}
                  onChange={handleChange}
                  type="checkbox"
                  className="mr-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline "
                />
                <div className="mr-1 text-md text-blueGray-700">1 Time</div>
                <span className="mr-3 text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-emerald-600 bg-emerald-200 uppercase last:mr-0 mr-1">
                  O
                </span>
                <input
                  name="typeRecurring"
                  value={typeRecurring}
                  checked={typeRecurring}
                  onChange={handleChange}
                  type="checkbox"
                  className="mr-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline "
                />
                <div className="mr-1 text-md text-blueGray-700">Recurring</div>
                <span className="mr-3 text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 uppercase last:mr-0 mr-1">
                  R
                </span>
                <input
                  name="typeInvite"
                  value={typeInvite}
                  checked={typeInvite}
                  onChange={handleChange}
                  type="checkbox"
                  className="mr-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline "
                />
                <div className="mr-1 text-md text-blueGray-700">
                  Invite a Friend
                </div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200 uppercase last:mr-0 mr-1">
                  F
                </span>
              </div>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className={"font-semibold text-lg text-blueGray-700"}>
                Device
              </h3>
              <div className="flex mb-3 items-center">
                <input
                  name="deviceWeb"
                  value={deviceWeb}
                  checked={deviceWeb}
                  onChange={handleChange}
                  type="checkbox"
                  className="mr-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline "
                />
                <div className="mr-3 text-md text-blueGray-700">Web</div>
                <input
                  name="deviceIphone"
                  value={deviceIphone}
                  checked={deviceIphone}
                  onChange={handleChange}
                  type="checkbox"
                  className="mr-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline "
                />
                <div className="mr-3 text-md text-blueGray-700">iPhone</div>
                <input
                  name="deviceAndroid"
                  value={deviceAndroid}
                  checked={deviceAndroid}
                  onChange={handleChange}
                  type="checkbox"
                  className="mr-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline "
                />
                <div className="mr-3 text-md text-blueGray-700">Android</div>
              </div>
            </div>
            <div className="flex w-full px-4 max-w-full flex-grow flex-1 items-end justify-items-end">
              <div className="flex-1"></div>
              <button
                className="mb-3 bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={onSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

LeadsFilter.defaultProps = {
  studios: [],
};

LeadsFilter.propTypes = {
  studios: PropTypes.array,
};
