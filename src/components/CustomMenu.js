import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function CustomMenu(props) {
  // console.log("print", props);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {props.data.pages.length === 0 ? (
        <>
          <MenuItem
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Typography
              textAlign="center"
              style={
                props.type === "desktop"
                  ? { textDecoration: "none", color: "white" }
                  : { textDecoration: "none", color: "blue" }
              }
            >
              {" "}
              {props.data.menu.name}
            </Typography>
          </MenuItem>
        </>
      ) : (
        <>
          <MenuItem
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Typography textAlign="center">
              {props.data.pages.length > 0 ? (
                <Link
                  style={
                    props.type === "desktop"
                      ? { textDecoration: "none", color: "white" }
                      : { textDecoration: "none", color: "blue" }
                  }
                >
                  {" "}
                  {props.data.menu.name}
                </Link>
              ) : (
                <Link
                  style={
                    props.type === "desktop"
                      ? { textDecoration: "none", color: "white" }
                      : { textDecoration: "none", color: "blue" }
                  }
                  to={""}
                >
                  {" "}
                  {props.data.menu.name}
                </Link>
              )}
            </Typography>
          </MenuItem>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {props.data.pages.map((sub, i) => {
              return (
                <MenuItem key={sub.id} onClick={handleClose}>
                  <Link
                    to={sub.pagePath}
                    color="primary"
                    style={{ textDecoration: "none" }}
                  >
                    {sub.name}
                  </Link>
                </MenuItem>
              );
            })}
          </Menu>
        </>
      )}
    </div>
  );
}
