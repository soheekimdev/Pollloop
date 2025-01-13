interface LabelProps {
  text: string;
}

export default function FormsLabel({ text }: LabelProps) {
  return <p className="text-sm font-medium text-13 opacity-70">{text}</p>;
}
