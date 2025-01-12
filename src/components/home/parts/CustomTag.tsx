interface CustomTagProps {
  tag: string;
  is_multiline?: boolean;
  className?: string;
}

export default function CustomTag({ tag, is_multiline, className }: CustomTagProps) {
  return (
    <div
      role="tag"
      className={`px-2 py-1 rounded-md ${is_multiline ? 'line-clamp-none' : 'line-clamp-1'} w-fit text-13 bg-tag-default-bg ${className || ''}`}
    >
      {tag}
    </div>
  );
}
