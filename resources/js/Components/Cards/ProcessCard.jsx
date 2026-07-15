import Card from "@/Components/UI/Card";

export default function ProcessCard({
    icon: Icon,
    title,
    description,
    number,
}) {
    return (
        <Card className="relative p-8 text-center">

            <span className="absolute right-6 top-6 text-5xl font-black text-slate-100">
                {number}
            </span>

            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-600 text-white">
                <Icon size={30} />
            </div>

            <h3 className="mb-4 text-xl font-semibold">
                {title}
            </h3>

            <p className="leading-7 text-slate-600">
                {description}
            </p>

        </Card>
    );
}