import Badge from "./Badge";
import Heading from "./Heading";

export default function SectionTitle({
    badge,
    title,
    description,
    align = "center",
}) {
    const alignment = {
        left: "text-left items-start",
        center: "text-center items-center",
    };

    return (
        <div
            className={`flex flex-col gap-5 mb-14 ${alignment[align]}`}
        >
            {badge && (
                <Badge>
                    {badge}
                </Badge>
            )}

            <Heading>
                {title}
            </Heading>

            {description && (
                <p className="max-w-2xl text-slate-600 leading-8">
                    {description}
                </p>
            )}
        </div>
    );
}