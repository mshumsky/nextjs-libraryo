import {useRouter} from "next/router";
import {useState} from "react";
import {useSelector} from "react-redux";
import Book from "../../entities/Book";

export default function AddBook() {
  const { push } = useRouter();

  const { authors, storage } = useSelector((store) => ({
    authors: Object.keys(store.authors).map((key) => store.authors[key]),
    storage: store.storage,
  }));

  const [values, setValues] = useState({
    title: "",
    author_id: 0,
    year: 0,
    image: "",
  });

  const handleChange = (e) =>
    setValues({
      ...values,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  const handleImageChange = (e) => {
    const file = e.currentTarget.files[0];
    if (!file) {
      setValues({
        ...values,
        image: "",
      });
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setValues({
        ...values,
        image: reader.result,
      });
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { title, author_id, year, image } = values;
    const created_at = new Date().getTime();

    const books = storage.getStack("books");
    const id = books.insert(
      new Book(null, title, author_id, created_at, year, image)
    );
    push(`/books/${id}`);
  };

  const now = new Date();

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Book title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={values.title}
          onChange={handleChange}
          placeholder="Reality transurfing"
          pattern="^[А-ЯA-Za-zа-я .,:]+$"
          minLength={3}
          required
        />
        <div className="form-text">
          Book title must be at least three characters in length.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="author_id" className="form-label" name="author_id">
          Book author
        </label>
        <select
          className="form-select"
          id="author_id"
          name="author_id"
          value={values.author_id}
          onChange={handleChange}
        >
          {authors.map(({ id, first_name, last_name }) => {
            return (
              <option value={id} key={id}>
                {first_name + " " + last_name}
              </option>
            );
          })}
        </select>
        <div className="form-text">
          Author have to be registered in our service.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="year">Year of first publication</label>
        <input
          className="form-control"
          type="number"
          name="year"
          id="year"
          value={values.year}
          onChange={handleChange}
          min={1990}
          max={now.getFullYear()}
          required
        />
        <div className="form-text">
          Books published earlier than 1990s not allowed here.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="image">Book cover</label>
        <input
          className="form-control form-control-sm"
          id="image"
          name="image"
          onChange={handleImageChange}
          type="file"
          accept=".bmp,.svg,.jpg,.png,.gif"
        />
      </div>
      <div className="mb-3">
        <button type="submit" className="btn btn-primary">
          Create new book
        </button>
      </div>
    </form>
  );
}
