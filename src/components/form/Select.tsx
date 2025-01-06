import { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
}

const svgCode = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#85582B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>`;

const encodeSvg = (svg: string) => {
  return encodeURIComponent(svg)
    .replace(/%3D/g, '=')
    .replace(/%3A/g, ':')
    .replace(/%2F/g, '/')
    .replace(/%22/g, "'")
    .replace(/%20/g, ' ');
};

const svgBg = {
  '--svg-bg': `url("data:image/svg+xml, ${encodeSvg(svgCode)}")`,
} as React.CSSProperties;

export default function Select({ options, value, onChange, ...props }: SelectProps) {
  return (
    <select
      value={value}
      onChange={onChange}
      style={svgBg}
      className="w-full h-10 px-3 rounded-lg bg-input-bg border border-input-border text-sm text-pollloop-brown-01 focus-visible:outline-pollloop-brown-01 appearance-none bg-[image:var(--svg-bg)] bg-no-repeat bg-[right_8px_center]"
      {...props}
    >
      {options.map(option => (
        <option key={option.value}>{option.value}</option>
      ))}
    </select>
  );
}
