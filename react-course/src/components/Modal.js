function Modal(props){
    // cancel 클릭 이벤트
    function cancelHandler() {
        props.onCancel();
    }
    // confirm 클릭 이벤트
    function confirmHandler() {
        props.onConfirm();
    }
    return <div className='modal'>
        <p>Are you sure?</p>
        <button className='btn btn--alt' onClick={cancelHandler}>Cancel</button>
        <button className='btn' onClick={confirmHandler}>Comfirm</button>
    </div>
}

export default Modal;