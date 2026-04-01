import type { Metadata } from "next";
import KontaktContent from "./KontaktContent";

export const metadata: Metadata = {
  title: "Kontakt oss",
  description:
    "Ta kontakt med Hellig Ord – vi hjelper deg gjerne med spørsmål om produkter, bestillinger og levering.",
};

export default function KontaktPage() {
  return <KontaktContent />;
}
