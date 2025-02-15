type LogoWithTitleProps = {
  title: string;
};
export default function LogoWithTitle({ title }: LogoWithTitleProps) {
  return (
    <div className="flex flex-col gap-6 text-lg items-center">
      <h3 className="font-iowan text-pollloop-orange font-bold">Polloop</h3>
      <h3 className="font-extrabold">{title}</h3>
    </div>
  );
}
