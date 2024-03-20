import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
  Box,
  Paper
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import CustomCard from "../../components/Card";
// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";
import google from "../../images/google.svg";

// context
import { useUserDispatch } from "../../context/UserContext";

// 예제 데이터
const initialCardData = [
    {
      logo: '/testImage1.png',
      title: '스타벅스',
      description: '스타벅스임다.',
      date: '생성일: 2024-03-20',
    },{
      logo: '/testImage2.jpeg',
      title: '미도인',
      description: '미도인임다.',
      date: '생성일: 2024-03-20',
    },{
      logo: '/testImage2.jpeg',
      title: '미도인2',
      description: '미도인2임다.',
      date: '생성일: 2024-03-20',
    },{
      logo: '/testImage2.jpeg',
      title: '미도인3',
      description: '미도인3임다.',
      date: '생성일: 2024-03-20',
    }
]

function Login(props) {
  var classes = useStyles();
  const [cardData, setCardData] = useState(initialCardData);
  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [selectCompany, setSelectCompany] = useState(0)
  var [nameValue, setNameValue] = useState("");
  var [loginValue, setLoginValue] = useState("admin@flatlogic.com");
  var [passwordValue, setPasswordValue] = useState("password");
  // 회원가입 함수
  const createUser = () => {
    // todo : 회원가입 API 및 로그인 API
    console.log(nameValue)
    console.log(loginValue)
    console.log(passwordValue)
    setIsLoading(true)
    // 매장 선택하기로 수정
    setTimeout(() => {
      localStorage.setItem('id_token', 1)
      setIsLoading(false)
      setError(null)
      setSelectCompany(1)
    }, 2000);
    // loginUser(userDispatch,
    //     loginValue,
    //     passwordValue,
    //     props.history,
    //     setIsLoading,
    //     setError)
  };
  // 로그인 함수
  const loginUser = () => {
    console.log(loginValue)
    console.log(passwordValue)
    setIsLoading(true)
    if (!!loginValue && !!passwordValue) {
      setTimeout(() => {
        localStorage.setItem('id_token', 1)
        setSelectCompany(1)
        setError(null)
        setIsLoading(false)
        // history.push('/app/dashboard')
      }, 2000);
    }
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
    const newCard = {
      logo: '/testImage1.jpeg',
      title: '스타벅스2',
      description: '스타벅스2임다.',
      date: '생성일: 2024-03-20',
    };
    setCardData([...cardData, newCard]); // 기존 cardData에 새 카드 추가
  };

  return (
    <Grid container className={classes.container}>
      {/*<div className={classes.logotypeContainer}>*/}
      {/*  /!*<img src={logo} alt="logo" className={classes.logotypeImage} />*!/*/}
      {/*  <Typography className={classes.logotypeText}>Kiumee Admin</Typography>*/}
      {/*</div>*/}
      {selectCompany === 0 ? (
            // selectCompany가 0일 때 보여줄 컴포넌트나 JSX
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
                      <Fade in={error}>
                        <Typography color="secondary" className={classes.errorMessage}>
                          Something is wrong with your login or password :(
                        </Typography>
                      </Fade>
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
                                    loginUser()
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
                      <Fade in={error}>
                        <Typography color="secondary" className={classes.errorMessage}>
                          Something is wrong with your login or password :(
                        </Typography>
                      </Fade>
                      <TextField
                          id="name"
                          InputProps={{
                            classes: {
                              underline: classes.textFieldUnderline,
                              input: classes.textField,
                            },
                          }}
                          value={nameValue}
                          onChange={e => setNameValue(e.target.value)}
                          margin="normal"
                          placeholder="Full Name"
                          type="text"
                          fullWidth
                      />
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
                                    passwordValue.length === 0 ||
                                    nameValue.length === 0
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
        ) : (
            // selectCompany가 0이 아닐 때 보여줄 컴포넌트나 JSX
            <div
                className={classes.customFormContainer}
                style={{
                    marginTop: 50
                  }}
            >
                {cardData.map((data, index) => (
                    <CustomCard key={index} {...data} updateCard={updateCard} className={classes.marginTop}/>
                ))}
              <Button
                  variant="contained"
                  color="primary"
                  className={classes.addButton}
                  onClick={handleAddCard}
              >
                +
              </Button>
            </div>

        )
      }

    </Grid>
  );
}

export default withRouter(Login);
