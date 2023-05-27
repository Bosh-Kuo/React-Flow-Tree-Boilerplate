import { DragEvent, useCallback, useRef, useState } from "react";
import { useEdges, useNodes, useReactFlow } from "reactflow";
import AddIcon from "@mui/icons-material/Add";
import AssistantPhotoIcon from "@mui/icons-material/AssistantPhoto";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CleaningServicesOutlinedIcon from "@mui/icons-material/CleaningServicesOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import ForkRightIcon from "@mui/icons-material/ForkRight";
import RemoveIcon from "@mui/icons-material/Remove";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useTheme } from "@mui/material";
import {
  AppBar,
  Avatar,
  Box,
  ButtonBase,
  ClickAwayListener,
  Divider,
  Fab,
  Fade,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Toolbar,
} from "@mui/material";
import ELK from "elkjs/lib/elk.bundled.js";
import { typeNames } from "../../reactflowConfig";

export const BottomToolBar = () => {
  const nodes = useNodes();
  const edges = useEdges();
  const [openSetting, setOpenSetting] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const settingAnchorRef = useRef(null);
  const addAnchorRef = useRef(null);
  const theme = useTheme();
  const reactFlowInstance = useReactFlow();

  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const elk = new ELK({
    defaultLayoutOptions: {
      "elk.algorithm": "mrtree",
      "elk.direction": "DOWN",
      "elk.spacing.nodeNode": "75",
      "elk.layered.mergeEdges": "true",
      "elk.insideSelfLoops.activate": "true",
      "elk.spacing.individual": "50",
      "elk.edgeRouting": "SPLINES",
    },
  });

  const createLayout: any = async function (nodes, edges) {
    const newGraph = await elk.layout({
      id: "root",
      children: nodes,
      edges: edges,
    });

    const layoutNodes = newGraph?.children?.map((node) => {
      const newNode = { ...node, position: { x: node.x, y: node.y } };
      return newNode;
    });
    const layoutEdges = newGraph?.edges;

    return { layoutNodes, layoutEdges };
  };

  const onAutoLayout = async function (nodes, edges) {
    const { layoutNodes, layoutEdges } = await createLayout(nodes, edges);
    reactFlowInstance.setNodes(layoutNodes);
    reactFlowInstance.setEdges(layoutEdges);
  };

  const onReset = async () => {
    const newNodes = reactFlowInstance
      .getNodes()
      .filter((node) => node.id === "start" || node.id === "end");
    const newEdges = [];

    const { layoutNodes, layoutEdges } = await createLayout(newNodes, newEdges);
    reactFlowInstance.setNodes(layoutNodes);
    reactFlowInstance.setEdges(layoutEdges);
  };

  const onExport = useCallback(() => {
    const fileName = "data.json";
    const data = new Blob([JSON.stringify({ nodes, edges })], {
      type: "text/json",
    });
    const jsonURL = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = jsonURL;
    link.setAttribute("download", fileName);
    link.click();
    document.body.removeChild(link);
  }, [nodes, edges]);

  return (
    <AppBar position="relative" color="inherit" elevation={5}>
      <Toolbar>
        {/* Setting */}
        <Box>
          <ButtonBase
            sx={{
              borderRadius: "50%",
              "&:focus": {
                outline: "none",
              },
            }}
            ref={settingAnchorRef}
            onClick={() => setOpenSetting((prevOpen) => !prevOpen)}
          >
            <Avatar
              variant="rounded"
              sx={{
                transition: "all .3s ease-in-out",
                borderRadius: "25%",
                background: theme.palette.secondary.light,
                color: theme.palette.secondary.dark,
                "&:hover": {
                  background: theme.palette.secondary.dark,
                  color: theme.palette.secondary.light,
                },
              }}
            >
              <SettingsOutlinedIcon />
            </Avatar>
          </ButtonBase>
          <Popper
            open={openSetting}
            anchorEl={settingAnchorRef.current}
            placement="bottom-start"
            transition
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                  <ClickAwayListener
                    onClickAway={(event) => {
                      if (
                        settingAnchorRef.current &&
                        settingAnchorRef.current.contains(event.target)
                      ) {
                        return;
                      }
                      setOpenSetting(false);
                    }}
                  >
                    <List>
                      <ListItemButton
                        onClick={() => {
                          onAutoLayout(
                            reactFlowInstance.getNodes(),
                            reactFlowInstance.getEdges(),
                          );
                        }}
                      >
                        <ListItemIcon>
                          <AutoFixHighOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Auto Layout"
                          primaryTypographyProps={{ fontWeight: "bold" }}
                        />
                      </ListItemButton>
                      <Divider />
                      <ListItemButton onClick={onReset}>
                        <ListItemIcon>
                          <CleaningServicesOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Reset"
                          primaryTypographyProps={{ fontWeight: "bold" }}
                        />
                      </ListItemButton>
                      <Divider />
                      <ListItemButton onClick={onExport}>
                        <ListItemIcon>
                          <FileDownloadOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Export Data"
                          primaryTypographyProps={{ fontWeight: "bold" }}
                        />
                      </ListItemButton>
                    </List>
                  </ClickAwayListener>
                </Paper>
              </Fade>
            )}
          </Popper>
        </Box>
        {/* Add */}
        <Box sx={{ paddingLeft: "10px" }}>
          <Fab
            size="small"
            color="primary"
            sx={{
              "&:focus": {
                outline: "none",
              },
            }}
            ref={addAnchorRef}
            onClick={() => setOpenAdd((prevOpen) => !prevOpen)}
          >
            {openAdd ? <RemoveIcon /> : <AddIcon />}
          </Fab>
          <Popper
            open={openAdd}
            anchorEl={addAnchorRef.current}
            placement="bottom-start"
            transition
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                  <ClickAwayListener
                    onClickAway={(event) => {
                      if (
                        addAnchorRef.current &&
                        addAnchorRef.current.contains(event.target)
                      ) {
                        return;
                      }
                      setOpenAdd(false);
                    }}
                  >
                    <List>
                      <ListItemButton
                        sx={{
                          "&:hover": {
                            bgcolor: "#e3f2fd",
                            borderRadius: "4px",
                            outline: "2px solid #000000",
                          },
                        }}
                        onDragStart={(event) =>
                          onDragStart(event, typeNames.branchNode)
                        }
                        draggable
                      >
                        <ListItemIcon>
                          <ForkRightIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Branch Node"
                          primaryTypographyProps={{ fontWeight: "bold" }}
                        />
                      </ListItemButton>
                      <Divider />
                      <ListItemButton
                        sx={{
                          "&:hover": {
                            bgcolor: "#fbe9e7",
                            borderRadius: "4px",
                            outline: "2px solid #000000",
                          },
                        }}
                        onDragStart={(event) =>
                          onDragStart(event, typeNames.normalNode)
                        }
                        draggable
                      >
                        <ListItemIcon>
                          <CallMadeIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Normal Node"
                          primaryTypographyProps={{ fontWeight: "bold" }}
                        />
                      </ListItemButton>
                      <Divider />
                      <ListItemButton
                        sx={{
                          "&:hover": {
                            bgcolor: "#dcdbdb",
                            borderRadius: "4px",
                            outline: "2px solid #000000",
                          },
                        }}
                        onDragStart={(event) =>
                          onDragStart(event, typeNames.endNode)
                        }
                        draggable
                      >
                        <ListItemIcon>
                          <AssistantPhotoIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="End Node"
                          primaryTypographyProps={{ fontWeight: "bold" }}
                        />
                      </ListItemButton>
                    </List>
                  </ClickAwayListener>
                </Paper>
              </Fade>
            )}
          </Popper>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
