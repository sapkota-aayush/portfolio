import { NotebookShell } from "@/components/notebook/NotebookShell";

export const metadata = {
  title: "Aayush Sapkota — Highlights",
  description:
    "Aayush's project and community highlights as a stacked-polaroid deck.",
};

export default function LinkedInRoute() {
  // Deep-link: skip the landing flip and open the notebook with the
  // LinkedIn post carousel already in the split view.
  return <NotebookShell initialView={{ kind: "linkedin" }} />;
}
