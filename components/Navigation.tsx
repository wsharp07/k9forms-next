import Link from "next/link";
import { Navbar, NavbarBrand, NavbarToggler } from "reactstrap";

const Navigation = () => {
  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">K-9 Forms</NavbarBrand>
        <NavbarToggler />
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link href="/admin" className="nav-link">
              <i className="fas fa-cog"></i>
            </Link>
          </li>
        </ul>
      </Navbar>
    </div>
  );
};

export default Navigation;
