import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade, DialogTitle, DialogContent, DialogActions, Dialog
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import CustomCard from "../../components/Card";
import CollectionsIcon from "@material-ui/icons/Collections";
// styles
import useStyles from "./styles";
// context
import {signOut, useUserDispatch} from "../../context/UserContext";
import axios from "axios";
import {useMutation} from "react-query";
// 예제 데이터
const initialCardData = [
    // {
    //   logo: '/Midoin/MidoinLogo.jpeg',
    //   name: '스타벅스',
    //   description: '강남점',
    //   date: '생성일: 2024-03-20',
    // }
]

const loginUser = async (userData) => {
  const response = await axios.post('https://jumi-api.youchu.io/v1/login', userData);
  return response.data;
};

function Login(props) {
  const classes = useStyles();
  const [cardData, setCardData] = useState(initialCardData);
  // local
  const [isLoading, setIsLoading] = useState(false);
  // var [error, setError] = useState(null);
  const [activeTabId, setActiveTabId] = useState(0);
  const [selectCompany, setSelectCompany] = useState(0)
  const [nameValue, setNameValue] = useState("");
  const [loginValue, setLoginValue] = useState("testUserName");
  const [passwordValue, setPasswordValue] = useState("123456");
  const [open, setOpen] = useState(false); // 모달 상태
  // 새로운 매장 추가하기
  const [newItem, setNewItem] = useState({ name: '', description: '', logo: ''}); // 새 항목의 상태
  const [cardImagePreview, setCardImagePreview] = useState(null); // 이미지 미리보기 URL 상태
  const userDispatch = useUserDispatch();
  const { mutate, data, error } = useMutation(loginUser, {
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data) => {
      setIsLoading(false);
      // 로그인 성공 시 필요한 작업을 수행
      localStorage.setItem('id_token', data.token.accessToken)
      setSelectCompany(1)
    },
    onError: (error) => {
      setIsLoading(false);
      console.error('Login failed:', error);
      // 로그인 실패 시 필요한 작업을 수행
    },
  });

  // 회원가입 함수
  const createUser = () => {
    // todo : 회원가입 API 및 로그인 API
    setIsLoading(true)
    // 매장 선택하기로 수정
    setTimeout(() => {
      localStorage.setItem('id_token', 1)
      setIsLoading(false)
      // setError(null)
      setSelectCompany(1)
    }, 2000);
  };
  // 로그인 함수
  const customLoginUser = () => {
    setIsLoading(true)
    mutate({ username: loginValue, password: passwordValue });

    // if (!!loginValue && !!passwordValue) {
    //   setTimeout(() => {
    //     localStorage.setItem('id_token', 1)
    //     setSelectCompany(1)
    //     setError(null)
    //     setIsLoading(false)
    //     // history.push('/app/dashboard')
    //   }, 2000);
    // }
  }
  // 카드 데이터 업데이트 함수
  const updateCard = (id, updatedData) => {
    const updatedCards = cardData.map(card => {
      if (card.id === id) {
        return { ...card, ...updatedData };
      }
      return card;
    });
    setCardData(updatedCards);
  };
  const handleAddCard = () => {
    setCardData([...cardData, newItem]); // 기존 cardData에 새 카드 추가
    // 모달 닫기
    handleClose()
  };

  // 매장 생성함수
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setNewItem({ name: '', description: '', logo: '' })
    setCardImagePreview("")
    setOpen(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };
  const handleCardImageChange = (e) => {
    const file = e.target.files[0];
    const { name } = e.target;
    // todo : image 보내서 링크로 받기
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItem({ ...newItem, [name]:reader.result ,"imageFile": file });
        setCardImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      {selectCompany === 0 ? (
          <Grid container className={classes.container}>
            {/*// selectCompany가 0일 때 보여줄 컴포넌트나 JSX*/}
            <div className={classes.formContainer}>
              <div className={classes.form}>
                <Tabs
                    value={activeTabId}
                    onChange={(e, id) => setActiveTabId(id)}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                  <Tab label="로그인" classes={{ root: classes.tab }} />
                  <Tab label="회원가입" classes={{ root: classes.tab }} />
                </Tabs>
                {activeTabId === 0 && (
                    <React.Fragment>
                      {/*<Fade in={error}>*/}
                      {/*  <Typography color="secondary" className={classes.errorMessage}>*/}
                      {/*    Something is wrong with your login or password :(*/}
                      {/*  </Typography>*/}
                      {/*</Fade>*/}
                      <TextField
                          id="email"
                          InputProps={{
                            classes: {
                              underline: classes.textFieldUnderline,
                              input: classes.textField,
                            },
                          }}
                          value={loginValue}
                          onChange={e => setLoginValue(e.target.value)}
                          margin="normal"
                          placeholder="Email Adress"
                          type="email"
                          fullWidth
                      />
                      <TextField
                          id="password"
                          InputProps={{
                            classes: {
                              underline: classes.textFieldUnderline,
                              input: classes.textField,
                            },
                          }}
                          value={passwordValue}
                          onChange={e => setPasswordValue(e.target.value)}
                          margin="normal"
                          placeholder="Password"
                          type="password"
                          fullWidth
                      />
                      <div className={classes.formButtons}>
                        {isLoading ? (
                            <CircularProgress size={26} className={classes.loginLoader} />
                        ) : (
                            <Button
                                disabled={
                                    loginValue.length === 0 || passwordValue.length === 0
                                }
                                onClick={() =>
                                    customLoginUser()
                                }
                                variant="contained"
                                color="primary"
                                size="large"
                            >
                              Login
                            </Button>
                        )}
                        <Button
                          color="primary"
                          size="large"
                          className={classes.forgetButton}
                        >
                          Forget Password
                        </Button>
                      </div>
                    </React.Fragment>
                )}
                {activeTabId === 1 && (
                    <React.Fragment>
                      {/*<Fade in={error}>*/}
                      {/*  <Typography color="secondary" className={classes.errorMessage}>*/}
                      {/*    Something is wrong with your login or password :(*/}
                      {/*  </Typography>*/}
                      {/*</Fade>*/}
                      {/*<TextField*/}
                      {/*    id="name"*/}
                      {/*    InputProps={{*/}
                      {/*      classes: {*/}
                      {/*        underline: classes.textFieldUnderline,*/}
                      {/*        input: classes.textField,*/}
                      {/*      },*/}
                      {/*    }}*/}
                      {/*    value={nameValue}*/}
                      {/*    onChange={e => setNameValue(e.target.value)}*/}
                      {/*    margin="normal"*/}
                      {/*    placeholder="Full Name"*/}
                      {/*    type="text"*/}
                      {/*    fullWidth*/}
                      {/*/>*/}
                      <TextField
                          id="email"
                          InputProps={{
                            classes: {
                              underline: classes.textFieldUnderline,
                              input: classes.textField,
                            },
                          }}
                          value={loginValue}
                          onChange={e => setLoginValue(e.target.value)}
                          margin="normal"
                          placeholder="Email Adress"
                          type="email"
                          fullWidth
                      />
                      <TextField
                          id="password"
                          InputProps={{
                            classes: {
                              underline: classes.textFieldUnderline,
                              input: classes.textField,
                            },
                          }}
                          value={passwordValue}
                          onChange={e => setPasswordValue(e.target.value)}
                          margin="normal"
                          placeholder="Password"
                          type="password"
                          fullWidth
                      />
                      <div className={classes.creatingButtonContainer}>
                        {isLoading ? (
                            <CircularProgress size={26} />
                        ) : (
                            <Button
                                onClick={() =>
                                    createUser()
                                }
                                disabled={
                                    loginValue.length === 0 ||
                                    passwordValue.length === 0
                                    // nameValue.length === 0
                                }
                                size="large"
                                variant="contained"
                                color="primary"
                                fullWidth
                                className={classes.createAccountButton}
                            >
                              Create your account
                            </Button>
                        )}
                      </div>
                    </React.Fragment>
                )}
              </div>
            </div>
          </Grid>
        ) : (
          <Grid container className={classes.selectStoreContainer}>
            {/*// selectCompany가 0이 아닐 때 보여줄 컴포넌트나 JSX*/}
            <div
                className={classes.customFormContainer}
                style={{
                    marginTop: 50,
                    width: "50%"
                }}
            >
              <Grid container spacing={2} style={{ marginTop: 50 }}>
                <Grid item xs={12} className={classes.addButtonContainer} >
                  <Button onClick={() => signOut(userDispatch, props.history)} color="secondary">다시 계정으로 로그인하기</Button>
                  <Button onClick={handleOpen} color="primary">매장 추가하기</Button>
                </Grid>
                {/*<div className={classes.cardContainer}>*/}
                {cardData.map((data, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <CustomCard key={index} {...data} updateCard={updateCard} className={classes.marginTop}/>
                    </Grid>
                ))}
              </Grid>
                {/*</div>*/}
              <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">매장 추가하기</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                  {/* 이미지 업로드 필드 */}
                  <input
                      accept="image/*"
                      style={{display: 'none'}}
                      id="raised-button-file"
                      name="logo"
                      type="file"
                      onChange={handleCardImageChange}
                  />
                  <div style={{position: 'relative', width: "auto", maxWidth: '452px', height: '452px', alignContent: "center"}}>
                    {/* 이미지 미리보기 */}
                    <div
                        style={{
                          width: '100%',
                          height: '100%',
                          marginTop: '10px',
                          border: '1px solid #ddd',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundImage: `url(${cardImagePreview})`,
                        }}
                    >
                      {!cardImagePreview && '이미지 업로드'}
                    </div>
                    {/* 이미지 업로드 버튼 */}
                    <label htmlFor="raised-button-file" style={{
                      position: 'absolute',
                      bottom: '10px', // 버튼의 위치를 이미지 아래쪽에 배치
                      right: '10px', // 버튼의 위치를 이미지 오른쪽에 배치
                      background: 'white', // 버튼의 배경색
                      borderRadius: '10%', // 버튼을 원형으로 만듬
                      cursor: 'pointer' // 마우스 오버 시 커서를 손가락 모양으로 변경
                    }}>
                      <Button variant="contained" component="span" style={{padding: 0, minWidth: 0}}>
                        <CollectionsIcon/>
                      </Button>
                    </label>
                  </div>
                  <TextField
                      autoFocus
                      margin="dense"
                      name="name"
                      label="매장명"
                      type="text"
                      fullWidth
                      onChange={handleChange}
                      style={{
                        marginTop: "20px"
                      }}
                  />
                  <TextField
                      margin="dense"
                      name="description"
                      label="지점"
                      type="text"
                      fullWidth
                      onChange={handleChange}
                  />
                  {/* 상태는 기본적으로 '활성화'로 설정 */}
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="secondary">
                    취소
                  </Button>
                  <Button onClick={handleAddCard} color="primary">
                    추가
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </Grid>
        )
      }
    </div>
  );
}

export default withRouter(Login);
