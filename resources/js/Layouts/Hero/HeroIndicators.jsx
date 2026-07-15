export default function HeroIndicators({
    slides,
    selected,
    onSelect,
}) {
    return (
        <div className="absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 gap-3">

            {slides.map((_, index) => (

                <button
                    key={index}
                    onClick={() => onSelect(index)}
                    className={`h-3 rounded-full transition-all duration-300 ${
                        selected === index
                            ? "w-10 bg-white"
                            : "w-3 bg-white/40"
                    }`}
                />

            ))}

        </div>
    );
}