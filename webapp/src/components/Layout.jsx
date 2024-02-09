import pages from "./pages.json";
import {Outlet} from "react-router-dom";
import React from "react";
import {Button, Container, Flex, Grid, GridItem, Link, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";


function TopBar() {
  function parseMenu(page){
    return <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {page.name}
      </MenuButton>
      <MenuList>
        {page.children.map(p => <MenuItem as={Link} href={p.link}>{p.name}</MenuItem>)}
      </MenuList>
    </Menu>
  }

  function parsePage(page) {
    if (page.children !== undefined) {
      return parseMenu(page)
    }
    return <Button as={Link} href={page.link} mr={"1vw"}>{page.name}</Button>
  }

  return <Grid padding={"1.5vh 1.5vw"}
            bgColor="#365486" as="nav" templateColumns={"repeat(5, 20%);"}>
      <GridItem colSpan={4}>
      { pages.map(page => parsePage(page)) }
      </GridItem>
      <GridItem as={Flex} justifyContent={"right"}>
        <Button as={Link} mr={"1vw"}>Log in</Button>
        <Button as={Link} mr={"1vw"}>Register</Button>
      </GridItem>
    </Grid>
}
export default function Layout() {
  return <>
    <TopBar />
    <Container bgColor="#7FC7D9">
      <Outlet />
    </Container>
  </>
}