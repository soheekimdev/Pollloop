import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closeOnScrimClick?: boolean;
  width?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
  className?: string;
}

interface ModalHeaderProps {
  title?: string;
  onClose?: () => void;
  children?: React.ReactNode;
}

interface ModalContentProps {
  children: React.ReactNode;
}

interface ModalFooterProps {
  children: React.ReactNode;
}

const sizeClasses = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'md:max-w-lg',
  xl: 'md:max-w-xl',
  '2xl': 'md:max-w-2xl',
  '3xl': 'md:max-w-3xl',
  '4xl': 'md:max-w-4xl',
  '5xl': 'md:max-w-5xl',
  '6xl': 'md:max-w-6xl',
  '7xl': 'md:max-w-7xl',
} as const;

function ModalHeader({ title, onClose, children }: ModalHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      {title ? <h2 className="text-lg font-semibold">{title}</h2> : children}
      {onClose && (
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <X size={20} />
        </button>
      )}
    </div>
  );
}

function ModalContent({ children }: ModalContentProps) {
  return <div className="py-2 pr-3 scrollable">{children}</div>;
}

function ModalFooter({ children }: ModalFooterProps) {
  return <div className="flex justify-end gap-2">{children}</div>;
}

function Modal({
  isOpen,
  onClose,
  children,
  closeOnScrimClick = false,
  width,
  className,
}: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className={'fixed inset-0 z-50 flex items-center justify-center'}>
      <div className="fixed inset-0 bg-scrim" onClick={closeOnScrimClick ? onClose : undefined} />
      <div
        className={cn(
          'relative flex flex-col gap-4 w-full max-h-[80vh] mx-4 p-6 rounded-lg bg-pollloop-light-beige shadow-lg',
          width && sizeClasses[width],
          className,
        )}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;

export default Modal;
