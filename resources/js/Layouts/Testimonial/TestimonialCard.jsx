import { Quote } from "lucide-react";

export default function TestimonialCard({ name, company, message }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg">
            <Quote className="mb-4 text-primary-200" size={40} />

            <p className="leading-8 text-slate-600">&ldquo;{message}&rdquo;</p>

            <div className="mt-8 border-t border-slate-100 pt-6">
                <p className="font-semibold text-slate-900">{name}</p>
                <p className="mt-1 text-sm text-slate-500">{company}</p>
            </div>
        </div>
    );
}
