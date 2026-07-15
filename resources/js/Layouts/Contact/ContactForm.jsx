import Input from "@/Components/UI/Input";
import Button from "@/Components/UI/Button";

export default function ContactForm() {
    return (
        <form className="space-y-5">

            <Input
                label="Full Name"
                placeholder="John Doe"
            />

            <Input
                label="Company"
                placeholder="Hotel Name"
            />

            <Input
                type="email"
                label="Email"
                placeholder="example@email.com"
            />

            <Input
                label="Phone"
                placeholder="+234..."
            />

            <textarea
                rows="5"
                placeholder="How can we help?"
                className="w-full rounded-xl border border-slate-300 p-4 focus:border-primary-600 focus:outline-none"
            />

            <Button
                className="w-full"
                size="lg"
            >
                Send Message
            </Button>

        </form>
    );
}