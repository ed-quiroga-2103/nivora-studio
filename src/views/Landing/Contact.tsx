"use client";

import { useEffect, useRef, useState } from "react";
import { handleContactForm } from "@/actions/contact";
import Separator from "@/components/Separator";
import { t } from "@/utils/translations/translations";

declare const grecaptcha: {
  enterprise: {
    ready: (cb: () => void) => void;
    execute: (siteKey: string, options: { action: string }) => Promise<string>;
  };
};

export default function ContactPage() {
  console.log(
    "RECAPTCHA SITE KEY:",
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  );

  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const checkRecaptcha = () => {
      if (grecaptcha.enterprise && grecaptcha.enterprise.ready) {
        console.log("✅ reCAPTCHA script loaded and ready!", grecaptcha);
        grecaptcha.enterprise.ready(() =>
          console.log("✅ grecaptcha.ready() triggered")
        );
      } else {
        console.log("⏳ reCAPTCHA not yet loaded...");
        setTimeout(checkRecaptcha, 500);
      }
    };

    checkRecaptcha();
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Submitting...");

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (!grecaptcha.enterprise) {
      setStatus("reCAPTCHA failed to load");
      return;
    }

    grecaptcha.enterprise.ready(async () => {
      try {
        const token = await grecaptcha.enterprise.execute(
          process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "",
          { action: "submit" }
        );

        formData.append("g-recaptcha-token", token);

        await handleContactForm(formData);
        form.reset();
        setStatus("Message sent!");
      } catch (err) {
        console.log(err);
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

          <button type="submit" className="submit-button">
            Send
          </button>

          <p>{status}</p>
        </form>
      </div>
    </div>
  );
}
