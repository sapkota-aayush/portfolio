import { NotebookShell } from "@/components/notebook/NotebookShell";

export const metadata = {
  title: "Aayush Sapkota — Projects",
  description: "Aayush's projects and builds.",
};

export default function ProjectsRoute() {
  return <NotebookShell initialView={{ kind: "projects" }} />;
}
