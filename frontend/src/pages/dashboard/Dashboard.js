import React, {
    // useState
} from "react";
import {
    Grid
} from "@material-ui/core";
// import { useTheme } from "@material-ui/styles";
// styles
// import useStyles from "./styles";
import SalesChart from "../../components/Chart/SalesChart"
import AgeGroupYearMonthSalesChart from "../../components/Chart/AgeGroupYearMonthSalesChart"
import OrderList from "../../components/Table/OrderList"
// components
import PageTitle from "../../components/PageTitle";

export default function Dashboard(props) {
    // const classes = useStyles();
    // const theme = useTheme();
  return (
    <>
      <PageTitle
          title="대쉬보드"
      />
      <Grid container spacing={4}>
        <Grid item xs={12}>
            <SalesChart />
        </Grid>
        <Grid item xs={12}>
          <AgeGroupYearMonthSalesChart />
        </Grid>
          <Grid item xs={12}>
              <OrderList />
          </Grid>
      </Grid>
    </>
  );
}


