interface QuestionCardProps {
  children: React.ReactNode;
}

export default function QuestionCard({ children }: QuestionCardProps) {
  return (
    <div className="flex flex-col gap-10 bg-pollloop-light-beige rounded-lg p-10 xl:p-20">
      {children}
    </div>
  );
}
