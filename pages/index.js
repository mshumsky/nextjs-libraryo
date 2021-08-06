import Link from "next/link";

export default function Home() {
  return (
    <div className="row">
      <div className="col-12 text-center">
        <h1>Library Online</h1>
        <p className="lead m-0">Share your own books and read others.</p>
      </div>
      <div className="col mt-3">
        <div
          className="list-group text-center mx-auto"
          style={{ maxWidth: "300px" }}
        >
          <Link href="/authors">
            <a className="list-group-item list-group-item-action">
              View authors
            </a>
          </Link>
          <Link href="/books">
            <a className="list-group-item list-group-item-action">Read books</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
