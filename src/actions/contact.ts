"use server";

import { Resend } from "resend";
import { verifyRecaptcha } from "@/utils/captcha/verify-recaptcha";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function handleContactForm(formData: FormData) {
  const honeypot = formData.get("company") as string;
  if (honeypot) {
    console.warn("Spam detected via honeypot.");
    return;
  }

  const token = formData.get("g-recaptcha-token") as string;
  const passed = await verifyRecaptcha(token);
  if (!passed) {
    throw new Error("reCAPTCHA verification failed");
  }

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    throw new Error("Missing fields");
  }

  await resend.emails.send({
    from: "Business Contact <contact@nivora.studio>",
    to: ["nivora.dev@gmail.com"],
    subject: "New Contact Form Submission",
    html: `<strong>Name:</strong> ${name}<br/><strong>Email:</strong> ${email}<br/><strong>Message:</strong><br/>${message}`,
  });
}
