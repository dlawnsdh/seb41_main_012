import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import axios from "axios";

const ModalContainer = styled.div`
  height: 100%;
  width: calc(1340px * 2 / 5 - 63px);
  z-index: 1000;
`;

const Backdrop = styled.div`
  top: 0;
  left: 0;
  width: calc(1340px * 2 / 5 - 63px);
  height: 100vh;
  position: fixed;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.2);
`;

const DialogBox = styled.dialog`
  top: 400px;
  left: 79px;
  margin: 0;
  width: 370px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 3px;
  box-sizing: border-box;
  background-color: white;
  position: fixed;
  z-index: 10020;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 40px;
  button {
    height: 40px;
    width: 60px;
    margin: 0 20px;
    border: 1px solid black;
    border-radius: 20px;
  }
`;

interface ModalDefaultType {
  onClickToggleModal: () => void;
  id: number;
}

const MatPickerDelete = ({
  onClickToggleModal,
  id,
}: PropsWithChildren<ModalDefaultType>) => {
  const closeModal = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClickToggleModal) {
      onClickToggleModal();
    }
  };

  const handleMatPickDelete = () => {
    deleteMatPickers();
  };

  const deleteMatPickers = async () => {
    await axios
      .delete(`http://localhost:3001/groups/${id}`)
      .then(() => {
        window.location.replace("/pickers");
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <ModalContainer>
      <DialogBox>
        정말 삭제하시겠습니까?
        <ButtonContainer>
          <button onClick={handleMatPickDelete}>예</button>
          <button onClick={closeModal}>아니오</button>
        </ButtonContainer>
      </DialogBox>
      <Backdrop onClick={closeModal} />
    </ModalContainer>
  );
};

export default MatPickerDelete;