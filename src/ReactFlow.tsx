import { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Panel,
  addEdge,
  getConnectedEdges,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import RestorePageTwoToneIcon from "@mui/icons-material/RestorePageTwoTone";
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import { initialEdges, initialNodes } from "./data/nodes-and-edges";
import { defaultEdgeOptions, nodeTypes } from "./reactflowConfig";
import { collectSubtreeNodes, getParentNode } from "./utils/treeUtils";

const flowKey = "example-flow";

export default function ReactFlowComponent() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const reactFlowRef = useRef(null);
  // console.log("nodes", nodes);
  // console.log("edges", edges);

  const onNodesDelete = (deleted) => {
    // * 刪除該 node 的 subtree 以及所有與被刪除的 nodes 相連的 edges
    // 單獨刪除一個 node 時:
    if (deleted.length === 1) {
      const deletedNode = deleted[0];
      // 從 parentNode 的 data.children 移除被刪除的 node
      const parentNode = getParentNode(deletedNode, reactFlowInstance);
      if (parentNode) {
        parentNode.data.children = parentNode.data.children.filter(
          (child) => child !== deletedNode.id,
        );
      }
      // 找出欲刪除的 nodes, edges
      const deletedNodes = collectSubtreeNodes(deletedNode, reactFlowInstance);
      const deletedEdges = getConnectedEdges(deletedNodes, edges);

      console.log(deletedNodes);
      console.log(deletedEdges);

      const remainNodes = nodes.filter(
        (node) =>
          !deletedNodes.some((deletedNode) => deletedNode.id === node.id),
      );
      const remainEdges = edges.filter(
        (edge) =>
          !deletedEdges.some((deletedEdge) => deletedEdge.id === edge.id),
      );

      setNodes(remainNodes);
      setEdges(remainEdges);
    }
  };
  const onEdgesDelete = (deleted) => {
    // 單獨刪除一個 edge 時:
    if (deleted.length === 1) {
      // 移除 sourceNode 的 data.children 中的 deletedEdge.target
      const deletedEdge = deleted[0];
      const sourceNode: any = nodes.find(
        (node) => node.id === deletedEdge.source,
      );
      // 刪除的 edge 非 loop edge，則將 target 從 source.data.children 中移除
      if (!deletedEdge.loop) {
        sourceNode.data.children = sourceNode.data.children?.filter(
          (child) => child !== deletedEdge.target,
        );
      }
    }
    setNodes(nodes);
  };

  const onConnect = useCallback(
    (params) => {
      // 當 targetHandle 為 questionLoop 時，加入 data:{loop:true}
      if (params.targetHandle === "questionLoop") {
        params = { ...params, data: { ...params.data, loop: true } };
      } else {
        params = { ...params, data: { ...params.data, loop: false } };
      }
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowRef.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: uuidv4(),
        type,
        position,
        data: { label: `${type}`, fold: false },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes],
  );

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [reactFlowInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));

      if (flow) {
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
      }
    };

    restoreFlow();
  }, [setNodes, setEdges]);

  // 畫面第一次渲染時在 node.data 加入 children 建立 Tree 資料結構
  useEffect(() => {
    edges.forEach((edge) => {
      if (!edge.data.loop) {
        const sourceNodeId = edge.source;
        const targetNodeId = edge.target;
        // 找出該 edge 對應的 source node
        const sourceNode: any = nodes.find((node) => node.id === sourceNodeId);
        // 如果找到 source node，將 target 加入到其 children array
        if (sourceNode) {
          if (!sourceNode.data.children) {
            sourceNode.data.children = []; // 若 children array 不存在，則建立新的空陣列
          }
          if (!sourceNode.data.children.includes(targetNodeId)) {
            sourceNode.data.children.push(targetNodeId);
          }
        }
      }
    });
    setNodes(nodes);
  }, []);

  return (
    <ReactFlow
      ref={reactFlowRef}
      fitView
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      defaultEdgeOptions={defaultEdgeOptions}
      connectionLineType={defaultEdgeOptions.type}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodesDelete={onNodesDelete}
      onEdgesDelete={onEdgesDelete}
      onInit={setReactFlowInstance}
      onDrop={onDrop}
      onDragOver={onDragOver}
      attributionPosition="top-right"
    >
      <Panel position="top-right">
        <Button onClick={onSave} startIcon={<SaveTwoToneIcon />}>
          Save
        </Button>
        <Button onClick={onRestore} startIcon={<RestorePageTwoToneIcon />}>
          Restore
        </Button>
      </Panel>
      <Controls
        style={{
          left: "0.5%",
          bottom: "40%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <MiniMap zoomable pannable />
      <Background variant={BackgroundVariant.Dots} />
    </ReactFlow>
  );
}
