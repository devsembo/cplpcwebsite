import { getCertificateQueue } from "@/lib/data/academy";
import CertificatesQueue from "./CertificatesQueue";

export default async function AdminCertificatesPage() {
    const enrollments = await getCertificateQueue();
    return <CertificatesQueue enrollments={enrollments} />;
}
