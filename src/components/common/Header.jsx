import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../assets/imgs/logo.jpeg";

const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // redirect after logout
  };
  return (
    <header className="shadow">
      <div className="bg-dark text-center py-3">
        <span className="text-white">ATS System</span>
      </div>
      <div className="container">
        <Navbar expand="lg" className="">
          <Navbar.Brand href="#">
            <img src={Logo} alt="" width={50} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link href="#action1">Jobs</Nav.Link>
              <Nav.Link href="#action2">Applications</Nav.Link>
            </Nav>
            <div className="nav-right d-flex">
              <a href="" className="ms-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="currentColor"
                  className="bi bi-person"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"></path>
                </svg>
              </a>
            </div>
            <button className="btn btn-danger btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
};

export default Header;
