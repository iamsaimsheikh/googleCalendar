import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Header from "../layouts/Header";
import Demo from "../demo";
import { useContext } from "react";
import Sidebar from "../layouts/Sidebar";
import { GlobalContext } from "../contexts/GlobalContext";
import "../assets/Style.css";

const Calendar = () => {
  const { open } = useContext(GlobalContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container xs={12}>
        <Header />
      </Grid>
      <Grid container xs={12} style={{ marginTop: "10px" }}>
        <Grid item xs={open === true ? 2.5 : 0} style={{ zIndex: "10" }}>
          <Sidebar />
        </Grid>
        <Grid
          item
          xs={open === true ? 9.5 : 12}
          style={{
            justifyContent: "end",
            zIndex: "0",
          }}
        >
          <Demo />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Calendar;
