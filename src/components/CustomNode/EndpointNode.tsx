import { memo, useState } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import { color } from "@components/Layout";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import { typeNames } from "@/reactflowConfig";
import {
  addChild,
  withoutIncomer,
  withoutOutgoer,
} from "../../utils/handleHelper";
import { EndNodeEditor } from "../NodeEditor";

const CircleBox = styled(Box)`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${color.end};
  font-size: small;
  font-weight: bold;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 0.5px solid black;
  &:focus {
    box-shadow: 0 0 0 0.5px #1a192b;
  }
  &:hover:not(:focus) {
    box-shadow: 0 4px 4px 1px rgba(0, 0, 0, 0.08);
  }
`;

export const StartNode = memo(function StartNode(props: any) {
  return (
    <div className="nodrag">
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "#555", width: "3px", height: "3px" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={props.isConnectable}
      />
      )<CircleBox tabIndex={0}>{props.data.label}</CircleBox>
    </div>
  );
});

export const EndNode = memo(function EndNode(props: any) {
  const reactFlowInstance = useReactFlow();
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <div>
      <EndNodeEditor
        nodeId={props.id}
        data={props.data}
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "#555", width: "3px", height: "3px" }}
        isValidConnection={(connection) => {
          // 1. 連向 End target 的 source node 不可為 End
          // 2. 連向 End target 的 source node 為 Normal 時 source Node 只能連出一條 connection
          const sourceNode = reactFlowInstance.getNode(connection.source);
          const targetNode = reactFlowInstance.getNode(connection.target);
          return (
            sourceNode.type !== typeNames.endNode &&
            (sourceNode.type === typeNames.normalNode
              ? withoutOutgoer(sourceNode, reactFlowInstance)
              : true) &&
            withoutIncomer(targetNode, reactFlowInstance)
          );
        }}
        onConnect={(connection) => {
          // 將 target node id 加入 source node的 data.children
          console.log(connection.source, " to ", connection.target);
          addChild(reactFlowInstance, connection.source, connection.target);
        }}
        isConnectable={props.isConnectable}
      />

      <CircleBox
        tabIndex={0}
        onClick={() => {
          setOpenDrawer(true);
        }}
      >
        {props.data.label}
      </CircleBox>
    </div>
  );
});
