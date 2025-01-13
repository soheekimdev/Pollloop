import { SelectHTMLAttributes } from 'react';
import { encodeSvgForCss } from '@/utils/svg';
import { cn } from '@/utils/cn';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string; disabled?: boolean; defaultValue?: boolean }[];
}

const svgCode = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#85582B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>`;

const svgBg = {
  '--svg-bg': `url("data:image/svg+xml, ${encodeSvgForCss(svgCode)}")`,
  backgroundColor: '#FFFBEB',
} as React.CSSProperties;

export default function Select({ options, value, onChange, className, ...props }: SelectProps) {
  return (
    <select
      value={value}
      onChange={onChange}
      style={svgBg}
      className={cn(
        'w-full h-10 px-3 pr-8 rounded-lg border border-input-border text-sm text-pollloop-brown-01 focus-visible:outline-pollloop-brown-01 appearance-none bg-[image:var(--svg-bg)] bg-no-repeat bg-[right_8px_center]',
        className,
      )}
      {...props}
    >
      {options.map(option => (
        <option key={option.value} disabled={option.disabled} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
