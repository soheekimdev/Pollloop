interface SwitchProps {
  name?: string;
  id?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export default function Switch({ name, id, checked = false, onChange }: SwitchProps) {
  return (
    <label className="inline-block">
      <input
        type="checkbox"
        name={name}
        id={id}
        checked={checked}
        onChange={e => onChange?.(e.target.checked)}
        className="hidden peer"
      />
      <span
        className="block relative w-7 h-4 border border-pollloop-brown-01 rounded-full bg-pollloop-light-beige cursor-pointer
      after:content-[''] after:absolute after:top-px after:left-px after:w-3 after:h-3 after:bg-pollloop-brown-01 after:rounded-full
      peer-checked:bg-pollloop-brown-01
      peer-checked:after:left-[13px] peer-checked:after:bg-pollloop-light-beige
      transition-all after:transition-all
      "
      ></span>
    </label>
  );
}
