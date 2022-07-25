import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home(): JSX.Element {
  const navigate = useNavigate();
  const admin = () => {
    navigate("/admin");
  };
  const company = () => {
    navigate("/companies/coupons");
  };
  const customer = () => {
    navigate("/customers/coupons");
  };
  return (
    <div className="Home flex-center-col">
      <h1>Hot Coupons Homepage</h1>
      <h3>Please login to enjoy our coupons</h3>
      <div>
        <button className="button-success" onClick={admin}>
          Admin Homepage
        </button>
        <button className="button-success" onClick={company}>
          Company Homepage
        </button>
        <button className="button-success" onClick={customer}>
          Customer Homepage
        </button>
        {/* <img
        className="shadow"
        src="https://media.giphy.com/media/Nx85vtTY70T3W/giphy.gif"
        alt="TaaS"
      /> */}
      </div>
    </div>
  );
}

export default Home;
