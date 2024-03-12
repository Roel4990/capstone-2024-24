import React from "react";
import { Grid, Typography, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

export default function StoreManagement() {
  const classes = useStyles();
  return (
    <>
      <PageTitle title="가게 관리하기" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {/*<MUIDataTable*/}
          {/*  title="Employee List"*/}
          {/*  data={datatableData}*/}
          {/*  columns={["Name", "Company", "City", "State"]}*/}
          {/*  options={{*/}
          {/*    filterType: "checkbox",*/}
          {/*  }}*/}
          {/*/>*/}
          <Grid item xs={12}>
            <Widget disableWidgetMenu>
              <Grid container item xs={12}>
                <Grid item xs={12}>
                  <Widget title="식당 설정하기" noWidgetShadow disableWidgetMenu noBodyPadding noHeaderPadding style={{paddingRight: 15}} headerClass={classes.widgetHeader}>
                    <Typography>
                      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                    </Typography>
                    <div className={classes.layoutContainer}>
                      <div className={classes.layoutButtonsRow}>
                      </div>
                    </div>
                  </Widget>
                </Grid>
              </Grid>
            </Widget>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {/*<Widget title="Material-UI Table" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>*/}
          {/*  <Table data={mock.table} />*/}
          {/*</Widget>*/}
        </Grid>
      </Grid>
    </>
  );
}
