import React from "react";
import styled from "styled-components";

import { spacing } from "@material-ui/system";
import {
  CssBaseline,
  Paper as MuiPaper,
} from "@material-ui/core";

import Navbar from "../components/navbar";

const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Paper = styled(MuiPaper)(spacing);

const MainContent = styled(Paper)`
  flex: 1;

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`;

class Layout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <Root>
        <AppContent>
          <Navbar />
          <MainContent>
            {children}
          </MainContent>
        </AppContent>
      </Root>
    );
  }
}

export default Layout;
