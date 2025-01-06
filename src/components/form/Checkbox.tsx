import { Check } from 'lucide-react';

export default function Checkbox({
  checked,
  onChange,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="cursor-pointer">
      <input
        type="checkbox"
        className="hidden peer"
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <span className="flex items-center justify-center w-5 h-5 bg-pollloop-bg-02 border border-pollloop-brown-01 text-pollloop-light-beige rounded peer-checked:bg-pollloop-brown-02">
        <Check width={16} className="[.peer:checked~*>&]:block hidden" />
      </span>
    </label>
  );
}
