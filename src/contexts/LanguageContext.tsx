'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt' | 'en';


type Translations = typeof translations;
export type TranslationKeys = keyof Translations['pt'];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  pt: {
    // Navigation
    'nav.home': 'Início',
    'nav.about': 'Sobre Nós',
    'nav.services': 'Serviços',
    'nav.projects': 'Projetos',
    'nav.blog': 'Blog',
    'nav.contact': 'Contacto',
    'nav.cta': 'Fale Connosco',
    'nav.quote': 'Solicitar Orçamento',

    // Hero
    'hero.badge': 'Consultoria e Transformação Digital no Espaço CPLP',
    'hero.title': 'Transformação digital para o espaço CPLP',
    'hero.subtitle': 'Concebemos, desenvolvemos e implementamos as plataformas que ligam empresas e instituições de Portugal, Angola e da CPLP.',
    'hero.cta.primary': 'Fale connosco',
    'hero.cta.secondary': 'Conheça a Academy',
    'hero.stats.countries': 'Países CPLP',
    'hero.stats.million': 'Milhões',
    'hero.stats.people': 'de pessoas',
    'hero.stats.continents': 'Continentes',
    'hero.stats.projectsDelivered': 'Projetos entregues',
    'hero.stats.businessUnits': 'Unidades de negócio',
    'hero.stats.headquarters': 'Portugal',
    'hero.scroll': 'Rolar para explorar',

    // About
    'about.tag': 'Quem Somos',
    'about.title': 'Sobre',
    'about.titleHighlight': 'Nós',
    'about.description': 'Especialistas em transformação digital no espaço CPLP',
    'about.mainText': 'Somos uma empresa de consultoria tecnológica especializada em transformação digital para o espaço CPLP. Com presença em múltiplos países, conectamos empresas através de soluções inovadoras que respeitam as particularidades culturais e empresariais da lusofonia.',
    'about.mission.title': 'Missão',
    'about.mission.description': 'Impulsionar a transformação digital nas empresas do espaço CPLP através de soluções tecnológicas inovadoras e personalizadas.',
    'about.vision.title': 'Visão',
    'about.vision.description': 'Ser a referência em consultoria tecnológica no espaço CPLP, conectando mercados e promovendo crescimento sustentável.',
    'about.values.title': 'Valores',
    'about.values.description': 'Inovação, excelência técnica, compromisso com resultados e valorização das culturas lusófonas.',
    'about.presence.title': 'Presença CPLP',
    'about.presence.description': 'Atuamos em múltiplos países da Comunidade de Países de Língua Portuguesa, conectando mercados e oportunidades.',
    
    // Services
    'services.tag': 'Áreas de Atuação',
    'services.title': 'O que fazemos',
    'services.description': 'Soluções tecnológicas completas e personalizadas para impulsionar o seu negócio',
    'services.items.web.title': 'Plataformas & Software à Medida',
    'services.items.web.description': 'Sistemas e plataformas digitais desenhados à volta dos processos reais da sua empresa ou instituição — do primeiro desenho à entrega em produção.',
    'services.items.mobile.title': 'Apps Mobile',
    'services.items.mobile.description': 'Aplicações móveis que aproximam a sua empresa de clientes, colaboradores ou cidadãos, em qualquer país do espaço CPLP.',
    'services.items.cloud.title': 'Cloud & Infraestrutura',
    'services.items.cloud.description': 'Infraestrutura segura e escalável, preparada para crescer com o negócio e para operar com confiança entre mercados.',
    'services.items.design.title': 'Estratégia Digital & Design',
    'services.items.design.description': 'Estratégia de marca, produto e comunicação digital alinhadas com os objetivos de negócio — não apenas com tendências visuais.',

    // Projects
    'projects.tag': 'Portefólio',
    'projects.title': 'Projetos',

    // Solutions
    'sectors.tag': 'Setores Servidos',
    'sectors.title': 'Setores servidos',
    'sectors.items.banking.title': 'Banca & Fintech',
    'sectors.items.banking.description': 'Plataformas e integrações para instituições financeiras e fintechs que operam entre Portugal, Angola e a CPLP.',
    'sectors.items.public.title': 'Setor Público',
    'sectors.items.public.description': 'Sistemas e portais digitais para administração pública e organismos institucionais.',
    'sectors.items.education.title': 'Educação',
    'sectors.items.education.description': 'Plataformas de gestão académica e programas de formação corporativa.',
    'sectors.items.sme.title': 'PME & Grupos Empresariais',
    'sectors.items.sme.description': 'Sistemas à medida para operações empresariais em crescimento ou expansão internacional.',
    
    // Blog
    'blog.tag': 'Blog',
    'blog.title': 'Nosso',
    'blog.titleHighlight': 'Blog',
    'blog.description': 'Insights, tendências e novidades sobre tecnologia e inovação',
    'blog.readMore': 'Ler mais',
    'blog.viewAll': 'Ver Todos os Artigos',

    // Contact
    'contact.tag': 'Fale Connosco',
    'contact.title': 'Fale',
    'contact.titleHighlight': 'Connosco',
    'contact.description': 'Estamos prontos para transformar o seu negócio com soluções tecnológicas inovadoras',
    'contact.infoTitle': 'Informações de Contacto',
    'contact.info.email': 'Email',
    'contact.info.phone': 'Telefone',
    'contact.info.location': 'Localização',
    'contact.form.name': 'Nome',
    'contact.form.namePlaceholder': 'O seu nome',
    'contact.form.email': 'Email',
    'contact.form.emailPlaceholder': 'seu@email.com',
    'contact.form.phone': 'Telefone',
    'contact.form.phonePlaceholder': '+351 912 345 678',
    'contact.form.message': 'Mensagem',
    'contact.form.messagePlaceholder': 'Conte-nos sobre o seu projeto...',
    'contact.form.submit': 'Enviar Mensagem',
    'contact.form.successTitle': 'Mensagem enviada!',
    'contact.form.successDescription': 'Entraremos em contacto em breve.',
    
    // Footer
    'footer.tagline': 'Transformação digital e inovação tecnológica no espaço CPLP.',
    'footer.company': 'Empresa',
    'footer.resources': 'Recursos',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacidade',
    'footer.terms': 'Termos de Uso',
    'footer.cookies': 'Cookies',
    'footer.docs': 'Documentação',
    'footer.support': 'Suporte',
    'footer.faq': 'FAQ',
    'footer.rights': 'Todos os direitos reservados.',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.services': 'Services',
    'nav.projects': 'Projects',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.cta': 'Contact Us',
    'nav.quote': 'Request a Quote',

    // Hero
    'hero.badge': 'Consulting and Digital Transformation in the CPLP Region',
    'hero.title': 'Digital transformation for the CPLP region',
    'hero.subtitle': 'We design, build and implement the platforms that connect companies and institutions across Portugal, Angola and the CPLP.',
    'hero.cta.primary': 'Talk to us',
    'hero.cta.secondary': 'Discover the Academy',
    'hero.stats.countries': 'CPLP Countries',
    'hero.stats.million': 'Million',
    'hero.stats.people': 'people',
    'hero.stats.continents': 'Continents',
    'hero.stats.projectsDelivered': 'Projects delivered',
    'hero.stats.businessUnits': 'Business units',
    'hero.stats.headquarters': 'Portugal',
    'hero.scroll': 'Scroll to explore',

    // About
    'about.tag': 'Who We Are',
    'about.title': 'About',
    'about.titleHighlight': 'Us',
    'about.description': 'Digital transformation experts in the CPLP region',
    'about.mainText': 'We are a technology consulting company specialized in digital transformation for the CPLP region. With presence in multiple countries, we connect companies through innovative solutions that respect the cultural and business particularities of the Lusophone world.',
    'about.mission.title': 'Mission',
    'about.mission.description': 'Drive digital transformation in CPLP companies through innovative and customized technological solutions.',
    'about.vision.title': 'Vision',
    'about.vision.description': 'Be the reference in technological consulting in CPLP, connecting markets and promoting sustainable growth.',
    'about.values.title': 'Values',
    'about.values.description': 'Innovation, technical excellence, commitment to results, and appreciation of Lusophone cultures.',
    'about.presence.title': 'CPLP Presence',
    'about.presence.description': 'We operate in multiple Portuguese-speaking countries, connecting markets and opportunities.',
    
    // Services
    'services.tag': 'Areas of Focus',
    'services.title': 'What we do',
    'services.description': 'Complete and customized technology solutions to boost your business',
    'services.items.web.title': 'Custom Platforms & Software',
    'services.items.web.description': 'Digital systems and platforms designed around the real processes of your company or institution — from first draft to production.',
    'services.items.mobile.title': 'Mobile Apps',
    'services.items.mobile.description': 'Mobile applications that bring your company closer to customers, employees or citizens, anywhere in the CPLP region.',
    'services.items.cloud.title': 'Cloud & Infrastructure',
    'services.items.cloud.description': 'Secure, scalable infrastructure, ready to grow with the business and operate confidently across markets.',
    'services.items.design.title': 'Digital Strategy & Design',
    'services.items.design.description': 'Brand, product and digital communication strategy aligned with business goals — not just visual trends.',

    // Projects
    'projects.tag': 'Portfolio',
    'projects.title': 'Projects',

    // Solutions
    'sectors.tag': 'Sectors We Serve',
    'sectors.title': 'Sectors we serve',
    'sectors.items.banking.title': 'Banking & Fintech',
    'sectors.items.banking.description': 'Platforms and integrations for financial institutions and fintechs operating between Portugal, Angola and the CPLP.',
    'sectors.items.public.title': 'Public Sector',
    'sectors.items.public.description': 'Digital systems and portals for public administration and institutional bodies.',
    'sectors.items.education.title': 'Education',
    'sectors.items.education.description': 'Academic management platforms and corporate training programs.',
    'sectors.items.sme.title': 'SMEs & Business Groups',
    'sectors.items.sme.description': 'Custom systems for business operations in growth or international expansion.',
    
    // Blog
    'blog.tag': 'Blog',
    'blog.title': 'Our',
    'blog.titleHighlight': 'Blog',
    'blog.description': 'Insights, trends, and news about technology and innovation',
    'blog.readMore': 'Read more',
    'blog.viewAll': 'View All Articles',

    // Contact
    'contact.tag': 'Get in Touch',
    'contact.title': 'Get in',
    'contact.titleHighlight': 'Touch',
    'contact.description': 'We are ready to transform your business with innovative technology solutions',
    'contact.infoTitle': 'Contact Information',
    'contact.info.email': 'Email',
    'contact.info.phone': 'Phone',
    'contact.info.location': 'Location',
    'contact.form.name': 'Name',
    'contact.form.namePlaceholder': 'Your name',
    'contact.form.email': 'Email',
    'contact.form.emailPlaceholder': 'your@email.com',
    'contact.form.phone': 'Phone',
    'contact.form.phonePlaceholder': '+351 912 345 678',
    'contact.form.message': 'Message',
    'contact.form.messagePlaceholder': 'Tell us about your project...',
    'contact.form.submit': 'Send Message',
    'contact.form.successTitle': 'Message sent!',
    'contact.form.successDescription': 'We will get in touch soon.',
    
    // Footer
    'footer.tagline': 'Digital transformation and technological innovation in CPLP.',
    'footer.company': 'Company',
    'footer.resources': 'Resources',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms of Use',
    'footer.cookies': 'Cookies',
    'footer.docs': 'Documentation',
    'footer.support': 'Support',
    'footer.faq': 'FAQ',
    'footer.rights': 'All rights reserved.',
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: TranslationKeys): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
