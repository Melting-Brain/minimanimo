import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './page/Main';
import Mypage from './page/Mypage';
import Signin from './page/Signin';
import Signup from './page/Signup';
import { useState } from 'react';


const App = () => {
  //로그인 상태관리 여기서 하기
  const [isLogedIn, setIsLogedIn] = useState(true);

  //로그인 상태 변경해줄 함수
  const isLogedInhandler = () => {
    setIsLogedIn(!isLogedIn)
  }
  
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path = '/'>
          <Main isLogedIn={isLogedIn}/>
        </Route>
        <Route path = '/signin'>
          <Signin isLogedIn={isLogedIn} setIsLogedIn={setIsLogedIn} isLogedInhandler={isLogedInhandler}/>
        </Route>
        <Route path = '/signup'>
          <Signup isLogedIn={isLogedIn} setIsLogedIn={setIsLogedIn} isLogedInhandler={isLogedInhandler}/>
        </Route>
        <Route path = '/mypage'>
          <Mypage isLogedIn={isLogedIn}/>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App;