export default function Loader() {
  return (
    <>
      <div className="loader">
        <div className="spinner-grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      <style jsx>{`
        .loader {
          display: flex;
          position: fixed;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </>
  );
}
