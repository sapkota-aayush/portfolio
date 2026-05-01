import { NotebookShell } from "@/components/notebook/NotebookShell";

export const metadata = {
  title: "Aayush Sapkota — About",
  description:
    "The about page of Aayush's journal — software developer, AI builder, and Toastmasters speaker.",
};

export default function AboutRoute() {
  // Deep-link: skip the landing flip and open the notebook with the
  // About page already in the split view.
  return <NotebookShell initialView={{ kind: "about" }} />;
}
