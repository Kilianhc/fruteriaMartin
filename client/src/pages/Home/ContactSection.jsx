import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaClock } from 'react-icons/fa';

export default function ContactSection() {
  return (
    <section className="bg-gray-100" >
      <div className="bg-[#bd0003] text-white py-12 px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">Contáctanos</h2>

        <div className="space-y-6 max-w-xl mx-auto text-center">
          <p className="flex justify-center items-start gap-3">
            <FaMapMarkerAlt className="text-xl mt-1" />
            C/ Galicia, 24, 35006, Mercado Central de Las Palmas de Gran Canaria
          </p>
          <p className="flex justify-center items-center gap-3">
            <FaPhoneAlt className="text-xl" />
            +34 612 345 678
          </p>
          <p className="flex justify-center items-center gap-3">
            <FaEnvelope className="text-xl" />
            contacto@fruteriamartin.com
          </p>
          <p className="flex justify-center items-center gap-3">
            <FaClock className="text-xl" />
            Lunes a Sábado: 8:00 - 14:00
          </p>
        </div>
      </div>
      <a href="https://wa.me/34612345678" target="_blank" rel="noopener noreferrer"
        className="flex justify-center pt-20 pb-20 items-center gap-3 text-[#009929] text-2xl font-bold hover:cursor"
      >
        <FaWhatsapp className="text-5xl font-bold" />
        Escríbenos por WhatsApp
      </a>
    </section>
  );
}
