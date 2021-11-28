// 우리가 가진 모든 meetup을 로드하고 출력하는 컴포넌트
import { useState, useEffect } from "react";

import MeetupList from "../components/meetups/MeetupList";

/*
const DUMMY_DATA = [
    {
      id: 'm1',
      title: 'This is a first meetup',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg',
      address: 'Meetupstreet 5, 12345 Meetup City',
      description:
        'This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!',
    },
    {
      id: 'm2',
      title: 'This is a second meetup',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg',
      address: 'Meetupstreet 5, 12345 Meetup City',
      description:
        'This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!',
    },
];
*/

function AllMeetupsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]); // 처음엔 빈 배열, 나중에 data 넣어줌

  useEffect(() => {
    setIsLoading(true);
    // 밑에 return으로 가기전에 fetch로 데이터 가져오기
    fetch('https://react-getting-started-b9b22-default-rtdb.firebaseio.com/meetups.json'
    ).then((response) =>{ // .json으로 response에서 body(본문) 읽기
      return response.json(); // json이 promise를 반환하기 때문에 이 promise가 해결될 때까지 기다려야 한다. 그래서 return 으로 response.json 반환
    }).then(data => { // 실제 data 얻기
      // 중첩된 객체를 배열로 저장, 변환
      const meetups = [];

      for (const key in data) {
        const meetup = {
          id: key,
          ...data[key]
        };
        meetups.push(meetup);
      }

      setIsLoading(false);
      setLoadedMeetups(meetups); // '그' 나중
    });
  }, []);
  
  if (isLoading) { // 로딩할 때 띄울거
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  } // 로딩이 완료된면 밑에 데이터 출력할 수 있음

    return <section>
        <h1>All Meetups</h1>
        <ul>
            <MeetupList meetups={loadedMeetups} />
        </ul>
    </section>
}

export default AllMeetupsPage;
