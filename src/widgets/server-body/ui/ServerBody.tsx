export function ServerBody({ children }: React.PropsWithChildren) {
  return (
    <section className="flex h-full flex-grow flex-row bg-gray-300">
      {children}
    </section>
  );
}
