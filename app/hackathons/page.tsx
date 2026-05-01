import { NotebookShell } from "@/components/notebook/NotebookShell";

export const metadata = {
  title: "Aayush Sapkota — Hackathons",
  description: "Aayush's hackathon projects and fast builds.",
};

export default function HackathonsRoute() {
  return <NotebookShell initialView={{ kind: "hackathons" }} />;
}
