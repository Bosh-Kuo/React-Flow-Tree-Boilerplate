# React Flow Tree Boilerplate

![React Flow Tree](https://res.cloudinary.com/djtoo8orh/image/upload/v1685179904/React%20Flow%20Tree/React_Flow_Tree_f0hah4.png)

## Introduction
Welcome to the React Flow Tree project, a frontend-only boilerplate built on top of the powerful **[React Flow library](https://reactflow.dev/)**. This project empowers you to effortlessly create tree-like workflows by leveraging custom nodes divided into four distinct categories: Start Node, End Node, Normal Node, and Branch Node. Whether you're designing complex workflows or simplifying your data visualization, this project provides the foundation you need to bring your ideas to life.

I have defined some [connection rules](./Connection-Rules.md) to constraint the connection relation between different custom nodes, ensuring a stable and tree-like structure for your workflows. Feel free to customize and enhance this boilerplate according to your specific needs and workflow requirements!


## Demo
### Tree Example
![Tree Example](https://res.cloudinary.com/djtoo8orh/image/upload/v1685203255/React%20Flow%20Tree/tree-example-compressed_vgjxsi.gif)



### Save & Restore Example
![Save & Restore Example](https://res.cloudinary.com/djtoo8orh/image/upload/v1685203249/React%20Flow%20Tree/save-example-compressed_pazfbx.gif)

### Functionality Example
![Functionality Example](https://res.cloudinary.com/djtoo8orh/image/upload/v1685203249/React%20Flow%20Tree/functionality-example-compressed_jc466f.gif)

## Development
- Install dependencies
```shell
yarn install
```

- Run
```shell
yarn dev
```

- Format
```shell
yarn format-write
```

## Features
### Node
- [x] Customized nodes
- [x] Creating specific types of nodes
- [x] Drag and Drop
- [x] Deleting nodes
- [x] Controlling node connection interactions
- [x] Sidebar Editor for modifying node information
### Edge
- [x] Creating connections
- [x] Deleting connections
- [x] Customizing edge styles
- [x] Self-connections
### Overall
- [x] Undo/redo modifications
- [x] Exporting JSON file
- [x] Expand and collapse
- [x] Clearing the canvas
- [x] Auto Layout
- [x] When deleting a single node, delete the subtree and all connections of the deleted nodes
- [x] Copy and paste (Ctrl + C, Ctrl + V)


## Stack
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React Flow](https://reactflow.dev/)
- [elkjs](https://github.com/kieler/elkjs)
- [MUI](https://mui.com/)
- [emotion](https://emotion.sh/docs/introduction)

## Todo
- [] Add typing check
- [] Turn back to strict mode