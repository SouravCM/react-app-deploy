import moment from "moment";
import React from "react";

export default function SupplierInfo(props) {
  console.log("print", props);
  //const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "8px",
        }}
      >
        <table
          style={{
            width: "90%",
            tableLayout: "fixed",
            border: "1px solid black",
          }}
        >
          <colgroup>
            <col style={{ width: "15%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "15%" }} />
          </colgroup>
          <tbody>
            <tr>
              <td style={{ paddingBottom: "10px" }} colSpan={2}>
                Supplier :
              </td>{" "}
              <td style={{ paddingBottom: "10px" }} colSpan={2}>
                {props.data.vendorName}
              </td>
              <td></td> <td></td>
            </tr>
            <tr>
              <td colSpan={2}>Odometer</td>{" "}
              <td colSpan={2}>
                {props.data.odometer !== null ? props.data.odometer : ""}
              </td>
              <td></td> <td></td>
            </tr>
            <tr>
              <td>Reach Time</td>{" "}
              <td>
                {props.data.actualArrivalDate
                  ? moment(new Date(props.data.actualArrivalDate)).format(
                      "DD-MM-YYYY HH:mm"
                    )
                  : ""}
              </td>
              <td>Exit Time</td>{" "}
              <td>
                {props.data.actualDepartureDate
                  ? moment(new Date(props.data.actualDepartureDate)).format(
                      "DD-MM-YYYY HH:mm"
                    )
                  : ""}
              </td>
              <td>Detention</td> <td>{props.data.detention}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <table
          style={{
            width: "90%",
            tableLayout: "fixed",
            border: "1px solid black",
          }}
        >
          <colgroup>
            <col style={{ width: "10%" }} />
            <col style={{ width: "35%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "30%" }} />
          </colgroup>
          <tbody>
            <tr>
              <th
                style={{
                  textAlign: "center",
                  borderRight: "1px solid black",
                  borderBottom: "1px solid black",
                  padding: "4px",
                }}
              >
                Sno.
              </th>
              <th
                style={{
                  textAlign: "center",
                  borderRight: "1px solid black",
                  borderBottom: "1px solid black",
                  padding: "4px",
                }}
              >
                Material
              </th>
              <th
                style={{
                  textAlign: "center",
                  borderRight: "1px solid black",
                  borderBottom: "1px solid black",
                  padding: "4px",
                }}
              >
                Plan Qty
              </th>
              <th
                style={{
                  textAlign: "center",
                  borderRight: "1px solid black",
                  borderBottom: "1px solid black",
                  padding: "4px",
                }}
              >
                Supplied Qty
              </th>
              <th
                style={{
                  textAlign: "center",
                  borderBottom: "1px solid black",
                  padding: "4px",
                }}
              >
                Supplier Remarks
              </th>
            </tr>

            {props.data.materials.map((material, index) => {
              return (
                <tr>
                  <td
                    style={{
                      textAlign: "center",
                      borderRight: "1px solid black",
                      borderBottom: "1px solid black",
                      padding: "4px",
                    }}
                  >
                    {index + 1}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      borderRight: "1px solid black",
                      borderBottom: "1px solid black",
                      padding: "4px",
                    }}
                  >
                    {material.code + " - " + material.name}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      borderRight: "1px solid black",
                      borderBottom: "1px solid black",
                      padding: "4px",
                    }}
                  >
                    {material.requestedQuantity}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      borderRight: "1px solid black",
                      borderBottom: "1px solid black",
                      padding: "4px",
                    }}
                  >
                    {material.dispatchedQuantity}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      borderBottom: "1px solid black",
                      padding: "4px",
                    }}
                  >
                    {material.dispatchedRemarks}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* {props.data.pages.length === 0 ? (
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
      )} */}
    </div>
  );
}
