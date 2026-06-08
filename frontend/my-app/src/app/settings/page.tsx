"use client";

export default function SettingsPage() {
    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-6">
                    Settings
                </h1>

                <div className="space-y-6">

                    <div>
                        <label className="block mb-2 font-semibold">
                            Company Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter company name"
                            className="w-full border p-3 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-semibold">
                            HR Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter HR email"
                            className="w-full border p-3 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-semibold">
                            Notification Settings
                        </label>

                        <select className="w-full border p-3 rounded-lg">
                            <option>Email Notifications</option>
                            <option>SMS Notifications</option>
                            <option>All Notifications</option>
                        </select>
                    </div>

                    <button className="w-full bg-black text-white py-3 rounded-lg">
                        Save Settings
                    </button>
                </div>
            </div>
        </div>
    );
}