import cn from 'classnames';
import { useRef } from 'react';
import { createPortal } from 'react-dom';

import s from './styles.module.css'

function Modal({ children, isOpen, onClose, ...rest }) {
    const refModal = useRef(null);

    const renderContent = () => {
        if (!isOpen) return null;

        return (
            <div className={ cn(s.modal, { [s.modal_active]: isOpen }) } onMouseDown={onClose}>
                <div className={cn(s.modal__content, { [s.modal__content_active]: isOpen })} onMouseDown={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        );
    }

    return createPortal(renderContent(), document.getElementById('modal-root'));
}

export default Modal;