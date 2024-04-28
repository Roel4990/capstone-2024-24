import React, {
    // useState
    useEffect
} from "react";
import {
  Grid
} from "@material-ui/core";
// import { useTheme } from "@material-ui/styles";
// styles
// import useStyles from "./styles";
import SalesChart from "../../components/Chart/SalesChart"
import AgeGroupYearMonthSalesChart from "../../components/Chart/AgeGroupYearMonthSalesChart"
// components
import PageTitle from "../../components/PageTitle";
import {useUserDispatch} from "../../context/UserContext";

export default function Dashboard(props) {
    // const classes = useStyles();
    // const theme = useTheme();
    var userDispatch = useUserDispatch();
    useEffect(() => {
        if (!localStorage.getItem("company_id")) {
            userDispatch({ type: "SIGN_OUT_SUCCESS" });
            props.history.push("/login"); // 렌더링 후에 리디렉션
        }
    }, []); // 빈 배열로 useEffect는 한 번만 실행
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
      </Grid>
    </>
  );
}


