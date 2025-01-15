interface LabelProps {
  text: string;
}

export default function FormsLabel({ text }: LabelProps) {
  return <p className="pl-5 text-sm font-medium text-13 opacity-70">{text}</p>;
}
