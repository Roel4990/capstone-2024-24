import React, { useState } from 'react';
import CustomTable from './CustomTable';
import PageTitle from "../../components/PageTitle";
import useStyles from "./styles";



export default function MenuManagement() {
  const classes = useStyles();
  return (
    < >
      <PageTitle title="메뉴 관리하기" />
      <div className={classes.tableContainer}>
        <CustomTable/>
      </div>
    </>
  );
}
