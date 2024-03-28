const Container = ({ children }: any) => {
  return (
    <div className="w-[90%] flex justify-center mx-auto">
      <div>{children}</div>
    </div>
  );
};

export default Container;
