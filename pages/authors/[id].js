import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Loader from "../../components/Loader";

export default function Author() {
  const {
    query: { id },
    push,
  } = useRouter();

  const { author, stack } = useSelector((store) => ({
    author: store.authors[id],
    stack: store.storage?.getStack("authors"),
  }));

  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
  });

  useEffect(() => {
    author &&
      setValues({
        first_name: author.first_name,
        last_name: author.last_name,
      });
  }, [author]);

  const handleChange = (e) =>
    setValues({
      ...values,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    const storageAuthor = stack.findById(id);
    storageAuthor.update(values);
  };

  if (!id || !author) {
    id && !author && push("/");
    return <Loader />;
  }

  const valuesEqualAuthor =
    values.first_name === author.first_name &&
    values.last_name === author.last_name;

  return (
    <div className="row">
      <form className="col-12" onSubmit={handleSubmit}>
        <h3 className="mb-4">Author</h3>
        <div className="input-group mb-3">
          <label htmlFor="author_id" className="input-group-text">
            ID
          </label>
          <input
            type="text"
            className="form-control"
            id="author_id"
            value={author.id}
            disabled
          />
        </div>
        <div className="input-group mb-3">
          <label htmlFor="first_name" className="input-group-text">
            First name
          </label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            value={values.first_name}
            onChange={handleChange}
            pattern="^[A-ZА-Я][А-ЯA-Za-zа-я]+$"
            minLength={3}
            required
          />
        </div>
        <div className="input-group mb-3">
          <label htmlFor="last_name" className="input-group-text">
            Last name
          </label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            value={values.last_name}
            onChange={handleChange}
            pattern="^[A-ZА-Я][А-ЯA-Za-zа-я]+$"
            minLength={3}
            required
          />
        </div>
        <div className="mb-3">
          <button
            type="submit"
            className="btn btn-warning"
            disabled={valuesEqualAuthor}
          >
            Apply changes
          </button>
        </div>
      </form>
    </div>
  );
}
