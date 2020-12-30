import React, { Fragment } from "react";
import styled, { css } from "styled-components";

import {
  Menu,
  ListItem as MuiListItem,
  MenuItem as MuiMenuItem,
  withStyles
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import { NabItem } from "../index";

interface DropdownMenuProps {
  item: NabItem;
  activeId: number;
  onClick: any;
}

interface StyledMenuProps {
  open: boolean;
  keepMounted: boolean;
  onClose: () => void;
  anchorEl: any;
}

const StyledMenu = withStyles({
  paper: {
    boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    width: 180
  },
})((props: StyledMenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    open={props.open}
    {...props}
  />
));

interface ListItemProps {
  selected: boolean;
}

const ListItem = styled(MuiListItem)<ListItemProps>((props) => `
  justify-content: space-between !important;
  width: 180px !important;
  height: 70px !important;
  ${props.selected && css`
    color: #44566e !important;
    border-bottom: 2px solid !important;
  `}
`);

const MenuItem = styled(MuiMenuItem)`
  font-size: 20px !important;
  white-space: initial !important;
  line-height: 1 !important;
  padding: 1rem !important;
  color: #afafaf !important;
`;

function DropdownMenu({ item, activeId, onClick }: DropdownMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    onClick();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <ListItem
        button
        aria-haspopup="true"
        selected={item.id === activeId}
        onClick={handleClick}
      >
        <span>{item.title}</span>
        {
          Boolean(anchorEl) ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>
        }
      </ListItem>
      <StyledMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {
          item.children && item.children.map((item, index) => (
            <MenuItem key={index} onClick={handleClose}>
              {item.title}
            </MenuItem>
          ))
        }
      </StyledMenu>
    </Fragment>
  );
}

export default DropdownMenu;
