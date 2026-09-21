import { redirect } from "next/navigation";

export default function RecuperarPasswordPage() {
    redirect(`${process.env.ACADEMY_URL}/esqueci-password`);
}
