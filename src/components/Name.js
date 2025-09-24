import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Header from "./Header";

const fadeIn = keyframes`
  0% { transform: translateY(100%); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 81px);
  margin-top: 81px;
  background: #f7f7f7;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  animation: ${fadeIn} 1s ease forwards;
  z-index: 1000;
  padding-top: 2rem;
`;

const HiddenInput = styled.input`
  position: absolute;
  left: -9999px;
  opacity: 0;
`;

const Label = styled.div`
  font-size: 3.625rem;
  font-family: "Zen Dots", sans-serif;
  font-weight: 400;
  font-style: normal;
  color: #121212;
  position: absolute;
  top: 10%;
  margin-bottom: 1rem;
`;

const TextBox = styled.div`
  width: 58rem;
  height: 14rem;
  background-color: #e9efda;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 25%;
  cursor: text;
`;

const Staff = styled.div`
  position: relative;
  width: 85%;
  height: 15rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: "";
    position: absolute;
    top: 25%;
    left: 0;
    width: 100%;
    height: 60%;
    background-image: linear-gradient(to bottom, black 2px, transparent 1px);
    background-size: 100% 20%;
    opacity: 0.7;
  }
`;

const NotesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: -30px;
  position: relative;
  z-index: 1;
`;

const Note = styled.img`
  height: ${({ noteType }) => (noteType === "large" ? "82px" : "65px")};
  transform: translateY(${({ randomY }) => `${randomY}px`});
  transition: none;
`;

const TextBoxFooter = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-family: "timeline-210", sans-serif;
  font-weight: 400;
  font-size: 1.5rem;
  color: #a1a1a1;
`;

const TextBoxFooterLeft = styled.div`
  text-align: left;
  margin-left: 4rem;
`;

const TextBoxFooterRight = styled.div`
  text-align: right;
  margin-right: 4rem;
`;

const ButtonBg = styled.img`
  margin-top: 1.5rem;
  width: 20rem;
  height: auto;
  z-index: 0;
  position: relative;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 3rem;
  margin-top: -4.5rem;
  z-index: 1;
`;

const ColorButtonContainer = styled.div`
  display: flex;
  flex-direction: column; // 수직 배치
  gap: 0.5rem; // 버튼 그룹과 텍스트 사이의 간격
  margin-top: 14.5rem;
  align-items: center; // 가로축 중앙 정렬
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const SelectColor = styled.p`
  font-size: 1.5rem;
  color: #a1a1a1;
  margin-top: 0.5rem;
`

const ColorButton = styled.img`
  width: 100%;
  cursor: pointer;
  border-bottom: ${({ isSelected }) => (isSelected ? "5px solid #a1a1a1" : "none")};
  padding: 0.2rem;
`;

const Name = ({ text, onClose }) => {
  const [name, setName] = useState("");
  const [randomPositions, setRandomPositions] = useState([]);
  const [selectedColor, setSelectedColor] = useState("pink");

  useEffect(() => {
    const input = document.getElementById("hidden-input");
    if (input) input.focus();
  }, []);

  const getFixedRandomPosition = (char, index) => {
    const seed = char.charCodeAt(0) + index;
    return ((seed * 9301 + 49297) % 233280) / 233280 * 40 - 20;
  };

  const handleChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z]/g, "").slice(0, 10);
    setName(value);
    const positions = value.split("").map((char, i) => getFixedRandomPosition(char, i));
    setRandomPositions(positions);
  };

  const getNoteType = (char) => {
    const largeNotes = ["a", "e", "i", "m", "n", "r", "v"];
    return largeNotes.includes(char.toLowerCase()) ? "small" : "large";
  };

  const letterToImage = (letter, color) => {
    const baseName = letter.toLowerCase();
    if (color === "black") {
      return `/images/notes_b/${baseName}_b.png`;
    } else {
      return `/images/notes/${baseName}.png`;
    }
  };

  const handleTextBoxClick = () => {
    const input = document.getElementById("hidden-input");
    if (input) input.focus();
  };

  const handlePrev = () => {
    if (onClose) onClose();
    console.log("이전 컴포넌트로 이동");
  };

  const handleNext = () => {
    console.log("다음 컴포넌트로 이동");
  };

  return (
    <>
      <Header zIndex="500" />
      <Overlay>
        <Label>( Your Name )</Label>

        <TextBox onClick={handleTextBoxClick}>
          <Staff>
            <NotesContainer>
              {name.split("").map((char, i) => (
                <Note
                  key={`${char}-${i}`}
                  src={letterToImage(char, selectedColor)}
                  noteType={getNoteType(char)}
                  randomY={randomPositions[i] || 0}
                />
              ))}
            </NotesContainer>
          </Staff>

          <TextBoxFooter>
            <TextBoxFooterLeft>Only alphabets</TextBoxFooterLeft>
            <TextBoxFooterRight>{name.length} / 10 words</TextBoxFooterRight>
          </TextBoxFooter>
        </TextBox>

        {/* 여기에 ColorButtonContainer 추가 */}
        <ColorButtonContainer>
        <ButtonsWrapper>
          <ColorButton
            src="/images/pink.svg"
            onClick={() => setSelectedColor("pink")}
            isSelected={selectedColor === "pink"}
            alt="Pink color"
          />
          <ColorButton
            src="/images/black.svg"
            onClick={() => setSelectedColor("black")}
            isSelected={selectedColor === "black"}
            alt="Black color"
          />
        </ButtonsWrapper>
          <SelectColor>Select Color</SelectColor>
        </ColorButtonContainer>

        <ButtonBg src="/images/buttonBg.svg" alt="Button bg" />
        <ButtonContainer>
          <img
            src="/images/button1.svg"
            alt="Prev"
            onClick={handlePrev}
            style={{ cursor: "pointer", width: "1.87rem", height: "auto" }}
          />
          <img
            src="/images/button2.svg"
            alt="Next"
            onClick={handleNext}
            style={{ cursor: "pointer", width: "4rem", height: "auto" }}
          />
          <img
            src="/images/button3.svg"
            alt="Next"
            onClick={handleNext}
            style={{ cursor: "pointer", width: "1.87rem", height: "auto" }}
          />
        </ButtonContainer>

        <HiddenInput
          id="hidden-input"
          type="text"
          value={name}
          maxLength={10}
          onChange={handleChange}
          autoFocus
        />
      </Overlay>
    </>
  );
};

export default Name;