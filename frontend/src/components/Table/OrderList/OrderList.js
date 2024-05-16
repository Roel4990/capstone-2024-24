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
    Modal, Box, DialogTitle, DialogContent, Typography, Grid, TextField, Button, DialogActions, Dialog
} from '@material-ui/core';

const orderData = [
    { id: 1, menuList: ["트리플 스테이크", "미도인 등심 스테이크"], price : 18000, orderDate: "2024-05-14 오후 1시 10분"},
    { id: 2, menuList: ["트리플 스테이크", "미도인 등심 스테이크"], price : 20300, orderDate: "2024-05-13 오후 1시 10분"},
    { id: 3, menuList: ["미도인 등심 스테이크", "트리플 스테이크"], price : 30000, orderDate: "2024-05-12 오후 1시 10분"}
];
const OrderList = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState({});

    const handleOpen = (order) => {
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
                        <TableCell>ID</TableCell>
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
                                <TableCell component="th" scope="row">{row.id}</TableCell>
                                <TableCell align="center">{row.menuList[0]}</TableCell>
                                <TableCell align="center">{row.price}</TableCell>
                                <TableCell align="center">{row.orderDate}</TableCell>
                            </TableRow>
                        </Tooltip>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">주문 내역</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <Typography className={classes.questionTitle}>
                        1231231
                    </Typography>
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
