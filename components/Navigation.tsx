import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
            <Link href="/admin" passHref>
              <a className="nav-link">
              <FontAwesomeIcon icon={faCog} />
              </a>
            </Link>
          </li>
        </ul>
      </Navbar>
    </div>
  );
};

export default Navigation;
