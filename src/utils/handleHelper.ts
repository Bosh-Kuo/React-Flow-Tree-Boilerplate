import { getIncomers, getOutgoers } from "reactflow";
import { updateOneElementInArray } from "./updateElement";

// 判斷一 node 連入的 connection 數是否為 0
export const withoutIncomer = (node, reactFlowInstance) => {
  const nodes = reactFlowInstance.getNodes();
  const edges = reactFlowInstance.getEdges();
  const inComers = getIncomers(node, nodes, edges);
  return inComers.length === 0;
};

// 判斷一 node 連出的 connection 數是否為 0
export const withoutOutgoer = (node, reactFlowInstance) => {
  const nodes = reactFlowInstance.getNodes();
  const edges = reactFlowInstance.getEdges();
  const outGoer = getOutgoers(node, nodes, edges);
  return outGoer.length === 0;
};


// 將 target node id 推入 source node 的 children 中
export const addChild = (reactFlowInstance, sourceId, targetId) => {
  const newSourceNode = reactFlowInstance.getNode(sourceId);
  const nodes = reactFlowInstance.getNodes();
  if (newSourceNode) {
    if (!newSourceNode.data.children) {
      newSourceNode.data.children = []; // 若 children array 不存在，則建立新的空陣列
    }
    if (newSourceNode.data.children.includes(targetId)) return; // 若 targetId 已經在 children array 裡面則結束

    newSourceNode.data.children.push(targetId);
  }
  const newNodes = updateOneElementInArray(newSourceNode, nodes);
  reactFlowInstance.setNodes(newNodes);
};
