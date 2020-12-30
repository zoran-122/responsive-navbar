import React from "react";
import styled, { css } from "styled-components";

import {
  List as MuiList,
  ListItem as MuiListItem,
  MenuItem as MuiMenuItem,
  Collapse as MuiCollapse,
  SwipeableDrawer as MuiSwipeableDrawer
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import { NabItem } from "../index";

interface ShowMoreSideMenuProps {
  items: NabItem[];
  open: boolean;
  collapseId: number;
  handleToggle: (event: any) => void;
  handleClose: (event: any) => void;
  handleCollapse: (id: number) => void;
}

const SwipeableDrawer = styled(MuiSwipeableDrawer)`
  top: 70px !important;
  .MuiBackdrop-root {
    top: 70px !important;
  }
  .MuiPaper-root {
    top: 70px !important;
  }
  @media(min-width: 991px) {
    display: none !important;
  }
`;

const Collapse = styled(MuiCollapse)`
  background-color: #f9f9f9 !important;
  border-bottom: 2px solid #f2f2f2;
`;

const SubMenuItem = styled(MuiMenuItem)`
  padding: 10px 20px !important;
  font-size: 18px !important;
`;

const List = styled(MuiList)`
  width: 250px;
  font-size: 20px;
`;

interface ListItemProps {
  selected?: boolean;
}

const ListItem = styled(MuiListItem)<ListItemProps>((props) => `
  justify-content: space-between !important;
  color: #44566e !important;
  padding: 20px !important;
  ${props.selected && css `
    border-bottom: 2px solid #c6c6c6 !important;
  `}
`);

function ShowMoreSideMenu(props: ShowMoreSideMenuProps) {
  const { items, open, collapseId, handleToggle, handleClose, handleCollapse } = props;
  return (
    <SwipeableDrawer
      anchor={"left"}
      onClose={handleToggle}
      onOpen={handleToggle}
      open={open}>
      <div role="presentation">
        <List>
          {
            items.map((item, index) => (
              <div key={index}>
                {
                  item.children ?
                    <>
                      <ListItem selected={item.id === collapseId} button onClick={() => handleCollapse(item.id)}>
                        <span>{item.title}</span>
                        {
                          collapseId === item.id ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>
                        }
                      </ListItem>
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
                    <ListItem button onClick={handleClose}>
                      {item.title}
                    </ListItem>
                }
              </div>
            ))
          }
        </List>
      </div>
    </SwipeableDrawer>
  );
}

export default ShowMoreSideMenu;
