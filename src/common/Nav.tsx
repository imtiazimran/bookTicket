"use client";
import { Navbar } from "keep-react";
import { CaretDown } from "phosphor-react";
import logo from ".././assets/busLogo.png";
import { Link } from "react-router-dom";
import { ImageProps } from "../utils/types/types";
// import { useLoginUserQuery, useLogoutUserQuery } from "../redux/api/authApiSlice";


const NavbarComponent: React.FC = () => {
  // Call the useLoginUserQuery hook to execute the login request
  // const {
  //   data: loginData,
  //   isLoading: loginLoading,
  //   refetch: refetchLogin,
  // } = useLoginUserQuery();

  // // Call the useLogoutUserQuery hook to execute the logout request
  // const {
  //   data: logoutData,
  //   isLoading: logoutLoading,
  //   refetch: refetchLogout,
  // } = useLogoutUserQuery();

  const handleLogin = () => {
    

    // refetchLogin();
    // axios
    //   .get(base + "/auth/google", {withCredentials: true})
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  // const handleLogout = () => {
  //   // axios
  //   //   .get(base + "/logout")
  //   //   .then((res) => {
  //   //     console.log(res.data);
  //   //   })
  //   //   .catch((error) => {console.log(error);});
  // };
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
            <div>
              <button onClick={handleLogin}>Login</button>
            </div>
          </div>
        </Navbar.Container>
      </Navbar.Container>
    </Navbar>
  );
};

export default NavbarComponent;
