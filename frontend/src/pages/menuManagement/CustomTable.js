import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

// 데이터 배열을 재정렬하는 함수
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const useStyles = makeStyles((theme) => ({
  addButton: {
    position: 'absolute', // 컨테이너 기준 절대 위치
    top: theme.spacing(2), // 상단에서 16px (theme.spacing(2)의 기본값은 8)
    right: theme.spacing(2) + 100, // 왼쪽에서 16px
  },
  saveButton: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2) , // '추가하기' 버튼의 너비를 고려하여 위치 조정
  },
  formControl: {
    position: 'absolute',
    width: "100px",
    top: theme.spacing(2),
    left: theme.spacing(2), // '추가하기' 버튼의 너비를 고려하여 위치 조정
  },
}));

// todo : 데이터 베이스 직접 받아서 처리할 수 있도록 ( get )
const categoryList = [
  "coffee",
  "ade",
  "dessert"
]


const CustomTable = ({ data }) => {
  const [items, setItems] = useState(data);
  const [open, setOpen] = useState(false); // 모달 상태
  const [newItem, setNewItem] = useState({ name: '', price: '', description: '', category: '', status: '활성화' }); // 새 항목의 상태
  const [imagePreview, setImagePreview] = useState(null); // 이미지 미리보기 URL 상태
  const [selectedCategory, setSelectedCategory] = useState('');
  // 카테고리별로 고유한 값 추출
  // const uniqueCategories = Array.from(new Set(data.map(item => item.category)));

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
      items,
      result.source.index,
      result.destination.index
    );

    setItems(reorderedItems);
  };
  const handleSave = () => {
    console.log('저장된 데이터:', items);
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
    // setNewItem({ name: '', price: '', description: '', category: '', status: '활성화' })

    setOpen(false);
  };
  const handleCategoryChange = (event) => {
    console.log(event.target.value)
    setSelectedCategory(event.target.value);
    const filteredItems = data.filter(item => event.target.value === '' || item.category === event.target.value);
    setItems(filteredItems)
  };
  // 새 항목 추가
  const handleAddItem = () => {
    setItems([...items, { ...newItem, id: `new_${Date.now()}` }]);
    handleClose(); // 모달 닫기
  };

  // 입력 값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name)
    console.log(value)
    setNewItem({ ...newItem, [name]: value });
  };
  // 이미지 변경 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const { name } = e.target;
    console.log(name)
    console.log(file)
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItem({ ...newItem, [name]:reader.result ,"imageFile": file });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleStatus = (id) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, status: item.status === '활성화' ? '비활성화' : '활성화' };
      }
      return item;
    }));
  };

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
          <MenuItem value=""><em>None</em></MenuItem>
          {/* 카테고리 목록을 동적으로 생성 */}
          {data.map((item) => (
            <MenuItem key={item.id} value={item.category}>{item.category}</MenuItem>
          )).filter((v, i, a) => a.findIndex(t => (t.props.value === v.props.value)) === i)} {/* 중복 제거 */}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" className={classes.addButton} onClick={handleAdd}>
        추가하기
      </Button>
      <Button onClick={handleSave} variant="contained" className={classes.saveButton} color="secondary">
        저장하기
      </Button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppableTable">
          {(provided) => (
            <Table {...provided.droppableProps} ref={provided.innerRef}>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>이미지</TableCell>
                  <TableCell>메뉴명</TableCell>
                  <TableCell>가격</TableCell>
                  <TableCell>설명</TableCell>
                  <TableCell>category</TableCell>
                  <TableCell>status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item, index) => (
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
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>{item.description}</TableCell>
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
                              backgroundColor: item.status === '활성화' ? '#90EE90' : '#FFB6C1', // 상태에 따른 배경색
                            }}
                          >
                            {item.status}
                          </Button>
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
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">새 항목 추가</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="메뉴명"
            type="text"
            fullWidth
            onChange={handleChange}
          />
          {/* 이미지 업로드 필드 */}
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            name="image"
            multiple
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="raised-button-file">
            <Button variant="contained" component="span">
              이미지 업로드
            </Button>
          </label>
          {/* 이미지 미리보기 */}
          <div style={{
            width: '100px',
            height: '100px',
            marginTop: '10px',
            border: '1px solid #ddd',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(${imagePreview})`,
          }}>
            {!imagePreview && '이미지 업로드'}
          </div>
          <TextField
            margin="dense"
            name="price"
            label="가격"
            type="number"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="설명"
            type="text"
            fullWidth
            onChange={handleChange}
          />
          {/*<TextField*/}
          {/*  margin="dense"*/}
          {/*  name="category"*/}
          {/*  label="카테고리"*/}
          {/*  type="text"*/}
          {/*  fullWidth*/}
          {/*  onChange={handleChange}*/}
          {/*/>*/}
          <Select
            labelId="category-select-label"
            id="category-select"
            name="category"
            value={newItem.category} // 현재 선택된 카테고리 값. newItem은 상태 관리를 위한 객체입니다.
            onChange={handleChange}
            fullWidth
            style={{
              marginTop: "11px",
              marginBottom: "4px"
            }}
          >
            {categoryList.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
          {/* 상태는 기본적으로 '활성화'로 설정 */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            취소
          </Button>
          <Button onClick={handleAddItem} color="primary">
            추가
          </Button>
        </DialogActions>
      </Dialog>
    </>

  );
};

export default CustomTable;
