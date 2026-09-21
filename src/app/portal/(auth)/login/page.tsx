import { redirect } from "next/navigation";

export default function PortalLoginPage() {
    redirect(`${process.env.ACADEMY_URL}/login`);
}
