import { Box, Stack, Toolbar, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";

export const HeaderBar = () => {
  return (
    <AppBar position="relative" color="inherit" elevation={3}>
      <Toolbar>
        <Box>
          <Stack flexDirection="row">
            <Typography
              sx={{
                color: "rgb(97, 97, 97)",
                fontSize: "1.5rem",
                fontWeight: 600,
                ml: 2,
                "::selection": {
                  bgcolor: "rgb(204, 233, 255)",
                },
              }}
            >
              {"React Flow Tree"}
            </Typography>
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
