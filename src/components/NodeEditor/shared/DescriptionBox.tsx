import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";

export const DescriptionBox = ({ description, setDescription }) => {
  return (
    <Box marginTop={4} marginBottom={4}>
      <FormLabel color="primary">Description</FormLabel>
      <Box marginTop={1}>
        <TextField
          required
          fullWidth
          defaultValue={description}
          placeholder="Please enter the node's description"
          variant="outlined"
          minRows={6}
          multiline
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </Box>
    </Box>
  );
};
