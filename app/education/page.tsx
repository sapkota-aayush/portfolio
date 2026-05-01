import { NotebookShell } from "@/components/notebook/NotebookShell";

export const metadata = {
  title: "Aayush Sapkota — Education",
  description:
    "Aayush's education page: Computer Programming and Analysis at St. Lawrence College.",
};

export default function EducationRoute() {
  return <NotebookShell initialView={{ kind: "education" }} />;
}
