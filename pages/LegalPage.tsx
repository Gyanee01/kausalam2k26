
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, Cookie } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'cookies';
}

const CONTENT = {
  privacy: {
    title: 'Privacy Policy',
    icon: Shield,
    sections: [
      {
        h: 'Information We Collect',
        p: 'We collect information you provide directly to us when you register for events, subscribe to our newsletter, or communicate with us. This may include your name, college, email address, and phone number.'
      },
      {
        h: 'How We Use Your Data',
        p: 'We use the information we collect to manage your event registrations, provide event updates, and improve the Kaushalam experience. We do not sell your personal data to third parties.'
      },
      {
        h: 'Security',
        p: 'We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access. Our website uses SSL encryption for all data transmissions.'
      }
    ]
  },
  terms: {
    title: 'Terms of Service',
    icon: FileText,
    sections: [
      {
        h: 'Event Participation',
        p: 'By registering for Kaushalam 2026, you agree to abide by the rules and regulations of the festival and the hosting institution. Misconduct can lead to immediate disqualification.'
      },
      {
        h: 'Intellectual Property',
        p: 'All materials provided during technical workshops remain the intellectual property of the presenters. Recordings of performances are permitted only for personal use.'
      },
      {
        h: 'Cancellations',
        p: 'Registration fees for workshops are non-refundable unless the workshop is cancelled by the organizers. Replacement participants may be allowed upon request.'
      }
    ]
  },
  cookies: {
    title: 'Cookie Policy',
    icon: Cookie,
    sections: [
      {
        h: 'What are Cookies?',
        p: 'Cookies are small text files stored on your device that help us provide a better experience. We use them for session management and basic site analytics.'
      },
      {
        h: 'Essential Cookies',
        p: 'These cookies are necessary for the website to function properly, such as keeping you logged in during your session.'
      },
      {
        h: 'How to Manage Cookies',
        p: 'Most web browsers allow you to control cookies through their settings. However, disabling essential cookies may impact your ability to use certain features of the site.'
      }
    ]
  }
};

const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const data = CONTENT[type];
  const Icon = data.icon;

  return (
    <div className="min-h-screen pt-12 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
      <div className="text-center mb-20">
        <div className="w-16 h-16 bg-red-600/10 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <Icon size={32} />
        </div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-8xl font-black mb-6 font-space uppercase tracking-tighter"
        >
          {data.title}
        </motion.h1>
        <p className="text-gray-400">Last updated: October 2025</p>
      </div>

      <div className="space-y-12">
        {data.sections.map((section, idx) => (
          <motion.section 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <h2 className="text-2xl font-black mb-4 font-space uppercase text-red-500">{section.h}</h2>
            <p className="text-gray-300 leading-relaxed text-lg">{section.p}</p>
          </motion.section>
        ))}
      </div>

      <div className="mt-20 pt-12 border-t border-white/10 text-center">
        <p className="text-gray-500 mb-8 italic">
          If you have any questions about our {data.title.toLowerCase()}, please contact us.
        </p>
        <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all">
          Contact Legal Team
        </button>
      </div>
    </div>
  );
};

export default LegalPage;
