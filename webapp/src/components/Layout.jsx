import pages from "./pages.json";
import {Outlet} from "react-router-dom";
import React from "react";
import {Button, Container, Flex, Grid, GridItem, Link, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";

export function TopBar() {

  const { t } = useTranslation();

  function parseMenu(page){
    return <Menu key={page.name}>
      <MenuButton as={Button} key={page.name} rightIcon={<ChevronDownIcon />} data-testid={page.name}>
        {t(page.name)}
      </MenuButton>
      <MenuList>
        {page.children.map(p => <MenuItem key={p.name} as={Link} href={p.link} data-testid={p.name}>{t(p.name)}</MenuItem>)}
      </MenuList>
    </Menu>
  }

  function parsePage(page) {
    if (page.children !== undefined) {
      return parseMenu(page)
    }
    return <Button key={page.name} as={Link} href={page.link} mr={"1vw"} data-testid={page.name}>{t(page.name)}</Button>
  }

  return <Grid padding={"1.5vh 1.5vw"}
            bgColor="#365486" as="nav" 
            templateColumns={"repeat(5, 20%)"}>
      <GridItem colSpan={4} key={"left-navbar"}>
      { pages.map(page => parsePage(page)) }
      </GridItem>
      <GridItem as={Flex} justifyContent={"right"} key={"right-navbar"}>
        <Button as={Link} mr={"1vw"}>{t("nav.login")}</Button>
        <Button as={Link} mr={"1vw"}>{t("nav.register")}</Button>
      </GridItem>
    </Grid>
}
export default function Layout() {
  return <>
    <TopBar />
    <Container bgColor="#DCF2F1" minW={"100%"} minH={"100%"}>
      <Outlet />
    </Container>
  </>
}