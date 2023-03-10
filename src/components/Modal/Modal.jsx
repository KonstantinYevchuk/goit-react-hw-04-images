import { createPortal } from "react-dom";
import { useEffect } from "react";
import { Backdrop, ModalWindow } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({large, tags, onClose}) => {
    useEffect(() => {
        const keyDownEvent = e => {
            if(e.code === 'Escape') {
                onClose()
            }
        }
        window.addEventListener('keydown', keyDownEvent);

        return () => {
            window.removeEventListener('keydown', keyDownEvent)
        }
    }, [onClose])
 
   const onCloseBackdrop = e => {
        if(e.currentTarget === e.target) {
            onClose()
        }
    }
        return (
            createPortal(<Backdrop onClick={onCloseBackdrop}>
            <ModalWindow>   
                <img src={large} alt={tags} />
            </ModalWindow>
            </Backdrop>, modalRoot)
            )       
}