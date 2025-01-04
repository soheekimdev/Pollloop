interface QuestionCardProps {
  children: React.ReactNode;
  onClick: () => void;
  isSelected?: boolean;
}

export default function QuestionCard({ children, onClick, isSelected }: QuestionCardProps) {
  return (
    <div
      className={`flex flex-col gap-10 bg-pollloop-light-beige rounded-lg p-10 xl:p-20 cursor-pointer ${isSelected ? 'shadow-primary' : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
