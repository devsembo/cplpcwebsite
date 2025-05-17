'use client';

import React, { useState } from 'react';


export default function PoliticaPrivacidade() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Menu Button */}


        {/* Main Content */}
        <main className="bg-white rounded-xl shadow-lg px-6 sm:px-8 md:px-12 lg:px-16 py-10 max-w-full">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Política de Privacidade - CPLP CONNECT
          </h1>
          <p className="text-gray-600 mb-10 text-sm">
            <strong>Última atualização:</strong> 17 de maio de 2025
          </p>

          {/* Seções da Política */}
          <div className="space-y-12">
            <section id="introducao" className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">1. Introdução</h2>
              <p>
                A CPLP CONNECT (“nós”, “nosso” ou “nos”) está comprometida em proteger e respeitar a sua privacidade...
              </p>
              <p>
                Ao utilizar o nosso site{' '}
                <a
                  href="https://cplpconnect.pt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                 cplpconnect.pt
                </a>, você concorda com as práticas descritas nesta Política.
              </p>
            </section>

            <section id="dados-recolhemos" className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">2. Dados que recolhemos</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Informações fornecidas:</strong> nome, email, telefone...</li>
                <li><strong>Dados técnicos:</strong> endereço IP, navegador...</li>
                <li><strong>Cookies:</strong> usados para melhorar sua experiência...</li>
              </ul>
            </section>

            <section id="finalidades" className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">3. Finalidades do tratamento dos dados</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Prestação de serviços de agendamento e suporte consular.</li>
                <li>Envio de notificações e comunicação.</li>
                <li>Gestão de conta e autenticação.</li>
                <li>Cumprimento legal e regulatório.</li>
                <li>Análise e melhoria de serviços.</li>
              </ul>
            </section>

            <section id="base-legal" className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">4. Base legal para o processamento</h2>
              <p>O processamento baseia-se em:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Execução de contrato</strong></li>
                <li><strong>Consentimento</strong></li>
                <li><strong>Interesse legítimo</strong></li>
                <li><strong>Cumprimento legal</strong></li>
              </ul>
            </section>

            <section id="compartilhamento" className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">5. Compartilhamento dos seus dados</h2>
              <p>Não vendemos os seus dados pessoais a terceiros. Podem ser partilhados com:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Consulados e entidades oficiais</li>
                <li>Prestadores de serviços técnicos</li>
                <li>Autoridades legais competentes</li>
              </ul>
            </section>

            <section id="cookies" className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">6. Cookies</h2>
              <p>
                Utilizamos cookies para melhorar a experiência e analisar uso do site. Pode gerir suas preferências no banner de cookies.
              </p>
            </section>

            <section id="direitos" className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">7. Direitos do titular dos dados</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Acesso, retificação e apagamento</li>
                <li>Limitação e oposição ao processamento</li>
                <li>Portabilidade e retirada de consentimento</li>
                <li>Reclamação à autoridade (CNPD)</li>
              </ul>
              <p>
                Para exercer os direitos, envie um email para:{' '}
                <a
                  href="mailto:privacidade@cplpconnect.pt"
                  className="text-blue-600 hover:underline"
                >
                  privacidade@cplpconnect.pt
                </a>
              </p>
            </section>

            <section id="seguranca" className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">8. Segurança dos dados</h2>
              <p>
                Adotamos medidas técnicas e organizacionais para proteger os seus dados contra acessos não autorizados.
              </p>
            </section>

            <section id="retencao" className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">9. Retenção dos dados</h2>
              <p>
                Os dados são mantidos apenas pelo tempo necessário para cumprir suas finalidades ou obrigações legais.
              </p>
            </section>

            <section id="alteracoes" className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">10. Alterações a esta Política</h2>
              <p>
                Esta política pode ser atualizada. Alterações serão comunicadas pelo site.
              </p>
            </section>

            <section id="contactos" className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">11. Contactos</h2>
              <p>Dúvidas ou solicitações sobre privacidade:</p>
              <p>
                <strong>Email:</strong>{' '}
                <a
                  href="mailto:privacidade@cplpconnect.pt"
                  className="text-blue-600 hover:underline"
                >
                  privacidade@cplpconnect.pt
                </a>
              </p>
              <p><strong>Morada:</strong> Avenida do Bessa 130C, 4100-012 Porto, Portugal</p>
            </section>
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
