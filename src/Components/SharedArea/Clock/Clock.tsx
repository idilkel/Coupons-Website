import moment from "moment";
import { useEffect, useState } from "react";
import "./Clock.css";

function Clock(): JSX.Element {
  let timerId: any;
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  // useEffect(() => {
  //   timerId = setInterval(() => {
  //     time.setSeconds(time.getSeconds() + 1);
  //     setTime(time);
  //   }, 1000);
  //   return () => {
  //     clearInterval(timerId);
  //   };
  // }, []);

  return (
    <div className="Clock">
      <h2>{moment(time).format("HH:mm:ss")}</h2>
      {/* <h2>{time.toISOString()}</h2> */}
    </div>
  );
}

export default Clock;
