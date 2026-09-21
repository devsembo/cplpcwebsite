import { redirect } from "next/navigation";

export default function RegistarPage() {
    redirect(`${process.env.ACADEMY_URL}/registar`);
}
