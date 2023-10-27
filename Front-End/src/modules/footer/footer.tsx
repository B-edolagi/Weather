import { BiLogoTelegram } from "react-icons/bi";
import { SlSocialVkontakte } from "react-icons/sl";
import { AiOutlineInstagram } from "react-icons/ai";
import { DiGithubFull } from "react-icons/di";

function Footer() {
  return (
    <footer>
      <div className="footer__container" id="footer__container">
        <div className="footer__container_bug">
          <h2>Found a problem?</h2>
          <a
            href="mailto:eronmcgonagal@gmail.com"
            target="_blank"
            className="gmail"
            id="links"
          >
            Write us...
          </a>
        </div>
        <div className="footer__container_links">
          <a
            href="https://t.me/eronmcgonagal"
            className="link"
            target="_blank"
            id="linksTelegram"
          >
            <BiLogoTelegram />
          </a>
          <a
            href="https://vk.com/eronmcgonagal"
            className="link"
            target="_blank"
            id="linksVK"
          >
            <SlSocialVkontakte />
          </a>
          <a
            href="https://www.instagram.com/eronmcgonagal/"
            className="link"
            target="_blank"
            id="linksInstagram"
          >
            <AiOutlineInstagram width="40px" />
          </a>
          <a
            href="https://github.com/EronMG"
            className="link"
            target="_blank"
            id="linksGithub"
          >
            <DiGithubFull />
          </a>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
