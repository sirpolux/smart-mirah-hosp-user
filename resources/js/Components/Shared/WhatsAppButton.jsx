import { FaWhatsapp } from "react-icons/fa6";

const WHATSAPP_URL = "https://wa.me/2348129303840";

export default function WhatsAppButton() {
    return (
        <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="group fixed bottom-6 right-6 z-50 flex items-center gap-3"
        >
            <span className="pointer-events-none hidden translate-x-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-lg transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 md:block">
                Chat with us on WhatsApp
            </span>

            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-500/30 transition-transform duration-200 group-hover:scale-110">
                <FaWhatsapp size={28} />
            </span>
        </a>
    );
}
