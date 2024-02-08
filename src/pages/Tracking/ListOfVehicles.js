import { Checkbox, Input, List, ListItem, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react";

function ListOfVehicles({ totalVehicles, items }) {
  const [searchQuery, setSearchQuery] = useState("");
  const uniqueItems = [...new Set(items)];
  const [vehiclesChecked, setVehiclesChecked] = useState(true);
  const [checkedArray, setCheckedArray] = useState([]);

  useEffect(() => {
    setCheckedArray(new Array(items.length).fill(vehiclesChecked));
  }, [vehiclesChecked, items.length]);

  const handleMasterCheckboxChange = () => {
    setVehiclesChecked(!vehiclesChecked);
    setCheckedArray(new Array(items.length).fill(!vehiclesChecked));
  };

  const handleCheckboxChange = (index) => {
    const newCheckedArray = [...checkedArray];
    newCheckedArray[index] = !newCheckedArray[index];
    setCheckedArray(newCheckedArray);
  };

  return (
    <div>
      <Input
        placeholder="FIND VEHICLE..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          backgroundColor: "white",
          fontSize: "12px",
          paddingLeft: "10px",
        }}
      />
      <List style={{ padding: "0", listStyleType: "none" }}>
        <ListItem key={totalVehicles} sx={{ padding: "0" }}>
          {/* <label style={{ padding: "0" }}> */}
          <input
            type="checkbox"
            checked={vehiclesChecked}
            onChange={handleMasterCheckboxChange}
            style={{ padding: "0", color: "white" }}
          />
          <ListItemText
            style={{
              fontSize: "12px",
              color: "white",
              // marginLeft: "-20px",
            }}
          >
            {totalVehicles}
          </ListItemText>
          {/* </label> */}
        </ListItem>
        {uniqueItems.map((item, index) => {
          if (
            searchQuery &&
            !item.toLowerCase().includes(searchQuery.toLowerCase())
          ) {
            return null;
          }
          return (
            <ListItem key={item} sx={{ padding: "0" }}>
              {/* <label style={{ padding: "0" }}> */}
              <input
                type="checkbox"
                checked={checkedArray[index]}
                onChange={() => handleCheckboxChange(index)}
                style={{ padding: "0", color: "white" }}
              />
              <ListItemText
                style={{
                  fontSize: "12px",
                  color: "white",
                  // marginLeft: "-20px",
                }}
              >
                {item}
              </ListItemText>
              {/* </label> */}
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

export default ListOfVehicles;
