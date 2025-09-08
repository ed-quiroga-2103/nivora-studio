import Separator from "@/components/Separator";
import { t } from "@/utils/translations/translations";
import React from "react";

const BasicCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="service-card">
    <h3 className="service-title">{title}</h3>
    <div className="card-separator">
      <Separator className="line" />
    </div>
    <p className="service-description">{description}</p>
  </div>
);

const ItemsCard = ({ title, items }: { title: string; items: string[] }) => (
  <div className="service-card">
    <h3 className="service-title">{title}</h3>
    <div className="card-separator">
      <Separator className="line" />
    </div>
    <ul className="service-items">
      {items.map((item, index) => (
        <li key={index} className="service-item">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const renderCards = () => {
  const sections: {
    headline: string;
    items?: string[];
    body?: string;
  }[] = t("sections");

  const results: React.JSX.Element[] = [];
  let itemsCard;

  for (const [_, section] of Object.entries(sections)) {
    if (section.items) {
      itemsCard = <ItemsCard title={section.headline} items={section.items} />;
    } else if (section.body) {
      results.push(
        <BasicCard
          title={section.headline}
          description={section.body}
          key={section.headline}
        />
      );
    }
  }

  return [results, itemsCard];
};

export default function Services() {
  const [cards, _] = renderCards();
  return (
    <div className="services">
      <div className="cards">{cards}</div>
      {/* <div className="items">{items}</div> */}
    </div>
  );
}
