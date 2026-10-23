import Image from "next/image";
import { FaDiscord, FaInstagram, FaLinkedin } from "react-icons/fa6";
import SaseLogo from "@/public/sase_logos/navyHorizontal.png";

const socialLinks = [
  { label: "Discord", href: "https://discord.com/invite/TRFUzdd2cu ", Icon: FaDiscord },
  { label: "Instagram", href: "https://www.instagram.com/usfsase/ ", Icon: FaInstagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/saseusf/ ", Icon: FaLinkedin },
];

export default function Footer() {
  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="footer-brand">
        <Image
          className="footer-logo"
          src={SaseLogo}
          alt="SASE"
          width={352}
          height={104}
        />
        <p>University of South Florida</p>
        <p>Society of Asian Scientists and Engineers</p>
      </div>

      <div className="footer-contacts">
        <h2>Contacts</h2>
        <nav className="footer-socials" aria-label="Social media">
          {socialLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              className="footer-social-link"
              href={href}
              aria-label={label}
              title={label}
            >
              <Icon aria-hidden="true" />
            </a>
          ))}
          <a
            className="footer-bullsconnect-link"
            href="https://bullsconnect.usf.edu/sase/home/ "
            aria-label="BullsConnect"
            title="BullsConnect"
          >
            <Image
              src="/bullsconnect.png"
              alt="BullsConnect"
              width={267}
              height={61}
            />
          </a>
        </nav>
      </div>
    </footer>
  );
}
