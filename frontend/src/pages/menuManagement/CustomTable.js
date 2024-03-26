import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from '@material-ui/core';
import useStyles from "./styles";
import CollectionsIcon from "@material-ui/icons/Collections";
// 데이터 배열을 재정렬하는 함수
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

// todo : 데이터 베이스 직접 받아서 처리할 수 있도록 ( get )
const categoryList = [
  "커피",
  "에이드",
  "디저트"
]

// todo : 데이터 베이스 직접 받아서 처리할 수 있도록 ( get )
const initialMenuList = [
  { id: '1', image:"",name: "아메리카노", price: 2000, description: "에스프레소에 뜨거운 물을 추가하여 만듭니다.", category: "커피", status: "입고" },
  { id: '2', image:"",name: "카페라떼", price: 2500, description: "에스프레소에 우유를 넣음", category: "커피", status: "품절" },
  { id: '3', image:"",name: "에스프레소", price: 1400, description: "진하고 강렬한 맛의 기본이 되는 커피.", category: "커피", status: "입고" },
  { id: '4', image:"",name: "아이스티", price: 3000, description: "아이스티입니다", category: "커피", status: "품절" },
  { id: '5', image:"",name: "레몬에이드", price: 4000, description: "레몬에이드.", category: "에이드", status: "입고" },
  { id: '6', image:"",name: "케이크", price: 5000, description: "맛있음", category: "디저트", status: "품절" }
];

const CustomTable = () => {
  const [totalMenuList, setTotalMenuList] = useState(initialMenuList)
  const [open, setOpen] = useState(false); // 모달 상태
  const [newItem, setNewItem] = useState({ name: '', price: '', description: '', category: '', status: '입고' }); // 새 항목의 상태
  const [imagePreview, setImagePreview] = useState(null); // 이미지 미리보기 URL 상태
  const [selectedCategory, setSelectedCategory] = useState(categoryList[0]);
  const filteredMenuList = totalMenuList.filter(menu => menu.category === selectedCategory);
  const [menuList, setMenuList] = useState(filteredMenuList);
  const [selectedMenu, setSelectedMenu] = useState({})
  const [detailOpen, setDetailOpen] = useState(false)

  // 색상 배열
  const colors = [
    '#FFD700',
    '#ADFF2F',
    '#87CEEB',
    '#eb87ad',
    '#be87eb'
  ]; // 이 배열에 더 많은 색상 추가 가능

  // 카테고리와 색상 매핑
  const categoryColors = categoryList.reduce((acc, category, index) => {
    acc[category] = colors[index % colors.length]; // 색상 배열을 순환
    return acc;
  }, {});
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
        menuList,
      result.source.index,
      result.destination.index
    );

    setMenuList(reorderedItems);
  };
  const handleSave = () => {
    console.log('카테고리:', selectedCategory);
    console.log('저장된 데이터:', menuList);
    // todo: 서버로 데이터 리스트 보내기(items) 자체를 보내면 됩니다. ( post )
  };
  const handleAdd = () => {
    console.log('추가하기 모달 띄우기');
    // todo: 추가하기 모달 띄우기
    setOpen(true);
  };
  // 모달 닫기
  const handleClose = () => {
    // todo : setNewItem => 빈 아이템으로 바꾸기
    setNewItem({ name: '', price: '', description: '', category: selectedCategory, status: '입고' })
    setImagePreview(null)
    setOpen(false);
  };
  const handleDetailClose = () => {
    setDetailOpen(false);
  };

  const handleCategoryChange = (e) => {
    const {value} = e.target
    setSelectedCategory(value);
    const filteredItems = totalMenuList.filter(item => item.category === value);
    setMenuList(filteredItems)
  };
  // 새 항목 추가
  const handleAddItem = () => {
    if(window.confirm("추가하시겠습니까?")) {
      if(!imagePreview) return window.alert("이미지를 업로드 해주세요.")
      if(!newItem.name) return window.alert("메뉴명을 입력해 주세요.")
      if(!newItem.price) return window.alert("가격을 입력해 주세요.")
      if(!newItem.description) return window.alert("설명을 입력해 주세요.")
      if(!newItem.description) return window.alert("설명을 입력해 주세요.")
      newItem.category = selectedCategory
      const maxId = Math.max(...totalMenuList.map(item => parseInt(item.id, 10)));
      setMenuList([...menuList, { ...newItem, id: `${maxId + 1}`, image: imagePreview }]);
      handleClose(); // 모달 닫기
    }

  };

  // 입력 값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };
  // 이미지 변경 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const { name } = e.target;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItem({ ...newItem, [name]:reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleStatus = (id) => {
    setMenuList(menuList.map(item => {
      if (item.id === id) {
        return { ...item, status: item.status === '입고' ? '품절' : '입고' };
      }
      return item;
    }));
  };

  const handleDelete = (id) => {
    // id를 사용하여 menuList에서 해당 항목을 찾아 삭제하는 로직
    // 예: setMenuList(current => current.filter(item => item.id !== id));
    if(window.confirm("해당 메뉴를 삭제하시겠습니까?")) {
      setMenuList(current => current.filter(item => item.id !== id));
      setTotalMenuList(current => current.filter(item => item.id !== id));
      alert("삭제가 완료되었습니다.")
    }
  };

  const handleViewDetails = (id) => {
    // id를 사용하여 상세 정보를 표시하는 로직
    // 예: 상세 정보 모달 열기 또는 상세 페이지로 라우팅
    console.log("상세보기 버튼 클릭", id);
    const value = menuList.find(menu => menu.id === id)
    setSelectedMenu(value)
    setDetailOpen(true)
  };
  // 업데이트 버튼 클릭시
  const handleUpdateMenu = () => {
    console.log("업데이트 버튼");
    setDetailOpen(false)
    setOpen(true)
  }
  const classes = useStyles();
  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="category-select-label">카테고리</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {/* 카테고리 목록을 동적으로 생성 */}
          {categoryList.map((category)=> (
            <MenuItem key={category} value={category}>{category}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" className={classes.addButton} onClick={handleAdd}>
        추가하기
      </Button>
      <Button onClick={handleSave} variant="contained" className={classes.saveButton} color="secondary">
        저장하기
      </Button>
      <div style={{
        maxWidth: '100%',
        overflowX: 'auto',
      }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppableTable">
            {(provided) => (
                <Table {...provided.droppableProps} ref={provided.innerRef}>
                  <TableHead>
                    <TableRow >
                      <TableCell className={`${classes.textCenter} ${classes.textNowrap}`}>#</TableCell>
                      <TableCell className={`${classes.textCenter} ${classes.textNowrap}`}>이미지</TableCell>
                      <TableCell className={`${classes.textCenter} ${classes.textNowrap}`}>메뉴명</TableCell>
                      <TableCell className={`${classes.textCenter} ${classes.textNowrap}`}>가격</TableCell>
                      <TableCell className={`${classes.textCenter} ${classes.textNowrap}`}>설명</TableCell>
                      <TableCell className={`${classes.textCenter} ${classes.textNowrap}`}>카테고리</TableCell>
                      <TableCell className={`${classes.textCenter} ${classes.textNowrap}`}>입고상태</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {menuList.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided) => (
                              <TableRow
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                              >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                  <div style={{
                                    width: "100px",
                                    height: "100px",
                                    marginTop: "10px",
                                    border: "1px solid #ddd",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundImage: `url(${item.image})`,
                                  }}>
                                    {!item.image && "NO IMAGE"}
                                  </div>
                                </TableCell>
                                <TableCell className={`${classes.textCenter} ${classes.textNowrap}`}>{item.name}</TableCell>
                                <TableCell className={`${classes.textCenter} ${classes.textNowrap}`}>{item.price}</TableCell>
                                <TableCell className={classes.minWidth300}>{item.description}</TableCell>
                                {/*<TableCell>{item.category}</TableCell>*/}
                                <TableCell>
                                  <Button
                                      style={{
                                        backgroundColor: categoryColors[item.category] || '#FFFFFF', // 매핑된 색상이 없는 경우 기본 색상
                                        color: '#000000', // 텍스트 색상
                                      }}
                                  >
                                    {item.category}
                                  </Button>
                                </TableCell>
                                {/*<TableCell>{item.status}</TableCell>*/}
                                <TableCell>
                                  <Button
                                      onClick={() => toggleStatus(item.id)}
                                      style={{
                                        cursor: 'pointer', // 마우스 오버 시 커서 변경
                                        backgroundColor: item.status === '입고' ? '#90EE90' : '#FFB6C1', // 상태에 따른 배경색
                                      }}
                                  >
                                    {item.status}
                                  </Button>
                                </TableCell>
                                <TableCell>
                                  <Button onClick={() => handleViewDetails(item.id)} style={{
                                    backgroundColor: '#a3e9f3',
                                  }}
                                  >상세</Button>
                                </TableCell>
                                <TableCell>
                                  <Button onClick={() => handleDelete(item.id)} style={{
                                    backgroundColor: '#FFB6C1',
                                  }}
                                  >삭제</Button>
                                </TableCell>
                              </TableRow>
                          )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                  </TableBody>
                </Table>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">메뉴 추가</DialogTitle>
        <DialogContent>
          {/* 이미지 업로드 필드 */}
          <div style={{
            width: "100%",
            display: "flex",
            justifyContent: "center", // 수평 중앙 정렬
          }}>
            <input
                accept="image/*"
                style={{display: 'none'}}
                id="raised-button-file"
                name="logo"
                type="file"
                onChange={handleImageChange}
            />
            <div className={classes.newImageContainer}>
              {/* 이미지 미리보기 */}
              <div
                  className={classes.newImage}
                  style={{
                    backgroundImage: `url(${imagePreview})`,
                  }}
              >
                {!imagePreview && '이미지 업로드'}
              </div>
              {/* 이미지 업로드 버튼 */}
              <label htmlFor="raised-button-file" className={classes.uploadBtn}>
                <Button variant="contained" component="span" style={{padding: 0, minWidth: 0}}>
                  <CollectionsIcon/>
                </Button>
              </label>
            </div>
          </div>
          <TextField
              autoFocus
              margin="dense"
              name="name"
              label="메뉴명"
              type="text"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              className={classes.textFieldCustom}
          />
          <TextField
            margin="dense"
            name="price"
            label="가격"
            type="number"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            className={classes.textFieldCustom}
          />
          <TextField
            margin="dense"
            name="description"
            label="설명"
            type="text"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            className={classes.textFieldCustom}
          />
          <TextField
              margin="dense"
              name="aiDescription"
              label="AI 설명"
              type="text"
              multiline
              rows={6}
              variant="outlined"
              fullWidth
              onChange={handleChange}
              className={classes.textFieldCustom}
          />
          {/* 상태는 기본적으로 '활성화'로 설정 */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            취소하기
          </Button>
          <Button onClick={handleAddItem} color="primary">
            추가하기
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={detailOpen} onClose={handleDetailClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">상세보기</DialogTitle>
        <DialogContent>
          {/* 이미지 업로드 필드 */}
          <div style={{
            width: "100%",
            display: "flex",
            justifyContent: "center", // 수평 중앙 정렬
          }}>
            <div className={classes.newImageContainer}>
              {/* 이미지 미리보기 */}
              <div
                  className={classes.newImage}
                  style={{
                    backgroundImage: `url(${selectedMenu.image})`,
                  }}
              >
                {!selectedMenu.image && '이미지 업로드'}
              </div>
            </div>
          </div>
          <Table className={classes.table} aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell align="center"
                           className={classes.tableHeaderCell}
                           style={{
                             width: '30%',
                             whiteSpace: "nowrap"}}>
                  메뉴명
                </TableCell>
                <TableCell align="left"
                           style={{width: '70%'}}>
                  {selectedMenu.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center"
                           className={classes.tableHeaderCell}
                           style={{
                             width: '30%',
                             whiteSpace: "nowrap"}}>
                  가격
                </TableCell>
                <TableCell align="left"
                           style={{width: '70%'}}>
                  {selectedMenu.price}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center"
                           className={classes.tableHeaderCell}
                           style={{
                             width: '30%',
                             whiteSpace: "nowrap"}}>
                  설명
                </TableCell>
                <TableCell align="left"
                           style={{width: '70%'}}>
                  {selectedMenu.description}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center"
                           className={classes.tableHeaderCell}
                           style={{
                             width: '30%',
                             whiteSpace: "nowrap"}}>
                  AI 설명
                </TableCell>
                <TableCell align="left"
                           style={{width: '70%'}}>
                  {selectedMenu.aiDescription}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          {/* 상태는 기본적으로 '활성화'로 설정 */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDetailClose} color="secondary">
            닫기
          </Button>
          <Button onClick={handleUpdateMenu} color="primary">
            수정하기
          </Button>
        </DialogActions>
      </Dialog>
    </>

  );
};

export default CustomTable;
