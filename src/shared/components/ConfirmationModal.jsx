import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { AlertTriangle, Info, CheckCircle } from 'lucide-react';

const variantConfig = {
  warning: {
    icon: AlertTriangle,
    color: 'text-yellow-500',
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    severity: 'warning',
  },
  danger: {
    icon: AlertTriangle,
    color: 'text-red-500',
    bg: 'bg-red-100 dark:bg-red-900/30',
    severity: 'danger',
  },
  info: {
    icon: Info,
    color: 'text-blue-500',
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    severity: null,
  },
  success: {
    icon: CheckCircle,
    color: 'text-green-500',
    bg: 'bg-green-100 dark:bg-green-900/30',
    severity: 'success',
  },
};

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'warning',
  isLoading = false,
}) => {
  const { icon: Icon, color, bg, severity } = variantConfig[variant] || variantConfig.warning;

  const footer = (
    <div className="flex gap-3 justify-center pt-2">
      <Button
        label={cancelText}
        severity="secondary"
        outlined
        onClick={onClose}
        disabled={isLoading}
      />
      <Button
        label={isLoading ? 'Loading...' : confirmText}
        severity={severity || 'warning'}
        onClick={onConfirm}
        loading={isLoading}
        disabled={isLoading}
      />
    </div>
  );

  return (
    <Dialog
      visible={isOpen}
      onHide={onClose}
      footer={footer}
      modal
      draggable={false}
      resizable={false}
      closable={false}
      style={{ width: '24rem' }}
      pt={{
        root: { className: 'rounded-xl shadow-xl' },
        content: { className: 'px-6 pt-6 pb-2' },
        footer: { className: 'px-6 pb-6 pt-0 border-0' },
      }}
    >
      <div className="text-center">
        <div className={`inline-flex p-3 rounded-full ${bg} mb-4`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
        {message && <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>}
      </div>
    </Dialog>
  );
};

export default ConfirmationModal;
