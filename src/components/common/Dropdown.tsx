import { useEffect, useRef } from 'react';

interface DropdownItemProps {
  label: string;
  onClick: () => void;
  isDestructive?: boolean;
}

interface DropdownProps {
  items: DropdownItemProps[];
  position?: {
    top?: number | string;
    right?: number | string;
    bottom?: number | string;
    left?: number | string;
  };
  className?: string;
  onClose: () => void;
}

export default function Dropdown({ items, position, className, onClose }: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      className={`absolute bg-pollloop-light-beige py-2 w-[120px] rounded-lg text-sm font-gothic shadow-[0_2px_10px_0_rgba(0,0,0,0.3)] ${className}`}
      style={position}
    >
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              item.onClick();
              onClose();
            }}
            className={`px-4 py-2 hover:cursor-pointer ${
              item.isDestructive ? 'text-status-red-text' : ''
            }`}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
