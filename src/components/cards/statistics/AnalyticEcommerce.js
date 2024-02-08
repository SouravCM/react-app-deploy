import PropTypes from "prop-types";

// material-ui
import { Box, Chip, Grid, Paper, Stack, Typography } from "@mui/material";

// project import
import MainCard from "../../MainCard";

// assets
import { RiseOutlined, FallOutlined } from "@ant-design/icons";

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const AnalyticEcommerce = ({ title, count }) => (
  <Paper sx={{ height: "100px" }}>
    <Stack spacing={1}>
      <Typography variant="h6" color="textSecondary">
        {title}
      </Typography>

      <Typography variant="h4" color="inherit">
        {count}
      </Typography>
    </Stack>
  </Paper>
);

AnalyticEcommerce.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};

AnalyticEcommerce.defaultProps = {
  color: "primary",
};

export default AnalyticEcommerce;
