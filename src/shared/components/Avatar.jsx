import { Avatar as PrimeAvatar } from 'primereact/avatar';
import { cn } from '@shared/utils/cn';

export const Avatar = ({ src, alt, label, icon, size, shape = 'circle', className, children }) => {
  if (src) {
    return (
      <PrimeAvatar
        image={src}
        imageAlt={alt || 'Avatar'}
        shape={shape}
        size={size}
        className={cn(className)}
      />
    );
  }

  if (label) {
    return <PrimeAvatar label={label} shape={shape} size={size} className={cn(className)} />;
  }

  if (icon) {
    return <PrimeAvatar icon={icon} shape={shape} size={size} className={cn(className)} />;
  }

  // Children fallback — wraps children in a styled container
  return (
    <div
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full',
        'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300',
        'items-center justify-center',
        className,
      )}
    >
      {children}
    </div>
  );
};

export const AvatarFallback = ({ children, className }) => {
  return (
    <div className={cn('flex h-full w-full items-center justify-center', className)}>
      {children}
    </div>
  );
};
