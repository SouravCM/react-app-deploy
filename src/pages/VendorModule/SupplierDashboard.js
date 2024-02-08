import Grid from "@mui/material/Grid";
import React from "react";

const containerStyle = {
  padding: "4px",
  height: "auto",
  margin: "auto",
  
};
const ItemStyle = {
  padding: "4px",
  margin: "4px",
};

function SupplierDashboard() {

  return (
    <Grid container style={containerStyle}>
      <h2 style={{ color: "#15317E", marginLeft: "10px" }}>Supplier Dashboard</h2>
      
    </Grid>
  );
}

export default SupplierDashboard;
