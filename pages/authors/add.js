import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import Author from "../../entities/Author";

export default function AddAuthor() {
  const router = useRouter();

  const { storage } = useSelector((store) => ({
    storage: store.storage,
  }));

  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
  });

  const handleChange = (e) =>
    setValues({
      ...values,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    const { first_name, last_name } = values;
    const authors = storage.getStack("authors");
    const id = authors.insert(new Author(null, first_name, last_name));

    router.push(`/authors/${id}`);
  };

  return (
    <div className="row">
      <form className="col" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="first_name" className="form-label">
            Author&#39;s name
          </label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            placeholder="Alexander"
            onChange={handleChange}
            pattern="^[A-ZА-Я][А-ЯA-Za-zа-я]+$"
            minLength={3}
            required
          />
          <div className="form-text">
            First name must start from a capital letter and must be at least
            three characters in length.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="last_name" className="form-label">
            Author&#39;s last name
          </label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            placeholder="Nechiporenko"
            onChange={handleChange}
            pattern="^[A-ZА-Я][А-ЯA-Za-zа-я]+$"
            minLength={3}
            required
          />
          <div className="form-text">
            Last name start from a capital letter and must be at least three
            characters in length.
          </div>
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Create new author
          </button>
        </div>
      </form>
    </div>
  );
}
