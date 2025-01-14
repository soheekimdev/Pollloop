interface SectionTitleProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
}

export default function SectionTitle({ title, children }: SectionTitleProps) {
  return (
    <div className="flex items-center justify-between gap-4 flex-wrap min-h-fit">
      <p className="font-medium text-lg">{title}</p>
      {children && <div className="flex gap-2 flex-wrap">{children}</div>}
    </div>
  );
}
