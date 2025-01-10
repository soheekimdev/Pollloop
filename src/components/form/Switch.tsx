interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  checked: boolean;
  onChange: (isChecked: boolean) => void;
}

export default function Switch({
  checked = false,
  onChange,
  'aria-label': ariaLabel,
  ...props
}: SwitchProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <label className="inline-block">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="hidden peer"
        aria-label={ariaLabel}
        role="switch"
        aria-checked={checked}
        {...props}
      />
      <span
        className="
          block relative w-7 h-4 border border-pollloop-brown-01 rounded-full bg-pollloop-light-beige cursor-pointer
          after:content-[''] after:absolute after:top-px after:left-px after:w-3 after:h-3 after:bg-pollloop-brown-01 after:rounded-full
          peer-checked:bg-pollloop-brown-01
          peer-checked:after:left-[13px] peer-checked:after:bg-pollloop-light-beige
          transition-all after:transition-all
        "
      ></span>
    </label>
  );
}
