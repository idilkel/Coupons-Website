import "./SocialMedia.css";
import { BsGithub, BsLinkedin, BsFacebook } from "react-icons/bs";

function SocialMedia(): JSX.Element {
  return (
    <div className="SocialMedia">
      <a href="https://github.com/idilkel?tab=repositories">
        <BsGithub size={28} />
      </a>
      <a href="https://www.linkedin.com/in/idil-kasuto-kelson-8b6bb56/">
        <BsLinkedin size={28} />
      </a>
      <a href="https://www.facebook.com/idil.kelson">
        <BsFacebook size={28} />
      </a>
    </div>
  );
}

export default SocialMedia;
