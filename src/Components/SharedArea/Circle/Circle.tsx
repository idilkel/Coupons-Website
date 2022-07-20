import { useState } from "react";
import "./Circle.css";

interface CircleProps {
  num: number;
}

function Circle(props: CircleProps): JSX.Element {
  const [num, setNum] = useState<number>(props.num);

  return <div className="Circle">{props.num}</div>;
}

export default Circle;
