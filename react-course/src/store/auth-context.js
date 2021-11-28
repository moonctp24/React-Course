import React, {useState}from 'react';

const AuthContext = React.createContext({
    token:'', // token wjwkd
    isLoggedIn: false, // 로그인 여부
    login: (token) => {},
    lotout: () => {}
});

const AuthContextProvier = (props) => {
    const [token, setToken] = useState(null) // token의 상태를 관리함으로써 로그인 상태는 자동 관리됨
    
    const userIsLoggedIn = !!token; // true, false boolean 값으로 자동 변환

    return <AuthContext.Provider>{props.children}</AuthContext.Provider>
}