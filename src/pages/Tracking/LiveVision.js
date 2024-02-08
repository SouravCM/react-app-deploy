import {
  ArrowBackIosNew,
  ArrowForwardIos,
  SearchSharp,
} from "@mui/icons-material";
import { Box, Button, Grid, IconButton, InputBase, Stack } from "@mui/material";
import GoogleMapReact from "google-map-react";
import React, { useEffect, useState } from "react";
import Vehicle from "./VehicleList";
import LiveVisionServices from "../../services/LiveVisionServices";
import AuthServices from "../../services/AuthServices";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

function LiveVision() {
  const [isHovering, setIsHovering] = useState(false);

  const [boxWidth, setBoxWidth] = useState("25%");
  const [isArrowClicked, setIsArrowClicked] = useState(true);
  const [vehicleLiveVison, setVehicleLiveVison] = useState([]);
  const [gspSummary, setGspSummary] = useState([]);
  const [map, setMap] = useState(null);
  const [maps, setMaps] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    // Make the initial API call here after the Google Map API is loaded
    if (map && maps) {
      LiveVisionList("all", "all");
      getGpsSummary();

      // Set the interval to trigger the API call every 5 minutes
      const intervalId = setInterval(() => {
        LiveVisionList("all", "all");
        getGpsSummary();
      }, 15 * 60 * 1000);

      // Clean up the interval when the component is unmounted or the dependency changes
      return () => clearInterval(intervalId);
    }
  }, [map, maps]);

  useEffect(() => {
    // Call the renderMarkers function whenever vehicleLiveVison, map, or maps change
    if (vehicleLiveVison.length > 0 && map && maps) {
      const markers = renderMarkers(map, maps);
      // Do something with the markers if needed
    }
  }, [vehicleLiveVison, map, maps]);

  const LiveVisionList = async (type, value) => {
    try {
      //  console.log("Type-" + type + " Value-" + value);
      let userCompany = AuthServices.getSelectedPlant();
      let plantId = userCompany.plantId;
      // Make the API call here using fetch or axios
      let listFilter = {};
      if (type === "all") {
        listFilter = {
          companyId: plantId,
        };
      }
      if (type === "status") {
        listFilter = {
          companyId: plantId,
          status: value,
        };
      }
      if (type === "type") {
        listFilter = {
          companyId: plantId,
          type: value,
        };
      }
      if (type === "onTrip") {
        listFilter = {
          companyId: plantId,
          onTrip: "true",
        };
      }

      //  console.log("Hi yo" + JSON.stringify(listFilter));

      const response = await LiveVisionServices.getVehiclesLocation(listFilter);
      //  console.log("LIVE VISION RESPONSE:" + JSON.stringify(response));

      if (response.code === 200) {
        setVehicleLiveVison(response.responseBody);
      }
      // Process the data as needed
    } catch (error) {
      setVehicleLiveVison([]);
      console.error("Error fetching data:", error);
    }
  };

  const getGpsSummary = async () => {
    try {
      // console.log("CALLING LIVE VISION:");
      let userCompany = AuthServices.getSelectedPlant();
      let plantId = userCompany.plantId;
      // Make the API call here using fetch or axios
      const response = await LiveVisionServices.getGSPSummary({
        companyId: plantId,
      });
      // console.log("LIVE VISION Summary:" + JSON.stringify(response));

      if (response.code === 200) {
        setGspSummary(response.responseBody);
      }
      // Process the data as needed
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onGoogleApiLoaded = ({ map, maps }) => {
    setMap(map);
    setMaps(maps);
  };

  const Marker = ({ text }) => (
    <div style={{ width: "20px", height: "20px", backgroundColor: "red" }}>
      {text}
    </div>
  );

  //Setup Map Marker
  const [Markers, setMarker] = useState({
    name: "Current position",
    position: {
      lat: 12.9716,
      lng: 77.5946,
    },
    zoom: 11, // Add zoom level to the state
  });
  const renderMarkers = (map, maps) => {
    // Check if map and maps objects are available
    if (map === null || maps === null) {
      return;
    }

    // Remove old markers
    markers.forEach((marker) => marker.setMap(null));

    // Add new markers
    const newMarkers = vehicleLiveVison.map((location) => {
      if (location.latitude !== 0 && location.longitude !== 0) {
        let iconUrl;
        if (location.category === "RUNNING") {
          iconUrl =
            "https://telematics4u.in/ApplicationImages/LivevisionVehicleImages/Aggregate_BG.png";
        } else if (location.category === "IDLE") {
          iconUrl =
            "https://telematics4u.in/ApplicationImages/LivevisionVehicleImages/Aggregate_BL.png";
        } else if (location.category === "STOPPAGE") {
          iconUrl =
            "https://telematics4u.in/ApplicationImages/LivevisionVehicleImages/Aggregate_BR.png";
        } else {
          iconUrl =
            "https://telematics4u.in/ApplicationImages/LivevisionVehicleImages/Aggregate_BG.png";
        }
        const marker = new maps.Marker({
          position: {
            lat: location.latitude,
            lng: location.longitude,
          },
          icon: {
            url: iconUrl,
            scaledSize: new maps.Size(20, 40),
            rotation: location.direction,
          },
          draggable: false,
          map,
          title: location.vehicle.registrationNo,
        });
        return marker;
      }
      return null; // Ignore markers with lat=0 and lng=0
    });

    // Update the markers state variable with new markers
    setMarkers(newMarkers.filter((marker) => marker !== null));
  };

  const gridProps = {
    border: "1px solid lightgrey",
    padding: "2px",
    borderRadius: "5px",
  };

  const buttonProps = {
    textTransform: "capitalize",
    justifyContent: "left",
  };

  const hiddenButtonProps = {
    textTransform: "capitalize",
    justifyContent: "left",
    display: isHovering ? "flex" : "none",
  };

  const arrowButtonProps = {
    color: "black",
    backgroundColor: "white",
    marginLeft: "-10px",
    padding: "1px",
    height: "50px",
  };

  return (
    <div style={{ position: "relative", paddingTop: "9px" }}>
      <Stack
        zIndex="10"
        position="absolute"
        width="96%"
        backgroundColor="white"
        direction="row"
        mr={10}
        mb={2}
        style={gridProps}
        onMouseEnter={() => setIsHovering(false)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Stack width="100%" borderRight="1px solid grey" ml="1%">
          <Stack direction="row" ml={0} spacing="6%">
            {/* <Stack width="50%"> */}
            <Button
              style={buttonProps}
              onClick={() => LiveVisionList("all", "all")}
            >
              {gspSummary.all} All
            </Button>
            <Button
              style={buttonProps}
              onClick={() => LiveVisionList("status", "RUNNING")}
            >
              {gspSummary.running} Running
            </Button>
            <Button
              style={buttonProps}
              onClick={() => LiveVisionList("status", "IDLE")}
            >
              {gspSummary.idle} Idle
            </Button>
            <Button
              style={buttonProps}
              onClick={() => LiveVisionList("status", "STOPPAGE")}
            >
              {gspSummary.stoppage} Stoppage
            </Button>
            <Button
              style={buttonProps}
              onClick={() => LiveVisionList("status", "NOGPS")}
            >
              {gspSummary.nogps} No GPS
            </Button>
            <Button
              style={buttonProps}
              onClick={() => LiveVisionList("type", "COMMUNICATING")}
            >
              {gspSummary.communicating} Communicating
            </Button>
            <Button
              style={buttonProps}
              onClick={() => LiveVisionList("type", "NONCOMMUNICATING")}
            >
              {gspSummary.nonCommunicating} Non Communicating
            </Button>
            <Button
              style={buttonProps}
              onClick={() => LiveVisionList("onTrip", "true")}
            >
              {gspSummary.onTrip} On Trip
            </Button>
          </Stack>
        </Stack>
      </Stack>

      <Stack direction="row" zIndex="9" position="absolute" mr={20}>
        <Box
          zIndex="9"
          mt={5.5}
          position="relative"
          width="45vh"
          height="75vh"
          borderRadius="5px"
          backgroundColor="white"
        >
          <Stack
            direction="row"
            px={1}
            spacing={1}
            backgroundColor="white"
            mb={1}
            border="1px solid lightgrey"
            style={{ display: isArrowClicked ? "flex" : "none" }}
          >
            <SearchSharp
              style={{
                margin: "5px 0 5px 0",
                color: "grey",
              }}
            />
            <InputBase placeholder="Search vehicles / groups"></InputBase>
            <Button
              variant="outlined"
              style={{
                position: "absolute",
                right: "2px",
                color: "grey",
                padding: "2px 10px 2px 10px",
                margin: "2px 0 2px 0",
                border: "1px solid lightgrey",
                textTransform: "capitalize",
              }}
            >
              Search
            </Button>
          </Stack>

          <Stack overflow="auto" height="100%" backgroundColor="white">
            <Grid container>
              <Vehicle item={vehicleLiveVison} />
            </Grid>
          </Stack>
        </Box>

        <Box mt="28%">
          <IconButton
            style={{
              display: isArrowClicked ? "none" : "block",
            }}
            onClick={() => {
              setBoxWidth("25%");
              setIsArrowClicked(true);
            }}
          >
            <ArrowForwardIos style={arrowButtonProps} />
          </IconButton>

          <IconButton
            style={{ display: isArrowClicked ? "block" : "none" }}
            onClick={() => {
              setBoxWidth("0%");
              setIsArrowClicked(false);
            }}
          >
            <ArrowBackIosNew style={arrowButtonProps} />
          </IconButton>
        </Box>
      </Stack>

      <div
        style={{
          height: "90vh",
          width: "100%",
          position: "absolute",
        }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAhSZCWlSHEejZ-tNLnC-LqaEP3hmRBRg4" }}
          defaultCenter={{ lat: 12.9716, lng: 77.5946 }}
          defaultZoom={6} // Adjust the zoom level as needed
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={onGoogleApiLoaded}
          // onGoogleApiLoaded={({ map, maps }) => {
          //   renderMarkers(map, maps);
          // }}
        ></GoogleMapReact>
      </div>
    </div>
  );
}

export default LiveVision;
