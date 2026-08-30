/**
 * Textes disponibles en français et en anglais.
 *
 * Le portfolio n'a pas encore de sélecteur de langue : `DEFAULT_LANGUAGE`
 * fixe celle utilisée partout. Le jour où un sélecteur sera ajouté, il
 * suffira de remplacer cette constante par une valeur venant d'un contexte
 * React, sans toucher aux composants qui appellent déjà `useTranslation`.
 */

export const DEFAULT_LANGUAGE = "fr";

export const translations = {
  fr: {
    contact: {
      title: ["Travaillons", "ensemble."],
      intro:
        "Une opportunité, un projet ou simplement envie d'échanger ? N'hésitez pas à m'écrire directement.",
      formLabel: "Formulaire de contact",
      fields: {
        name: "Nom",
        email: "Email",
        subject: "Objet",
        subjectOptional: "Objet (facultatif)",
        message: "Message",
      },
      placeholders: {
        subject: "Facultatif",
      },
      errors: {
        name: "Merci d'indiquer votre nom.",
        email: "Merci d'indiquer votre adresse email.",
        emailInvalid: "Cette adresse email ne semble pas valide.",
        message: "Merci d'écrire votre message.",
      },
      submit: {
        idle: "Envoyer",
        loading: "Envoi...",
      },
      success: {
        title: "Message envoyé.",
        text: "Merci pour votre message. Je vous répondrai dès que possible.",
        again: "Envoyer un autre message",
      },
      failure: {
        title: "Une erreur est survenue.",
        text: "Le message n'a pas pu être envoyé. Vous pouvez également me contacter directement par email :",
        retry: "Réessayer",
      },
      honeypot: "Ne remplissez pas ce champ si vous êtes humain",
      channels: {
        email: "Email",
        linkedin: "LinkedIn",
        github: "GitHub",
      },
      newTab: "nouvel onglet",
    },
    cv: {
      title: "Curriculum vitae",
      lead: "Deux versions, un même parcours.",
      updatedAt: "Dernière mise à jour",
      versions: {
        fr: {
          label: "Français",
          short: "FR",
          download: "Télécharger",
          open: "Ouvrir dans un nouvel onglet",
          viewerLabel: "CV de Marvin Escalle, version française",
          fallback:
            "Votre navigateur n'affiche pas les PDF directement dans la page.",
        },
        en: {
          label: "English",
          short: "EN",
          download: "Download",
          open: "Open in new tab",
          viewerLabel: "Marvin Escalle's résumé, English version",
          fallback:
            "Your browser cannot display PDF files inside the page.",
        },
      },
      switchLabel: "Choisir la version du CV",
    },
  },

  en: {
    contact: {
      title: ["Let's work", "together."],
      intro:
        "An opportunity, a project, or simply want to connect? Feel free to get in touch.",
      formLabel: "Contact form",
      fields: {
        name: "Name",
        email: "Email",
        subject: "Subject",
        subjectOptional: "Subject (optional)",
        message: "Message",
      },
      placeholders: {
        subject: "Optional",
      },
      errors: {
        name: "Please enter your name.",
        email: "Please enter your email address.",
        emailInvalid: "This email address does not look valid.",
        message: "Please write your message.",
      },
      submit: {
        idle: "Send",
        loading: "Sending...",
      },
      success: {
        title: "Message sent.",
        text: "Thank you for reaching out. I'll get back to you as soon as possible.",
        again: "Send another message",
      },
      failure: {
        title: "Something went wrong.",
        text: "The message could not be sent. You can also reach me directly by email:",
        retry: "Try again",
      },
      honeypot: "Do not fill this field if you are human",
      channels: {
        email: "Email",
        linkedin: "LinkedIn",
        github: "GitHub",
      },
      newTab: "new tab",
    },
    cv: {
      title: "Curriculum vitae",
      lead: "Two versions, one career.",
      updatedAt: "Last updated",
      versions: {
        fr: {
          label: "Français",
          short: "FR",
          download: "Télécharger",
          open: "Ouvrir dans un nouvel onglet",
          viewerLabel: "CV de Marvin Escalle, version française",
          fallback:
            "Votre navigateur n'affiche pas les PDF directement dans la page.",
        },
        en: {
          label: "English",
          short: "EN",
          download: "Download",
          open: "Open in new tab",
          viewerLabel: "Marvin Escalle's résumé, English version",
          fallback: "Your browser cannot display PDF files inside the page.",
        },
      },
      switchLabel: "Choose the résumé version",
    },
  },
};

/** Renvoie le dictionnaire de la langue active. */
export const useTranslation = (language = DEFAULT_LANGUAGE) =>
  translations[language] ?? translations[DEFAULT_LANGUAGE];

export default translations;
