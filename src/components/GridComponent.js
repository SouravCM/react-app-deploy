import React, { useState, useEffect } from "react";
import { Grid, Paper, TextField } from "@mui/material";

const GridComponent = ({ materialData }) => {
  // console.log("INSIDE COMPONET:"+JSON.stringify(materialData));

  const [data, setData] = useState(materialData);
  useEffect(() => {
    // Sort the materialData based on material code in ascending order
    const sortedData = [...materialData].sort((a, b) =>
      a.materialCode.localeCompare(b.materialCode)
    );
    setData(sortedData);
  }, [materialData]);
  const handleQtyChange = (index, value) => {
    const updatedData = [...data];
    updatedData[index].requiredQty = value;

    // Calculate TotalWeight and TotalVolume
    const material = updatedData[index];
    material.totalWeight = material.unitWeight * value;
    material.totalVolume = material.unitVolume * value;

    setData(updatedData); // Update the state with the modified data
  };

  return (
    <Grid item xs={12} style={{ width: "100%" }}>
      <div
        style={{ maxHeight: "300px", overflowY: "auto", paddingBottom: "10px" }}
      >
        <Grid container spacing={0}>
          {/* Render the column names */}
          <Grid item xs={2}>
            <div
              style={{
                border: "1px solid",
                padding: "4px",
                minHeight: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "lightgray",
              }}
            >
              <b>Material Code</b>
            </div>
          </Grid>
          <Grid item xs={2}>
            <div
              style={{
                border: "1px solid",
                padding: "4px",
                minHeight: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "lightgray",
              }}
            >
              <b>Material Description</b>
            </div>
          </Grid>
          <Grid item xs={2}>
            <div
              style={{
                border: "1px solid",
                padding: "4px",
                minHeight: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ADD8E6",
              }}
            >
              <b>Required Qty</b>
            </div>
          </Grid>
          <Grid item xs={2}>
            <div
              style={{
                border: "1px solid",
                padding: "4px",
                minHeight: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "lightgray",
              }}
            >
              <b>UOM</b>
            </div>
          </Grid>
          <Grid item xs={2}>
            <div
              style={{
                border: "1px solid",
                padding: "4px",
                minHeight: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "lightgray",
              }}
            >
              <b>Total Weight</b>
            </div>
          </Grid>
          <Grid item xs={2}>
            <div
              style={{
                border: "1px solid",
                padding: "4px",
                minHeight: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "lightgray",
              }}
            >
              <b>Total Volume</b>
            </div>
          </Grid>

          {/* Render the material data rows */}
          {data.map((material, index) => (
            <React.Fragment key={index}>
              <Grid item xs={2}>
                <div
                  style={{
                    border: "1px solid",
                    padding: "4px",
                    minHeight: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {material.materialCode}
                </div>
              </Grid>
              <Grid item xs={2}>
                <div
                  style={{
                    border: "1px solid",
                    padding: "4px",
                    minHeight: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {material.materialDescription}
                </div>
              </Grid>
              <Grid item xs={2}>
                <div
                  style={{
                    border: "1px solid",
                    padding: "0px",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TextField
                    value={material.requiredQty}
                    onChange={(event) =>
                      handleQtyChange(index, event.target.value)
                    }
                    variant="outlined"
                    size="small"
                    style={{
                      width: "100%",
                      textAlign: "center",
                      fontSize: "11px",
                      backgroundColor: "#ADD8E6",
                    }}
                    inputProps={{
                      style: { textAlign: "center", fontSize: "11px" },
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={2}>
                <div
                  style={{
                    border: "1px solid",
                    padding: "4px",
                    minHeight: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {material.uom}
                </div>
              </Grid>
              <Grid item xs={2}>
                <div
                  style={{
                    border: "1px solid",
                    padding: "4px",
                    minHeight: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {material.totalWeight}
                </div>
              </Grid>
              <Grid item xs={2}>
                <div
                  style={{
                    border: "1px solid",
                    padding: "4px",
                    minHeight: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {material.totalVolume}
                </div>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </div>
    </Grid>
  );
};

export default GridComponent;
