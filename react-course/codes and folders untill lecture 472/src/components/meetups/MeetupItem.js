import { useContext } from 'react'; // 컴포넌트와 컨텍스트 사이 연결

import classes from './MeetupItem.module.css';
import Card from '../ui/Card';
import FavoritesContext from '../../store/favorites-context'; // export한 것 중 context만 가져오자

function MeetupItem(props){
    const favoritesCtx = useContext(FavoritesContext);

    // 그 id가 있는지 없는지 true, false로 반환
    const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);

    // 이미 favorite에 있는지 확인하고 text 변경 함수
    function toggleFavoriteStatusHandler() {
        if(itemIsFavorite) { // 이미 favoriet에 있는거면 remove
            favoritesCtx.removeFavorite(props.id);
        } else {
            favoritesCtx.addFavorite({ // 없으면 add
                id: props.id,
                title: props.title,
                description: props.description,
                image: props.image,
                address: props.address,
            });
        }
    }

    return <li className={classes.item}>
        <Card>
            <div className={classes.image}>
                <img src={props.image} alt={props.title} />
            </div>
            <div className={classes.content}>
                <h3>{props.title}</h3>
                <address>{props.address}</address>
                <p>{props.description}</p>
            </div>
            <div className={classes.actions}>
                <button onClick={toggleFavoriteStatusHandler}>{itemIsFavorite ? 'Remove from Favorites' : 'To Favorites'}</button>
            </div>
        </ Card>
    </li>
}

export default MeetupItem;

