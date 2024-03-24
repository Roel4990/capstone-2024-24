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
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    card: {
        maxWidth: 500, // 원하는 카드의 최대 너비를 설정하세요
        border: '1px solid #ddd', // 카드 테두리
        borderRadius: 16, // 카드 모서리의 둥근 정도
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // 그림자 효과
    },
    title: {
        fontSize: 14,
        marginTop: "20px"
    },
    pos: {
        marginBottom: 12,
    },
    imageContainer: {
        // 여기에 이미지 스타일을 추가하세요
        width: '300px',
        height: '300px',
        overflow: 'hidden', // 이미지가 컨테이너를 넘어갈 때 숨김 처리
        display: 'flex', // 이미지를 가운데 정렬합니다
        justifyContent: 'center',
        alignItems: 'center',
        // borderRadius: '4px', // 부드러운 모서리 효과를 위해 borderRadius 추가
        // boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)', // 이미지 주위에 자연스러운 테두리를 만들기 위한 그림자 효과
        marginTop: "15px",
        marginBottom: "15px"
    },
    image: {
        height: '100%', // 이미지 높이를 컨테이너 높이에 맞춤
        width: 'auto', // 이미지 너비를 자동으로 설정하여 비율 유지

    },
    content: {
        padding: '32px', // 내부 여백
    }
});
function CustomCard({ id, logo, title, description, date, updateCard }) {
    const history = useHistory(); // useHistory 훅을 사용하여 history 객체 얻기
    var userDispatch = useUserDispatch();
    const classes = useStyles();
    // console.log(logo, title, description, date)
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
        // <Card style={{
        //     width: "500px"
        // }} onClick={handleCompanyClick}>
        //     <CardHeader
        //         action={
        //             <IconButton aria-label="settings" onClick={handleExpandClick}>
        //                 <MoreVert />
        //             </IconButton>
        //         }
        //         title={title}
        //         subheader={date}
        //     />
        //     <CardMedia
        //         component="img"
        //         height="500"
        //         image={logo}
        //         alt="Paella dish"
        //     />
        //     <CardContent>
        //         <Typography variant="body2" color="textSecondary">
        //             {description}
        //         </Typography>
        //     </CardContent>
        // </Card>
        <Card className={classes.card} onClick={handleCompanyClick}>
            <CardContent className={classes.content}>
                {/* 이미지 컨테이너 */}
                <div className={classes.imageContainer}>
                    {/* 이미지를 여기에 넣으세요. 아래는 예시 이미지입니다. */}
                    <img className={classes.image} src={logo} alt="미도인" />
                    {/*<CardMedia*/}
                    {/*        component="img"*/}
                    {/*        height="auto"*/}
                    {/*        image={logo}*/}
                    {/*        alt="Paella dish"*/}
                    {/*/>*/}
                </div>
                {/* 카드 제목 */}
                <Typography className={classes.title} gutterBottom>
                    {title}
                </Typography>
                {/* 카드 부가 내용 */}
                <Typography variant="body2" component="p" color="textSecondary">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default CustomCard;