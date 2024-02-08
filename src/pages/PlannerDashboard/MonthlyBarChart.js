import { useEffect, useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";

// third-party
import ReactApexChart from "react-apexcharts";

import ApexCharts from "react-apexcharts";

// chart options
const barChartOptions = {
  chart: {
    type: "bar",
    height: 365,
    toolbar: {
      show: true,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: "45%",
      borderRadius: 4,
      dataLabels: {
        position: "top", // Set data labels position to top
      },
    },
  },
  dataLabels: {
    enabled: true, // Enable data labels
    style: {
      fontSize: "12px",
      colors: ["#ffffff"], // Set color for data labels
    },
  },

  yaxis: {
    show: true,
  },
  grid: {
    show: true,
  },
};

// ==============================|| MONTHLY BAR CHART ||============================== //

const MonthlyBarChart = ({ item = [], type }) => {
  //console.log("passing type Hi" + type);
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const info = theme.palette.info.light;

  const [series, setSeries] = useState([
    {
      name: type,
      data: [],
    },
  ]);

  const [options, setOptions] = useState(barChartOptions);

  useEffect(() => {
    if (item && item && Array.isArray(item)) {
      let seriesData = [];
      if (type === "trips") {
        seriesData = item.map((trip) => trip.trips);
      } else if (type === "distance") {
        seriesData = item.map((trip) => trip.distance);
      }
      const categoriesData = item.map((trip) => trip.name);

      setSeries([
        {
          data: seriesData,
        },
      ]);

      setOptions((prevState) => ({
        ...prevState,
        colors: [info],
        xaxis: {
          categories: categoriesData,
          labels: {
            style: {
              colors: [secondary],
            },
          },
        },
        tooltip: {
          theme: "light",
          enabled: true,
          y: {
            formatter: function (val) {
              if (type === "trips") {
                return val + " Trips"; // Customize the tooltip content based on the type
              } else if (type === "distance") {
                return val + " km"; // Customize the tooltip content based on the type
              }
              return val; // Default case
            },
          },
        },
      }));
    }
  }, [item, info, secondary, type]);

  if (!item || !item || !Array.isArray(item)) {
    return <div>No data available</div>;
  }

  return (
    <div id="chart">
      <ApexCharts options={options} series={series} type="bar" height={400} />
    </div>
  );
};

export default MonthlyBarChart;
