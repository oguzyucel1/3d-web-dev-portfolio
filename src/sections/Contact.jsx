import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import TitleHeader from "../components/TitleHeader";
import ContactExperience from "../components/Models/contact/ContactExperience";

const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    // Debug: Check environment variables
    console.log("Environment check:", {
      serviceId: import.meta.env.VITE_APP_EMAILJS_SERVICE_ID
        ? "✅ Found"
        : "❌ Missing",
      templateId: import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID
        ? "✅ Found"
        : "❌ Missing",
      publicKey: import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
        ? "✅ Found"
        : "❌ Missing",
    });

    // Check if all required fields are filled
    if (!form.name || !form.email || !form.message) {
      alert("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const result = await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );

      console.log("Email sent successfully:", result);
      setForm({ name: "", email: "", message: "" });
      setSuccess(true);
      alert("Message sent successfully! ✅");
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert(`Failed to send message: ${error.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Get in Touch – Let’s Connect"
          sub="💬 Have questions or ideas? Let’s talk! 🚀"
        />
        <div className="grid-12-cols mt-16">
          <div className="xl:col-span-5">
            <div className="flex-center card-border rounded-xl p-10">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-7"
              >
                <div>
                  <label htmlFor="name">Your name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What’s your name?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="What’s your email address?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    rows="5"
                    required
                  />
                </div>

                <button type="submit">
                  <div className="cta-button group">
                    <div className="bg-circle" />
                    <p className="text font-bold">
                      {loading
                        ? "Sending..."
                        : success
                        ? "Your message has been sent ✅"
                        : "Send Message"}
                    </p>
                    <div className="arrow-wrapper">
                      {!success && (
                        <img src="/images/arrow-down.svg" alt="arrow" />
                      )}
                    </div>
                  </div>
                </button>
              </form>
            </div>
          </div>
          <div className="xl:col-span-7 min-h-96">
            <div className="bg-[#cd7c2e] w-full h-full hover:cursor-grab rounded-3xl overflow-hidden">
              <ContactExperience />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
