import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import AuthServices from "../../services/AuthServices";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
function Profile() {
  const paperStyle = {
    padding: "25px",
    height: "auto",
    width: "300px",
    margin: "auto",
    alignItems: "center",
  };
  const btnstyle = { margin: "4px" };
  const divStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh" /* Adjust to fit your needs */,
  };
  const componentSpace = {
    marginBottom: "12px",
  };

  const [isChanged, setIsChanged] = useState(false);
  const [name, setName] = useState("");
  const [isValidName, setIsValidName] = useState(true);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [isValidMobile, setIsValidMobile] = useState(true);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const [roleId, setRoleId] = useState("");
  const [open, setOpen] = React.useState(false);
  const [dialogTitleMessage, setDialogTitleMessage] = useState();
  const [dialogContentMessage, setDialogContentMessage] = useState();
  const [validationErrorMessage, setValidationErrorMessage] = useState("");
  const [itemsUpdated, setItemsUpdated] = useState([]);

  const handleMobileValidation = (event) => {
    const inputValue = event.target.value;
    setMobile(inputValue);
    setIsChanged(true);

    const isValid = /^\d{10}$/.test(inputValue); // Regex to match 10 digits
    setIsValidMobile(isValid);
  };

  const handleEmailValidation = (event) => {
    const inputValue = event.target.value;
    setEmail(inputValue);
    setIsChanged(true);

    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue); // Regex for email validation
    setIsValidEmail(isValid);
  };

  const handleNameValidation = (event) => {
    const inputValue = event.target.value;

    setName(inputValue);
    setIsChanged(true);

    const isValid = /^[A-Za-z\s]+$/.test(inputValue); // Regex to match alphabets and spaces
    setIsValidName(isValid);
  };

  const validateName = (name) => {
    // Additional validation logic
    return name.trim().length > 0; // Validate that name is not empty after trimming whitespace
  };

  const handleClose = () => {
    setOpen(false);
  };
  const verifyUserDetails = async (e) => {
    e.preventDefault();

    //New Code on 20-0-2023
    console.log("Itema updated:" + itemsUpdated);
    if (isChanged) {
      if (!isValidName) {
        setDialogTitleMessage("Error!!");
        setDialogContentMessage("User Name is Required");
        setOpen(true);
      } else {
        if (!isValidEmail) {
          setDialogTitleMessage("Error!!");
          setDialogContentMessage("Email is Required");
          setOpen(true);
        } else {
          if (!isValidMobile) {
            setDialogTitleMessage("Error!!");
            setDialogContentMessage("Mobile is Required");
            setOpen(true);
          } else {
            //write code for Length

            const bodyJson = {
              id: userId,
              name: name,
              username: userName,
              password: password,
              emailId: email,
              mobile: mobile,
              status: status,
              role: {
                id: roleId,
              },
            };

            let updateProfile = await AuthServices.updateProfile(bodyJson);
            console.log(
              "Update Profile Response:" + JSON.stringify(updateProfile)
            );
            setItemsUpdated([]);
            if (updateProfile.code === 200) {
              setIsChanged(false);
              setDialogTitleMessage("Profile Update Sucess!!");
              setDialogContentMessage(
                name + " user profile updated successfully"
              );
              setOpen(true);
            } else {
              setIsChanged(false);
              setDialogTitleMessage("Update failure!!");
              setDialogContentMessage("Something went wrong, try again!!");
              setOpen(true);
            }
          }
        }
      }
    } else {
      setDialogTitleMessage("Information");
      setDialogContentMessage("Nothing to Update!!");
      setOpen(true);
    }
  };

  useEffect(() => {
    async function getProfile() {
      let userData = AuthServices.getUserDetails();
      console.log("UserDate:" + JSON.stringify(userData));

      let userProfile = await AuthServices.getUserProfile(userData.id);
      console.log("UserProfile:" + JSON.stringify(userProfile));

      //{"code":200,"message":"success","responseBody":{"id":1,"name":"HEADOFFICE","username":"HEADOFFICE",
      //"password":"rml@123","emailId":"user@rml.com","mobile":"9494537919","status":"Active",
      //"role":{"id":8,"name":"Plant Admin","description":"Has limited priviliges","dashboardPagePath":"/MainLayout/Dashboard"}}}

      if (userProfile.code === 200) {
        setUserId(userProfile.responseBody.id);
        setName(userProfile.responseBody.name);

        setUserName(userProfile.responseBody.username);
        setPassword(userProfile.responseBody.password);
        setMobile(userProfile.responseBody.mobile);
        setEmail(userProfile.responseBody.emailId);
        setStatus(userProfile.responseBody.status);
        setRole(userProfile.responseBody.role.name);
        setRoleId(userProfile.responseBody.role.id);
      } else {
      }
    }

    getProfile();
  }, []);

  return (
    <div style={divStyle}>
      <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Paper elevation={2} style={paperStyle}>
          <Grid align="center">
            <h3>Profile</h3>
          </Grid>
          <Grid align="center">
            <TextField
              required
              style={componentSpace}
              label="Name"
              value={name}
              fullWidth
              onChange={handleNameValidation}
              error={!isValidName || !validateName(name)}
              helperText={
                !isValidName
                  ? "Please enter a valid name"
                  : !validateName(name)
                  ? "Name cannot be empty"
                  : ""
              }
            />
            <TextField
              style={componentSpace}
              label="User Name"
              value={userName}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              required
              style={componentSpace}
              label="Email Id"
              value={email}
              fullWidth
              onChange={handleEmailValidation}
              error={!isValidEmail}
              helperText={
                !isValidEmail ? "Please enter a valid email address" : ""
              }
            />
            <TextField
              required
              style={componentSpace}
              label="Mobile"
              value={mobile}
              fullWidth
              onChange={handleMobileValidation}
              error={!isValidMobile}
              helperText={
                !isValidMobile
                  ? "Please enter a valid 10-digit mobile number"
                  : ""
              }
            />
            <TextField
              style={componentSpace}
              label="Role"
              value={role}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              style={componentSpace}
              label="User Status"
              value={status}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />

            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnstyle}
              fullWidth
              onClick={(e) => {
                verifyUserDetails(e);
              }}
            >
              Update
            </Button>
            <p>{validationErrorMessage}</p>
          </Grid>
        </Paper>
      </Grid>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {dialogTitleMessage}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {dialogContentMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose}>Disagree</Button> */}
            <Button onClick={handleClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default Profile;
