"use client";
import {
  HomeOutlined,
  InfoCircleOutlined,
  BookOutlined,
  ApiOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: <HomeOutlined style={{ fontSize: 20 }} />,
    },
    {
      name: "About",
      href: "/about",
      icon: <InfoCircleOutlined style={{ fontSize: 20 }} />,
    },
    {
      name: "Documentation",
      href: "/docs",
      icon: <BookOutlined style={{ fontSize: 20 }} />,
    },
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <DashboardOutlined style={{ fontSize: 20 }} />,
    },
  ];

  const isActive = (href) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };
  return (
    <nav className="absolute top-0 left-0 w-full z-10 bg-transparent text-white flex justify-between items-center px-6 py-4">
      {/* Logo */}
      <div className="text-2xl font-bold">
        <a href="/">
          Plugin UI <ApiOutlined />
        </a>
      </div>

      {/* Links */}
      <div className="flex space-x-6">
        {navItems.map((item, index) => (
          <Link key={index} href={item.href}>
            <p
              className={`flex items-center space-x-2 ${
                isActive(item.href)
                  ? "text-yellow-400 font-bold"
                  : "text-white hover:text-gray-300"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </p>
          </Link>
        ))}
      </div>

      {/* Sign In Button */}
      <div>
        <Link href={"/login"}>
          <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg">
            Sign In
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
