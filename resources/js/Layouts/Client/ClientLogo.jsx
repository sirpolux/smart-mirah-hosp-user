export default function ClientLogo({ logo, name }) {
    return (
        <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-white p-8 transition duration-300 hover:border-primary-500 hover:shadow-lg">
            <img
                src={logo}
                alt={name}
                className="h-20 w-auto object-contain grayscale transition duration-300 hover:grayscale-0"
            />
        </div>
    );
}