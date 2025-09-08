import Separator from "@/components/Separator";
import { t } from "@/utils/translations/translations";
import React from "react";

export default function HeroSection() {
  return (
    <div className="hero-section">
      <h1 className="title">{t("hero.headline")}</h1>
      <Separator className="underline" />
      <div>
        <p className="subtitle">{t("hero.subheadline")}</p>
      </div>

      <div className="accent">
        <p>EST. 2025</p>
        <p>人を理解し、課題を解き、信頼を形にする。</p>

        {/* <p className="text">{t("hero.accent")}</p> */}
      </div>
    </div>
  );
}
