import { useState, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GraduationCap, BookOpen, Users, Award, Target, TrendingUp,
  FlaskConical, Calculator, Dna, AtomIcon, CheckCircle2, 
  Phone, Mail, MapPin, Menu, X, ChevronDown, Clock, Calendar
} from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Navbar Component
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Academics", path: "/academics" },
    { name: "Faculty", path: "/faculty" },
    { name: "Admissions", path: "/admissions" },
    { name: "Notice Board", path: "/notices" }
  ];

  return (
    <nav 
      data-testid="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/80 nav-blur border-b border-slate-200/50 shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" data-testid="logo-link">
            <div className="bg-gradient-to-br from-blue-900 to-blue-950 p-2.5 rounded-xl group-hover:scale-105 transition-transform">
              <img src="/Logo.jpeg" alt="Circle Concept School Logo" className="h-7 w-7 object-contain" />
            </div>
            <div>
              <h1 className={`text-lg font-bold tracking-tight ${scrolled ? 'text-blue-950' : 'text-white'}`}>
                Circle Concept School
              </h1>
              <p className={`text-xs ${scrolled ? 'text-slate-600' : 'text-white/80'}`}>
                Excellence in Science Education
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? scrolled ? 'text-blue-900' : 'text-yellow-400'
                    : scrolled ? 'text-slate-600 hover:text-blue-900' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/admissions">
              <Button 
                data-testid="apply-now-button"
                className="bg-yellow-500 text-blue-950 hover:bg-yellow-400 font-bold rounded-full px-6 py-2 transition-transform hover:scale-105 shadow-lg shadow-yellow-500/20"
              >
                Apply Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            data-testid="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 ${scrolled ? 'text-blue-950' : 'text-white'}`}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-200"
            data-testid="mobile-menu"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-slate-700 hover:text-blue-900 font-medium"
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/admissions" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-yellow-500 text-blue-950 hover:bg-yellow-400 font-bold rounded-full">
                  Apply Now
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Hero Section
const Hero = () => {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center" data-testid="hero-section">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/15517939/pexels-photo-15517939.jpeg')" }}
      />
      <div className="absolute inset-0 hero-overlay" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-full px-5 py-2 mb-6"
          >
            <p className="text-yellow-400 font-semibold text-sm" data-testid="hero-badge">
              🎓 Admission Open for 2026-28 Batch
            </p>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-none"
            data-testid="hero-title"
          >
            Shape Your Future in
            <span className="block text-yellow-400 mt-2">Science & Engineering</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed"
            data-testid="hero-description"
          >
            Premier residential college offering integrated CHSE Board + JEE/NEET preparation. 
            Expert faculty, personalized mentorship, and proven results.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/admissions">
              <Button 
                data-testid="hero-apply-button"
                className="bg-yellow-500 text-blue-950 hover:bg-yellow-400 font-bold rounded-full px-8 py-6 text-lg transition-transform hover:scale-105 shadow-xl shadow-yellow-500/30"
              >
                Apply for Admission
              </Button>
            </Link>
            <Link to="/about">
              <Button 
                data-testid="hero-learn-more-button"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold rounded-full px-8 py-6 text-lg"
              >
                Learn More
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-12 flex flex-wrap gap-8 text-white"
          >
            <div data-testid="stat-students">
              <p className="text-3xl font-bold text-yellow-400">60+</p>
              <p className="text-sm text-white/80">Limited Seats</p>
            </div>
            <div data-testid="stat-faculty">
              <p className="text-3xl font-bold text-yellow-400">15+</p>
              <p className="text-sm text-white/80">Expert Faculty</p>
            </div>
            <div data-testid="stat-success">
              <p className="text-3xl font-bold text-yellow-400">95%</p>
              <p className="text-sm text-white/80">Success Rate</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-8 w-8 text-white/60" />
      </div>
    </section>
  );
};

// Subjects Section
const SubjectsSection = () => {
  const subjects = [
    {
      icon: AtomIcon,
      title: "Physics",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-500",
      topics: ["Mechanics", "Thermodynamics", "Electromagnetism", "Modern Physics"]
    },
    {
      icon: FlaskConical,
      title: "Chemistry",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-500",
      topics: ["Physical Chemistry", "Organic Chemistry", "Inorganic Chemistry", "Practical Applications"]
    },
    {
      icon: Calculator,
      title: "Mathematics",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-500",
      topics: ["Advanced Calculus", "Algebra", "Trigonometry", "Coordinate Geometry"]
    },
    {
      icon: Dna,
      title: "Biology",
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-500",
      topics: ["Botany", "Zoology", "Human Physiology", "Genetics"]
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-white" data-testid="subjects-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-wider text-yellow-600 uppercase mb-3"
          >
            Our Curriculum
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-blue-950 mb-4"
            data-testid="subjects-heading"
          >
            Master Core Sciences
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Comprehensive coverage aligned with CHSE Board and competitive exam patterns
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject, index) => {
            const Icon = subject.icon;
            return (
              <motion.div
                key={subject.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                data-testid={`subject-card-${subject.title.toLowerCase()}`}
              >
                <Card className={`relative overflow-hidden hover-lift border-t-4 ${subject.borderColor} h-full`}>
                  <CardHeader>
                    <div className={`${subject.bgColor} ${subject.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-blue-950">
                      {subject.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {subject.topics.map((topic) => (
                        <li key={topic} className="flex items-start gap-2 text-slate-600">
                          <CheckCircle2 className={`h-5 w-5 mt-0.5 ${subject.color} flex-shrink-0`} />
                          <span className="text-sm">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Academic Structure
const AcademicStructure = () => {
  const features = [
    { icon: BookOpen, title: "Daily Concept Classes", description: "In-depth subject coverage by expert faculty" },
    { icon: Users, title: "Doubt Clearing Sessions", description: "Personalized attention for every student" },
    { icon: Award, title: "Weekly Tests", description: "Regular assessment to track progress" },
    { icon: Target, title: "All-India Mock Exams", description: "Compete at national level standards" },
    { icon: TrendingUp, title: "Performance Analytics", description: "Data-driven insights for improvement" }
  ];

  return (
    <section className="py-20 md:py-32 bg-slate-50" data-testid="academic-structure-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-blue-950 mb-4"
            data-testid="academic-structure-heading"
          >
            Our Academic Structure
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            A comprehensive system designed for excellence in both board and competitive exams
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                data-testid={`academic-feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <Card className="h-full hover-lift bg-white">
                  <CardHeader>
                    <div className="bg-gradient-to-br from-blue-900 to-blue-950 text-yellow-400 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl font-bold text-blue-950">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Features Section
const FeaturesSection = () => {
  const features = [
    "Small Batch Size for Personalized Attention",
    "Individual Mentorship System",
    "Comprehensive Study Materials & Question Banks",
    "Competitive Environment for Healthy Competition",
    "Synchronized Board & Competitive Prep",
    "Time-Efficient Curriculum",
    "Regular Parent-Teacher Interactions",
    "Career Counseling & Guidance"
  ];

  return (
    <section className="py-20 md:py-32 bg-blue-950 text-white" data-testid="features-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="features-heading">
              Why Choose
              <span className="block text-yellow-400 mt-2">Circle Concept?</span>
            </h2>
            <p className="text-lg text-white/80 mb-8">
              We provide the unique edge that transforms good students into exceptional achievers. 
              Our holistic approach ensures success in both board exams and competitive entrances.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-colors"
                data-testid={`feature-item-${index}`}
              >
                <CheckCircle2 className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{feature}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Admission Section
const AdmissionSection = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-yellow-50 to-white" data-testid="admission-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 to-blue-950 rounded-3xl p-8 md:p-12 text-white mb-12">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block bg-yellow-400 text-blue-950 font-bold px-6 py-2 rounded-full mb-6 text-sm"
              data-testid="admission-open-badge"
            >
              🎓 ADMISSION OPEN FOR 2026-28 BATCH
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-8"
              data-testid="admission-heading"
            >
              Secure Your Seat Today
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6" data-testid="admission-stat-session">
                <Calendar className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                <p className="text-2xl font-bold mb-1">June 2026</p>
                <p className="text-sm text-white/80">Session Start</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6" data-testid="admission-stat-class">
                <GraduationCap className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                <p className="text-2xl font-bold mb-1">Class XI</p>
                <p className="text-sm text-white/80">Science Stream</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6" data-testid="admission-stat-seats">
                <Users className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                <p className="text-2xl font-bold mb-1">60 Only</p>
                <p className="text-sm text-white/80">Limited Seats</p>
              </div>
            </div>

            <Link to="/admissions">
              <Button 
                data-testid="admission-apply-button"
                className="bg-yellow-400 text-blue-950 hover:bg-yellow-300 font-bold rounded-full px-8 py-6 text-lg transition-transform hover:scale-105 shadow-xl"
              >
                Apply Now - Don't Miss Out!
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-8">
          <h3 className="text-2xl font-bold text-blue-950 mb-6" data-testid="eligibility-heading">Eligibility Criteria</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Class X Passed from recognized board",
              "Minimum 70% in Science & Mathematics",
              "Clear admission test with good marks",
              "Successful personal interview"
            ].map((criteria, index) => (
              <div key={index} className="flex items-start gap-3" data-testid={`eligibility-item-${index}`}>
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-slate-700">{criteria}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white pt-16 pb-8" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-yellow-500 p-2 rounded-xl">
                <GraduationCap className="h-6 w-6 text-blue-950" />
              </div>
              <h3 className="text-xl font-bold">Circle Concept</h3>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Premier residential Plus 2 Science college offering integrated preparation for CHSE Board, JEE, and NEET. 
              Powered by The Circle Foundation.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-yellow-400">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3" data-testid="footer-phone">
                <Phone className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white/90">9124588491</p>
                  <p className="text-white/90">9124588492</p>
                  <p className="text-white/90">9124588493</p>
                </div>
              </div>
              <div className="flex items-start gap-3" data-testid="footer-email">
                <Mail className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <p className="text-white/90">info@circleschool.live</p>
              </div>
              <div className="flex items-start gap-3" data-testid="footer-address">
                <MapPin className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <p className="text-white/90">
                  Plot No- 537, Patrapada, PO- Sunhat, PS- Balasore Town, Balasore, Odisha, 756002
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-yellow-400">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <Link to="/about" className="block text-white/70 hover:text-yellow-400 transition-colors">
                About Us
              </Link>
              <Link to="/academics" className="block text-white/70 hover:text-yellow-400 transition-colors">
                Academics
              </Link>
              <Link to="/faculty" className="block text-white/70 hover:text-yellow-400 transition-colors">
                Faculty
              </Link>
              <Link to="/admissions" className="block text-white/70 hover:text-yellow-400 transition-colors">
                Admissions
              </Link>
              <Link to="/notices" className="block text-white/70 hover:text-yellow-400 transition-colors">
                Notice Board
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <p>© 2026 Circle Concept Higher Secondary School. All rights reserved.</p>
          <div className="flex gap-6">
            <button className="hover:text-yellow-400 transition-colors">Privacy Policy</button>
            <button className="hover:text-yellow-400 transition-colors">Terms & Conditions</button>
          </div>
          <p className="text-white/50">Powered by The Circle Foundation</p>
        </div>
      </div>
    </footer>
  );
};

// Home Page
const Home = () => {
  return (
    <div>
      <Hero />
      <SubjectsSection />
      <AcademicStructure />
      <FeaturesSection />
      <AdmissionSection />
    </div>
  );
};

// About Page
const About = () => {
  return (
    <div className="pt-20">
      <section className="py-20 md:py-32 bg-gradient-to-br from-blue-50 to-white" data-testid="about-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-blue-950 mb-6" data-testid="about-heading">
              About Circle Concept School
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Forging the next generation of scientists and engineers through disciplined excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <img 
                src="https://images.pexels.com/photos/33795299/pexels-photo-33795299.jpeg"
                alt="Campus"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col justify-center"
            >
              <h2 className="text-3xl font-bold text-blue-950 mb-6">Our Philosophy</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Circle Concept Higher Secondary School is dedicated to providing world-class education that seamlessly 
                integrates CHSE Board curriculum with intensive JEE and NEET preparation. We believe in a holistic 
                approach where academic excellence meets character development.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Our residential program ensures students receive round-the-clock academic support in a disciplined, 
                focused environment. With limited batch sizes, every student receives personalized attention from 
                experienced faculty who have themselves cracked these prestigious examinations.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We don't just prepare students for exams; we prepare them for life. Through our comprehensive mentorship 
                program, career counseling, and performance analytics, we ensure each student reaches their full potential.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="border-l-4 border-l-blue-600" data-testid="mission-card">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-950">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  To empower young minds with the knowledge, skills, and confidence to excel in board examinations 
                  and competitive entrance tests, while nurturing their overall personality development.
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-yellow-500" data-testid="vision-card">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-950">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  To be recognized as India's premier residential institution for integrated science education, 
                  producing future engineers and doctors who contribute meaningfully to society.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

// Faculty Page
const Faculty = () => {
  return (
    <div className="pt-20">
      <section className="py-20 md:py-32" data-testid="faculty-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-blue-950 mb-6" data-testid="faculty-heading">
              Our Expert Faculty
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Learn from IIT and NEET graduates who have first-hand experience in cracking competitive examinations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="hover-lift" data-testid="faculty-highlight-1">
              <CardHeader>
                <div className="bg-gradient-to-br from-blue-900 to-blue-950 text-yellow-400 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                  <GraduationCap className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl font-bold text-blue-950">IIT Alumni Faculty</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  Our Physics and Mathematics faculty consist of IIT graduates who bring real exam experience and 
                  proven strategies. They understand the mindset required to crack JEE and impart the same to students 
                  through systematic training and regular practice sessions.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift" data-testid="faculty-highlight-2">
              <CardHeader>
                <div className="bg-gradient-to-br from-blue-900 to-blue-950 text-yellow-400 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                  <FlaskConical className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl font-bold text-blue-950">NEET Specialist Faculty</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  Our Chemistry and Biology faculty are NEET qualified medical graduates who know exactly what it takes 
                  to succeed. Their in-depth subject knowledge combined with exam-oriented teaching methodology ensures 
                  comprehensive NEET preparation.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-blue-50 to-white border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-blue-950">Faculty Strengths</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "15+ years of combined teaching experience",
                  "Personalized doubt clearing sessions",
                  "Regular performance monitoring and feedback",
                  "Exam strategy and time management training",
                  "Subject-specific problem-solving techniques",
                  "Mentorship beyond academics",
                  "Updated with latest exam patterns",
                  "Individual attention to every student"
                ].map((strength, index) => (
                  <div key={index} className="flex items-start gap-3" data-testid={`faculty-strength-${index}`}>
                    <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-700">{strength}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

// Academics Page
const Academics = () => {
  return (
    <div className="pt-20">
      <section className="py-20 md:py-32 bg-gradient-to-br from-slate-50 to-white" data-testid="academics-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-blue-950 mb-6" data-testid="academics-heading">
              Academic Excellence
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive curriculum designed for success in both board and competitive examinations
            </p>
          </motion.div>

          <SubjectsSection />
          <AcademicStructure />
        </div>
      </section>
    </div>
  );
};

// Admissions Page
const Admissions = () => {
  const [formData, setFormData] = useState({
    student_name: "",
    parent_name: "",
    phone: "",
    email: "",
    previous_school: "",
    preferred_stream: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API}/enquiry`, formData);
      toast.success("Application submitted successfully! We'll contact you soon.");
      setFormData({
        student_name: "",
        parent_name: "",
        phone: "",
        email: "",
        previous_school: "",
        preferred_stream: "",
        message: ""
      });
    } catch (error) {
      toast.error("Failed to submit application. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-20">
      <section className="py-20 md:py-32" data-testid="admissions-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-block bg-yellow-400 text-blue-950 font-bold px-6 py-2 rounded-full mb-6 text-sm">
              🎓 ADMISSION OPEN FOR 2026-28 BATCH
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-blue-950 mb-6" data-testid="admissions-heading">
              Apply for Admission
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Take the first step towards your dream career. Fill out the enquiry form below.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-blue-950">Enquiry Form</CardTitle>
                  <CardDescription>Fill in your details and we'll get back to you shortly</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6" data-testid="enquiry-form">
                    <div>
                      <Label htmlFor="student_name">Student Name *</Label>
                      <Input
                        id="student_name"
                        name="student_name"
                        data-testid="input-student-name"
                        value={formData.student_name}
                        onChange={handleChange}
                        required
                        placeholder="Enter student's full name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="parent_name">Parent Name *</Label>
                      <Input
                        id="parent_name"
                        name="parent_name"
                        data-testid="input-parent-name"
                        value={formData.parent_name}
                        onChange={handleChange}
                        required
                        placeholder="Enter parent's full name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        data-testid="input-phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        data-testid="input-email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="previous_school">Previous School *</Label>
                      <Input
                        id="previous_school"
                        name="previous_school"
                        data-testid="input-previous-school"
                        value={formData.previous_school}
                        onChange={handleChange}
                        required
                        placeholder="Name of your previous school"
                      />
                    </div>

                    <div>
                      <Label htmlFor="preferred_stream">Preferred Stream *</Label>
                      <Select
                        name="preferred_stream"
                        value={formData.preferred_stream}
                        onValueChange={(value) => setFormData({ ...formData, preferred_stream: value })}
                        required
                      >
                        <SelectTrigger data-testid="select-preferred-stream">
                          <SelectValue placeholder="Select your preferred stream" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PCM (Physics, Chemistry, Mathematics) - JEE">
                            PCM (Physics, Chemistry, Mathematics) - JEE
                          </SelectItem>
                          <SelectItem value="PCB (Physics, Chemistry, Biology) - NEET">
                            PCB (Physics, Chemistry, Biology) - NEET
                          </SelectItem>
                          <SelectItem value="PCMB (All Subjects) - JEE & NEET">
                            PCMB (All Subjects) - JEE & NEET
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Additional Message (Optional)</Label>
                      <Textarea
                        id="message"
                        name="message"
                        data-testid="input-message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Any specific queries or requirements"
                        rows={4}
                      />
                    </div>

                    <Button
                      type="submit"
                      data-testid="submit-enquiry-button"
                      disabled={loading}
                      className="w-full bg-yellow-500 text-blue-950 hover:bg-yellow-400 font-bold py-6 text-lg"
                    >
                      {loading ? "Submitting..." : "Submit Application"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <Card className="bg-gradient-to-br from-blue-900 to-blue-950 text-white border-0">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Admission Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3" data-testid="admission-info-session">
                    <Calendar className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-yellow-400">Session Start</p>
                      <p className="text-white/90">June 2026</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3" data-testid="admission-info-seats">
                    <Users className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-yellow-400">Limited Seats</p>
                      <p className="text-white/90">Only 60 seats available</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3" data-testid="admission-info-class">
                    <GraduationCap className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-yellow-400">Class Offered</p>
                      <p className="text-white/90">Class XI (Science Stream)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-blue-950">Eligibility Criteria</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    "Class X Passed from recognized board",
                    "Minimum 70% marks in Science & Mathematics",
                    "Clear admission test",
                    "Successful personal interview"
                  ].map((criteria, index) => (
                    <div key={index} className="flex items-start gap-3" data-testid={`eligibility-criteria-${index}`}>
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-slate-700">{criteria}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-blue-950">Contact Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-slate-700">9124588491, 9124588492, 9124588493</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-700">info@circleschool.live</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Notice Board Page
const NoticeBoardPage = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get(`${API}/notices`);
        setNotices(response.data);
      } catch (error) {
        console.error("Failed to fetch notices:", error);
        toast.error("Failed to load notices");
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className="pt-20">
      <section className="py-20 md:py-32" data-testid="notice-board-page">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-blue-950 mb-6" data-testid="notices-heading">
              Notice Board
            </h1>
            <p className="text-xl text-slate-600">
              Stay updated with the latest announcements and important information
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-slate-600">Loading notices...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {notices.map((notice, index) => (
                <motion.div
                  key={notice.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  data-testid={`notice-${notice.id}`}
                >
                  <Card className="hover-lift">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              notice.category === 'Admission' ? 'bg-green-100 text-green-700' :
                              notice.category === 'Examination' ? 'bg-blue-100 text-blue-700' :
                              'bg-purple-100 text-purple-700'
                            }`}>
                              {notice.category}
                            </span>
                          </div>
                          <CardTitle className="text-2xl font-bold text-blue-950">
                            {notice.title}
                          </CardTitle>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Clock className="h-4 w-4" />
                            {notice.date}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 leading-relaxed">{notice.content}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/notices" element={<NoticeBoardPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
