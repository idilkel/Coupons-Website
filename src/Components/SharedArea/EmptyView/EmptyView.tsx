import "./EmptyView.css";
interface EmptyViewProps {
  msg: string;
}
function EmptyView(props: EmptyViewProps): JSX.Element {
  return (
    <div className="EmptyView flex-center-col noHover">
      <h2>{props.msg}</h2>
      <iframe
        src="https://giphy.com/embed/RgnTr6sxtYsWQiSzhx"
        width="480"
        height="480"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <p>
        <a href="https://giphy.com/gifs/loop-warrenwoodhouse-looped-RgnTr6sxtYsWQiSzhx">
          via GIPHY
        </a>
      </p>
    </div>
  );
}

export default EmptyView;
