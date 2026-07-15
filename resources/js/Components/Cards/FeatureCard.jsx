import Card from "@/Components/UI/Card";

export default function FeatureCard({
    icon: Icon,
    title,
    description,
}) {
    return (
        <Card className="group p-8">

            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white">

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