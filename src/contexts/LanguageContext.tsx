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
    'nav.careers': 'Carreiras',
    'nav.contact': 'Contacto',
    'nav.cta': 'Fale Connosco',
    'nav.quote': 'Solicitar Orçamento',
    'nav.company': 'Empresa',
    'nav.resources': 'Recursos',
    'nav.faqs': 'Perguntas Frequentes',
    'nav.viewAllServices': 'Ver todos os serviços',
    'nav.services.blurb': 'Soluções à medida para cada etapa da transformação digital da sua empresa.',
    'nav.company.blurb': 'Quem somos, o que já entregámos e como pode juntar-se à equipa.',
    'nav.resources.blurb': 'Artigos, novidades e respostas às perguntas mais comuns.',
    'nav.about.description': 'Missão, valores e a nossa história',
    'nav.projects.description': 'Plataformas que já entregámos',
    'nav.careers.description': 'Vagas e oportunidades na equipa',
    'nav.blog.description': 'Notícias e artigos da CPLP CONNECT',
    'nav.faqs.description': 'Respostas às dúvidas mais comuns',

    // Hero
    'hero.badge': 'Tecnologia à Medida para Empresas, Instituições e Banca',
    'hero.title': 'Soluções digitais para o seu negócio',
    'hero.subtitle': 'Desenvolvemos sites institucionais, aplicações móveis, plataformas web e soluções financeiras para bancos — com o mesmo rigor técnico em cada projeto, em Portugal, Angola e no espaço CPLP.',
    'hero.cta.primary': 'Pedir uma proposta',
    'hero.cta.secondary': 'Ver os nossos serviços',
    'hero.stats.countries': 'Países CPLP',
    'hero.stats.million': 'Milhões',
    'hero.stats.people': 'de pessoas',
    'hero.stats.continents': 'Continentes',
    'hero.stats.projectsDelivered': 'Projetos entregues',
    'hero.stats.businessUnits': 'Unidades de negócio',
    'hero.stats.headquarters': 'Portugal',
    'hero.scroll': 'Rolar para explorar',
    'hero.float.web.title': 'Sites & Plataformas',
    'hero.float.web.metric': 'Design responsivo',
    'hero.float.mobile.title': 'Apps Mobile',
    'hero.float.mobile.metric': 'iOS & Android',
    'hero.float.banking.title': 'Core Banking & Fintech',
    'hero.float.banking.metric': 'Pagamentos seguros',

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
    'services.items.banking.title': 'Core Banking & Soluções Financeiras',
    'services.items.banking.description': 'Plataformas de core banking, pagamentos e mobile banking desenhadas para bancos e instituições financeiras que operam em Angola e no espaço CPLP.',
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
    'sectors.items.banking.description': 'Core banking, mobile banking e plataformas de pagamento para bancos e instituições financeiras em Angola e no espaço CPLP.',
    'sectors.items.public.title': 'Setor Público',
    'sectors.items.public.description': 'Sistemas e portais digitais para administração pública e organismos institucionais.',
    'sectors.items.education.title': 'Educação',
    'sectors.items.education.description': 'Plataformas de gestão académica e programas de formação corporativa.',
    'sectors.items.sme.title': 'PME & Grupos Empresariais',
    'sectors.items.sme.description': 'Sistemas à medida para operações empresariais em crescimento ou expansão internacional.',

    // Partners
    'partners.tag': 'Ecossistema',
    'partners.title': 'Empresas e instituições parceiras',
    'partners.description': 'Organizações com quem já colaborámos ou construímos algo em conjunto, em Portugal e em Angola.',

    // Methodology
    'methodology.tag': 'Como Trabalhamos',
    'methodology.title': 'Da ideia à entrega, sem surpresas',
    'methodology.steps.diagnosis.title': 'Diagnóstico',
    'methodology.steps.diagnosis.description': 'Levantamento dos processos, sistemas existentes e objetivos de negócio da sua empresa ou instituição.',
    'methodology.steps.architecture.title': 'Arquitetura & Integração',
    'methodology.steps.architecture.description': 'Desenho da solução e das integrações necessárias com os sistemas já existentes — core bancário, ERPs ou outras APIs.',
    'methodology.steps.delivery.title': 'Desenvolvimento & Entrega',
    'methodology.steps.delivery.description': 'Construção iterativa, com entregas frequentes e validação contínua junto da equipa do cliente.',
    'methodology.steps.support.title': 'Suporte Contínuo',
    'methodology.steps.support.description': 'Acompanhamento após o lançamento, com manutenção, monitorização e evolução da solução.',

    // Why Us
    'whyus.tag': 'Porquê a CPLP CONNECT',
    'whyus.title': 'Construído para o espaço CPLP',
    'whyus.items.local.title': 'Presença local',
    'whyus.items.local.description': 'Equipas em Portugal e Angola, com conhecimento direto dos mercados e da regulação de cada país.',
    'whyus.items.security.title': 'Segurança em cada entrega',
    'whyus.items.security.description': 'Boas práticas de segurança, encriptação de dados e ambientes isolados de desenvolvimento, testes e produção.',
    'whyus.items.scalable.title': 'Tecnologia moderna e escalável',
    'whyus.items.scalable.description': 'Arquiteturas cloud-ready, preparadas para crescer junto com o negócio dos nossos clientes.',
    'whyus.items.agile.title': 'Entrega ágil e transparente',
    'whyus.items.agile.description': 'Ciclos curtos de entrega, com visibilidade total sobre o progresso de cada projeto.',
    'whyus.items.academy.title': 'Capacitação das equipas',
    'whyus.items.academy.description': 'Através da CPLP CONNECT Academy, deixamos as equipas dos nossos clientes preparadas para o futuro.',

    // Tech stack
    'techstack.tag': 'Tecnologia',
    'techstack.title': 'Tecnologia que usamos',

    // Latest blog (homepage)
    'homeblog.tag': 'Blog',
    'homeblog.title': 'Últimas do blog',
    'homeblog.cta': 'Ver todos os artigos',

    // Service detail pages
    'servicedetail.tag': 'Serviço',
    'servicedetail.features.title': 'O que inclui',
    'servicedetail.process.tag': 'Como Trabalhamos',
    'servicedetail.process.title': 'Como entregamos este serviço',
    'servicedetail.related.tag': 'Explorar mais',
    'servicedetail.related.title': 'Outros serviços',
    'servicedetail.cta.title': 'Vamos falar sobre o seu projeto?',
    'servicedetail.cta.description': 'Conte-nos os objetivos da sua empresa ou instituição e preparamos uma proposta à medida.',
    'servicedetail.cta.button': 'Peça uma proposta',
    'servicedetail.back': 'Voltar a todos os serviços',

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

    // Academy
    'academy.hero.title': 'Formação corporativa com ADN tecnológico',
    'academy.hero.subtitle': 'Corporate Training · Executive Education · Digital Transformation — programas desenhados para empresas de Portugal, Angola e restante CPLP.',
    'academy.hero.cta': 'Fale connosco sobre um programa à medida',

    'academy.formatos.tag': 'Como formamos',
    'academy.formatos.title': 'Quatro formatos',
    'academy.formatos.incompany.title': 'In-Company Angola',
    'academy.formatos.incompany.description': 'Formação ministrada nas instalações do cliente em Angola, adaptada à realidade e aos processos internos da empresa.',
    'academy.formatos.executive.title': 'Executive Program Portugal',
    'academy.formatos.executive.description': 'Imersões executivas no Porto e em Lisboa, com formato intensivo para equipas de liderança e gestão.',
    'academy.formatos.online.title': 'Online & Híbrido',
    'academy.formatos.online.description': 'Sessões ao vivo combinadas com uma plataforma digital de aprendizagem, para equipas distribuídas geograficamente.',
    'academy.formatos.exchange.title': 'Corporate Exchange',
    'academy.formatos.exchange.description': 'Programas de intercâmbio de equipas entre Portugal e Angola, promovendo partilha de conhecimento entre mercados.',

    'academy.areas.tag': 'Currículo',
    'academy.areas.title': 'Áreas de formação',
    'academy.areas.leadership': 'Liderança & Gestão',
    'academy.areas.digital': 'Transformação Digital',
    'academy.areas.data': 'Dados & IA',
    'academy.areas.cyber': 'Cibersegurança',
    'academy.areas.projects': 'Gestão de Projetos',
    'academy.areas.sales': 'Vendas & Negociação',
    'academy.areas.finance': 'Finanças para não-financeiros',
    'academy.areas.compliance': 'Compliance & Risco',

    'academy.how.tag': 'Metodologia',
    'academy.how.title': 'Como funciona',
    'academy.how.diagnosis.title': 'Diagnóstico',
    'academy.how.diagnosis.description': 'Levantamento das necessidades de formação e dos objetivos da empresa.',
    'academy.how.design.title': 'Desenho do Programa',
    'academy.how.design.description': 'Construção de um programa formativo à medida, com os formatos e áreas certas.',
    'academy.how.training.title': 'Formação',
    'academy.how.training.description': 'Execução do programa, em regime presencial, online ou híbrido.',
    'academy.how.evaluation.title': 'Avaliação',
    'academy.how.evaluation.description': 'Avaliação de conhecimentos e resultados de aprendizagem dos participantes.',
    'academy.how.certificate.title': 'Certificado',
    'academy.how.certificate.description': 'Emissão de certificado com código único e verificação online por QR.',

    'academy.cta.title': 'Fale connosco sobre um programa à medida',
    'academy.cta.description': 'Diga-nos os objetivos da sua empresa e desenhamos um programa de formação adequado à sua equipa, mercado e orçamento.',
    'academy.cta.button': 'Contactar a Academy',
    'academy.cta.dgert': 'Entidade em processo de preparação para certificação DGERT.',

    // Careers
    'careers.hero.title': 'Carreiras',
    'careers.hero.description': 'Junte-se a uma equipa que constrói a transformação digital do espaço CPLP, entre Portugal, Angola e mais além.',

    'careers.why.tag': 'Cultura',
    'careers.why.title': 'Porque trabalhar connosco',
    'careers.why.impact.title': 'Impacto real',
    'careers.why.impact.description': 'Trabalha em projetos que transformam empresas e instituições em vários países do espaço CPLP.',
    'careers.why.growth.title': 'Crescimento contínuo',
    'careers.why.growth.description': 'Acesso a formação contínua através da CPLP CONNECT Academy e acompanhamento próximo da equipa.',
    'careers.why.team.title': 'Equipa multicultural',
    'careers.why.team.description': 'Colaboração diária entre Portugal, Angola e outros mercados da lusofonia.',
    'careers.why.flex.title': 'Flexibilidade',
    'careers.why.flex.description': 'Modelos de trabalho híbrido e remoto, adaptados à realidade de cada equipa.',

    'careers.benefits.tag': 'Benefícios',
    'careers.benefits.title': 'O que oferecemos',
    'careers.benefits.item1': 'Horário flexível e modelo de trabalho híbrido',
    'careers.benefits.item2': 'Acesso a formação através da CPLP CONNECT Academy',
    'careers.benefits.item3': 'Ambiente internacional, entre Portugal, Angola e a CPLP',
    'careers.benefits.item4': 'Participação em projetos tecnológicos de referência',
    'careers.benefits.item5': 'Equipa próxima, colaborativa e orientada a resultados',
    'careers.benefits.item6': 'Oportunidades reais de crescimento e progressão',

    'careers.form.tag': 'Candidatura Espontânea',
    'careers.form.title': 'Não há uma vaga aberta para si neste momento?',
    'careers.form.description': 'Envie-nos a sua candidatura. Guardamos o seu perfil e entraremos em contacto assim que surgir uma oportunidade alinhada com a sua experiência.',
    'careers.form.formTitle': 'Enviar Candidatura',
    'careers.form.name': 'Nome Completo *',
    'careers.form.namePlaceholder': 'O seu nome completo',
    'careers.form.email': 'Email *',
    'careers.form.emailPlaceholder': 'seu.email@exemplo.com',
    'careers.form.phone': 'Telefone',
    'careers.form.phonePlaceholder': '+351 000 000 000',
    'careers.form.area': 'Área de Interesse *',
    'careers.form.areaPlaceholder': 'Ex: Desenvolvimento, Design, Vendas, Academy...',
    'careers.form.cv': 'Link para CV / LinkedIn / Portefólio *',
    'careers.form.cvPlaceholder': 'https://...',
    'careers.form.message': 'Mensagem / Carta de Apresentação',
    'careers.form.messagePlaceholder': 'Conte-nos um pouco sobre si e o que procura...',
    'careers.form.consentPrefix': 'Li e aceito a',
    'careers.form.consentLink': 'Política de Privacidade',
    'careers.form.consentSuffix': 'e autorizo o tratamento dos meus dados para efeitos de recrutamento.',
    'careers.form.submit': 'Enviar Candidatura',
    'careers.form.submitting': 'A enviar...',
    'careers.form.consentError': 'Tem de aceitar a Política de Privacidade para enviar a candidatura.',
    'careers.form.successTitle': 'Candidatura enviada!',
    'careers.form.successDescription': 'Obrigado pelo interesse. A nossa equipa irá analisar o seu perfil.',
    'careers.form.errorDescription': 'Ocorreu um erro ao enviar a sua candidatura. Por favor, tente novamente mais tarde.',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.services': 'Services',
    'nav.projects': 'Projects',
    'nav.blog': 'Blog',
    'nav.careers': 'Careers',
    'nav.contact': 'Contact',
    'nav.cta': 'Contact Us',
    'nav.quote': 'Request a Quote',
    'nav.company': 'Company',
    'nav.resources': 'Resources',
    'nav.faqs': 'FAQs',
    'nav.viewAllServices': 'View all services',
    'nav.services.blurb': 'Tailored solutions for every stage of your company\'s digital transformation.',
    'nav.company.blurb': 'Who we are, what we\'ve delivered, and how to join the team.',
    'nav.resources.blurb': 'Articles, news and answers to the most common questions.',
    'nav.about.description': 'Mission, values and our story',
    'nav.projects.description': 'Platforms we\'ve already delivered',
    'nav.careers.description': 'Openings and opportunities on the team',
    'nav.blog.description': 'News and articles from CPLP CONNECT',
    'nav.faqs.description': 'Answers to the most common questions',

    // Hero
    'hero.badge': 'Tailored Technology for Businesses, Institutions and Banking',
    'hero.title': 'Digital solutions for your business',
    'hero.subtitle': 'We build institutional websites, mobile apps, web platforms and financial solutions for banks — with the same technical rigor on every project, across Portugal, Angola and the CPLP region.',
    'hero.cta.primary': 'Request a proposal',
    'hero.cta.secondary': 'See our services',
    'hero.stats.countries': 'CPLP Countries',
    'hero.stats.million': 'Million',
    'hero.stats.people': 'people',
    'hero.stats.continents': 'Continents',
    'hero.stats.projectsDelivered': 'Projects delivered',
    'hero.stats.businessUnits': 'Business units',
    'hero.stats.headquarters': 'Portugal',
    'hero.scroll': 'Scroll to explore',
    'hero.float.web.title': 'Websites & Platforms',
    'hero.float.web.metric': 'Responsive design',
    'hero.float.mobile.title': 'Mobile Apps',
    'hero.float.mobile.metric': 'iOS & Android',
    'hero.float.banking.title': 'Core Banking & Fintech',
    'hero.float.banking.metric': 'Secure payments',

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
    'services.items.banking.title': 'Core Banking & Financial Solutions',
    'services.items.banking.description': 'Core banking, payments and mobile banking platforms designed for banks and financial institutions operating in Angola and across the CPLP region.',
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
    'sectors.items.banking.description': 'Core banking, mobile banking and payment platforms for banks and financial institutions in Angola and across the CPLP region.',
    'sectors.items.public.title': 'Public Sector',
    'sectors.items.public.description': 'Digital systems and portals for public administration and institutional bodies.',
    'sectors.items.education.title': 'Education',
    'sectors.items.education.description': 'Academic management platforms and corporate training programs.',
    'sectors.items.sme.title': 'SMEs & Business Groups',
    'sectors.items.sme.description': 'Custom systems for business operations in growth or international expansion.',

    // Partners
    'partners.tag': 'Ecosystem',
    'partners.title': 'Partner companies & institutions',
    'partners.description': 'Organizations we\'ve worked with or built something alongside, in Portugal and Angola.',

    // Methodology
    'methodology.tag': 'How We Work',
    'methodology.title': 'From idea to delivery, no surprises',
    'methodology.steps.diagnosis.title': 'Diagnosis',
    'methodology.steps.diagnosis.description': 'Assessment of processes, existing systems and business goals of your company or institution.',
    'methodology.steps.architecture.title': 'Architecture & Integration',
    'methodology.steps.architecture.description': 'Solution design and the integrations needed with existing systems — core banking, ERPs or other APIs.',
    'methodology.steps.delivery.title': 'Development & Delivery',
    'methodology.steps.delivery.description': 'Iterative build, with frequent deliveries and continuous validation with the client team.',
    'methodology.steps.support.title': 'Ongoing Support',
    'methodology.steps.support.description': 'Follow-up after launch, with maintenance, monitoring and evolution of the solution.',

    // Why Us
    'whyus.tag': 'Why CPLP CONNECT',
    'whyus.title': 'Built for the CPLP region',
    'whyus.items.local.title': 'Local presence',
    'whyus.items.local.description': 'Teams in Portugal and Angola, with direct knowledge of each market and its regulation.',
    'whyus.items.security.title': 'Security in every delivery',
    'whyus.items.security.description': 'Security best practices, data encryption and isolated development, testing and production environments.',
    'whyus.items.scalable.title': 'Modern, scalable technology',
    'whyus.items.scalable.description': "Cloud-ready architectures, built to grow alongside our clients' business.",
    'whyus.items.agile.title': 'Agile, transparent delivery',
    'whyus.items.agile.description': "Short delivery cycles, with full visibility into every project's progress.",
    'whyus.items.academy.title': 'Team enablement',
    'whyus.items.academy.description': "Through CPLP CONNECT Academy, we leave our clients' teams ready for the future.",

    // Tech stack
    'techstack.tag': 'Technology',
    'techstack.title': 'Technology we use',

    // Latest blog (homepage)
    'homeblog.tag': 'Blog',
    'homeblog.title': 'Latest from the blog',
    'homeblog.cta': 'View all articles',

    // Service detail pages
    'servicedetail.tag': 'Service',
    'servicedetail.features.title': "What's included",
    'servicedetail.process.tag': 'How We Work',
    'servicedetail.process.title': 'How we deliver this service',
    'servicedetail.related.tag': 'Explore more',
    'servicedetail.related.title': 'Other services',
    'servicedetail.cta.title': "Let's talk about your project",
    'servicedetail.cta.description': 'Tell us your goals and we will prepare a proposal tailored to your company or institution.',
    'servicedetail.cta.button': 'Request a proposal',
    'servicedetail.back': 'Back to all services',

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

    // Academy
    'academy.hero.title': 'Corporate training with technology DNA',
    'academy.hero.subtitle': 'Corporate Training · Executive Education · Digital Transformation — programs designed for companies in Portugal, Angola and the wider CPLP.',
    'academy.hero.cta': 'Talk to us about a tailored program',

    'academy.formatos.tag': 'How we train',
    'academy.formatos.title': 'Four formats',
    'academy.formatos.incompany.title': 'In-Company Angola',
    'academy.formatos.incompany.description': 'Training delivered at the client\'s premises in Angola, adapted to the company\'s reality and internal processes.',
    'academy.formatos.executive.title': 'Executive Program Portugal',
    'academy.formatos.executive.description': 'Executive immersions in Porto and Lisbon, in an intensive format for leadership and management teams.',
    'academy.formatos.online.title': 'Online & Hybrid',
    'academy.formatos.online.description': 'Live sessions combined with a digital learning platform, for geographically distributed teams.',
    'academy.formatos.exchange.title': 'Corporate Exchange',
    'academy.formatos.exchange.description': 'Team exchange programs between Portugal and Angola, promoting knowledge sharing between markets.',

    'academy.areas.tag': 'Curriculum',
    'academy.areas.title': 'Training areas',
    'academy.areas.leadership': 'Leadership & Management',
    'academy.areas.digital': 'Digital Transformation',
    'academy.areas.data': 'Data & AI',
    'academy.areas.cyber': 'Cybersecurity',
    'academy.areas.projects': 'Project Management',
    'academy.areas.sales': 'Sales & Negotiation',
    'academy.areas.finance': 'Finance for non-financials',
    'academy.areas.compliance': 'Compliance & Risk',

    'academy.how.tag': 'Methodology',
    'academy.how.title': 'How it works',
    'academy.how.diagnosis.title': 'Diagnosis',
    'academy.how.diagnosis.description': 'Assessment of training needs and company objectives.',
    'academy.how.design.title': 'Program Design',
    'academy.how.design.description': 'Building a tailored training program, with the right formats and areas.',
    'academy.how.training.title': 'Training',
    'academy.how.training.description': 'Program delivery, in-person, online or hybrid.',
    'academy.how.evaluation.title': 'Evaluation',
    'academy.how.evaluation.description': 'Assessment of participants\' knowledge and learning outcomes.',
    'academy.how.certificate.title': 'Certificate',
    'academy.how.certificate.description': 'Issuance of a certificate with a unique code and online QR verification.',

    'academy.cta.title': 'Talk to us about a tailored program',
    'academy.cta.description': 'Tell us your company\'s goals and we\'ll design a training program suited to your team, market and budget.',
    'academy.cta.button': 'Contact the Academy',
    'academy.cta.dgert': 'Entity in the process of preparing for DGERT certification.',

    // Careers
    'careers.hero.title': 'Careers',
    'careers.hero.description': 'Join a team building digital transformation across the CPLP region, from Portugal to Angola and beyond.',

    'careers.why.tag': 'Culture',
    'careers.why.title': 'Why work with us',
    'careers.why.impact.title': 'Real impact',
    'careers.why.impact.description': 'Work on projects that transform companies and institutions across several CPLP countries.',
    'careers.why.growth.title': 'Continuous growth',
    'careers.why.growth.description': 'Access to continuous training through the CPLP CONNECT Academy and close team support.',
    'careers.why.team.title': 'Multicultural team',
    'careers.why.team.description': 'Daily collaboration between Portugal, Angola and other Lusophone markets.',
    'careers.why.flex.title': 'Flexibility',
    'careers.why.flex.description': 'Hybrid and remote work models, adapted to each team\'s reality.',

    'careers.benefits.tag': 'Benefits',
    'careers.benefits.title': 'What we offer',
    'careers.benefits.item1': 'Flexible hours and a hybrid work model',
    'careers.benefits.item2': 'Access to training through the CPLP CONNECT Academy',
    'careers.benefits.item3': 'International environment, across Portugal, Angola and the CPLP',
    'careers.benefits.item4': 'Involvement in landmark technology projects',
    'careers.benefits.item5': 'A close-knit, collaborative, results-driven team',
    'careers.benefits.item6': 'Real opportunities for growth and progression',

    'careers.form.tag': 'Open Application',
    'careers.form.title': 'No open role that fits you right now?',
    'careers.form.description': 'Send us your application. We\'ll keep your profile on file and get in touch as soon as an opportunity matching your experience comes up.',
    'careers.form.formTitle': 'Send Application',
    'careers.form.name': 'Full Name *',
    'careers.form.namePlaceholder': 'Your full name',
    'careers.form.email': 'Email *',
    'careers.form.emailPlaceholder': 'your.email@example.com',
    'careers.form.phone': 'Phone',
    'careers.form.phonePlaceholder': '+351 000 000 000',
    'careers.form.area': 'Area of Interest *',
    'careers.form.areaPlaceholder': 'E.g. Development, Design, Sales, Academy...',
    'careers.form.cv': 'Link to CV / LinkedIn / Portfolio *',
    'careers.form.cvPlaceholder': 'https://...',
    'careers.form.message': 'Message / Cover Letter',
    'careers.form.messagePlaceholder': 'Tell us a bit about yourself and what you\'re looking for...',
    'careers.form.consentPrefix': 'I have read and accept the',
    'careers.form.consentLink': 'Privacy Policy',
    'careers.form.consentSuffix': 'and authorize the processing of my data for recruitment purposes.',
    'careers.form.submit': 'Send Application',
    'careers.form.submitting': 'Sending...',
    'careers.form.consentError': 'You must accept the Privacy Policy to send your application.',
    'careers.form.successTitle': 'Application sent!',
    'careers.form.successDescription': 'Thanks for your interest. Our team will review your profile.',
    'careers.form.errorDescription': 'There was an error sending your application. Please try again later.',
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
