'use client';
import { ArrowRight, Check, Code, Users, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import TrustedPartnersSection from '@/components/Partners';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20 md:py-32 ">
        <div className="absolute inset-0  bg-cover bg-center opacity-10"
          style={{
            backgroundImage: "url('/web.jpeg')", // substitui com o caminho real da imagem
          }}></div>
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Soluções de Software Institucionais para a Comunidade CPLP
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 animate-slide-up">
              Transformando a governança digital com tecnologia inovadora e soluções personalizadas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button className="bg-blue-950 hover:bg-blue-500 text-white">
                Nossos Serviços
              </Button>
              <Button className="border-white text-white hover:bg-white/10 hover:cursor-pointer">
                Saber Mais
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <TrustedPartnersSection />

      {/* Services Section */}
      <section className="py-20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Nossos Serviços</h2>
            <p className="text-gray-600">
              Fornecemos soluções tecnológicas abrangentes para instituições governamentais e organizações da comunidade CPLP.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {/* Service 1 */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow max-w-sm">
              <CardContent className="p-6">
                <div className="h-14 w-14 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center mb-5">
                  <Code className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Software Governamental</h3>
                <p className="text-gray-600 mb-4">
                  Desenvolvimento de sistemas institucionais personalizados para entidades governamentais.
                </p>
                <Link href="/servicos" className="text-blue-600 font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                  Saber mais <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Service 2 */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow max-w-sm">
              <CardContent className="p-6">
                <div className="h-14 w-14 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center mb-5">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Serviços para AIMA</h3>
                <p className="text-gray-600 mb-4">
                  Suporte especializado e soluções para a Agência para a Integração, Migrações e Asilo.
                </p>
                <Link href="/servicos" className="text-blue-600 font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                  Saber mais <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Service 3 */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow max-w-sm">
              <CardContent className="p-6">
                <div className="h-14 w-14 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center mb-5">
                  <Settings className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Consultoria Tecnológica</h3>
                <p className="text-gray-600 mb-4">
                  Assessoria estratégica para modernização digital de serviços públicos.
                </p>
                <Link href="/servicos" className="text-blue-600 font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                  Saber mais <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/servicos">Ver Todos os Serviços</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-lg mx-auto lg:mx-0">
              <h2 className="text-3xl font-bold mb-6">Quem Somos</h2>
              <p className="text-gray-600 mb-6">
                A CPLP Connect é uma software house especializada em desenvolver soluções tecnológicas para instituições governamentais e organizações da Comunidade dos Países de Língua Portuguesa.
              </p>
              <p className="text-gray-600 mb-6">
                Nossa missão é facilitar a transformação digital dos serviços públicos, promovendo eficiência, transparência e melhor atendimento aos cidadãos.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Equipe com mais de 5 anos de experiência em desenvolvimento de software</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Parceiros oficiais de instituições governamentais em diversos países CPLP</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Soluções tecnológicas adaptadas às necessidades específicas de cada país</span>
                </li>
              </ul>
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="/sobre">Conhecer a Nossa História</Link>
              </Button>
            </div>

            <div className="relative max-w-lg mx-auto lg:mx-0">
              <div className="absolute -left-4 -top-4 w-24 h-24 bg-green-500/20 rounded-lg"></div>
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-600/20 rounded-lg"></div>
              <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80"
                  alt="CPLP Connect Team"
                  width={500}
                  height={400}
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-blue-950 text-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Pronto para transformar a sua Empresa, Instituição ou negócio?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Entre em contacto connosco para uma consulta personalizada e descubra como podemos ajudar a sua instituição a se modernizar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button className="bg-white text-blue-700 hover:bg-gray-100">
                <Link href="/contacto">Contacte-nos</Link>
              </Button>
              <Button variant="default" className="border-white text-white hover:bg-white/10">
                <Link href="/servicos">Explorar Serviços</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}