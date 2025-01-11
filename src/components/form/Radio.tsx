export default function Radio({
  checked,
  onChange,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="cursor-pointer p-1">
      <input
        type="radio"
        className="hidden peer"
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <span
        className="
      flex items-center justify-center w-5 h-5 p-[3px] bg-pollloop-bg-02 border border-pollloop-brown-01 text-pollloop-light-beige rounded-full
      after:block after:w-full after:h-full after:rounded-full peer-checked:after:bg-pollloop-brown-01
      "
      />
    </label>
  );
}
