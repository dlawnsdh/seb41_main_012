import React, { useState, PropsWithChildren } from "react";
import styled from "styled-components";
import { addMatPickers } from "../../utils/usePickersAxios";

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
  top: 250px;
  left: 79px;
  margin: 0;
  width: 370px;
  height: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  border-radius: 3px;
  box-sizing: border-box;
  background-color: white;
  position: fixed;
  z-index: 10020;

  h3 {
    margin: 40px 0;
    font-size: 25px;
  }

  input {
    height: 40px;
    width: 300px;
    padding: 10px;
    border: 1px solid #adadad;
    outline: none;
    border-radius: 12px;
    color: #373737;
    font-size: 1rem;
  }
`;

const TabContainer = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 40px;
  width: 300px;
  padding: 10px;
  border: 1px solid #adadad;
  border-radius: 12px;
`;
const TabButton = styled.li`
  height: 30px;
  width: 30px;
  list-style: none;
  border: solid 1px #373737;
  border-radius: 20px;
  background-color: ${(props) => props.color || "#adadad"};
  border: ${(props) => (props.id === "focused" ? "2.5px solid #C65D7B" : "1px solid #505050")};
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 40px;
  button {
    background-color: #fff;
    cursor: pointer;
    font-size: 20px;
    height: 40px;
    width: 60px;
    margin: 0 20px;
    border: none;
  }
`;

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

const tabs = [
  { index: 1, color: "#098f00" },
  { index: 2, color: "#09d800" },
  { index: 3, color: "#023f00" },
];

const MatPickerCreate = ({ onClickToggleModal }: PropsWithChildren<ModalDefaultType>) => {
  const [colorValue, setColorValue] = useState("");
  const [nameValue, setNameValue] = useState("");

  const closeModal = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClickToggleModal) {
      onClickToggleModal();
    }
  };

  const hadleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };

  const handleMatPickPost = () => {
    if (nameValue && colorValue) {
      addMatPickers(nameValue, colorValue);
      window.location.replace("/pickers");
    }
  };

  return (
    <ModalContainer>
      <DialogBox>
        <label htmlFor="input-title">
          <h3>???????????? ??????</h3>
        </label>
        <input
          id="input-title"
          placeholder="????????? ???????????????"
          value={nameValue || ""}
          onChange={(e) => hadleName(e)}
        />
        <h3>???????????? ??????</h3>
        <TabContainer>
          {tabs.map((el) => (
            <TabButton
              key={el.index}
              id={el.color === colorValue ? "focused" : ""}
              color={el.color}
              onClick={() => {
                setColorValue(el.color);
              }}
            />
          ))}
        </TabContainer>
        <ButtonContainer>
          <button onClick={handleMatPickPost}>??????</button>
          <button onClick={closeModal}>??????</button>
        </ButtonContainer>
      </DialogBox>
      <Backdrop onClick={closeModal} />
    </ModalContainer>
  );
};

export default MatPickerCreate;
