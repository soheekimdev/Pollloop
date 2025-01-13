interface FormsDescriptionProps {
  children: React.ReactNode;
}

export default function FormsDescription({ children }: FormsDescriptionProps) {
  return <p className="text-xs text-input-tip">{children}</p>;
}
