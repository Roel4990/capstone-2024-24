import React, {useState} from 'react';
import useStyles from "./styles";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Tooltip,
    DialogTitle,
    DialogContent,
    Button,
    DialogActions,
    Dialog,
    List,
    ListItem,
    ListItemText,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle'; // 사용자 아이콘
import MenuCard from "../../MenuCard/MenuCard.js"
const orderData = [
    {
        id: 1,
        menuList: ["주미돈까스", "주미김밥"],
        price : 18000,
        orderDate: "2024. 05. 13 10:10",
        chatList: [
            {
                role: "assistant",
                text: "무엇을 도와드릴까요?",
                items: []
            },
            {
                role: "user",
                text: "추천 메뉴가 뭐야?",
                items: []
            },
            {
                role: "assistant",
                text: "추천하는 메뉴는 주미돈까스, 어묵우동입니다.",
                items: [
                        {
                            id: 1,
                            name: "주미돈까스",
                            price: 10000,
                            imageUrl: "https://reborn-image-test.s3.ap-northeast-2.amazonaws.com/dd20b95d-f4f3-43f2-aabb-b7854a82b1d1.jpeg"
                        },
                        {
                            id: 2,
                            name: "어묵우동",
                            price: 10000,
                            imageUrl: "https://reborn-image-test.s3.ap-northeast-2.amazonaws.com/dd20b95d-f4f3-43f2-aabb-b7854a82b1d1.jpeg"
                        }
                    ]
            },
            {
                role: "user",
                text: "주미 돈까스를 담아줘",
                items: []
            },
            {
                role: "assistant",
                text: "네 담아드렸습니다.",
                items: []
            },
        ]
    },
    {
        id: 2,
        menuList: ["쫄면", "참치 김밥"],
        price : 20300,
        orderDate: "2024. 05. 13 11:10",
        chatList: [
            {
                role: "assistant",
                text: "무엇을 도와드릴까요?",
                items: []
            },
            {
                role: "user",
                text: "추천 메뉴가 뭐야?",
                items: []
            },
            {
                role: "assistant",
                text: "추천하는 메뉴는 주미돈까스, 어묵우동입니다.",
                items: [
                    {
                        id: 1,
                        name: "주미돈까스",
                        price: 10000,
                        imageUrl: "https://reborn-image-test.s3.ap-northeast-2.amazonaws.com/dd20b95d-f4f3-43f2-aabb-b7854a82b1d1.jpeg"
                    },
                    {
                        id: 2,
                        name: "어묵우동",
                        price: 10000,
                        imageUrl: "https://reborn-image-test.s3.ap-northeast-2.amazonaws.com/dd20b95d-f4f3-43f2-aabb-b7854a82b1d1.jpeg"
                    }
                ]
            },
            {
                role: "user",
                text: "주미 돈까스를 담아줘",
                items: []
            },
            {
                role: "assistant",
                text: "네 담아드렸습니다.",
                items: []
            },
        ]
    },
    {
        id: 3,
        menuList: ["스팸김밥", "주미김밥"],
        price : 30000,
        orderDate: "2024. 05. 13 12:10",
        chatList: [
            {
                role: "assistant",
                text: "무엇을 도와드릴까요?",
                items: []
            },
            {
                role: "user",
                text: "추천 메뉴가 뭐야?",
                items: []
            },
            {
                role: "assistant",
                text: "추천하는 메뉴는 어묵우동, 얼큰우동입니다.",
                items: [
                    {
                        id: 1,
                        name: "어묵우동",
                        price: 7000,
                        imageUrl: "https://reborn-image-test.s3.ap-northeast-2.amazonaws.com/480288ad-cd30-4c38-9a3c-63fbde648226.jpeg"
                    },
                    {
                        id: 2,
                        name: "얼큰우동",
                        price: 6000,
                        imageUrl: "https://reborn-image-test.s3.ap-northeast-2.amazonaws.com/c05060bb-22ab-44bd-bad2-6e5b4f4448a6.jpeg"
                    }
                ]
            },
            {
                role: "user",
                text: "주미 돈까스를 담아줘",
                items: []
            },
            {
                role: "assistant",
                text: "네 담아드렸습니다.",
                items: []
            },
        ]
    },
    {
        id: 4,
        menuList: ["치즈돈까스"],
        price : 10000,
        orderDate: "2024. 05. 13 13:10",
        chatList: [
            {
                role: "assistant",
                text: "무엇을 도와드릴까요?",
                items: []
            },
            {
                role: "user",
                text: "추천 메뉴가 뭐야?",
                items: []
            },
            {
                role: "assistant",
                text: "추천하는 메뉴는 주미돈까스, 어묵우동입니다.",
                items: [
                    {
                        id: 1,
                        name: "어묵우동",
                        price: 7000,
                        imageUrl: "https://reborn-image-test.s3.ap-northeast-2.amazonaws.com/480288ad-cd30-4c38-9a3c-63fbde648226.jpeg"
                    },
                    {
                        id: 2,
                        name: "얼큰우동",
                        price: 6000,
                        imageUrl: "https://reborn-image-test.s3.ap-northeast-2.amazonaws.com/c05060bb-22ab-44bd-bad2-6e5b4f4448a6.jpeg"
                    }
                ]
            },
            {
                role: "user",
                text: "주미 돈까스를 담아줘",
                items: []
            },
            {
                role: "assistant",
                text: "네 담아드렸습니다.",
                items: []
            },
        ]
    },
];
const OrderList = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState({});

    const handleOpen = (order) => {
        console.log(selectedOrder)
        setSelectedOrder(order);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">주문번호</TableCell>
                        <TableCell align="center">메뉴</TableCell>
                        <TableCell align="center">가격</TableCell>
                        <TableCell align="center">주문일자</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orderData.map((row) => (
                        <Tooltip title={`ID: ${row.id}`} key={row.id} placement="top">
                            <TableRow
                                className={classes.tableRow}
                                onClick={() => handleOpen(row)}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="center">{row.id}</TableCell>
                                <TableCell align="left">
                                    {row.menuList.length === 0 ? "" :
                                        row.menuList.length === 1 ? row.menuList[0] :
                                            `${row.menuList[0]} 외 ${row.menuList.length - 1}개`}
                                </TableCell>
                                <TableCell align="center">{row.price}</TableCell>
                                <TableCell align="center">{row.orderDate}</TableCell>
                            </TableRow>
                        </Tooltip>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">대화 리스트</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    {/*대화가 티키타카 하는 로직*/}
                    <List>
                        {selectedOrder.chatList ?
                            selectedOrder?.chatList.map((chat, index) => (
                                <>
                                    {chat.role === 'user' ?
                                        <ListItem key={index}
                                                  className={`${classes.bubble} ${classes.rightBubble}`}>
                                            <ListItemText primary={chat.text} className={classes.text_white} />
                                        </ListItem>
                                        :
                                        <div className={`${classes.dFlex}`}>
                                            <AccountCircleIcon fontSize="large" className={classes.iconColor}/>
                                            <div className={classes.content}>
                                                <div className={classes.text_padding}>주미</div>
                                                <ListItem key={index}
                                                          className={`${classes.bubble} ${classes.leftBubble}`}>
                                                    <ListItemText primary={chat.text}/>
                                                    <div>
                                                        <div className={classes.scrollContainer}>
                                                            {chat.items?.map((item, index) => (
                                                                <MenuCard
                                                                    key={index}
                                                                    id={item.id}
                                                                    name={item.name}
                                                                    price={item.price}
                                                                    imageUrl={item.imageUrl}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>

                                                </ListItem>

                                            </div>
                                        </div>
                                    }
                                </>
                            ))
                            :
                            ""
                        }
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        닫기
                    </Button>
                </DialogActions>
            </Dialog>
        </TableContainer>
    );
};

export default OrderList;
