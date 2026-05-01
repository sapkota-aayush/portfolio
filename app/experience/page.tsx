import { NotebookShell } from "@/components/notebook/NotebookShell";

export const metadata = {
  title: "Aayush Sapkota — Experience",
  description: "Aayush's work experience: software, web, and tutoring roles.",
};

export default function ExperienceRoute() {
  // Deep-link: skip the landing flip and open the notebook with the
  // Experience timeline already in the split view.
  return <NotebookShell initialView={{ kind: "experience" }} />;
}
