'use client';
import { ArrowRight, Check, Code, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('/web.jpeg')" }}
        ></div>
        <div className="relative z-10 text-center max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Soluções de Software Institucionais para a Comunidade CPLP
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-10">
            Transformamos a governação digital com tecnologia moderna e soluções personalizadas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild className="bg-brand-blue hover:bg-brand-blue-600 text-white w-full sm:w-auto">
              <Link href="/servicos">Ver Serviços</Link>
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
              <Link href="/contacto">Falar com a Equipa</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 sm:py-20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Nossos Serviços</h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Fornecemos soluções tecnológicas abrangentes para instituições governamentais e organizações da comunidade CPLP.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
            {/* Service 1 */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow w-full max-w-sm">
              <CardContent className="p-6">
                <div className="h-14 w-14 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center mb-5">
                  <Code className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Software Governamental</h3>
                <p className="text-gray-600 mb-4">
                  Desenvolvimento de sistemas institucionais personalizados para entidades governamentais.
                </p>
                <Link
                  href="/servicos"
                  className="text-blue-600 font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
                >
                  Saber mais <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Service 2 */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow w-full max-w-sm">
              <CardContent className="p-6">
                <div className="h-14 w-14 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center mb-5">
                  <Settings className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Consultoria Tecnológica</h3>
                <p className="text-gray-600 mb-4">
                  Assessoria estratégica para modernização digital de serviços públicos.
                </p>
                <Link
                  href="/servicos"
                  className="text-blue-600 font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
                >
                  Saber mais <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-10">
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
              <Link href="/servicos">Ver Todos os Serviços</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Quem Somos</h2>
              <p className="text-gray-700 mb-6">
                A CPLP CONNECT desenvolve soluções tecnológicas para instituições e organizações da Comunidade dos Países de Língua Portuguesa (CPLP).
              </p>
              <p className="text-gray-700 mb-6">
                A nossa missão é apoiar a modernização dos serviços públicos, promovendo eficiência, transparência e melhor atendimento aos cidadãos.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>Equipa com experiência em projetos institucionais e governamentais</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>Projetos com conformidade, acessibilidade e segurança por padrão</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>Soluções adaptadas ao contexto cultural e regulatório da CPLP</span>
                </li>
              </ul>
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                <Link href="/sobre">Conhecer a Nossa História</Link>
              </Button>
            </div>

            <div className="relative">
              <div className="absolute -left-4 -top-4 w-20 h-20 bg-green-500/20 rounded-lg"></div>
              <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-blue-600/20 rounded-lg"></div>
              <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80"
                  alt="CPLP Connect Team"
                  width={500}
                  height={400}
                  className="w-full h-64 sm:h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-gray-900 to-blue-950 text-white text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Pronto para transformar a sua Empresa, Instituição ou negócio?
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-8">
            Entre em contacto connosco para uma consulta personalizada e descubra como podemos ajudar a sua instituição a se modernizar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="bg-white text-blue-700 hover:bg-gray-100 w-full sm:w-auto">
              <Link href="/contacto">Contacte-nos</Link>
            </Button>
            <Button variant="default" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
              <Link href="/servicos">Explorar Serviços</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
