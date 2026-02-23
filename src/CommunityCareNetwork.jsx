import React, { useState } from "react";

function CommunityCareNetwork() {
    const [view, setView] = useState("login");
    const [username, setUsername] = useState("");
    const [profile, setProfile] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        age: "",
        sex: "",
    });

    const resources = [
        {
            id: "1",
            name: "North Side Food Bank",
            category: "food",
            description: "Free groceries and hot meals for families in need",
            phone: "(817) 555-0100",
            hours: "Mon-Fri 9AM-5PM",
        },
        {
            id: "2",
            name: "Safe Haven Housing",
            category: "housing",
            description: "Emergency shelter and transitional housing assistance",
            phone: "(817) 555-0200",
            hours: "24/7 Hotline",
        },
        {
            id: "3",
            name: "Community Health Clinic",
            category: "healthcare",
            description:
                "Free medical care, dental services, and mental health support",
            phone: "(817) 555-0300",
            hours: "Tue-Sat 8AM-6PM",
        },
        {
            id: "6",
            name: "Crisis Hotline 24/7",
            category: "crisis",
            description: "Immediate support for mental health emergencies",
            phone: "988",
            hours: "24/7",
        },
    ];

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { role: "user", content: input };
        setMessages((prev) => [...prev, userMsg]);

        const currentInput = input;
        setInput("");
        setLoading(true);

        const crisisWords = [
            "suicide",
            "kill myself",
            "hurt myself",
            "end my life",
        ];

        if (
            crisisWords.some((word) =>
                currentInput.toLowerCase().includes(word)
            )
        ) {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content:
                        "🚨 Please contact the Crisis Hotline immediately at 988 (24/7). Your safety is the top priority.",
                    resources: [resources.find((r) => r.id === "6")],
                },
            ]);
            setLoading(false);
            return;
        }

        // Temporary simulated AI response (safe for frontend)
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content:
                        "Thank you for reaching out. Based on your message, here are some helpful resources:",
                    resources: resources.slice(0, 2),
                },
            ]);
            setLoading(false);
        }, 1000);
    };

    // ---------------- LOGIN VIEW ----------------
    if (view === "login") {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-4 text-center">
                        🏥 CommunityCare Network
                    </h2>

                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                        className="w-full p-3 border rounded mb-4"
                    />

                    <button
                        onClick={() =>
                            username.trim() && setView("profile")
                        }
                        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
                    >
                        Continue
                    </button>
                </div>
            </div>
        );
    }

    // ---------------- PROFILE VIEW ----------------
    if (view === "profile") {
        return (
            <div className="p-8 max-w-lg mx-auto">
                <h2 className="text-xl font-bold mb-6">
                    Tell Us About Yourself
                </h2>

                <input
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                    }
                    className="w-full p-3 border rounded mb-4"
                />

                <input
                    type="number"
                    placeholder="Age"
                    value={form.age}
                    onChange={(e) =>
                        setForm({ ...form, age: e.target.value })
                    }
                    className="w-full p-3 border rounded mb-4"
                />

                <select
                    value={form.sex}
                    onChange={(e) =>
                        setForm({ ...form, sex: e.target.value })
                    }
                    className="w-full p-3 border rounded mb-6"
                >
                    <option value="">Select...</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Non-binary</option>
                </select>

                <div className="flex justify-between">
                    <button
                        onClick={() => setView("login")}
                        className="bg-gray-300 px-4 py-2 rounded"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={!form.name || !form.age || !form.sex}
                        onClick={() => {
                            setProfile(form);
                            setView("chat");
                        }}
                        className="bg-green-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
                    >
                        Start Chatting
                    </button>
                </div>
            </div>
        );
    }

    // ---------------- CHAT VIEW ----------------
    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">
                Welcome, {profile?.name}
            </h1>

            <div className="border rounded p-4 h-96 overflow-y-auto mb-4 bg-white shadow">
                {messages.map((m, i) => (
                    <div key={i} className="mb-3">
                        <strong className="capitalize">
                            {m.role}:
                        </strong>{" "}
                        {m.content}

                        {m.resources &&
                            m.resources.map((r) => (
                                <div
                                    key={r.id}
                                    className="mt-2 p-3 border rounded bg-gray-50"
                                >
                                    <strong>{r.name}</strong>
                                    <p>{r.description}</p>
                                    <p className="text-sm">
                                        📞 {r.phone} | ⏰ {r.hours}
                                    </p>
                                </div>
                            ))}
                    </div>
                ))}

                {loading && (
                    <div className="text-gray-500">
                        Assistant is typing...
                    </div>
                )}
            </div>

            <div className="flex gap-2">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) =>
                        e.key === "Enter" && handleSend()
                    }
                    className="flex-1 p-3 border rounded"
                    placeholder="Type your message..."
                />

                <button
                    onClick={handleSend}
                    className="bg-blue-600 text-white px-6 rounded hover:bg-blue-700"
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default CommunityCareNetwork;