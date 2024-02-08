import "./App.css";

import { Route, Routes, useNavigate } from "react-router-dom";

//Common Pages
import Login from "./pages/Login";
import MainLayout from "./pages/MainLayout";
import Masters from "./pages/Masters";
import Reports from "./pages/Reports";

import PageNotFound from "./components/PageNotFound";

//User Settings
import ChangePassword from "./pages/Profile/ChangePassword";
import Profile from "./pages/Profile/Profile";

//Gate Module
import GateIn from "./pages/GateModule/GateIn";
import GateOut from "./pages/GateModule/GateOut";
import GatePassReport from "./pages/GateModule/GatePassReport";

//Masters
import CorporateMaster from "./pages/Masters/CorporateMaster";
import DriverMaster from "./pages/Masters/DriverMaster";
import MaterialMaster from "./pages/Masters/MaterialMaster";
import PlantMaster from "./pages/Masters/PlantMaster";
import RouteMaster from "./pages/Masters/RouteMaster";
import RouteTransporter from "./pages/Masters/RouteTransporter";
import RouteVendor from "./pages/Masters/RouteVendor";
import SupplierMaster from "./pages/Masters/SupplierMaster";
import TransporterMaster from "./pages/Masters/TransporterMaster";
import VehicleMaster from "./pages/Masters/VehicleMaster";
import VendorMaster from "./pages/Masters/VendorMaster";
import StoreMaster from "./pages/Masters/StoreMaster";
import PriceMaster from "./pages/Masters/PriceMaster";
import LinkUserTransporter from "./pages/Admin/LinkUserTransporter";

//Admin
import LinkMenuPage from "./pages/Admin/LinkMenuPage";
import LinkRoleMenu from "./pages/Admin/LinkRoleMenu";
import LinkRolePage from "./pages/Admin/LinkRolePage";
import LinkStoreCompany from "./pages/Admin/LinkStoreCompany";
import LinkUserCompany from "./pages/Admin/LinkUserCompany";
import ManageMenu from "./pages/Admin/ManageMenu";
import ManagePage from "./pages/Admin/ManagePage";
import ManageRole from "./pages/Admin/ManageRole";
import ManageUser from "./pages/Admin/ManageUser";
import LinkUserVendor from "./pages/Admin/LinkUserVendor";

//Audit
import AppAudit from "./pages/Audit/AppAudit";
import LoginAudit from "./pages/Audit/LoginAudit";

import SecurityDashboard from "./pages/SecurityDashboard";

//Planner
import EManagePlan from "./pages/Planner/EManagePlan";
import ManagePlan from "./pages/Planner/ManagePlan";
import PlannerDashboard from "./pages/Planner/PlannerDashboard";
import PlannerReport from "./pages/Planner/PlannerReport";
import VendorDispatchReport from "./pages/Planner/VendorDispatchReport";

//Premium
import EPremium from "./pages/PremiumFrieght/EPremium";
import PremiumFreightAddPlanner from "./pages/PremiumFrieght/PremiumFreightAddPlanner";
import PremiumFreightLevel1Approval from "./pages/PremiumFrieght/PremiumFreightLevel1Approval";
import PremiumFreightLevel2Approval from "./pages/PremiumFrieght/PremiumFreightLevel2Approval";
import PremiumFreightPlanReport from "./pages/PremiumFrieght/PremiumFreightPlanReport";

//Dashboard
import FHDashboard from "./pages/Dashboards/FHDashboard";
import PHDashboard from "./pages/Dashboards/PHDashboard";
import PremiumDashboard from "./pages/Dashboards/PremiumDashboard";
import TransporterDashboard from "./pages/Dashboards/TransporterDashboard";

//Vendor
import DispatchDetails from "./pages/VendorModule/DispatchDetails";
import DispatchReport from "./pages/VendorModule/DispatchReport";
//import VendorDashboard from "./pages/VendorModule/VendorDashboard";
import VendorMaterial from "./pages/Masters/VendorMaterial";

//Transporter
import ManageInvoice from "./pages/TransporterModule/ManageInvoice";
import EGenerateInvoice from "./pages/TransporterModule/EGenerateInvoice";
import EGenerateDebitNote from "./pages/TransporterModule/EGenerateDebitNote";
import InvoiceLevel1Approval from "./pages/TransporterModule/InvoiceLevel1Approval";
import InvoiceLevel2Approval from "./pages/TransporterModule/InvoiceLevel2Approval";
import InvoiceLevel3Approval from "./pages/TransporterModule/InvoiceLevel3Approval";

import React from "react";
import { useCookies } from "react-cookie";

import TripReport from "./pages/Trips/TripReport";
import VehiclesOnTrip from "./pages/Trips/VehiclesOnTrip";

import SupplierUndispatched from "./pages/Planner/SupplierUndispatched";
import LiveVision from "./pages/Tracking/LiveVision";
import SupplierDashboard from "./pages/VendorModule/SupplierDashboard";
import PlanSummary from "./pages/Planner/PlanSummary";
import DashboardDefault from "./pages/PlannerDashboard";
import GenerateInvoice from "./pages/TransporterModule/GenerateInvoice";
import InvoiceReport from "./pages/Reports/InvoiceReport";
import GenerateDebitNote from "./pages/TransporterModule/GenerateDebitNote";
import ManageDebitNote from "./pages/TransporterModule/ManageDebitNote";
import DebitNoteLevel1Approval from "./pages/TransporterModule/DebitNoteLevel1Approval";
import DebitNoteLevel2Approval from "./pages/TransporterModule/DebitNoteLevel2Approval";
import DebitNoteReport from "./pages/TransporterModule/DebitNoteReport";
import Launch from "./pages/Launch";
import VehicleActivity from "./pages/TransporterModule/VehicleActivity";
import VehicleHistoryTrack from "./pages/TransporterModule/VehicleHistoryTrack";
import InvoiceView from "./pages/TransporterModule/InvoiceView";
import ViewAttachedDoc from "./pages/TransporterModule/ViewAttachedDoc";

import { PlantProvider } from "./utils/context";
import HelpDoc from "./pages/Help/HelpDoc";

function App() {
  const [cookies, setCookie] = useCookies(["user"]);
  const navigate = useNavigate();

  return (
    //<PrinterPaper/>
    // <GatePassReport />
    // <PremiumFreightPlanList />
    //<SecurityDashboard/>
    //<GatePassPrint/>
    // <Planner/>
    // <HelpDoc />
    //<Login/>
    <PlantProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="MainLayout" element={<MainLayout />}>
            <Route path="Logout" element={<Login />} />
            <Route path="SecurityDashboard" element={<SecurityDashboard />} />
            <Route path="GateIn" element={<GateIn />} />
            <Route path="GateOut" element={<GateOut />} />
            <Route path="Masters" element={<Masters />} />
            <Route path="PFDashboard" element={<PremiumDashboard />} />
            <Route path="FHDashboard" element={<FHDashboard />} />
            <Route path="PHDashboard" element={<PHDashboard />} />
            <Route path="CorporateMaster" element={<CorporateMaster />} />
            <Route path="PlantMaster" element={<PlantMaster />} />
            <Route path="TransporterMaster" element={<TransporterMaster />} />
            <Route path="SupplierMaster" element={<SupplierMaster />} />
            <Route path="DriverMaster" element={<DriverMaster />} />
            <Route path="VehicleMaster" element={<VehicleMaster />} />
            <Route path="RouteMaster" element={<RouteMaster />} />
            <Route path="MaterialMaster" element={<MaterialMaster />} />
            <Route path="StoreMaster" element={<StoreMaster />} />
            <Route path="VendorMaster" element={<VendorMaster />} />
            <Route path="LinkRouteTransporter" element={<RouteTransporter />} />
            <Route path="LinkRouteVendor" element={<RouteVendor />} />
            <Route path="Reports" element={<Reports />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="ChangePassword" element={<ChangePassword />} />
            <Route path="GatePassReport" element={<GatePassReport />} />
            <Route path="ManageUser" element={<ManageUser />} />
            <Route path="ManageRole" element={<ManageRole />} />
            <Route path="ManageMenu" element={<ManageMenu />} />
            <Route path="ManagePage" element={<ManagePage />} />
            <Route path="LinkMenuPage" element={<LinkMenuPage />} />
            <Route path="LinkRoleMenu" element={<LinkRoleMenu />} />
            <Route path="LinkRolePage" element={<LinkRolePage />} />
            <Route path="LinkUserCompany" element={<LinkUserCompany />} />
            <Route path="LinkStoreCompany" element={<LinkStoreCompany />} />
            <Route path="LinkUserVendor" element={<LinkUserVendor />} />
            <Route
              path="LinkUserTransporter"
              element={<LinkUserTransporter />}
            />
            <Route path="PriceMaster" element={<PriceMaster />} />

            <Route path="ManagePlan" element={<ManagePlan />} />
            <Route path="EManagePlan" element={<EManagePlan />} />
            <Route path="EGenerateInvoice" element={<EGenerateInvoice />} />
            <Route path="EGenerateDebitNote" element={<EGenerateDebitNote />} />

            <Route path="PlannerReport" element={<PlannerReport />} />
            <Route path="PlannerDashboard" element={<DashboardDefault />} />
            <Route
              path="VendorDispatchReport"
              element={<VendorDispatchReport />}
            />
            <Route
              path="SupplierUndispatched"
              element={<SupplierUndispatched />}
            />
            <Route
              path="PremiumFreightReport"
              element={<PremiumFreightPlanReport />}
            />
            <Route path="EPremium" element={<EPremium />} />
            <Route
              path="ManagePremiumFreight"
              element={<PremiumFreightAddPlanner />}
            />

            <Route path="PlanSummary" element={<PlanSummary />} />
            <Route path="PFLevel2" element={<PremiumFreightLevel2Approval />} />
            <Route path="PFLevel1" element={<PremiumFreightLevel1Approval />} />
            <Route path="AppAudit" element={<AppAudit />} />
            <Route path="LoginAudit" element={<LoginAudit />} />
            <Route path="GatePassReport" element={<GatePassReport />} />
            <Route path="MaterialDispatchReport" element={<DispatchReport />} />
            <Route path="AddDisptachDetails" element={<DispatchDetails />} />
            <Route path="VendorDashboard" element={<SupplierDashboard />} />
            <Route
              path="TransporterDashboard"
              element={<TransporterDashboard />}
            />
            <Route path="GenerateInvoice" element={<GenerateInvoice />} />
            <Route path="ManageInvoice" element={<ManageInvoice />} />
            <Route path="GenerateDebitNote" element={<GenerateDebitNote />} />
            <Route path="LinkVendorMaterial" element={<VendorMaterial />} />
            <Route path="VehiclesOnTrip" element={<VehiclesOnTrip />} />
            <Route path="TripReport" element={<TripReport />} />
            <Route path="ManageDebitNote" element={<ManageDebitNote />} />
            <Route
              path="InvoiceLevel1Approval"
              element={<InvoiceLevel1Approval />}
            />
            <Route
              path="InvoiceLevel2Approval"
              element={<InvoiceLevel2Approval />}
            />
            <Route
              path="InvoiceLevel3Approval"
              element={<InvoiceLevel3Approval />}
            />
            <Route
              path="DebitNoteLevel1Approval"
              element={<DebitNoteLevel1Approval />}
            />
            <Route
              path="DebitNoteLevel2Approval"
              element={<DebitNoteLevel2Approval />}
            />
            <Route path="VehicleActivity" element={<VehicleActivity />} />
            <Route
              path="VehicleHistoryTrack"
              element={<VehicleHistoryTrack />}
            />
            <Route path="DebitNoteReport" element={<DebitNoteReport />} />
            <Route path="LiveVision" element={<LiveVision />} />
            <Route path="Launch" element={<Launch />} />
            <Route path="InvoiceReport" element={<InvoiceReport />} />
            <Route path="InvoiceView" element={<InvoiceView />} />
            <Route path="ViewAttachedDoc" element={<ViewAttachedDoc />} />

            <Route element={<PageNotFound />} />
          </Route>
        </Routes>
      </div>
    </PlantProvider>
  );
}

export default App;
