import styled from "styled-components";

import { profile } from "../data/profile";
import { useTranslation } from "../i18n";
import { darkTheme, media } from "../styles/theme";
import PageShell from "../components/layout/PageShell";
import Reveal from "../components/ui/Reveal";
import ContactForm from "../components/ui/ContactForm";
import { ArrowUpRight, Github, Linkedin, Mail } from "../components/icons";

const Statement = styled.h1`
  font-size: clamp(1.75rem, 6.2vw, 5rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  line-height: 0.94;
  padding-bottom: clamp(1.5rem, 4vw, 2.5rem);

  span {
    display: block;
  }
`;

const Intro = styled.p`
  max-width: 46ch;
  font-size: clamp(1.05rem, 1.8vw, 1.25rem);
  line-height: 1.6;
  color: ${(props) => props.theme.textSoft};
  padding-bottom: clamp(2.5rem, 6vw, 4rem);
  border-bottom: 1px solid ${(props) => props.theme.line};
`;

const FormBlock = styled.section`
  padding: clamp(2.5rem, 6vw, 4rem) 0;
`;

const Channels = styled.ul`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${(props) => props.theme.line};
`;

const Channel = styled.li`
  border-bottom: 1px solid ${(props) => props.theme.line};

  a {
    display: grid;
    grid-template-columns: 2rem minmax(0, 10rem) 1fr auto;
    align-items: center;
    gap: 1rem;
    padding: clamp(1.25rem, 3vw, 1.85rem) 0;
    transition: padding-left 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);
  }

  a:hover {
    padding-left: 1rem;
  }

  a:hover .arrow {
    transform: translate(3px, -3px);
    opacity: 1;
  }

  .label {
    font-family: ${(props) => props.theme.fontMono};
    font-size: 0.72rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${(props) => props.theme.textFaint};
  }

  .value {
    font-size: clamp(1rem, 2vw, 1.35rem);
    font-weight: 500;
    overflow-wrap: anywhere;
  }

  .arrow {
    opacity: 0.45;
    transition: transform 0.35s ease, opacity 0.35s ease;
  }

  svg {
    width: 20px;
    height: 20px;
  }

  ${media.sm`
    a {
      grid-template-columns: 1.5rem 1fr auto;
      gap: 0.75rem;
    }

    .label { display: none; }
  `}
`;

const Location = styled.p`
  margin-top: clamp(2rem, 5vw, 3rem);
  font-family: ${(props) => props.theme.fontMono};
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${(props) => props.theme.textFaint};
`;

const Contact = () => {
  const t = useTranslation();

  const channels = [
    {
      id: "email",
      label: t.contact.channels.email,
      value: profile.email,
      href: `mailto:${profile.email}`,
      external: false,
      Icon: Mail,
    },
    {
      id: "linkedin",
      label: t.contact.channels.linkedin,
      value: profile.fullName,
      href: profile.links.linkedin,
      external: true,
      Icon: Linkedin,
    },
    {
      id: "github",
      label: t.contact.channels.github,
      value: "marvinescalle",
      href: profile.links.github,
      external: true,
      Icon: Github,
    },
  ];

  return (
    <PageShell
      theme={darkTheme}
      title="Contact"
      description="Contacter Marvin Escalle, ingénieur IT : formulaire, e-mail, LinkedIn et GitHub."
    >
      <Reveal>
        <Statement>
          {t.contact.title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </Statement>
      </Reveal>

      <Reveal delay={0.08}>
        <Intro>{t.contact.intro}</Intro>
      </Reveal>

      <FormBlock aria-label={t.contact.formLabel}>
        <Reveal delay={0.12}>
          <ContactForm texts={t.contact} />
        </Reveal>
      </FormBlock>

      <Channels>
        {channels.map((channel, i) => (
          <Reveal as="li" key={channel.id} delay={0.04 + i * 0.05}>
            <Channel as="div">
              <a
                href={channel.href}
                {...(channel.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                aria-label={
                  channel.external
                    ? `${channel.label} : ${channel.value} (${t.contact.newTab})`
                    : `${channel.label} : ${channel.value}`
                }
              >
                <channel.Icon />
                <span className="label">{channel.label}</span>
                <span className="value">{channel.value}</span>
                <ArrowUpRight className="arrow" />
              </a>
            </Channel>
          </Reveal>
        ))}
      </Channels>

      {profile.location ? <Location>{profile.location}</Location> : null}
    </PageShell>
  );
};

export default Contact;
