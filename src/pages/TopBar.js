import React, { useEffect, useState } from "react";
//import AppBar from "@mui/material/AppBar";

import Button from "@mui/material/Button";

import MenuIcon from "@mui/icons-material/Menu";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
//import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
//import AdbIcon from "@mui/icons-material/Adb";
import { Link, useNavigate } from "react-router-dom";
import raneLogo from "../ranelogo.png";
import avatarLogo from "../avatar_18.jpg";

import AuthServices from "../services/AuthServices";
//import LocalStorageService from "../services/LocalStorageService";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import SummarizeIcon from "@mui/icons-material/Summarize";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import WebIcon from "@mui/icons-material/Web";
import MuiAppBar from "@mui/material/AppBar";
import Collapse from "@mui/material/Collapse";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import HelpIcon from "@mui/icons-material/Help";
import { styled, useTheme } from "@mui/material/styles";

import { usePlantContext } from "../utils/context";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

//const pages = ["Dashboard", "Masters", "Reports"];
const settings = ["Profile", "ChangePassword"];
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const TopBar = () => {
  const { plantInfo } = usePlantContext();
  const { updatePlantInfo } = usePlantContext();

  const [plantList, setPlantList] = useState([]);
  const [childAvailable, setChildAvailable] = useState(false);

  const [defaultPlant, setDefaultPlant] = useState({});
  const [autoDefaultPlant, setAutoDefualtPlant] = useState({});
  const defaultProps = {
    options: plantList,
    getOptionLabel: (option) => option.plantName,
  };

  let navigate = useNavigate();
  const [userMenu, setUserMenu] = useState([]);
  const [userName, setUserName] = useState();
  const [dashboardPath, setDashboardPath] = useState();

  const [isCorporate, setIsCorporate] = useState(false);

  const drawerWidth = 240;

  useEffect(() => {
    // closeNav();
    let userData = AuthServices.getUserDetails();
    setUserName(userData.name);
    // console.log("User Dashboard=>" + userData.role.dashboardPagePath);
    setDashboardPath(userData.role.dashboardPagePath);
    //navigate(userData.role.dashboardPagePath);

    async function getCompanyOfUser(id) {
      let userPlant = AuthServices.getSelectedPlant();
      // console.log("userPlant - " + JSON.stringify(userPlant));

      if (Object.keys(userPlant).length === 0) {
        setIsCorporate(false);
      } else {
        setIsCorporate(true);
        setPlantList(userPlant);
        setDefaultPlant({
          plantName: userPlant.plantName,
        });
      }

      // console.log("Company Id=>", id);
      //   let companyData = await AuthServices.getUserCompany(id);
      // console.log("Company Date=>", JSON.stringify(companyData));
      // if (companyData.code === 200) {
      //   // console.log(
      //   //   "Number of Companies available=>" + companyData.responseBody.length
      //   // );

      //   // console.log("Company Info:" + JSON.stringify(companyData.responseBody));

      //   // console.log(
      //   //   "User COmpany id:======>" +
      //   //     JSON.stringify(companyData.responseBody[0].userCompany.company.id)
      //   // );
      //   AuthServices.handleCompany(companyData.responseBody);

      //   let plantList = await AuthServices.getPlantList(
      //     companyData.responseBody[0].userCompany.company.id
      //   );

      //   // console.log("Plants List:==>" + JSON.stringify(plantList));

      //   if (plantList.code === 200) {
      //     let plantListItems = plantList.responseBody;
      //     // console.log("Plant List Body:=>" + plantListItems.length);

      //     if (plantListItems.length === 0) {
      //       setChildAvailable(false);
      //       // console.log(
      //       //   "Plant Id:" +
      //       //     companyData.responseBody[0].userCompany.company.id +
      //       //     "Plant Code:" +
      //       //     companyData.responseBody[0].userCompany.company.code +
      //       //     "Plant Name:" +
      //       //     companyData.responseBody[0].userCompany.company.name
      //       // );
      //       setPlantList([
      //         {
      //           plantName: companyData.responseBody[0].userCompany.company.name,
      //           plantCode: companyData.responseBody[0].userCompany.company.code,
      //           plantId: companyData.responseBody[0].userCompany.company.id,
      //         },
      //       ]);
      //       //console.log("Selected===>"+setPlantList[0]);
      //       //Setting to TextField by default
      //       setDefaultPlant({
      //         plantName: companyData.responseBody[0].userCompany.company.name,
      //       });
      //       //Setting into Cookies
      //       // AuthServices.savePlantInfo({
      //       //   plantName: companyData.responseBody[0].userCompany.company.name,
      //       //   plantCode: companyData.responseBody[0].userCompany.company.code,
      //       //   plantId: companyData.responseBody[0].userCompany.company.id,
      //       // });
      //       //setDefaultPlant({ plantName: companyData.responseBody[0].userCompany.company.name, plantCode: companyData.responseBody[0].userCompany.company.code,plantId: companyData.responseBody[0].userCompany.company.id });
      //       //set to cookies plant information.
      //       // console.log(
      //       //   "Saved Plant Details" +
      //       //     JSON.stringify(AuthServices.getSelectedPlant())
      //       // );
      //     } else {
      //       // console.log("Child Plant is available.");
      //       setChildAvailable(true);
      //       setPlantList([]); //Clear existing list in array

      //       var name, id, code;
      //       plantListItems.map((plant, index) => {
      //         // console.log("Index:" + index + "Name:" + plant.name);
      //         //set first as default

      //         if (index === 0) {
      //           name = plant.name;
      //           id = plant.id;
      //           code = plant.code;
      //         }

      //         // console.log(
      //         //   "PlantId:" +
      //         //     plant.id +
      //         //     "Plant Code:" +
      //         //     plant.code +
      //         //     "Plant Name:" +
      //         //     plant.name
      //         // );
      //         setPlantList((prevState) => [
      //           ...prevState,
      //           {
      //             plantName: plant.name,
      //             plantCode: plant.code,
      //             plantId: plant.id,
      //           },
      //         ]);
      //       });

      //       //Select one item
      //       // console.log("First Nameidcode=>" + name + ":" + id + ":" + code);

      //       setDefaultPlant({
      //         plantName: name,
      //         plantCode: code,
      //         plantId: id,
      //       });
      //       //Setting into Cookies
      //       // AuthServices.savePlantInfo({
      //       //   plantName: name,
      //       //   plantCode: code,
      //       //   plantId: id,
      //       // });
      //       //setDefaultPlant({ plantName: companyData.responseBody[0].userCompany.company.name, plantCode: companyData.responseBody[0].userCompany.company.code,plantId: companyData.responseBody[0].userCompany.company.id });
      //       //set to cookies plant information.
      //       // console.log(
      //       //   "Saved Plant Details" +
      //       //     JSON.stringify(AuthServices.getSelectedPlant())
      //       // );
      //     }
      //   } else {
      //     console.log("Something went wrong");
      //   }
      // } else {
      //   alert("Something went wrong, relogin");
      // }
    }

    getCompanyOfUser(userData.id);

    let userMenuData = AuthServices.getUserMenuDetails();
    setUserMenu(userMenuData);
    //console.log("User Menu Details" + JSON.stringify(userMenuData));
    // console.log("Default Plant " + JSON.stringify(defaultPlant));
    // if (userData) {
    //   console.log("userData==>", userData);
    // } else {
    //   console.log("User Data not found==>");
    //   //navigate('/login');
    // }
    console.log("notCorporate" + plantInfo.notCorporate);
  }, []);

  const imageStyle = {
    width: "75px",
    height: "50px",
    padding: "2px",
    margin: "2px",
    borderRadius: "10px",
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const logoutFunction = async () => {
    console.log("Clicked Logout Function");
    AuthServices.logout();
    navigate("/");
    console.log("Logout Function called");
  };

  const launchFunction = async () => {
    const newPlantInfo = {
      plantName: "",
      plantCode: "",
      plantId: "",
      notCorporate: false,
      menuList: false,
    };
    updatePlantInfo(newPlantInfo);
    navigate("/MainLayout/Launch");
  };

  const loadDashboard = async () => {
    console.log("Clicked Dashboard" + dashboardPath);
    navigate(dashboardPath);
  };

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [openMenu, setOpenMenu] = useState(null);

  const handleClick = (menu) => {
    if (openMenu === menu) {
      setOpenMenu(null);
    } else {
      setOpenMenu(menu);
    }
  };

  const renderIcon = (iconPath) => {
    switch (iconPath) {
      case "MenuBookIcon":
        return <MenuBookIcon />;
      case "SupervisorAccountIcon":
        return <SupervisorAccountIcon />;
      case "VerifiedUserIcon":
        return <VerifiedUserIcon />;
      case "LocalShippingIcon":
        return <LocalShippingIcon />;
      case "SummarizeIcon":
        return <SummarizeIcon />;
      case "PendingActionsIcon":
        return <PendingActionsIcon />;
      case "LocationOnIcon":
        return <LocationOnIcon />;
      case "BorderColorIcon":
        return <BorderColorIcon />;
      case "HelpIcon":
        return <HelpIcon />;

      default:
        return null;
    }
  };

  const handleListItemClick = (pagePath) => {
    navigate(pagePath);
    handleDrawerClose();
  };
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);

  const [expandedPlant, setExpandedPlant] = useState(null); // Store the selected plant value

  const handlePlantClick = (plant) => {
    setSelectedPlant(plant);
    setOpenDropdown(false);
    if (plant) {
      console.log(
        "Plant Selected code:" +
          plant.plantCode +
          "plant name:" +
          plant.plantName +
          "Plant Id:" +
          plant.plantId
      );
      AuthServices.savePlantInfo({
        plantName: plant.plantName,
        plantCode: plant.plantCode,
        plantId: plant.plantId,
      });
      console.log(
        "Saved Plant Details==>" +
          JSON.stringify(AuthServices.getSelectedPlant())
      );
    }
  };

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {plantInfo && plantInfo.menuList ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          ) : null}
          <img
            src={raneLogo}
            style={imageStyle}
            onClick={loadDashboard}
            alt="Logo"
          />
          <Typography
            variant="h4"
            noWrap
            component="a"
            onClick={loadDashboard}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Roboto",
              fontWeight: 800,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Rane Madras Ltd
          </Typography>

          <Box sx={{ flexGrow: 1 }}></Box>
          {plantInfo && plantInfo.menuList ? (
            <Box sx={{ margin: "0 20px" }}>
              <List>
                <ListItemButton>
                  <ListItemIcon>
                    <WarehouseIcon />
                  </ListItemIcon>
                  <ListItemText primary={plantInfo.plantName} />
                </ListItemButton>
              </List>
            </Box>
          ) : null}
          <Box>
            <Tooltip title="Open">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={userName} src={avatarLogo} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={`/MainLayout/${setting}`}
                    >
                      {" "}
                      {setting}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
              {plantInfo && plantInfo.notCorporate ? (
                <MenuItem key="launch" onClick={launchFunction}>
                  <Typography textAlign="center">
                    <Link style={{ textDecoration: "none", color: "black" }}>
                      {" "}
                      Launch Pad
                    </Link>
                  </Typography>
                </MenuItem>
              ) : null}

              <MenuItem key="logout" onClick={logoutFunction}>
                <Typography textAlign="center">
                  <Link
                    to={"/"}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {" "}
                    Logout
                  </Link>
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            color: "#1976d2",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#1976d2",
            color: "#fff",
            ...theme.mixins.toolbar,
          }}
        >
          <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
            Menu
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider />
        <List>
          <ListItemButton onClick={() => handleListItemClick(dashboardPath)}>
            <ListItemIcon sx={{ minWidth: "auto", marginRight: 3 }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </List>
        <List>
          {userMenu.map((menu) => (
            <React.Fragment key={menu.menu.id}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleClick(menu)}
                  title={menu.menu.description}
                >
                  <ListItemIcon sx={{ minWidth: "auto", marginRight: 3 }}>
                    {menu &&
                      menu.menu.iconPath &&
                      renderIcon(menu.menu.iconPath)}
                  </ListItemIcon>
                  <ListItemText primary={menu.menu.name} />
                  {openMenu === menu ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              {/* Generate sublists for menu pages when menu is selected */}
              <Collapse in={openMenu === menu} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {menu.pages.map((page) => (
                    <ListItem
                      key={page.id}
                      disablePadding
                      sx={{ pl: 2, py: 0 }}
                    >
                      <ListItemButton
                        sx={{ pl: 1 }}
                        onClick={() => handleListItemClick(page.pagePath)}
                        title={page.description}
                      >
                        <ListItemIcon sx={{ minWidth: "auto", marginRight: 2 }}>
                          <WebIcon sx={{ fontSize: 16 }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography
                              variant="body1"
                              sx={{ fontSize: 11, fontWeight: 600, mt: 0.5 }}
                            >
                              {page.displayName}
                            </Typography>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default TopBar;
