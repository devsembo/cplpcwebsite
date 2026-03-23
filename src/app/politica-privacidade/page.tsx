import React from 'react';

export default function PoliticaPrivacidade() {
  return (
    <div className="min-h-screen text-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <main className="bg-white/5 backdrop-blur-xl border border-cyan-400/20 rounded-2xl shadow-[0_0_40px_rgba(34,211,238,0.1)] px-6 sm:px-8 md:px-12 lg:px-16 py-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Política de Privacidade
          </h1>
          <p className="text-slate-400 mb-10 text-sm">
            <strong className="text-slate-300">Última atualização:</strong> 17 de maio de 2025
          </p>

          <div className="space-y-10 text-slate-300/80 leading-relaxed">
            <section id="introducao" className="space-y-3">
              <h2 className="text-xl font-semibold text-cyan-400">1. Introdução</h2>
              <p>A CPLP CONNECT (“nós”, “nosso” ou “nos”) está comprometida em proteger e respeitar a sua privacidade.</p>
              <p>Ao utilizar o nosso site{' '}
                <a href="https://cplpconnect.pt" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors">cplpconnect.pt</a>,
                você concorda com as práticas descritas nesta Política.
              </p>
            </section>

            <section id="dados-recolhemos" className="space-y-3">
              <h2 className="text-xl font-semibold text-cyan-400">2. Dados que recolhemos</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-white">Informações fornecidas:</strong> nome, email, telefone...</li>
                <li><strong className="text-white">Dados técnicos:</strong> endereço IP, navegador...</li>
                <li><strong className="text-white">Cookies:</strong> usados para melhorar sua experiência...</li>
              </ul>
            </section>

            <section id="finalidades" className="space-y-3">
              <h2 className="text-xl font-semibold text-cyan-400">3. Finalidades do tratamento dos dados</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Prestação de serviços de agendamento e suporte consular.</li>
                <li>Envio de notificações e comunicação.</li>
                <li>Gestão de conta e autenticação.</li>
                <li>Cumprimento legal e regulatório.</li>
                <li>Análise e melhoria de serviços.</li>
              </ul>
            </section>

            <section id="base-legal" className="space-y-3">
              <h2 className="text-xl font-semibold text-cyan-400">4. Base legal para o processamento</h2>
              <p>O processamento baseia-se em:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-white">Execução de contrato</strong></li>
                <li><strong className="text-white">Consentimento</strong></li>
                <li><strong className="text-white">Interesse legítimo</strong></li>
                <li><strong className="text-white">Cumprimento legal</strong></li>
              </ul>
            </section>

            <section id="compartilhamento" className="space-y-3">
              <h2 className="text-xl font-semibold text-cyan-400">5. Compartilhamento dos seus dados</h2>
              <p>Não vendemos os seus dados pessoais a terceiros. Podem ser partilhados com:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Consulados e entidades oficiais</li>
                <li>Prestadores de serviços técnicos</li>
                <li>Autoridades legais competentes</li>
              </ul>
            </section>

            <section id="cookies" className="space-y-3">
              <h2 className="text-xl font-semibold text-cyan-400">6. Cookies</h2>
              <p>Utilizamos cookies para melhorar a experiência e analisar uso do site. Pode gerir suas preferências no banner de cookies.</p>
            </section>

            <section id="direitos" className="space-y-3">
              <h2 className="text-xl font-semibold text-cyan-400">7. Direitos do titular dos dados</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Acesso, retificação e apagamento</li>
                <li>Limitação e oposição ao processamento</li>
                <li>Portabilidade e retirada de consentimento</li>
                <li>Reclamação à autoridade (CNPD)</li>
              </ul>
              <p>Para exercer os direitos, envie um email para:{' '}
                <a href="mailto:privacidade@cplpconnect.pt" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors">privacidade@cplpconnect.pt</a>
              </p>
            </section>

            <section id="seguranca" className="space-y-3">
              <h2 className="text-xl font-semibold text-cyan-400">8. Segurança dos dados</h2>
              <p>Adotamos medidas técnicas e organizacionais para proteger os seus dados contra acessos não autorizados.</p>
            </section>

            <section id="retencao" className="space-y-3">
              <h2 className="text-xl font-semibold text-cyan-400">9. Retenção dos dados</h2>
              <p>Os dados são mantidos apenas pelo tempo necessário para cumprir suas finalidades ou obrigações legais.</p>
            </section>

            <section id="alteracoes" className="space-y-3">
              <h2 className="text-xl font-semibold text-cyan-400">10. Alterações a esta Política</h2>
              <p>Esta política pode ser atualizada. Alterações serão comunicadas pelo site.</p>
            </section>

            <section id="contactos" className="space-y-3">
              <h2 className="text-xl font-semibold text-cyan-400">11. Contactos</h2>
              <p>Dúvidas ou solicitações sobre privacidade:</p>
              <p><strong className="text-white">Email:</strong>{' '}
                <a href="mailto:privacidade@cplpconnect.pt" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors">privacidade@cplpconnect.pt</a>
              </p>
              <p><strong className="text-white">Morada:</strong> Avenida do Bessa 130C, 4100-012 Porto, Portugal</p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
