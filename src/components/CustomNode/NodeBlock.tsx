import { useEffect, useState } from "react";
import { getConnectedEdges, useKeyPress, useReactFlow } from "reactflow";
import styled from "@emotion/styled";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useFold } from "../../hooks/useFold";
import { typeNames } from "../../reactflowConfig";
import { collectFoldableNodes } from "../../utils/treeUtils";
import {
  createNewNode,
  updateElementsInArray,
  updateOneElementInArray,
} from "../../utils/updateElement";

type SquareBoxProps = {
  color: string;
};
const SquareBox = styled(Box)<SquareBoxProps>`
  padding: 10px 10px;
  border-radius: 3px;
  width: 128px;
  color: #222;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  text-align: center;
  border: 1px solid black;
  background-color: ${(props) => props.color};
  &:focus {
    box-shadow: 0 0 0 0.5px #1a192b;
  }
  &:hover:not(:focus) {
    box-shadow: 0 4px 4px 1px rgba(0, 0, 0, 0.08);
  }
`;

const LabelBox = styled(Box)`
  flex: 1 1 auto; // 讓 label 元素佔據剩餘的空間
  max-width: 100%; // 最大寬度為 100%
  overflow-wrap: break-word;
`;

const FoldButton = styled(IconButton)`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  padding: 10px;
  display: flex;
  align-content: center;
  &:focus {
    outline: 0px;
  }
`;

// 蒐集欲折疊or展開的 nodes & edges
const collectFoldableElements = (root, reactFlowInstance) => {
  const foldableNodes = collectFoldableNodes(root, reactFlowInstance);
  const foldableEdges = getConnectedEdges(
    foldableNodes,
    reactFlowInstance.getEdges(),
  );
  return { foldableNodes, foldableEdges };
};

const onChangeFold = (id, reactFlowInstance, fold) => {
  const node = reactFlowInstance.getNode(id);
  const nodes = reactFlowInstance.getNodes();
  node.data.fold = !fold;
  const newNodes = updateOneElementInArray(node, nodes);
  reactFlowInstance.setNodes(newNodes);
};

const onChangeHidden = (rootID, reactFlowInstance, fold) => {
  const node = reactFlowInstance.getNode(rootID);
  const nodes = reactFlowInstance.getNodes();
  const edges = reactFlowInstance.getEdges();

  // 取得可折疊的 nodes 與 edges
  const { foldableNodes, foldableEdges } = collectFoldableElements(
    node,
    reactFlowInstance,
  );
  // 更新可折疊的 nodes 與 edges
  const updatedFoldableNodes = foldableNodes.map((node) => ({
    ...node,
    hidden: !fold,
  }));
  const updatedFoldableEdges = foldableEdges.map((edge) => ({
    ...edge,
    hidden: !fold,
  }));

  const newNodes = updateElementsInArray(updatedFoldableNodes, nodes);
  const newEdges = updateElementsInArray(updatedFoldableEdges, edges);

  reactFlowInstance.setNodes(newNodes);
  reactFlowInstance.setEdges(newEdges);
};

const NodeBlock = ({ id, color, setOpenDrawer }) => {
  const reactFlowInstance = useReactFlow();
  const node = reactFlowInstance.getNode(id);
  const copy = useKeyPress("Meta+c");
  const paste = useKeyPress("Meta+v");
  const [copyNodeId, setCopyNodeId] = useState("");
  const [fold, setFold] = useFold(node.data.fold);

  useEffect(() => {
    // * Copy and Paste
    if (copy && node.selected) {
      console.log(node.id);
      setCopyNodeId(node.id);
    }
    if (paste && copyNodeId) {
      console.log(paste);
      const newNode = createNewNode(
        node.type,
        { x: node.position.x + 100, y: node.position.y },
        node.data,
      );
      reactFlowInstance.setNodes((nodes) => nodes.concat(newNode));
      console.log(node);
    }
  }, [copy, paste]);

  return (
    <SquareBox
      color={color}
      tabIndex={0}
      onClick={() => {
        setOpenDrawer(true);
      }}
    >
      <LabelBox>{node.data.label}</LabelBox>
      {node.type !== typeNames.endNode && (
        <FoldButton
          onClick={(e) => {
            onChangeFold(id, reactFlowInstance, fold);
            onChangeHidden(id, reactFlowInstance, fold);
            setFold(!fold);
            e.stopPropagation(); // 避免觸發到外層的 onClick
          }}
        >
          {fold ? <ExpandMoreRoundedIcon /> : <ExpandLessRoundedIcon />}
        </FoldButton>
      )}
    </SquareBox>
  );
};

export default NodeBlock;
