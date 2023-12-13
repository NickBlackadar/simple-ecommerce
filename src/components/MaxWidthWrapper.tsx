interface Props {
  children: React.ReactNode;
}

const MaxWidthWrapper = ({ children }: Props) => {
  return (
    <div className="mx-auto w-full max-w-screen-xl px-5 md:px-20">
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
