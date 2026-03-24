import React from 'react';
import { Dialog } from 'primereact/dialog';

const sizeClasses = {
    sm: '30rem',
    md: '40rem',
    lg: '50rem',
    xl: '60rem',
    '2xl': '72rem',
    full: '95vw',
};

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    showCloseButton = true,
    closeOnOutsideClick = true,
}) => {
    return (
        <Dialog
            visible={isOpen}
            onHide={onClose}
            header={title}
            closable={showCloseButton}
            dismissableMask={closeOnOutsideClick}
            modal
            draggable={false}
            resizable={false}
            style={{ width: sizeClasses[size] || sizeClasses.md }}
            pt={{
                root: { className: 'rounded-xl shadow-xl' },
                header: { className: 'border-b border-gray-200 dark:border-gray-700 px-6 py-4' },
                title: { className: 'text-lg font-semibold text-gray-900 dark:text-white' },
                content: { className: 'px-6 py-4' },
            }}
        >
            {children}
        </Dialog>
    );
};

export default Modal;
