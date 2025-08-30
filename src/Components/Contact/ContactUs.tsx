// export default function ContactUs() {
//   return (
//     <section className="bg-gray-50 py-16 px-6">
//       <div className="max-w-3xl mx-auto">
//         {/* Heading */}
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-2">
//           Contact us <span className="text-2xl">📮</span>
//         </h2>
//         <p className="mt-3 text-gray-600 text-lg">
//           Empowering individuals, creators, and tech innovators with cutting-edge AI solutions.
//         </p>

//         {/* Call / Email buttons */}
//         <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
//           {/* Call */}
//           {/* <button className="flex items-center justify-center gap-3 flex-1 font-semibold bg-purple-100 hover:bg-purple-200 px-6 py-3 rounded-xl transition">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={2}
//               stroke="currentColor"
//               className="w-5 h-5"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M2 5a2 2 0 012-2h2.28a1 1 0 01.948.684l1.518 4.55a1 1 0 01-.502 1.21l-1.79.894a11.042 11.042 0 005.516 5.516l.894-1.79a1 1 0 011.21-.502l4.55 1.518a1 1 0 01.684.949V20a2 2 0 01-2 2h-1C9.163 22 2 14.837 2 6V5z"
//               />
//             </svg>
//             Call
//           </button> */}

//           {/* Email */}
//           <button className="flex items-center justify-center gap-3 flex-1 font-semibold bg-red-100 hover:bg-red-200 px-6 py-3 rounded-xl transition">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={2}
//               stroke="currentColor"
//               className="w-5 h-5"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.072 1.916l-7.5 4.615a2.25 2.25 0 01-2.356 0l-7.5-4.615A2.25 2.25 0 012.25 6.993V6.75"
//               />
//             </svg>
//             Email
//           </button>
//         </div>

//         {/* Form */}
//         <div className="bg-white rounded-xl shadow-md p-8 mt-10">
//           <form className="space-y-6">
//             {/* Name fields */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">First name</label>
//                 <input
//                   type="text"
//                   className="mt-2 w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Last name</label>
//                 <input
//                   type="text"
//                   className="mt-2 w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
//                 />
//               </div>
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Email</label>
//               <input
//                 type="email"
//                 className="mt-2 w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
//               />
//             </div>

//             {/* Message */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Your message</label>
//               <textarea
//                 rows={4}
//                 className="mt-2 w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
//               ></textarea>
//             </div>

//             {/* Submit button */}
//             <button
//               type="submit"
//               className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 rounded-lg transition"
//             >
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";
import { useState } from "react";

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
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-2">
          Contact us <span className="text-2xl">📮</span>
        </h2>

        <div className="bg-white rounded-xl shadow-md p-8 mt-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium">First name</label>
                <input name="firstName" type="text" required className="mt-2 w-full rounded-md border px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">Last name</label>
                <input name="lastName" type="text" required className="mt-2 w-full rounded-md border px-4 py-2" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input name="email" type="email" required className="mt-2 w-full rounded-md border px-4 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium">Message</label>
              <textarea name="message" rows={4} required className="mt-2 w-full rounded-md border px-4 py-2"></textarea>
            </div>

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
