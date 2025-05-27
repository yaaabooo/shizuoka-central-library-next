// app/trainings/page.tsx
import { redirect } from "next/navigation";

export default function TrainingsIndexPage() {
  redirect("/trainings/by-staff");
}
