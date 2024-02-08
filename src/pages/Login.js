import {
  default as ArrowBackIcon,
  default as ArrowBackIcon1,
  default as ArrowBackIcon2,
} from "@mui/icons-material/ArrowBack";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CompanyLogo from "../ranelogo.png";
import BackgroundImage from "../ranemadras.png";
import AuthServices from "../services/AuthServices";
import t4uLogo from "../etransT4u_logo_4k_whiteBG_Version_2.png";
import vendorServices from "../services/VendorServices";
import { usePlantContext } from "../utils/context";
import transporterService from "../services/TransporterService";

function Login() {
  const { updatePlantInfo } = usePlantContext();
  const navigate = useNavigate();
  //Dialog Relaeted
  const [open, setOpen] = React.useState(false);
  const [callDialog, setCallDialog] = useState("1");
  const [dialogTitleMessage, setDialogTitleMessage] = useState();
  const [dialogContentMessage, setDialogContentMessage] = useState();

  const handleClose = () => {
    setOpen(false);
    if (callDialog != 1) {
      setCallDialog("1");
      setShowChangePwdPaper(false);
      setLoginPaper(true);
    }
  };

  //Paper Login, Forgot, OTP to show and hide
  const [loginPaper, setLoginPaper] = useState(true);
  const [showUserPaper, setShowUserPaper] = useState(false);
  const [showOtpPaper, setShowOtpPaper] = useState(false);
  const [showChangePwdPaper, setShowChangePwdPaper] = useState(false);
  const [error, setError] = useState("");

  //Login Page related
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessageUser, setErrorMessageUser] = useState("");
  const [errormessageAPI, setErrormessageAPI] = useState("");
  const { savePlantInfo } = usePlantContext();

  const verifyUserDetails = async (e) => {
    e.preventDefault();
    console.log(e.target);
    if (userName.length === 0) {
      setDialogTitleMessage("Error!!");
      setDialogContentMessage("User Name is Required");
      setOpen(true);
    } else {
      if (password.length === 0) {
        setDialogTitleMessage("Error!!");
        setDialogContentMessage("Password is Required");
        setOpen(true);
      } else {
        let data = await AuthServices.ValidateUser({
          username: userName,
          password: password,
        });

        setErrormessageAPI("");
        if (data === false) {
          setErrormessageAPI("Some thing went wrong!! check your network!!");
          console.log("Some thing went wrong!!");
          setDialogTitleMessage("Network Error!!");
          setDialogContentMessage(
            "Some thing went wrong!! check your network!!"
          );
          setOpen(true);
        } else {
          if (data.code === 200) {
            // console.log("Valid User!!");
            // console.log("data message==>", data.responseBody.user);
            // console.log("data Menu==>", data.responseBody.menuPages);
            let remember = true;
            AuthServices.handleLoginSuccess(data, remember);

            if (data.responseBody.user.role.name === "Vendor") {
              // console.log("IAM VENDOR!!!!");
              //TODO Hit API FOR VENDOR

              const venderDetails = await vendorServices.getVendorDeatails(
                data.responseBody.user.id
              );
              if (venderDetails.code === 200) {
                AuthServices.saveVendorInfo(venderDetails.responseBody);
              }
            }

            if (data.responseBody.user.role.name === "Transporter") {
              console.log("IAM TRANSPORTER!!!!");
              //TODO Hit API FOR VENDOR

              const transporterDetails =
                await transporterService.getTransporterDeatails(
                  data.responseBody.user.id
                );
              if (transporterDetails.code === 200) {
                AuthServices.saveTransporterInfo(
                  transporterDetails.responseBody
                );
              }
            }

            //Added code on 20-05-2023 by Kiran to fix cookies issue in dashboard
            let companyData = await AuthServices.getUserCompany(
              data.responseBody.user.id
            );
            // console.log("Company Date in login=>", JSON.stringify(companyData));
            if (companyData.code === 200) {
              if (
                companyData.responseBody &&
                companyData.responseBody.length === 0
              ) {
                // Show an alert or perform any action you want
                setDialogTitleMessage("Login Failed!!");
                setDialogContentMessage("User Not Linked to Plant");
                setOpen(true);
                return;
              }
              // console.log(
              //   "Company Info:" + JSON.stringify(companyData.responseBody)
              // );
              AuthServices.handleCompany(companyData.responseBody);
              let plantList = await AuthServices.getPlantList(
                companyData.responseBody[0].userCompany.company.id
              );
              // console.log("Plants List:==>" + JSON.stringify(plantList));

              if (plantList.code === 200) {
                let plantListItems = plantList.responseBody;
                if (plantListItems.length === 0) {
                  // console.log(
                  //   "Plant Id:" +
                  //     companyData.responseBody[0].userCompany.company.id +
                  //     "Plant Code:" +
                  //     companyData.responseBody[0].userCompany.company.code +
                  //     "Plant Name:" +
                  //     companyData.responseBody[0].userCompany.company.name
                  // );

                  //Setting into Cookies
                  AuthServices.savePlantInfo({
                    plantName:
                      companyData.responseBody[0].userCompany.company.name,
                    plantCode:
                      companyData.responseBody[0].userCompany.company.code,
                    plantId: companyData.responseBody[0].userCompany.company.id,
                  });

                  const newPlantInfo = {
                    plantName:
                      companyData.responseBody[0].userCompany.company.name,
                    plantCode:
                      companyData.responseBody[0].userCompany.company.code,
                    plantId: companyData.responseBody[0].userCompany.company.id,
                    notCorporate: false,
                    menuList: true,
                  };

                  updatePlantInfo(newPlantInfo);

                  // console.log("newPlantInfo" + JSON.stringify(newPlantInfo));

                  //setDefaultPlant({ plantName: companyData.responseBody[0].userCompany.company.name, plantCode: companyData.responseBody[0].userCompany.company.code,plantId: companyData.responseBody[0].userCompany.company.id });
                  //set to cookies plant information.
                  // console.log(
                  //   "Saved Plant Details" +
                  //     JSON.stringify(AuthServices.getSelectedPlant())
                  // );
                } else {
                  // console.log("Child Plant is available.");
                  // var name, id, code;
                  // plantListItems.map((plant, index) => {

                  //   if (index === 0) {
                  //     name = plant.name;
                  //     id = plant.id;
                  //     code = plant.code;
                  //   }
                  // });

                  //Setting into Cookies
                  AuthServices.savePlantInfo({});
                  const newPlantInfo = {
                    plantName: "",
                    plantCode: "",
                    plantId: "",
                    notCorporate: false,
                    menuList: false,
                  };
                  updatePlantInfo(newPlantInfo);
                  //setDefaultPlant({ plantName: companyData.responseBody[0].userCompany.company.name, plantCode: companyData.responseBody[0].userCompany.company.code,plantId: companyData.responseBody[0].userCompany.company.id });
                  //set to cookies plant information.
                  // console.log(
                  //   "Saved Plant Details" +
                  //     JSON.stringify(AuthServices.getSelectedPlant())
                  // );
                }
                if (plantListItems.length === 0) {
                  setTimeout(() => {
                    navigate(data.responseBody.user.role.dashboardPagePath);
                  }, 500);
                } else {
                  setTimeout(() => {
                    navigate("/MainLayout/Launch");
                  }, 500);
                }
              } else {
                console.log("Something went wrong");
              }
            } else {
              alert("Something went wrong, relogin");
            }
            //End of Code by Kiran on 20-05-2023
          } else {
            console.log("InValid User!!");
            console.log("data message==>", data.responseBody);
            //setErrormessageAPI(data.responseBody)
            setDialogTitleMessage("Invalid User!!");
            setDialogContentMessage(data.responseBody);
            setOpen(true);
          }
        }
      }
    }
    if (errorMessageUser.length === 0) {
      setErrorMessageUser("User Name Required");
    }
  };
  const forgotPasswordClicked = () => {
    console.log("Forgot Password Clicked!!");
    setLoginPaper(false);
    setShowUserPaper(true);
  };
  //UserName Paper Related
  const handleNameBlur = () => {
    if (userName.trim() === "") {
      setError("Name is required");
    } else {
      setError("");
    }
  };
  const onBack1Click = () => {
    console.log("Back BUtton to go to Login Clicked");
    setShowUserPaper(false);
    setLoginPaper(true);
  };
  const [userOtp, setUserOtp] = useState("");
  const [userId, setUserId] = useState("");
  const [otpExpiry, setOtpExpiry] = useState("");
  const verifyUserName = async (e, from) => {
    e.preventDefault();
    console.log(e.target);
    console.log("Called this function from" + from);
    if (userName.trim() === "") {
      setError("Name is required");
    } else {
      setError("");
      //Call API to check USer is valid
      // Perform submit action or further processing here
      let userResponse = await AuthServices.checkUserForForgotPassword({
        username: userName,
      });
      console.log("User Reponse:" + JSON.stringify(userResponse));
      if (userResponse.code === 200) {
        //{"code":200,"message":"success",
        //"responseBody":{"id":2,"userId":26,"processName":"FORGOTPASSWORD",
        //"otp":221584,"expiryDate":"2023-05-27 15:55:45","minutes":1}}
        setUserOtp(userResponse.responseBody.otp);
        setUserId(userResponse.responseBody.userId);
        setOtpExpiry(userResponse.responseBody.expiryDate);
        setOtp("");
        if (from === "user") {
          setShowUserPaper(false);
          setShowOtpPaper(true);
        } else {
          setDialogTitleMessage("Resend OTP Successful");
          setDialogContentMessage("Otp is sent to your email Id.");
          setOpen(true);
        }
        //Take to next Screen
      } else {
        if (userResponse.code === 209) {
          setDialogTitleMessage("User not found!!");
          setDialogContentMessage(userResponse.responseBody);
          setOpen(true);
        }
      }
    }
  };
  //Otp Paper Related
  const [otp, setOtp] = useState("");
  const handleOtpBlur = () => {
    if (otp.trim() === "") {
      setError("OTP is required");
    } else {
      setError("");
    }
  };
  const onBackClick = () => {
    console.log("Back BUtton Clicked");

    setShowOtpPaper(false);
    setShowUserPaper(true);
  };

  const resendOtp = (e) => {
    verifyUserName(e, "resend");
  };
  const verifyOtp = (e) => {
    e.preventDefault();
    if (otp.trim() === "") {
      setError("OTP is required");
    } else {
      setError("");
      //Do verification Process

      console.log("userOTP:" + userOtp + "   Entered:" + otp);
      if (otp == userOtp) {
        console.log("OTP Matching");
        setShowOtpPaper(false);
        setShowChangePwdPaper(true);
        setNewPassword("");
        setConfirmPassword("");
      } else {
        console.log("OTP NOT MATCHING");
        setDialogTitleMessage("Invalid OTP");
        setDialogContentMessage("Otp is not matching!!,try again");
        setOpen(true);
      }
    }
  };

  //Change New Password

  const onBackClick2 = () => {
    console.log("Back BUtton2 Clicked");
    setShowChangePwdPaper(false);
    setOtp("");
    setShowOtpPaper(true);
  };

  const [isChanged, setIsChanged] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);

  const [passwordError, setPasswordError] = useState("");
  const handleNewPassword = (event) => {
    const inputValue = event.target.value;
    setNewPassword(inputValue);
    setIsChanged(true);
    setPasswordError("");
  };
  const handleConfirmPassword = (event) => {
    const inputValue = event.target.value;
    setConfirmPassword(inputValue);
    setIsChanged(true);
    setPasswordError("");
  };

  const changePassword = async (e) => {
    e.preventDefault();
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
      const bodyJson = {
        userId: userId,
        newPassword: newPassword,
      };

      console.log("Request to change pwd" + JSON.stringify(bodyJson));

      let changePwdResponse = await AuthServices.updateForgotPassword(bodyJson);
      console.log(
        "Response of Change password:" + JSON.stringify(changePwdResponse)
      );
      if (changePwdResponse.code === 200) {
        setPasswordError("");
        setPasswordChanged(true);

        setIsChanged(false);
        setDialogTitleMessage("Change Password Success!!");
        setDialogContentMessage(userName + " Password changed.");
        setCallDialog("2");
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
  const componentSpace = {
    marginBottom: "12px",
  };
  const paperStyle = {
    padding: "25px",
    height: "auto",
    width: "300px",
    margin: "auto",
    backgroundColor: "#151B54",
  };
  const paperStyle1 = {
    padding: "25px",
    height: "auto",
    width: "300px",
    margin: "auto",
  };

  const btnstyle = { margin: "4px" };
  const fontColorText = {
    color: "white",
  };
  const imageStyle = {
    width: "100px",
    height: "100px",
    padding: "5px",
    margin: "4px",
    borderRadius: "10px",
  };
  const imageStyle1 = {
    width: "150px",
    height: "100px",
    padding: "5px",
    margin: "4px",
    borderRadius: "10px",
  };
  const divStyle = {
    backgroundImage: `url(${BackgroundImage})`,
    width: "100vw",
    height: "100vh",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div style={divStyle}>
      <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        {loginPaper && (
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <img src={t4uLogo} style={imageStyle1} alt="T4u Logo" />
              <img src={CompanyLogo} style={imageStyle} alt="RML Logo" />
              <h3 style={fontColorText}>Sign In</h3>
            </Grid>

            <Grid align="center">
              <TextField
                InputProps={{
                  style: {
                    align: "center",
                    margin: "4px",
                    borderColor: "#FFFFF",
                    backgroundColor: "#F5F5F5",
                    color: "#000000",
                  },
                }}
                InputLabelProps={{
                  sx: { color: "#000000" }, // Change placeholder color
                }}
                label="Enter User Name"
                variant="filled"
                onChange={(e) => {
                  setUserName(e.target.value);
                  setErrormessageAPI("");
                }}
                error={errorMessageUser}
                value={userName}
                fullWidth
                required
              />

              <TextField
                InputProps={{
                  style: {
                    margin: "4px",
                    borderColor: "#FFFFF",
                    backgroundColor: "#F5F5F5",
                    color: "#000000",
                  },
                }}
                InputLabelProps={{
                  sx: { color: "#000000" }, // Change placeholder color
                }}
                label="Enter Password"
                variant="filled"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrormessageAPI("");
                }}
                required
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
                Sign in
              </Button>
              <p style={fontColorText}>{errormessageAPI}</p>

              <p style={{ color: "white" }} onClick={forgotPasswordClicked}>
                {" "}
                Forgot Password
              </p>
            </Grid>
          </Paper>
        )}
        {showUserPaper && (
          <Paper elevation={10} style={paperStyle1}>
            <div style={{ textAlign: "left" }}>
              <ArrowBackIcon1 onClick={onBack1Click} />
            </div>

            <Grid align="center">
              <h3>Forgot Password</h3>
            </Grid>

            <Grid align="center">
              <TextField
                InputProps={{
                  style: {
                    align: "center",
                    margin: "4px",
                    borderColor: "#FFFFF",
                    backgroundColor: "#F5F5F5",
                    color: "#000000",
                  },
                }}
                InputLabelProps={{
                  sx: { color: "#000000" }, // Change placeholder color
                }}
                label="Enter User Name"
                variant="filled"
                onChange={(e) => {
                  setUserName(e.target.value);
                  setError("");
                }}
                error={Boolean(error)}
                helperText={error}
                onBlur={handleNameBlur}
                value={userName}
                fullWidth
                required
              />

              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={btnstyle}
                fullWidth
                onClick={(e) => {
                  verifyUserName(e, "user");
                }}
              >
                Get Password
              </Button>
              <p style={fontColorText}>{errormessageAPI}</p>
            </Grid>
          </Paper>
        )}
        {showOtpPaper && (
          <Paper elevation={10} style={paperStyle1}>
            <div style={{ textAlign: "left" }}>
              <ArrowBackIcon onClick={onBackClick} />
            </div>

            <Grid align="center">
              <h3>Verify OTP</h3>
              <p>Otp is sent your email.</p>
            </Grid>

            <Grid align="center">
              <TextField
                InputProps={{
                  style: {
                    align: "center",
                    margin: "4px",
                    borderColor: "#FFFFF",
                    backgroundColor: "#F5F5F5",
                    color: "#000000",
                  },
                }}
                InputLabelProps={{
                  sx: { color: "#000000" }, // Change placeholder color
                }}
                label="Enter OTP"
                variant="filled"
                onChange={(e) => {
                  setOtp(e.target.value);
                  setError("");
                }}
                error={Boolean(error)}
                helperText={error}
                onBlur={handleOtpBlur}
                value={otp}
                fullWidth
                required
              />

              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={btnstyle}
                fullWidth
                onClick={(e) => {
                  verifyOtp(e);
                }}
              >
                Verify OTP
              </Button>
              <div style={{ textAlign: "right" }}>
                <p onClick={resendOtp}>
                  <u>Resend OTP</u>
                </p>
              </div>
            </Grid>
          </Paper>
        )}

        {showChangePwdPaper && (
          <Paper elevation={10} style={paperStyle1}>
            <div style={{ textAlign: "left" }}>
              {" "}
              <ArrowBackIcon2 onClick={onBackClick2} />
            </div>

            <Grid align="center">
              <h3>Change Password</h3>
            </Grid>

            <Grid align="center">
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
        )}
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

export default Login;
