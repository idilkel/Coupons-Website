import { useNavigate } from "react-router-dom";
import "./EmptyView.css";
// import Button from "react-bootstrap/Button";
interface EmptyViewProps {
  msg: string;
}

function EmptyView(props: EmptyViewProps): JSX.Element {
  const navigate = useNavigate();
  // const goBack = () => {
  //   navigate(-1);
  // };
  return (
    <div className="EmptyView flex-center-col">
      <h2>{props.msg}</h2>
      <iframe
        className="shadow noHover"
        src="https://giphy.com/embed/26hkhPJ5hmdD87HYA"
        width="300"
        height="300"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      {/* <Button variant="secondary" onClick={goBack} className="mt-2">
        Go Back
      </Button>{" "} */}
    </div>
  );
}

export default EmptyView;
