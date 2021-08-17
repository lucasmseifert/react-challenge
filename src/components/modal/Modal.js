import React, { useRef } from "react";
import ReactDom from "react-dom";
import { FaTimes } from "react-icons/fa";
import './Modal.css';

function Modal({ children, isOpen, setIsOpen }) {

  const modalRef = useRef(null);

  function clickHandler(event) {
    // If this is true, the overlay was clicked, so we close the modal
    if (event.target === modalRef.current) {
      setIsOpen(false);
    }
  }

  // Use a portal to prevent z-index issues. #modal-root is placed after #root on index.html
  return ReactDom.createPortal(
    <div className='modal' onClick={clickHandler} ref={modalRef}>
      <div className='modal__content'>
        <div className='modal__close'>
          <button className='button button--icon' autoFocus onClick={() => setIsOpen(false)} aria-label='Close' title='Close'><FaTimes /></button>
        </div>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

export default Modal;