import Image from "next/image";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Loader from "../../components/Loader";

export default function Book() {
  const {
    query: { id },
    push,
  } = useRouter();

  const { authors, book, stack } = useSelector((store) => ({
    authors: Object.keys(store.authors || {}).map((key) => store.authors[key]),
    book: typeof window !== "undefined" ? store.books[id] : false,
    stack: store.storage?.getStack("books"),
  }));

  const [values, setValues] = useState({
    image: "",
    title: "",
    author_id: 0,
    year: 0,
  });

  useEffect(() => {
    book &&
      setValues({
        image: book.image,
        title: book.title,
        author_id: book.author_id,
        year: book.year,
      });
  }, [book]);

  const handleChange = (e) =>
    setValues({
      ...values,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  const handleImageDelete = () => setValues({ ...values, image: "" });

  const handleImageChange = (e) => {
    const file = e.currentTarget.files[0];
    if (!file) {
      setValues({
        ...values,
        image: "",
      });
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

    const storageBook = stack.findById(id);
    storageBook.update(values);
  };

  if (!id || (!book && typeof window !== "undefined")) {
    id && !book && push("/");
    return <Loader />;
  }

  const valuesEqualBook =
    typeof window === "undefined"
      ? false
      : values.title === book.title &&
        values.image === book.image &&
        values.author_id === book.author_id &&
        values.year === book.year;

  return (
    <div className="row">
      <form className="col-12" onSubmit={handleSubmit}>
        <h3 className="mb-4">Book</h3>
        <div className="input-group mb-3">
          <label htmlFor="book_id" className="input-group-text">
            ID
          </label>
          <input
            type="text"
            className="form-control"
            id="book_id"
            value={book.id}
            disabled
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text align-self-start">Cover</span>
          <div className="d-flex img-thumbnail">
            <Image
              src={
                values.image ||
                "https://via.placeholder.com/125x125?text=No+Cover"
              }
              width={125}
              height={125}
              objectFit="contain"
            />
          </div>
          <div className="d-flex flex-column align-items-baseline ms-1">
            <input
              className="form-control align-self-end"
              id="image"
              name="image"
              type="file"
              accept=".bmp,.svg,.jpg,.png,.gif"
              onChange={handleImageChange}
            />
            {values.image && (
              <button
                type="button"
                className="btn btn-danger mt-1"
                onClick={handleImageDelete}
              >
                Delete
              </button>
            )}
          </div>
        </div>
        <div className="input-group mb-3">
          <label htmlFor="title" className="input-group-text">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={values.title}
            onChange={handleChange}
          />
        </div>
        <div className="input-group mb-3">
          <label htmlFor="author_id" className="input-group-text">
            Author
          </label>
          <select
            className="form-select"
            id="author_id"
            name="author_id"
            value={values.author_id}
            onChange={handleChange}
          >
            {authors.map((author) => (
              <option value={author.id} key={author.id}>
                {`${author.first_name} ${author.last_name}`}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group mb-3">
          <label htmlFor="year" className="input-group-text">
            Year of first publication
          </label>
          <input
            type="text"
            className="form-control"
            id="year"
            name="year"
            value={values.year}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <button
            type="submit"
            className="btn btn-warning"
            disabled={valuesEqualBook}
          >
            Apply changes
          </button>
        </div>
      </form>
    </div>
  );
}
