import type { BlogPost } from "@prisma/client";

export function buildNewsletterEmail(post: BlogPost, unsubscribeToken: string): string {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cplpconnect.pt";
    const postUrl = `${siteUrl}/blog/${post.slug}`;
    const unsubscribeUrl = `${siteUrl}/newsletter/unsubscribe?token=${unsubscribeToken}`;

    return `
    <div style="font-family: -apple-system, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #0B1533;">
        <div style="padding: 24px 0; text-align: center; background-color: #0B1533;">
            <span style="color: #ffffff; font-weight: 800; font-size: 18px; letter-spacing: -0.02em;">CPLP CONNECT</span>
        </div>
        <div style="padding: 32px 24px;">
            ${post.coverImageUrl ? `<img src="${post.coverImageUrl}" alt="" style="width: 100%; border-radius: 8px; margin-bottom: 24px;" />` : ""}
            <h1 style="font-size: 24px; font-weight: 800; margin: 0 0 12px; letter-spacing: -0.02em;">${post.title}</h1>
            <p style="font-size: 15px; line-height: 1.6; color: #5A6478; margin: 0 0 24px;">${post.excerpt}</p>
            <a href="${postUrl}" style="display: inline-block; background-color: #0554F5; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; font-size: 14px;">
                Ler artigo completo
            </a>
        </div>
        <div style="padding: 24px; border-top: 1px solid #E5E9F0; text-align: center;">
            <p style="font-size: 12px; color: #94A0B4; margin: 0;">
                Recebeu este email porque subscreveu a newsletter da CPLP CONNECT.
                <br />
                <a href="${unsubscribeUrl}" style="color: #94A0B4;">Cancelar subscrição</a>
            </p>
        </div>
    </div>
    `.trim();
}
