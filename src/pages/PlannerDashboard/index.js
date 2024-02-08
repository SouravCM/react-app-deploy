import { useState, useEffect } from "react";

// material-ui
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AuthServices from "../../services/AuthServices";
import plannerService from "../../services/PlannerService";
import dayjs from "dayjs";

// project import
import OrdersTable from "./OrdersTable";
import IncomeAreaChart from "./IncomeAreaChart";
import MonthlyBarChart from "./MonthlyBarChart";
import ReportAreaChart from "./ReportAreaChart";
import SalesColumnChart from "./SalesColumnChart";
import MainCard from "../../components/MainCard";

import AnalyticEcommerce from "../../components/cards/statistics/AnalyticEcommerce";

import AppWebsiteVisits from "./AppWebsiteVisits";
import AppCurrentVisits from "./AppCurrentVisits";

// assets
import {
  GiftOutlined,
  MessageOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import PfCountChart from "./PFCountChart";
import AppConversionRates from "./AppConversionRates";
import AppWidgetSummary from "./AppWidgetSummary";

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: "1rem",
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: "auto",
  right: "auto",
  alignSelf: "flex-start",
  transform: "none",
};

// sales report status
const status = [
  {
    value: "today",
    label: "Today",
  },
  {
    value: "month",
    label: "This Month",
  },
  {
    value: "year",
    label: "This Year",
  },
];

const ItemStyle = {
  padding: "4px",
  margin: "4px",
};

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const [value, setValue] = useState("today");
  const [slot, setSlot] = useState("week");
  const [dashboardData, setDashboardData] = useState([]);
  const [gateDashboardData, setGateDashboardData] = useState([]);

  const [startDate, setstartDate] = useState(dayjs().startOf("month"));
  const [endDate, setendDate] = useState(dayjs().endOf("day"));

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    let userCompany = AuthServices.getSelectedPlant();
    let plantId = userCompany.plantId;
    const formattedEndDate = endDate.endOf("day").format("YYYY-MM-DD HH:mm:ss");
    const formattedStartDate = startDate
      .startOf("day")
      .format("YYYY-MM-DD HH:mm:ss");
    const data = {
      companyId: plantId,
      fromDate: formattedStartDate,
      toDate: formattedEndDate,
    };

    let dashboardData = await plannerService.getPlannerDashboard(data);

    if (dashboardData.code === 200) {
      setDashboardData(dashboardData.responseBody);
    } else {
      console.log("Something went wrong in Dashboard List getting");
    }

    let gateDashboardDataRes = await plannerService.getPlannerDashboardGate(
      data
    );
    if (gateDashboardDataRes.code === 200) {
      setGateDashboardData(gateDashboardDataRes.responseBody);
    } else {
      console.log("Something went wrong in Gate Dashboard List getting");
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <Grid container rowSpacing={5.5} columnSpacing={3.75}>
        {/* row 1 */}
        <Grid item xs={12}>
          <Typography variant="h4">Dashboard</Typography>
        </Grid>
        <Grid item xs={12} style={ItemStyle}>
          <div>
            <Paper elevation={2}>
              <div style={{ padding: "8px", display: "flex" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div style={{ margin: "8px" }}>
                    <DatePicker
                      label="Start Date"
                      value={startDate}
                      onChange={(newValue) => setstartDate(newValue)}
                      format="DD-MM-YYYY"
                    />
                  </div>

                  <div style={{ margin: "8px" }}>
                    <DatePicker
                      label="End Date"
                      value={endDate}
                      format="DD-MM-YYYY"
                      onChange={(newValue) => setendDate(newValue)}
                    />
                  </div>
                  <Button
                    variant="contained"
                    style={{
                      borderRadius: "5px",
                      padding: "16px",
                      margin: "8px",
                      width: "auto",
                      height: "auto",
                    }}
                    onClick={fetchDashboardData}
                  >
                    Search
                  </Button>
                </LocalizationProvider>
              </div>
            </Paper>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Grid container alignItems="flex-start">
            <Grid item>
              <Typography variant="h5">Plan Summary</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          rowSpacing={3}
          columnSpacing={1}
          marginTop={1}
          marginBottom={4}
        >
          {/* row 1 */}

          <Grid item xs={12} sm={6} md={4} lg={3} style={{ height: "150px" }}>
            <AppWidgetSummary
              title="Plan Created"
              total={dashboardData.openPlans + dashboardData.closedPlans}
              icon={"ant-design:file-filled"}
              paletcolor="#061B64"
              bgColor="#D1E9FC"
              iconColor="#103996"
              sx={{ marginLeft: 5 }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3} style={{ height: "150px" }}>
            <AppWidgetSummary
              title="Closed Plans"
              total={dashboardData.closedPlans}
              icon={"ant-design:check-circle-filled"}
              paletcolor="#08660D"
              bgColor="#E9FCD4"
              iconColor="#229A16"
              sx={{ marginLeft: 5 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} style={{ height: "150px" }}>
            <AppWidgetSummary
              title="Vehicles On Trip"
              total={dashboardData.vehiclesAssignedPlans}
              icon={"ant-design:car-outlined"}
              paletcolor="#7A4F01"
              bgColor="#FFF7CD"
              iconColor="#B78103"
              sx={{ marginLeft: 5 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} style={{ height: "150px" }}>
            <AppWidgetSummary
              title="Vehicles Yet To Assign"
              total={dashboardData.vehiclesNotAssignedPlans}
              icon={"ant-design:close-circle-filled"}
              paletcolor="#7A0C2E"
              bgColor="#FFE7D9"
              iconColor="#B72136"
              sx={{ marginLeft: 5 }}
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container alignItems="flex-start">
            <Grid item>
              <Typography variant="h5">On Trip</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          rowSpacing={3}
          columnSpacing={1}
          marginTop={1}
          marginBottom={4}
        >
          {/* row 1 */}

          <Grid item xs={12} sm={6} md={4} lg={3} style={{ height: "150px" }}>
            <AppWidgetSummary
              title="Gps"
              total={dashboardData.gpsTrips}
              icon={"ant-design:file-filled"}
              paletcolor="#061B64"
              bgColor="#D1E9FC"
              iconColor="#103996"
              sx={{ marginLeft: 5 }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3} style={{ height: "150px" }}>
            <AppWidgetSummary
              title="No Gps"
              total={dashboardData.nogpsTrips}
              icon={"ant-design:check-circle-filled"}
              paletcolor="#08660D"
              bgColor="#E9FCD4"
              iconColor="#229A16"
              sx={{ marginLeft: 5 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} style={{ height: "150px" }}>
            <AppWidgetSummary
              title="Market"
              total={dashboardData.marketTrips}
              icon={"ant-design:car-outlined"}
              paletcolor="#7A4F01"
              bgColor="#FFF7CD"
              iconColor="#B78103"
              sx={{ marginLeft: 5 }}
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container alignItems="flex-start">
            <Grid item>
              <Typography variant="h5">Gate In Vehicals</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          rowSpacing={3}
          columnSpacing={1}
          marginTop={1}
          marginBottom={4}
        >
          {/* row 1 */}

          <Grid item xs={12} sm={6} md={4} lg={3} style={{ height: "150px" }}>
            <AppWidgetSummary
              title="Total"
              total={gateDashboardData.inVehicles}
              icon={"ant-design:file-filled"}
              paletcolor="#061B64"
              bgColor="#D1E9FC"
              iconColor="#103996"
              sx={{ marginLeft: 5 }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3} style={{ height: "150px" }}>
            <AppWidgetSummary
              title="With Gps"
              total={gateDashboardData.inVehiclesWithGPS}
              icon={"ant-design:check-circle-filled"}
              paletcolor="#08660D"
              bgColor="#E9FCD4"
              iconColor="#229A16"
              sx={{ marginLeft: 5 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} style={{ height: "150px" }}>
            <AppWidgetSummary
              title="Without Gps"
              total={gateDashboardData.inVehiclesWithOutGPS}
              icon={"ant-design:car-outlined"}
              paletcolor="#7A4F01"
              bgColor="#FFF7CD"
              iconColor="#B78103"
              sx={{ marginLeft: 5 }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container alignItems="flex-start">
            <Grid item>
              <Typography variant="h5">Gate Out Vehicals</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          rowSpacing={3}
          columnSpacing={1}
          marginTop={1}
          marginBottom={4}
        >
          {/* row 1 */}

          <Grid item xs={12} sm={6} md={4} lg={3} style={{ height: "150px" }}>
            <AppWidgetSummary
              title="Total"
              total={gateDashboardData.outVehicles}
              icon={"ant-design:file-filled"}
              paletcolor="#061B64"
              bgColor="#D1E9FC"
              iconColor="#103996"
              sx={{ marginLeft: 5 }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3} style={{ height: "150px" }}>
            <AppWidgetSummary
              title="With Gps"
              total={gateDashboardData.outVehiclesWithGPS}
              icon={"ant-design:check-circle-filled"}
              paletcolor="#08660D"
              bgColor="#E9FCD4"
              iconColor="#229A16"
              sx={{ marginLeft: 5 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} style={{ height: "150px" }}>
            <AppWidgetSummary
              title="Without Gps"
              total={gateDashboardData.outVehiclesWithOutGPS}
              icon={"ant-design:car-outlined"}
              paletcolor="#7A4F01"
              bgColor="#FFF7CD"
              iconColor="#B78103"
              sx={{ marginLeft: 5 }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container alignItems="flex-start">
            <Grid item>
              <Typography variant="h5">Vehicals Inside Plant</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          rowSpacing={3}
          columnSpacing={1}
          marginTop={1}
          marginBottom={4}
        >
          {/* row 1 */}

          <Grid item xs={12} sm={6} md={4} lg={3} style={{ height: "150px" }}>
            <AppWidgetSummary
              title="Total"
              total={gateDashboardData.totalVehicles}
              icon={"ant-design:file-filled"}
              paletcolor="#061B64"
              bgColor="#D1E9FC"
              iconColor="#103996"
              sx={{ marginLeft: 5 }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3} style={{ height: "150px" }}>
            <AppWidgetSummary
              title="With Gps"
              total={gateDashboardData.totalVehiclesWithGPS}
              icon={"ant-design:check-circle-filled"}
              paletcolor="#08660D"
              bgColor="#E9FCD4"
              iconColor="#229A16"
              sx={{ marginLeft: 5 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} style={{ height: "150px" }}>
            <AppWidgetSummary
              title="Without Gps"
              total={gateDashboardData.totalVehiclesWithOutGPS}
              icon={"ant-design:car-outlined"}
              paletcolor="#7A4F01"
              bgColor="#FFF7CD"
              iconColor="#B78103"
              sx={{ marginLeft: 5 }}
            />
          </Grid>
        </Grid>

        <Grid item xs={4} md={4} lg={4}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Transporter Trip Summary</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 1 }} content={false}>
            <OrdersTable item={dashboardData.transporterTrips} />
          </MainCard>
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Trip Overview</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <Box sx={{ p: 3, pb: 0 }}>
              <Stack spacing={2}>
                <Typography variant="h6" color="textSecondary">
                  Transporter VS Trips
                </Typography>
              </Stack>
            </Box>
            <MonthlyBarChart
              item={dashboardData.transporterTrips}
              type="trips"
            />
          </MainCard>
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Distance Overview</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <Box sx={{ p: 3, pb: 0 }}>
              <Stack spacing={2}>
                <Typography variant="h6" color="textSecondary">
                  Transporter VS Distance
                </Typography>
              </Stack>
            </Box>
            <MonthlyBarChart
              item={dashboardData.transporterTrips}
              type="distance"
            />
          </MainCard>
        </Grid>
        {/* <Grid item xs={4} md={4} lg={4}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Driver Trip Summary</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 1 }} content={false}>
            <OrdersTable item={dashboardData.driverTrips} />
          </MainCard>
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Trip Overview</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <Box sx={{ p: 3, pb: 0 }}>
              <Stack spacing={2}>
                <Typography variant="h6" color="textSecondary">
                  Driver VS Trips
                </Typography>
              </Stack>
            </Box>
            <MonthlyBarChart item={dashboardData.driverTrips} type="trips" />
          </MainCard>
        </Grid> */}
        {/* <Grid item xs={12} md={5} lg={4}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Distance Overview</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <Box sx={{ p: 3, pb: 0 }}>
              <Stack spacing={2}>
                <Typography variant="h6" color="textSecondary">
                  Driver VS Distance
                </Typography>
              </Stack>
            </Box>
            <MonthlyBarChart item={dashboardData.driverTrips} type="distance" />
          </MainCard>
        </Grid> */}
        <Grid item xs={12} md={6} lg={8}>
          <MainCard sx={{ mt: 2 }} content={false}>
            <AppWebsiteVisits
              title="PF Regular VS Premium Cost Trend"
              subheader=""
              test={dashboardData.pfDaySummary}
              chartData={[
                {
                  name: "Regular Cost",
                  type: "line",
                  fill: "solid",
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                  color: "rgba(3, 169, 244, 0.85)",
                },
                {
                  name: "Premium Cost",
                  type: "area",
                  fill: "gradient",
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                  color: "rgb(255, 193, 7)",
                },
                {
                  name: "Cost Impact",
                  type: "column",
                  fill: "gradient",
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                  color: "rgb(32, 101, 209)",
                },
              ]}
            />
          </MainCard>
        </Grid>
        <Grid item xs={4} md={4} lg={4}>
          <MainCard sx={{ mt: 1 }} content={false}>
            <AppCurrentVisits
              title="Cost Impact By Mode"
              chartColors={["rgb(255, 193, 7)", "rgb(24, 144, 255)"]}
              item={dashboardData.pfModeSummary}
            />
          </MainCard>
        </Grid>
        <Grid item xs={8} md={6} lg={7}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Cost Impact By Type</Typography>
            </Grid>
          </Grid>
          <MainCard title={"Net Impact"} sx={{ mt: 1.75 }}>
            <Stack spacing={1.5} sx={{ mb: -12 }}>
              {/* <Typography variant="h6">Net Impact</Typography> */}
              {/* <Typography variant="h4">$1560</Typography> */}
            </Stack>
            <SalesColumnChart item={dashboardData.pfTypeSummary} />
          </MainCard>
        </Grid>
        <Grid item xs={5} md={5} lg={5}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Count By Type</Typography>
            </Grid>
          </Grid>
          <MainCard title={"Count"} sx={{ mt: 2 }}>
            <PfCountChart item={dashboardData.pfTypeSummary} />
          </MainCard>
        </Grid>
        {/* <Grid item xs={6} md={6} lg={6}>
          <MainCard title={"Count"} sx={{ mt: 2 }}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              itemTrip={dashboardData.tripDaySummary}
              itemPlan={dashboardData.planDaySummary}
            />
          </MainCard>
        </Grid> */}
      </Grid>
    </div>
  );
};

export default DashboardDefault;
