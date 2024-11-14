import { Toaster } from "@/components/ui/toaster";
import LoginForm from "@/source/components/login/login-form";

export default function Page() {
    return (
        <div className="h-[100vh]">
            <LoginForm />
            <Toaster />
        </div>
    )
}