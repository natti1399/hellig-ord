import type { Metadata } from "next";
import FaqContent from "./FaqContent";

export const metadata: Metadata = {
  title: "Ofte stilte spørsmål",
  description:
    "Finn svar på de vanligste spørsmålene om bestilling, levering, retur og betaling hos Hellig Ord.",
};

export default function FaqPage() {
  return <FaqContent />;
}
