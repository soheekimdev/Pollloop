import { Trash2 } from 'lucide-react';

interface QuestionCardProps {
  children: React.ReactNode;
  onClick: () => void;
  onDelete: () => void;
  isSelected?: boolean;
}

export default function QuestionCard({
  children,
  onClick,
  onDelete,
  isSelected,
}: QuestionCardProps) {
  return (
    <div
      className={`flex flex-col gap-10 relative bg-pollloop-light-beige rounded-lg p-10 xl:p-20 cursor-pointer ${isSelected ? 'shadow-primary' : ''}`}
      onClick={onClick}
    >
      <button
        type="button"
        onClick={e => {
          e.stopPropagation();
          onDelete();
        }}
        className="absolute top-8 right-8 p-2 rounded-full text-tag-secondary-text hover:text-button-danger-bg"
      >
        <Trash2 size={20} />
      </button>

      {children}
    </div>
  );
}
