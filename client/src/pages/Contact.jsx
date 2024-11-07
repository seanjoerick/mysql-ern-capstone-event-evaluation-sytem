import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import toast from 'react-hot-toast';
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, message } = formData;

    setLoading(true);

    emailjs.send(
      'service_2qppo6l',
      'template_2jkz1tl',
      {
        sender_name: name,
        message: message,
        reply_to: email,
      },
      'JHDNyMGply29Smimy'
    )
    .then((result) => {
      console.log('Message Sent:', result.text);

      toast.success('Message sent successfully!');
      
      // Reset form data after success
      setFormData({
        name: '',
        email: '',
        message: ''
      });

      setLoading(false);
    }, (error) => {
      console.log('Error:', error.text);
      toast.error('Failed to send message. Please try again later.');

      setLoading(false);
    });
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-black text-3xl font-semibold mb-6">Contact Us</h2>
      <p className="text-base text-black">Trimex Colleges</p>
      <p className="text-base text-black">
        <strong>Director of Instruction</strong>
      </p>
      <p className="text-base text-black">
        <strong>Email address:</strong> eventAdmin@gmail.com
      </p>

      <form onSubmit={handleSubmit} className="mt-6">
        <div className="mb-4">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            required
            autoComplete="off"
          />
        </div>

        <div className="mb-4">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            required
            autoComplete="off"
          />
        </div>

        <div className="mb-6">
          <textarea
            id="message"
            name="message"
            placeholder="Write your message here"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            rows="5"
            required
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 mb-4"
        >
          {loading ? (
            <span className="loading loading-spinner text-white"></span> 
          ) : (
            'Send Email'
          )}
        </button>
        
      </form>
      
    </div>
  );
};

export default Contact;
