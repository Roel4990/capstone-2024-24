import React, {
    useState
} from "react";
import {
    Box,
    Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid,
    Paper, Table, TableBody, TableCell, TableRow, TextField, Typography
} from "@material-ui/core";
import useStyles from "./styles";
import {usePromptCreateMutation, useGPTChatMutation, usePromptUpdateMutation} from "../../api/mutations";

export default function UseCaseCard(props) {
    const classes = useStyles();

    const handleGPTChatSuccess = (data) => {
        console.log('GPTChat 성공:', data);
        // alert(data)
        setResult1(`${promptText}`);
        setResult2(`${data.answer}`);
        // setSelectedResult(`${data.answer}`);
        setVisible(true);
    };
    const handleGPTChatError = (error) => {
        console.error('GPTChat 실패:', error);
    };
    // 로그인
    const {
        mutate: GPTChatMutation
    } = useGPTChatMutation(
        handleGPTChatSuccess,
        handleGPTChatError
    )

    const handlePromptCreateSuccess = (data) => {
        console.log('프롬프트 생성 성공:', data);

    };
    const handlePromptCreateError = (error) => {
        console.error('프롬프트 생성 실패:', error);
    };
    const {
        mutate: promptCreateMutation,
    } = usePromptCreateMutation(
        handlePromptCreateSuccess,
        handlePromptCreateError
    );

    const handlePromptUpdateSuccess = (data) => {
        console.log('프롬프트 업데이트 성공:', data);

    };
    const handlePromptUpdateError = (error) => {
        console.error('프롬프트 업데이트 실패:', error);

    };
    const {
        mutate: promptUpdateMutation,
    } = usePromptUpdateMutation(
        handlePromptUpdateSuccess,
        handlePromptUpdateError
    );
    const [useCase, setUseCase] = useState(props); // 새 항목의 상태
    const [visible, setVisible] = useState(false);
    const [useCaseModalOpen, setUseCaseModalOpen] = useState(false)
    const [promptText, setPromptText] = useState(props.answer);
    const [result1, setResult1] = useState('');
    const [result2, setResult2] = useState('');
    const [selectedResult, setSelectedResult] = useState('result2');
    const [menuList , setMenuList] = useState(props.menuList)
    const [selectedMenus, setSelectedMenus] = useState([]);

    const handleUpdateMode = (e) => {
        setUseCaseModalOpen(true)
    }

    const handleUseCaseModalClose = () => {
        setUseCaseModalOpen(false)
        setSelectedMenus([])
        setMenuList(props.menuList)
        setVisible(false);
    }
    const handleUseCaseSave = () => {
        const answer = selectedResult === "result1" ? result1 : result2
        promptUpdateMutation(props.id, {
            question: props.question,
            answer,
            items: []
        })
        setUseCaseModalOpen(false)
        setVisible(false);
    }
    const handleTransform = () => {
        console.log("변환")
        setVisible(false);
        GPTChatMutation({
            question: props.question,
            prompt: promptText
        })
    }
    const handlePromptChange = (event) => {
        setPromptText(event.target.value);
    };

    const handleResultSelection = (event) => {
        console.log(event)
        // setSelectedResult(event.target.value);
        // setSelectedResult(event);
        setSelectedResult(event)
    };
    const handleMenuToggle = (menu) => {
        const isAlreadySelected = selectedMenus.some(selectedMenu => selectedMenu.id === menu.id);
        if (isAlreadySelected) {
            setMenuList(prev => [...prev, menu])
            setSelectedMenus(prev => prev.filter(item => item.id !== menu.id));
        } else {
            setMenuList(prev => prev.filter(item => item.id !== menu.id))
            setSelectedMenus(prev => [...prev, menu]);
        }
    };
    const isSelected = (value) => selectedResult === value
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
                                    {useCase.question}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center"
                                           className={classes.tableHeaderCell}
                                           style={{ width: '20%' }}>답변</TableCell>
                                <TableCell align="left"
                                           style={{ width: '80%' }}>
                                    {useCase.answer}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <div className={classes.rightAlignContainer}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpdateMode}
                    >
                        수정하기
                    </Button>
                </div>
            </Paper>
            <Dialog open={useCaseModalOpen} onClose={handleUseCaseModalClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">주미 학습</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <Typography variant="h6" className={classes.questionTitle}>
                        {props.question}
                    </Typography>
                    {Array.isArray(props.items) ?
                        <>
                            <Typography variant="h7" className={classes.questionTitle}>
                                추천메뉴를 선택해 주세요!
                            </Typography>
                            <Box className={classes.scrollableGrid}>
                                {menuList.filter(menu => !selectedMenus.includes(menu)).map(menu => (
                                    <Grid item xs={4} key={menu.id}>
                                        <Box
                                            key={menu.id}
                                            className={classes.menuItem}
                                            onClick={() => handleMenuToggle(menu)}
                                        >
                                            <div className={classes.menuImage} style={{
                                                backgroundImage: `url(${menu.imageUrl})`,
                                            }}>
                                                {!menu.imageUrl && "NO IMAGE"}
                                            </div>
                                            <Typography style={{textAlign: "center", wordBreak: "break-word"}}>{menu.name}</Typography>
                                        </Box>
                                    </Grid>
                                ))}

                            </Box>
                            <Typography variant="h7" className={classes.questionTitle}>
                               선택된 추천 메뉴
                            </Typography>
                            <Box className={classes.scrollableGrid}>
                                {selectedMenus.filter(menu => !menuList.includes(menu)).map(menu => (
                                    <Grid item xs={4} key={menu.id}>
                                        <Box
                                            key={menu.id}
                                            className={classes.menuItem}
                                            onClick={() => handleMenuToggle(menu)}
                                        >
                                            <div className={classes.menuImage} style={{
                                                backgroundImage: `url(${menu.imageUrl})`,
                                            }}>
                                                {!menu.imageUrl && "NO IMAGE"}
                                            </div>
                                            <Typography>{menu.name}</Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Box>
                        </>
                        :
                        <TextField
                            margin="dense"
                            label="답변을 작성해 주세요."
                            type="text"
                            multiline
                            rows={6}
                            variant="outlined"
                            name="answer"
                            onChange={handlePromptChange}
                            value={promptText || ""}
                            // onChange={handleUpdateChange}
                            fullWidth
                            className={classes.textFieldCustom}
                        />
                    }

                    <Box className={classes.buttonContainer}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleTransform}
                        >
                            GPT 변환
                        </Button>
                    </Box>
                    {visible ? (
                        <Box className={classes.resultContainer}>
                            <Box
                                className={`${classes.resultBox} ${isSelected("result1") ? classes.selectedBox : ''}`}
                                onClick={() => handleResultSelection("result1")}
                            >
                                <Typography variant="subtitle1">원본</Typography>
                                <Typography variant="body2">{result1}</Typography>
                            </Box>
                            <Box
                                className={`${classes.resultBox} ${isSelected("result2") ? classes.selectedBox : ''}`}
                                onClick={() => handleResultSelection("result2")}
                            >
                                <Typography variant="subtitle1">GPT-4</Typography>
                                <Typography variant="body2">{result2}</Typography>
                            </Box>
                        </Box>
                    ) : (
                       ""
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUseCaseModalClose} color="secondary">
                        닫기
                    </Button>
                    {visible ?
                    <Button onClick={handleUseCaseSave} color="primary">
                        저장하기
                    </Button> : <></>}
                </DialogActions>
            </Dialog>
        </>
    );
}


