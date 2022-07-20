import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home(): JSX.Element {
  const navigate = useNavigate();
  const admin = () => {
    navigate("/admin");
  };
  return (
    <div className="Home flex-center-col">
      <h1>Hot Coupons Homepage</h1>
      <button className="button-success" onClick={admin}>
        Admin Homepage
      </button>
      {/* <img
        className="shadow"
        src="https://media.giphy.com/media/Nx85vtTY70T3W/giphy.gif"
        alt="TaaS"
      /> */}
    </div>
  );
}

export default Home;
