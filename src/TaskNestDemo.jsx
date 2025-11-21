import React, { useState } from 'react';
import { Users, Briefcase, Shield, MapPin, DollarSign, Calendar, Clock, CheckCircle, Star, Wallet, TrendingUp, Search, Menu, X, ChevronRight, Award, Bell, ArrowLeft, Send, MessageSquare, Upload, Home, Sparkles, Truck, Trees, Wrench, Laptop, ShoppingCart, Package } from 'lucide-react';

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

  // Universal background component
  const UniversalBackground = ({ children }) => (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-teal-900 to-slate-900">
      {children}
    </div>
  );

  const TaskNestLogo = ({ size = 'md', color = 'currentColor' }) => {
    const sizes = { sm: 'w-8 h-8', md: 'w-12 h-12', lg: 'w-16 h-16' };
    return (
      <svg className={sizes[size]} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="85" stroke={color} strokeWidth="6"/>
        <path d="M100 50 L100 130" stroke={color} strokeWidth="8" strokeLinecap="round"/>
        <path d="M70 130 L100 130 L130 130" stroke={color} strokeWidth="8" strokeLinecap="round"/>
        <circle cx="100" cy="55" r="8" fill={color}/>
        <path d="M55 140 Q100 170 145 140" stroke={color} strokeWidth="6" strokeLinecap="round" fill="none"/>
        <path d="M60 150 Q100 175 140 150" stroke={color} strokeWidth="6" strokeLinecap="round" fill="none"/>
        <path d="M65 160 Q100 180 135 160" stroke={color} strokeWidth="6" strokeLinecap="round" fill="none"/>
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

  const categories = ['Home Repair', 'Cleaning', 'Moving', 'Outdoor', 'Assembly', 'Other'];

  // Universal Navigation component
  const NavBar = ({ showBack = false, onBack = null, title = null }) => (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {showBack && (
            <button onClick={onBack} className="p-2 hover:bg-white/20 rounded-lg transition">
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
          )}
          <div className="flex items-center space-x-2">
            <TaskNestLogo size="md" color="white" />
            <span className="text-2xl font-bold text-white">TaskNest</span>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          {title && <span className="text-white/80 font-medium">{title}</span>}
          <Bell className="w-6 h-6 text-white/80 cursor-pointer hover:text-white transition" />
          <button onClick={() => setCurrentView('landing')} className="px-4 py-2 text-white hover:bg-white/20 rounded-lg transition">Logout</button>
        </div>
      </div>
    </nav>
  );

  const LandingView = () => (
    <UniversalBackground>
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <TaskNestLogo size="md" color="white" />
            <span className="text-2xl font-bold text-white">TaskNest</span>
          </div>
          <div className="flex space-x-4">
            <button className="px-4 py-2 text-white hover:bg-white/20 rounded-lg transition">Login</button>
            <button className="px-4 py-2 bg-white text-cyan-900 rounded-lg font-semibold hover:bg-gray-100 transition">Sign Up</button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold text-white mb-6">Get Things Done with <span className="text-cyan-400">TaskNest</span></h1>
        <p className="text-xl text-white/90 mb-4 max-w-3xl mx-auto">Connect with skilled professionals for any task. Post a job or find work – all in one trusted marketplace.</p>
        <p className="text-2xl text-cyan-300 mb-12 font-semibold italic">Connecting Communities, One Task At A Time.</p>
        
        <div className="flex justify-center space-x-6 mb-16">
          <button onClick={() => { setUserRole('requester'); setCurrentView('requester-dashboard'); }} className="group px-8 py-4 bg-white text-gray-800 rounded-xl font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all">
            <Users className="inline-block w-6 h-6 mr-2 text-cyan-900" />I Need Help (Guest)<ChevronRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition" />
          </button>
          <button onClick={() => { setUserRole('tasker'); setCurrentView('tasker-dashboard'); }} className="group px-8 py-4 bg-cyan-700 text-white rounded-xl font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all">
            <Briefcase className="inline-block w-6 h-6 mr-2" />I Want to Work (Guest)<ChevronRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-8 mt-16 mb-20">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <Shield className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Secure Platform</h3>
            <p className="text-white/80">Protected payments and verified users</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <Clock className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Fast Matching</h3>
            <p className="text-white/80">Get offers within minutes of posting</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <Award className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Quality Service</h3>
            <p className="text-white/80">Rated professionals you can trust</p>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white mb-4 text-center">Popular Task Categories</h2>
          <p className="text-xl text-white/80 mb-12 text-center">From home repairs to errands, we've got you covered</p>
          
          <div className="grid grid-cols-4 gap-6">
            {[
              { icon: Home, title: 'Home Repair', desc: 'Plumbing, electrical, painting & more', color: 'cyan' },
              { icon: Sparkles, title: 'Cleaning', desc: 'Home, office & deep cleaning services', color: 'teal' },
              { icon: Truck, title: 'Moving & Delivery', desc: 'Furniture, packages & grocery delivery', color: 'purple' },
              { icon: Trees, title: 'Outdoor', desc: 'Gardening, landscaping & yard work', color: 'green' },
              { icon: Wrench, title: 'Assembly', desc: 'Furniture & appliance installation', color: 'orange' },
              { icon: ShoppingCart, title: 'Errands', desc: 'Shopping, queue waiting & pickups', color: 'pink' },
              { icon: Package, title: 'Other', desc: 'Pet care, events & custom tasks', color: 'yellow' }
            ].map((cat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition cursor-pointer text-center group">
                <div className={`w-16 h-16 bg-${cat.color}-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-${cat.color}-500/30 transition`}>
                  <cat.icon className={`w-8 h-8 text-${cat.color}-300`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{cat.title}</h3>
                <p className="text-sm text-white/70">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 border border-white/20 mb-12 text-left">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">About TaskNest</h2>
          <p className="text-lg text-white/90 leading-relaxed">
            TaskNest is a South African-born mobile and web platform that connects everyday people with trusted local "taskers" who can run errands and complete small jobs. From deliveries and grocery pickups to queueing and household tasks, TaskNest simplifies daily life while creating income opportunities for unemployed youth and informal workers.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-20">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-left">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">Our Mission</h3>
            <p className="text-white/90 leading-relaxed">
              To empower communities by bridging the gap between time-strapped users and capable taskers promoting convenience, trust, and inclusive economic growth in underserved townships.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-left">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">Our Vision</h3>
            <p className="text-white/90 leading-relaxed">
              A future where digital platforms unlock opportunities in every corner of South Africa, enabling people to earn, connect, and thrive through community-driven services.
            </p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-10">Meet The Team</h2>
          <div className="grid grid-cols-3 gap-8">
            {[
              { initials: 'SK', name: 'Siyonela Kubukeli', role: 'Chief Financial Officer' },
              { initials: 'AZ', name: 'Amanda Zangqa', role: 'Chief Development Officer' },
              { initials: 'FN', name: 'Fiona Ngcamba', role: 'Chief Operations Officer' }
            ].map((member, i) => (
              <div key={i} className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-cyan-600 to-teal-700 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">{member.initials}</div>
                <h4 className="text-xl font-bold text-white mb-1">{member.name}</h4>
                <p className="text-cyan-400 font-semibold">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="bg-slate-900/50 border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <TaskNestLogo size="md" color="white" />
                <span className="text-xl font-bold text-white">TaskNest</span>
              </div>
              <p className="text-white/70 text-sm">Connecting Communities, One Task At A Time.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li className="hover:text-cyan-400 cursor-pointer transition">How It Works</li>
                <li className="hover:text-cyan-400 cursor-pointer transition">Become a Tasker</li>
                <li className="hover:text-cyan-400 cursor-pointer transition">Post a Task</li>
                <li className="hover:text-cyan-400 cursor-pointer transition">Safety & Trust</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li className="hover:text-cyan-400 cursor-pointer transition">About Us</li>
                <li className="hover:text-cyan-400 cursor-pointer transition">Our Team</li>
                <li className="hover:text-cyan-400 cursor-pointer transition">Careers</li>
                <li className="hover:text-cyan-400 cursor-pointer transition">Press</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li className="hover:text-cyan-400 cursor-pointer transition">Help Center</li>
                <li className="hover:text-cyan-400 cursor-pointer transition">Contact Us</li>
                <li className="hover:text-cyan-400 cursor-pointer transition">Terms of Service</li>
                <li className="hover:text-cyan-400 cursor-pointer transition">Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex justify-between items-center">
            <p className="text-white/60 text-sm">© 2025 TaskNest. All rights reserved.</p>
            <div className="flex space-x-6">
              {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((s, i) => (
                <span key={i} className="text-white/60 hover:text-cyan-400 cursor-pointer transition">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </UniversalBackground>
  );

  const RequesterDashboard = () => (
    <UniversalBackground>
      <NavBar title="Requester Dashboard" />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div><p className="text-white/70 text-sm">Active Tasks</p><p className="text-3xl font-bold text-white">{postedTask ? 1 : 0}</p></div>
              <Briefcase className="w-12 h-12 text-cyan-400/50" />
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div><p className="text-white/70 text-sm">Completed</p><p className="text-3xl font-bold text-green-400">15</p></div>
              <CheckCircle className="w-12 h-12 text-green-400/50" />
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div><p className="text-white/70 text-sm">Total Spent</p><p className="text-3xl font-bold text-white">R18,900</p></div>
              <Wallet className="w-12 h-12 text-white/30" />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">My Tasks</h2>
          <button onClick={() => setCurrentView('post-task')} className="px-6 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition">+ Post New Task</button>
        </div>

        {!postedTask ? (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-12 text-center border border-white/20">
            <Briefcase className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <p className="text-white/70 text-lg mb-4">No active tasks yet</p>
            <button onClick={() => setCurrentView('post-task')} className="px-6 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition">Post Your First Task</button>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{postedTask.title}</h3>
                <span className="px-3 py-1 bg-cyan-500/30 text-cyan-300 rounded-full text-sm font-medium">{postedTask.category}</span>
              </div>
              <span className="text-2xl font-bold text-green-400">R{postedTask.budget}</span>
            </div>
            <p className="text-white/80 mb-4">{postedTask.description}</p>
            <div className="flex items-center justify-between text-sm text-white/60 mb-4">
              <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {postedTask.location}</span>
              <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {postedTask.deadline}</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-white/20">
              <span className="text-cyan-400 font-semibold">3 offers received</span>
              <button onClick={() => setCurrentView('view-offers')} className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition">View Offers</button>
            </div>
          </div>
        )}
      </div>
    </UniversalBackground>
  );

  const PostTaskView = () => {
    const handleInputChange = (field, value) => {
      setNewTask(prev => ({...prev, [field]: value}));
    };

    const handleSubmit = () => {
      if (newTask.title && newTask.budget && newTask.category) {
        setPostedTask({...newTask});
        showNotif('✓ Task posted successfully! Taskers are viewing your task now.');
        setCurrentView('requester-dashboard');
      } else {
        showNotif('⚠ Please fill in all required fields');
      }
    };

    return (
      <UniversalBackground>
        <NavBar showBack onBack={() => setCurrentView('requester-dashboard')} />
        <div className="max-w-3xl mx-auto px-6 py-8">
          <h2 className="text-3xl font-bold text-white mb-8">Post a New Task</h2>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">Task Title</label>
                <input type="text" value={newTask.title} onChange={(e) => handleInputChange('title', e.target.value)} placeholder="e.g., Install ceiling fan in living room" className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-cyan-400" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">Category</label>
                <select value={newTask.category} onChange={(e) => handleInputChange('category', e.target.value)} className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:border-cyan-400">
                  <option value="" className="bg-slate-800">Select a category</option>
                  {categories.map(cat => <option key={cat} value={cat} className="bg-slate-800">{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">Description</label>
                <textarea value={newTask.description} onChange={(e) => handleInputChange('description', e.target.value)} placeholder="Describe what needs to be done..." rows="4" className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-cyan-400" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-white/80 mb-2">Budget (R)</label>
                  <input type="number" value={newTask.budget} onChange={(e) => handleInputChange('budget', e.target.value)} placeholder="100" className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-cyan-400" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white/80 mb-2">Deadline</label>
                  <input type="text" value={newTask.deadline} onChange={(e) => handleInputChange('deadline', e.target.value)} placeholder="e.g., 2 days, Next week" className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-cyan-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">Location</label>
                <input type="text" value={newTask.location} onChange={(e) => handleInputChange('location', e.target.value)} placeholder="e.g., Downtown, Remote" className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-cyan-400" />
              </div>
              <div className="flex space-x-4 pt-4">
                <button onClick={() => setCurrentView('requester-dashboard')} className="flex-1 px-6 py-3 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 transition">Cancel</button>
                <button onClick={handleSubmit} className="flex-1 px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition">Post Task</button>
              </div>
            </div>
          </div>
        </div>
      </UniversalBackground>
    );
  };

  const ViewOffersView = () => (
    <UniversalBackground>
      <NavBar showBack onBack={() => setCurrentView('requester-dashboard')} />
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6 border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-2">{postedTask?.title}</h3>
          <div className="flex items-center space-x-6 text-white/70">
            <span className="flex items-center"><DollarSign className="w-4 h-4 mr-1" /> Budget: R{postedTask?.budget}</span>
            <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {postedTask?.deadline}</span>
            <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {postedTask?.location}</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-6">Offers Received (3)</h2>

        <div className="space-y-4">
          {offers.map(offer => (
            <div key={offer.id} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">{offer.taskerName.charAt(0)}</div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xl font-bold text-white">{offer.taskerName}</h3>
                      {offer.verified && <CheckCircle className="w-5 h-5 text-cyan-400 fill-cyan-400" />}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-white/70">
                      <span className="flex items-center"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />{offer.rating} ({offer.completedTasks} tasks)</span>
                      <span className="text-green-400 font-medium">{offer.availability}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-green-400">{offer.price}</p>
                  <p className="text-sm text-white/50">Offered price</p>
                </div>
              </div>
              <p className="text-white/80 mb-4 bg-white/5 p-4 rounded-lg">{offer.proposal}</p>
              <div className="flex space-x-3">
                <button onClick={() => { setSelectedOffer(offer); setTaskInProgress({...postedTask, tasker: offer.taskerName, price: offer.price}); showNotif('✓ Offer accepted! Task is now in progress.'); setCurrentView('task-tracking'); }} className="flex-1 px-6 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition">Accept Offer</button>
                <button className="px-6 py-3 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 transition">Message</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </UniversalBackground>
  );

  const TaskTrackingView = () => (
    <UniversalBackground>
      <NavBar showBack onBack={() => setCurrentView('requester-dashboard')} />
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-white mb-8">Task In Progress</h2>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"><p className="text-sm text-white/60 mb-2">Status</p><p className="text-xl font-bold text-cyan-400">In Progress</p></div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"><p className="text-sm text-white/60 mb-2">Tasker</p><p className="text-xl font-bold text-white">{taskInProgress?.tasker}</p></div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"><p className="text-sm text-white/60 mb-2">Amount</p><p className="text-xl font-bold text-green-400">{taskInProgress?.price}</p></div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">Task Details</h3>
          <div className="space-y-3">
            <div><p className="text-sm text-white/60">Title</p><p className="text-lg font-semibold text-white">{taskInProgress?.title}</p></div>
            <div><p className="text-sm text-white/60">Description</p><p className="text-white/80">{taskInProgress?.description}</p></div>
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div><p className="text-sm text-white/60">Location</p><p className="text-white font-medium">{taskInProgress?.location}</p></div>
              <div><p className="text-sm text-white/60">Deadline</p><p className="text-white font-medium">{taskInProgress?.deadline}</p></div>
              <div><p className="text-sm text-white/60">Category</p><p className="text-white font-medium">{taskInProgress?.category}</p></div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">Progress Timeline</h3>
          <div className="space-y-4">
            {[
              { label: 'Task Posted', time: 'Just now', done: true, current: false },
              { label: 'Offer Accepted', time: 'Just now', done: true, current: false },
              { label: 'Work in Progress', time: 'Current status', done: false, current: true },
              { label: 'Completion & Payment', time: 'Pending', done: false, current: false }
            ].map((step, i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step.done ? 'bg-green-500' : step.current ? 'bg-cyan-600' : 'bg-white/20'}`}>
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className={`font-semibold ${step.done || step.current ? 'text-white' : 'text-white/40'}`}>{step.label}</p>
                  <p className={`text-sm ${step.done || step.current ? 'text-white/60' : 'text-white/30'}`}>{step.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-cyan-500/20 border border-cyan-400/30 rounded-xl p-6 mb-6">
          <div className="flex items-start space-x-4">
            <MessageSquare className="w-6 h-6 text-cyan-400 mt-1" />
            <div className="flex-1">
              <h4 className="font-semibold text-white mb-2">Communication</h4>
              <p className="text-white/70 mb-4">Stay in touch with your tasker for updates and questions.</p>
              <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition">Send Message</button>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">Mark as Complete</h3>
          <p className="text-white/70 mb-4">Once the tasker has finished the work, you can mark this task as complete. Funds will be released from escrow to the tasker's wallet.</p>
          <button onClick={() => setCurrentView('task-completion')} className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">Mark as Complete</button>
        </div>
      </div>
    </UniversalBackground>
  );

  const TaskCompletionView = () => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');

    return (
      <UniversalBackground>
        <NavBar showBack onBack={() => setCurrentView('task-tracking')} />
        <div className="max-w-3xl mx-auto px-6 py-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-12 h-12 text-green-400" /></div>
              <h2 className="text-3xl font-bold text-white mb-2">Task Completed!</h2>
              <p className="text-white/70">Rate your experience with {taskInProgress?.tasker}</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-white/80 mb-3">Your Rating</label>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => setRating(star)} className="transition-transform hover:scale-110">
                    <Star className={`w-12 h-12 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/30'}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-white/80 mb-2">Your Review (Optional)</label>
              <textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder="Share your experience..." rows="4" className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-cyan-400" />
            </div>

            <div className="bg-white/5 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-white mb-4">Payment Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between"><span className="text-white/70">Task Amount</span><span className="font-semibold text-white">{taskInProgress?.price}</span></div>
                <div className="flex justify-between"><span className="text-white/70">Service Fee (15%)</span><span className="font-semibold text-white">{taskInProgress?.price?.includes('R') ? `R${Math.round(parseInt(taskInProgress.price.replace('R', '')) * 0.15)}` : `R${Math.round(Number(taskInProgress?.price) * 0.15)}`}</span></div>
                <div className="border-t border-white/20 pt-2 mt-2 flex justify-between"><span className="font-bold text-white">Total</span><span className="font-bold text-green-400">{taskInProgress?.price?.includes('R') ? `R${Math.round(parseInt(taskInProgress.price.replace('R', '')) * 1.15)}` : `R${Math.round(Number(taskInProgress?.price) * 1.15)}`}</span></div>
              </div>
              <div className="mt-4 bg-cyan-500/20 border border-cyan-400/30 rounded-lg p-4">
                <p className="text-sm text-cyan-300"><CheckCircle className="inline w-4 h-4 mr-1" />Funds will be released to tasker's wallet immediately</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <button onClick={() => setCurrentView('task-tracking')} className="flex-1 px-6 py-3 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 transition">Back</button>
              <button onClick={() => { showNotif('✓ Payment released! Thank you for using TaskNest.'); setCurrentView('payment-success'); }} className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">Confirm & Release Payment</button>
            </div>
          </div>
        </div>
      </UniversalBackground>
    );
  };

  const PaymentSuccessView = () => (
    <UniversalBackground>
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <TaskNestLogo size="md" color="white" />
            <span className="text-2xl font-bold text-white">TaskNest</span>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-12 border border-white/20 text-center">
          <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-16 h-16 text-green-400" /></div>
          <h1 className="text-4xl font-bold text-white mb-4">Payment Released Successfully!</h1>
          <p className="text-xl text-white/80 mb-8">{taskInProgress?.price} has been sent to {taskInProgress?.tasker}'s wallet</p>

          <div className="bg-white/5 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-white mb-4">Transaction Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-white/60">Task</span><span className="font-semibold text-white">{taskInProgress?.title}</span></div>
              <div className="flex justify-between"><span className="text-white/60">Tasker</span><span className="font-semibold text-white">{taskInProgress?.tasker}</span></div>
              <div className="flex justify-between"><span className="text-white/60">Amount Released</span><span className="font-semibold text-green-400">{taskInProgress?.price}</span></div>
              <div className="flex justify-between"><span className="text-white/60">Transaction ID</span><span className="font-mono text-sm text-white/50">#TXN-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span></div>
              <div className="flex justify-between"><span className="text-white/60">Date</span><span className="text-white/70">{new Date().toLocaleDateString()}</span></div>
            </div>
          </div>

          <div className="bg-cyan-500/20 border border-cyan-400/30 rounded-lg p-6 mb-8 text-left">
            <h4 className="font-semibold text-cyan-300 mb-2">What's Next?</h4>
            <ul className="space-y-2 text-cyan-200">
              <li>✓ Receipt sent to your email</li>
              <li>✓ Your review has been posted</li>
              <li>✓ Task marked as completed in your history</li>
            </ul>
          </div>

          <div className="flex space-x-4">
            <button onClick={() => { setPostedTask(null); setTaskInProgress(null); setSelectedOffer(null); setCurrentView('requester-dashboard'); }} className="flex-1 px-6 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition">Back to Dashboard</button>
            <button onClick={() => setCurrentView('post-task')} className="flex-1 px-6 py-3 border border-cyan-400 text-cyan-300 rounded-lg font-semibold hover:bg-cyan-500/20 transition">Post Another Task</button>
          </div>

          <div className="mt-8 pt-8 border-t border-white/20">
            <p className="text-white/50 text-sm">Need help? Contact our <span className="text-cyan-400 cursor-pointer hover:underline">support team</span></p>
          </div>
        </div>
      </div>
    </UniversalBackground>
  );

  const Notification = () => showNotification && (
    <div className="fixed top-6 right-6 bg-white/20 backdrop-blur-md border border-white/30 shadow-lg px-6 py-4 rounded-lg flex items-center space-x-3 z-50">
      <CheckCircle className="w-6 h-6 text-green-400" />
      <span className="font-semibold text-white">{notificationMessage}</span>
    </div>
  );

  return (
    <div className="w-full h-screen overflow-auto">
      <Notification />
      {currentView === 'landing' && <LandingView />}
      {currentView === 'requester-dashboard' && <RequesterDashboard />}
      {currentView === 'post-task' && <PostTaskView />}
      {currentView === 'view-offers' && <ViewOffersView />}
      {currentView === 'task-tracking' && <TaskTrackingView />}
      {currentView === 'task-completion' && <TaskCompletionView />}
      {currentView === 'payment-success' && <PaymentSuccessView />}
    </div>
  );
}
