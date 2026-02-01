
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Mail, Phone, MessageSquare, Search } from 'lucide-react';

const FAQS = [
  {
    q: "How do I register for events?",
    a: "You can register for any event by navigating to the Events page, selecting your desired event, and clicking the 'Register Now' button. You'll need to create a simple profile first."
  },
  {
    q: "Are there any registration fees?",
    a: "Some technical workshops and flagship competitions have a nominal fee to cover kit costs and professional materials. Cultural events are generally free for registered attendees."
  },
  {
    q: "Can I participate in multiple events?",
    a: "Yes! However, please check the schedule to ensure your selected events don't overlap in timing."
  },
  {
    q: "Where is the campus located?",
    a: "The festival takes place at our Campus of Excellence, City-560012. Detailed maps are available in the event logistics section of each event page."
  },
  {
    q: "Is accommodation provided for outstation participants?",
    a: "Yes, limited on-campus accommodation is available on a first-come, first-served basis for outstation participants who register at least 2 weeks in advance."
  }
];

const FAQItem = ({ q, a }: { q: string, a: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-bold group-hover:text-red-500 transition-colors">{q}</span>
        <ChevronDown className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-400 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const HelpPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-12 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-8xl font-black mb-6 font-space uppercase tracking-tighter"
        >
          HELP <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500">CENTER</span>
        </motion.h1>
        <p className="text-gray-400 text-lg">
          Everything you need to know to make the most of Kaushalam 2026.
        </p>
      </div>

      {/* Support Channels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {[
          { icon: Mail, label: 'Email', value: 'support@kaushalam.org' },
          { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
          { icon: MessageSquare, label: 'Live Chat', value: 'Available 10AM-8PM' },
        ].map((item, idx) => (
          <div key={idx} className="p-8 rounded-[32px] bg-white/5 border border-white/10 text-center hover:border-red-500/40 transition-all">
            <div className="w-12 h-12 bg-red-600/10 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <item.icon size={24} />
            </div>
            <p className="text-[10px] uppercase font-black tracking-widest text-white/40 mb-1">{item.label}</p>
            <p className="font-bold">{item.value}</p>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-12">
        <h2 className="text-3xl font-black mb-8 font-space uppercase">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {FAQS.map((faq, idx) => (
            <FAQItem key={idx} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
