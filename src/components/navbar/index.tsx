import React, { Fragment, useState, useEffect } from "react";
import styled, { css } from "styled-components";

import {
  Box,
  AppBar as MuiAppBar,
  List as MuiList,
  ListItem as MuiListItem,
  Toolbar as MuiToolbar
} from "@material-ui/core";

import DropdownMenu from "./dropdownMenu";
import ShowMoreMenu from "./showMoreMenu";

export interface NabSubItem {
  title: string;
}

export interface NabItem {
  id: number;
  title: string;
  children?: NabSubItem[];
}

const AppBar = styled(MuiAppBar)`
  background: #fff !important;
  color: #afafaf !important;
  font-size: 20px;
  max-width: 100vw !important;
`;

const Toolbar = styled(MuiToolbar)`
  min-height: unset !important;
  max-width: 100%;
  justify-content: space-between !important;
`;

const Brand = styled(Box)`
  min-width: 165px;
  font-style: italic;
`;

const List = styled(MuiList)`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 !important;
  overflow: hidden;
`;

interface ListItemProps {
  selected: boolean;
}

const ListItem = styled(MuiListItem)<ListItemProps>((props) => `
  width: 180px !important;
  justify-content: center !important
  height: 70px !important;
  ${props.selected && css`
    color: #44566e !important;
    border-bottom: 2px solid !important;
  `}
`);

function Navbar() {
  const items: NabItem[] = [
    {
      id: 1,
      title: "Components",
    },
    {
      id: 2,
      title: "Components1",
      children: [
        {
          title: "Action"
        },
        {
          title: "Another Action"
        },
        {
          title: "Something else here"
        },
      ]
    },
    {
      id: 3,
      title: "Components2",
    },
    {
      id: 4,
      title: "Components3",
    },
    {
      id: 5,
      title: "Components4",
      children: [
        {
          title: "Action"
        },
        {
          title: "Another Action"
        },
        {
          title: "Something else here"
        },
      ]
    },
    {
      id: 6,
      title: "Components5",
    },
    {
      id: 7,
      title: "Components6",
    },
  ];

  const [activeId, setActiveId] = useState(0);
  const [navItems, setNavItems] = useState(items);
  const [navMoreItems, setNavMoreItems] = useState(items);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    const el = document.getElementById("nav-list");
    const cnt = Math.floor( (el ? (el.clientWidth - 50) : 0) / 180);
    setNavItems(items.slice(0, cnt));
    setNavMoreItems(items.slice(cnt, items.length));
  };

  return (
    <AppBar>
      <Toolbar>
        <Brand>
          <span>Visual Language</span>
        </Brand>
        <List id="nav-list">
          {
            navItems.map((item, index) => (
              <Fragment key={index}>
                {item.children ?
                  <DropdownMenu item={item} activeId={activeId} onClick={() => setActiveId(item.id)} /> :
                  <ListItem button selected={item.id === activeId} onClick={() => setActiveId(item.id)}>{item.title}</ListItem>
                }
              </Fragment>
            ))
          }
        </List>
        {navMoreItems.length > 0 && <ShowMoreMenu items={navMoreItems} />}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
