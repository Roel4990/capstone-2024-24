import React from "react";
import {
    Typography,
    Box,
    Paper,
    Button,
    Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, CardActions, Collapse,

} from "@material-ui/core";
import {ExpandMore, Favorite, MoreVert, Share} from "@material-ui/icons";
import { useHistory } from 'react-router-dom';
import {useUserDispatch} from "../../context/UserContext"; // useHistory 훅 임포트

function CustomCard({ id, logo, title, description, date, updateCard }) {
    const history = useHistory(); // useHistory 훅을 사용하여 history 객체 얻기
    var userDispatch = useUserDispatch();
    console.log(logo, title, description, date)
    const handleUpdateTitle = () => {
        const newTitle = "Updated Title"; // 새로운 제목
        updateCard(id, { title: newTitle });
    };
    //수정 및 삭제를 위한 토글버튼
    const handleExpandClick = (event) => {
        event.stopPropagation()
        alert("수정 및 삭제를 위한 토글버튼")
    };
    //
    const handleCompanyClick = () => {
        localStorage.setItem('company_id', 1)
        userDispatch({ type: 'LOGIN_SUCCESS' })
        history.push('/app/dashboard')
    };
    return (
        <Card style={{
            width: "500px"
        }} onClick={handleCompanyClick}>
            <CardHeader
                action={
                    <IconButton aria-label="settings" onClick={handleExpandClick}>
                        <MoreVert />
                    </IconButton>
                }
                title={title}
                subheader={date}
            />
            <CardMedia
                component="img"
                height="194"
                image={logo}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default CustomCard;