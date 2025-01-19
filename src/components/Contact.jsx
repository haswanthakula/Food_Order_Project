import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Contact.css";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_w0brudi", "template_u3iatzi", form.current, {
        publicKey: "RwjP2wZEUkFove_K9"
      })
      .then(
        () => {
          toast.success("Message sent successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          });
          form.current.reset();
        },
        (error) => {
          toast.error("Failed to send message. Please try again.", {
            position: "top-right",
            autoClose: 3000
          });
        }
      );
  };

  return (
    <div className="contact">
      <h2>Contact Us</h2>
      <p>Get in touch with us for any questions or concerns</p>

      <div className="contact-container">
        {/* Contact Form */}
        <div className="contact-form-container">
          <form ref={form} onSubmit={sendEmail} className="contact-form">
            <div className="form-group">
              <label htmlFor="user_name">Name</label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                required
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="user_email">Email</label>
              <input
                type="email"
                id="user_email"
                name="user_email"
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                id="message"
                required
                placeholder="Type your message here"
                rows="5"
              />
            </div>

            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="contact-info">
          <div className="info-item">
            <h3>Address</h3>
            <p>123 Food Street, Cuisine City, FC 12345</p>
          </div>
          <div className="info-item">
            <h3>Phone</h3>
            <p>+1 (555) 123-4567</p>
          </div>
          <div className="info-item">
            <h3>Email</h3>
            <p>info@foodorder.com</p>
          </div>
          <div className="info-item">
            <h3>Hours</h3>
            <p>Monday - Sunday: 10:00 AM - 10:00 PM</p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contact;