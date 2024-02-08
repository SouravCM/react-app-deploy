import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import moment from "moment";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import FreightServices from "../../services/FreightServices.js";
import AuthServices from "../../services/AuthServices";

const PremiumFreightLevel1Approval = () => {
  const [tableData, setTableData] = useState([]);

  const [typeofFreight, setTypeofFreight] = React.useState("");
  const [costImpact, setCostImpact] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [materials, setMaterials] = useState("");
  const [transporterName, setTransporterName] = useState("");
  const [freightDate, setFreightDate] = useState("");
  const [requestBy, setRequestBy] = useState("");

  const [id, setId] = useState();
  const [fTMImpact, setFTMImpact] = useState(0);
  const [userId, setUserId] = useState();
  const [source, setSource] = useState();
  const [destination, setDestination] = useState();
  const [normalFrightMode, setNormalFrightMode] = useState();
  const [permiumMode, setPremiumMode] = useState();
  const [normalRate, setNormalRate] = useState();
  const [premiumRate, setPremiumRate] = useState();
  const [eDate, setEdate] = useState();
  const [vehicle, setVehicle] = useState();
  const [remarks, setRemarks] = useState("");
  const [isValidRemarks, setIsValidRemarks] = useState(true);

  const [open, setOpen] = React.useState(false);

  const [openComplete, setOpenComplete] = React.useState(false);

  const validateRemarks = (remark) => {
    // Additional validation logic
    return remark.length > 0; // Validate that remarks is not empty after trimming whitespace
  };

  const [dialogTitleMessageComplete, setDialogTitleMessageComplete] =
    useState();
  const [dialogContentMessageComplete, setDialogContentMessageComplete] =
    useState();

  const handleClose = () => {
    setOpen(false);
  };
  const handleRemarks = (event) => {
    const inputValue = event.target.value;
    setRemarks(inputValue);
  };

  const handleCancel = () => {
    setOpen(false);
    console.log("Cancel Button Clicked!!");
  };

  const handleApprove = async () => {
    setOpen(false);
    console.log("Approve Button Clicked!!");
    console.log("ID:" + id);
    console.log("Remarks:" + remarks);
    console.log("UserId:" + userId);

    const jsonBody = {
      id: id,
      level1Status: "APPROVED",
      level1ApprovedBy: userId,
      level1Remarks: remarks,
    };

    const responseApproval = await FreightServices.approveRejectFrieght(
      jsonBody
    );

    if (responseApproval.code === 200) {
      setDialogTitleMessageComplete("Premium Freight Approval");
      setDialogContentMessageComplete("Premium Freight Approved Successfully");
      setOpenComplete(true);
    } else {
      setDialogTitleMessageComplete("Premium Freight Approval");
      setDialogContentMessageComplete("Something went wrong, Try again.");
      setOpenComplete(true);
    }
  };

  const handleReject = async () => {
    setOpen(false);
    console.log("Reject Button Clicked!!");
    console.log("Approve Button Clicked!!");
    console.log("ID:" + id);
    console.log("Remarks:" + remarks);
    console.log("UserId:" + userId);

    if (remarks.length === 0) {
      setDialogTitleMessageComplete("Premium Freight Approval");
      setDialogContentMessageComplete("Remarks is requried");
      setOpenComplete(true);
    } else {
      const jsonBody = {
        id: id,
        level1Status: "REJECTED",
        level1ApprovedBy: userId,
        level1Remarks: remarks,
      };

      const responseApproval = await FreightServices.approveRejectFrieght(
        jsonBody
      );

      if (responseApproval.code === 200) {
        setDialogTitleMessageComplete("Premium Freight Approval");
        setDialogContentMessageComplete(
          "Premium Freight Rejected Successfully"
        );
        setOpenComplete(true);
      } else {
        setDialogTitleMessageComplete("Premium Freight Approval");
        setDialogContentMessageComplete("Something went wrong, Try again.");
        setOpenComplete(true);
      }
    }
  };

  const containerStyle = {
    padding: "8px",
    height: "100%",
  };

  const ItemStyle = {
    padding: "4px",
    margin: "4px",
  };

  const tableStyle = {
    padding: "4px",
    margin: "8px",
  };
  const tableTdStyle = {
    padding: "4px",
    marginRight: "4px",
  };
  const tableTdStyle1 = {
    marginLeft: "4px",
    padding: "4x",
  };
  const columns = [
    {
      field: "seq",
      headerName: "ID",
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "type",
      headerName: "Type of Freight",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "date",
      headerName: "Date",
      align: "center",
      headerAlign: "center",
      minWidth: 110,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "freightNo",
      headerName: "Freight Number",
      align: "center",
      headerAlign: "center",
      minWidth: 190,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "pickupPoint",
      headerName: "Pickup Point",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "deliveryPoint",
      headerName: "Delivery Point",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "regularMode",
      headerName: "Regular Mode",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "regularCost",
      headerName: "Regular Cost",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "premiumMode",
      headerName: "Premium Mode",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "premiumCost",
      headerName: "Premium Cost",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "costImpact",
      headerName: "Cost Impact",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "materialName",
      headerName: "Materials",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "transporterName",
      headerName: "Transporter Name",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "expectedDate",
      headerName: "Expected Date",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "remarks",
      headerName: "Remarks",
      align: "center",
      headerAlign: "center",
      minWidth: 250,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "level1Status",
      headerName: "Level 1 Status",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "createdBy",
      headerName: "Raised By",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      align: "center",
      headerAlign: "center",
      flex: 1,
      minWidth: 150,
      headerClassName: "super-app-theme--header",
      cellClassName: "actions",
      renderCell: (params) => {
        const handleClick = async () => {
          // Button click event handler
          console.log("Button clicked for row:", params.row.vehicleNo);
          const response = await FreightServices.getFTMCostImapact({
            id: params.row.id,
          });
          console.log("RESPONSE:" + JSON.stringify(response));
          if (response.code === 200) {
            console.log("RESPONSE:" + JSON.stringify(response));
            setFTMImpact(response.responseBody);
          } else {
            console.log("RESPONSE IS NOT COMING");
            setFTMImpact(0);
          }
          setTypeofFreight(params.row.type);
          setFreightDate(params.row.date);
          setTransporterName(params.row.transporterName);
          setCustomerName(params.row.customerName);
          setMaterials(params.row.materialName);
          setRequestBy(params.row.createdBy);
          setId(params.row.id);
          setSource(params.row.pickupPoint);
          setDestination(params.row.deliveryPoint);
          setNormalFrightMode(params.row.regularMode);
          setPremiumMode(params.row.premiumMode);
          setNormalRate(params.row.regularCost);
          setPremiumRate(params.row.premiumCost);
          setCostImpact(params.row.premiumCost - params.row.regularCost);
          setEdate(params.row.expectedDate);
          setVehicle(params.row.vehicleNo);

          setOpen(true);
        };

        return (
          <Button
            variant="contained"
            color="primary"
            onClick={handleClick}
            style={{ minWidth: "45px", borderRadius: "15px" }}
          >
            Verify
          </Button>
        );
      },
    },
  ];
  async function getFreightApprovalLevel1() {
    let userCompany = AuthServices.getSelectedPlant();
    let plantId = userCompany.plantId;

    let requestBody = { companyId: plantId };

    let freightList = await FreightServices.getFreightApprovalLevel1(
      requestBody
    );
    console.log("All Freight List:" + JSON.stringify(freightList));
    setTableData([]);
    if (freightList.code === 200) {
      console.log(
        "All  Freight List:=>" + JSON.stringify(freightList.responseBody)
      );

      let materialsArray = freightList.responseBody;

      materialsArray.map((freight, index) => {
        setTableData((prevState) => [
          ...prevState,
          {
            id: freight.id,
            seq: index++,
            type: freight.type,
            customerName: freight.customerName,
            materialName: freight.materialName,
            transporterName: freight.transporter.name,
            date: moment(new Date(freight.date)).format("DD-MM-YYYY HH:mm:ss"),
            freightNo: freight.freightNo,
            pickupPoint: freight.pickupPoint,
            deliveryPoint: freight.deliveryPoint,
            regularMode: freight.regularMode,
            regularCost: freight.regularCost,
            premiumMode: freight.premiumMode,
            premiumCost: freight.premiumCost,
            costImpact: freight.premiumCost - freight.regularCost,
            vehicleNo: freight.vehicleNo,
            expectedDate: moment(new Date(freight.expectedDate)).format(
              "DD-MM-YYYY HH:mm:ss"
            ),
            remarks: freight.remarks,

            level1ApprovedOn: freight.level1ApprovedOn,
            level1Status: !freight.level1Status
              ? "PENDING"
              : freight.level1Status,
            level1ApprovedBy: !freight.level1Approver
              ? ""
              : freight.level1Approver.name,
            level1Remarks: freight.level1Remarks,
            level2ApprovedOn: freight.level2ApprovedOn,
            level2Status: !freight.level2Status
              ? "PENDING"
              : freight.level2Status,
            level2ApprovedBy: !freight.level2Approver
              ? ""
              : freight.level2Approver.name,
            level2Remarks: freight.level2Remarks,
            createdBy: freight.creator.name,
          },
        ]);
        console.log("Lenght:" + tableData.length);
      });
    }
  }
  useEffect(() => {
    //get User Details
    let userData = AuthServices.getUserDetails();
    console.log("User Id:" + userData.id);
    setUserId(userData.id);

    getFreightApprovalLevel1();
  }, []);
  const handleCloseComplete = () => {
    setOpen(false);
    setOpenComplete(false);
    //window.location.reload();
    getFreightApprovalLevel1();
  };
  return (
    <div>
      <Grid container style={containerStyle}>
        <h3 style={{ marginLeft: "8px" }}>Premium Freight Level 1 Approval</h3>
        <Grid item xs={12} style={ItemStyle}>
          <Paper
            sx={{
              width: "100%",
              padding: "6px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: "auto",
                width: "auto",
                zIndex: 999,
                marginLeft: "8px",
              }}
            ></div>
            <div style={{ height: 490, width: "100%", overflow: "scroll" }}>
              <DataGrid
                rows={tableData}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5, 10, 25]}
                scrollbarSize={10}
                components={{
                  Toolbar: GridToolbar,
                }}
                getRowClassName={(params) =>
                  params.indexRelativeToCurrentPage % 2 === 0
                    ? "super-app-theme--odd"
                    : "super-app-theme--even"
                }
                sx={{
                  "& .MuiDataGrid-cell:hover": {
                    color: "#1C3F75",
                  },
                  "& .super-app-theme--header": {
                    backgroundColor: "#A9A9A9",
                    fontWeight: "bold",
                  },
                  "& .super-app-theme--even": {
                    backgroundColor: "#E8E8E8",
                  },
                  "& .super-app-theme--odd": {
                    backgroundColor: "#ffffff",
                  },
                }}
              />
            </div>
          </Paper>
        </Grid>
      </Grid>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Premium Frieght Approval</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <table style={tableStyle}>
              <tr>
                <td style={tableTdStyle}>Type :</td>

                <td style={tableTdStyle1}>
                  <b>{typeofFreight}</b>
                </td>
                <td style={tableTdStyle}>Date:</td>
                <td style={tableTdStyle1}>
                  <b>{freightDate}</b>
                </td>
              </tr>
              <tr>
                <td style={tableTdStyle}>Pickup Point:</td>

                <td style={tableTdStyle1}>
                  <b>{source}</b>
                </td>
                <td style={tableTdStyle}>Delivery Point:</td>
                <td style={tableTdStyle1}>
                  <b>{destination}</b>
                </td>
              </tr>
              <tr>
                <td style={tableTdStyle}>Regular Mode:</td>

                <td style={tableTdStyle1}>
                  <b>{normalFrightMode}</b>
                </td>
                <td style={tableTdStyle}>Regular Cost(Rs.):</td>

                <td style={tableTdStyle1}>
                  <b>{normalRate}</b>
                </td>
              </tr>
              <tr>
                <td style={tableTdStyle}>Premium Mode:</td>

                <td style={tableTdStyle1}>
                  <b>{permiumMode}</b>
                </td>
                <td style={tableTdStyle}>Premium Cost(Rs.):</td>

                <td style={tableTdStyle1}>
                  <b>{premiumRate}</b>
                </td>
              </tr>
              <tr>
                <td style={tableTdStyle}>Expected Date:</td>

                <td style={tableTdStyle1}>
                  <b>{eDate}</b>
                </td>
                <td style={tableTdStyle}>Transporter:</td>

                <td style={tableTdStyle1}>
                  <b>{transporterName}</b>
                </td>
              </tr>
              <tr>
                <td style={tableTdStyle}>Customer:</td>

                <td style={tableTdStyle1}>
                  <b>{customerName}</b>
                </td>
                <td style={tableTdStyle}>Materials:</td>

                <td style={tableTdStyle1}>
                  <b>{materials}</b>
                </td>
              </tr>
              <tr>
                <td style={tableTdStyle}>Raised By:</td>

                <td style={tableTdStyle1}>
                  <b>{requestBy}</b>
                </td>
                <td style={tableTdStyle}>Cost Impact:</td>

                <td style={tableTdStyle1}>
                  <b>{costImpact}</b>
                </td>
              </tr>
              <tr>
                <td style={tableTdStyle}>FTM Cost Impact:</td>

                <td style={tableTdStyle1}>
                  <b>{fTMImpact}</b>
                </td>
                <td style={tableTdStyle}>Total FTM Cost Impact:</td>

                <td style={tableTdStyle1}>
                  <b>{fTMImpact + costImpact}</b>
                </td>
              </tr>
            </table>

            <TextField
              required
              margin="dense"
              id="remarksText"
              label="Remarks"
              value={remarks}
              onChange={handleRemarks}
              error={!isValidRemarks || !validateRemarks(remarks)}
              helperText={
                !isValidRemarks
                  ? "Please enter a valid remarks"
                  : !validateRemarks(remarks)
                  ? "Remarks cannot be empty"
                  : ""
              }
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} variant="contained" color="primary">
              Cancel
            </Button>
            <Button onClick={handleApprove} variant="contained" color="success">
              Approve
            </Button>
            <Button onClick={handleReject} variant="contained" color="error">
              Reject
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog
          open={openComplete}
          onClose={handleCloseComplete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {dialogTitleMessageComplete}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {dialogContentMessageComplete}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseComplete} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default PremiumFreightLevel1Approval;
