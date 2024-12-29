interface InputProps {
  type?: string;
  name?: string;
  id?: string;
  placeholder?: string;
  tip?: string;
}

export default function Input({ type = 'text', name, id, placeholder, tip }: InputProps) {
  return (
    <div>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        className="w-full h-10 px-3 rounded-lg bg-input-bg border border-input-border text-sm placeholder:text-input-placeholder"
      />
      {tip && <p className="mt-2 text-xs text-input-tip">{tip}</p>}
    </div>
  );
}
