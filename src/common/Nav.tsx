"use client";
import { Navbar } from "keep-react";
import { CaretDown } from "phosphor-react";
import logo from ".././assets/busLogo.png";
import { Link } from "react-router-dom";
import { ImageProps, RootState } from "../utils/types/types";
// import { loginUser, logoutUser } from "../redux/authentication/authAction";
import {  useSelector } from "react-redux";
import axios from "axios";
import { base } from "../utils/baseApi";

const NavbarComponent: React.FC = () => {
  // const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state?.auth?.isAuthenticated
  );
  const user = useSelector((state: RootState) => state?.auth?.user);
  const error = useSelector((state: RootState) => state?.auth?.error);

  const handleLogin = () => {
    axios
      .get(base + "/auth/google")
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // dispatch(loginUser());
  };

  const handleLogout = () => {
    axios
      .get(base + "/logout")
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {console.log(error);});
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
        <Navbar.Container className="flex gap-1 text-white">
          <Navbar.Toggle className="block" />
          <p>Menu</p>
          <div>
            {isAuthenticated ? (
              <div>
                <p>Welcome, {user?.name}</p>
                <button onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <div>
                <button onClick={handleLogin}>Login</button>
              </div>
            )}
            {error && <p>{error}</p>}
          </div>
        </Navbar.Container>
      </Navbar.Container>
    </Navbar>
  );
};

export default NavbarComponent;
