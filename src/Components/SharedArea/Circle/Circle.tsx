import { useState } from "react";
import "./Circle.css";

function Circle(): JSX.Element {
  const [num, setNum] = useState(7);
  return <div className="Circle">{num}</div>;
}

export default Circle;
