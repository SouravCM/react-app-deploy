// @mui
import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";
// components
import Iconify from "../../components/iconify/Iconify";

// ----------------------------------------------------------------------

const StyledIcon = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: 50,
  height: 50,
  justifyContent: "center",
  marginBottom: 30,
}));

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  paletcolor: PropTypes.string,
  bgColor: PropTypes.string,
  iconColor: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function AppWidgetSummary({
  title,
  total,
  icon,
  paletcolor = "#061B64",
  bgColor = "#D1E9FC",
  iconColor = "#103996",
  sx,
  ...other
}) {
  // console.log(paletcolor);
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: "center",
        color: paletcolor,
        bgcolor: bgColor,
        width: "65%", // Adjust the width of the card
        height: "90%", // Adjust the height of the card

        ...sx,
      }}
      {...other}
    >
      <StyledIcon
        sx={{
          color: iconColor,
          backgroundImage: `linear-gradient(135deg, ${alpha(
            iconColor,
            0
          )} 0%, ${alpha("#1E1825", 0.24)} 100%)`,
        }}
      >
        <Iconify icon={icon} width={24} height={24} />
      </StyledIcon>

      <Typography variant="h4">{total}</Typography>

      <Typography variant="subtitle3" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </Card>
  );
}
