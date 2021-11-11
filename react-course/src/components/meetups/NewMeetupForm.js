import {useRef} from 'react'; // use ref hook

import Card from '../ui/Card';
import classes from './NewMeetupForm.module.css';

function NewMeetupForm() {
    // ref객제 생성하여 const 상수에 저장
    const titleInputRef=useRef();
    const imageInputRef=useRef();
    const addressInputRef=useRef();
    const descriptionInputRef=useRef();
    
    function submitHandler(event) {
        event.preventDefault(); // 브라우저 기본 값을 방지하여 페이지가 reload되지 않고 양식 제출 가능

        // .current.value: 입력 요소를 나타내는 JS객체의 값 속성, 이 값 속성은 현재 입력된 값을 보유 => 사용자 입력 추출
        const enteredTitle = titleInputRef.current.value;
        const enteredImage = imageInputRef.current.value;
        const enteredAddress = addressInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;

        const meetupData = {
            title: enteredTitle,
            image: enteredImage,
            address: enteredAddress,
            description: enteredDescription,
        };

        console.log(meetupData);
    }
    return (
        <Card>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='title'>Meetup Title</label>
                    <input type='text' required id='title' ref={titleInputRef}/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='image'>Meetup Image</label>
                    <input type='url' required id='image' ref={imageInputRef}/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='address'>Address</label>
                    <input type='text' required id='address' ref={addressInputRef}/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='description'>Description</label>
                    <textarea id='description' required rows='5' ref={descriptionInputRef}></textarea>
                </div>
                <div className={classes.action}>
                    <button>Add Meetup</button>
                </div>
            </form>
        </Card>
    );
}

export default NewMeetupForm;