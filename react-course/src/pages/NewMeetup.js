import {useHistory} from 'react-router-dom';

import NewMeetupForm from "../components/meetups/NewMeetupForm";

// 새 meetup 추가
function NewMeetupPage() {
    const history = useHistory();

    function addMeetupHandler(meetupData) {
        // firebase 연결
        // fetch: HTTP 요청을 보낼 수 있는 기능
        fetch('https://react-getting-started-b9b22-default-rtdb.firebaseio.com/meetups.json',{
            method: 'POST',
            body: JSON.stringify(meetupData),
            headers: {'Content-Type':'application/json'}
        }).then(() => {
            history.replace('/');
        });
    }
    return <section>
        <h1>Add New Meetup</h1>
        <NewMeetupForm onAddMeetup={addMeetupHandler}/>
    </section>
}

export default NewMeetupPage;