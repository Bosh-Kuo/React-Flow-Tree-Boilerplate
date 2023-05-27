import { ReactFlowProvider } from "reactflow";
import { Container, MainContent } from "@components/Layout";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BottomToolBar } from "@/components/ToolBar";
import ReactFlowComponent from "./ReactFlow";
import { HeaderBar } from "./components/HeaderBar";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976D2",
    },
    secondary: {
      main: "#c2c2c2",
    },
  },
});
console.log(theme);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <ReactFlowProvider>
          <HeaderBar />
          <MainContent>
            <ReactFlowComponent />
          </MainContent>
          <BottomToolBar />
        </ReactFlowProvider>
      </Container>
    </ThemeProvider>
  );
}
