import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

function EmailTemplate({ name, email, message }: EmailTemplateProps) {
  return (
    <div>
      <h1>
        New contact form submission: {name} - {email}
      </h1>
      <p>{message}</p>
    </div>
  );
}

async function sendBusinessEmail(name: string, email: string, message: string) {
  const { data, error } = await resend.emails.send({
    from: "Sales <contact-form@business.nivora.studio>",
    to: ["ed.quiroga.2103@gmail.com"],
    subject: "New contact form submission: " + name + " - " + email,
    react: EmailTemplate({ name, email, message }),
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
}

export { sendBusinessEmail };
