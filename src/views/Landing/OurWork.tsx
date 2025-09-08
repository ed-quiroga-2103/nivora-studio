import Separator from "@/components/Separator";
import { t } from "@/utils/translations/translations";
import React from "react";

const Card = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="card">
    <h3 className="title">{title}</h3>
    <p className="description">{description}</p>
  </div>
);

export default function OurWork() {
  const services: { title: string; body: string }[] = Object.values(
    t("services")
  );

  return (
    <div className="work-section">
      <h2 className="title">{t("ourWork.headline")}</h2>
      <Separator className="underline" />
      <div>{/* <p className="subtitle">{t("ourWork.body")}</p> */}</div>
      <div className="cards">
        {services.map((service, index) => (
          <Card key={index} title={service.title} description={service.body} />
        ))}
      </div>
    </div>
  );
}
