import { FaWhatsapp } from "react-icons/fa";

const WhatsAppPopup = () => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border border-green-100 shadow-xl text-center max-w-md w-full">
  <p className="text-gray-700 text-base mb-3 leading-relaxed">
    📚 <span className="font-semibold">Need more details about this college ?</span>
    <br />
    📲 <span className="font-medium">Join our official WhatsApp group</span> for expert guidance and the latest updates!
  </p>
  <div className="mt-4 flex justify-center">
    <a
      href="https://whatsapp.com/channel/0029VbADrN54IBh95nFJiR3e"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2.5 rounded-full shadow-md transition-all"
    >
      <FaWhatsapp size={20} />
      Join WhatsApp
    </a>
  </div>
</div>

  </div>
);

export default WhatsAppPopup;
