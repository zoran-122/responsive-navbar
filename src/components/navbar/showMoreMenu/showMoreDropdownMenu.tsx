import React from "react";
import styled, { css } from "styled-components";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import {
  Grow,
  Popper as MuiPopper,
  Paper,
  MenuList as MuiMenu,
  MenuItem as MuiMenuItem,
  Collapse as MuiCollapse,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import { NabItem } from "../index";

interface ShowMoreDropdownMenuProps {
  items: NabItem[];
  open: boolean;
  anchorRef: any;
  collapseId: number;
  handleClose: (event: any) => void;
  handleListKeyDown: (event: any) => void;
  handleCollapse: (id: number) => void;
}

const Popper = styled(MuiPopper)`
  @media(max-width: 991px) {
    display: none !important;
  }
`;

const Menu = styled(MuiMenu)`
  width: 200px;
  color: #44566e !important;
`;

interface MenuItemProps {
  selected?: boolean;
}

const MenuItem = styled(MuiMenuItem)<MenuItemProps>((props) => `
  justify-content: space-between !important;
  padding: 15px 10px 15px 20px !important;
  font-size: 20px !important;
  ${props.selected && css`
    color: #444448 !important;
    border-bottom: 2px solid !important;
  `}
`);

const Collapse = styled(MuiCollapse)`
  background-color: #f9f9f9 !important;
  border-bottom: 2px solid #f2f2f2;
`;

const SubMenuItem = styled(MuiMenuItem)`
  padding: 10px 20px !important;
  font-size: 18px !important;
`;

function ShowMoreDropdownMenu(props: ShowMoreDropdownMenuProps) {
  const { items, open, anchorRef, collapseId, handleClose, handleCollapse, handleListKeyDown } = props;
  return (
    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
      {({TransitionProps, placement}) => (
        <Grow
          {...TransitionProps}
          style={{transformOrigin: placement === "bottom" ? "center top" : "center bottom"}}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <Menu autoFocusItem={open} onKeyDown={handleListKeyDown}>
                {
                  items.map((item, index) => (
                    <div key={index}>
                      {
                        item.children ?
                          <>
                            <MenuItem selected={collapseId === item.id}
                                      onClick={() => handleCollapse(item.id)}>
                              <span>{item.title}</span>
                              {
                                collapseId === item.id ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>
                              }
                            </MenuItem>
                            <Collapse
                              in={collapseId === item.id}
                              timeout="auto"
                              unmountOnExit
                            >
                              {
                                item.children.map((child, index) => (
                                  <SubMenuItem key={index} onClick={handleClose}>
                                    {child.title}
                                  </SubMenuItem>
                                ))
                              }
                            </Collapse>
                          </> :
                          <MenuItem key={index} onClick={handleClose}>
                            {item.title}
                          </MenuItem>
                      }
                    </div>
                  ))
                }
              </Menu>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
}

export default ShowMoreDropdownMenu;
