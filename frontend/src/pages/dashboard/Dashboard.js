import React, { useState } from "react";
import {
  Grid
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
// styles
import useStyles from "./styles";
import SalesChart from "../../components/Chart/SalesChart"
// components
import PageTitle from "../../components/PageTitle";

export default function Dashboard(props) {
    const classes = useStyles();
    const theme = useTheme();
  return (
    <>
      <PageTitle
          title="Dashboard"
      />
      <Grid container spacing={4}>
        <Grid item xs={12}>
            <SalesChart />
        </Grid>
      </Grid>
    </>
  );
}


