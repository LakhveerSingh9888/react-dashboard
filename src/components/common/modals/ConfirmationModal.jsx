import React from 'react';
import PropTypes from 'prop-types';
import { AlertTriangle, Info, CheckCircle } from 'lucide-react';
import Modal from './Modal';

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    type = 'danger', // danger, warning, info, success
    isLoading = false,
}) => {
    const styles = {
        danger: {
            icon: AlertTriangle,
            iconColor: 'text-red-600 dark:text-red-500',
            iconBg: 'bg-red-100 dark:bg-red-900/30',
            buttonBg: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
        },
        warning: {
            icon: AlertTriangle,
            iconColor: 'text-yellow-600 dark:text-yellow-500',
            iconBg: 'bg-yellow-100 dark:bg-yellow-900/30',
            buttonBg: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
        },
        info: {
            icon: Info,
            iconColor: 'text-blue-600 dark:text-blue-500',
            iconBg: 'bg-blue-100 dark:bg-blue-900/30',
            buttonBg: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
        },
        success: {
            icon: CheckCircle,
            iconColor: 'text-green-600 dark:text-green-500',
            iconBg: 'bg-green-100 dark:bg-green-900/30',
            buttonBg: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
        },
    };

    const currentStyle = styles[type] || styles.info;
    const Icon = currentStyle.icon;

    const footer = (
        <>
            <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white transition-all duration-200"
                onClick={onClose}
                disabled={isLoading}
            >
                {cancelText}
            </button>
            <button
                type="button"
                className={`px-4 py-2 text-sm font-medium text-white border border-transparent rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${currentStyle.buttonBg} ${isLoading ? 'opacity-75 cursor-wait' : 'hover:shadow-lg transform hover:-translate-y-0.5'} transition-all duration-200`}
                onClick={onConfirm}
                disabled={isLoading}
            >
                {isLoading ? 'Processing...' : confirmText}
            </button>
        </>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="" // Custom header layout
            footer={footer}
            size="sm"
        >
            <div className="sm:flex sm:items-start">
                <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-12 sm:w-12 ${currentStyle.iconBg} mb-4 sm:mb-0`}>
                    <Icon className={`h-6 w-6 ${currentStyle.iconColor}`} aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-bold text-gray-900 dark:text-white" id="modal-title">
                        {title}
                    </h3>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                            {message}
                        </p>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

ConfirmationModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    type: PropTypes.oneOf(['danger', 'warning', 'info', 'success']),
    isLoading: PropTypes.bool,
};

export default ConfirmationModal;
