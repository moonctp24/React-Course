import React, {useCallback, useEffect, useState}from 'react';

let logoutTimer; // 로그인 유효시간 관리 타이머를 전역변수로 선언

const AuthContext = React.createContext({
    token:'', // token wjwkd
    isLoggedIn: false, // 로그인 여부
    login: (token) => {},
    lotout: () => {}
});

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime(); // 현재시간
    const adjExpirationTime = new Date(expirationTime).getTime(); // 만료될 시간

    const remainingDuration = adjExpirationTime - currentTime; // 남은 시간 = 만료될 시간-현재시간

    return remainingDuration;
};

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedExpirationDate = localStorage.getItem('expirationTime');

    const remainingTime = calculateRemainingTime(storedExpirationDate);

    if(remainingTime <= 3600) {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        
        return null;
    }

    return {
        token: storedToken,
        duration: remainingTime
    };
};

export const AuthContextProvier = (props) => {
    const tokenData = retrieveStoredToken();
    let initialToken;
    if (initialToken) {
        initialToken = tokenData.token;
    }
    const [token, setToken] = useState(initialToken) // token의 상태를 관리함으로써 로그인 상태는 자동 관리됨
    
    const userIsLoggedIn = !!token; // true, false boolean 값으로 자동 변환

    const logoutHandler = useCallback(() => {
        setToken(null); // token을 null로 만듦으로써 logout처리
        localStorage.removeItem('token'); // 'token' 키 값 삭제
        localStorage.removeItem('expirationTime');

        if (logoutTimer) { // 타이머 삭제
            clearTimeout(logoutTimer);
        }
    }, []);

    const loginHandler = (token, expirationTime) => {
        setToken(token);
        localStorage.setItem('token', token); // 'token' 키 값으로 관리
        localStorage.setItem('expirationTime', expirationTime);

        const remainingTime = calculateRemainingTime(expirationTime);

        logoutTimer = setTimeout(logoutHandler, remainingTime); // 만료되면 logout // test할 때 3000밀리초로 바꾸고 실험
    };

    useEffect(() => {
        if (tokenData) {
            console.log(tokenData.duration);
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    }, [tokenData, logoutHandler]);

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    };

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
};

export default AuthContext;