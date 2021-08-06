import Link from "next/link";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";

export default function Authors() {
  const router = useRouter();

  const { authors, stack } = useSelector((store) => ({
    authors: Object.keys(store.authors || {}).map((key) => store.authors[key]),
    stack: store.storage?.getStack("authors"),
  }));

  return (
    <div className="row">
      <div className="col-12">
        <h3 className="mb-4">Authors</h3>
      </div>
      <div className="col-12">
        <table className="table table-striped">
          <thead>
            <tr>
              <td>
                <strong>ID</strong>
              </td>
              <td>
                <strong>First name</strong>
              </td>
              <td>
                <strong>Last name</strong>
              </td>
              <td className="text-center">
                <strong>Controls</strong>
              </td>
            </tr>
          </thead>
          <tbody>
            {authors.length === 0 && (
              <tr>
                <td className="text-center" colSpan={4}>
                  There are no authors.
                </td>
              </tr>
            )}
            {authors.map((author) => {
              const columns = Object.keys(author).map((key) => (
                <td key={`${author[key].id}-${key}`}>{author[key]}</td>
              ));

              const onViewClick = () => router.push(`/authors/${author.id}`);
              const onEditClick = () => router.push(`/authors/${author.id}`);
              const onDeleteClick = () => {
                stack.deleteById(author.id);
              };

              return (
                <tr key={author.id}>
                  {columns}
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
        <style jsx>{`
          tbody td {
            vertical-align: middle;
          }
        `}</style>
      </div>
      <div className="col-12 mt-3">
        <Link passHref={false} href="/authors/add">
          <button className="btn btn-primary">Add author</button>
        </Link>
      </div>
    </div>
  );
}
