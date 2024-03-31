

const Container = ({ children }: { children: React.ReactNode }) => {
  
  return (
    <div className="w-[90%] flex justify-center mx-auto">
      <div>{children}</div>
    </div>
  );
};

export default Container;
