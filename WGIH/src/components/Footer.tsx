import { Link } from "@tanstack/react-router";
import logo from "@/assets/wgih-logo.png";

export function Footer() {
  return (
    <footer className="portal-footer">
      <div className="portal-footer-main">
        <div className="portal-footer-brand">
          <Link to="/" className="portal-brand">
            <img src={logo} alt="" />
            <span>
              <strong>WGIH</strong>
              <small>
                World Geospatial
                <br />
                Information Home
              </small>
            </span>
          </Link>
          <p>Together for a Connected, Innovative and Prosperous World</p>
        </div>
        <div>
          <h3>Quick Links</h3>
          <Link to="/about">About WGIH</Link>
          <Link to="/news">News & Events</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
        <div>
          <h3>Services</h3>
          <Link to="/solutions">Geospatial Solutions</Link>
          <Link to="/business">Business &amp; Opportunities</Link>
          <Link to="/training">Academy &amp; Training</Link>
        </div>
        <div>
          <h3>Follow Us</h3>
          <div className="portal-socials">
            <a href="https://www.linkedin.com/" aria-label="LinkedIn" className="social-linkedin">
              in
            </a>
            <a href="https://www.youtube.com/" aria-label="YouTube" className="social-youtube">
              ▶
            </a>
            <a href="https://x.com/" aria-label="X" className="social-x">
              𝕏
            </a>
            <a href="https://www.wechat.com/" aria-label="WeChat" className="social-wechat">
              ●●
            </a>
          </div>
        </div>
      </div>
      <div className="portal-copyright">
        © 2026 WGIH. All Rights Reserved. <span>|</span> Building a Global Geospatial Community
      </div>
    </footer>
  );
}
