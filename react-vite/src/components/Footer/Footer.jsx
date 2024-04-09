import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import './Footer.css'
import { NavLink } from "react-router-dom";

export default function Footer() {


    return (
        <div className="footer-container">
            <h2 className="footer-text">Contact</h2>
            <div className="footer-info-container">
                <div className="footer-info-box">
                    <NavLink to='https://github.com/TylerHan1226'>
                        <FaGithub className="footer-icons" />
                    </NavLink>
                    <p className="footer-text">TylerHan1226</p>
                </div>
                <div className="footer-info-box">
                    <NavLink to='https://www.linkedin.com/in/yucheng-han-2a3684254/'>
                        <FaLinkedin className="footer-icons" />
                    </NavLink>
                    <p className="footer-text">Yucheng "Tyler" Han</p>
                </div>
                <div className="footer-info-box">
                    <NavLink>
                        <MdEmail className="footer-icons" />
                    </NavLink>
                    <p className="footer-text">tylerhan1226@gmail.com</p>
                </div>
            </div>
            <p>© 2024 All rights reserved by Yucheng "Tyler" Han</p>


        </div>
    );
}
