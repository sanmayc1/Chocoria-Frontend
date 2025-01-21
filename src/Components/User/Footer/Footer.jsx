import React, { useState } from 'react';
import { Facebook, Instagram, Linkedin, Clock, ChevronDown } from 'lucide-react';

const Footer = () => {
  // State for mobile accordions
  const [openSections, setOpenSections] = useState({
    contact: false,
    customerService: false,
    aboutUs: false,
    followUs: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Footer Section Component
  const FooterSection = ({ title, items, sectionKey, isFollowUs = false }) => {
    const isOpen = openSections[sectionKey];

    return (
      <div className="border-b border-white/20 md:border-none">
        {/* Mobile Header (Shown only on small screens) */}
        <div 
          className="flex justify-between items-center py-4 cursor-pointer md:cursor-default md:py-0"
          onClick={() => toggleSection(sectionKey)}
        >
          <h3 className="text-lg font-medium">{title}</h3>
          <ChevronDown 
            className={`w-5 h-5 md:hidden transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          />
        </div>

        {/* Content */}
        <div className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? 'max-h-48' : 'max-h-0'}
          md:max-h-none md:overflow-visible
        `}>
          {isFollowUs ? (
            <div className="flex space-x-4 py-4 md:py-0">
              <span className="cursor-pointer hover:text-gray-300">
                <Facebook className="w-5 h-5" />
              </span>
              <span className="cursor-pointer hover:text-gray-300">
                <Instagram className="w-5 h-5" />
              </span>
              <span className="cursor-pointer hover:text-gray-300">
                <Linkedin className="w-5 h-5" />
              </span>
              <span className="cursor-pointer hover:text-gray-300">
                <Clock className="w-5 h-5" />
              </span>
            </div>
          ) : (
            <ul className="space-y-2 py-4 md:py-0">
              {items.map((item, index) => (
                <li key={index} className="text-sm cursor-pointer hover:text-gray-300">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  };

  return (
    <footer className="bg-[#3E2723] text-white">
      <div className="container mx-auto px-4">
        <div className="md:grid md:grid-cols-4 md:gap-8 md:py-8">
          <FooterSection
            title="Contact"
            items={['Help', 'Contact us']}
            sectionKey="contact"
          />

          <FooterSection
            title="Customer Service"
            items={['FAQ', 'Shipping and Returns', 'Order Tracking']}
            sectionKey="customerService"
          />

          <FooterSection
            title="About Us"
            items={['FAQ', 'Shipping and Returns', 'Order Tracking']}
            sectionKey="aboutUs"
          />

          <FooterSection
            title="Follow Us"
            items={[]}
            sectionKey="followUs"
            isFollowUs={true}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;