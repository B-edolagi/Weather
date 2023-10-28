import { BiLogoTelegram } from "react-icons/bi";
import { SlSocialVkontakte } from "react-icons/sl";
import { AiOutlineInstagram } from "react-icons/ai";
import { DiGithubFull } from "react-icons/di";
import { AiFillGithub } from "react-icons/ai";

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
        <div className="footer__container_names">
          <div className="names_all">
            <div className="names_all_title">
              <img
                src="/src/assets/nikita.jpg"
                alt="nikita"
                width="100px"
                height="100px"
                id="img"
              />
              <div className="inf" id="">
                <h2 id="h2">Front-End</h2>
                <p id="lox">Developer</p>
                <a href="https://github.com/EronMG" target="_blank" id="link">
                  ZAYTSEV NIKITA <AiFillGithub />
                </a>
              </div>
            </div>
          </div>
          <div className="names_all">
            <div className="names_all_title">
              <div className="inf">
                <h2 id="h22">Back-End</h2>
                <p id="lox22">Developer</p>
                <a
                  href="https://github.com/omega1u123"
                  target="_blank"
                  id="link"
                >
                  <AiFillGithub /> GVARDIAN ILYA
                </a>
              </div>
              <img
                src="/src/assets/ilya.jpg"
                alt="ilya"
                width="100px"
                height="100px"
                id="img"
              />
            </div>
          </div>
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
