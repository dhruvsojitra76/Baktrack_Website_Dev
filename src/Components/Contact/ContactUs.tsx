"use client";
import { useState } from "react";

type FloatingInputProps = {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
};

function FloatingInput({ label, name, type = "text", textarea = false }: FloatingInputProps) {
  return (
    <div className="relative w-full">
      {textarea ? (
        <textarea
          name={name}
          rows={4}
          required
          placeholder=" "
          className="peer w-full rounded-md border px-4 pt-6 pb-2 text-gray-900 placeholder-transparent focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
        />
      ) : (
        <input
          type={type}
          name={name}
          required
          placeholder=" "
          className="peer w-full rounded-md border px-4 pt-6 pb-2 text-gray-900 placeholder-transparent focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
        />
      )}
      <label
        htmlFor={name}
        className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-500"
      >
        {label}
      </label>
    </div>
  );
}

export default function ContactUs() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const form = e.currentTarget;
    const body = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      message: form.message.value,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    setStatus(data.message);
    setLoading(false);
    form.reset();
  }

  return (
    <section className="bg-gray-50 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-2">
          Contact us <span className="text-2xl">📮</span>
        </h2>

        <div className="bg-white rounded-xl shadow-md p-8 mt-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FloatingInput label="First name" name="firstName" />
              <FloatingInput label="Last name" name="lastName" />
            </div>

            <FloatingInput label="Email" name="email" type="email" />
            <FloatingInput label="Message" name="message" textarea />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 rounded-lg transition"
            >
              {loading ? "Sending..." : "Submit"}
            </button>
          </form>

          {status && <p className="mt-4 text-center text-sm text-gray-600">{status}</p>}
        </div>
      </div>
    </section>
  );
}
