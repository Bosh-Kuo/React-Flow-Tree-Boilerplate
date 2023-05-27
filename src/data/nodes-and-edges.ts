import { handleTypes, typeNames } from "../reactflowConfig";

export const initialNodes = [
  {
    id: "start",
    position: { x: 50, y: 0 },
    data: { label: "start", fold: false },
    type: typeNames.startNode,
  },
  {
    id: "N1",
    position: { x: 0, y: 100 },
    data: {
      label: "N1",
      fold: false,
    },
    type: typeNames.normalNode,
  },
  {
    id: "B1",
    position: { x: 0, y: 200 },
    data: { label: "B1", fold: false },
    type: typeNames.branchNode,
  },
  {
    id: "N2",
    position: { x: -300, y: 300 },
    data: {
      label: "N2",
      fold: false,
    },
    type: typeNames.normalNode,
  },
  {
    id: "N3",
    position: { x: 0, y: 300 },
    data: {
      label: "N3",
      fold: false,
    },
    type: typeNames.normalNode,
  },
  {
    id: "E1",
    position: { x: 300, y: 300 },
    data: { label: "E1", fold: false },
    type: typeNames.endNode,
  },
  {
    id: "B2",
    position: { x: -300, y: 400 },
    data: { label: "B2", fold: false },
    type: typeNames.branchNode,
  },
  {
    id: "B3",
    position: { x: 0, y: 400 },
    data: { label: "B3", fold: false },
    type: typeNames.branchNode,
  },
  {
    id: "E2",
    position: { x: -350, y: 500 },
    data: { label: "E2", fold: false },
    type: typeNames.endNode,
  },
  {
    id: "E3",
    position: { x: -150, y: 500 },
    data: { label: "E3", fold: false },
    type: typeNames.endNode,
  },
  {
    id: "E4",
    position: { x: 50, y: 500 },
    data: { label: "E4", fold: false },
    type: typeNames.endNode,
  },
];
export const initialEdges: any = [
  { id: "start", source: "start", target: "N1", data: { loop: false } },
  { id: "N1-C1", source: "N1", target: "B1", data: { loop: false } },
  {
    id: "B1-N2",
    source: "B1",
    target: "N2",
    data: { loop: false, condition: "normal condition" },
  },
  {
    id: "B1-N3",
    source: "B1",
    target: "N3",
    data: { loop: false, condition: "normal condition" },
  },
  {
    id: "B1-E1",
    source: "B1",
    target: "E1",
    data: { loop: false, condition: "normal condition" },
  },
  { id: "N2-B2", source: "N2", target: "B2", data: { loop: false } },
  { id: "N3-B3", source: "N3", target: "B3", data: { loop: false } },
  {
    id: "B2-N2",
    source: "B2",
    target: "N2",
    data: { loop: true, condition: "loop condition" },
    targetHandle: handleTypes.normalLoopTarget,
  },
  {
    id: "B3-N3",
    source: "B3",
    target: "N3",
    data: { loop: true, condition: "loop condition" },
    targetHandle: handleTypes.normalLoopTarget,
  },
  {
    id: "B3-N2",
    source: "B3",
    target: "N2",
    data: { loop: true, condition: "loop condition" },
    targetHandle: handleTypes.normalLoopTarget,
  },
  {
    id: "B2-E2",
    source: "B2",
    target: "E2",
    data: { loop: false, condition: "normal condition" },
  },
  {
    id: "B2-E3",
    source: "B2",
    target: "E3",
    data: { loop: false, condition: "normal condition" },
  },
  {
    id: "B3-E4",
    source: "B3",
    target: "E4",
    data: { loop: false, condition: "normal condition" },
  },
];
