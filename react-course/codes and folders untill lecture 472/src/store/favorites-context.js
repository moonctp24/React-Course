import { createContext, useState } from "react";

const FavoritesContext = createContext({
    // 초기 상태
    favorites: [],
    totalFavorites: 0,
    // 상태 변화
    addFavorite: (favoriteMeetup) => {},
    removeFavorite: (meetupId) => {},
    itemIsFavorite: (meetupId) => {}
});
// 초기 상태에서 즐겨찾기 추가 및 제거에 따른 값 변화 컴포넌트 추가
// 함수 따로 export
export function FavoritesContextProvider(props) {
    const [userFavorites, setUserFavorites] = useState([]);

    function addFavoriteHandler(favoriteMeetup) {
        setUserFavorites((prevUserFavorites) => {
            return prevUserFavorites.concat(favoriteMeetup); // concat: 다음 meetup이 추가된 새로운 배열 생성
        });
    }

    function removeFavoriteHandler(meetupId) {
        setUserFavorites(prevUserFavorites => {
            return prevUserFavorites.filter(meetup => meetup.id !== meetupId);
        });
    }

    // 주어진 항목이 favorite인지 여부 판단 함수
    function itemIsFavoriteHandler(meetupId) {
        return userFavorites.some(meetup => meetup.id === meetupId); // some: 탐색 내장 함수
    }

    const context = {
        favorites: userFavorites,
        totalFavorites: userFavorites.length,
        addFavorite: addFavoriteHandler,
        removeFavorite: removeFavoriteHandler,
        itemIsFavorite: itemIsFavoriteHandler
    };

    // 자동으로 랩핑
    return <FavoritesContext.Provider value={context}>
        {props.children}
    </FavoritesContext.Provider>
}

export default FavoritesContext; // context를 기본값으로 export