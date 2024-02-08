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
function ChangePassword() {
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

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);

  const [passwordError, setPasswordError] = useState("");

  const [open, setOpen] = React.useState(false);
  const [dialogTitleMessage, setDialogTitleMessage] = useState();
  const [dialogContentMessage, setDialogContentMessage] = useState();

  const [itemsUpdated, setItemsUpdated] = useState([]);

  const handleOldPassword = (event) => {
    const inputValue = event.target.value;
    setOldPassword(inputValue);
    setIsChanged(true);
  };
  const handleNewPassword = (event) => {
    const inputValue = event.target.value;
    setNewPassword(inputValue);
    setIsChanged(true);
  };
  const handleConfirmPassword = (event) => {
    const inputValue = event.target.value;
    setConfirmPassword(inputValue);
    setIsChanged(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const changePassword = async (e) => {
    e.preventDefault();
    console.log("Itema updated:" + itemsUpdated);

    if (isChanged) {
      // Perform password change validation and submission logic here
      if (newPassword !== confirmPassword) {
        setPasswordError("Passwords do not match");
        setPasswordChanged(false);

        return;
      }
      const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
      const isValid = passwordRegex.test(newPassword);
      if (!isValid) {
        setPasswordError(
          "Password must contain at least 8 characters, including an uppercase letter, a lowercase letter, and a digit."
        );
        setPasswordChanged(false);
        return;
      }

      // Password change is valid, proceed with submission
      console.log("Password changed successfully");
      // TODO: Perform actual password change logic

      const bodyJson = {
        username: userName,
        password: oldPassword,
        newPassword: newPassword,
      };

      let changePwdResponse = await AuthServices.changePassword(bodyJson);
      console.log(
        "Response of Change password:" + JSON.stringify(changePwdResponse)
      );
      if (changePwdResponse.code === 200) {
        setPasswordError("");
        setPasswordChanged(true);

        setIsChanged(false);
        setDialogTitleMessage("Change Password Success!!");
        setDialogContentMessage(userName + " Password changed.");
        setOpen(true);
      } else {
        if (changePwdResponse.code === 209) {
          setDialogTitleMessage("Change Password Failed!!");
          setDialogContentMessage(changePwdResponse.responseBody);
          setOpen(true);
        } else {
          setDialogTitleMessage("Change Password Failed!!");
          setDialogContentMessage("Something went wrong, Try again!!");
          setOpen(true);
        }
      }
    } else {
      setDialogTitleMessage("Information");
      setDialogContentMessage("Nothing to Update!!");
      setOpen(true);
      setIsChanged(false);
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
        //setName(userProfile.responseBody.name);

        setUserName(userProfile.responseBody.username);
        // setPassword(userProfile.responseBody.password);
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
            <h3>Change Password</h3>
          </Grid>
          <Grid align="center">
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
              type="password"
              style={componentSpace}
              label="Old Password"
              value={oldPassword}
              fullWidth
              onChange={handleOldPassword}
            />
            <TextField
              required
              type="password"
              style={componentSpace}
              label="New Password"
              value={newPassword}
              fullWidth
              onChange={handleNewPassword}
            />
            <TextField
              required
              type="password"
              style={componentSpace}
              label="Confirm New Password"
              value={confirmPassword}
              fullWidth
              onChange={handleConfirmPassword}
              error={passwordError !== "" && !passwordChanged}
              helperText={passwordError}
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnstyle}
              fullWidth
              onClick={(e) => {
                changePassword(e);
              }}
            >
              Change Password
            </Button>
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

export default ChangePassword;
