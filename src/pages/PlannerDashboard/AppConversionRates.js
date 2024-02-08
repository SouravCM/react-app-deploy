import PropTypes from "prop-types";
import ReactApexChart from "react-apexcharts";
import { Box, Card, CardHeader } from "@mui/material";
import { useState, useEffect } from "react";

import useChart from "./useChart";

AppConversionRates.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  itemTrip: PropTypes.array.isRequired,
  itemPlan: PropTypes.array.isRequired,
};

export default function AppConversionRates({
  title,
  subheader,
  itemTrip = [],
  itemPlan = [],
  ...other
}) {
  const [series, setSeries] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);

  useEffect(() => {
    // Map the item array to create the series data
    const tripData = itemTrip.map((i) => i.count); // Assuming the data for "Regular Cost" is in the "regularCostValue" property
    const planCostData = itemPlan.map((i) => i.count); // Assuming the data for "Premium Cost" is in the "premiumCostValue" property
    setChartLabels(itemTrip.map((i) => i.name));

    console.log(tripData);
    console.log(planCostData);
    console.log(chartLabels);

    // Set the series data
    setSeries([
      {
        name: "Trip Count",
        data: tripData,
      },
      {
        name: "Plan Count",
        data: planCostData,
      },
    ]);
  }, [itemTrip, itemPlan]);

  const chartOptions = useChart({
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => seriesName,
        title: {
          formatter: () => "",
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: "28%",
        borderRadius: 2,
        stacked: true, // Add the "stacked: true" here to enable stacking
      },
    },
    xaxis: {
      categories: chartLabels,
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart
          type="bar"
          series={series}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  );
}
