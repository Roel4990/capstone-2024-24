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
    "스테이크",
    "덮밥",
    "면류",
    "사이드메뉴"
]

// todo : 데이터 베이스 직접 받아서 처리할 수 있도록 ( get )
const initialMenuList = [
  {
    id: '1',
    image:"/Midoin/Menu/트리플_스테이크.png",
    name: "트리플 스테이크",
    price: 10000,
    description: "부드러운 부챗살 스테이크, 메쉬 포테이토와 대파, 특제 와인소스의 세상에 없는 환상적인 조화",
    aiDescription: "부드러운 부챗살 스테이크, 메쉬 포테이토와 대파, 특제 와인소스의 세상에 없는 환상적인 조화",
    category: "스테이크",
    status: "입고"
  },
  {
    id: '2',
    image:"/Midoin/Menu/미도인_등심_스테이크.png",
    name: "미도인 등심 스테이크",
    price: 11000,
    description: "부드러운 등심 스테이크와 진한 육수로 우려낸 단호박 스프, 아지다마고의 한상차림",
    aiDescription: "부드러운 등심 스테이크와 진한 육수로 우려낸 단호박 스프, 아지다마고의 한상차림",
    category: "스테이크",
    status: "입고"
  },
  {
    id: '3',
    image:"/Midoin/Menu/곱창_등심_스테이크.png",
    name: "곱창 등심 스테이크",
    price: 11000,
    description: "특제 소스로 12시간 저온 숙성한 소곱창과 부드러운 등심과의 특별한 조화",
    aiDescription: "특제 소스로 12시간 저온 숙성한 소곱창과 부드러운 등심과의 특별한 조화",
    category: "스테이크",
    status: "입고"
  },
  {
    id: '4',
    image:"/Midoin/Menu/대창_부채_스테이크.png",
    name: "대창 부채 스테이크",
    price: 12000,
    description: "대창과 부채살 스테이크의 과감하지만 멋진 콜라보",
    aiDescription: "대창과 부채살 스테이크의 과감하지만 멋진 콜라보",
    category: "스테이크",
    status: "입고"
  },
  {
    id: '5',
    image:"/Midoin/Menu/대창_덮밥.png",
    name: "대창 덮밥",
    price: 12000,
    description: "말이 필요없는 맛. 잘 손질된 대창을 매콤한 특제 양념과 불맛 나게 볶아낸 특별 덮밥",
    aiDescription: "말이 필요없는 맛. 잘 손질된 대창을 매콤한 특제 양념과 불맛 나게 볶아낸 특별 덮밥",
    category: "덮밥",
    status: "입고"
  },
  {
    id: '6',
    image:"/Midoin/Menu/대창_큐브_스테이크_덮밥.png",
    name: "대창 큐브 스테이크 덮밥",
    price: 12000,
    description: "스테이크와 대창을 함께 즐길수 있는 미도인만의 특별한 콜라보 메뉴",
    aiDescription: "스테이크와 대창을 함께 즐길수 있는 미도인만의 특별한 콜라보 메뉴",
    category: "덮밥",
    status: "입고"
  },
  {
    id: '7',
    image:"/Midoin/Menu/화산_불백_덮밥.png",
    name: "화산 불백 덮밥", price: 12000,
    description: "불맛 나는 돼지고기를 화산 모양으로 형상화한 비쥬얼 갑 강추 덮밥",
    aiDescription: "불맛 나는 돼지고기를 화산 모양으로 형상화한 비쥬얼 갑 강추 덮밥",
    category: "덮밥",
    status: "입고"
  },
  {
    id: '8',
    image:"/Midoin/Menu/미도인_스테이크_덮밥.png",
    name: "미도인 스테이크 덮밥",
    price: 12000,
    description: "부드러운 부챗살 스테이크를 올린 말이 필요없는 미도인 대표 덮밥",
    aiDescription: "부드러운 부챗살 스테이크를 올린 말이 필요없는 미도인 대표 덮밥",
    category: "덮밥",
    status: "입고"
  },
  {
    id: '9',
    image:"/Midoin/Menu/곱창_대창_덮밥.png",
    name: "곱창 대창 덮밥",
    price: 12000,
    description: "미도인 만의 특별한 저온 숙성 방법과 매콤한 한국식 특제 소스를 곁들인 대한민국 최초 곱대덮밥",
    aiDescription: "미도인 만의 특별한 저온 숙성 방법과 매콤한 한국식 특제 소스를 곁들인 대한민국 최초 곱대덮밥",
    category: "덮밥",
    status: "입고"
  },
  {
    id: '11',
    image:"/Midoin/Menu/곱창_대창_큐브스테이크_덮밥.png",
    name: "곱창 대창 큐브스테이크 덮밥",
    price: 12000,
    description: "미도인 특별메뉴! 대한민국에서 오직 미도인만 할수 있는 환상의 콤비네이션 메뉴",
    aiDescription: "미도인 특별메뉴! 대한민국에서 오직 미도인만 할수 있는 환상의 콤비네이션 메뉴",
    category: "덮밥",
    status: "입고"
  },
  {
    id: '12',
    image:"/Midoin/Menu/청두_사천_탄탄멘.png",
    name: "청두 사천 탄탄멘",
    price: 12000,
    description: "사천식으로 만든 매콤한 참깨돈골 육수와 매장에서 직접 만든 탄면장을 얹은 전통 탄탄멘",
    aiDescription: "사천식으로 만든 매콤한 참깨돈골 육수와 매장에서 직접 만든 탄면장을 얹은 전통 탄탄멘",
    category: "면류",
    status: "입고"
  },
  {
    id: '13',
    image:"/Midoin/Menu/미도인_곱창_라멘.png",
    name: "미도인 곱창 라멘",
    price: 12000,
    description: "부드러우면서 쫄깃한 곱창의 식감과 얼큰 시원한 미도인 만의 특별라멘",
    aiDescription: "부드러우면서 쫄깃한 곱창의 식감과 얼큰 시원한 미도인 만의 특별라멘",
    category: "면류",
    status: "입고"
  },
  {
    id: '14',
    image:"/Midoin/Menu/바질크림_새우파스타.png",
    name: "바질크림 새우파스타",
    price: 12000,
    description: "두근두근, 초록의 바지 페스토 크림 소스에 빠진 큼직한 새우와 베이컨칩의 환장 조합!",
    aiDescription: "두근두근, 초록의 바지 페스토 크림 소스에 빠진 큼직한 새우와 베이컨칩의 환장 조합!",
    category: "면류",
    status: "입고"
  },
  {
    id: '15',
    image:"/Midoin/Menu/새우_로제_생면_파스타.png",
    name: "새우 로제 생면 파스타",
    price: 12000,
    description: "깔끔하고 부드러운 로제크림소스! 특제 스파이시와 탱글한 새우의 조화",
    aiDescription: "깔끔하고 부드러운 로제크림소스! 특제 스파이시와 탱글한 새우의 조화",
    category: "면류",
    status: "입고"
  },
  {
    id: '16',
    image:"/Midoin/Menu/홍게살_크래미_크림_파스타.png",
    name: "홍게살 크래미 크림 파스타",
    price: 12000,
    description: "리얼 홍게 다리살과 부드러운 크래미의 풍부한 식감이 입안을 가득! 미도인의 특급 파스타",
    aiDescription: "리얼 홍게 다리살과 부드러운 크래미의 풍부한 식감이 입안을 가득! 미도인의 특급 파스타",
    category: "면류",
    status: "입고"
  },
  {
    id: '17',
    image:"/Midoin/Menu/미도인_곱창_떡볶이.png",
    name: "미도인 곱창 떡볶이",
    price: 12000,
    description: "미도인 총괄셰프의 매콤 특제소스, 소곱창과 쫄깃한 떡의 환상 하모니, 미도인 특별 곱떡 메뉴",
    aiDescription: "미도인 총괄셰프의 매콤 특제소스, 소곱창과 쫄깃한 떡의 환상 하모니, 미도인 특별 곱떡 메뉴",
    category: "사이드메뉴",
    status: "입고"
  },
  {
    id: '18',
    image:"/Midoin/Menu/미도인_우실장_떡볶이.png",
    name: "미도인 우실장 떡볶이",
    price: 12000,
    description: "미도인 총괄셰프의 특제소스와 삼겹살 대파가 듬뿍 들어간 약빤 메뉴",
    aiDescription: "미도인 총괄셰프의 특제소스와 삼겹살 대파가 듬뿍 들어간 약빤 메뉴",
    category: "사이드메뉴",
    status: "입고"
  },
  {
    id: '19',
    image:"/Midoin/Menu/마라네이드_토마토_사라다.png",
    name: "마라네이드 토마토 사라다",
    price: 12000,
    description: "쉐프의 한땀한땀 정성으로 껍질을 벗겨 만든 마리네이드, 방울 토마토와 스테이크를 올린 샐러드",
    aiDescription: "쉐프의 한땀한땀 정성으로 껍질을 벗겨 만든 마리네이드, 방울 토마토와 스테이크를 올린 샐러드",
    category: "사이드메뉴",
    status: "입고"
  },
  {
    id: '20',
    image:"/Midoin/Menu/미도인_스카치_에그.png",
    name: "미도인 스카치 에그",
    price: 12000,
    description: "15번 조리 과정을 거쳐, 반숙 계란을 다진고기로 감싸 튀겨낸 초 울트라 강추 미도인 한정메뉴",
    aiDescription: "15번 조리 과정을 거쳐, 반숙 계란을 다진고기로 감싸 튀겨낸 초 울트라 강추 미도인 한정메뉴",
    category: "사이드메뉴",
    status: "입고"
  },
  {
    id: '21',
    image:"/Midoin/Menu/청포도_음료.png",
    name: "청포도 에이드",
    price: 3000,
    description: "청포도 에이드",
    aiDescription: "청포도 에이드",
    category: "사이드메뉴",
    status: "입고"
  },
  {
    id: '22',
    image:"/Midoin/Menu/복숭아_음료.png",
    name: "복숭아 에이드",
    price: 3000,
    description: "복숭아 에이드",
    aiDescription: "복숭아 에이드",
    category: "사이드메뉴",
    status: "입고"
  },
  {
    id: '23',
    image:"/Midoin/Menu/망고_음료.png",
    name: "망고 에이드",
    price: 3000,
    description: "망고 에이드",
    aiDescription: "망고 에이드",
    category: "사이드메뉴",
    status: "입고"
  }
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
    const value = menuList.find(menu => menu.id === id)
    setSelectedMenu(value)
    setDetailOpen(true)
  };
  // 업데이트 버튼 클릭시
  const handleUpdateMenu = () => {
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
                                        whiteSpace: "nowrap"
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
              label="주미에서 메뉴을 설명해주세요."
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
