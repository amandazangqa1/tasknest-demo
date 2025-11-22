import React, { useState, useEffect } from 'react';
import { Users, Briefcase, Shield, MapPin, DollarSign, Calendar, Clock, CheckCircle, Star, Wallet, Search, Menu, X, ChevronRight, Award, Bell, ArrowLeft, Send, MessageSquare, Upload, Home, Sparkles, Truck, Trees, Wrench, ShoppingCart, Package, Eye, EyeOff, BadgeCheck, ShieldCheck, Car, Navigation, Camera, AlertCircle } from 'lucide-react';

export default function TaskNestDemo() {
  const [currentView, setCurrentView] = useState('landing');
  const [userRole, setUserRole] = useState(null);
  const [newTask, setNewTask] = useState({ title: '', description: '', budget: '', location: '', deadline: '', category: '' });
  const [postedTask, setPostedTask] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [taskInProgress, setTaskInProgress] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [selectedBrowseTask, setSelectedBrowseTask] = useState(null);
  const [taskerActiveTask, setTaskerActiveTask] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [taskerLocation, setTaskerLocation] = useState({ lat: -26.2041, lng: 28.0473, status: 'On the way' });
  const [completionPhotos, setCompletionPhotos] = useState([]);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [escrowAmount, setEscrowAmount] = useState(0);
  
  // Auth states
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authType, setAuthType] = useState(null);
  const [signStep, setSignStep] = useState(1);
  const [showPw, setShowPw] = useState(false);
  const [forgotPw, setForgotPw] = useState(false);
  const [user, setUser] = useState(null);
  const [adminMode, setAdminMode] = useState(false);
  const [users, setUsers] = useState([
    { email: 'admin@tasknest.com', password: 'admin123', type: 'admin', name: 'Admin' },
    { email: 'tasker@test.com', password: 'test123', type: 'tasker', name: 'Thabo M.', verified: true, policeCleared: true, hasLicense: true },
    { email: 'req@test.com', password: 'test123', type: 'requester', name: 'Jane S.' }
  ]);
  const [form, setForm] = useState({ fn: '', ln: '', email: '', phone: '', pw: '', cpw: '', addr: '', city: '', idNum: '', idPhoto: null, por: null, pc: null, dl: null });
  const [login, setLogin] = useState({ email: '', pw: '' });

  const [workStarted, setWorkStarted] = useState(false);
  const [arrivedTime, setArrivedTime] = useState(null);

  // Simulate tasker movement - arrives after ~10 seconds
  useEffect(() => {
    if (taskInProgress && !taskCompleted) {
      let count = 0;
      const interval = setInterval(() => {
        count++;
        setTaskerLocation(prev => {
          const hasArrived = count > 3; // Arrives after ~9 seconds
          if (hasArrived && !arrivedTime) {
            setArrivedTime(new Date());
          }
          return {
            ...prev,
            lat: prev.lat + (Math.random() - 0.5) * 0.001,
            lng: prev.lng + (Math.random() - 0.5) * 0.001,
            status: hasArrived ? 'Arrived at location' : 'On the way'
          };
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [taskInProgress, taskCompleted]);

  const UniversalBackground = ({ children }) => (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-teal-900 to-slate-900">{children}</div>
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

  const showNotif = (msg) => { setNotificationMessage(msg); setShowNotification(true); setTimeout(() => setShowNotification(false), 3000); };
  const goHome = () => { setCurrentView('landing'); setShowAuth(false); setAdminMode(false); };
  const serviceFee = (amount) => Math.round(parseFloat(amount || 0) * 0.15);
  const totalWithFee = (amount) => Math.round(parseFloat(amount || 0) * 1.15);
  
  const doLogin = () => { const u = users.find(x => x.email === login.email && x.password === login.pw); if (u) { setUser(u); setShowAuth(false); setLogin({ email: '', pw: '' }); if (u.type === 'admin') setCurrentView('admin'); else if (u.type === 'tasker') { setUserRole('tasker'); setCurrentView('tasker-dashboard'); } else { setUserRole('requester'); setCurrentView('requester-dashboard'); } } else alert('Invalid credentials'); };
  const doAdminLogin = () => { const a = users.find(x => x.email === login.email && x.password === login.pw && x.type === 'admin'); if (a) { setUser(a); setAdminMode(false); setCurrentView('admin'); setLogin({ email: '', pw: '' }); } else alert('Invalid admin credentials'); };
  const doSignUp = () => { if (form.pw !== form.cpw) { alert('Passwords must match'); return; } const nu = { email: form.email, password: form.pw, type: authType, name: `${form.fn} ${form.ln}`, verified: true, policeCleared: !!form.pc, hasLicense: !!form.dl }; setUsers([...users, nu]); setUser(nu); setShowAuth(false); setSignStep(1); setAuthType(null); setForm({ fn: '', ln: '', email: '', phone: '', pw: '', cpw: '', addr: '', city: '', idNum: '', idPhoto: null, por: null, pc: null, dl: null }); if (authType === 'tasker') { setUserRole('tasker'); setCurrentView('tasker-dashboard'); } else { setUserRole('requester'); setCurrentView('requester-dashboard'); } };
  const logout = () => { setUser(null); setUserRole(null); setCurrentView('landing'); };

  const sendMessage = () => { if (newMessage.trim()) { setMessages([...messages, { text: newMessage, sender: userRole, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]); setNewMessage(''); } };

  const offers = [
    { id: 1, taskerName: 'Thabo Mokwena', rating: 4.9, completedTasks: 87, price: 'R850', proposal: 'I have 5+ years experience.', availability: 'Available today', verified: true, policeCleared: true, hasLicense: true },
    { id: 2, taskerName: 'Nomvula Dlamini', rating: 4.7, completedTasks: 54, price: 'R950', proposal: 'Licensed with insurance.', availability: 'Tomorrow', verified: true, policeCleared: true, hasLicense: false },
    { id: 3, taskerName: 'Sipho Ndlovu', rating: 4.8, completedTasks: 112, price: 'R800', proposal: 'Quick and reliable.', availability: 'Today', verified: true, policeCleared: true, hasLicense: true }
  ];
  const categories = ['Home Repair', 'Cleaning', 'Moving', 'Outdoor', 'Assembly', 'Other'];
  const availableTasks = [
    { id: 1, title: 'Fix leaking tap', category: 'Home Repair', budget: 'R450', location: 'Waterfall', deadline: 'Today', description: 'Kitchen tap leaking.', requester: 'John M.', postedTime: '2h ago' },
    { id: 2, title: 'Deep clean house', category: 'Cleaning', budget: 'R800', location: 'Corana', deadline: 'Tomorrow', description: 'Full cleaning needed.', requester: 'Sarah K.', postedTime: '4h ago' },
    { id: 3, title: 'Move furniture', category: 'Moving', budget: 'R1200', location: 'Southridge', deadline: '2 days', description: 'Move couch and bed.', requester: 'David L.', postedTime: '1h ago' },
    { id: 4, title: 'Garden work', category: 'Outdoor', budget: 'R350', location: 'Mbuqe', deadline: '3 days', description: 'Mowing and trimming.', requester: 'Linda P.', postedTime: '5h ago' }
  ];

  const Badges = ({ t }) => (
    <div className="flex gap-1 flex-wrap mt-1">
      {t?.verified && <span className="flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full text-xs"><BadgeCheck size={10}/>Verified</span>}
      {t?.policeCleared && <span className="flex items-center gap-1 bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full text-xs"><ShieldCheck size={10}/>Police</span>}
      {t?.hasLicense && <span className="flex items-center gap-1 bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full text-xs"><Car size={10}/>Driver</span>}
    </div>
  );

  const AuthModal = () => (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl max-w-md w-full max-h-[85vh] overflow-y-auto border border-white/20 p-5">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-bold text-white">{forgotPw ? 'Reset Password' : authMode === 'login' ? 'Login' : 'Sign Up'}</h2>
          <button onClick={() => { setShowAuth(false); setForgotPw(false); setSignStep(1); setAuthType(null); }} className="text-white/60 hover:text-white"><X size={20}/></button>
        </div>
        {forgotPw ? (
          <div className="space-y-3">
            <input placeholder="Email" className="w-full p-2.5 bg-white/10 border border-white/30 rounded-lg text-white text-sm"/>
            <button onClick={() => { alert('Reset link sent!'); setForgotPw(false); }} className="w-full py-2.5 bg-cyan-600 text-white rounded-lg">Send Link</button>
            <button onClick={() => setForgotPw(false)} className="w-full text-cyan-400 text-sm">Back</button>
          </div>
        ) : authMode === 'login' ? (
          <div className="space-y-3">
            <input placeholder="Email" value={login.email} onChange={e => setLogin({...login, email: e.target.value})} className="w-full p-2.5 bg-white/10 border border-white/30 rounded-lg text-white text-sm"/>
            <div className="relative"><input type={showPw ? 'text' : 'password'} placeholder="Password" value={login.pw} onChange={e => setLogin({...login, pw: e.target.value})} className="w-full p-2.5 bg-white/10 border border-white/30 rounded-lg text-white text-sm pr-10"/><button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-2.5 text-white/50">{showPw ? <EyeOff size={16}/> : <Eye size={16}/>}</button></div>
            <button onClick={() => setForgotPw(true)} className="text-cyan-400 text-sm">Forgot Password?</button>
            <button onClick={doLogin} className="w-full py-2.5 bg-cyan-600 text-white rounded-lg font-medium">Login</button>
            <p className="text-center text-white/60 text-sm">No account? <button onClick={() => setAuthMode('signup')} className="text-cyan-400">Sign Up</button></p>
          </div>
        ) : !authType ? (
          <div className="space-y-3">
            <button onClick={() => setAuthType('requester')} className="w-full p-3 bg-white/10 border border-white/20 rounded-lg flex items-center gap-3 hover:bg-white/20"><div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center"><Users className="text-cyan-400" size={18}/></div><div className="text-left"><p className="text-white text-sm font-medium">Requester</p><p className="text-white/50 text-xs">I need help</p></div></button>
            <button onClick={() => setAuthType('tasker')} className="w-full p-3 bg-white/10 border border-white/20 rounded-lg flex items-center gap-3 hover:bg-white/20"><div className="w-10 h-10 bg-teal-500/20 rounded-full flex items-center justify-center"><Briefcase className="text-teal-400" size={18}/></div><div className="text-left"><p className="text-white text-sm font-medium">Tasker</p><p className="text-white/50 text-xs">I want to earn</p></div></button>
            <p className="text-center text-white/60 text-sm">Have account? <button onClick={() => setAuthMode('login')} className="text-cyan-400">Login</button></p>
          </div>
        ) : (
          <div>
            <div className="flex gap-1 mb-3">{[1,2,3].map(s => <div key={s} className={`flex-1 h-1 rounded ${signStep >= s ? 'bg-cyan-500' : 'bg-white/20'}`}/>)}</div>
            {signStep === 1 && (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2"><input placeholder="First Name *" value={form.fn} onChange={e => setForm({...form, fn: e.target.value})} className="p-2 bg-white/10 border border-white/30 rounded-lg text-white text-sm"/><input placeholder="Last Name *" value={form.ln} onChange={e => setForm({...form, ln: e.target.value})} className="p-2 bg-white/10 border border-white/30 rounded-lg text-white text-sm"/></div>
                <input placeholder="Email *" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full p-2 bg-white/10 border border-white/30 rounded-lg text-white text-sm"/>
                <input placeholder="Phone *" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full p-2 bg-white/10 border border-white/30 rounded-lg text-white text-sm"/>
                <input placeholder="ID Number *" value={form.idNum} onChange={e => setForm({...form, idNum: e.target.value})} className="w-full p-2 bg-white/10 border border-white/30 rounded-lg text-white text-sm"/>
                <input placeholder="Address *" value={form.addr} onChange={e => setForm({...form, addr: e.target.value})} className="w-full p-2 bg-white/10 border border-white/30 rounded-lg text-white text-sm"/>
                <input placeholder="City *" value={form.city} onChange={e => setForm({...form, city: e.target.value})} className="w-full p-2 bg-white/10 border border-white/30 rounded-lg text-white text-sm"/>
                <button onClick={() => setSignStep(2)} className="w-full py-2 bg-cyan-600 text-white rounded-lg mt-2">Continue</button>
              </div>
            )}
            {signStep === 2 && (
              <div className="space-y-3">
                {['ID Copy', 'Proof of Residence'].map(l => (<div key={l} onClick={() => setForm({...form, [l === 'ID Copy' ? 'idCopy' : 'por']: 'done'})} className="border-2 border-dashed border-white/30 rounded-lg p-3 text-center cursor-pointer hover:border-cyan-500">{form[l === 'ID Photo' ? 'idPhoto' : 'por'] ? <span className="text-green-400 text-sm flex items-center justify-center gap-1"><CheckCircle size={14}/>{l} Uploaded</span> : <span className="text-white/50 text-sm flex items-center justify-center gap-1"><Upload size={14}/>Upload {l} *</span>}</div>))}
                {authType === 'tasker' && ['Police Clearance *', "Driver's License (Optional)"].map(l => (<div key={l} onClick={() => setForm({...form, [l.includes('Police') ? 'pc' : 'dl']: 'done'})} className="border-2 border-dashed border-white/30 rounded-lg p-3 text-center cursor-pointer hover:border-cyan-500">{form[l.includes('Police') ? 'pc' : 'dl'] ? <span className="text-green-400 text-sm flex items-center justify-center gap-1"><CheckCircle size={14}/>Uploaded</span> : <span className="text-white/50 text-sm flex items-center justify-center gap-1"><Upload size={14}/>{l}</span>}</div>))}
                <div className="flex gap-2"><button onClick={() => setSignStep(1)} className="flex-1 py-2 border border-white/30 text-white rounded-lg">Back</button><button onClick={() => setSignStep(3)} className="flex-1 py-2 bg-cyan-600 text-white rounded-lg">Continue</button></div>
              </div>
            )}
            {signStep === 3 && (
              <div className="space-y-3">
                <div className="relative"><input type={showPw ? 'text' : 'password'} placeholder="Password *" value={form.pw} onChange={e => setForm({...form, pw: e.target.value})} className="w-full p-2 bg-white/10 border border-white/30 rounded-lg text-white text-sm pr-10"/><button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-2 text-white/50">{showPw ? <EyeOff size={16}/> : <Eye size={16}/>}</button></div>
                <input type="password" placeholder="Confirm Password *" value={form.cpw} onChange={e => setForm({...form, cpw: e.target.value})} className="w-full p-2 bg-white/10 border border-white/30 rounded-lg text-white text-sm"/>
                <div className="flex gap-2"><button onClick={() => setSignStep(2)} className="flex-1 py-2 border border-white/30 text-white rounded-lg">Back</button><button onClick={doSignUp} className="flex-1 py-2 bg-teal-600 text-white rounded-lg">Create Account</button></div>
              </div>
            )}
            <button onClick={() => { setAuthType(null); setSignStep(1); }} className="w-full text-white/40 text-xs mt-3">← Change type</button>
          </div>
        )}
      </div>
    </div>
  );

  const AdminModal = () => (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl max-w-sm w-full border border-white/20 p-5">
        <div className="flex justify-between mb-4"><h2 className="text-lg font-bold text-white">Admin Login</h2><button onClick={() => { setAdminMode(false); setLogin({ email: '', pw: '' }); }} className="text-white/60"><X size={20}/></button></div>
        <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4"><Shield className="text-red-400" size={24}/></div>
        <div className="space-y-3">
          <input placeholder="Admin Email" value={login.email} onChange={e => setLogin({...login, email: e.target.value})} className="w-full p-2.5 bg-white/10 border border-white/30 rounded-lg text-white text-sm"/>
          <input type="password" placeholder="Password" value={login.pw} onChange={e => setLogin({...login, pw: e.target.value})} className="w-full p-2.5 bg-white/10 border border-white/30 rounded-lg text-white text-sm"/>
          <button onClick={doAdminLogin} className="w-full py-2.5 bg-red-600 text-white rounded-lg">Access Dashboard</button>
        </div>
      </div>
    </div>
  );

  const NavBar = ({ showBack = false, onBack = null, title = null }) => (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {showBack && <button onClick={onBack} className="p-2 hover:bg-white/20 rounded-lg"><ArrowLeft className="w-6 h-6 text-white"/></button>}
          <button onClick={goHome} className="flex items-center space-x-2"><TaskNestLogo size="md" color="white"/><span className="text-2xl font-bold text-white">TaskNest</span></button>
        </div>
        <div className="flex items-center space-x-4">
          {title && <span className="text-white/80 font-medium">{title}</span>}
          <Bell className="w-6 h-6 text-white/80 cursor-pointer"/>
          {user ? (<><span className="text-white/80 text-sm">Hi, {user.name}</span><button onClick={logout} className="px-4 py-2 text-white hover:bg-white/20 rounded-lg">Logout</button></>) : (<button onClick={goHome} className="px-4 py-2 text-white hover:bg-white/20 rounded-lg">Back</button>)}
        </div>
      </div>
    </nav>
  );

  const Notification = () => showNotification && (<div className="fixed top-6 right-6 bg-white/20 backdrop-blur-md border border-white/30 px-6 py-4 rounded-lg flex items-center space-x-3 z-50"><CheckCircle className="w-6 h-6 text-green-400"/><span className="font-semibold text-white">{notificationMessage}</span></div>);

  // Message Component
  const MessagePanel = () => (
    <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 h-80 flex flex-col">
      <div className="p-4 border-b border-white/20 flex items-center gap-3">
        <MessageSquare className="text-cyan-400" size={20}/>
        <span className="text-white font-semibold">Chat with {userRole === 'requester' ? taskInProgress?.tasker : taskerActiveTask?.requester}</span>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && <p className="text-white/50 text-center text-sm">No messages yet. Start the conversation!</p>}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.sender === userRole ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] p-3 rounded-lg ${m.sender === userRole ? 'bg-cyan-600 text-white' : 'bg-white/20 text-white'}`}>
              <p className="text-sm">{m.text}</p>
              <p className="text-xs opacity-60 mt-1">{m.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-white/20 flex gap-2">
        <input value={newMessage} onChange={e => setNewMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' && sendMessage()} placeholder="Type a message..." className="flex-1 p-2 bg-white/10 border border-white/30 rounded-lg text-white text-sm"/>
        <button onClick={sendMessage} className="p-2 bg-cyan-600 rounded-lg hover:bg-cyan-700"><Send size={18} className="text-white"/></button>
      </div>
    </div>
  );

  // Live Tracking Component
  const LiveTracking = () => {
    const hasArrived = taskerLocation.status === 'Arrived at location';
    
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2"><Navigation className="text-cyan-400" size={20}/><span className="text-white font-semibold">Live Tracking</span></div>
          {hasArrived && <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Arrived</span>}
        </div>
        <div className="bg-slate-700 rounded-lg h-48 relative overflow-hidden mb-4">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-600 to-slate-800"/>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className={`w-4 h-4 ${hasArrived ? 'bg-green-500' : 'bg-cyan-500'} rounded-full animate-ping absolute`}/>
            <div className={`w-4 h-4 ${hasArrived ? 'bg-green-400' : 'bg-cyan-400'} rounded-full relative`}/>
          </div>
          <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-xs text-white">📍 {taskerLocation.lat.toFixed(4)}, {taskerLocation.lng.toFixed(4)}</div>
        </div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${hasArrived ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`}/>
            <span className="text-white text-sm">{taskerLocation.status}</span>
          </div>
          <span className="text-white/60 text-sm">{hasArrived ? 'Tasker is here!' : 'ETA: ~15 min'}</span>
        </div>
        
        {hasArrived && !workStarted && (
          <button 
            onClick={() => { setWorkStarted(true); showNotif('Work has started!'); }}
            className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2"
          >
            <CheckCircle size={18}/> Confirm Tasker Arrived - Start Work
          </button>
        )}
        
        {workStarted && !taskCompleted && (
          <div className="bg-cyan-500/20 border border-cyan-400/30 rounded-lg p-3">
            <p className="text-cyan-300 text-sm flex items-center gap-2"><Clock size={14}/> Work in progress...</p>
          </div>
        )}
      </div>
    );
  };

  const AdminDashboard = () => (
    <UniversalBackground><NavBar title="Admin Dashboard"/>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[{l:'Users',v:'15,234'},{l:'Taskers',v:'8,567'},{l:'Revenue',v:'R2.4M'},{l:'Escrow',v:'R340K'}].map(s => (<div key={s.l} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"><p className="text-white/70 text-sm">{s.l}</p><p className="text-3xl font-bold text-white">{s.v}</p></div>))}
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"><h3 className="text-xl font-bold text-white mb-4">Pending Verifications</h3>{[{n:'Thabo M.',t:'Police'},{n:'Lindiwe K.',t:'ID'},{n:'James N.',t:'License'}].map((v,i) => (<div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-lg mb-2"><div><p className="text-white">{v.n}</p><p className="text-white/50 text-xs">{v.t}</p></div><div className="flex gap-2"><button className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-sm">Approve</button><button className="px-3 py-1 bg-red-500/20 text-red-400 rounded text-sm">Reject</button></div></div>))}</div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"><h3 className="text-xl font-bold text-white mb-4">Escrow Transactions</h3>{[{a:'Task #1234',d:'R850 held'},{a:'Task #1235',d:'R1200 held'},{a:'Task #1230',d:'R450 released'}].map((t,i) => (<div key={i} className="p-3 border-l-2 border-cyan-500 bg-white/5 rounded-r-lg mb-2"><p className="text-white text-sm">{t.a}</p><p className="text-white/50 text-xs">{t.d}</p></div>))}</div>
        </div>
      </div>
    </UniversalBackground>
  );

  const PaymentSuccessView = () => (
    <UniversalBackground>
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-center items-center">
          <button onClick={goHome} className="flex items-center space-x-2"><TaskNestLogo size="md" color="white"/><span className="text-2xl font-bold text-white">TaskNest</span></button>
        </div>
      </nav>
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 border border-white/20 text-center">
          <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-16 h-16 text-green-400"/>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Payment Released!</h1>
          <p className="text-xl text-white/80 mb-8">The task has been completed successfully and payment has been released to the tasker.</p>
          
          <div className="bg-white/5 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-semibold text-white mb-4">Transaction Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-white/70"><span>Task</span><span className="text-white">Completed</span></div>
              <div className="flex justify-between text-white/70"><span>Payment Status</span><span className="text-green-400">Released ✓</span></div>
              <div className="flex justify-between text-white/70"><span>Transaction ID</span><span className="font-mono text-xs text-white/50">#TXN-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span></div>
            </div>
          </div>

          <div className="bg-cyan-500/20 border border-cyan-400/30 rounded-lg p-4 mb-8 text-left">
            <h4 className="font-semibold text-cyan-300 mb-2">What's Next?</h4>
            <ul className="space-y-1 text-cyan-200 text-sm">
              <li>✓ Receipt sent to your email</li>
              <li>✓ Task marked as completed</li>
              <li>✓ You can rate your tasker from your dashboard</li>
            </ul>
          </div>

          <div className="flex gap-4">
            <button onClick={() => setCurrentView('requester-dashboard')} className="flex-1 px-6 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700">Back to Dashboard</button>
            <button onClick={() => { setNewTask({ title: '', description: '', budget: '', location: '', deadline: '', category: '' }); setCurrentView('post-task'); }} className="flex-1 px-6 py-3 border border-cyan-400/50 text-cyan-300 rounded-lg font-semibold hover:bg-cyan-500/20">Post Another Task</button>
          </div>
        </div>
      </div>
    </UniversalBackground>
  );

  const LandingView = () => (
    <UniversalBackground>
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={goHome} className="flex items-center space-x-2"><TaskNestLogo size="md" color="white"/><span className="text-2xl font-bold text-white">TaskNest</span></button>
          <div className="flex space-x-4">
            <button onClick={() => { setShowAuth(true); setAuthMode('login'); }} className="px-4 py-2 text-white hover:bg-white/20 rounded-lg">Login</button>
            <button onClick={() => { setShowAuth(true); setAuthMode('signup'); }} className="px-4 py-2 bg-white text-cyan-900 rounded-lg font-semibold">Sign Up</button>
            <button onClick={() => setAdminMode(true)} className="px-4 py-2 bg-white/10 text-white rounded-lg flex items-center gap-2"><Shield size={16}/>Admin</button>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold text-white mb-6">Get Things Done with <span className="text-cyan-400">TaskNest</span></h1>
        <p className="text-xl text-white/90 mb-4 max-w-3xl mx-auto">Connect with skilled professionals for any task. Post a job or find work – all in one trusted marketplace.</p>
        <p className="text-2xl text-cyan-300 mb-12 font-semibold italic">Connecting Communities, One Task At A Time.</p>
        <div className="flex justify-center space-x-6 mb-16">
          <button onClick={() => { setUserRole('requester'); setCurrentView('requester-dashboard'); }} className="group px-8 py-4 bg-white text-gray-800 rounded-xl font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all"><Users className="inline-block w-6 h-6 mr-2 text-cyan-900"/>I Need Help (Guest)<ChevronRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition"/></button>
          <button onClick={() => { setUserRole('tasker'); setCurrentView('tasker-dashboard'); }} className="group px-8 py-4 bg-cyan-700 text-white rounded-xl font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all"><Briefcase className="inline-block w-6 h-6 mr-2"/>I Want to Work (Guest)<ChevronRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition"/></button>
        </div>
        <div className="grid grid-cols-3 gap-8 mt-16 mb-20">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"><Shield className="w-12 h-12 text-cyan-400 mx-auto mb-4"/><h3 className="text-xl font-bold text-white mb-2">Secure Platform</h3><p className="text-white/80">Protected escrow payments</p></div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"><Clock className="w-12 h-12 text-cyan-400 mx-auto mb-4"/><h3 className="text-xl font-bold text-white mb-2">Fast Matching</h3><p className="text-white/80">Get offers within minutes</p></div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"><Award className="w-12 h-12 text-cyan-400 mx-auto mb-4"/><h3 className="text-xl font-bold text-white mb-2">Quality Service</h3><p className="text-white/80">Verified professionals</p></div>
        </div>
        <div className="mb-20"><h2 className="text-4xl font-bold text-white mb-12">Popular Categories</h2><div className="grid grid-cols-4 gap-6">{[{icon:Home,title:'Home Repair'},{icon:Sparkles,title:'Cleaning'},{icon:Truck,title:'Moving'},{icon:Trees,title:'Outdoor'},{icon:Wrench,title:'Assembly'},{icon:ShoppingCart,title:'Errands'},{icon:Package,title:'Other'}].map((c,i) => (<div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 cursor-pointer text-center"><c.icon className="w-8 h-8 text-cyan-300 mx-auto mb-4"/><h3 className="text-lg font-bold text-white">{c.title}</h3></div>))}</div></div>
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 border border-white/20 mb-12 text-left"><h2 className="text-3xl font-bold text-white mb-6 text-center">About TaskNest</h2><p className="text-lg text-white/90">TaskNest is a South African-born platform connecting people with trusted local taskers for errands and small jobs.</p></div>
        <div className="grid grid-cols-2 gap-8 mb-20">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-left"><h3 className="text-2xl font-bold text-cyan-400 mb-4">Our Mission</h3><p className="text-white/90">To empower communities by bridging the gap between users and capable taskers.</p></div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-left"><h3 className="text-2xl font-bold text-cyan-400 mb-4">Our Vision</h3><p className="text-white/90">A future where digital platforms unlock opportunities across South Africa.</p></div>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 border border-white/20"><h2 className="text-3xl font-bold text-white mb-10">Meet The Team</h2><div className="grid grid-cols-3 gap-8">{[{i:'SK',n:'Siyonela Kubukeli',r:'Chief Financial Officer'},{i:'AZ',n:'Amanda Zangqa',r:'Chief Development Officer'},{i:'FN',n:'Fiona Ngcamba',r:'Chief Operations Officer'}].map((m,idx) => (<div key={idx} className="text-center"><div className="w-32 h-32 bg-gradient-to-br from-cyan-600 to-teal-700 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">{m.i}</div><h4 className="text-xl font-bold text-white mb-1">{m.n}</h4><p className="text-cyan-400">{m.r}</p></div>))}</div></div>
      </div>
      <footer className="bg-slate-900/50 border-t border-white/10 py-8"><div className="max-w-7xl mx-auto px-6 text-center text-white/60">© 2025 TaskNest. All rights reserved.</div></footer>
    </UniversalBackground>
  );

  const RequesterDashboard = () => (
    <UniversalBackground><NavBar title="Requester Dashboard"/>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"><p className="text-white/70 text-sm">Active</p><p className="text-3xl font-bold text-white">{postedTask ? 1 : 0}</p></div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"><p className="text-white/70 text-sm">Completed</p><p className="text-3xl font-bold text-green-400">15</p></div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"><p className="text-white/70 text-sm">Spent</p><p className="text-3xl font-bold text-white">R18,900</p></div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"><p className="text-white/70 text-sm">In Escrow</p><p className="text-3xl font-bold text-yellow-400">R{escrowAmount}</p></div>
        </div>
        <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-white">My Tasks</h2><button onClick={() => setCurrentView('post-task')} className="px-6 py-3 bg-cyan-600 text-white rounded-lg font-semibold">+ Post New Task</button></div>
        {!postedTask ? (<div className="bg-white/10 backdrop-blur-md rounded-xl p-12 text-center border border-white/20"><Briefcase className="w-16 h-16 text-white/30 mx-auto mb-4"/><p className="text-white/70 mb-4">No active tasks</p><button onClick={() => setCurrentView('post-task')} className="px-6 py-3 bg-cyan-600 text-white rounded-lg">Post Your First Task</button></div>
        ) : taskInProgress ? (<div className="bg-cyan-500/20 border border-cyan-400/30 rounded-xl p-6"><div className="flex justify-between items-start mb-4"><div><h3 className="text-xl font-bold text-white mb-2">{taskInProgress.title}</h3><span className="px-3 py-1 bg-cyan-500/30 text-cyan-300 rounded-full text-sm">In Progress</span></div><span className="text-2xl font-bold text-green-400">{taskInProgress.price}</span></div><p className="text-white/80 mb-4">Tasker: {taskInProgress.tasker}</p><div className="flex gap-3"><button onClick={() => setCurrentView('task-tracking')} className="px-4 py-2 bg-cyan-600 text-white rounded-lg">Track & Message</button></div></div>
        ) : (<div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"><div className="flex justify-between items-start mb-4"><div><h3 className="text-xl font-bold text-white mb-2">{postedTask.title}</h3><span className="px-3 py-1 bg-cyan-500/30 text-cyan-300 rounded-full text-sm">{postedTask.category}</span></div><span className="text-2xl font-bold text-green-400">R{postedTask.budget}</span></div><p className="text-white/80 mb-4">{postedTask.description}</p><div className="bg-yellow-500/20 border border-yellow-400/30 rounded-lg p-3 mb-4"><p className="text-yellow-300 text-sm flex items-center gap-2"><Wallet size={16}/>R{totalWithFee(postedTask.budget)} held in escrow (includes 15% service fee)</p></div><div className="flex justify-between items-center pt-4 border-t border-white/20"><span className="text-cyan-400">3 offers received</span><button onClick={() => setCurrentView('view-offers')} className="px-4 py-2 bg-cyan-600 text-white rounded-lg">View Offers</button></div></div>)}
      </div>
    </UniversalBackground>
  );

  const PostTaskView = () => (
    <UniversalBackground><NavBar showBack onBack={() => setCurrentView('requester-dashboard')}/>
      <div className="max-w-3xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-white mb-8">Post a New Task</h2>
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 space-y-6">
          <div><label className="block text-sm font-semibold text-white/80 mb-2">Task Title</label><input value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white" placeholder="e.g., Fix ceiling fan"/></div>
          <div><label className="block text-sm font-semibold text-white/80 mb-2">Category</label><select value={newTask.category} onChange={e => setNewTask({...newTask, category: e.target.value})} className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white"><option value="" className="bg-slate-800">Select</option>{categories.map(c => <option key={c} value={c} className="bg-slate-800">{c}</option>)}</select></div>
          <div><label className="block text-sm font-semibold text-white/80 mb-2">Description</label><textarea value={newTask.description} onChange={e => setNewTask({...newTask, description: e.target.value})} rows="3" className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white"/></div>
          <div className="grid grid-cols-2 gap-6"><div><label className="block text-sm font-semibold text-white/80 mb-2">Budget (R)</label><input type="number" value={newTask.budget} onChange={e => setNewTask({...newTask, budget: e.target.value})} className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white"/></div><div><label className="block text-sm font-semibold text-white/80 mb-2">Deadline</label><input value={newTask.deadline} onChange={e => setNewTask({...newTask, deadline: e.target.value})} className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white" placeholder="e.g., Today, Tomorrow"/></div></div>
          <div><label className="block text-sm font-semibold text-white/80 mb-2">Location</label><input value={newTask.location} onChange={e => setNewTask({...newTask, location: e.target.value})} className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white"/></div>
          
          {newTask.budget && (
            <div className="bg-white/5 rounded-xl p-6 border border-white/20">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><DollarSign size={20}/>Payment Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-white/70"><span>Task Budget</span><span>R{newTask.budget}</span></div>
                <div className="flex justify-between text-white/70"><span>Service Fee (15%)</span><span>R{serviceFee(newTask.budget)}</span></div>
                <div className="flex justify-between text-white font-bold pt-2 border-t border-white/20"><span>Total to Pay</span><span>R{totalWithFee(newTask.budget)}</span></div>
              </div>
              <div className="mt-4 bg-cyan-500/20 border border-cyan-400/30 rounded-lg p-3"><p className="text-cyan-300 text-xs flex items-center gap-2"><Shield size={14}/>Funds will be held in escrow until task completion</p></div>
            </div>
          )}
          
          <div className="flex space-x-4"><button onClick={() => setCurrentView('requester-dashboard')} className="flex-1 px-6 py-3 border border-white/30 text-white rounded-lg">Cancel</button><button onClick={() => { if(newTask.title && newTask.budget) { setPostedTask({...newTask}); setEscrowAmount(totalWithFee(newTask.budget)); showNotif('Task posted! R' + totalWithFee(newTask.budget) + ' held in escrow'); setCurrentView('requester-dashboard'); }}} className="flex-1 px-6 py-3 bg-teal-600 text-white rounded-lg">Post & Pay R{totalWithFee(newTask.budget) || 0}</button></div>
        </div>
      </div>
    </UniversalBackground>
  );

  const ViewOffersView = () => (
    <UniversalBackground><NavBar showBack onBack={() => setCurrentView('requester-dashboard')}/>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-white mb-6">Offers Received (3)</h2>
        <div className="space-y-4">
          {offers.map(o => (
            <div key={o.id} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full flex items-center justify-center text-white text-xl font-bold">{o.taskerName.charAt(0)}</div>
                  <div><div className="flex items-center gap-2"><h3 className="text-lg font-bold text-white">{o.taskerName}</h3><BadgeCheck className="text-cyan-400" size={16}/></div><Badges t={o}/><div className="flex items-center gap-2 mt-1 text-sm text-white/70"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400"/>{o.rating} ({o.completedTasks} tasks)</div></div>
                </div>
                <p className="text-2xl font-bold text-green-400">{o.price}</p>
              </div>
              <p className="text-white/80 mb-4 bg-white/5 p-3 rounded-lg">{o.proposal}</p>
              <button onClick={() => { setSelectedOffer(o); setTaskInProgress({...postedTask, tasker: o.taskerName, price: o.price, taskerData: o}); setMessages([{text: 'Hi! I accepted your offer. When can you start?', sender: 'requester', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}]); showNotif('Offer accepted! You can now message ' + o.taskerName); setCurrentView('task-tracking'); }} className="px-6 py-2 bg-cyan-600 text-white rounded-lg">Accept & Message</button>
            </div>
          ))}
        </div>
      </div>
    </UniversalBackground>
  );

  const TaskTrackingView = () => (
    <UniversalBackground><NavBar showBack onBack={() => setCurrentView('requester-dashboard')}/>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-white mb-6">Task In Progress</h2>
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"><p className="text-white/60 text-xs">Status</p><p className="text-lg font-bold text-cyan-400">{taskCompleted ? 'Awaiting Approval' : workStarted ? 'Work in Progress' : taskerLocation.status === 'Arrived at location' ? 'Tasker Arrived' : 'Tasker En Route'}</p></div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"><p className="text-white/60 text-xs">Tasker</p><p className="text-lg font-bold text-white">{taskInProgress?.tasker}</p></div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"><p className="text-white/60 text-xs">Amount</p><p className="text-lg font-bold text-green-400">{taskInProgress?.price}</p></div>
          <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-xl p-4"><p className="text-yellow-300 text-xs">In Escrow</p><p className="text-lg font-bold text-yellow-400">R{escrowAmount}</p></div>
        </div>
        
        <div className="grid grid-cols-2 gap-6 mb-6">
          <LiveTracking/>
          <MessagePanel/>
        </div>

        {taskCompleted && (
          <div className="bg-green-500/20 border border-green-400/30 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Camera size={20}/> Completion Photos from Tasker</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {completionPhotos.map((p, i) => (<div key={i} className="bg-white/10 rounded-lg h-32 flex items-center justify-center border border-green-400/30"><CheckCircle className="text-green-400" size={32}/></div>))}
            </div>
            <p className="text-green-300 mb-4 flex items-center gap-2"><CheckCircle size={16}/>Tasker has marked this task as complete. Please review the photos and confirm.</p>
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <h4 className="text-white font-semibold mb-2">Payment Summary</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between text-white/70"><span>Tasker Payment</span><span>{taskInProgress?.price}</span></div>
                <div className="flex justify-between text-white/70"><span>Held in Escrow</span><span>R{escrowAmount}</span></div>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => { 
                showNotif('✓ Payment of ' + taskInProgress?.price + ' released to ' + taskInProgress?.tasker + '!'); 
                setEscrowAmount(0); 
                setPostedTask(null); 
                setTaskInProgress(null); 
                setTaskCompleted(false); 
                setCompletionPhotos([]); 
                setWorkStarted(false);
                setArrivedTime(null);
                setMessages([]);
                setCurrentView('payment-success'); 
              }} className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 flex items-center gap-2"><CheckCircle size={18}/>Confirm & Release Payment</button>
              <button className="px-6 py-3 border border-red-400/50 text-red-400 rounded-lg hover:bg-red-500/10">Report Issue</button>
            </div>
          </div>
        )}

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">Progress Timeline</h3>
          {[
            { label: 'Task Posted & Payment Held', done: true },
            { label: 'Offer Accepted', done: true },
            { label: 'Tasker En Route', done: true },
            { label: 'Tasker Arrived', done: taskerLocation.status === 'Arrived at location' || workStarted || taskCompleted },
            { label: 'Work in Progress', done: workStarted || taskCompleted },
            { label: taskCompleted ? 'Awaiting Your Approval' : 'Task Completion', done: taskCompleted }
          ].map((s, i) => (
            <div key={i} className="flex items-center space-x-4 mb-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${s.done ? 'bg-green-500' : 'bg-white/20'}`}>
                <CheckCircle className="w-5 h-5 text-white"/>
              </div>
              <p className={s.done ? 'text-white font-medium' : 'text-white/40'}>{s.label}</p>
              {s.label === 'Work in Progress' && workStarted && !taskCompleted && (
                <span className="px-2 py-1 bg-cyan-500/30 text-cyan-300 rounded-full text-xs animate-pulse">Current</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </UniversalBackground>
  );

  const TaskerDashboard = () => (
    <UniversalBackground><NavBar title="Tasker Dashboard"/>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"><p className="text-white/70 text-sm">Available</p><p className="text-3xl font-bold text-white">{availableTasks.length}</p></div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"><p className="text-white/70 text-sm">Active</p><p className="text-3xl font-bold text-cyan-400">{taskerActiveTask ? 1 : 0}</p></div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"><p className="text-white/70 text-sm">Completed</p><p className="text-3xl font-bold text-green-400">32</p></div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"><p className="text-white/70 text-sm">Earned</p><p className="text-3xl font-bold text-green-400">R24,500</p></div>
        </div>
        {user && <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-8"><div className="flex items-center gap-4"><div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full flex items-center justify-center text-white text-xl font-bold">{user.name?.charAt(0)}</div><div><div className="flex items-center gap-2"><h3 className="text-lg font-bold text-white">{user.name}</h3><BadgeCheck className="text-cyan-400" size={16}/></div><Badges t={user}/></div></div></div>}
        
        {taskerActiveTask && (
          <div className="bg-cyan-500/20 border border-cyan-400/30 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-white mb-2">Active Job: {taskerActiveTask.title}</h3>
            <p className="text-white/70 mb-4">{taskerActiveTask.description}</p>
            <button onClick={() => setCurrentView('tasker-active-job')} className="px-4 py-2 bg-cyan-600 text-white rounded-lg">View & Complete</button>
          </div>
        )}
        
        <h2 className="text-2xl font-bold text-white mb-6">Available Tasks</h2>
        <div className="grid grid-cols-2 gap-6">
          {availableTasks.map(t => (
            <div key={t.id} onClick={() => { setSelectedBrowseTask(t); setCurrentView('task-detail'); }} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 cursor-pointer">
              <div className="flex justify-between mb-3"><div><h3 className="text-lg font-bold text-white mb-1">{t.title}</h3><span className="px-2 py-1 bg-white/10 text-cyan-300 rounded-full text-xs">{t.category}</span></div><span className="text-xl font-bold text-green-400">{t.budget}</span></div>
              <p className="text-white/70 text-sm mb-3">{t.description}</p>
              <div className="flex justify-between text-xs text-white/50"><span><MapPin className="inline w-3 h-3"/> {t.location}</span><span>{t.postedTime}</span></div>
            </div>
          ))}
        </div>
      </div>
    </UniversalBackground>
  );

  const TaskDetailView = () => (
    <UniversalBackground><NavBar showBack onBack={() => setCurrentView('tasker-dashboard')}/>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 mb-6">
          <div className="flex justify-between mb-6"><div><h1 className="text-3xl font-bold text-white mb-2">{selectedBrowseTask?.title}</h1><span className="px-3 py-1 bg-cyan-500/30 text-cyan-300 rounded-full text-sm">{selectedBrowseTask?.category}</span></div><div className="text-right"><p className="text-3xl font-bold text-green-400">{selectedBrowseTask?.budget}</p></div></div>
          <p className="text-white/80 mb-6">{selectedBrowseTask?.description}</p>
          <div className="grid grid-cols-3 gap-4"><div className="bg-white/5 p-4 rounded-lg"><p className="text-white/50 text-sm">Location</p><p className="text-white">{selectedBrowseTask?.location}</p></div><div className="bg-white/5 p-4 rounded-lg"><p className="text-white/50 text-sm">Deadline</p><p className="text-white">{selectedBrowseTask?.deadline}</p></div><div className="bg-white/5 p-4 rounded-lg"><p className="text-white/50 text-sm">Client</p><p className="text-white">{selectedBrowseTask?.requester}</p></div></div>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">Submit Your Offer</h2>
          <div className="space-y-4">
            <div><label className="block text-sm text-white/80 mb-2">Your Price (R)</label><input className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white"/></div>
            <div><label className="block text-sm text-white/80 mb-2">Your Proposal</label><textarea rows="4" className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white" placeholder="Why are you the best fit?"/></div>
            <div className="flex gap-4"><button onClick={() => setCurrentView('tasker-dashboard')} className="flex-1 px-6 py-3 border border-white/30 text-white rounded-lg">Cancel</button><button onClick={() => { setTaskerActiveTask(selectedBrowseTask); setMessages([{text: 'Hello! I am on my way to your location.', sender: 'tasker', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}]); showNotif('Offer accepted by client! Task started.'); setCurrentView('tasker-active-job'); }} className="flex-1 px-6 py-3 bg-cyan-600 text-white rounded-lg">Submit Offer</button></div>
          </div>
        </div>
      </div>
    </UniversalBackground>
  );

  const TaskerActiveJobView = () => {
    const [photos, setPhotos] = useState([]);
    
    const addPhoto = () => {
      if (photos.length < 3) {
        setPhotos([...photos, { id: Date.now(), uploaded: true }]);
      }
    };
    
    return (
      <UniversalBackground><NavBar showBack onBack={() => setCurrentView('tasker-dashboard')}/>
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h2 className="text-3xl font-bold text-white mb-6">Active Job</h2>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"><p className="text-white/60 text-xs">Status</p><p className="text-lg font-bold text-cyan-400">In Progress</p></div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"><p className="text-white/60 text-xs">Client</p><p className="text-lg font-bold text-white">{taskerActiveTask?.requester}</p></div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"><p className="text-white/60 text-xs">Earnings</p><p className="text-lg font-bold text-green-400">{taskerActiveTask?.budget}</p></div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-6">
            <h3 className="text-xl font-bold text-white mb-4">Task Details</h3>
            <p className="text-white font-semibold mb-2">{taskerActiveTask?.title}</p>
            <p className="text-white/70 mb-4">{taskerActiveTask?.description}</p>
            <div className="flex gap-4 text-sm text-white/60">
              <span><MapPin className="inline w-4 h-4"/> {taskerActiveTask?.location}</span>
              <span><Clock className="inline w-4 h-4"/> {taskerActiveTask?.deadline}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <MessagePanel/>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><Navigation size={18}/>Your Location Sharing</h3>
              <div className="bg-slate-700 rounded-lg h-40 relative overflow-hidden mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-600 to-slate-800"/>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 bg-green-500 rounded-full animate-ping absolute"/>
                  <div className="w-4 h-4 bg-green-400 rounded-full relative"/>
                </div>
              </div>
              <p className="text-green-400 text-sm flex items-center gap-2"><CheckCircle size={14}/>Location shared with client</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Camera size={20}/>Upload Completion Photos</h3>
            <p className="text-white/60 text-sm mb-4">You must upload at least one photo showing completed work before marking task as done.</p>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              {photos.map((p, i) => (
                <div key={p.id} className="bg-green-500/20 border border-green-400/30 rounded-lg h-32 flex items-center justify-center">
                  <CheckCircle className="text-green-400" size={32}/>
                </div>
              ))}
              {photos.length < 3 && (
                <button onClick={addPhoto} className="border-2 border-dashed border-white/30 rounded-lg h-32 flex flex-col items-center justify-center hover:border-cyan-500 transition">
                  <Upload className="text-white/50 mb-2" size={24}/>
                  <span className="text-white/50 text-sm">Add Photo</span>
                </button>
              )}
            </div>
            
            {photos.length === 0 && (
              <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-lg p-3 mb-4">
                <p className="text-yellow-300 text-sm flex items-center gap-2"><AlertCircle size={16}/>Please upload at least one photo to complete the task</p>
              </div>
            )}
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">Mark as Complete</h3>
            <p className="text-white/70 mb-4">Once you've finished and uploaded photos, mark the task as complete. The client will review and release payment from escrow.</p>
            <button 
              onClick={() => { 
                if (photos.length > 0) {
                  setCompletionPhotos(photos);
                  setTaskCompleted(true);
                  showNotif('Task marked complete! Awaiting client approval for payment.');
                  setTaskerActiveTask(null);
                  setCurrentView('tasker-dashboard');
                } else {
                  alert('Please upload at least one completion photo');
                }
              }} 
              disabled={photos.length === 0}
              className={`px-6 py-3 rounded-lg font-semibold ${photos.length > 0 ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-white/20 text-white/40 cursor-not-allowed'}`}
            >
              Mark as Complete
            </button>
          </div>
        </div>
      </UniversalBackground>
    );
  };

  return (
    <div className="w-full min-h-screen overflow-auto">
      <Notification/>
      {showAuth && <AuthModal/>}
      {adminMode && <AdminModal/>}
      {currentView === 'landing' && <LandingView/>}
      {currentView === 'requester-dashboard' && <RequesterDashboard/>}
      {currentView === 'post-task' && <PostTaskView/>}
      {currentView === 'view-offers' && <ViewOffersView/>}
      {currentView === 'task-tracking' && <TaskTrackingView/>}
      {currentView === 'tasker-dashboard' && <TaskerDashboard/>}
      {currentView === 'task-detail' && <TaskDetailView/>}
      {currentView === 'tasker-active-job' && <TaskerActiveJobView/>}
      {currentView === 'payment-success' && <PaymentSuccessView/>}
      {currentView === 'admin' && <AdminDashboard/>}
    </div>
  );
}
