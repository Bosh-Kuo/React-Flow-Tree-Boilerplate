// 回傳包含 root 的 subtree nodes array
const collectSubtreeNodes = (root, reactFlowInstance) => {
  const traverseSubtree = (node, subtreeNodes) => {
    const childrenIDs = node.data.children;
    console.log(childrenIDs);
    if (childrenIDs) {
      for (const childID of childrenIDs) {
        const childNode = reactFlowInstance.getNode(childID);
        subtreeNodes.push(childNode);
        traverseSubtree(childNode, subtreeNodes);
      }
    }
  };
  const subtreeNodes = [root];
  traverseSubtree(root, subtreeNodes);
  return subtreeNodes;
};

// 回傳 foldable nodes
const collectFoldableNodes = (root, reactFlowInstance) => {
  const traverseFoldableNodes = (
    node,
    reactFlowInstance,
    collectedNodes,
    isRoot = false,
  ) => {
    // 如果不是根節點且節點的 fold 屬性為 true，停止搜集子節點
    if (!isRoot && node.data.fold) {
      return;
    }
    const childrenIDs = node.data.children;
    if (childrenIDs) {
      for (const childID of childrenIDs) {
        const childNode = reactFlowInstance.getNode(childID);
        collectedNodes.push(childNode);
        traverseFoldableNodes(childNode, reactFlowInstance, collectedNodes);
      }
    }
  };

  const foldableNodes = [];
  traverseFoldableNodes(root, reactFlowInstance, foldableNodes, true);
  return foldableNodes;
};

// 回傳 parent node
const getParentNode = (targetNode, reactFlowInstance) => {
  const parentNode = reactFlowInstance
    .getNodes()
    .find((node) => node.data.children?.includes(targetNode.id));
  return parentNode;
};

export { collectSubtreeNodes, collectFoldableNodes, getParentNode };
