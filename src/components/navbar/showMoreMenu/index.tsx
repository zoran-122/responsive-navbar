import React, { useState, useRef, Fragment } from "react";
import styled, { css } from "styled-components";

import {
  ListItem as MuiListItem,
} from "@material-ui/core";
import FormatLineSpacingIcon from "@material-ui/icons/FormatLineSpacing";

import { NabItem } from "../index";
import ShowMoreDropdownMenu from "./showMoreDropdownMenu";
import ShowMoreSideMenu from "./showMoreSideMenu";

interface ShowMoreMenuProps {
  items: NabItem[];
}

interface ShowMoreButtonProps {
  open: boolean;
}

const ShowMoreButton = styled(MuiListItem)<ShowMoreButtonProps>((props) => `
  justify-content: space-between !important;
  padding: 20px 15px !important;
  font-weight: bold;
  min-width: 170px !important;
  width: 170px !important;
  ${props.open && css`
    color: #44566e !important;
  `}
`);

function ShowMoreMenu({ items }: ShowMoreMenuProps) {
  const [open, setOpen] = useState(false);
  const [collapseId, setCollapseId] = useState(0);
  const anchorRef = useRef(null);

  const handleToggle = (event) => {
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setCollapseId(0);
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    // @ts-ignore
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      // @ts-ignore
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleCollapse = (val) => {
    if (collapseId === val) {
      setCollapseId(0);
    } else {
      setCollapseId(val);
    }
  };

  return (
    <Fragment>
      <ShowMoreButton
        button
        ref={anchorRef}
        aria-haspopup="true"
        open={open}
        onClick={handleToggle}
      >
        <FormatLineSpacingIcon />
        <span>Show More</span>
      </ShowMoreButton>

      {
        window.innerWidth > 991 ?
          <ShowMoreDropdownMenu
            items={items}
            open={open}
            anchorRef={anchorRef}
            collapseId={collapseId}
            handleClose={handleClose}
            handleListKeyDown={handleListKeyDown}
            handleCollapse={handleCollapse}
          /> :
          <ShowMoreSideMenu
            items={items}
            open={open}
            collapseId={collapseId}
            handleToggle={handleToggle}
            handleClose={handleClose}
            handleCollapse={handleCollapse}
          />
      }
    </Fragment>
  );
}

export default ShowMoreMenu;
