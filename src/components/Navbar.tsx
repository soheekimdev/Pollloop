import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="h-[80px] px-5 xs:px-10 py-5 text-pollloop-brown-01 flex justify-between items-center">
      <div className="flex items-center gap-6 md:gap-[104px] xs:gap-14">
        <h1 className="text-base xs:text-lg md:text-2xl ">
          <Link to="/">Polloop</Link>
        </h1>
        <nav className="text-xs xs:text-sm md:text-lg font-bold flex gap-7 xs:gap-10">
          <Link to="forms">Form</Link>
          <Link to="/">Ask</Link>
        </nav>
      </div>
      <aside className="flex h-8 justify-end items-center gap-2">
        <img
          src="https://i.namu.wiki/i/mdB4BnfvMPx99B1zL0rnNQSV5WFh53Zy2CAq482I_mPNTaJHAephagdt-jUVPSQJ-tLTpb5JqtPb4nGsVRhX6w.webp"
          alt="formformppulin"
          className="w-8 h-8 rounded-2xl"
        />
        <p className="text-sm font-bold hidden md:block">formformppulin@gmail.com</p>
        <p className="hidden md:block">\/</p>
      </aside>
    </header>
  );
}
