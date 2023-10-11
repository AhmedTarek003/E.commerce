import { Home, Mail, Phone } from "@mui/icons-material";
import "./footer.css";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="up-footer">
          <div className="footer-menu">
            <div className="footer-list">
              <h1 className="list-title">Clothes</h1>
              <ul className="items-lists">
                <li className="item-list">pants</li>
                <li className="item-list">shirt</li>
                <li className="item-list">sunglassess</li>
                <li className="item-list">shoes</li>
                <li className="item-list">socks</li>
              </ul>
            </div>
            <div className="footer-list">
              <h1 className="list-title">Devices</h1>
              <ul className="items-lists">
                <li className="item-list">smart phone</li>
                <li className="item-list">labtop</li>
                <li className="item-list">t.v</li>
                <li className="item-list">tablet</li>
                <li className="item-list">air conditioner</li>
              </ul>
            </div>
            <div className="footer-list">
              <h1 className="list-title">Home&Kitchen</h1>
              <ul className="items-lists">
                <li className="item-list">pan</li>
                <li className="item-list">bowl</li>
                <li className="item-list">cup</li>
                <li className="item-list">spoon</li>
                <li className="item-list">dish</li>
              </ul>
            </div>
          </div>
          <div className="footer-contact">
            <div className="contact home">
              <Home className="contact-icon" />
              egypt
            </div>
            <div className="contact mail">
              <Mail className="contact-icon" />
              ze@gmail.com
            </div>
            <div className="contact phone">
              <Phone className="contact-icon" />
              444 444 444
            </div>
          </div>
        </div>
        <div className="down-footer">
          <div className="logo footer-logo">ZE</div>
          <div className="footer-icons">
            <BsFacebook style={{ color: "#1877F2" }} className="foot-icon" />
            <BsInstagram style={{ color: "#E1306C" }} className="foot-icon" />
            <FaXTwitter className="foot-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
