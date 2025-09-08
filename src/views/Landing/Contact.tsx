"use client";

import { useRef, useState } from "react";
import { handleContactForm } from "@/actions/contact";
import Separator from "@/components/Separator";
import { t } from "@/utils/translations/translations";

declare const grecaptcha: {
  execute(siteKey: string, options: { action: string }): Promise<string>;
};

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
  }
}

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Submitting...");

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (!window.grecaptcha) {
      setStatus("reCAPTCHA failed to load");
      return;
    }

    window.grecaptcha.ready(async () => {
      try {
        const token = await window.grecaptcha.execute(
          process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
          { action: "submit" }
        );

        formData.append("g-recaptcha-token", token);

        await handleContactForm(formData);
        form.reset();
        setStatus("Message sent!");
      } catch (err) {
        console.error("reCAPTCHA or submission error:", err);
        setStatus("Failed to send message.");
      }
    });
  }

  return (
    <div className="form-container">
      <h2>{t("contact.headline")}</h2>
      <Separator />
      <div className="content">
        <p className="message">{t("contact.body")}</p>
        <form ref={formRef} onSubmit={onSubmit} className="form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="name-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="email-input"
          />
          <textarea
            name="message"
            placeholder="Your message..."
            required
            className="message-input"
          />

          {/* Honeypot Field */}
          <input
            type="text"
            name="company"
            autoComplete="off"
            tabIndex={-1}
            aria-hidden="true"
            hidden
          />

          <button type="submit" className="submit-button" disabled>
            Send
          </button>

          <p>{status}</p>
        </form>
      </div>
    </div>
  );
}
