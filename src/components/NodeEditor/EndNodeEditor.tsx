import { useState } from "react";
import { useReactFlow } from "reactflow";
import AssistantPhotoTwoToneIcon from "@mui/icons-material/AssistantPhotoTwoTone";
import Divider from "@mui/material/Divider";
import { updateOneElementInArray } from "../../utils/updateElement";
import { ConfirmationButtons } from "./shared/ConfirmationButtons";
import { DescriptionBox } from "./shared/DescriptionBox";
import { DrawerContainer } from "./shared/DrawerContainer";
import { Header } from "./shared/Header";
import { NameBox } from "./shared/NameBox";

export const EndNodeEditor = (props) => {
  const { nodeId, openDrawer, setOpenDrawer, data } = props;
  const [label, setLabel] = useState(data.label);
  const [description, setDescription] = useState(data.description ?? "");
  const reactFlowInstance = useReactFlow();

  const onClose = () => {
    setDescription(data.description);
    setLabel(data.label);
    setOpenDrawer(false);
  };

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

  return (
    <DrawerContainer openDrawer={openDrawer} onClose={onClose}>
      <Header title={"End Node Editor"} icon={<AssistantPhotoTwoToneIcon />} />
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
