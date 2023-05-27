import { memo, useState } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import { handleTypes, typeNames } from "../../reactflowConfig";
import {
  addChild,
  withoutIncomer,
  withoutOutgoer,
} from "../../utils/handleHelper";
import { color } from "../Layout";
import { NormalNodeEditor } from "../NodeEditor";
import NodeBlock from "./NodeBlock";

export const NormalNode = memo(function NormalNode(props: any) {
  const reactFlowInstance = useReactFlow();
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <NormalNodeEditor
        nodeId={props.id}
        data={props.data}
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
      <Handle
        type="target"
        id={handleTypes.normalTarget}
        position={Position.Top}
        style={{ background: "#555", width: "3px", height: "3px" }}
        isValidConnection={(connection) => {
          // 1. 連向 Normal target 的 source Node 只能是 Condition
          // 2. Normal target 只能接收一條 connection
          const sourceNode = reactFlowInstance.getNode(connection.source);
          const targetNode = reactFlowInstance.getNode(connection.target);

          return (
            sourceNode.type === typeNames.branchNode &&
            withoutIncomer(targetNode, reactFlowInstance)
          );
        }}
        onConnect={(connection) => {
          // 將 target node id 加入 source node 的 data.children
          console.log(connection.source, " to ", connection.target);
          addChild(reactFlowInstance, connection.source, connection.target);
        }}
        isConnectable={props.isConnectable}
      />
      {/* //* 側邊多加一個 handle 處理 Loop */}
      <Handle
        type="target"
        id={handleTypes.normalLoopTarget}
        position={Position.Left}
        style={{ background: "#555", width: "3px", height: "3px" }}
        isValidConnection={(connection) => {
          // 連向 Normal 的 source Node 只可以為 Condition
          const sourceNode = reactFlowInstance.getNode(connection.source);
          return sourceNode.type === typeNames.branchNode;
        }}
        onConnect={(connection) => {
          // 不將 target node id 加入 source node 的 data.children
          console.log(connection.source, " to ", connection.target);
        }}
        isConnectable={props.isConnectable}
      />
      <NodeBlock
        id={props.id}
        color={color.question}
        setOpenDrawer={setOpenDrawer}
      />
      <Handle
        type="source"
        id={handleTypes.normalSource}
        position={Position.Bottom}
        style={{ background: "#555", width: "3px", height: "3px" }}
        isValidConnection={(connection) => {
          // 1. Normal source 向外連的 target target Node 不能是 Normal
          // 2. Normal source 只能連出一條 connection
          // 3. target 只能接收一條 connection
          const sourceNode = reactFlowInstance.getNode(connection.source);
          const targetNode = reactFlowInstance.getNode(connection.target);
          return (
            targetNode.type !== typeNames.normalNode &&
            withoutOutgoer(sourceNode, reactFlowInstance) &&
            withoutIncomer(targetNode, reactFlowInstance)
          );
        }}
        onConnect={(connection) => {
          // 將 target node id 加入 source node 的 data.children
          console.log(connection.source, " to ", connection.target);
          addChild(reactFlowInstance, connection.source, connection.target);
        }}
        isConnectable={props.isConnectable}
      />
    </>
  );
});
