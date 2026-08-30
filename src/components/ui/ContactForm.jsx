import { useId, useRef, useState } from "react";
import styled from "styled-components";

import { profile } from "../../data/profile";
import { media } from "../../styles/theme";
import { ArrowUpRight } from "../icons";

/* ────────────────────────────────────────────────────────────────────────
   Formulaire Netlify Forms.

   Netlify détecte les formulaires en analysant le HTML livré au moment du
   déploiement. Une application React ne produit qu'un index.html vide : le
   formulaire visible ici ne serait donc jamais vu. C'est pourquoi un
   formulaire statique portant le même nom et les mêmes champs est déclaré
   dans index.html, à la racine du projet. Les deux doivent rester
   synchronisés : si un champ change ici, il faut le changer là-bas aussi.

   L'envoi passe par fetch en POST url-encodé vers la racine du site, ce qui
   évite la page de confirmation générique de Netlify et garde le visiteur
   sur la page.
   ──────────────────────────────────────────────────────────────────────── */

export const FORM_NAME = "contact";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: clamp(1.75rem, 4vw, 2.5rem);
  max-width: 46rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-family: ${(props) => props.theme.fontMono};
    font-size: 0.72rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${(props) => props.theme.textFaint};
    transition: color 0.3s ease;
  }

  &:focus-within label {
    color: ${(props) => props.theme.text};
  }

  input,
  textarea {
    width: 100%;
    font-family: inherit;
    font-size: clamp(1rem, 1.4vw, 1.1rem);
    line-height: 1.6;
    color: ${(props) => props.theme.text};
    background: transparent;
    border: 0;
    border-bottom: 1px solid ${(props) => props.theme.line};
    border-radius: 0;
    padding: 0.5rem 0;
    outline: none;
    transition: border-color 0.35s ease;
  }

  textarea {
    resize: vertical;
    min-height: 7.5rem;
  }

  input:hover,
  textarea:hover {
    border-color: ${(props) => props.theme.lineStrong};
  }

  /* Le trait se dessine sous le champ actif : c'est la seule animation, et
     elle reste très courte. */
  .line {
    position: relative;
    margin-top: -1px;
    height: 1px;
    background: ${(props) => props.theme.text};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);
  }

  &:focus-within .line {
    transform: scaleX(1);
  }

  &[data-invalid="true"] input,
  &[data-invalid="true"] textarea {
    border-color: ${(props) => props.theme.text};
  }
`;

const FieldError = styled.p`
  font-size: 0.82rem;
  line-height: 1.5;
  color: ${(props) => props.theme.text};
  padding-left: 1rem;
  border-left: 2px solid ${(props) => props.theme.text};
`;

const Submit = styled.button`
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.9rem 1.6rem;
  border: 1px solid ${(props) => props.theme.lineStrong};
  font-family: ${(props) => props.theme.fontMono};
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease, opacity 0.3s ease;

  svg {
    width: 15px;
    height: 15px;
  }

  &:hover:not(:disabled) {
    background: ${(props) => props.theme.text};
    color: ${(props) => props.theme.body};
    border-color: ${(props) => props.theme.text};
  }

  &:disabled {
    opacity: 0.55;
    cursor: progress;
  }

  ${media.sm`
    width: 100%;
    justify-content: center;
  `}
`;

const Result = styled.div`
  border-top: 1px solid ${(props) => props.theme.line};
  padding-top: clamp(1.75rem, 4vw, 2.5rem);
  max-width: 46rem;

  h3 {
    font-size: clamp(1.6rem, 4vw, 2.5rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    text-transform: uppercase;
  }

  p {
    margin-top: 1rem;
    max-width: 44ch;
    color: ${(props) => props.theme.textSoft};
  }

  a.mail {
    display: inline-block;
    margin-top: 0.75rem;
    border-bottom: 1px solid currentColor;
    padding-bottom: 0.15rem;
  }
`;

const Again = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  margin-top: 1.75rem;
  font-family: ${(props) => props.theme.fontMono};
  font-size: 0.75rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  border-bottom: 1px solid ${(props) => props.theme.lineStrong};
  padding-bottom: 0.25rem;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: ${(props) => props.theme.text};
  }
`;

/** Encodage attendu par Netlify pour une soumission en arrière-plan. */
const encode = (data) =>
  Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");

/* Volontairement permissif : le but est d'écarter les fautes de frappe
   évidentes, pas de rejeter des adresses valides mais inhabituelles. */
const looksLikeEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

const EMPTY = { name: "", email: "", subject: "", message: "" };

const ContactForm = ({ texts }) => {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const formRef = useRef(null);
  const id = useId();

  const fieldId = (name) => `${id}-${name}`;
  const errorId = (name) => `${id}-${name}-error`;

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = texts.errors.name;
    if (!values.email.trim()) next.email = texts.errors.email;
    else if (!looksLikeEmail(values.email.trim()))
      next.email = texts.errors.emailInvalid;
    if (!values.message.trim()) next.message = texts.errors.message;
    return next;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    // L'erreur disparaît dès que le visiteur corrige son champ.
    setErrors((current) =>
      current[name] ? { ...current, [name]: undefined } : current
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const found = validate();
    setErrors(found);

    if (Object.keys(found).length > 0) {
      const first = ["name", "email", "message"].find((key) => found[key]);
      formRef.current?.querySelector(`#${CSS.escape(fieldId(first))}`)?.focus();
      return;
    }

    setStatus("loading");

    // Le honeypot est lu dans le DOM : il n'est jamais rempli par un humain,
    // donc jamais placé dans l'état React.
    const botField = formRef.current?.elements?.["bot-field"]?.value ?? "";

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": FORM_NAME,
          "bot-field": botField,
          ...values,
        }),
      });

      if (!response.ok) throw new Error(`Réponse ${response.status}`);

      setStatus("success");
      setValues(EMPTY);
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus("idle");
    setErrors({});
  };

  const textField = (name, { label, type = "text", required = true }) => (
    <Field data-invalid={Boolean(errors[name])}>
      <label htmlFor={fieldId(name)}>{label}</label>
      {type === "textarea" ? (
        <textarea
          id={fieldId(name)}
          name={name}
          rows={5}
          value={values[name]}
          onChange={handleChange}
          required={required}
          aria-invalid={Boolean(errors[name])}
          aria-describedby={errors[name] ? errorId(name) : undefined}
        />
      ) : (
        <input
          id={fieldId(name)}
          name={name}
          type={type}
          value={values[name]}
          onChange={handleChange}
          required={required}
          autoComplete={
            name === "name" ? "name" : name === "email" ? "email" : "off"
          }
          aria-invalid={Boolean(errors[name])}
          aria-describedby={errors[name] ? errorId(name) : undefined}
        />
      )}
      <span className="line" aria-hidden="true" />
      {errors[name] ? (
        <FieldError id={errorId(name)}>{errors[name]}</FieldError>
      ) : null}
    </Field>
  );

  return (
    <>
      {/* Le résultat est annoncé aux lecteurs d'écran sans voler le focus. */}
      <div role="status" aria-live="polite" className="visually-hidden">
        {status === "success" ? texts.success.title : null}
        {status === "error" ? texts.failure.title : null}
      </div>

      {status === "success" ? (
        <Result>
          <h3>{texts.success.title}</h3>
          <p>{texts.success.text}</p>
          <Again type="button" onClick={reset}>
            {texts.success.again}
            <ArrowUpRight />
          </Again>
        </Result>
      ) : (
        <Form
          ref={formRef}
          name={FORM_NAME}
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          noValidate
          aria-label={texts.formLabel}
        >
          {/* Netlify identifie la soumission grâce à ce champ. */}
          <input type="hidden" name="form-name" value={FORM_NAME} />

          {/* Piège à robots : masqué du rendu comme de l'ordre de tabulation
              et de l'arbre d'accessibilité grâce à l'attribut hidden. */}
          <p hidden>
            <label>
              {texts.honeypot}
              <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </p>

          {textField("name", { label: texts.fields.name })}
          {textField("email", { label: texts.fields.email, type: "email" })}
          {textField("subject", {
            label: texts.fields.subjectOptional,
            required: false,
          })}
          {textField("message", {
            label: texts.fields.message,
            type: "textarea",
          })}

          {status === "error" ? (
            <Result as="div">
              <h3>{texts.failure.title}</h3>
              <p>
                {texts.failure.text}{" "}
                <a className="mail" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              </p>
            </Result>
          ) : null}

          <Submit type="submit" disabled={status === "loading"}>
            {status === "loading" ? texts.submit.loading : texts.submit.idle}
            {status === "loading" ? null : <ArrowUpRight />}
          </Submit>
        </Form>
      )}
    </>
  );
};

export default ContactForm;
