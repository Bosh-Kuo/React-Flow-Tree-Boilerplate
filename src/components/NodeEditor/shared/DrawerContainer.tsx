import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

export const DrawerContainer = ({ openDrawer, onClose, children }) => {
  return (
    <Drawer anchor="left" open={openDrawer} onClose={onClose}>
      <Box width={500} px={4} py={3}>
        {children}
      </Box>
    </Drawer>
  );
};
