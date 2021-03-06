import NavLink from "../NavLink";
import Link from "next/link";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link href="/">
						<a className="navbar-brand">Library.O</a>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink href="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink href="/authors">Authors</NavLink>
              </li>
              <li className="nav-item">
                <NavLink href="/books">Books</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
