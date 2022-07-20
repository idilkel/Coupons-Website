import { useNavigate } from "react-router-dom";
import "./Page404.css";

function Page404(): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className="Page404 flex-center-col">
      <h2>Error 404</h2>
      <h2>Page Not Found</h2>
      <button className="button-success" onClick={() => navigate(-1)}>
        Go back
      </button>
      <iframe
        className="shadow noHover"
        src="https://giphy.com/embed/VJHtXeMHViHRHvKGKm"
        width="480"
        height="360"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default Page404;
