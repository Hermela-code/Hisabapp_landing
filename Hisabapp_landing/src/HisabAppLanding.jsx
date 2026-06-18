import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, BarChart2, Shield, Clock, MapPin, 
  Users, Package, ArrowRight, TrendingUp, ShoppingCart, 
  ArrowDown, CheckCircle2, Mail, ChevronRight, Building, Image as ImageIcon
} from 'lucide-react';

// --- ANIMATION WRAPPER COMPONENT (For Scroll) ---
const RevealOnScroll = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px"
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
      style={{ transitionDelay: `${isVisible ? delay : 0}ms` }}
    >
      {children}
    </div>
  );
};

// --- ANIMATION COMPONENT (For Chat Clicks) ---
const FadeInChat = ({ children, delay = 0, trigger }) => {
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    setShow(false); // Reset state when trigger changes
    const timer = setTimeout(() => setShow(true), 50 + delay);
    return () => clearTimeout(timer);
  }, [trigger, delay]);

  return (
    <div className={`transition-all duration-500 ease-out ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {children}
    </div>
  );
};

// Custom SVG component for LinkedIn
const Linkedin = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const Navbar = () => (
  <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full bg-white relative z-50">
    {/* Left Side: Small Logo & Name */}
    <div className="flex items-center gap-2 relative z-10">
      <div className="relative flex items-center justify-center h-7">
        <img 
          src="/src/assets/logo.png" 
          alt="HisabApp Logo" 
          className="h-full w-auto object-contain relative z-10"
          onError={(e) => { 
            e.target.style.display = 'none'; 
            e.target.nextElementSibling.style.display = 'flex'; 
          }}
        />
        {/* Fallback 'H' if logo.png is missing */}
        <div className="hidden h-7 w-7 bg-orange-600 rounded-md items-center justify-center text-white font-bold text-sm z-0">
          H
        </div>
      </div>
      <span className="font-bold text-xl tracking-tight text-slate-900">HisabApp</span>
    </div>

    {/* Center: Perfectly Aligned Links */}
    <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8 text-sm font-medium text-slate-600 w-max">
      <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
      <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How It Works</a>
      <a href="#intelligence" className="hover:text-slate-900 transition-colors">Intelligence</a>
      <a href="#about" className="hover:text-slate-900 transition-colors">About</a>
    </div>

    {/* Right Side: Spacer */}
    <div className="w-8 relative z-10"></div>
  </nav>
);

const Hero = () => (
  <section className="px-8 pt-16 pb-32 max-w-5xl mx-auto w-full flex flex-col items-center text-center bg-white overflow-hidden">
    
    <RevealOnScroll className="w-full flex justify-center mb-8">
      {/* Centered Main Logo - Decreased Size */}
      <div className="w-48 md:w-64 h-auto flex items-center justify-center">
        <img 
          src="/src/assets/logo.jpg" 
          alt="HisabApp Logo" 
          className="w-full h-auto object-contain drop-shadow-sm" 
          onError={(e) => { 
            e.target.style.display = 'none'; 
            e.target.nextElementSibling.style.display = 'flex'; 
          }}
        />
        {/* Fallback just in case the image isn't loaded yet */}
        <div className="hidden flex-col items-center justify-center text-slate-400 py-12">
          <ImageIcon size={48} className="mb-4 text-slate-300" />
          <span className="font-medium text-sm">Image not found</span>
          <span className="text-xs mt-2 text-slate-400">Check if logo.jpg is in src/assets/</span>
        </div>
      </div>
    </RevealOnScroll>

    <RevealOnScroll delay={150} className="space-y-8 flex flex-col items-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-200 bg-orange-50">
        <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
        <span className="text-xs font-bold text-orange-600 tracking-wider uppercase">AI-Powered Business OS</span>
      </div>
      
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-slate-900">
        Welcome to <span className="text-orange-500">HisabApp</span>
      </h1>
      
      {/* Expanded max-width (max-w-3xl) to force 1 or 2 lines on desktop */}
      <p className="text-lg text-slate-500 leading-relaxed max-w-3xl">
        HisabApp uses AI to help business owners create branches, assign staff, manage inventory, track sales, monitor profits, and receive real-time business intelligence.
      </p>
      
      <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-medium transition-transform hover:scale-105 active:scale-95 duration-200 shadow-lg shadow-orange-500/30 mt-4">
        Get Started
      </button>
    </RevealOnScroll>
  </section>
);

const TimelineSection = () => (
  <section className="py-24 bg-slate-50/50 border-t border-slate-100 overflow-hidden">
    <RevealOnScroll className="max-w-3xl mx-auto px-8 text-center mb-16">
      <h4 className="text-orange-500 text-xs font-bold tracking-widest uppercase mb-3">AI Setup</h4>
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Setup Your Business Like a<br/>Conversation</h2>
      <p className="text-slate-500">No forms, no configurations. Just tell HisabApp about your business and watch it build everything for you.</p>
    </RevealOnScroll>
    
    <div className="max-w-2xl mx-auto px-8 space-y-4 relative">
      <div className="absolute left-14 top-8 bottom-8 w-px bg-slate-200 -z-10 hidden md:block"></div>
      
      {[
        { step: 1, title: "Describe Business", icon: <MessageSquare size={18}/>, color: "text-orange-500", bg: "bg-orange-50" },
        { step: 2, title: "AI Understands Requirements", icon: <Shield size={18}/>, color: "text-slate-600", bg: "bg-slate-100" },
        { step: 3, title: "AI Creates Branches", icon: <MapPin size={18}/>, color: "text-orange-500", bg: "bg-orange-50" },
        { step: 4, title: "AI Assigns Staff", icon: <Users size={18}/>, color: "text-slate-600", bg: "bg-slate-100" },
        { step: 5, title: "AI Builds Inventory", icon: <Package size={18}/>, color: "text-orange-500", bg: "bg-orange-50" },
        { step: 6, title: "Business Ready", icon: <CheckCircle2 size={18}/>, color: "text-emerald-500", bg: "bg-emerald-50" },
      ].map((item, i) => (
        <RevealOnScroll key={i} delay={i * 100} className="flex items-center gap-6">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center border border-white shadow-sm shrink-0 ${item.bg} ${item.color}`}>
            {item.icon}
          </div>
          <div className="bg-white border border-slate-100 p-4 rounded-xl flex-1 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Step {item.step}</p>
            <h4 className="font-semibold text-slate-900 text-sm">{item.title}</h4>
          </div>
        </RevealOnScroll>
      ))}
    </div>
  </section>
);

const HowItWorksSection = () => {
  const steps = [
    { num: "01", title: "Owner Creates Business", desc: "Start by describing your business type and location.", icon: <Building size={20} /> },
    { num: "02", title: "AI Creates Branches", desc: "HisabApp structures your multi-location setup automatically.", icon: <MapPin size={20} /> },
    { num: "03", title: "AI Assigns Cashiers", desc: "Invite staff via email with role-based access controls.", icon: <Mail size={20} /> },
    { num: "04", title: "Add Products with AI", desc: "Cashiers add products guided by intelligent suggestions.", icon: <Package size={20} /> },
    { num: "05", title: "Sales Are Recorded", desc: "Every transaction is captured and synced in real-time.", icon: <ShoppingCart size={20} /> },
    { num: "06", title: "Analytics Update Live", desc: "Dashboards reflect real-time business performance.", icon: <BarChart2 size={20} /> },
  ];

  return (
    <section className="py-24 bg-white border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <RevealOnScroll className="text-center mb-16">
          <h4 className="text-orange-500 text-xs font-bold tracking-widest uppercase mb-3">How It Works</h4>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">From Setup to Insights in Minutes</h2>
        </RevealOnScroll>
        
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <RevealOnScroll key={i} delay={i * 100} className="p-8 rounded-2xl border border-slate-100 shadow-sm bg-white hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="text-orange-500">{step.icon}</div>
                <span className="text-slate-300 text-xs font-bold">{step.num}</span>
              </div>
              <h3 className="font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

const DashboardSection = () => (
  <section className="bg-slate-900 text-white py-24 overflow-hidden">
    <div className="max-w-7xl mx-auto px-8">
      <RevealOnScroll className="text-center mb-16">
        <h4 className="text-orange-500 text-xs font-bold tracking-widest uppercase mb-3">Real-Time Intelligence</h4>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Every Sale Becomes Business<br/>Intelligence</h2>
        <p className="text-slate-400">Watch your business metrics update in real-time with every transaction.</p>
      </RevealOnScroll>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {[
          { label: "Revenue", value: "ETB 847K", trend: "+18.2%", up: true, icon: "$" },
          { label: "Profit", value: "ETB 312K", trend: "+12.7%", up: true, icon: <TrendingUp size={16}/> },
          { label: "Expenses", value: "ETB 535K", trend: "-3.4%", up: false, icon: <ArrowDown size={16}/> }
        ].map((stat, i) => (
          <RevealOnScroll key={i} delay={i * 100} className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl hover:bg-slate-800 transition-colors">
            <div className="flex justify-between items-start mb-8">
              <span className="text-orange-500">{stat.icon}</span>
              <span className={`text-xs font-medium px-2 py-1 rounded-md bg-slate-900 ${stat.up ? 'text-emerald-400' : 'text-red-400'}`}>
                {stat.up ? '↗' : '↘'} {stat.trend}
              </span>
            </div>
            <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </RevealOnScroll>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <RevealOnScroll delay={200} className="md:col-span-2 bg-slate-800/50 border border-slate-700 p-6 rounded-2xl min-h-[300px]">
           <div className="flex justify-between items-center mb-8">
             <div>
               <p className="text-slate-400 text-sm">Sales Trend</p>
               <h3 className="text-xl font-bold">Weekly Performance</h3>
             </div>
             <div className="flex gap-2 bg-slate-800 p-1 rounded-lg">
               <button className="bg-orange-500 text-white px-3 py-1 text-xs rounded-md shadow-sm">1W</button>
               <button className="text-slate-400 px-3 py-1 text-xs hover:text-white transition-colors">1M</button>
             </div>
           </div>
           <div className="h-48 border-b border-slate-700 relative flex items-end">
              <svg className="w-full h-full drop-shadow-md" viewBox="0 0 100 40" preserveAspectRatio="none">
                <path d="M0,30 Q20,25 40,35 T80,20 T100,25 L100,40 L0,40 Z" fill="rgba(249, 115, 22, 0.1)"/>
                <path className="animate-[dash_3s_linear_forwards]" d="M0,30 Q20,25 40,35 T80,20 T100,25" fill="none" stroke="#f97316" strokeWidth="1"/>
              </svg>
           </div>
           <div className="flex justify-between text-xs text-slate-500 mt-4">
             <span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
           </div>
        </RevealOnScroll>
        
        <div className="space-y-6">
          <RevealOnScroll delay={300} className="bg-slate-800/50 border border-slate-700 p-5 rounded-2xl hover:translate-x-2 transition-transform">
            <Package className="text-orange-500 mb-4" size={18}/>
            <p className="text-slate-400 text-xs uppercase mb-1">Top Product</p>
            <p className="font-bold text-sm">Ethiopian Coffee 500g</p>
            <p className="text-slate-500 text-xs">1,240 units sold</p>
          </RevealOnScroll>
          <RevealOnScroll delay={400} className="bg-slate-800/50 border border-slate-700 p-5 rounded-2xl hover:translate-x-2 transition-transform">
            <Users className="text-orange-500 mb-4" size={18}/>
            <p className="text-slate-400 text-xs uppercase mb-1">Top Cashier</p>
            <p className="font-bold text-sm">Abebe Kebede</p>
            <p className="text-slate-500 text-xs">487 transactions</p>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  </section>
);

const AIAssistantSection = () => {
  const [activeId, setActiveId] = useState(1);

  const queries = [
    {
      id: 1,
      q: "Which branch generated the highest profit this week?",
      icon: <TrendingUp size={16} />,
      ans: "Bole Branch generated the highest profit this week at ETB 142,300 — a 23% increase from last week. Megenagna Branch follows at ETB 98,700."
    },
    {
      id: 2,
      q: "Which products are running low?",
      icon: <Package size={16} />,
      ans: "3 products need restocking: Ethiopian Coffee 500g (12 units left), Teff Flour 1kg (8 units), and Berbere Spice 250g (5 units). Would you like me to create purchase orders?"
    },
    {
      id: 3,
      q: "Who is my top-performing cashier?",
      icon: <Users size={16} />,
      ans: "Abebe Kebede at Bole Branch leads with 487 transactions this week, averaging ETB 1,734 per transaction. Customer satisfaction rating: 4.8/5."
    },
    {
      id: 4,
      q: "Summarize today's performance.",
      icon: <BarChart2 size={16} />,
      ans: "Today's total revenue: ETB 127,400 across 3 branches. Profit margin: 34.2%. Top product: Ethiopian Coffee (187 units). All branches are performing above weekly average."
    }
  ];

  const activeQuery = queries.find(q => q.id === activeId);

  return (
    <section className="py-24 bg-slate-50/50 border-y border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <RevealOnScroll className="text-center mb-16">
          <h4 className="text-orange-500 text-xs font-bold tracking-widest uppercase mb-3">AI Assistant</h4>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Ask Questions About Your Business</h2>
          <p className="text-slate-500">Get instant answers powered by your real-time business data.</p>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-3">
            {queries.map((item, i) => {
              const isActive = activeId === item.id;
              return (
                <RevealOnScroll key={item.id} delay={i * 100}>
                  <button
                    onClick={() => setActiveId(item.id)}
                    className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all duration-200 border text-left cursor-pointer group ${
                      isActive 
                        ? 'bg-white border-orange-200 shadow-sm' 
                        : 'bg-transparent border-transparent hover:bg-slate-100/50 hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`transition-colors ${isActive ? 'text-orange-500' : 'text-slate-400 group-hover:text-slate-500'}`}>
                        {item.icon}
                      </div>
                      <span className={`text-sm font-medium transition-colors ${isActive ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-700'}`}>
                        "{item.q}"
                      </span>
                    </div>
                    <ChevronRight size={16} className={`transition-transform duration-200 ${isActive ? 'text-orange-500 translate-x-1' : 'text-slate-300 opacity-0 group-hover:opacity-100'}`} />
                  </button>
                </RevealOnScroll>
              );
            })}
          </div>

          <RevealOnScroll delay={200}>
            <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 min-h-[300px] flex flex-col justify-center transition-all duration-500">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    HisabApp AI <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  </h3>
                </div>
              </div>

              <div className="space-y-6">
                <FadeInChat trigger={activeId} delay={0}>
                  <div className="flex justify-end">
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl rounded-tr-sm px-5 py-3 text-sm text-slate-700 max-w-[85%]">
                      {activeQuery.q}
                    </div>
                  </div>
                </FadeInChat>
                
                <FadeInChat trigger={activeId} delay={200}>
                  <div className="flex justify-start">
                    <div className="bg-slate-900 text-white rounded-2xl rounded-tl-sm px-5 py-4 text-sm max-w-[90%] leading-relaxed shadow-md">
                      {activeQuery.ans}
                    </div>
                  </div>
                </FadeInChat>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

const RoadmapSection = () => (
  <section className="py-24 bg-white overflow-hidden">
    <div className="max-w-4xl mx-auto px-8">
      <RevealOnScroll className="text-center mb-16">
        <h4 className="text-orange-500 text-xs font-bold tracking-widest uppercase mb-3">Roadmap</h4>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Where We're Headed</h2>
      </RevealOnScroll>
      
      <div className="grid md:grid-cols-2 gap-8">
        <RevealOnScroll delay={100} className="p-8 rounded-2xl border border-slate-100 shadow-sm bg-white hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
              <CheckCircle2 size={16} />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Live Now</h3>
          </div>
          <ul className="space-y-4">
            {["AI Setup Assistant", "Branch Management", "Inventory Management", "Sales Tracking", "Analytics Dashboard"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-600 text-sm">
                <CheckCircle2 size={16} className="text-emerald-400" /> {item}
              </li>
            ))}
          </ul>
        </RevealOnScroll>

        <RevealOnScroll delay={200} className="p-8 rounded-2xl border border-slate-100 shadow-sm bg-white hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
              <Clock size={16} />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Coming Soon</h3>
          </div>
          <ul className="space-y-4">
            {["Voice-based AI Assistant", "Predictive Inventory Forecasting", "Supplier Management", "AI Financial Advisor", "Amharic Voice Commands"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-500 text-sm">
                <Clock size={14} className="text-orange-300" /> {item}
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </div>
    </div>
  </section>
);

const FoundersSection = () => (
  <section className="py-24 bg-slate-50 border-t border-slate-100 overflow-hidden">
    <div className="max-w-4xl mx-auto px-8 text-center">
      <RevealOnScroll>
        <h4 className="text-orange-500 text-xs font-bold tracking-widest uppercase mb-3">Team</h4>
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-slate-900">Meet The Founders</h2>
      </RevealOnScroll>
      
      <div className="grid md:grid-cols-2 gap-12">
        <RevealOnScroll delay={100} className="flex flex-col items-center group">
          <div className="w-48 h-48 rounded-3xl bg-slate-200 mb-6 overflow-hidden shadow-md group-hover:shadow-xl transition-all group-hover:-translate-y-2 duration-300 flex items-center justify-center">
             <img 
               src="/src/assets/hermela.png" 
               alt="Hermela Girma" 
               className="w-full h-full object-cover"
               onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.classList.add('bg-slate-300') }}
             />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Hermela Girma</h3>
          <p className="text-orange-500 text-sm font-medium mb-4">Co-Founder & Product Engineer</p>
          <p className="text-slate-500 text-sm max-w-xs mb-6">Building the technology that makes business management effortless through AI and natural language.</p>
          <div className="flex gap-3">
            <a href="https://www.linkedin.com/in/hermela-girma-88a029325" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-orange-500 hover:border-orange-500 transition-colors cursor-pointer">
              <Linkedin size={14}/>
            </a>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={200} className="flex flex-col items-center group">
          <div className="w-48 h-48 rounded-3xl bg-slate-200 mb-6 overflow-hidden shadow-md group-hover:shadow-xl transition-all group-hover:-translate-y-2 duration-300 flex items-center justify-center">
             <img 
               src="/src/assets/gelila.png" 
               alt="Gelila" 
               className="w-full h-full object-cover"
               onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.classList.add('bg-slate-300') }}
             />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Gelila Sintayehu</h3>
          <p className="text-orange-500 text-sm font-medium mb-4">Co-Founder & Business Strategy Lead</p>
          <p className="text-slate-500 text-sm max-w-xs mb-6">Driving the vision to empower millions of African businesses with intelligent operating tools.</p>
          <div className="flex gap-3">
            <a href="https://www.linkedin.com/in/gelila-sintayehu-5bb594357/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-orange-500 hover:border-orange-500 transition-colors cursor-pointer">
              <Linkedin size={14}/>
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="bg-[#0f172a] py-32 text-center text-white overflow-hidden relative">
    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"></div>
    <RevealOnScroll className="max-w-3xl mx-auto px-8 relative z-10">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
        Ready To Run Your Business<br/>
        <span className="text-orange-500">Smarter?</span>
      </h2>
      <p className="text-slate-400 mb-10 text-lg">
        Manage branches, inventory, sales, and performance from a single AI-powered platform.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-medium transition-transform hover:scale-105 active:scale-95 duration-200 flex items-center gap-2 w-full sm:w-auto justify-center shadow-lg shadow-orange-500/30">
          Request Demo <ArrowRight size={16} />
        </button>
        <button className="bg-transparent border border-slate-700 hover:bg-slate-800 text-white px-8 py-3 rounded-full font-medium transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
          <Mail size={16} /> Contact Us
        </button>
      </div>
    </RevealOnScroll>
  </section>
);

const Footer = () => (
  <footer className="bg-white border-t border-slate-100 pt-16 pb-8 overflow-hidden">
    <div className="max-w-7xl mx-auto px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <RevealOnScroll className="md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="relative flex items-center justify-center h-6">
              <img 
                src="/src/assets/logo.png" 
                alt="HisabApp Logo" 
                className="h-full w-auto object-contain relative z-10"
                onError={(e) => { 
                  e.target.style.display = 'none'; 
                  e.target.nextElementSibling.style.display = 'flex'; 
                }}
              />
              <div className="hidden h-6 w-6 bg-orange-600 rounded-md items-center justify-center text-white font-bold text-xs z-0">
                H
              </div>
            </div>
            <span className="font-bold text-xl text-slate-900 tracking-tight">HisabApp</span>
          </div>
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            The AI-powered business operating system for small and medium businesses across Africa.
          </p>
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-orange-500 hover:border-orange-500 cursor-pointer transition-all hover:-translate-y-1"><Linkedin size={16}/></div>
            <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-orange-500 hover:border-orange-500 cursor-pointer transition-all hover:-translate-y-1"><Mail size={16}/></div>
          </div>
        </RevealOnScroll>
        
        <RevealOnScroll delay={100}>
          <h4 className="font-bold text-xs tracking-wider text-slate-400 uppercase mb-6">Product</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><a href="#" className="hover:text-orange-500 transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">How It Works</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">AI Assistant</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Analytics</a></li>
          </ul>
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <h4 className="font-bold text-xs tracking-wider text-slate-400 uppercase mb-6">Company</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><a href="#" className="hover:text-orange-500 transition-colors">About</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Founders</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Vision</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Roadmap</a></li>
          </ul>
        </RevealOnScroll>

        <RevealOnScroll delay={300}>
          <h4 className="font-bold text-xs tracking-wider text-slate-400 uppercase mb-6">Connect</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><a href="#" className="hover:text-orange-500 transition-colors">LinkedIn</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Email</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors font-medium">Request Demo</a></li>
          </ul>
        </RevealOnScroll>
      </div>

      <RevealOnScroll delay={400} className="border-t border-slate-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <p>© 2026 HisabApp. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
        </div>
      </RevealOnScroll>
    </div>
  </footer>
);

export default function HisabAppLanding() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-orange-100 selection:text-orange-900 scroll-smooth overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <TimelineSection />
        <HowItWorksSection />
        <DashboardSection />
        <AIAssistantSection />
        <RoadmapSection />
        <FoundersSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}