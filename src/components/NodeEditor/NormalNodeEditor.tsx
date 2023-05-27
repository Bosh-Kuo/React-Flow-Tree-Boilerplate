import { useState } from "react";
import { useReactFlow } from "reactflow";
import CallMadeIcon from "@mui/icons-material/CallMade";
import Divider from "@mui/material/Divider";
import { updateOneElementInArray } from "../../utils/updateElement";
import { ConfirmationButtons } from "./shared/ConfirmationButtons";
import { DescriptionBox } from "./shared/DescriptionBox";
import { DrawerContainer } from "./shared/DrawerContainer";
import { Header } from "./shared/Header";
import { NameBox } from "./shared/NameBox";

export const NormalNodeEditor = (props) => {
  const { nodeId, openDrawer, setOpenDrawer, data } = props;
  const [label, setLabel] = useState(data.label);
  const [description, setDescription] = useState(data.description ?? "");
  const reactFlowInstance = useReactFlow();

  const updateNodes = () => {
    const originalNode = reactFlowInstance.getNode(nodeId);
    const originalNodes = reactFlowInstance.getNodes();
    const newNode = {
      ...originalNode,
      data: {
        ...originalNode.data,
        label: label,
        description: description,
      },
    };
    const newNodes = updateOneElementInArray(newNode, originalNodes);
    reactFlowInstance.setNodes(newNodes);
    setOpenDrawer(false);
  };

  const onClose = () => {
    setLabel(data.label);
    setDescription(data.description ?? "");
    setOpenDrawer(false);
  };

  return (
    <DrawerContainer openDrawer={openDrawer} onClose={onClose}>
      <Header title={"Normal Node Editor"} icon={<CallMadeIcon />} />
      <Divider />
      <NameBox label={label} setLabel={setLabel} />
      <DescriptionBox
        description={description}
        setDescription={setDescription}
      />
      <ConfirmationButtons onConfirm={updateNodes} onCancel={onClose} />
    </DrawerContainer>
  );
};
