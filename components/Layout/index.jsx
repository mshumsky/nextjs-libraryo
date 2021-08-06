import Navbar from "../Navbar";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <main className="container pt-4">{children}</main>
      <footer className="bg-dark d-flex	justify-content-center align-items-center">
        <p className="text-white mb-0">
          Developed by
          <a
            className="link-primary ms-1"
            href="tg://resolve?domain=mshumsky"
            target="_blank"
          >
            @mshumsky
          </a>
        </p>
      </footer>
    </div>
  );
}
