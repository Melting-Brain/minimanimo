import { useState } from 'react';
// import { useHistory } from 'react-router';
import styled from 'styled-components';
import Modal from 'react-modal';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

const InfoWrap = styled.div`
  >img {
    width: 30vh;
    height: 30vh;
    border-radius: 50%;
    border: 1px solid #eee;
  }
  >div {
    margin-top: 0.2rem;
    font-size: 1.4rem;
    font-weight: bold;
  }
  >button {
    margin: 0.5rem;
    padding: 0.4rem 1rem;
    color: #fff;
    font-weight: bold;
    background: #387099;
    box-sizing: border-box;
  }
  >button:hover {
    background: #EDC51E;
  }
`
const ContentWrap = styled.div`
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const ContentBox = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input {
    padding: 0.2rem 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  input:focus {
    border: 1px solid #EDC51E;
    outline: 1px solid #EDC51E;
  }
  >img {
    width: 10vh;
    height: 10vh;
    margin-bottom: 1rem;
    border-radius: 50%;
    border: 3px solid #387099;
  }

  span {
    margin-bottom: 0.4rem;
    font-size: 0.9rem;
    color: tomato;
    /* margin-top: 0.4rem; */
  }
`
const ImgWrap = styled.div`
  overflow: auto;
  margin-bottom: 1.5rem;

  img:hover {
    border: 2px solid #EDC51E;
  }

`
const Img = styled.img`
  width: 5rem;
  height: 5rem;
  margin: 0.5rem;
  border-radius: 50%;
  border:  2px solid #eee;
`
const CloseBtn = styled.div`
  font-size: 1.5rem;
  position: absolute;
  top: 0.3rem;
  right: 1rem;
  cursor: pointer;
  
  &:hover {
    color: #EDC51E;
  }
`
const BtnWrap = styled.div`
  display: flex;
`
const ReSignBtn = styled.button`
  flex: 1 0 0;
  margin-left: 1rem;
  padding: 0.4rem 0;
  color: #ffffff;
  font-weight: bold;
  letter-spacing: 0.2rem;
  background: #387099;
  border: 0.2rem solid #387099;

  &:hover {
    color: #EDC51E;
    background: #fff;
    border: 0.2rem solid #EDC51E;
  }
  &:active {
    color: red;
    background: #fff;
    border: 0.2rem solid red;
  }
`
const CancelBtn = styled.button`
  flex: 1 0 0;
  padding: 0.2rem 0;
  color: #ffffff;
  font-weight: bold;
  letter-spacing: 0.2rem;
  background: #888;
  border: 0.2rem solid #888;

  &:hover {
    color: #888;
    background: #fff;
    border: 0.2rem solid #888;
  }
`

const IsValidNick = styled.div`
  visibility: ${({visibility}) => visibility? 'hidden': 'visible'};
  `

const IsValidNick2 = styled.div`
  visibility: ${({visibility}) => visibility? 'visible': 'hidden'};
`


export default function MypageInfo ({ isLogedInhandler }) {
  const newInputInfo = JSON.parse(localStorage.getItem('userInfo'))
  const [reSignIsOpen, setReSignIsOpen ] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [editNewNickname, setEditNewNickname] = useState('')
  const [validNickname, setValidNickname] = useState(false)
  const [isExistNickname, setIsExistNickname] = useState(false)
  const [selectImg , setSelectImg] = useState(newInputInfo.image.split("/")[3].split('.')[0])

  // const history = useHistory()
  
  const reSignModalhandler = () => {
    setReSignIsOpen(!reSignIsOpen)
  }

  const editModalhandler = () => {
    setEditIsOpen(!editIsOpen)
  }
  
  const editNewNicknameHandler = (e) => {
    setEditNewNickname(e.target.value)
    const nicknameExp = /^([a-zA-Z0-9???-???|???-???|???-???]).{1,10}$/;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

      if (!nicknameExp.test(e.target.value)) {
        setValidNickname(false)
        //??? ??????????????? ????????? ????????? ???????????? ??????????????? ????????? ??????????????? ???????????? ???????????????.
      }
      else {
        //????????? axios???????????? ?????????????????? ?????????.
        axios.post('http://ec2-3-37-98-188.ap-northeast-2.compute.amazonaws.com/api/validate/nickname', { nickname : e.target.value}, config)
        .then(res => {
          setIsExistNickname(false)
          setValidNickname(true)
        })
        .catch(err => {
          setIsExistNickname(true)
        })
      }
  }

  const selectImgHanlder = (e) => {
    setSelectImg(e.target.dataset.name)
  }
  
  const reSignhandler = () => {
    axios.delete('http://ec2-3-37-98-188.ap-northeast-2.compute.amazonaws.com/api/users/profile', {
      headers: {
        Authorization: `Bearer ${newInputInfo.token}`,
        'Content-Type': 'application/json',
      }}
      )
      .then(res => {
        reSignModalhandler()
        isLogedInhandler()
        localStorage.removeItem('userInfo')
      }).catch(err=> {
        
      })
  }

  const editUserInfoHandler = () => {
    //setIsExistNickname (true))????????? selectImg ?????? (true) ?????? ????????? ?????? true ?????? ??????????????? ?????????.
    
    if(editNewNickname === '' && !isExistNickname && selectImg !== newInputInfo.image.split("/")[3].split('.')[0]){
      //???????????? ????????? ?????? ????????? ???????????? ??????.
      axios.put('http://ec2-3-37-98-188.ap-northeast-2.compute.amazonaws.com/api/users/profile', 
      {
        image : `/images/users/${selectImg}.jpeg`,
        nickname : newInputInfo.nickname
      }, {
        headers: {
          Authorization: `Bearer ${newInputInfo.token}`,
          'Content-Type': 'application/json',
        }
      })
      .then(res => {
        // console.log(1)
        // console.log(res.data)
        setEditIsOpen(false)
        //??????????????? image??? ???????????????. ????????? ?????? ??????????????? ???????????? ????????? ??????????????? ???.
        localStorage.setItem('userInfo', JSON.stringify({...newInputInfo, image:res.data.image}))
        window.location.reload()
      })
      .catch(err => {
        
      })
    }
    else if (editNewNickname !== '' && !isExistNickname && validNickname) {
      axios.put('http://ec2-3-37-98-188.ap-northeast-2.compute.amazonaws.com/api/users/profile', 
      {
        image : `/images/users/${selectImg}.jpeg`,
        nickname : editNewNickname
      }, {
        headers: {
          Authorization: `Bearer ${newInputInfo.token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        // console.log(2)
        // console.log(res.data)
        setEditIsOpen(false)
        localStorage.setItem('userInfo', JSON.stringify({...newInputInfo, image:res.data.image, nickname: res.data.nickname}))
        window.location.reload()
      })
    }
  }

  // Advanced: ?????????????????? ?????? ?????? ????????? ???????????? ?????? ??? ??????????????? ????????? ??????
  return <InfoWrap>
    <img src={JSON.parse(localStorage.getItem('userInfo')).image} alt="???????????????"/>
    <div>{JSON.parse(localStorage.getItem('userInfo')).nickname}</div>
    
{/************ ???????????? ?????? ????????? ************/}
    { editIsOpen 
    ? <Modal isOpen={editIsOpen} onRequestClose={editModalhandler}  ariaHideApp={false} contentLabel="Selected Option"
    style={{
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      content: {
        width: '50vw',
        height: '50vh',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '0',
        position: 'relative',
        inset: '0'
      }
    }}>
      <CloseBtn onClick={editModalhandler}><FaTimes /></CloseBtn>
      <ContentWrap>
        {/* ????????? */}
        <ContentBox>
          <ImgWrap>
            {Array(8).fill().map((v,i) => i+1).map((el) => {
              return <Img src={`/images/users/${el}.jpeg`} alt="????????? ?????????" key={el} data-name={el} onClick={selectImgHanlder}/>
            })}
          </ImgWrap>
          {/* input */}
          <img src={`/images/users/${selectImg}.jpeg`} alt="????????? ?????????" />
          <input type="nickname" placeholder="Edit New Nickname" value={editNewNickname} onChange={editNewNicknameHandler}/>
          {/* { editNewNickname === '' || validNickname  ? null : <span>???????????? ???????????? 2?????? ?????? 10?????? ???????????? ?????????.</span> } */}
          <IsValidNick  visibility={editNewNickname === '' || validNickname ? 1 : 0}><span>???????????? ???????????? 2?????? ?????? 10?????? ???????????? ?????????.</span></IsValidNick>
          {/* { isExistNickname ? <span>????????? ??????????????????.</span> : null} */}
          <IsValidNick2 visibility={isExistNickname ? 1 : 0}><span>????????? ??????????????????.</span></IsValidNick2>
        </ContentBox>
        <BtnWrap>
          <CancelBtn onClick={editModalhandler}>Cancle</CancelBtn>
          <ReSignBtn onClick={editUserInfoHandler} >OK</ReSignBtn>
        </BtnWrap>
      </ContentWrap>
    </Modal>
  : <button onClick={editModalhandler}>????????????</button>
    }
    
{/************ ?????? ?????? ????????? ************/}
    { reSignIsOpen 
    ? <Modal isOpen={reSignIsOpen} onRequestClose={reSignModalhandler}  ariaHideApp={false} contentLabel="Selected Option"
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        },
        content: {
          width: '40vw',
          height: '30vh',
          border: '1px solid #ccc',
          background: '#fff',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '4px',
          outline: 'none',
          padding: '0',
          position: 'relative',
          inset: '0'
        }
      }}>
        <CloseBtn onClick={reSignModalhandler}><FaTimes /></CloseBtn>
        <ContentWrap>
          <ContentBox><span>?????? ??? ???????????? ?????? ???????????????.<br />?????????????????????????</span></ContentBox>
          <BtnWrap>
            <CancelBtn onClick={reSignModalhandler}>Cancel</CancelBtn>
            <ReSignBtn onClick={reSignhandler}>ReSign</ReSignBtn>
          </BtnWrap>
        </ContentWrap>
      </Modal>
    : <button onClick={reSignModalhandler}>????????????</button> }
  </InfoWrap>
};
