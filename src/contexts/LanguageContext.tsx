'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt' | 'en';


type Translations = typeof translations;
type TranslationKeys = keyof Translations['pt'];

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
    
    // Hero
    'hero.badge': 'Transformação Digital no Espaço CPLP',
    'hero.title': 'Inovação Tecnológica',
    'hero.subtitle': 'Conectando empresas através da tecnologia',
    'hero.cta.primary': 'Conheça-nos',
    'hero.cta.secondary': 'Entre em Contacto',
    'hero.stats.countries': 'Países CPLP',
    'hero.stats.million': 'Milhões',
    'hero.stats.people': 'de pessoas',
    'hero.stats.continents': 'Continentes',
    'hero.scroll': 'Rolar para explorar',
    
    // About
    'about.tag': '<About />',
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
    'services.tag': '<Services />',
    'services.title': 'Nossos',
    'services.titleHighlight': 'Serviços',
    'services.description': 'Soluções tecnológicas completas e personalizadas para impulsionar o seu negócio',
    'services.items.web.title': 'Desenvolvimento Web',
    'services.items.web.description': 'Websites e aplicações web modernas, responsivas e de alta performance',
    'services.items.mobile.title': 'Apps Mobile',
    'services.items.mobile.description': 'Aplicações nativas e híbridas para iOS e Android',
    'services.items.consulting.title': 'Consultoria Digital',
    'services.items.consulting.description': 'Estratégias personalizadas para transformação digital',
    'services.items.transformation.title': 'Transformação Digital',
    'services.items.transformation.description': 'Modernização de processos e infraestrutura tecnológica',
    'services.items.cloud.title': 'Cloud Computing',
    'services.items.cloud.description': 'Migração e gestão de ambientes cloud seguros e escaláveis',
    'services.items.api.title': 'Integrações API',
    'services.items.api.description': 'Desenvolvimento de APIs RESTful e integrações de sistemas',
    'services.items.support.title': 'Suporte 24/7',
    'services.items.support.description': 'Assistência técnica contínua e manutenção de sistemas',
    'services.items.design.title': 'UI/UX Design',
    'services.items.design.description': 'Design de interfaces intuitivas e experiências memoráveis',
    
    // Projects
    'projects.tag': '<Projects />',
    'projects.title': 'Nossos',
    'projects.titleHighlight': 'Projetos',
    'projects.description': 'Casos de sucesso que transformaram negócios e criaram impacto real',
    
    // Solutions
    'solutions.tag': '<Solutions />',
    'solutions.title': 'Soluções por',
    'solutions.titleHighlight': 'Setor',
    'solutions.description': 'Experiência comprovada em diversos setores de mercado',
    'solutions.items.startups.title': 'Startups & Inovação',
    'solutions.items.startups.description': 'Soluções ágeis para empresas em crescimento rápido',
    'solutions.items.sme.title': 'PME & Empresas',
    'solutions.items.sme.description': 'Sistemas robustos para operações empresariais',
    'solutions.items.public.title': 'Setor Público',
    'solutions.items.public.description': 'Plataformas digitais para administração pública',
    'solutions.items.ecommerce.title': 'E-commerce',
    'solutions.items.ecommerce.description': 'Lojas online completas com gestão integrada',
    'solutions.items.education.title': 'Educação',
    'solutions.items.education.description': 'Plataformas de e-learning e gestão académica',
    'solutions.items.finance.title': 'Fintech',
    'solutions.items.finance.description': 'Soluções financeiras seguras e conformes',
    
    // Blog
    'blog.tag': '<Blog />',
    'blog.title': 'Nosso',
    'blog.titleHighlight': 'Blog',
    'blog.description': 'Insights, tendências e novidades sobre tecnologia e inovação',
    'blog.readMore': 'Ler mais',
    'blog.viewAll': 'Ver Todos os Artigos',
    
    // Contact
    'contact.tag': '<Contact />',
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
    
    // Hero
    'hero.badge': 'Digital Transformation in CPLP',
    'hero.title': 'Technological Innovation',
    'hero.subtitle': 'Connecting businesses through technology',
    'hero.cta.primary': 'Learn More',
    'hero.cta.secondary': 'Get in Touch',
    'hero.stats.countries': 'CPLP Countries',
    'hero.stats.million': 'Million',
    'hero.stats.people': 'people',
    'hero.stats.continents': 'Continents',
    'hero.scroll': 'Scroll to explore',
    
    // About
    'about.tag': '<About />',
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
    'services.tag': '<Services />',
    'services.title': 'Our',
    'services.titleHighlight': 'Services',
    'services.description': 'Complete and customized technology solutions to boost your business',
    'services.items.web.title': 'Web Development',
    'services.items.web.description': 'Modern, responsive, and high-performance websites and web applications',
    'services.items.mobile.title': 'Mobile Apps',
    'services.items.mobile.description': 'Native and hybrid applications for iOS and Android',
    'services.items.consulting.title': 'Digital Consulting',
    'services.items.consulting.description': 'Customized strategies for digital transformation',
    'services.items.transformation.title': 'Digital Transformation',
    'services.items.transformation.description': 'Modernization of processes and technological infrastructure',
    'services.items.cloud.title': 'Cloud Computing',
    'services.items.cloud.description': 'Migration and management of secure and scalable cloud environments',
    'services.items.api.title': 'API Integrations',
    'services.items.api.description': 'Development of RESTful APIs and system integrations',
    'services.items.support.title': '24/7 Support',
    'services.items.support.description': 'Continuous technical assistance and system maintenance',
    'services.items.design.title': 'UI/UX Design',
    'services.items.design.description': 'Intuitive interface design and memorable experiences',
    
    // Projects
    'projects.tag': '<Projects />',
    'projects.title': 'Our',
    'projects.titleHighlight': 'Projects',
    'projects.description': 'Success stories that transformed businesses and created real impact',
    
    // Solutions
    'solutions.tag': '<Solutions />',
    'solutions.title': 'Solutions by',
    'solutions.titleHighlight': 'Sector',
    'solutions.description': 'Proven experience across various market sectors',
    'solutions.items.startups.title': 'Startups & Innovation',
    'solutions.items.startups.description': 'Agile solutions for fast-growing companies',
    'solutions.items.sme.title': 'SME & Enterprises',
    'solutions.items.sme.description': 'Robust systems for business operations',
    'solutions.items.public.title': 'Public Sector',
    'solutions.items.public.description': 'Digital platforms for public administration',
    'solutions.items.ecommerce.title': 'E-commerce',
    'solutions.items.ecommerce.description': 'Complete online stores with integrated management',
    'solutions.items.education.title': 'Education',
    'solutions.items.education.description': 'E-learning platforms and academic management',
    'solutions.items.finance.title': 'Fintech',
    'solutions.items.finance.description': 'Secure and compliant financial solutions',
    
    // Blog
    'blog.tag': '<Blog />',
    'blog.title': 'Our',
    'blog.titleHighlight': 'Blog',
    'blog.description': 'Insights, trends, and news about technology and innovation',
    'blog.readMore': 'Read more',
    'blog.viewAll': 'View All Articles',
    
    // Contact
    'contact.tag': '<Contact />',
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
