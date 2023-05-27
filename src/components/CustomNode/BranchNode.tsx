import { memo, useState } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import { handleTypes, typeNames } from "../../reactflowConfig";
import {
  addChild,
  withoutIncomer,
  withoutOutgoer,
} from "../../utils/handleHelper";
import { color } from "../Layout";
import { BranchNodeEditor } from "../NodeEditor";
import NodeBlock from "./NodeBlock";

export const BranchNode = memo(function BranchNode(props: any) {
  const reactFlowInstance = useReactFlow();
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <BranchNodeEditor
        nodeId={props.id}
        data={props.data}
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
      <Handle
        type="target"
        id={handleTypes.branchTarget}
        position={Position.Top}
        style={{ background: "#555", width: "3px", height: "3px" }}
        isValidConnection={(connection) => {
          // 1. 連向 Branch target 的 source Node 只能是 Normal
          // 2. 連向 Branch target 的 source Node 只能連出一條 connection
          // 3. Branch target 只能接收一條 connection
          const sourceNode = reactFlowInstance.getNode(connection.source);
          const targetNode = reactFlowInstance.getNode(connection.target);
          return (
            sourceNode.type === typeNames.branchNode &&
            withoutIncomer(targetNode, reactFlowInstance) &&
            withoutOutgoer(sourceNode, reactFlowInstance)
          );
        }}
        onConnect={(connection) => {
          // 將 target node id  加入 source node 的 data.children
          console.log(connection.source, " to ", connection.target);
          addChild(reactFlowInstance, connection.source, connection.target);
        }}
        isConnectable={props.isConnectable}
      />
      <NodeBlock
        id={props.id}
        color={color.condition}
        setOpenDrawer={setOpenDrawer}
      />
      <Handle
        type="source"
        id={handleTypes.branchSource}
        position={Position.Bottom}
        style={{ background: "#555", width: "3px", height: "3px" }}
        isValidConnection={(connection) => {
          // 1. Branch source 向外連的 target Node 不能是 Branch
          // 2. Branch source 向外連的 target 不是 Normal Loop Target 時，target 只能接收一條 connection
          const targetNode = reactFlowInstance.getNode(connection.target);

          return (
            targetNode.type !== typeNames.branchNode &&
            (connection.targetHandle !== handleTypes.normalLoopTarget
              ? withoutIncomer(targetNode, reactFlowInstance)
              : true)
          );
        }}
        onConnect={(connection) => {
          // Branch source 向外連的 target 不是 Normal Loop Target 時，將 target 加入 source 的 data.children
          console.log(connection.source, " to ", connection.target);
          if (connection.targetHandle !== handleTypes.normalLoopTarget) {
            addChild(reactFlowInstance, connection.source, connection.target);
          }
        }}
        isConnectable={props.isConnectable}
      />
    </>
  );
});
