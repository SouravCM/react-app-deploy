import { Box, List, ListItem, Stack, Typography } from "@mui/material";
import React from "react";

function HelpDoc() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>HELP</h1>
      <h2 style={{ marginLeft: "5%" }}>Premium Freight Module (PF)</h2>
      <Box sx={{ marginLeft: "5%" }}>
        <Typography>We have the following users in premium freight.</Typography>
        <ol>
          <li>
            <Typography>PF Create User</Typography>
          </li>
          <li>
            <Typography>PF Level 1 User (Finance Head)</Typography>
          </li>
          <li>
            <Typography>PF Level 2 User (Plant Head)</Typography>
          </li>
        </ol>
      </Box>
      <List style={{ marginLeft: "10%" }}>
        <ListItem>
          <Stack spacing={2}>
            <h2>1. PF Create User</h2>
            <Typography textAlign="justify">
              The user is responsible for creating the Premium Freights in the
              system. <br />
              Once the premium freight is created notification mail will go to
              level 1 user and creator.
            </Typography>
            <Box display="flex" justifyContent="center">
              <img
                src="./Help-page-Pictures/Picture1.png"
                width="80%"
                height="500px"
                alt="dashboard-img"
              />
            </Box>
            <Typography textAlign="justify">
              <b>
                <i>Menu Path: Action - Premium Freight Request </i>
              </b>
              <br />
              Shows the not verified premium freight list and user cab creates
              new premium freight.
              <br />
              System won’t allow you to create new premium freight if any
              unapproved request found in level 1.
            </Typography>
            <Typography textAlign="justify">
              <b>
                <i>Menu Path: Action - Premium Freight Request </i>
              </b>
              <br />
              By using this menu user can see the premium freight created in
              selected time range with status.
            </Typography>
            <Box display="flex" justifyContent="center">
              <img
                src="./Help-page-Pictures/Picture2.png"
                width="80%"
                height="400px"
                alt="dashboard-img"
              />
            </Box>
          </Stack>
        </ListItem>

        <ListItem>
          <Stack spacing={2}>
            <h2>2. PF Level 1 User (Finance Head)</h2>
            <Typography textAlign="justify">
              The user is responsible for Premium Freights leve1 1 verification.
              <br />
              Once the premium freight is approved notification mail will go to
              level 2 user, level 1 user, and creator.
              <br />
              Once the premium freight is rejected notification mail will go to
              level 1 user and creator.
              <br />
              <b>
                <i>Menu Path: Action - Premium Freight List Level 1</i>
              </b>
              <br />
              Shows the level 1 not verified premium freight.
            </Typography>
            <Box display="flex" justifyContent="center">
              <img
                src="./Help-page-Pictures/Picture3.png"
                width="100%"
                height="400px"
                alt="dashboard-img"
              />
            </Box>
            <Typography textAlign="justify">
              <b>
                <i>Menu Path: Action - Premium Freight Request </i>
              </b>
              <br />
              By using this menu user can see the premium freight created in
              selected time range with status.
            </Typography>
          </Stack>
        </ListItem>

        <ListItem>
          <Stack spacing={2}>
            <h2>3. PF Level 2 User (Plant Head)</h2>
            <Typography textAlign="justify">
              The user is responsible for Premium Freights leve1 1 2
              verification.
              <br />
              Once the premium freight is approved notification mail will go to
              level 2 user, level 1 user, and creator.
              <br />
              Once the premium freight is rejected notification mail will go to
              level 2 user, level 1 user and creator.
              <br />
              <b>
                <i>Menu Path: Action - Premium Freight List Level 2</i>
              </b>
              <br />
              Shows the level 2 not verified premium freight.
            </Typography>
            <Box display="flex" justifyContent="center">
              <img
                src="./Help-page-Pictures/Picture4.png"
                width="100%"
                height="400px"
                alt="dashboard-img"
              />
            </Box>
            <Typography textAlign="justify">
              <b>
                <i>Menu Path: Action - Premium Freight Request </i>
              </b>
              <br />
              By using this menu user can see the premium freight created in
              selected time range with status.
            </Typography>
          </Stack>
        </ListItem>
      </List>
      <h2 style={{ marginLeft: "5%" }}>Plan Module</h2>
      <Typography textAlign="justify" sx={{ marginLeft: "7%" }}>
        <b>
          <i>TO CREATE PLAN - following data required</i>
        </b>
        <br />
        <br />
        <b>
          <i>Menu Path: Masters - Supplier Master</i>
        </b>
        <br />
        Add the needed supplier details in supplier master
        <br />
        <b>
          <i>Menu Path: Masters - Route Master</i>
        </b>
        <br />
        Add the needed route details like route name ,source and destination in
        route master
        <br />
        <b>
          <i>Menu Path: Masters - Material Master</i>
        </b>
        <br />
        Add the needed material details like route name ,source and destination
        in Material master.
        <br />
        <b>
          <i>Menu Path: Admin - Link Route Supplier</i>
        </b>
        <br />
        Link the route with the required suppliers
        <br />
        <b>
          <i>Menu Path: Admin - Link Supplier Material</i>
        </b>
        <br />
        Link the supplier with the list of materials that supplier are providing
        <br />
        <br />
        <b>
          <i>TO ASSIGN VEHICLE TO PLAN - following data required</i>
        </b>
        <br />
        <br />
        <b>
          <i>Menu Path: Masters - Transporter Master</i>
        </b>
        <br />
        Add the needed transporter details in transporter master <br />
        <b>
          <i>Menu Path: Masters - Vehicle Master</i>
        </b>
        <br />
        Add the needed vehicle details in vehicle master
        <br />
        <b>
          <i>Menu Path: Masters - Driver Master</i>
        </b>
        <br />
        Add the needed Driver details in driver master.
        <br />
        <b>
          <i>Menu Path: Admin - Link Route Transporter</i>
        </b>
        <br />
        Link the Route with the list of transporter that are present in that
        route <br />
      </Typography>
      <List style={{ marginLeft: "10%" }}>
        <ListItem>
          <Stack spacing={2}>
            <h2>Plan Related Screen:</h2>
            <Typography textAlign="justify">
              <b>
                <i>Menu Path: Plan - Create Plan</i>
              </b>
            </Typography>
            <Box display="flex" justifyContent="center">
              <img
                src="./Help-page-Pictures/Picture5.png"
                width="80%"
                height="500px"
                alt="dashboard-img"
              />
            </Box>
            <Typography textAlign="justify">
              • Select required route from route list and the linked suppliers
              to the selected route are displayed in the ‘Supplier list’. Select
              any one of the supplier. The material list linked to that supplier
              is displayed.
              <br />
              • Enter the required quantity for the material. Repeat the same
              for adding other supplier materials.
              <br />• Once all the required materials added , click ‘create
              plan’ and plan will be created successfully.
            </Typography>
            <Typography textAlign="justify">
              <b>
                <i>Menu Path: Plan - Plan Summary </i>
              </b>
            </Typography>
            <Box display="flex" justifyContent="center">
              <img
                src="./Help-page-Pictures/Picture6.png"
                width="80%"
                height="400px"
                alt="dashboard-img"
              />
            </Box>
            <Typography textAlign="justify">
              • Once the plan is created, It will be displayed in Plan summary
              page.
              <br /> <br />• <b>Edit Plan: </b> In Plan Summary page, under
              actions column, user can click on edit sign. User will be
              navigated to plan edit page, here user can delete the material
              from the plan , can increase or reduce the required quantity.
              <br />• <b>Assign GPS vehicle:</b> In Plan Summary page, under
              actions column, user can click on vehicle sign. User will be able
              to assign the vehicle here. Select the required transporter and
              vehicle linked to that transporter will be displayed in dropdown.
              Select the needed vehicle for the trip and provide driver name and
              number and click assign. Once vehicle is assigned its updated in
              plan summary page.
              <br /> <b>• Assign market vehicle:</b> In Plan Summary page, under
              actions column, user can click on vehicle sign. User will be able
              to assign the vehicle here. Select the required transporter and
              change the toggle to the market vehicle. If you have the
              information on the vehicle and driver then enter the details and
              click assign. Once user comes to know the vehicle and driver
              details, user can update the details to the plan.
              <br /> • User can also check the vehicle utilization percentage,
              which can increase the efficiency of planning and trips.
            </Typography>
          </Stack>
        </ListItem>

        <ListItem>
          <Stack spacing={2}>
            <Typography textAlign="justify">
              <b>
                <li>Menu Path: Plan -Trip Summary </li>
              </b>
              <br />
              <b>
                • User can refer the trip details in this page like planner
                details, route details and vehicle details.
              </b>
              <br />
              <b>• User can also check the trip start time and end time.</b>
              <br />
              <b>
                • All the trip information will be displayed in trip summary
                report.
              </b>
            </Typography>
          </Stack>
        </ListItem>
        <ListItem>
          <Stack spacing={2}>
            <Typography textAlign="justify">
              <b>
                <li>Menu Path: Tracking - Livevision </li>
              </b>
              <br />
              <b>
                • In Live vision page, user can see the vehicle information and
                its location.
              </b>
              <br />
              <b>
                • At the top of the page, User can see running, idle and stopped
                vehicles. He can also see communicating, non communicating and
                ontrip vehicle.
                <br /> For the Ontrip vehicle, when selected, user can observe
                the vehicle trip information on the left panel.
              </b>
            </Typography>
          </Stack>
        </ListItem>

        <ListItem>
          <Stack spacing={2}>
            <Typography textAlign="justify">
              <b>
                <i>Menu Path: Reports- Planner report</i>
              </b>
              <br />• User can go through all the previously created plans and
              it shows plan number and by clicking it we can see the materials
              and supplier details.
            </Typography>
            <Box display="flex" justifyContent="center">
              <img
                src="./Help-page-Pictures/Picture7.png"
                width="100%"
                height="400px"
                alt="dashboard-img"
              />
            </Box>
            <Typography textAlign="justify">
              <b>
                <i>
                  When user clicks on the plan, they can see its supplier and
                  materials details.
                </i>
              </b>
            </Typography>
            <Box display="flex" justifyContent="center">
              <img
                src="./Help-page-Pictures/Picture8.png"
                width="100%"
                height="400px"
                alt="dashboard-img"
              />
            </Box>
          </Stack>
        </ListItem>
        <ListItem>
          <Stack spacing={2}>
            <Typography textAlign="justify">
              <b>
                <li>Menu Path: Reports - Trip report </li>
              </b>
              <br />
              <b>
                • User can see the trip information here. User can see vehicle
                details, plan details and route details.
              </b>
            </Typography>
            <Box display="flex" justifyContent="center">
              <img
                src="./Help-page-Pictures/Picture9.png"
                width="100%"
                height="400px"
                alt="dashboard-img"
              />
            </Box>
          </Stack>
        </ListItem>
        <ListItem>
          <Stack spacing={2}>
            <Typography textAlign="justify">
              <b>
                <li>Menu Path: Reports - Supplier Dispatch Report </li>
              </b>
              <br />
              <b>
                • User can see the dispatch quantity and remarks provided by the
                supplier.
              </b>
            </Typography>
            <Box display="flex" justifyContent="center">
              <img
                src="./Help-page-Pictures/Picture10.png"
                width="100%"
                height="400px"
                alt="dashboard-img"
              />
            </Box>
          </Stack>
        </ListItem>
        <ListItem>
          <Stack spacing={2}>
            <Typography textAlign="justify">
              <b>
                <li>Menu Path: Reports - Material Dispatch Report </li>
              </b>
              <br />
            </Typography>
            <Box display="flex" justifyContent="center">
              <img
                src="./Help-page-Pictures/Picture11.png"
                width="100%"
                height="400px"
                alt="dashboard-img"
              />
            </Box>
          </Stack>
        </ListItem>
        <ListItem>
          <Stack spacing={2}>
            <Typography textAlign="justify">
              <b>
                <li>Menu Path: Reports - Premium freight Report </li>
              </b>
              <br />
              <b>• User can see the Premium freight requests created</b>
            </Typography>
            <Box display="flex" justifyContent="center">
              <img
                src="./Help-page-Pictures/Picture12.png"
                width="100%"
                height="400px"
                alt="dashboard-img"
              />
            </Box>
          </Stack>
        </ListItem>
      </List>
    </div>
  );
}

export default HelpDoc;
