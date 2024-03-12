import React, { useState } from 'react';
import CustomTable from './CustomTable';
import PageTitle from "../../components/PageTitle";
import { makeStyles } from "@material-ui/core/styles";
import {Paper } from "@material-ui/core";

// todo : 데이터 베이스 직접 받아서 처리할 수 있도록 ( get )
const datatableData = [
  { id: '1', image:"",name: "아메리카노", price: 2000, description: "에스프레소에 뜨거운 물을 추가하여 만듭니다.", category: "coffee", status: "활성화" },
  { id: '2', image:"",name: "카페라떼", price: 2500, description: "에스프레소에 우유를 넣음", category: "coffee", status: "비활성화" },
  { id: '3', image:"",name: "에스프레소", price: 1400, description: "진하고 강렬한 맛의 기본이 되는 커피.", category: "coffee", status: "활성화" },
  { id: '4', image:"",name: "아이스티", price: 3000, description: "아이스티입니다", category: "coffee", status: "비활성화" },
  { id: '5', image:"",name: "레몬에이드", price: 4000, description: "레몬에이드.", category: "ade", status: "활성화" },
  { id: '6', image:"",name: "케이크", price: 5000, description: "맛있음", category: "dessert", status: "비활성화" }
];

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    backgroundColor: "white",
    boxShadow:'0px 3px 11px 0px #E8EAFC,0 3px 3px -2px #B2B2B21A,0 1px 8px 0 #9A9A9A1A',
    padding: theme.spacing(2), // 내부 여백 설정
    paddingTop : "70px",
    position: 'relative', // 버튼의 절대 위치를 위해 relative 설정
  }
}));

export default function MenuManagement() {
  // const [dataList, setDataList] = useState(datatableData);
  const [dataList] = useState(datatableData);
  const classes = useStyles();
  return (
    < >
      <PageTitle title="메뉴 관리하기" />
      <div component={Paper} className={classes.tableContainer} elevation={0}>
        <CustomTable data={dataList} />
      </div>
    </>
  );
}
