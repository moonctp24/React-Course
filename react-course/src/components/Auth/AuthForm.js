import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext); // 인증 컨텍스트 사용

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault(); // 브라우저에 자동 요청값 보내기 방지

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation

    setIsLoading(true);
    let url;
    if (isLogin) { // 현재 로그인이 되어있는지 확인
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCzA1tTN1bPMW0_MgDDJArK5Aj1-v5Fl7k';
    } else { // 현재 로그인 상태가 아니라면 가입 요청
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCzA1tTN1bPMW0_MgDDJArK5Aj1-v5Fl7k'; // [API_KEY]: 프로젝트별 API 키로 할당받은 URL로 대체
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true
      }),
      header: {
        'Content-Type': 'application/json'
      }
    }
    ).then(res => { // 응답(res) 처리
      setIsLoading(false);
      if(res.ok) { // 응답이 제대로 됐다면 어쩌구
        return res.json();
      } else { // 문제가 생겼다면 그 문제(data)를 일단 console.log로 보여줌
        return res.json().then((data)=>{
          // show an error modal
          // console.log(data);
          let errorMessage = 'Authentication Failed!';
          // 에러 메시지 구체적으로 출력 - 오류 객체가 없거나, 정의되지 않았으면
          if(data && data.error && data.error.message){
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        });
      }
    }).then((data)=>{
      authCtx.login(data.idToken);
      history.replace('/'); // 로그인 후 리디렉션
    })
    .catch((err)=>{
      alert(err.message);
    })
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef}/>
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Loading...</p>}
          <button type='button' className={classes.toggle} onClick={switchAuthModeHandler} >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
