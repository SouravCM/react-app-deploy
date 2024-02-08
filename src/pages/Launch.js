import React, { useEffect, useState } from "react";

import {
  GridCsvExportMenuItem,
  GridToolbarContainer,
  GridToolbarExportContainer,
} from "@mui/x-data-grid";
import {
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid-pro";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import authService from "../services/AuthServices";
import { Avatar, Grid, Paper } from "@mui/material";

import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { useNavigate } from "react-router-dom";

import { usePlantContext } from "../utils/context";
import avatarLogo from "../avatar_18.jpg";

const ItemStyle = {
  padding: "4px",
  margin: "4px",
};

const containerStyle = {
  padding: "4px",
  height: "auto",
  margin: "auto",
  backgroundColor: "#F1F9FD",
};

const Launch = () => {
  const columns = [
    {
      field: "avathar",
      headerName: "Logo",
      align: "center",
      headerAlign: "center",
      flex: 0.5,
      width: "auto",
      headerClassName: "super-app-theme--header",
      renderCell: (params) => <Avatar src={avatarLogo} />,
      sortable: false,
      filterable: false,
    },
    {
      field: "code",
      headerName: "Code",
      align: "center",
      headerAlign: "center",
      flex: 0.5,
      width: "auto",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "plant",
      headerName: "Plant",
      align: "center",
      headerAlign: "center",
      flex: 2,
      width: "auto",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "contact",
      headerName: "Contact",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
    },

    {
      field: "address",
      headerName: "Address",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Launch",
      align: "center",
      headerAlign: "center",
      flex: 0.5,
      width: "auto",
      headerClassName: "super-app-theme--header",
      cellClassName: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<RocketLaunchIcon />}
          label="Launch"
          color="error"
          onClick={() => handleLaunch(params)}
        />,
      ],
    },
  ];
  const [rows, setRows] = useState([]);
  const { updatePlantInfo } = usePlantContext();

  const navigate = useNavigate();

  useEffect(() => {
    getCompanyOfUser();
  }, []);

  async function getCompanyOfUser() {
    let userData = authService.getUserDetails();
    let companyData = authService.getUserCompanyDetails();

    let plantList = await authService.getPlantList(
      companyData[0].userCompany.company.id
    );
    // console.log("user company - " + JSON.stringify(companyData));
    //console.log("planttt- " + JSON.stringify(plantList));

    if (plantList.code === 200) {
      setRows([]);
      plantList.responseBody.map((plant, index) =>
        setRows((prevState) => [
          ...prevState,
          {
            id: plant.id,
            plant: plant.name,
            code: plant.code,
            contact: plant.contactNo ? plant.contactNo : "-",
            address: plant.addressOne ? plant.addressOne : "-",
          },
        ])
      );
    } else {
      console.log("Something went wrong");
    }

    // console.log("plant dta- " + JSON.stringify(plantList));
  }

  const handleLaunch = async (params) => {
    const rowValues = params.row;

    authService.savePlantInfo({
      plantName: rowValues.plant,
      plantCode: rowValues.code,
      plantId: rowValues.id,
    });

    const userDetails = authService.getUserDetails();

    const newPlantInfo = {
      plantName: rowValues.plant,
      plantCode: rowValues.code,
      plantId: rowValues.id,
      notCorporate: true,
      menuList: true,
    };

    updatePlantInfo(newPlantInfo);

    navigate(userDetails.role.dashboardPagePath);
  };

  return (
    <div>
      <div style={{ margin: "16px" }}>
        <h2 style={{ color: "#1C3F75", marginLeft: "10px" }}>Launch Plant</h2>
      </div>
      <Grid item xs={12} style={ItemStyle}>
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            border: "2px solid #696969",
            borderRadius: "5px",
          }}
        >
          <div style={{ width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              hideFooterPagination={true}
              getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0
                  ? "super-app-theme--odd"
                  : "super-app-theme--even"
              }
            />
          </div>
        </Paper>
      </Grid>
    </div>
  );
};

export default Launch;
