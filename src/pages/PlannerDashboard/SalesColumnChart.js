import { useEffect, useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";

// third-party
import ReactApexChart from "react-apexcharts";

// chart options
const columnChartOptions = {
  chart: {
    type: "bar",
    height: 430,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: "30%",
      borderRadius: 4,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 8,
    colors: ["transparent"],
  },
  xaxis: {
    categories: ["Inward Freight", "Outward Freight"],
  },
  yaxis: {
    title: {
      text: "₹ (rupees)",
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter(val) {
        return `₹ ${val} rupees`;
      },
    },
  },
  legend: {
    show: true,
    fontFamily: `'Public Sans', sans-serif`,
    offsetX: 10,
    offsetY: 10,
    labels: {
      useSeriesColors: false,
    },
    markers: {
      width: 16,
      height: 16,
      radius: "50%",
      offsexX: 2,
      offsexY: 2,
    },
    itemMargin: {
      horizontal: 15,
      vertical: 50,
    },
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        yaxis: {
          show: false,
        },
      },
    },
  ],
};

// ==============================|| SALES COLUMN CHART ||============================== //

const SalesColumnChart = ({ item = [] }) => {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const warning = theme.palette.warning.main;
  const primaryMain = theme.palette.primary.main;
  const successDark = theme.palette.success.dark;

  const [series, setSeries] = useState([]);

  useEffect(() => {
    // Map the item array to create the series data
    const regularCostData = item.map((itemData) => itemData.regularCost);
    const premiumCostData = item.map((itemData) => itemData.premiumCost);
    const costImpactData = item.map((itemData) => itemData.costImpact);

    // Set the series data
    setSeries([
      {
        name: "Regular Cost",
        data: regularCostData,
      },
      {
        name: "Premium Cost",
        data: premiumCostData,
      },
      {
        name: "Cost Impact",
        data: costImpactData,
      },
    ]);
  }, [item]);

  const [options, setOptions] = useState(columnChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [
        "rgba(3, 169, 244, 0.85)",
        "rgb(255, 193, 7)",
        "rgb(32, 101, 209)",
      ],
      xaxis: {
        labels: {
          style: {
            colors: [
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
            ],
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary],
          },
        },
      },
      grid: {
        borderColor: line,
      },
      tooltip: {
        theme: "light",
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        labels: {
          colors: "grey.500",
        },
      },
    }));
  }, [primary, secondary, line, warning, primaryMain, successDark]);

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={430}
      />
    </div>
  );
};

export default SalesColumnChart;
