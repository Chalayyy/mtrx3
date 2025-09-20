interface PageContainerProps {
  children: React.ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="container mx-auto p-8 max-w-4xl">
      {children}
    </div>
  );
}
