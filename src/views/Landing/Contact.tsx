"use client";

import { useRef, useState } from "react";
import { handleContactForm } from "@/actions/contact";

declare const grecaptcha: {
  execute(siteKey: string, options: { action: string }): Promise<string>;
};

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Submitting...");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const token = await grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
        { action: "submit" }
      );

      formData.append("g-recaptcha-token", token);

      await handleContactForm(formData);

      form.reset();
      setStatus("Message sent!");
    } catch (err) {
      console.error(err);
      setStatus("Failed to send message.");
    }
  }

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Contact Me</h1>
      <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="message"
          placeholder="Your message..."
          required
          className="w-full p-2 border rounded"
        />

        {/* Honeypot Field */}
        <input
          type="text"
          name="company"
          className="hidden"
          autoComplete="off"
          tabIndex={-1}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>

        <p className="text-sm text-gray-600">{status}</p>
      </form>
    </div>
  );
}
