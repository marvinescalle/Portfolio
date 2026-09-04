import styled from "styled-components";
import { Link } from "react-router-dom";

import { profile } from "../../data/profile";
import { layout, media } from "../../styles/theme";
import { Github, Linkedin, Mail } from "../icons";
import { useTranslation } from "../../i18n";

const Wrap = styled.footer`
  /* Au-dessus du fond décoratif de CHROMA, comme le contenu principal. */
  position: relative;
  z-index: 1;
  border-top: 1px solid ${(props) => props.theme.line};
  margin-top: clamp(5rem, 12vw, 9rem);
`;

const Inner = styled.div`
  max-width: ${layout.maxWidth};
  margin: 0 auto;
  padding: 2.5rem ${layout.gutter} 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem 2rem;
  flex-wrap: wrap;
`;

const Credit = styled.p`
  font-family: ${(props) => props.theme.fontMono};
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  color: ${(props) => props.theme.textFaint};

  a:hover {
    color: ${(props) => props.theme.text};
  }
`;

const Social = styled.ul`
  display: flex;
  align-items: center;
  gap: 1.25rem;

  ${media.xs`
    gap: 1rem;
  `}
`;

const SocialLink = styled.a`
  display: inline-flex;
  color: ${(props) => props.theme.textSoft};
  transition: color 0.25s ease, transform 0.25s ease;

  &:hover {
    color: ${(props) => props.theme.text};
    transform: translateY(-2px);
  }
`;

const Footer = () => {
  const t = useTranslation();
  return (
  <Wrap>
    <Inner>
      <Credit>
        © {new Date().getFullYear()} {profile.fullName} ·{" "}
        <Link to="/">{t.common.backHome}</Link>
      </Credit>

      <Social>
        <li>
          <SocialLink href={`mailto:${profile.email}`} aria-label={t.common.email}>
            <Mail width={20} height={20} />
          </SocialLink>
        </li>
        <li>
          <SocialLink
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t.common.linkedin} (${t.common.newTab})`}
          >
            <Linkedin width={20} height={20} />
          </SocialLink>
        </li>
        <li>
          <SocialLink
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t.common.github} (${t.common.newTab})`}
          >
            <Github width={20} height={20} />
          </SocialLink>
        </li>
      </Social>
    </Inner>
  </Wrap>
  );
};

export default Footer;
