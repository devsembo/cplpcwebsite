-- Corrige os alertas críticos do Supabase Advisor (rls_disabled_in_public,
-- sensitive_columns_exposed): todas as tabelas do schema partilhado
-- academy/cplpcwebsite estavam com RLS desativado, expondo-as via
-- PostgREST a quem tivesse a chave anon. As duas apps ligam-se sempre com o
-- role "postgres" (BYPASSRLS=true), por isso ativar RLS sem políticas
-- (deny-by-default) não afeta nenhuma delas — só fecha o acesso público
-- via API que hoje está aberto.
ALTER TABLE "public"."_prisma_migrations" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."AdminUser" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."AdminAuthToken" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."AdminSession" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."AdminLoginAttempt" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."FormandoAccount" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."FormandoAuthToken" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."FormandoSession" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."FormandoLoginAttempt" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Course" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."CourseSession" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."CourseEnrollment" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Company" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."JobOpening" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."JobApplication" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."BlogPost" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Project" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Service" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Faq" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Partner" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Testimonial" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."PageHero" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."NewsletterSubscriber" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."StaffNotification" ENABLE ROW LEVEL SECURITY;
