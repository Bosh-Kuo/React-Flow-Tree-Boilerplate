import { MarkerType } from "reactflow";
import {
  BranchNode,
  EndNode,
  NormalNode,
  StartNode,
} from "./components/CustomNode";

// 定義所有 custom nodes 的 type name
export const typeNames = {
  startNode: "Start Node",
  endNode: "End Node",
  normalNode: "Normal Node",
  branchNode: "Branch Node",
};

export const nodeTypes = {
  [typeNames.startNode]: StartNode,
  [typeNames.endNode]: EndNode,
  [typeNames.normalNode]: NormalNode,
  [typeNames.branchNode]: BranchNode,
};

export const handleTypes = {
  branchSource: "branchSource",
  branchTarget: "branchTarget",
  normalSource: "normalSource",
  normalTarget: "normalTarget",
  normalLoopTarget: "normalLoopTarget",
  endTarget: "endTarget",
};

export const defaultEdgeOptions: any = {
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 20,
    height: 20,
  },
  style: {
    strokeWidth: 1.5,
  },
  type: "smoothstep",
  // animated: true,
};
