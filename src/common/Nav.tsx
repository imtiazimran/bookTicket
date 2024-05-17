"use client";
import { Navbar } from "keep-react";
import { CaretDown } from "phosphor-react";
import logo from ".././assets/busLogo.png";
import { Link } from "react-router-dom";
import { ImageProps, Tuser } from "../utils/types/types";

import AuthBtn from "../googleAuth/AuthBtn";
import { useGetUserQuery } from "../redux/api/userSlice";
import { useEffect, useState } from "react";
import { getToken } from "../utils/getToken";

const NavbarComponent: React.FC = () => {
  const [user, setUser] = useState<Tuser>({} as Tuser);
  const [showLogout, setShowLogout] = useState(false); // State to toggle logout button
  const { data } = useGetUserQuery({});
  const token = getToken();
  // console.log(token);
  useEffect(() => {
    if (data) {
      setUser(data.userData);
    }
  }, [data]);


  const handleImageClick = () => {
    setShowLogout((prev) => !prev); // Toggle the logout button visibility
  };

  const handleLogout = () => {
    setShowLogout(false);
    localStorage.removeItem("token");
    window.location.reload();
    console.log("Logging out...");
  };

  const logoProps: ImageProps = {
    src: logo,
    alt: "keep",
    width: "50",
    height: "10",
  };

  return (
    <Navbar
      fluid={true}
      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-800 px-0 py-0"
    >
      <Navbar.Container className="flex items-center justify-between">
        <Link to={"/"}>
          <Navbar.Brand>
            <img {...logoProps} />
          </Navbar.Brand>
        </Link>
        <Navbar.Collapse
          collapseType="sidebar"
          className="fixed right-0 top-0 bg-white p-10 xl:!w-1/6 lg:!w-2/6 md:!w-1/2"
        >
          <Navbar.Container tag="ul" className="flex flex-col gap-5">
            <Navbar.Link
              linkName="Home"
              icon={<CaretDown size={20} />}
              className="!py-0"
            />
            <Navbar.Link
              linkName="Projects"
              icon={<CaretDown size={20} />}
              className="!py-0"
            />
            <Navbar.Link
              href="https://blog.keep.dev/"
              linkName="Blogs"
              icon={<CaretDown size={20} />}
              className="!py-0"
            />
            <Navbar.Link linkName="News" className="!py-0" />
            <Navbar.Link linkName="Resources" className="!py-0" />
          </Navbar.Container>
        </Navbar.Collapse>
        <Navbar.Container className="flex gap-1 text-white justify-center items-center">
          <Navbar.Toggle className="block" />
          <p>Menu</p>
          <div>
            {token && user ? (
              <div className="relative">
                <div className="rounded-full w-10 h-10 cursor-pointer" onClick={handleImageClick}>
                  <img className="rounded-full" src={user?.picture} alt={user?.name} />
                </div>
                {showLogout && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <AuthBtn />
            )}
          </div>
        </Navbar.Container>
      </Navbar.Container>
    </Navbar>
  );
};

export default NavbarComponent;
