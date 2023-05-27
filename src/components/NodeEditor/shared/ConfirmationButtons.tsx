import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export const ConfirmationButtons = ({ onConfirm, onCancel }) => {
  return (
    <Box display="flex" justifyContent="flex-start" marginTop={2}>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: 5 }}
        onClick={onConfirm}
      >
        Save
      </Button>
      <Button
        variant="contained"
        color="secondary"
        style={{ margin: 5 }}
        onClick={onCancel}
      >
        Cancel
      </Button>
    </Box>
  );
};
