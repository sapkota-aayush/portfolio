import { NotebookShell } from "@/components/notebook/NotebookShell";

export const metadata = {
  title: "Aayush Sapkota — Leadership",
  description: "Aayush's leadership, awards, and speaking work.",
};

export default function LeadershipRoute() {
  return <NotebookShell initialView={{ kind: "leadership" }} />;
}
