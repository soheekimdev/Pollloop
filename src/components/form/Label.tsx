interface LabelProps {
  text: string;
  htmlFor?: string;
}

export default function Label({ text, htmlFor }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-13">
      {text}
    </label>
  );
}
