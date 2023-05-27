import { useState } from "react";
import { getOutgoers, useEdges, useNodes, useReactFlow } from "reactflow";
import ForkRightIcon from "@mui/icons-material/ForkRight";
import { TableContainer, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  updateElementsInArray,
  updateOneElementInArray,
} from "../../utils/updateElement";
import { ConfirmationButtons } from "./shared/ConfirmationButtons";
import { DescriptionBox } from "./shared/DescriptionBox";
import { DrawerContainer } from "./shared/DrawerContainer";
import { Header } from "./shared/Header";
import { NameBox } from "./shared/NameBox";

export const BranchNodeEditor = (props) => {
  const { nodeId, openDrawer, setOpenDrawer, data } = props;
  const [label, setLabel] = useState(data.label);
  const [description, setDescription] = useState("");
  const reactFlowInstance = useReactFlow();

  // Nodes and Edges
  const node = reactFlowInstance.getNode(nodeId);
  const nodes = useNodes();
  const edges = useEdges();

  const targets = getOutgoers(node, nodes, edges);

  const connections: any = targets.map((target) => {
    const connection = edges.find(
      (edge) => edge.source === node.id && edge.target === target.id,
    );
    return connection;
  });

  const [conditions, setConditions] = useState(
    connections.map((connection) => connection?.data.condition),
  );
  console.log(conditions);

  const updateNodes = () => {
    const newNode = {
      ...node,
      data: {
        ...node.data,
        label: label,
        description: description,
      },
    };
    const newConnections = connections.map((connection, index) => {
      return {
        ...connection,
        data: { ...connection.data, condition: conditions[index] },
      };
    });
    const newNodes = updateOneElementInArray(newNode, nodes);
    const newEdges = updateElementsInArray(newConnections, edges);
    reactFlowInstance.setNodes(newNodes);
    reactFlowInstance.setEdges(newEdges);
    setOpenDrawer(false);
  };

  const onClose = () => {
    setLabel(data.label ?? "");
    setDescription(data.description ?? "");
    setOpenDrawer(false);
  };

  return (
    <DrawerContainer openDrawer={openDrawer} onClose={onClose}>
      <Header title={"Branch Node Editor"} icon={<ForkRightIcon />} />
      <Divider />
      <NameBox label={label} setLabel={setLabel} />
      <DescriptionBox
        description={description}
        setDescription={setDescription}
      />

      <Box marginTop={4} marginBottom={4}>
        <FormLabel color="primary">Branches</FormLabel>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ bgcolor: "#e6e6e6" }}>
              <TableRow>
                <TableCell>
                  <strong>Conditions</strong>
                </TableCell>
                <TableCell>
                  <strong>Forward to</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {connections.map((connection, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      variant="standard"
                      defaultValue={connection.data.condition ?? ""}
                      onChange={(e) => {
                        conditions[index] = e.target.value;
                        setConditions(conditions);
                      }}
                    ></TextField>
                  </TableCell>
                  <TableCell>
                    <strong>
                      {reactFlowInstance.getNode(connection.target)?.data.label}
                    </strong>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <ConfirmationButtons onConfirm={updateNodes} onCancel={onClose} />
    </DrawerContainer>
  );
};
