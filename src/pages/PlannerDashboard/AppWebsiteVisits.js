import PropTypes from "prop-types";
import ReactApexChart from "react-apexcharts";
// @mui
import { Card, CardHeader, Box } from "@mui/material";
import useChart from "./useChart";
import { json } from "react-router-dom";
// components

// ----------------------------------------------------------------------

AppWebsiteVisits.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
  test: PropTypes.array.isRequired,
};

export default function AppWebsiteVisits({
  title,
  subheader,
  test = [],
  chartData,
  ...other
}) {
  const Labels = test.map((data) => data.name);

  const costImpact = test.map((trip) => trip.costImpact);
  const regularCost = test.map((trip) => trip.regularCost);
  const premiumCost = test.map((trip) => trip.premiumCost);

  const testChartData = [
    {
      name: "Regular Cost",
      type: "line",
      fill: "solid",
      data: regularCost,
      color: "rgba(3, 169, 244, 0.85)",
    },
    {
      name: "Premium Cost",
      type: "area",
      fill: "gradient",
      data: premiumCost,
      color: "rgb(255, 193, 7)",
    },
    {
      name: "Cost Impact",
      type: "column",
      fill: "gradient",
      data: costImpact,
      color: "rgb(32, 101, 209)",
    },
  ];

  console.log("test data" + JSON.stringify(test));
  const chartOptions = useChart({
    plotOptions: { bar: { columnWidth: "16%" } },
    fill: { type: testChartData.map((i) => i.fill) },
    labels: Labels,
    xaxis: { type: "datetime" },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== "undefined") {
            return `${y.toFixed(0)} cost`;
          }
          return y;
        },
      },
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart
          type="line"
          series={testChartData}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  );
}
