import React, {
    useState
} from "react";
import {
    Button,
    Chip,
    Grid, Input, Paper, Table, TableBody, TableCell, TableRow, TextField
} from "@material-ui/core";
// import { useTheme } from "@material-ui/styles";
// styles
import useStyles from "./styles";
// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import UseCaseCard from "../../components/UseCaseCard"
const useCaseList = [
    {
        id: 1,
        question: "매장에서 가장 추천하는 메뉴가 무엇입니까?",
        answer: "저희 식당의 추천 메뉴는 대창 큐브 스테이크 덮밥입니다."
    },
    {
        id: 2,
        question: "매장에서 가장 추천하는 음료가 무엇입니까?",
        answer: "복숭아 에이드입니다."
    },
    {
        id: 3,
        question: "여기 주소가 어떻게 돼?",
        answer: "서울 성동구 연무장7가길 3 1층 입니다."
    },
]
export default function UseCaseManagement(props) {
    const classes = useStyles();
    // const theme = useTheme();
    return (
        <>
            <PageTitle title="주미 학습하기"/>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Widget disableWidgetMenu>
                        {useCaseList.map((useCase) => {
                            return <UseCaseCard
                                key={useCase.id}
                                question={useCase.question}
                                answer={useCase.answer}
                            />
                        })}
                    </Widget>
                </Grid>
            </Grid>
        </>
);
}


