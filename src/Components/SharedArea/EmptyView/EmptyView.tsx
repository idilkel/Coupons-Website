import { useNavigate } from "react-router-dom";
import "./EmptyView.css";
interface EmptyViewProps {
  msg: string;
}

function EmptyView(props: EmptyViewProps): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className="EmptyView flex-center-col">
      <h2>{props.msg}. Are you in the right user type?</h2>
      <button className="button-success" onClick={() => navigate(-1)}>
        Go back
      </button>
      <iframe
        className="shadow noHover"
        src="https://giphy.com/embed/26hkhPJ5hmdD87HYA"
        width="480"
        height="480"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default EmptyView;
