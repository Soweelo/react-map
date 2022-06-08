import styled from 'styled-components';
import React from "react";
import "./modal.css"
import ClearIcon from "@mui/icons-material/Clear";
import { useRef, useEffect, useCallback, useState } from "react";
import { useSpring, animated } from "react-spring";
import Quizz from "../quizz/Quizz";
import iframeObserver from "../../functions/iframeObserver";

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  z-index: 201;
`;

const ModalWrapper = styled.div`
  width: min(800px, 90vw);
  height: min(700px, 90vh);
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 21;
  border-radius: 10px;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  scrollbar-width: none;
`;
const CloseModalButton = styled(ClearIcon)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
  border-radius: 50%;
  background-color: #eeeeeec9;
`;
export default function Modal({ showModal }) {
  const [isClicked, setIsClicked] = useState(false);
  const modalRef = useRef();
  const animation = useSpring({
    config: {
      duration: 450,
    },
    opacity: !showModal.get() ? 1 : 0,
    transform: !showModal.get() ? `translateY(0%)` : "translateY(-100%)",
  });
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      showModal.set(false);
    }
  };
  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        showModal.set(false);
        // console.log(text);
        setIsClicked(false);
      }
    },
    [ showModal, setIsClicked]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);
  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    const html = document.getElementsByTagName("html")[0];
    if (showModal.get()) {
      body.style.overflow = "hidden";
      html.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
      html.style.overflow = "auto";
    }
  }, [showModal]);

  return (
    <>
      {showModal.get() && (
        <Background onClick={closeModal} className={"background"}>
          <animated.div
            style={animation}
            ref={modalRef}
            className="animated-div"
          >
            <ModalWrapper>
              <div id="modalContent" className={"modalContent"}>
                <Quizz showModal={showModal} />
              </div>
              <CloseModalButton
                aria-label="Close modal"
                onClick={() => showModal.set((prev) => !prev)}
              ></CloseModalButton>
            </ModalWrapper>
          </animated.div>
        </Background>
      )}
    </>
  );
}
