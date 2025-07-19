'use client';
import Image from 'next/image';
import Link from 'next/link';

const WhatsAppButton = () => {
    const phoneNumber = '+351923382195'; // Your support WhatsApp number
    const message = encodeURIComponent("Olá Preciso de algumas de ajuda, com algumas questões com o meu consulado."); // Predefined message
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <Link
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 bg-[#52dd70] text-white p-2 rounded-full shadow-lg hover:bg-blue-500 transition-colors duration-300 z-50 flex items-center justify-center"
            title={"Deixe a sua mensagem ou duvida pelo whatsapp"}
        >
            <Image src={'/whatsapp.svg'} alt='whatsapp icon' height={20} width={30} />
        </Link>
    );
};

export default WhatsAppButton;