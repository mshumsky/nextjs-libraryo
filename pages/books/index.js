import Link from "next/link";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";

export default function Books() {
  const router = useRouter();

  const { authors, books, stack } = useSelector((store) => ({
    authors: Object.keys(store.authors).map((key) => store.authors[key]),
    books: Object.keys(store.books).map((key) => store.books[key]),
    stack: store.storage?.getStack("books"),
  }));

  return (
    <div className="row">
      <div className="col-12">
        <h3 className="mb-4">Books</h3>
      </div>
      <div className="col-12">
        <table className="table table-striped">
          <thead>
            <tr>
              <td>
                <strong>ID</strong>
              </td>
              <td>
                <strong>Title</strong>
              </td>
              <td>
                <strong>Author</strong>
              </td>
              <td>
                <strong>First publication</strong>
              </td>
              <td className="text-center">
                <strong>Controls</strong>
              </td>
            </tr>
          </thead>
          <tbody>
            {books.length === 0 && (
              <tr>
                <td className="text-center" colSpan={5}>
                  There are no books.
                </td>
              </tr>
            )}
            {books.map((book) => {
              const author = authors.find((obj) => obj.id === +book.author_id);
              const authorResult = author
                ? `${author.first_name} ${author.last_name}`
                : "DELETED";

              const onViewClick = () => router.push(`/books/${book.id}`);
              const onEditClick = () => router.push(`/books/${book.id}`);
              const onDeleteClick = () => {
                stack.deleteById(book.id);
              };

              return (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.title}</td>
                  <td>{authorResult}</td>
                  <td>{book.year}</td>
                  <td className="d-flex justify-content-center">
                    <button className="btn btn-primary" onClick={onViewClick}>
                      View
                    </button>
                    <button
                      className="btn btn-warning mx-2"
                      onClick={onEditClick}
                    >
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={onDeleteClick}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="col-12 mt-3">
        <Link href="/books/add">
          <button type="button" className="btn btn-primary">
            Add book
          </button>
        </Link>
      </div>
    </div>
  );
}
