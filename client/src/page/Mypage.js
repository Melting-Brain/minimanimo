import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import MypageInfo from '../components/MypageInfo';
import BoardList from '../components/BoardList';
import styled from 'styled-components';


const BoardListWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Mypage = ({ isLogedIn, isLogedInhandler }) => {
  //마이페이지에 처음 들어오면 서버에 get요청을 보내서 내 정보와 내가쓴글을 다 받아와야함.
  const [myBoardListData, setMyBoardListData] = useState([]);
  
  useEffect(() => {
    const newInputInfo = JSON.parse(localStorage.getItem('userInfo'))
    
    const config = {
      headers: {
        authorization: isLogedIn ? `Bearer ${newInputInfo.token}` : undefined,
        'Content-Type': 'application/json',
      }
    };
  
    if(isLogedIn && config.headers.authorization){
      axios
        .get('http://ec2-3-37-98-188.ap-northeast-2.compute.amazonaws.com/api/posts/mine', config) 
        .then((res) => {
          setMyBoardListData([...res.data])
        })
        .catch((err) => {
          console.log('에러났다', err);
        });
    }
  }, [isLogedIn])

  return <>
    <Header isLogedIn={isLogedIn} isLogedInhandler={isLogedInhandler} /> 
    {isLogedIn 
    ? <div>
        <MypageInfo isLogedInhandler={isLogedInhandler} />
        <BoardListWrap>
          <BoardList isLogedIn={isLogedIn} boardListData={myBoardListData} />
        </BoardListWrap>
      </div>
    : <>
        <Link to='/signin' ><img src={'/images/users/loginplz.png'} alt="로그인 한 이후에 mypage로 와주세요"></img></Link>
        <div>로그인 후 이용가능합니다.</div>
      </>
    }
    
  </>
}

export default Mypage;