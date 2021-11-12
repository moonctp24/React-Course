import {useContext} from 'react';

import FavoritesContext from '../store/favorites-context';
import MeetupList from '../components/meetups/MeetupList';

// favorite meetup 보기
function FavoritesPage() {
    const favoritesCtx = useContext(FavoritesContext);

    let content;
    // favorite meetup이 하나도 없을 때 대체 텍스트 출력
    if (favoritesCtx.totalFavorites === 0){
        content = <p>You got no favorites yet. Start adding some?</p>
    } else{ // meetup list 중 favorite한 배열만 추출
        content = <MeetupList meetups={favoritesCtx.favorites} />
    }

    return <section>
        <h1>My Favorites</h1>
        {content}
    </section>
}

export default FavoritesPage;