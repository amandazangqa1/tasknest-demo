import React, { useState } from 'react';
import { Users, Briefcase, Shield, MapPin, DollarSign, Calendar, Clock, CheckCircle, Star, Wallet, TrendingUp, Search, Menu, X, ChevronRight, Award, Bell, ArrowLeft, Send, MessageSquare, Upload } from 'lucide-react';

export default function TaskNestDemo() {
  const [currentView, setCurrentView] = useState('landing');
  const [userRole, setUserRole] = useState(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    budget: '',
    location: '',
    deadline: '',
    category: ''
  });
  const [postedTask, setPostedTask] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [taskInProgress, setTaskInProgress] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // TaskNest Logo Component
  const TaskNestLogo = ({ size = 'md' }) => {
    const sizes = {
      sm: 'w-8 h-8',
      md: 'w-12 h-12',
      lg: 'w-16 h-16'
    };
    return (
      <svg className={sizes[size]} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer circle */}
        <circle cx="100" cy="100" r="85" stroke="currentColor" strokeWidth="6"/>
        
        {/* Anchor shape */}
        <path d="M100 50 L100 130" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
        <path d="M70 130 L100 130 L130 130" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
        <circle cx="100" cy="55" r="8" fill="currentColor"/>
        
        {/* Nest/wave layers below anchor */}
        <path d="M55 140 Q100 170 145 140" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none"/>
        <path d="M60 150 Q100 175 140 150" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none"/>
        <path d="M65 160 Q100 180 135 160" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none"/>
      </svg>
    );
  };

  const showNotif = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const offers = [
    { id: 1, taskerName: 'Thabo Mokwena', rating: 4.9, completedTasks: 87, price: 'R850', proposal: 'I have 5+ years of electrical work experience. Can complete this in 2 hours.', availability: 'Available today', verified: true },
    { id: 2, taskerName: 'Nomvula Dlamini', rating: 4.7, completedTasks: 54, price: 'R950', proposal: 'Licensed electrician with insurance. Will bring all necessary tools.', availability: 'Available tomorrow', verified: true },
    { id: 3, taskerName: 'Sipho Ndlovu', rating: 4.8, completedTasks: 112, price: 'R800', proposal: 'Quick and reliable service. Can start immediately if needed.', availability: 'Available today', verified: true }
  ];

  const categories = ['Home Repair', 'Cleaning', 'Moving', 'Outdoor', 'Assembly', 'Digital', 'Other'];

  // common frosted panel class - DARKENED for better text visibility
  const FROST = "bg-black/40 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg text-white";

  const LandingView = () => (
    <div className="w-full min-h-screen bg-transparent">
      <nav className={`${FROST} border-b border-white/20`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <TaskNestLogo size="md" />
            <span className="text-2xl font-bold text-white">TaskNest</span>
          </div>
          <div className="flex space-x-4">
            <button className="px-4 py-2 text-white hover:bg-white/20 rounded-lg transition">Login</button>
            <button className="px-4 py-2 bg-white text-cyan-900 rounded-lg font-semibold hover:bg-gray-100 transition">Sign Up</button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-6xl font-bold text-white mb-6">Get Things Done with <span className="text-cyan-200">TaskNest</span></h1>
        <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">Connect with skilled professionals for any task. Post a job or find work — all in one trusted marketplace.</p>
        
        <div className="flex justify-center space-x-6 mb-16">
          <button onClick={() => { setUserRole('requester'); setCurrentView('requester-dashboard'); }} className="group px-8 py-4 bg-white text-gray-800 rounded-xl font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all">
            <Users className="inline-block w-6 h-6 mr-2 text-cyan-900" />I Need Help (Guest)<ChevronRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition" />
          </button>
          <button onClick={() => { setUserRole('tasker'); setCurrentView('tasker-dashboard'); }} className="group px-8 py-4 bg-cyan-700 text-white rounded-xl font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all">
            <Briefcase className="inline-block w-6 h-6 mr-2" />I Want to Work (Guest)<ChevronRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-8 mt-16 mb-20">
          <div className={`${FROST} p-8`}>
            <Shield className="w-12 h-12 text-cyan-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Secure Platform</h3>
            <p className="text-white/80">Protected payments and verified users</p>
          </div>
          <div className={`${FROST} p-8`}>
            <Clock className="w-12 h-12 text-cyan-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Fast Matching</h3>
            <p className="text-white/80">Get offers within minutes of posting</p>
          </div>
          <div className={`${FROST} p-8`}>
            <Award className="w-12 h-12 text-cyan-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Quality Service</h3>
            <p className="text-white/80">Rated professionals you can trust</p>
          </div>
        </div>

        {/* Popular Task Categories Section */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-white mb-3">Popular Task Categories</h2>
            <p className="text-xl text-white/80">From home repairs to errands, we've got you covered</p>
          </div>
          <div className="grid grid-cols-4 gap-6">
            <div className={`${FROST} p-6 hover:shadow-2xl transform hover:-translate-y-2 transition-all cursor-pointer group`}>
              <div className="w-16 h-16 bg-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-cyan-500 transition">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white text-center mb-2">Home Repair</h3>
              <p className="text-white/70 text-sm text-center">Plumbing, electrical, painting & more</p>
            </div>
            
            <div className={`${FROST} p-6 hover:shadow-2xl transform hover:-translate-y-2 transition-all cursor-pointer group`}>
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500 transition">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white text-center mb-2">Cleaning</h3>
              <p className="text-white/70 text-sm text-center">Home, office & deep cleaning services</p>
            </div>
            
            <div className={`${FROST} p-6 hover:shadow-2xl transform hover:-translate-y-2 transition-all cursor-pointer group`}>
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500 transition">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white text-center mb-2">Moving & Delivery</h3>
              <p className="text-white/70 text-sm text-center">Furniture, packages & grocery delivery</p>
            </div>
            
            <div className={`${FROST} p-6 hover:shadow-2xl transform hover:-translate-y-2 transition-all cursor-pointer group`}>
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-500 transition">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white text-center mb-2">Outdoor</h3>
              <p className="text-white/70 text-sm text-center">Gardening, landscaping & yard work</p>
            </div>
            
            <div className={`${FROST} p-6 hover:shadow-2xl transform hover:-translate-y-2 transition-all cursor-pointer group`}>
              <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-pink-500 transition">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white text-center mb-2">Assembly</h3>
              <p className="text-white/70 text-sm text-center">Furniture & appliance installation</p>
            </div>
            
            <div className={`${FROST} p-6 hover:shadow-2xl transform hover:-translate-y-2 transition-all cursor-pointer group`}>
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500 transition">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white text-center mb-2">Errands</h3>
              <p className="text-white/70 text-sm text-center">Shopping, queue waiting & pickups</p>
            </div>
            
            <div className={`${FROST} p-6 hover:shadow-2xl transform hover:-translate-y-2 transition-all cursor-pointer group`}>
              <div className="w-16 h-16 bg-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-rose-500 transition">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white text-center mb-2">Other</h3>
              <p className="text-white/70 text-sm text-center">Pet care, events & custom tasks</p>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <div className={`${FROST} p-10 mb-12 text-left`}>
          <h2 className="text-3xl font-bold text-white mb-6 text-center">About TaskNest</h2>
          <p className="text-lg text-white/90 leading-relaxed">
            TaskNest is a South African-born mobile and web platform that connects everyday people with trusted local "taskers" who can run errands and complete small jobs. From deliveries and grocery pickups to queueing and household tasks, TaskNest simplifies daily life while creating income opportunities for unemployed youth and informal workers.
          </p>
        </div>

        {/* Overview Section */}
        <div className={`${FROST} p-10 mb-12 text-left`}>
          <h2 className="text-3xl font-bold text-white mb-6 text-center">About TaskNest</h2>
          <p className="text-lg text-white/90 leading-relaxed">
            TaskNest is a South African-born mobile and web platform that connects everyday people with trusted local "taskers" who can run errands and complete small jobs. From deliveries and grocery pickups to queueing and household tasks, TaskNest simplifies daily life while creating income opportunities for unemployed youth and informal workers.
          </p>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-2 gap-8 mb-20">
          <div className={`${FROST} p-8 text-left`}>
            <h3 className="text-2xl font-bold text-cyan-200 mb-4">Our Mission</h3>
            <p className="text-white/90 leading-relaxed">
              To empower communities by bridging the gap between time-strapped users and capable taskers promoting convenience, trust, and inclusive economic growth in underserved townships.
            </p>
          </div>
          <div className={`${FROST} p-8 text-left`}>
            <h3 className="text-2xl font-bold text-cyan-200 mb-4">Our Vision</h3>
            <p className="text-white/90 leading-relaxed">
              A future where digital platforms unlock opportunities in every corner of South Africa, enabling people to earn, connect, and thrive through community-driven services.
            </p>
          </div>
        </div>

        {/* Meet The Team Section */}
        <div className={`${FROST} p-10`}>
          <h2 className="text-3xl font-bold text-white mb-10">Meet The Team</h2>
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-cyan-600 to-teal-700 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">SK</div>
              <h4 className="text-xl font-bold text-white mb-1">Siyonela Kubukeli</h4>
              <p className="text-cyan-200 font-semibold">Chief Financial Officer</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-cyan-600 to-teal-700 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">AZ</div>
              <h4 className="text-xl font-bold text-white mb-1">Amanda Zangqa</h4>
              <p className="text-cyan-200 font-semibold">Chief Development Officer</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-cyan-600 to-teal-700 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">FN</div>
              <h4 className="text-xl font-bold text-white mb-1">Fiona Ngcamba</h4>
              <p className="text-cyan-200 font-semibold">Chief Operations Officer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`${FROST} py-12`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <TaskNestLogo size="md" />
                <span className="text-xl font-bold text-white">TaskNest</span>
              </div>
              <p className="text-white/70 text-sm">Connecting communities, empowering people.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li className="hover:text-cyan-200 cursor-pointer transition">How It Works</li>
                <li className="hover:text-cyan-200 cursor-pointer transition">Become a Tasker</li>
                <li className="hover:text-cyan-200 cursor-pointer transition">Post a Task</li>
                <li className="hover:text-cyan-200 cursor-pointer transition">Safety & Trust</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li className="hover:text-cyan-200 cursor-pointer transition">About Us</li>
                <li className="hover:text-cyan-200 cursor-pointer transition">Our Team</li>
                <li className="hover:text-cyan-200 cursor-pointer transition">Careers</li>
                <li className="hover:text-cyan-200 cursor-pointer transition">Press</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li className="hover:text-cyan-200 cursor-pointer transition">Help Center</li>
                <li className="hover:text-cyan-200 cursor-pointer transition">Contact Us</li>
                <li className="hover:text-cyan-200 cursor-pointer transition">Terms of Service</li>
                <li className="hover:text-cyan-200 cursor-pointer transition">Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex justify-between items-center">
            <p className="text-white/60 text-sm">© 2025 TaskNest. All rights reserved.</p>
            <div className="flex space-x-6">
              <span className="text-white/60 hover:text-cyan-200 cursor-pointer transition">Facebook</span>
              <span className="text-white/60 hover:text-cyan-200 cursor-pointer transition">Twitter</span>
              <span className="text-white/60 hover:text-cyan-200 cursor-pointer transition">Instagram</span>
              <span className="text-white/60 hover:text-cyan-200 cursor-pointer transition">LinkedIn</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );

  const RequesterDashboard = () => (
    <div className="w-full min-h-screen bg-transparent">
      <nav className={`${FROST} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <TaskNestLogo size="md" />
            <span className="text-2xl font-bold text-white">TaskNest</span>
          </div>
          <div className="flex items-center space-x-6">
            <span className="text-white font-medium">Requester Dashboard</span>
            <Bell className="w-6 h-6 text-white cursor-pointer hover:text-cyan-200" />
            <button onClick={() => setCurrentView('landing')} className="px-4 py-2 text-white hover:bg-white/10 rounded-lg">Logout</button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className={`${FROST} p-6`}>
            <div className="flex items-center justify-between">
              <div><p className="text-white/70 text-sm">Active Tasks</p><p className="text-3xl font-bold text-white">{postedTask ? 1 : 0}</p></div>
              <Briefcase className="w-12 h-12 text-white/40" />
            </div>
          </div>
          <div className={`${FROST} p-6`}>
            <div className="flex items-center justify-between">
              <div><p className="text-white/70 text-sm">Completed</p><p className="text-3xl font-bold text-white">15</p></div>
              <CheckCircle className="w-12 h-12 text-white/40" />
            </div>
          </div>
          <div className={`${FROST} p-6`}>
            <div className="flex items-center justify-between">
              <div><p className="text-white/70 text-sm">Total Spent</p><p className="text-3xl font-bold text-white">R18,900</p></div>
              <Wallet className="w-12 h-12 text-white/40" />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">My Tasks</h2>
          <button onClick={() => setCurrentView('post-task')} className="px-6 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition">+ Post New Task</button>
        </div>

        {!postedTask ? (
          <div className={`${FROST} p-12 text-center`}>
            <Briefcase className="w-16 h-16 text-white/40 mx-auto mb-4" />
            <p className="text-white/70 text-lg mb-4">No active tasks yet</p>
            <button onClick={() => setCurrentView('post-task')} className="px-6 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition">Post Your First Task</button>
          </div>
        ) : (
          <div className={`${FROST} p-6`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{postedTask.title}</h3>
                <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm font-medium">{postedTask.category}</span>
              </div>
              <span className="text-2xl font-bold text-white">R{postedTask.budget}</span>
            </div>
            <p className="text-white/90 mb-4">{postedTask.description}</p>
            <div className="flex items-center justify-between text-sm text-white/70 mb-4">
              <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {postedTask.location}</span>
              <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {postedTask.deadline}</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-white/10">
              <span className="text-white font-semibold">3 offers received</span>
              <button onClick={() => setCurrentView('view-offers')} className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition">View Offers</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const PostTaskView = () => {
    const handleInputChange = (field, value) => {
      setNewTask(prev => ({...prev, [field]: value}));
    };

    return (
      <div className="w-full min-h-screen bg-transparent">
        <nav className={`${FROST} shadow-sm`}>
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button onClick={() => setCurrentView('requester-dashboard')} className="p-2 hover:bg-white/10 rounded-lg"><ArrowLeft className="w-6 h-6 text-white" /></button>
              <div className="flex items-center space-x-2">
                <TaskNestLogo size="md" />
                <span className="text-2xl font-bold text-white">TaskNest</span>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-3xl mx-auto px-6 py-8">
          <h2 className="text-3xl font-bold text-white mb-8">Post a New Task</h2>
          <div className={`${FROST} p-8`}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-white/90 mb-2">Task Title</label>
                <input type="text" value={newTask.title} onChange={(e) => handleInputChange('title', e.target.value)} placeholder="e.g., Install ceiling fan in living room" className="w-full px-4 py-3 border border-white/30 rounded-lg bg-white/5 text-white placeholder-white/60 focus:outline-none focus:border-cyan-300" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white/90 mb-2">Category</label>
                <select value={newTask.category} onChange={(e) => handleInputChange('category', e.target.value)} className="w-full px-4 py-3 border border-white/30 rounded-lg bg-white/5 text-white focus:outline-none focus:border-cyan-300">
                  <option value="" className="text-black">Select a category</option>
                  {categories.map(cat => <option key={cat} value={cat} className="text-black">{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-white/90 mb-2">Description</label>
                <textarea value={newTask.description} onChange={(e) => handleInputChange('description', e.target.value)} placeholder="Describe what needs to be done..." rows="4" className="w-full px-4 py-3 border border-white/30 rounded-lg bg-white/5 text-white placeholder-white/60 focus:outline-none focus:border-cyan-300" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-2">Budget ($)</label>
                  <input type="number" value={newTask.budget} onChange={(e) => handleInputChange('budget', e.target.value)} placeholder="100" className="w-full px-4 py-3 border border-white/30 rounded-lg bg-white/5 text-white placeholder-white/60 focus:outline-none focus:border-cyan-300" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-2">Deadline</label>
                  <input type="text" value={newTask.deadline} onChange={(e) => handleInputChange('deadline', e.target.value)} placeholder="e.g., 2 days, Next week" className="w-full px-4 py-3 border border-white/30 rounded-lg bg-white/5 text-white placeholder-white/60 focus:outline-none focus:border-cyan-300" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-white/90 mb-2">Location</label>
                <input type="text" value={newTask.location} onChange={(e) => handleInputChange('location', e.target.value)} placeholder="e.g., Downtown, Remote" className="w-full px-4 py-3 border border-white/30 rounded-lg bg-white/5 text-white placeholder-white/60 focus:outline-none focus:border-cyan-300" />
              </div>
              <div className="flex space-x-4 pt-4">
                <button onClick={() => setCurrentView('requester-dashboard')} className="flex-1 px-6 py-3 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/5 transition">Cancel</button>
                <button onClick={() => { if (newTask.title && newTask.budget && newTask.category) { setPostedTask({...newTask}); showNotif('✓ Task posted successfully! Taskers are viewing your task now.'); setCurrentView('requester-dashboard'); } else { showNotif('⚠ Please fill in all required fields'); } }} className="flex-1 px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition">Post Task</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ViewOffersView = () => (
    <div className="w-full min-h-screen bg-transparent">
      <nav className={`${FROST} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button onClick={() => setCurrentView('requester-dashboard')} className="p-2 hover:bg-white/10 rounded-lg"><ArrowLeft className="w-6 h-6 text-white" /></button>
            <div className="flex items-center space-x-2">
              <Briefcase className="w-8 h-8 text-white/40" />
              <span className="text-2xl font-bold text-white">TaskNest</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className={`${FROST} p-6 mb-6`}>
          <h3 className="text-2xl font-bold text-white mb-2">{postedTask?.title}</h3>
          <div className="flex items-center space-x-6 text-white/70">
            <span className="flex items-center"><DollarSign className="w-4 h-4 mr-1" /> Budget: ${postedTask?.budget}</span>
            <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {postedTask?.deadline}</span>
            <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {postedTask?.location}</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-6">Offers Received (3)</h2>

        <div className="space-y-4">
          {offers.map(offer => (
            <div key={offer.id} className={`${FROST} p-6 hover:shadow-2xl transition`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">{offer.taskerName.charAt(0)}</div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xl font-bold text-white">{offer.taskerName}</h3>
                      {offer.verified && <CheckCircle className="w-5 h-5 text-cyan-200" />}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-white/75">
                      <span className="flex items-center"><Star className="w-4 h-4 text-yellow-400 mr-1" />{offer.rating} ({offer.completedTasks} tasks)</span>
                      <span className="text-green-300 font-medium">{offer.availability}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-white">{offer.price}</p>
                  <p className="text-sm text-white/70">Offered price</p>
                </div>
              </div>
              <p className="text-white/90 mb-4 bg-white/5 p-4 rounded-lg">{offer.proposal}</p>
              <div className="flex space-x-3">
                <button onClick={() => { setSelectedOffer(offer); setTaskInProgress({...postedTask, tasker: offer.taskerName, price: offer.price}); showNotif('✓ Offer accepted! Task is now in progress.'); setCurrentView('task-tracking'); }} className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Accept Offer</button>
                <button className="px-6 py-3 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/5 transition">Message</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const TaskTrackingView = () => (
    <div className="w-full min-h-screen bg-transparent">
      <nav className={`${FROST} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button onClick={() => setCurrentView('requester-dashboard')} className="p-2 hover:bg-white/10 rounded-lg"><ArrowLeft className="w-6 h-6 text-white" /></button>
            <div className="flex items-center space-x-2">
              <Briefcase className="w-8 h-8 text-white/40" />
              <span className="text-2xl font-bold text-white">TaskNest</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-white mb-8">Task In Progress</h2>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className={`${FROST} p-6`}><p className="text-sm text-white/70 mb-2
