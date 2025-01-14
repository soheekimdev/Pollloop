import { Image as ImageIcon } from 'lucide-react';
import { ComponentProps } from 'react';

interface ImagePlaceholderProps extends ComponentProps<'div'> {
  iconSize?: number;
  iconClassName?: string;
  iconColor?: string;
}

const ImagePlaceholder = ({
  iconSize = 24,
  iconClassName = '',
  iconColor,
  className = '',
  style,
  ...props
}: ImagePlaceholderProps) => {
  return (
    <div
      className={`flex items-center justify-center rounded-lg bg-pollloop-brown-03/30 ${className}`}
      style={{
        ...style,
        width: style?.width,
        height: style?.height,
      }}
      {...props}
    >
      <ImageIcon
        size={iconSize}
        className={`text-pollloop-brown-03 ${iconClassName}`}
        color={iconColor}
      />
    </div>
  );
};

export default ImagePlaceholder;
