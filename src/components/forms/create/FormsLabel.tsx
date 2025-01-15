interface LabelProps {
  text: string;
}

export default function FormsLabel({ text }: LabelProps) {
  return <p className="pl-[18px] text-sm font-medium text-13 opacity-70">{text}</p>;
}
