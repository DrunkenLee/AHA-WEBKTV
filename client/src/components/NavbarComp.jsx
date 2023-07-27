import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../store/actions/actionCreator";
import { motion } from "framer-motion";
const NavbarComp = () => {
  const themeState = useSelector((state) => state.theme.themeState);
  const dispatch = useDispatch();
  const handleModeToggle = () => {
    dispatch(setTheme());
    console.log(themeState);
  };
  return (
    <Navbar
      className={themeState ? "bg-light text-dark" : "bg-dark text-light"}
      variant={themeState ? "dark" : "light"}
    >
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d05a6334-611d-4cc7-9d4f-43c8edc71b6c/ddah6l6-013ceeaa-ad70-4582-9bb7-c40e62b99d99.png/v1/fill/w_900,h_349/_mock__tcn_logo____hd_remake_by_mjabieraofc_ddah6l6-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MzQ5IiwicGF0aCI6IlwvZlwvZDA1YTYzMzQtNjExZC00Y2M3LTlkNGYtNDNjOGVkYzcxYjZjXC9kZGFoNmw2LTAxM2NlZWFhLWFkNzAtNDU4Mi05YmI3LWM0MGU2MmI5OWQ5OS5wbmciLCJ3aWR0aCI6Ijw9OTAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.aAahHYDorFqXSs3u0crudxG8dCqphGTEE-OH0u-TkUE"
            width="250"
            height="100"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <div>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              onClick={handleModeToggle}
              variant={themeState ? "dark" : "light"}
            >
              {themeState ? "Dark" : "Light"}
            </Button>
          </motion.button>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
