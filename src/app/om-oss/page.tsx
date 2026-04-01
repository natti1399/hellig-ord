import type { Metadata } from "next";
import OmOssContent from "./OmOssContent";

export const metadata: Metadata = {
  title: "Om oss",
  description:
    "Les om historien og misjonen bak Hellig Ord – en nettbutikk med hjerte for Guds ord.",
};

export default function OmOssPage() {
  return <OmOssContent />;
}
