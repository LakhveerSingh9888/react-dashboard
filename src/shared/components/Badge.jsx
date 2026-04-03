import { Tag } from 'primereact/tag';
import { cn } from '@shared/utils/cn';

const severityMap = {
  default: null,
  secondary: 'secondary',
  destructive: 'danger',
  success: 'success',
  warning: 'warning',
  info: 'info',
};

export const Badge = ({ className, variant = 'info', children, value, ...props }) => {
  const severity = severityMap[variant] ?? null;

  return <Tag severity={severity} value={value ?? children} className={cn(className)} {...props} />;
};
