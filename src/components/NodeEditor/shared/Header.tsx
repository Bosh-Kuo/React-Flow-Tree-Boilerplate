import { Box } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export const Header = ({ title, icon }) => {
  return (
    <Toolbar>
      <Box>{icon}</Box>
      <Box sx={{ paddingLeft: "10px" }}>
        <Typography variant="h6">
          <strong>{title}</strong>
        </Typography>
      </Box>
    </Toolbar>
  );
};
