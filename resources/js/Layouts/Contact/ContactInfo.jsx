import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Smartphone
} from "lucide-react";

import { motion } from "framer-motion";

export default function ContactInfo() {
    return (
        <div className="space-y-8">

            <div>

                <h3 className="text-2xl font-semibold">
                    Contact Information
                </h3>

                <p className="mt-3 text-slate-600">
                    We'd love to hear from you.
                </p>

            </div>

            <div className="space-y-6">

                <div className="flex gap-4">

                    <MapPin className="text-primary-600"/>

                    <span>
                        11 Adepegba Street,
                        Abule Egba, Lagos
                    </span>

                </div>

                <div className="flex gap-4">

                    <Phone className="text-primary-600"/>

                    <span>
                        +234 812 930 3840
                    </span>

                </div>
                <motion.div whileHover={{ scale: 1.05 }} className="items-center gap-3 flex hover:cursor-pointer">
          <Smartphone className="text-primary-600" size={32} />
          <h2 className="font-bold uppercase">WhatsApp</h2>
          <p>Mon–Fri 9AM–5PM</p>
          <a href="https://wa.me/2348129303840" target="_blank" className="underline font-semibold">Message Us</a>
        </motion.div>

                <div className="flex gap-4">

                    <Mail className="text-primary-600"/>

                    <span>
                        info@smartmirah.com
                    </span>

                </div>

                <div className="flex gap-4">

                    <Clock className="text-primary-600"/>

                    <span>
                        Mon - Fri (8am - 6pm)
                    </span>

                </div>

            </div>

        </div>
    );
}