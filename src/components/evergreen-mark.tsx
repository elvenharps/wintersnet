type Props = {
  className?: string;
  size?: number;
};

export function EvergreenMark({ className, size = 22 }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M12 2 L7 8 L9.5 8 L5.5 13 L8.5 13 L4 19 L20 19 L15.5 13 L18.5 13 L14.5 8 L17 8 Z"
        fill="currentColor"
      />
      <rect x="11" y="19" width="2" height="3" rx="0.5" fill="currentColor" />
    </svg>
  );
}
