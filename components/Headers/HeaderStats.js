import React from "react";
import PropTypes from "prop-types";

// components

import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats({stats}) {
  return (
    <>
      {/* Header */}
      <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Leads"
                  statTitle={stats.users ? stats.users : ''}
                  statArrow="up"
                  statPercent=""
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-user"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Web"
                  statTitle={stats.web ? stats.web : ''}
                  statArrow="down"
                  statPercent=""
                  statPercentColor="text-red-500"
                  statDescripiron="Since last week"
                  statIconName="fas fa-desktop"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="iPhone"
                  statTitle={stats.iphone ? stats.iphone : ''}
                  statArrow="down"
                  statPercent=""
                  statPercentColor="text-orange-500"
                  statDescripiron="Since yesterday"
                  statIconName="fas fa-mobile"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Android"
                  statTitle={stats.android ? stats.android : ''}
                  statArrow="up"
                  statPercent=""
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-mobile"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

HeaderStats.defaultProps = {
  stats: {},
};

HeaderStats.propTypes = {
  stats: PropTypes.object
};
