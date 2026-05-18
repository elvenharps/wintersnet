type Props = {
  children: React.ReactNode;
  since?: string;
};

export function DeadHost({ children, since }: Props) {
  const title = since
    ? `Offline since ~${since}`
    : "Offline — historical hostname";
  return (
    <span className="dead-host" title={title}>
      {children}
    </span>
  );
}
