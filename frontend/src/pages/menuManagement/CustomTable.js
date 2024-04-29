import React, {useEffect, useState} from 'react';
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
import {fetchBusinessItemsInfo, useBusinessItemsUpdateMutation, useImageUploadMutation} from "../../api/mutations";
import {useQuery} from "react-query";
// 데이터 배열을 재정렬하는 함수
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const CustomTable = () => {
  const [totalMenuList, setTotalMenuList] = useState([])
  const [open, setOpen] = useState(false); // 모달 상태
  const [updateMode, setUpdateMode] = useState(false)
  const [newItem, setNewItem] = useState({ name: '', price: 0, description: '', category: '',  prompt: "", isActive: true }); // 새 항목의 상태
  const [imagePreview, setImagePreview] = useState(null); // 이미지 미리보기 URL 상태
  const [selectedCategory, setSelectedCategory] = useState('');
  const filteredMenuList = totalMenuList.filter(menu => menu.category === selectedCategory);
  const [menuList, setMenuList] = useState(filteredMenuList);
  const [selectedMenu, setSelectedMenu] = useState({})
  const [detailOpen, setDetailOpen] = useState(false)

  const { data: businessItemsInfo, isLoading : businessItemsInfoIsLoading, isError: businessItemsInfoIsError } = useQuery('businessItemsInfo', fetchBusinessItemsInfo);

  const handleImageUploadSuccess = (uploadImageData) => {
    // 로그인 성공 후 처리할 로직
    console.log('이미지업로드 성공:', uploadImageData);
    setNewItem({ ...newItem, imageUrl:uploadImageData.imageUrl });
    setImagePreview(uploadImageData.imageUrl);
  };
  const handleImageUploadError = (error) => {
    // 로그인 실패 후 처리할 로직
    console.error('Upload failed:', error);
  };
  // 이미지 업로드
  const {
    mutate: uploadImageMutation,
    isLoading: uploadImageIsLoading,
    error: uploadImageError
  } = useImageUploadMutation(
      handleImageUploadSuccess,
      handleImageUploadError
  );

  const handleBusinessItemsUpdateSuccess = (businessData) => {
    // 매장 아이템 리스트 업데이트 성공시
    console.log('BusinessItemsUpdate successful:', businessData);
    // 업로드 성공 시 처리 로직

  };
  const handleBusinessItemsUpdateError = (error) => {
    console.error('BusinessItemsUpdate failed:', error);
    // 업로드 실패 시 처리 로직
  };
  // 매장 생성
  const {
    mutate: businessItemsUpdateMutation,
    isLoading: businessItemsUpdateIsLoading,
    error: businessItemsUpdateError
  } = useBusinessItemsUpdateMutation(
      handleBusinessItemsUpdateSuccess,
      handleBusinessItemsUpdateError
  );
  useEffect(() => {
    if (!businessItemsInfoIsLoading && !businessItemsInfoIsError && businessItemsInfo) {
      // 데이터가 로드되었고, 에러가 없을 경우 상태 업데이트
      setTotalMenuList(businessItemsInfo.data)
      if(businessItemsInfo.data.length > 0) {
        setSelectedCategory(businessItemsInfo.data[0].category)
        setMenuList(businessItemsInfo.data[0].items)
      }
    }
  }, [businessItemsInfo, businessItemsInfoIsLoading, businessItemsInfoIsError]); // 의존성 배열에 businessInfo, isLoading, isError를 추가

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
    const targetIndex = totalMenuList.findIndex(item => item.category === selectedCategory);
    if (targetIndex !== -1) {
      // totalMenuList의 복사본을 만들고, 해당 카테고리의 items만 업데이트
      const updatedTotalMenuList = totalMenuList.map((item, index) => {
        if (index === targetIndex) {
          return { ...item, items: reorderedItems };
        }
        return item;
      });
      // 업데이트된 전체 메뉴 리스트로 상태 업데이트
      setTotalMenuList(updatedTotalMenuList);
    }
  };
  const handleSave = () => {
    console.log('카테고리:', selectedCategory);
    console.log('저장된 데이터:', menuList);
    console.log("전체 데이터:", totalMenuList)
    businessItemsUpdateMutation({
      data:totalMenuList
    })
    // todo: 서버로 데이터 리스트 보내기(items) 자체를 보내면 됩니다. ( post )
  };
  const handleAdd = () => {
    // todo: 추가하기 모달 띄우기
    setOpen(true);
  };
  // 모달 닫기
  const handleClose = () => {
    // todo : setNewItem => 빈 아이템으로 바꾸기
    setNewItem({ name: '', price: '', description: '', category: selectedCategory, isActive: true })
    setImagePreview(null)
    setOpen(false);
  };
  const handleDetailClose = () => {
    setDetailOpen(false);
  };

  const handleCategoryChange = (e) => {
    const {value} = e.target
    setSelectedCategory(value);
    const filteredItems = totalMenuList.find(item => item.category === value);
    setMenuList(filteredItems.items)
  };
  // 새 항목 추가
  const handleAddItem = () => {
    if(window.confirm("추가하시겠습니까?")) {
      if(!imagePreview) return window.alert("이미지를 업로드 해주세요.")
      if(!newItem.name) return window.alert("메뉴명을 입력해 주세요.")
      if(!newItem.price) return window.alert("가격을 입력해 주세요.")
      if(!newItem.description) return window.alert("설명을 입력해 주세요.")
      newItem.category = selectedCategory
      const target = totalMenuList.find(item => item.category === selectedCategory);
      const maxId = Math.max(...target.items.map(item => parseInt(item.id, 10)));
      setMenuList([...menuList, { ...newItem, id: `${maxId + 1}`, imageUrl: imagePreview }]);
      const targetIndex = totalMenuList.findIndex(item => item.category === selectedCategory);
      if (targetIndex !== -1) {
        // 선택된 카테고리를 찾아 해당 items 배열을 업데이트
        const updatedItems = [...totalMenuList[targetIndex].items, { ...newItem, id: `${maxId + 1}`, imageUrl: imagePreview }];
        // totalMenuList의 복사본을 만들고, 해당 카테고리의 items만 업데이트
        const updatedTotalMenuList = totalMenuList.map((item, index) => {
          if (index === targetIndex) {
            return { ...item, items: updatedItems };
          }
          return item;
        });
        // 업데이트된 전체 메뉴 리스트로 상태 업데이트
        setTotalMenuList(updatedTotalMenuList);
      }
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
    const formData = new FormData();
    formData.append('file', file);
    uploadImageMutation(formData)
  };

  const toggleStatus = (id) => {
    setMenuList(menuList.map(item => {
      if (item.id === id) {
        return { ...item, isActive: item.isActive === '입고' ? '품절' : '입고' };
      }
      return item;
    }));
  };

  const handleDelete = (id) => {
    // id를 사용하여 menuList에서 해당 항목을 찾아 삭제하는 로직
    // 예: setMenuList(current => current.filter(item => item.id !== id));
    if(window.confirm("해당 메뉴를 삭제하시겠습니까?")) {
      setMenuList(current => current.filter(item => item.id !== id));
      const targetIndex = totalMenuList.findIndex(item => item.category === selectedCategory);
      if (targetIndex !== -1) {
        // 선택된 카테고리를 찾아 해당 items 배열을 업데이트
        const updatedItems = totalMenuList[targetIndex].items.filter(item => item.id !== id);
        // totalMenuList의 복사본을 만들고, 해당 카테고리의 items만 업데이트
        const updatedTotalMenuList = totalMenuList.map((item, index) => {
          if (index === targetIndex) {
            return { ...item, items: updatedItems };
          }
          return item;
        });
        // 업데이트된 전체 메뉴 리스트로 상태 업데이트
        setTotalMenuList(updatedTotalMenuList);
      }
      // setTotalMenuList(current => current.filter(item => item.id !== id));
      alert("삭제가 완료되었습니다.")
    }
  };

  const handleViewDetails = (id) => {
    // id를 사용하여 상세 정보를 표시하는 로직
    // 예: 상세 정보 모달 열기 또는 상세 페이지로 라우팅
    const value = menuList.find(menu => menu.id === id)
    setSelectedMenu(value)
    setDetailOpen(true)
  };
  // 업데이트 버튼 클릭시
  const handleUpdateMenu = () => {
    setDetailOpen(false)
    setOpen(true)
    setUpdateMode(true)
    setNewItem(selectedMenu)
    if(selectedMenu.imageUrl) setImagePreview(selectedMenu.imageUrl)
  }
  const handleUpdateComplete = () => {
    if(window.confirm("해당 메뉴를 수정하시겠습니까?")) {
      const targetIndex = totalMenuList.findIndex(item => item.category === selectedCategory);
      if (targetIndex !== -1) {
        // 선택된 카테고리를 찾아 해당 items 배열에서 아이템을 업데이트
        const updatedItems = totalMenuList[targetIndex].items.map(item => {
          if (item.id === newItem.id) { // ID가 일치하는 아이템을 찾아 업데이트
            return { ...item, ...newItem, imageUrl: imagePreview };
          }
          return item; // 그 외 아이템은 그대로 유지
        });
        setMenuList(updatedItems)
        // totalMenuList의 복사본을 만들고, 해당 카테고리의 items만 업데이트
        const updatedTotalMenuList = totalMenuList.map((item, index) => {
          if (index === targetIndex) {
            return { ...item, items: updatedItems };
          }
          return item;
        });

        // 업데이트된 전체 메뉴 리스트로 상태 업데이트
        setTotalMenuList(updatedTotalMenuList);
      }
      setUpdateMode(false)
      handleClose()
    }

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
          {totalMenuList.map((item)=> (
            <MenuItem key={item.category} value={item.category}>{item.category}</MenuItem>
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
                      {/*<TableCell className={`${classes.textCenter} ${classes.textNowrap}`}>입고상태</TableCell>*/}
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
                                    backgroundImage: `url(${item.imageUrl})`,
                                  }}>
                                    {!item.imageUrl && "NO IMAGE"}
                                  </div>
                                </TableCell>
                                <TableCell className={`${classes.textCenter} ${classes.textNowrap}`}>{item.name}</TableCell>
                                <TableCell className={`${classes.textCenter} ${classes.textNowrap}`}>{item.price}</TableCell>
                                <TableCell className={classes.minWidth300}>{item.description}</TableCell>
                                {/*<TableCell>{item.category}</TableCell>*/}
                                <TableCell>
                                  <Button
                                      style={{
                                        backgroundColor: '#FFFFFF', // 매핑된 색상이 없는 경우 기본 색상
                                        color: '#000000', // 텍스트 색상
                                        whiteSpace: "nowrap"
                                      }}
                                  >
                                    {selectedCategory}
                                  </Button>
                                </TableCell>
                                {/*<TableCell>{item.isActive}</TableCell>*/}
                                {/*<TableCell>*/}
                                {/*  <Button*/}
                                {/*      onClick={() => toggleStatus(item.id)}*/}
                                {/*      style={{*/}
                                {/*        cursor: 'pointer', // 마우스 오버 시 커서 변경*/}
                                {/*        backgroundColor: item.isActive === '입고' ? '#90EE90' : '#FFB6C1', // 상태에 따른 배경색*/}
                                {/*      }}*/}
                                {/*  >*/}
                                {/*    {item.isActive}*/}
                                {/*  </Button>*/}
                                {/*</TableCell>*/}
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
        <DialogTitle id="form-dialog-title">
          {/*메뉴 추가*/}
          {!updateMode ? "메뉴 추가" : "메뉴 수정"}
        </DialogTitle>
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
              value={newItem.name}
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
            value={newItem.price}
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
            value={newItem.description}
            className={classes.textFieldCustom}
          />
          <TextField
              margin="dense"
              name="prompt"
              label="주미에서 메뉴을 설명해주세요."
              type="text"
              multiline
              rows={6}
              variant="outlined"
              fullWidth
              onChange={handleChange}
              value={newItem.prompt}
              className={classes.textFieldCustom}
          />
          {/* 상태는 기본적으로 '활성화'로 설정 */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            취소하기
          </Button>
          {!updateMode ?
              <Button onClick={handleAddItem} color="primary">
                추가하기
              </Button>
              :
              <Button onClick={handleUpdateComplete} color="primary">
                수정완료
              </Button>
          }
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
                    backgroundImage: `url(${selectedMenu.imageUrl})`,
                  }}
              >
                {!selectedMenu.imageUrl && '이미지 업로드'}
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
                  {selectedMenu.prompt}
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
