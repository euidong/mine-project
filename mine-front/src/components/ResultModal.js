import React from "react";
import Modal from "react-modal";
import postRecord from "../requests/record/postRecord";

Modal.setAppElement('#root');

function ResultModal(props) {
    const { time, modalIsOpen, setModalOpen, WIDTH, HEIGHT, MINE_PERCENT } = props;
    const closeModal = () => {
        setModalOpen(false);
    };

    const WriteRecord = async (e) => {
        e.preventDefault(e);
        const result = await postRecord(
            e.target.nickName.value, 
            time,
            HEIGHT,
            WIDTH,
            MINE_PERCENT
        );
        if (result === 'success') {
          alert('기록 완료');
          window.location.reload();
        }
        else {
          alert('기록 실패');
        }
    }
    

    return (
        <Modal className={'Modal'} isOpen={modalIsOpen}
               onRequestClose={closeModal}>
            <p> 축하합니다. {time}초 걸렸습니다. </p>
            <form onSubmit={WriteRecord}>
              <label htmlFor="nickName">
                  별칭: 
                  <input type="text" name="nickName"></input>
              </label>
              <input type="submit"></input> 
            </form>
            <button onClick={() => window.location.reload()}>재시작</button>
        </Modal>
    );
}

export default ResultModal;