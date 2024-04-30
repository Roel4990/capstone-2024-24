import React, {
    useEffect,
    useState
} from "react";
import {
    Button,
    Paper, Table, TableBody, TableCell, TableRow, TextField
} from "@material-ui/core";
// import { useTheme } from "@material-ui/styles";
// styles
import useStyles from "./styles";
import {fetchBusinessItemsInfo, useGPTChatMutation} from "../../api/mutations";
import {useQuery} from "react-query";
export default function UseCaseCard(props) {
    const classes = useStyles();
    const [totalMenuList, setTotalMenuList] = useState([])
    const handleGPTChatSuccess = (data) => {
        // 로그인 성공 후 처리할 로직
        console.log('GPTChat 성공:', data);
        // alert(data)
    };
    const handleGPTChatError = (error) => {
        // 로그인 실패 후 처리할 로직
        console.error('GPTChat 실패:', error);
    };
    // 로그인
    const {
        mutate: GPTChatMutation
    } = useGPTChatMutation(
        handleGPTChatSuccess,
        handleGPTChatError
    )
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
                GPTChatMutation({
                    prompt: answerChange,
                    items: totalMenuList
                })
                setUseCase({...useCase, "answer": answerChange})
            } else {
                setAnswerChange(useCase.answer)
            }
        }

        setIsUpdateMode(!isUpdateMode);
    }
    const { data: businessItemsInfo, isLoading : businessItemsInfoIsLoading, isError: businessItemsInfoIsError } = useQuery('businessItemsInfo', fetchBusinessItemsInfo);
    useEffect(() => {
        if (!businessItemsInfoIsLoading && !businessItemsInfoIsError && businessItemsInfo) {
            // 데이터가 로드되었고, 에러가 없을 경우 상태 업데이트
            setTotalMenuList(businessItemsInfo.data)
        }
    }, [businessItemsInfo, businessItemsInfoIsLoading, businessItemsInfoIsError]); // 의존성 배열에 businessInfo, isLoading, isError를 추가
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


