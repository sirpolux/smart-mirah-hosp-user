import {
    MapPin,
    Phone,
    Mail,
    Clock,
} from "lucide-react";

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
                        +234 814 323 0391
                    </span>

                </div>

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