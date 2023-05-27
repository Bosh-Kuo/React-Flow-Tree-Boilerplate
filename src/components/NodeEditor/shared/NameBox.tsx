import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";

export const NameBox = ({ label, setLabel }) => {
  return (
    <Box marginTop={4} marginBottom={4}>
      <FormLabel color="primary">Node Name</FormLabel>
      <Box marginTop={1}>
        <TextField
          required
          fullWidth
          defaultValue={label}
          onChange={(e) => {
            setLabel(e.target.value);
          }}
          placeholder="Please enter node name"
          variant="outlined"
        />
      </Box>
    </Box>
  );
};
