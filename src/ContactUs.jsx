import React, { useState } from 'react';
import './ContactUs.css';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      setIsValid(false);
      form.classList.add('was-validated');
      return;
    }

    try {
      setFormStatus('Sending message...');
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: '80b522a5-af83-42c3-bd69-801db9beaf63', // Replace with your Web3Forms access key
          subject: 'New Submission from Web3Forms',
          ...formData
        })
      });
      const result = await response.json();
      if (response.status === 200) {
        setFormStatus('Message sent successfully!');
        setIsValid(true);
      } else {
        setFormStatus(result.message);
      }
    } catch (error) {
      console.error(error);
      setFormStatus('Something went wrong!');
    }
    setTimeout(() => {
      setFormStatus('');
    }, 5000);
    form.reset();
  };

  return (
    <div className="contact-container">
      <div className="form-container">
        <div className="text-center">
          <h1 className="heading">Contact Us</h1>
          <p className="subheading">Fill up the form below to send us a message.</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className={`needs-validation ${isValid ? '' : 'was-validated'}`}
          noValidate
        >
          <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
          <input type="hidden" name="subject" value="New Submission from Web3Forms" />
          <div className="flex">
            <div className="input-group">
              <label htmlFor="firstName" className="label">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="input"
              />
              <div className="invalid-feedback">Please provide your first name.</div>
            </div>
            <div className="input-group">
              <label htmlFor="lastName" className="label">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="input"
              />
              <div className="invalid-feedback">Please provide your last name.</div>
            </div>
          </div>

          <div className="flex">
            <div className="input-group">
              <label htmlFor="email" className="label">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="you@company.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="input"
              />
              <div className="invalid-feedback">Please provide a valid email address.</div>
            </div>
            <div className="input-group">
              <label htmlFor="phone" className="label">Phone Number</label>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="+1 (555) 1234-567"
                value={formData.phone}
                onChange={handleChange}
                required
                className="input"
              />
              <div className="invalid-feedback">Please provide your phone number.</div>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="message" className="label">Your Message</label>
            <textarea
              rows="5"
              name="message"
              id="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="input"
            ></textarea>
            <div className="invalid-feedback">Please enter your message.</div>
          </div>

          <div className="submit-group">
            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </div>
          {formStatus && <p className="status">{formStatus}</p>}
        </form>
      </div>
    </div>
  );
}
