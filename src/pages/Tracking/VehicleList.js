import {
  FiberManualRecord,
  History,
  Place,
  QueryBuilder,
  RouteSharp,
  Speed,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { Button, Grid, Stack, Typography, styled } from "@mui/material";
import React from "react";
import { Route } from "react-router-dom";
const WhiteTagButton = styled(Button)({
  borderRadius: "15px",
  color: "black",
  backgroundColor: "white",
  border: "1px solid grey",
  textTransform: "capitalize",
  padding: "0px 15px 0px 15px",
});

const GreyTagButton = styled(Button)({
  borderRadius: "15px",
  color: "black",
  backgroundColor: "lightgrey",
  textTransform: "capitalize",
  padding: "0px 15px 0px 15px",
  "&:hover": {
    color: "white",
    backgroundColor: "grey",
  },
});

function VehicleList({ item }) {
  // console.log("Yo data" + JSON.stringify(item));

  return (
    <>
      {item.map((item) => (
        <Grid
          mb={1}
          border="1px solid lightgrey"
          //borderRadius="5px"
          backgroundColor="white"
          width="100%"
          marginLeft="5px"
        >
          <Stack spacing={1} px={1}>
            <Typography
              fontWeight="bold"
              fontSize="15px"
              mt={1}
              display="flex"
              justifyContent="left"
            >
              {item.vehicle.registrationNo}
            </Typography>

            {/* <Stack direction="row" spacing={1}>
              <Typography fontSize="15px">Driver: Not Assigned</Typography>
            </Stack> */}

            {/* <Stack direction="row" spacing={1}>
          <WhiteTagButton>Tag_navneet</WhiteTagButton>
          <WhiteTagButton>Testtagkirit</WhiteTagButton>
          <WhiteTagButton>Ashok</WhiteTagButton>
          <WhiteTagButton>07:10 Pmam Login Vehicle</WhiteTagButton>
        </Stack> */}
            <Tooltip title={item.odometer}>
              <Stack direction="row" spacing={1}>
                <Speed fontSize="small" />
                <Typography noWrap>Odo: {item.odometer}</Typography>
              </Stack>
            </Tooltip>
            <Tooltip title={item.speed}>
              <Stack direction="row" spacing={1}>
                <QueryBuilder fontSize="small" />

                <Typography noWrap> Speed: {item.speed} km/h</Typography>
              </Stack>
            </Tooltip>
            <Tooltip title={item.lastCommunicatedOn}>
              <Stack direction="row" spacing={1}>
                <History fontSize="small" />
                <Typography noWrap>
                  Last Com: {item.lastCommunicatedOn}
                </Typography>
              </Stack>
            </Tooltip>

            {item.trip !== null && (
              <Tooltip title={item.trip.tripNo}>
                <Stack direction="row" spacing={1}>
                  <History fontSize="small" />
                  <Typography noWrap>Trip No: {item.trip.tripNo}</Typography>
                </Stack>
              </Tooltip>
            )}
            {item.trip !== null && (
              <Tooltip title={item.trip.driverName}>
                <Stack direction="row" spacing={1}>
                  <History fontSize="small" />
                  <Typography noWrap>
                    Driver Name: {item.trip.driverName}
                  </Typography>
                </Stack>
              </Tooltip>
            )}
            {/* {item.trip !== null && (
              <Tooltip title={item.trip.driverMobile}>
                <Stack direction="row" spacing={1}>
                  <History fontSize="small" />
                  <Typography noWrap>
                    Driver Mobile No: {item.trip.driverMobile}
                  </Typography>
                </Stack>
              </Tooltip>
            )} */}
            {/* {item.trip !== null && (
              <Tooltip title={item.trip.route.source.name}>
                <Stack direction="row" spacing={1} alignItems="left">
                  <History fontSize="small" />
                  <Typography noWrap>
                    Source: {item.trip.route.source.name}
                  </Typography>
                </Stack>
              </Tooltip>
            )} */}
            {/* {item.trip !== null && (
              <Tooltip title={item.trip.route.destination.name}>
                <Stack direction="row" spacing={1} alignItems="left">
                  <History fontSize="small" />
                  <Typography noWrap>
                    Destination: {item.trip.route.destination.name}
                  </Typography>
                </Stack>
              </Tooltip>
            )} */}
            <Tooltip title={item.location}>
              <Stack direction="row" spacing={1} alignItems="left">
                <Place fontSize="small" />
                <Typography noWrap>{item.location}</Typography>
              </Stack>
            </Tooltip>
            {/* <Stack direction="row" spacing={1}>
              <RouteSharp fontSize="small" />
              <Typography fontSize="15px">No Trip</Typography>
            </Stack> */}
          </Stack>
        </Grid>
      ))}
    </>
  );
}

export default VehicleList;
