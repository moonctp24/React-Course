import { useState } from 'react';
import Backdrop from "./Backdrop";
import Modal from "./Modal";

// function name should be started capital char - builtin HTML과 구분하기 위해
function Todo(props){ // props를 통해 함수의 인수처럼 데이터를 받음
    // useState함수 - initial state를 'false'로 함으로써 평상시에는 나타나지 않음
    // useState는 두개의 값을 배열로 반환하기 때문에 아래와 같이 const 배열에 값을 저장
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // delete 버튼 클릭 이벤트 처리 함수
    function deleteHandler() {
        setModalIsOpen(true);
    }

    // 배경(backdrop)을 클릭하면 modal이 닫히게 되는 함수
    function closeModalHandler() {
      setModalIsOpen(false);
    }

    // 반드시 랜더링할 수 있는 것을 return
    return(
        <div className='card'>
        <h2>{props.text}</h2>
        <div className='actions'>
          <button className='btn' onClick={deleteHandler}>Delete</button>
        </div>
        {modalIsOpen ? <Modal onCancel={closeModalHandler} onConfirm={closeModalHandler}/> : null}
        {modalIsOpen ? <Backdrop onCancel={closeModalHandler}/> : null}
      </div>
    )
}

export default Todo; // 외부에서도 이 파일을 사용할 수 있음


