import React, {
    useState
} from "react";
import {
    Button,
    Paper, Table, TableBody, TableCell, TableRow, TextField
} from "@material-ui/core";
// import { useTheme } from "@material-ui/styles";
// styles
import useStyles from "./styles";
export default function UseCaseCard(props) {
    const classes = useStyles();
    const [useCase, setUseCase] = useState(props); // 새 항목의 상태
    const [answerChange, setAnswerChange] = useState(props.answer)
    const [isUpdateMode, setIsUpdateMode] = useState(false)
    const handleChangeAnswer = (e) => {
        const {value } = e.target;
        setAnswerChange(value);
    };
    const handleUpdateMode = (e) => {
        if(isUpdateMode) {
            if(window.confirm("저장하시겠습니까?")) {
                setUseCase({...useCase, "answer": answerChange})
            } else {
                setAnswerChange(useCase.answer)
            }
        }
        setIsUpdateMode(!isUpdateMode);
    }
    return (
        <>
            <Paper
                style={{
                    marginTop: "20px"
                }}
            >
                <div className={classes.tableSection}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableBody>
                            <TableRow>
                                <TableCell align="center"
                                           className={classes.tableHeaderCell}
                                           style={{width: '20%'}}>질문</TableCell>
                                <TableCell align="left"
                                           style={{width: '80%'}}>
                                    {/*가장 추천하는 메뉴가 무엇인가요?*/}
                                    {useCase.question}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center"
                                           className={classes.tableHeaderCell}
                                           style={{ width: '20%' }}>답변</TableCell>
                                <TableCell align="left"
                                           style={{ width: '80%' }}>
                                    {isUpdateMode ? (
                                        <TextField
                                            multiline
                                            rows={4} // 최소 표시 줄 수를 설정합니다.
                                            variant="outlined"
                                            name="answer"
                                            value={answerChange}
                                            onChange={handleChangeAnswer}
                                            style={{ width: "100%" }}
                                        />
                                    ) : (
                                        useCase.answer
                                    )}

                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                {/* 저장 버튼 */}
                <div className={classes.rightAlignContainer}>
                    <Button
                        variant="contained"
                        color={isUpdateMode ? (
                            "primary"
                        ):(
                            "secondary"
                        )}
                        onClick={handleUpdateMode}
                    >
                        {isUpdateMode ? (
                            "저장하기"
                        ):(
                            "수정하기"
                        )}
                    </Button>
                </div>
            </Paper>
        </>
    );
}


