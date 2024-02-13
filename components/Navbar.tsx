import Image from "next/image";
import Link from "next/link";

const navBarIcon = [
  { src: "/assets/icons/black-heart.svg", alt: "black-heart" },
  { src: "/assets/icons/user.svg", alt: "user" },
];

const Navbar = () => {
  return (
    <header className="w-full">
      <nav className="nav">
        <Link href={"/"} className="flex items-center gap-4">
          <Image
            src={"/assets/icons/logo.svg"}
            alt="logo"
            width={27}
            height={27}
          />
          <p className="nav-logo">
            WE <span className="text-primary">DATA</span>
          </p>
        </Link>
        <div className="flex items-center gap-5">
          {navBarIcon.map((items) => (
            <Image
              key={items.alt}
              src={items.src}
              alt={items.alt}
              width={28}
              height={28}
              className="object-contain"
            />
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
