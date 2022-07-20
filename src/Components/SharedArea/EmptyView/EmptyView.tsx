import "./EmptyView.css";
interface EmptyViewProps {
  msg: string;
}
function EmptyView(props: EmptyViewProps): JSX.Element {
  return (
    <div className="EmptyView flex-center-col">
      <h2>{props.msg}</h2>
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
