import { NotebookShell } from "@/components/notebook/NotebookShell";

export const metadata = {
  title: "Aayush Sapkota — Education",
  description:
    "Aayush's education page: graduated from St. Lawrence College with an Advanced Diploma in Computer Programming and Analysis.",
};

export default function EducationRoute() {
  return <NotebookShell initialView={{ kind: "education" }} />;
}
