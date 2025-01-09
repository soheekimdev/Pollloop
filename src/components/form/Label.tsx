interface LabelProps {
  text: string;
  htmlFor?: string;
  required?: boolean;
}

export default function Label({ text, htmlFor, required }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-13">
      {text}
      {required && <span className="ml-0.5">*</span>}
    </label>
  );
}
