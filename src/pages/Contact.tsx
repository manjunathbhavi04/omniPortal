import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, Twitter, Github, MailIcon, MessageSquare, 
  CheckCircle, Loader2
} from 'lucide-react';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formState.name || !formState.email || !formState.message) {
      toast.error('Please fill all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.custom((t) => (
        <div className={`${t.visible ? 'animate-slideIn' : 'animate-slideOut'} max-w-md w-full glass-card pointer-events-auto flex`}>
          <div className="flex-1 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <CheckCircle className="h-5 w-5 text-success-500" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-white">
                  Message Sent Successfully
                </p>
                <p className="mt-1 text-sm text-white/70">
                  Thank you for contacting us. We'll get back to you as soon as possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      ));
      
      // Reset form after successful submission
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactLinks = [
    {
      icon: <Twitter className="h-5 w-5" />,
      label: 'Twitter',
      href: 'https://x.com/OmnniPortaL',
      color: 'bg-[#1DA1F2]/10 text-[#1DA1F2]',
    },
    {
      icon: <Github className="h-5 w-5" />,
      label: 'GitHub',
      href: 'https://github.com/manjunathbhavi04/omniPortal.git',
      color: 'bg-[#333]/10 text-white',
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      label: 'Discord',
      href: 'https://discord.gg/VkWxqp5b',
      color: 'bg-[#5865F2]/10 text-[#5865F2]',
    },
    {
      icon: <MailIcon className="h-5 w-5" />,
      label: 'Email',
      href: 'mailto:info@omniportal.com',
      color: 'bg-primary-500/10 text-primary-400',
    },
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-6">Get In Touch</h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Have questions about OmniPortal or need support with bridging your assets?
            We're here to help!
          </p>
        </motion.div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="glass-card"
            >
              <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1.5">
                      Name <span className="text-error-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className="input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1.5">
                      Email <span className="text-error-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className="input"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-5">
                  <label htmlFor="subject" className="block text-sm font-medium text-white/80 mb-1.5">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    className="select"
                  >
                    <option value="">Select a subject</option>
                    <option value="bridge-support">Bridge Support</option>
                    <option value="technical-issue">Technical Issue</option>
                    <option value="feature-request">Feature Request</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-1.5">
                    Message <span className="text-error-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    className="input resize-none"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-accent w-full py-3"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="glass-card mb-8">
                <h2 className="text-2xl font-semibold mb-6">Connect with us</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {contactLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-lg border border-white/10 hover:border-white/20 transition flex items-center space-x-3"
                    >
                      <div className={`w-10 h-10 rounded-full ${link.color} flex items-center justify-center`}>
                        {link.icon}
                      </div>
                      <span className="font-medium">{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>
              
              <div className="glass-card">
                <h2 className="text-2xl font-semibold mb-6">FAQs</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">What is LayerZero?</h3>
                    <p className="text-white/70">
                      LayerZero is an omnichain interoperability protocol that enables direct cross-chain 
                      communication, allowing applications to span multiple blockchains.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">How long do transfers take?</h3>
                    <p className="text-white/70">
                      Most transfers complete within 2-5 minutes, depending on network congestion and 
                      the specific chains involved in the transfer.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Which chains are supported?</h3>
                    <p className="text-white/70">
                      We currently support Solana, Ethereum, BNB Chain, Avalanche, Polygon, and Arbitrum, 
                      with more chains being added regularly.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;