import React, { useState } from "react";
import { Grid, Typography, TextField, Button, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";

const useStyles = makeStyles(theme => ({
    saveButton: {

    },
    logoImage: {
        width: '100px',
        height: '100px',
        marginTop: '10px',
        border: '1px solid #ddd',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    mainImage: {
        width: '100px',
        height: '150px',
        marginTop: '10px',
        border: '1px solid #ddd',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }
}))


export default function StoreManagement() {
    const classes = useStyles();
    // useState 훅을 사용하여 매장명과 매장 설명 상태를 관리합니다.
    const [storeName, setStoreName] = useState('');
    const [storeDescription, setStoreDescription] = useState('');
    const [logoImage, setLogoImage] = useState('');
    const [mainImage, setMainImage] = useState('');

    // 카테고리 관리를 위한 상태
    const [categories, setCategories] = useState(["커피", "디저트", "에이드"]);
    const [newCategory, setNewCategory] = useState('');

    // 저장 버튼을 눌렀을 때 실행될 함수입니다.
    const handleSave = () => {
        console.log('저장됨:', { storeName, storeDescription, logoImage, mainImage, categories });
        // 이곳에서 저장 로직을 구현합니다. 예를 들어, API 호출을 통해 서버에 데이터를 저장할 수 있습니다.
    };
    const handleImageChange = (e, setImage) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        // todo : image 보내서 링크로 받기
        reader.onloadend = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };
    // 카테고리 추가
    const addCategory = () => {
        if (newCategory && !categories.includes(newCategory)) {
            setCategories([...categories, newCategory]);
            setNewCategory('');
        }
    };

    // 카테고리 삭제
    const deleteCategory = (categoryToDelete) => {
        setCategories(categories.filter(category => category !== categoryToDelete));
    };
    return (
        <>
            <PageTitle title="매장 관리하기" />

            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Widget disableWidgetMenu>
                        <Grid container item xs={12}>
                            <Grid item xs={12}>
                                <Widget title="" noWidgetShadow disableWidgetMenu noBodyPadding noHeaderPadding
                                        style={{paddingRight: 15}} headerClass={classes.widgetHeader}>
                                    {/* 매장명 입력 필드 */}
                                    <TextField
                                        label="매장명"
                                        variant="outlined"
                                        fullWidth
                                        value={storeName}
                                        onChange={(e) => setStoreName(e.target.value)}
                                        style={{marginBottom: 16, marginTop: 10}}
                                    />
                                    {/* 매장 설명 입력 필드 */}
                                    <TextField
                                        label="매장 설명"
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        value={storeDescription}
                                        onChange={(e) => setStoreDescription(e.target.value)}
                                    />
                                    {/* 로고 이미지 업로드 */}
                                    <input
                                        accept="image/*"
                                        style={{display: 'none'}}
                                        id="logo-image-upload"
                                        type="file"
                                        onChange={(e) => handleImageChange(e, setLogoImage)}
                                    />
                                    <label htmlFor="logo-image-upload">
                                        <Button variant="contained" component="span" className={classes.button}
                                                style={{marginTop: '10px'}}>
                                            로고 이미지 업로드
                                        </Button>
                                    </label>
                                    {/* 이미지 미리보기 */}
                                    <div style={{
                                        backgroundImage: `url(${logoImage})`,
                                    }} className={classes.logoImage}/>
                                    {/* 기본화면 이미지 업로드 */}
                                    <input
                                        accept="image/*"
                                        style={{display: 'none'}}
                                        id="main-image-upload"
                                        type="file"
                                        onChange={(e) => handleImageChange(e, setMainImage)}
                                    />
                                    <label htmlFor="main-image-upload">
                                        <Button variant="contained" component="span" className={classes.button}
                                                style={{marginTop: '10px'}}>
                                            기본화면 이미지 업로드
                                        </Button>
                                    </label>
                                    {/* 이미지 미리보기 */}
                                    <div style={{
                                        backgroundImage: `url(${mainImage})`,
                                    }} className={classes.mainImage}/>
                                    {/* 카테고리 관리 UI */}
                                    <TextField
                                        label="새 카테고리"
                                        variant="outlined"
                                        value={newCategory}
                                        onChange={(e) => setNewCategory(e.target.value)}
                                        style={{marginBottom: 16, marginTop: 20}}
                                    />
                                    <Button onClick={addCategory} variant="contained" color="primary" style={{marginBottom: 16, marginTop: 30, marginLeft: 10}}>
                                        카테고리 추가
                                    </Button>
                                    <div>
                                        {categories.map((category, index) => (
                                            <Chip
                                                key={index}
                                                label={category}
                                                onDelete={() => deleteCategory(category)}
                                                color="primary"
                                                style={{margin: '5px'}}
                                            />
                                        ))}
                                    </div>
                                    {/* 저장 버튼 */}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSave}
                                        style={{marginTop: 16}}
                                    >
                                        저장하기
                                    </Button>
                                </Widget>
                            </Grid>
                        </Grid>
                    </Widget>
                </Grid>
            </Grid>
        </>
    );
}
