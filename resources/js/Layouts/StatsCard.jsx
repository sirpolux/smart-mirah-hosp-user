import CountUp from "react-countup";
import Card from "@/Components/UI/Card";

export default function StatCard({
    value,
    suffix,
    label,
    icon: Icon,
}) {
    return (
        <Card className="p-8 text-center">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
                <Icon size={30} />
            </div>

            <h3 className="text-4xl font-bold text-slate-900">

                <CountUp
                    end={value}
                    duration={2}
                />

                {suffix}

            </h3>

            <p className="mt-3 text-slate-600">
                {label}
            </p>

        </Card>
    );
}