import React, { useState, useEffect, useRef } from 'react';
import { 
  PhotoIcon, 
  DocumentTextIcon, 
  CodeBracketIcon, 
  MagnifyingGlassIcon,
  SparklesIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  StarIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { motion, Variants } from 'framer-motion';
import { Button } from '@headlessui/react';
import { Link } from 'react-router-dom';

const QuickToolsLanding = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toolsSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToTools = () => {
    toolsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const tools = [
    {
      category: "Image Tools",
      icon: <PhotoIcon className="w-6 h-6" />,
      items: ["WebP Converter", "Image Resizer", "Favicon Generator", "SVG Optimizer"]
    },
    {
      category: "Text Tools", 
      icon: <DocumentTextIcon className="w-6 h-6" />,
      items: ["Text Formatter", "Grammar Checker", "Text Summarizer", "Word Counter"]
    },
    {
      category: "Code Tools",
      icon: <CodeBracketIcon className="w-6 h-6" />,
      items: ["Base64 Encoder/Decoder", "JSON Converter", "Text Formatter", "HTML Beautifier", "CSS Minifier"]
    },
    {
      category: "SEO & Social",
      icon: <MagnifyingGlassIcon className="w-6 h-6" />,
      items: ["Open Graph Previewer", "Meta Tag Generator", "Twitter Card Tester", "Slug Generator"]
    }
  ];

  const features = [
    {
      icon: <RocketLaunchIcon className="w-8 h-8" />,
      title: "Instant WebP Converter",
      description: "Convert your images to WebP format for lightning-fast web performance."
    },
    {
      icon: <CodeBracketIcon className="w-8 h-8" />,
      title: "Text Formatter", 
      description: "Clean up your code, JSON, XML, and HTML with just a click."
    },
    {
      icon: <SparklesIcon className="w-8 h-8" />,
      title: "Grammar & Style Checker",
      description: "Perfect your writing with real-time grammar checks and style suggestions."
    },
    {
      icon: <PhotoIcon className="w-8 h-8" />,
      title: "Image Resizer & Compressor",
      description: "Keep your visuals crisp without sacrificing performance."
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Pick a Tool",
      description: "Select the tool you need from our list of powerful utilities."
    },
    {
      number: "2", 
      title: "Upload or Input Your Data",
      description: "Drop your files, paste your text, or select your image."
    },
    {
      number: "3",
      title: "Download or Copy",
      description: "Get the optimized output instantly and integrate it into your workflow."
    }
  ];

  const benefits = [
    {
      icon: <CheckCircleIcon className="w-6 h-6" />,
      title: "Free to Use",
      description: "All tools are free and always will be."
    },
    {
      icon: <CheckCircleIcon className="w-6 h-6" />,
      title: "No Installations", 
      description: "Access tools instantly from any browser. No downloads, no extensions."
    },
    {
      icon: <CheckCircleIcon className="w-6 h-6" />,
      title: "Multi-Purpose",
      description: "Whether you're coding or writing, QuickTools has something for every professional."
    },
    {
      icon: <CheckCircleIcon className="w-6 h-6" />,
      title: "Optimized Performance",
      description: "Each tool is designed for speed—process your data in seconds."
    }
  ];

  const testimonials = [
    {
      text: "QuickTools has made my life so much easier. I can format JSON, check grammar, and compress images all in one place!",
      author: "Jane Doe",
      role: "Web Developer",
      rating: 5
    },
    {
      text: "As a writer, I love how fast and reliable the text summarizer and grammar checker are.",
      author: "John Smith", 
      role: "Content Writer",
      rating: 5
    }
  ];

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    hover: { scale: 1.05, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <header className="relative z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                  <SparklesIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  QuickTools
                </span>
              </Link>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={scrollToTools} className="relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-2.5 rounded-xl font-medium shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40">
                Get Started
              </Button>
            </motion.div>
          </div>
        </div>
      </header>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="relative py-20 overflow-hidden"
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                The Ultimate
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
                Toolbox
              </span>
              <br />
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                for Developers & Writers
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed">
              Boost productivity with powerful, fast, and easy-to-use tools for all your content and coding needs.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={scrollToTools} className="relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 rounded-xl text-lg font-medium inline-flex items-center group">
                <span className="relative">Start Using QuickTools</span>
                <ArrowRightIcon className="w-5 h-5 ml-2 relative group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
              Everything You Need, All in One Place
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                className="group relative overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <div className="relative text-cyan-400 mb-4 group-hover:text-cyan-300">
                  {feature.icon}
                </div>
                <h3 className="relative text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="relative text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
              Using QuickTools is as Simple as 1-2-3!
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-500/40">
                  {step.number}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{step.title}</h3>
                <p className="text-gray-400 text-lg">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
              Effortless, Efficient, and Always Available
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="text-cyan-400 mb-4 flex justify-center group-hover:text-cyan-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative py-20"
        ref={toolsSectionRef}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
              Browse the Full List of Tools
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((category, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                className="group relative overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <div className="relative flex items-center mb-4">
                  <div className="text-cyan-400 mr-3 group-hover:text-cyan-300">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{category.category}</h3>
                </div>
                <ul className="relative space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors">
                      {item === "Base64 Encoder/Decoder" ? (
                        <Link to="/tools/base64">{item}</Link>
                      ) : item === "Text Formatter" ? (
                        <Link to="/tools/text-formatter">{item}</Link>
                      ) : item === "WebP Converter" ? (
                        <Link to="/tools/webp-converter">{item}</Link>
                      ) : item === "JSON Converter" ? (
                        <Link to="/tools/json-converter">{item}</Link>
                      ) : (
                        item
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
              What Our Users Are Saying
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                className="relative overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8"
              >
                <div className="relative flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-cyan-400 fill-current" />
                  ))}
                </div>
                <p className="relative text-gray-300 text-lg mb-6 italic">"{testimonial.text}"</p>
                <div className="relative">
                  <p className="text-white font-semibold">{testimonial.author}</p>
                  <p className="text-cyan-400">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative py-20"
      >
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12">
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of developers and writers already using QuickTools. Start saving time today.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={scrollToTools} className="relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 rounded-xl text-lg font-medium inline-flex items-center group">
                  <span className="relative">Try QuickTools Now</span>
                  <ArrowRightIcon className="w-5 h-5 ml-2 relative group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      <footer className="relative backdrop-blur-xl bg-white/5 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                  <SparklesIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  QuickTools
                </span>
              </Link>
              <p className="text-gray-400 mb-4">
                QuickTools is the ultimate productivity platform for developers and writers.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Button onClick={scrollToTools} className="text-gray-400 hover:text-cyan-400 transition-colors">All Tools</Button></li>
                <li><Button className="text-gray-400 hover:text-cyan-400 transition-colors">About Us</Button></li>
                <li><Button className="text-gray-400 hover:text-cyan-400 transition-colors">Contact</Button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Button className="text-gray-400 hover:text-cyan-400 transition-colors">Privacy Policy</Button></li>
                <li><Button className="text-gray-400 hover:text-cyan-400 transition-colors">Terms of Service</Button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-gray-500">
              © 2025 QuickTools. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default QuickToolsLanding;
