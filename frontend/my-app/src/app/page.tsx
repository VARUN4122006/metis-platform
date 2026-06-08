export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center p-6">
            <h1 className="text-4xl font-bold mb-4">
                AI Recruitment Platform
            </h1>

            <p className="text-gray-600 mb-8">
                Manage jobs, applicants, interviews and hiring process easily.
            </p>

            <div className="flex gap-4">
                <a
                    href="/login"
                    className="bg-black text-white px-6 py-3 rounded-lg"
                >
                    Login
                </a>

                <a
                    href="/register"
                    className="bg-white border px-6 py-3 rounded-lg"
                >
                    Register
                </a>
            </div>
        </div>
    );
}