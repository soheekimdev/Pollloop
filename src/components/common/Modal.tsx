import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closeOnScrimClick?: boolean;
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
  return <div className="py-2">{children}</div>;
}

function ModalFooter({ children }: ModalFooterProps) {
  return <div className="flex justify-end gap-2">{children}</div>;
}

function Modal({ isOpen, onClose, children, closeOnScrimClick = false }: ModalProps) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-scrim" onClick={closeOnScrimClick ? onClose : undefined} />
      <div className="relative flex flex-col gap-4 w-full mx-4 sm:w-auto sm:min-w-96 p-6 rounded-lg bg-pollloop-light-beige shadow-lg">
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
