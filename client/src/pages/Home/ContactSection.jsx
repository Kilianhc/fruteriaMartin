import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaClock } from 'react-icons/fa';

export default function ContactSection() {
  return (
    <section className="bg-[#bd0003] text-white py-12 px-6 text-center">
      <h2 className="text-3xl font-bold mb-8">Contáctanos</h2>

      <div className="space-y-6 max-w-xl mx-auto text-center">
        <p className="flex justify-center items-start gap-3">
          <FaMapMarkerAlt className="text-xl" />
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
        <a
          href="https://wa.me/34612345678"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center gap-3 text-green-400 hover:underline"
        >
          <FaWhatsapp className="text-xl" />
          Escríbenos por WhatsApp
        </a>
      </div>
    </section>
  );
}
