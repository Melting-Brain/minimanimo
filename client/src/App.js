import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './page/Main';
import Mypage from './page/Mypage';
import Signin from './page/Signin';
import Signup from './page/Signup';
import { useEffect, useState } from 'react';

import Footer from './components/Footer'


const App = () => {
  //로그인 상태관리 여기서 하기
  const [isLogedIn, setIsLogedIn] = useState(false); // false인데 우측상단 드랍다운 메뉴 안떠서 true로 변경함
  
  // const [userObj, setUserObj] = useState(null)

  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      setIsLogedIn(true)
    } else {
      setIsLogedIn(false)
    }
  }, [])

  //로그인 상태 변경해줄 함수
  const isLogedInhandler = () => {
    setIsLogedIn(!isLogedIn)
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Main isLogedIn={isLogedIn} isLogedInhandler={isLogedInhandler} />
        </Route>
        <Route path='/signin'>
          <Signin isLogedIn={isLogedIn} isLogedInhandler={isLogedInhandler} />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='/mypage'>
          <Mypage isLogedIn={isLogedIn} isLogedInhandler={isLogedInhandler} />
        </Route>
      </Switch>
        <Footer/>
    </BrowserRouter>
  )
}

export default App;