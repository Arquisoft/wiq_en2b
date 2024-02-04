import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Outlet} from "react-router-dom";
import {useMediaQuery} from "@mui/material";
import Link from "@mui/material/Link";
import {useEffect, useState} from "react";


function TopBar() {

  const pages = ['Play', 'Statistics', 'API Docs'];
  const isMobile = useMediaQuery("@media screen and (max-width: 950px)");

  const [position, setPosition] = useState("static");
  const [direction, setDirection] = useState("row");

  useEffect(() => {
    setPosition(isMobile ? "static" : "relative");
    setDirection(isMobile ? "column" : "row")
  },[isMobile]);

  return (
    <AppBar position={position} sx={{backgroundColor: "#365486" }}>
      <Container maxWidth="xl">
        <Toolbar>
          <Typography sx={{
            mr: 2,
            fontSize: 24,
            display: {xs: 'none', md: 'flex'},
            fontFamily: 'monospace',
            fontWeight: 400,
            letterSpacing: '.3rem',
            textDecoration: 'none',
          }}>WIQ_EN2B</Typography>
          <Container sx={{display: "flex", flexDirection: direction}}>
            {pages.map((page) => (
              <Link
                key={page}
                to={page.url}
                sx={{my: 2, color: 'white', display: 'block',  marginRight: "2%"}}
              >
                {page}
              </Link>
            ))}
          </Container>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default function Layout() {
  return <>
    <TopBar />
    <Container maxWidth="lg" minWidth="sm" xs={{backgroundColor:"#7FC7D9"}}>
      <Outlet />
    </Container>
  </>
}