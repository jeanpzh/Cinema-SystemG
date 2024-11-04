interface MainWrapperProps {
  children: React.ReactNode;
  titulo: string;
}

function MainWrapper({ children, titulo }: MainWrapperProps) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{titulo}</h1>
      {children}
    </div>
  );
}

export default MainWrapper;
