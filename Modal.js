import React from 'react';
import styled from 'styled-components';

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = React.useRef(null);

  React.useEffect(() => {
    if (!isOpen) return;

    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, [isOpen])

  const handleClick = e => {
    e.stopPropagation();
    
    if (e.target === modalRef.current) return;

    onClose();
  }

  return (
    <Wrapper ref={modalRef} isOpen={isOpen}>
      <button className="close-btn" onClick={onClose}>𝖷</button>
      { isOpen && children }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 768px;
  height: 60vh;
  width: 90%;
  position: fixed;
  top: 10vh;
  background: #fff;
  transition: box-shadow .15s,
    opacity .15s,
    transform .25s cubic-bezier(0.36, 0.7, 0.01, 1);
  ${({ isOpen }) => isOpen
    ? `
      box-shadow: 0px 0px 100vh 100vh rgba(0,0,0,.5), 0px 4px 4px rgba(0,0,0,.5);
      opacity: 1;
      transform: translateY(0%);
      pointer-events: auto;
    `
    : `
    box-shadow: 0px 0px 0px 0px;
    opacity: 0;
    transform: translateY(20%);
    pointer-events: none;
    `
  };

  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    color: #797979;
    font-size: 20px;
    cursor: pointer;
  }
`

export default Modal;
