import styled from "@emotion/styled";

export const toolbarHeight = 60;
export const buttonMargin = 15;
export const color = {
  question: "#fbe9e7",
  condition: "#e3f2fd",
  end: "#dcdbdb",
};
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

export const MainContent = styled.div`
  flex: auto;
  width: 100%;
  height: calc(100% - ${toolbarHeight * 2}px);
  background-color: rgb(245, 245, 245);
`;
