import React, {
    useState
} from "react";
import {
    Grid
} from "@material-ui/core";
// import { useTheme } from "@material-ui/styles";
// styles
import useStyles from "./styles";
// components
import PageTitle from "../../components/PageTitle";

export default function UseCaseManagement(props) {
    // const classes = useStyles();
    // const theme = useTheme();
    return (
        <>
            <PageTitle
                title="주미 학습하기"
            />
            <Grid container spacing={4}>
                <Grid item xs={12}>

                </Grid>
            </Grid>
        </>
    );
}


