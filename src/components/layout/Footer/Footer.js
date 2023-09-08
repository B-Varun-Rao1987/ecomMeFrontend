import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import { BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>Ecommerce ME.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2023 &copy; B. Varun Rao</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://github.com/B-Varun-Rao1987"><BsGithub /></a>
        <a href="https://www.linkedin.com/in/b-varun-rao-a15857208/"><BsLinkedin /></a>
        <a href="https://www.instagram.com/varunbrude/"><BsInstagram /></a>
      </div>
    </footer>
  );
};

export default Footer;
