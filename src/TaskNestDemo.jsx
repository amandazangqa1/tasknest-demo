import React, { useState, useEffect, useRef } from 'react';
import { Users,
        Briefcase,
        Shield,
        MapPin,
        DollarSign,
        Calendar,
        Clock,
        CheckCircle,
        Star,
        Wallet,
        Search,
        Menu, 
        X,
        ChevronRight,
        Award,
        Bell,
        ArrowLeft, 
        Send,
        MessageSquare,
        Upload,
        Home,
        Sparkles,
        Truck,
        Trees,
        Wrench,
        ShoppingCart,
        Package,
        Eye, 
        EyeOff,
        BadgeCheck, 
        ShieldCheck,
        Car, 
        Navigation,
        Camera,
        AlertCircle,
        Zap, 
        TrendingUp,
        Target,
        ThumbsUp,
        RotateCcw,
        Mail,
        ArrowRight, 
        User,
        CreditCard,
        Building, 
        Banknote, 
        Lock, 
        ArrowDownToLine, 
        AlertTriangle, 
        FileText, 
        Scale, 
        Gavel, 
        MessageCircle 
       } from 'lucide-react';

export default function TaskNestDemo() {
  const [currentView, setCurrentView] = useState('landing');
  const [userRole, setUserRole] = useState(null);
  const [newTask, setNewTask] = useState({ title: '', description: '', budget: '', location: '', deadline: '', category: '', fromLocation: '', toLocation: '', pickupLocation: '', storeLocation: '', deliveryLocation: '' });
  const [postedTask, setPostedTask] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [taskInProgress, setTaskInProgress] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [selectedBrowseTask, setSelectedBrowseTask] = useState(null);
  const [taskerActiveTask, setTaskerActiveTask] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [taskerLocation, setTaskerLocation] = useState({ lat: -26.2041, lng: 28.0473, status: 'Accepted - Preparing' });
  const [completionPhotos, setCompletionPhotos] = useState([]);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [escrowAmount, setEscrowAmount] = useState(0);
  const [taskStage, setTaskStage] = useState('accepted');
  const [viewingTaskerProfile, setViewingTaskerProfile] = useState(null);
  const [showPayFastModal, setShowPayFastModal] = useState(false);
  const [paymentTask, setPaymentTask] = useState(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [taskerBalance, setTaskerBalance] = useState(24500);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawProcessing, setWithdrawProcessing] = useState(false);
  
  // Dispute states
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [disputeTask, setDisputeTask] = useState(null);
  const [disputes, setDisputes] = useState([
    { id: 1, taskTitle: 'Package Delivery - Sandton', status: 'open', raisedBy: 'requester', reason: 'Task not completed properly', description: 'The package was left at the wrong address.', evidence: [{ type: 'photo', name: 'wrong_location.jpg' }], createdAt: '2 days ago', requester: 'John M.', tasker: 'Thabo M.', amount: 'R450', messages: [
      { sender: 'requester', text: 'The package was delivered to the wrong house.', time: '2 days ago' },
      { sender: 'tasker', text: 'I delivered to the address provided in the app.', time: '2 days ago' },
      { sender: 'admin', text: 'We are reviewing the GPS data and delivery photos.', time: '1 day ago' }
    ]},
    { id: 2, taskTitle: 'Store Return - Rosebank', status: 'resolved', raisedBy: 'tasker', reason: 'Payment not released', description: 'Task completed but payment held for 5 days.', evidence: [], createdAt: '1 week ago', requester: 'Sarah K.', tasker: 'Nomvula D.', amount: 'R350', resolution: 'Payment released to tasker after verification.', messages: [] }
  ]);
  const [activeDispute, setActiveDispute] = useState(null);
  const [showDisputeCenter, setShowDisputeCenter] = useState(false);
  const [disputeMessage, setDisputeMessage] = useState('');

  // Auth states
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authType, setAuthType] = useState(null);
  const [signStep, setSignStep] = useState(1);
  const [showPw, setShowPw] = useState(false);
  const [forgotPw, setForgotPw] = useState(false);
  const [user, setUser] = useState(null);
  const [adminMode, setAdminMode] = useState(false);
  
  // Notification panel
  const [showNotifPanel, setShowNotifPanel] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'match', title: 'New task matches your skills!', desc: 'Package delivery in Sandton', time: '2m ago', read: false },
    { id: 2, type: 'offer', title: 'New offer received', desc: 'R850 for your cleaning task', time: '15m ago', read: false },
  ]);

  // Tasker profile data
  const [taskerProfile, setTaskerProfile] = useState({
    serviceRadius: 15,
    minTaskFee: 150,
    portfolio: [
      { id: 1, type: 'image', title: 'Package Delivery', description: 'Same-day delivery completed' },
      { id: 2, type: 'image', title: 'Store Returns', description: 'Handled multiple store returns' }
    ]
  });
  const [showProfileModal, setShowProfileModal] = useState(false);

  const [users, setUsers] = useState([
    { email: 'admin@tasknest.com', password: 'admin123', type: 'admin', name: 'Admin' },
    { email: 'tasker@test.com', password: 'test123', type: 'tasker', name: 'Thabo M.', verified: true, policeCleared: true, hasLicense: true, skills: ['Package Pick Ups', 'Deliveries', 'Queueing'], location: 'Johannesburg', rating: 4.9, completedTasks: 87, serviceRadius: 20, minTaskFee: 100, portfolio: [{ id: 1, type: 'image', title: 'Package Delivery' }], reviews: [
      { id: 1, reviewer: 'Sarah K.', rating: 5, comment: 'Excellent service! Very professional and on time.', date: '2 weeks ago' },
      { id: 2, reviewer: 'John M.', rating: 5, comment: 'Thabo was amazing. Handled my package with care.', date: '1 month ago' },
      { id: 3, reviewer: 'Linda P.', rating: 4, comment: 'Good communication throughout the delivery.', date: '1 month ago' }
    ] },
    { email: 'req@test.com', password: 'test123', type: 'requester', name: 'Jane S.' }
  ]);
  const [form, setForm] = useState({ fn: '', ln: '', email: '', phone: '', pw: '', cpw: '', addr: '', city: '', idNum: '', idPhoto: null, por: null, pc: null, dl: null });
  const [login, setLogin] = useState({ email: '', pw: '' });

  // Task stages for tracking
  const stageOrder = ['accepted', 'en_route_pickup', 'at_pickup', 'in_transit', 'at_delivery', 'completed'];
  
  // Simulate tasker movement through stages
  useEffect(() => {
    if ((taskInProgress || taskerActiveTask) && !taskCompleted) {
      let count = 0;
      const interval = setInterval(() => {
        count++;
        setTaskerLocation(prev => ({
          ...prev,
          lat: prev.lat + (Math.random() - 0.5) * 0.001,
          lng: prev.lng + (Math.random() - 0.5) * 0.001,
        }));
        
        // Auto progress stages for demo
        if (count === 3) setTaskStage('en_route_pickup');
        if (count === 6) setTaskStage('at_pickup');
        if (count === 9) setTaskStage('in_transit');
        if (count === 12) setTaskStage('at_delivery');
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [taskInProgress, taskerActiveTask, taskCompleted]);

  const getStageLabel = (stage) => {
    const labels = {
      'accepted': 'Task Accepted - Preparing',
      'en_route_pickup': 'En Route to Pickup',
      'at_pickup': 'At Pickup Location',
      'in_transit': 'In Transit to Delivery',
      'at_delivery': 'At Delivery Location',
      'completed': 'Task Completed'
    };
    return labels[stage] || stage;
  };

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

  const showNotif = (msg) => {
    setNotificationMessage(msg);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };
  
  const addNotification = (type, title, desc) => {
    const newNotif = { id: Date.now(), type, title, desc, time: 'Just now', read: false };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const goHome = () => { setCurrentView('landing'); setShowAuth(false); setAdminMode(false); };
  const serviceFee = (amount) => Math.round(parseFloat(amount || 0) * 0.15);
  const totalWithFee = (amount) => Math.round(parseFloat(amount || 0) * 1.15);

  // AI Matching Functions
  const calculateMatchScore = (task, tasker) => {
    let score = 0;
    if (tasker.skills?.some(s => s.toLowerCase().includes(task.category?.toLowerCase()))) score += 40;
    if (tasker.location?.toLowerCase().includes(task.location?.toLowerCase().split(',')[0])) score += 30;
    if (tasker.rating >= 4.5) score += 20;
    if (tasker.completedTasks > 50) score += 10;
    return Math.min(score, 100);
  };

  const getRecommendedTasks = () => {
    const taskerData = user || { skills: ['Deliveries', 'Package Pick Ups'], location: 'Johannesburg' };
    return availableTasks
      .map(task => ({ ...task, matchScore: calculateMatchScore(task, taskerData) }))
      .filter(t => t.matchScore > 30)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3);
  };

  const getSuggestedTaskers = () => {
    if (!newTask.category) return [];
    return taskersDatabase
      .map(tasker => ({ ...tasker, matchScore: calculateMatchScore(newTask, tasker) }))
      .filter(t => t.matchScore > 20)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3);
  };

  const doLogin = () => {
    const u = users.find(x => x.email === login.email && x.password === login.pw);
    if (u) {
      setUser(u);
      setShowAuth(false);
      setLogin({ email: '', pw: '' });
      if (u.type === 'admin') setCurrentView('admin');
      else if (u.type === 'tasker') { setUserRole('tasker'); setCurrentView('tasker-dashboard'); }
      else { setUserRole('requester'); setCurrentView('requester-dashboard'); }
    } else alert('Invalid credentials');
  };
  
  const doAdminLogin = () => {
    const a = users.find(x => x.email === login.email && x.password === login.pw && x.type === 'admin');
    if (a) { setUser(a); setAdminMode(false); setCurrentView('admin'); setLogin({ email: '', pw: '' }); }
    else alert('Invalid admin credentials');
  };
  
  const doSignUp = () => {
    if (form.pw !== form.cpw) { alert('Passwords must match'); return; }
    const nu = { email: form.email, password: form.pw, type: authType, name: `${form.fn} ${form.ln}`, verified: true, policeCleared: !!form.pc, hasLicense: !!form.dl, skills: [], location: form.city, rating: 0, completedTasks: 0, reviews: [] };
    setUsers([...users, nu]);
    setUser(nu);
    setShowAuth(false);
    setSignStep(1);
    setAuthType(null);
    setForm({ fn: '', ln: '', email: '', phone: '', pw: '', cpw: '', addr: '', city: '', idNum: '', idPhoto: null, por: null, pc: null, dl: null });
    if (authType === 'tasker') { setUserRole('tasker'); setCurrentView('tasker-dashboard'); }
    else { setUserRole('requester'); setCurrentView('requester-dashboard'); }
  };
  
  const logout = () => { setUser(null); setUserRole(null); setCurrentView('landing'); };

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: userRole, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
      setNewMessage('');
      addNotification('message', 'New message', newMessage.substring(0, 30) + '...');
    }
  };

  const taskersDatabase = [
    { id: 1, name: 'Thabo Mokwena', email: 'thabo@test.com', rating: 4.9, completedTasks: 87, skills: ['Package Pick Ups', 'Deliveries', 'Queueing'], location: 'Johannesburg', verified: true, policeCleared: true, hasLicense: true, serviceRadius: 20, minTaskFee: 100, portfolio: [{ id: 1, type: 'image', title: 'Package Delivery' }, { id: 2, type: 'image', title: 'Store Pickup' }], reviews: [
      { id: 1, reviewer: 'Sarah K.', rating: 5, comment: 'Excellent service! Very professional and on time.', date: '2 weeks ago' },
      { id: 2, reviewer: 'John M.', rating: 5, comment: 'Thabo was amazing. Handled my package with care.', date: '1 month ago' },
      { id: 3, reviewer: 'Linda P.', rating: 4, comment: 'Good communication throughout the delivery.', date: '1 month ago' }
    ] },
    { id: 2, name: 'Nomvula Dlamini', email: 'nomvula@test.com', rating: 4.7, completedTasks: 54, skills: ['Store Returns/Exchanges', 'Queueing', 'Mailing Packages'], location: 'Pretoria', verified: true, policeCleared: true, hasLicense: false, serviceRadius: 15, minTaskFee: 120, portfolio: [{ id: 1, type: 'image', title: 'Store Return' }], reviews: [
      { id: 1, reviewer: 'Mike T.', rating: 5, comment: 'Very helpful with my store returns!', date: '3 weeks ago' },
      { id: 2, reviewer: 'Anna B.', rating: 4, comment: 'Quick and efficient service.', date: '2 months ago' }
    ] },
    { id: 3, name: 'Sipho Ndlovu', email: 'sipho@test.com', rating: 4.8, completedTasks: 112, skills: ['Deliveries', 'Package Pick Ups', 'Mailing Packages'], location: 'Johannesburg', verified: true, policeCleared: true, hasLicense: true, serviceRadius: 25, minTaskFee: 80, portfolio: [{ id: 1, type: 'image', title: 'Express Delivery' }, { id: 2, type: 'image', title: 'Bulk Packages' }], reviews: [
      { id: 1, reviewer: 'David L.', rating: 5, comment: 'Best delivery service I\'ve used!', date: '1 week ago' },
      { id: 2, reviewer: 'Grace M.', rating: 5, comment: 'Always reliable and friendly.', date: '2 weeks ago' },
      { id: 3, reviewer: 'Peter K.', rating: 4, comment: 'Good job overall.', date: '1 month ago' }
    ] },
  ];

  const offers = [
    { id: 1, taskerName: 'Thabo Mokwena', rating: 4.9, completedTasks: 87, price: 'R850', proposal: 'I have 5+ years experience with deliveries and package handling.', availability: 'Available today', verified: true, policeCleared: true, hasLicense: true, taskerData: taskersDatabase[0] },
    { id: 2, taskerName: 'Nomvula Dlamini', rating: 4.7, completedTasks: 54, price: 'R950', proposal: 'Licensed with insurance. Expert in store returns.', availability: 'Tomorrow', verified: true, policeCleared: true, hasLicense: false, taskerData: taskersDatabase[1] },
    { id: 3, taskerName: 'Sipho Ndlovu', rating: 4.8, completedTasks: 112, price: 'R800', proposal: 'Quick and reliable. Over 100 successful deliveries.', availability: 'Today', verified: true, policeCleared: true, hasLicense: true, taskerData: taskersDatabase[2] }
  ];

  const categories = ['Package Pick Ups', 'Store Returns/Exchanges', 'Mailing Packages', 'Deliveries', 'Queueing'];
  
  const availableTasks = [
    { id: 1, title: 'Pick up package from depot', category: 'Package Pick Ups', budget: 'R450', location: 'Sandton', fromLocation: 'DHL Depot Sandton', toLocation: '15 Main Road, Rosebank', deadline: 'Today', description: 'Need someone to collect my package from the depot.', requester: 'John M.', postedTime: '2h ago' },
    { id: 2, title: 'Return items to Woolworths', category: 'Store Returns/Exchanges', budget: 'R350', location: 'Rosebank', pickupLocation: '22 Oxford Road', storeLocation: 'Woolworths Rosebank Mall', deliveryLocation: '22 Oxford Road', deadline: 'Tomorrow', description: 'Return 3 items and bring receipt back.', requester: 'Sarah K.', postedTime: '4h ago' },
    { id: 3, title: 'Deliver documents', category: 'Deliveries', budget: 'R200', location: 'Johannesburg CBD', fromLocation: '100 Fox Street', toLocation: '50 Main Street', deadline: '2 days', description: 'Urgent document delivery needed.', requester: 'David L.', postedTime: '1h ago' },
    { id: 4, title: 'Queue at Home Affairs', category: 'Queueing', budget: 'R500', location: 'Randburg', deadline: '3 days', description: 'Need someone to queue for passport application.', requester: 'Linda P.', postedTime: '5h ago' }
  ];

  const Badges = ({ t }) => (
    <div className="flex gap-1 flex-wrap mt-1">
      {t?.verified && <span className="flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full text-xs"><BadgeCheck size={10}/>Verified</span>}
      {t?.policeCleared && <span className="flex items-center gap-1 bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full text-xs"><ShieldCheck size={10}/>Police</span>}
      {t?.hasLicense && <span className="flex items-center gap-1 bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full text-xs"><Car size={10}/>Driver</span>}
    </div>
  );

  // Tasker Profile Modal Component
  // PayFast Payment Modal
  const PayFastModal = () => {
    const [paymentStep, setPaymentStep] = useState('checkout'); // checkout, processing, success
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '', name: '' });

    const processPayment = () => {
      setPaymentStep('processing');
      setPaymentProcessing(true);
      
      // Simulate payment processing
      setTimeout(() => {
        setPaymentStep('success');
        setPaymentProcessing(false);
        
        // Complete the task posting
        setTimeout(() => {
          setPostedTask({...paymentTask});
          setEscrowAmount(totalWithFee(paymentTask.budget));
          showNotif('Payment successful! R' + totalWithFee(paymentTask.budget) + ' held in escrow');
          addNotification('payment', 'Payment Confirmed', 'Funds secured in escrow');
          setShowPayFastModal(false);
          setPaymentTask(null);
          setPaymentStep('checkout');
          setCurrentView('requester-dashboard');
        }, 1500);
      }, 2500);
    };

    if (!showPayFastModal) return null;

    return (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl">
          {/* PayFast Header */}
          <div className="bg-gradient-to-r from-[#00457C] to-[#0066B2] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-lg p-2">
                <CreditCard className="text-[#00457C]" size={24}/>
              </div>
              <div>
                <h2 className="text-white font-bold text-lg">PayFast</h2>
                <p className="text-white/80 text-xs">Secure Checkout</p>
              </div>
            </div>
            <button onClick={() => { setShowPayFastModal(false); setPaymentTask(null); }} className="text-white/80 hover:text-white">
              <X size={24}/>
            </button>
          </div>

          {paymentStep === 'checkout' && (
            <div className="p-6">
              {/* Order Summary */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Task: {paymentTask?.title}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Task Budget</span>
                    <span>R{paymentTask?.budget}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Service Fee (15%)</span>
                    <span>R{serviceFee(paymentTask?.budget)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-gray-800">
                    <span>Total</span>
                    <span>R{totalWithFee(paymentTask?.budget)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Payment Method</h3>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'card', label: 'Card', icon: CreditCard },
                    { id: 'eft', label: 'EFT', icon: Building },
                    { id: 'wallet', label: 'Wallet', icon: Wallet }
                  ].map(method => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-3 rounded-lg border-2 flex flex-col items-center gap-1 transition ${paymentMethod === method.id ? 'border-[#00457C] bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <method.icon size={20} className={paymentMethod === method.id ? 'text-[#00457C]' : 'text-gray-500'}/>
                      <span className={`text-xs ${paymentMethod === method.id ? 'text-[#00457C] font-medium' : 'text-gray-500'}`}>{method.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Card Details */}
              {paymentMethod === 'card' && (
                <div className="space-y-3 mb-6">
                  <input
                    placeholder="Card Number"
                    value={cardDetails.number}
                    onChange={e => setCardDetails({...cardDetails, number: e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim()})}
                    maxLength={19}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00457C] focus:border-transparent"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={e => setCardDetails({...cardDetails, expiry: e.target.value})}
                      maxLength={5}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00457C] focus:border-transparent"
                    />
                    <input
                      placeholder="CVV"
                      type="password"
                      value={cardDetails.cvv}
                      onChange={e => setCardDetails({...cardDetails, cvv: e.target.value})}
                      maxLength={3}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00457C] focus:border-transparent"
                    />
                  </div>
                  <input
                    placeholder="Cardholder Name"
                    value={cardDetails.name}
                    onChange={e => setCardDetails({...cardDetails, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00457C] focus:border-transparent"
                  />
                </div>
              )}

              {paymentMethod === 'eft' && (
                <div className="bg-blue-50 rounded-lg p-4 mb-6 text-sm text-gray-700">
                  <p className="font-medium mb-2">Instant EFT</p>
                  <p>You'll be redirected to your bank to complete the payment securely.</p>
                </div>
              )}

              {paymentMethod === 'wallet' && (
                <div className="bg-blue-50 rounded-lg p-4 mb-6 text-sm text-gray-700">
                  <p className="font-medium mb-2">PayFast Wallet</p>
                  <p>Pay using your PayFast wallet balance.</p>
                </div>
              )}

              {/* Security Notice */}
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                <Lock size={14}/>
                <span>256-bit SSL encryption. Your payment info is secure.</span>
              </div>

              <button
                onClick={processPayment}
                className="w-full py-4 bg-gradient-to-r from-[#00457C] to-[#0066B2] text-white rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
              >
                <Lock size={18}/>
                Pay R{totalWithFee(paymentTask?.budget)}
              </button>
            </div>
          )}

          {paymentStep === 'processing' && (
            <div className="p-12 text-center">
              <div className="w-16 h-16 border-4 border-[#00457C] border-t-transparent rounded-full animate-spin mx-auto mb-6"/>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Processing Payment</h3>
              <p className="text-gray-600">Please wait while we securely process your payment...</p>
            </div>
          )}

          {paymentStep === 'success' && (
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-green-500" size={40}/>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Payment Successful!</h3>
              <p className="text-gray-600 mb-4">R{totalWithFee(paymentTask?.budget)} has been secured in escrow.</p>
              <p className="text-sm text-gray-500">Redirecting to your dashboard...</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Withdraw Modal for Taskers
  const WithdrawModal = () => {
    const [withdrawStep, setWithdrawStep] = useState('form'); // form, processing, success
    const [bankDetails, setBankDetails] = useState({ bank: '', accountNumber: '', accountType: 'savings' });

    const processWithdraw = () => {
      if (!withdrawAmount || parseFloat(withdrawAmount) <= 0 || parseFloat(withdrawAmount) > taskerBalance) {
        alert('Please enter a valid amount');
        return;
      }
      
      setWithdrawStep('processing');
      setWithdrawProcessing(true);
      
      setTimeout(() => {
        setWithdrawStep('success');
        setWithdrawProcessing(false);
        setTaskerBalance(prev => prev - parseFloat(withdrawAmount));
        
        setTimeout(() => {
          showNotif('Withdrawal of R' + withdrawAmount + ' initiated!');
          addNotification('payment', 'Withdrawal Initiated', 'Funds will arrive in 1-2 business days');
          setShowWithdrawModal(false);
          setWithdrawAmount('');
          setWithdrawStep('form');
        }, 2000);
      }, 2500);
    };

    if (!showWithdrawModal) return null;

    return (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-lg p-2">
                <Banknote className="text-green-600" size={24}/>
              </div>
              <div>
                <h2 className="text-white font-bold text-lg">Withdraw Funds</h2>
                <p className="text-white/80 text-xs">Transfer to your bank account</p>
              </div>
            </div>
            <button onClick={() => { setShowWithdrawModal(false); setWithdrawStep('form'); }} className="text-white/80 hover:text-white">
              <X size={24}/>
            </button>
          </div>

          {withdrawStep === 'form' && (
            <div className="p-6">
              {/* Balance Card */}
              <div className="bg-gradient-to-r from-cyan-500 to-teal-600 rounded-xl p-4 mb-6 text-white">
                <p className="text-sm opacity-80">Available Balance</p>
                <p className="text-3xl font-bold">R{taskerBalance.toLocaleString()}</p>
              </div>

              {/* Amount Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Withdrawal Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">R</span>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={e => setWithdrawAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full p-3 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-xl font-semibold"
                  />
                </div>
                <button 
                  onClick={() => setWithdrawAmount(taskerBalance.toString())}
                  className="mt-2 text-sm text-green-600 hover:underline"
                >
                  Withdraw all
                </button>
              </div>

              {/* Bank Details */}
              <div className="space-y-3 mb-6">
                <h3 className="font-semibold text-gray-800">Bank Details</h3>
                <select
                  value={bankDetails.bank}
                  onChange={e => setBankDetails({...bankDetails, bank: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select Bank</option>
                  <option value="fnb">FNB</option>
                  <option value="standard">Standard Bank</option>
                  <option value="absa">ABSA</option>
                  <option value="nedbank">Nedbank</option>
                  <option value="capitec">Capitec</option>
                </select>
                <input
                  placeholder="Account Number"
                  value={bankDetails.accountNumber}
                  onChange={e => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <div className="flex gap-3">
                  {['savings', 'cheque'].map(type => (
                    <button
                      key={type}
                      onClick={() => setBankDetails({...bankDetails, accountType: type})}
                      className={`flex-1 p-3 rounded-lg border-2 capitalize ${bankDetails.accountType === type ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-600'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fee Notice */}
              <div className="bg-gray-50 rounded-lg p-3 mb-4 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Withdrawal Amount</span>
                  <span>R{withdrawAmount || '0'}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Processing Fee</span>
                  <span>R0.00</span>
                </div>
                <div className="flex justify-between font-bold text-gray-800 pt-2 border-t mt-2">
                  <span>You'll Receive</span>
                  <span>R{withdrawAmount || '0'}</span>
                </div>
              </div>

              <button
                onClick={processWithdraw}
                disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0}
                className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowDownToLine size={18}/>
                Withdraw R{withdrawAmount || '0'}
              </button>
            </div>
          )}

          {withdrawStep === 'processing' && (
            <div className="p-12 text-center">
              <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"/>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Processing Withdrawal</h3>
              <p className="text-gray-600">Please wait while we process your request...</p>
            </div>
          )}

          {withdrawStep === 'success' && (
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-green-500" size={40}/>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Withdrawal Initiated!</h3>
              <p className="text-gray-600 mb-4">R{withdrawAmount} will arrive in 1-2 business days.</p>
              <p className="text-sm text-gray-500">Redirecting...</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Raise Dispute Modal
  const RaiseDisputeModal = () => {
    const [disputeData, setDisputeData] = useState({ reason: '', description: '' });
    const [evidenceFiles, setEvidenceFiles] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    const disputeReasons = [
      'Task not completed properly',
      'Task not completed at all',
      'Quality issues',
      'Payment dispute',
      'Communication issues',
      'Damage to property',
      'Other'
    ];

    const addEvidence = () => {
      setEvidenceFiles([...evidenceFiles, { id: Date.now(), type: 'photo', name: `evidence_${evidenceFiles.length + 1}.jpg` }]);
    };

    const submitDispute = () => {
      if (!disputeData.reason || !disputeData.description) {
        alert('Please fill in all required fields');
        return;
      }
      
      setSubmitting(true);
      setTimeout(() => {
        const newDispute = {
          id: Date.now(),
          taskTitle: disputeTask?.title || 'Task',
          status: 'open',
          raisedBy: userRole,
          reason: disputeData.reason,
          description: disputeData.description,
          evidence: evidenceFiles,
          createdAt: 'Just now',
          requester: userRole === 'requester' ? (user?.name || 'You') : disputeTask?.requester,
          tasker: userRole === 'tasker' ? (user?.name || 'You') : disputeTask?.tasker,
          amount: disputeTask?.budget || disputeTask?.price || 'R0',
          messages: []
        };
        
        setDisputes([newDispute, ...disputes]);
        setSubmitting(false);
        setShowDisputeModal(false);
        setDisputeTask(null);
        showNotif('Dispute submitted. Our team will review within 24-48 hours.');
        addNotification('dispute', 'Dispute Raised', 'Your dispute has been submitted for review');
      }, 1500);
    };

    if (!showDisputeModal) return null;

    return (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-white/20">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-600 to-red-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-lg p-2">
                <AlertTriangle className="text-white" size={24}/>
              </div>
              <div>
                <h2 className="text-white font-bold text-lg">Raise a Dispute</h2>
                <p className="text-white/80 text-xs">We're here to help resolve issues</p>
              </div>
            </div>
            <button onClick={() => { setShowDisputeModal(false); setDisputeTask(null); }} className="text-white/80 hover:text-white">
              <X size={24}/>
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Task Info */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-white/60 text-sm">Disputing Task</p>
              <p className="text-white font-semibold">{disputeTask?.title || 'Task'}</p>
              <p className="text-cyan-400 text-sm">{disputeTask?.budget || disputeTask?.price}</p>
            </div>

            {/* Reason Selection */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Reason for Dispute *</label>
              <select
                value={disputeData.reason}
                onChange={e => setDisputeData({...disputeData, reason: e.target.value})}
                className="w-full p-3 bg-white/10 border border-white/30 rounded-lg text-white"
              >
                <option value="" className="bg-slate-800">Select a reason</option>
                {disputeReasons.map(reason => (
                  <option key={reason} value={reason} className="bg-slate-800">{reason}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Describe the Issue *</label>
              <textarea
                value={disputeData.description}
                onChange={e => setDisputeData({...disputeData, description: e.target.value})}
                rows={4}
                placeholder="Please provide details about what happened..."
                className="w-full p-3 bg-white/10 border border-white/30 rounded-lg text-white resize-none"
              />
            </div>

            {/* Evidence Upload */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Upload Evidence (Optional)</label>
              <p className="text-white/50 text-xs mb-3">Photos, screenshots, or documents that support your case</p>
              <div className="grid grid-cols-3 gap-2">
                {evidenceFiles.map((file, i) => (
                  <div key={file.id} className="bg-green-500/20 border border-green-400/30 rounded-lg h-20 flex items-center justify-center relative">
                    <FileText className="text-green-400" size={24}/>
                    <button 
                      onClick={() => setEvidenceFiles(evidenceFiles.filter((_, j) => j !== i))}
                      className="absolute top-1 right-1 w-5 h-5 bg-red-500/80 rounded-full flex items-center justify-center"
                    >
                      <X size={12} className="text-white"/>
                    </button>
                  </div>
                ))}
                {evidenceFiles.length < 5 && (
                  <button 
                    onClick={addEvidence}
                    className="border-2 border-dashed border-white/30 rounded-lg h-20 flex flex-col items-center justify-center hover:border-cyan-500 transition"
                  >
                    <Upload className="text-white/50 mb-1" size={20}/>
                    <span className="text-white/50 text-xs">Add File</span>
                  </button>
                )}
              </div>
            </div>

            {/* Info Notice */}
            <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-3">
              <p className="text-blue-300 text-sm flex items-start gap-2">
                <Scale size={16} className="mt-0.5 flex-shrink-0"/>
                <span>Our team will review all evidence and may contact both parties. Most disputes are resolved within 48 hours.</span>
              </p>
            </div>

            {/* Submit Button */}
            <button
              onClick={submitDispute}
              disabled={submitting || !disputeData.reason || !disputeData.description}
              className="w-full py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                  Submitting...
                </>
              ) : (
                <>
                  <Gavel size={18}/>
                  Submit Dispute
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Dispute Center Modal
  const DisputeCenterModal = () => {
    const myDisputes = disputes.filter(d => 
      (userRole === 'requester' && d.raisedBy === 'requester') ||
      (userRole === 'tasker' && d.raisedBy === 'tasker') ||
      user?.type === 'admin'
    );

    const sendDisputeMessage = () => {
      if (!disputeMessage.trim() || !activeDispute) return;
      
      const updatedDisputes = disputes.map(d => {
        if (d.id === activeDispute.id) {
          return {
            ...d,
            messages: [...d.messages, { sender: userRole, text: disputeMessage, time: 'Just now' }]
          };
        }
        return d;
      });
      
      setDisputes(updatedDisputes);
      setActiveDispute({...activeDispute, messages: [...activeDispute.messages, { sender: userRole, text: disputeMessage, time: 'Just now' }]});
      setDisputeMessage('');
    };

    if (!showDisputeCenter) return null;

    return (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-white/20 flex">
          {/* Disputes List */}
          <div className="w-1/3 border-r border-white/20 flex flex-col">
            <div className="p-4 border-b border-white/20">
              <h2 className="text-white font-bold text-lg flex items-center gap-2">
                <Scale size={20}/>Dispute Center
              </h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              {myDisputes.length === 0 ? (
                <div className="p-6 text-center">
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3"/>
                  <p className="text-white/70">No disputes</p>
                </div>
              ) : (
                myDisputes.map(dispute => (
                  <div
                    key={dispute.id}
                    onClick={() => setActiveDispute(dispute)}
                    className={`p-4 border-b border-white/10 cursor-pointer hover:bg-white/5 ${activeDispute?.id === dispute.id ? 'bg-white/10' : ''}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-white font-medium text-sm truncate flex-1">{dispute.taskTitle}</p>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${dispute.status === 'open' ? 'bg-orange-500/20 text-orange-400' : dispute.status === 'in_review' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
                        {dispute.status === 'in_review' ? 'In Review' : dispute.status}
                      </span>
                    </div>
                    <p className="text-white/50 text-xs">{dispute.reason}</p>
                    <p className="text-white/40 text-xs mt-1">{dispute.createdAt}</p>
                  </div>
                ))
              )}
            </div>
            <button onClick={() => { setShowDisputeCenter(false); setActiveDispute(null); }} className="p-4 border-t border-white/20 text-white/60 hover:text-white text-sm">
              Close
            </button>
          </div>

          {/* Dispute Details */}
          <div className="flex-1 flex flex-col">
            {activeDispute ? (
              <>
                <div className="p-4 border-b border-white/20">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-white font-bold">{activeDispute.taskTitle}</h3>
                      <p className="text-cyan-400 text-sm">{activeDispute.amount}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${activeDispute.status === 'open' ? 'bg-orange-500/20 text-orange-400' : activeDispute.status === 'in_review' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
                      {activeDispute.status === 'in_review' ? 'In Review' : activeDispute.status}
                    </span>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {/* Dispute Info */}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h4 className="text-white font-semibold mb-2">Dispute Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/60">Reason:</span>
                        <span className="text-white">{activeDispute.reason}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Raised by:</span>
                        <span className="text-white capitalize">{activeDispute.raisedBy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Requester:</span>
                        <span className="text-white">{activeDispute.requester}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Tasker:</span>
                        <span className="text-white">{activeDispute.tasker}</span>
                      </div>
                    </div>
                    <p className="text-white/80 mt-3 pt-3 border-t border-white/10">{activeDispute.description}</p>
                  </div>

                  {/* Evidence */}
                  {activeDispute.evidence.length > 0 && (
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <h4 className="text-white font-semibold mb-2">Evidence</h4>
                      <div className="flex gap-2 flex-wrap">
                        {activeDispute.evidence.map((e, i) => (
                          <div key={i} className="bg-white/10 rounded-lg px-3 py-2 flex items-center gap-2">
                            <FileText size={14} className="text-cyan-400"/>
                            <span className="text-white text-sm">{e.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Resolution (if resolved) */}
                  {activeDispute.status === 'resolved' && activeDispute.resolution && (
                    <div className="bg-green-500/20 border border-green-400/30 rounded-xl p-4">
                      <h4 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle size={16}/>Resolution
                      </h4>
                      <p className="text-green-300 text-sm">{activeDispute.resolution}</p>
                    </div>
                  )}

                  {/* Messages */}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <MessageCircle size={16}/>Discussion
                    </h4>
                    <div className="space-y-3 max-h-48 overflow-y-auto">
                      {activeDispute.messages.length === 0 ? (
                        <p className="text-white/50 text-sm text-center py-4">No messages yet</p>
                      ) : (
                        activeDispute.messages.map((msg, i) => (
                          <div key={i} className={`p-3 rounded-lg ${msg.sender === 'admin' ? 'bg-purple-500/20 border border-purple-400/30' : msg.sender === userRole ? 'bg-cyan-500/20 ml-8' : 'bg-white/10 mr-8'}`}>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-xs font-medium ${msg.sender === 'admin' ? 'text-purple-400' : msg.sender === userRole ? 'text-cyan-400' : 'text-white/60'}`}>
                                {msg.sender === 'admin' ? '🛡️ Admin' : msg.sender === userRole ? 'You' : msg.sender === 'requester' ? 'Requester' : 'Tasker'}
                              </span>
                              <span className="text-white/40 text-xs">{msg.time}</span>
                            </div>
                            <p className="text-white text-sm">{msg.text}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Message Input */}
                {activeDispute.status !== 'resolved' && (
                  <div className="p-4 border-t border-white/20">
                    <div className="flex gap-2">
                      <input
                        value={disputeMessage}
                        onChange={e => setDisputeMessage(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && sendDisputeMessage()}
                        placeholder="Type your message..."
                        className="flex-1 p-3 bg-white/10 border border-white/30 rounded-lg text-white text-sm"
                      />
                      <button onClick={sendDisputeMessage} className="px-4 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700">
                        <Send size={18}/>
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <Scale className="w-16 h-16 text-white/20 mx-auto mb-4"/>
                  <p className="text-white/50">Select a dispute to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Tasker Profile Modal Component
  const TaskerProfileModal = ({ tasker, onClose }) => {
    if (!tasker) return null;
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
          <div className="p-6 border-b border-white/20 flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {tasker.name?.charAt(0) || tasker.taskerName?.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-white">{tasker.name || tasker.taskerName}</h2>
                  <BadgeCheck className="text-cyan-400" size={20}/>
                </div>
                <Badges t={tasker.taskerData || tasker}/>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="fill-yellow-400" size={16}/>
                    <span className="text-white font-semibold">{tasker.rating}</span>
                  </div>
                  <span className="text-white/60 text-sm">{tasker.completedTasks} tasks completed</span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="text-white/60 hover:text-white"><X size={24}/></button>
          </div>

          {/* Portfolio Section */}
          <div className="p-6 border-b border-white/20">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><Camera size={18}/>Portfolio</h3>
            <div className="grid grid-cols-3 gap-3">
              {(tasker.taskerData?.portfolio || tasker.portfolio || []).map((item, i) => (
                <div key={i} className="bg-white/10 rounded-lg h-24 flex items-center justify-center border border-white/20">
                  <div className="text-center">
                    <Package className="text-cyan-400 mx-auto mb-1" size={24}/>
                    <p className="text-white/70 text-xs">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><Star size={18}/>Reviews</h3>
            <div className="space-y-4">
              {(tasker.taskerData?.reviews || tasker.reviews || []).map((review) => (
                <div key={review.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400 text-sm font-bold">
                        {review.reviewer.charAt(0)}
                      </div>
                      <span className="text-white font-medium">{review.reviewer}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'}/>
                      ))}
                    </div>
                  </div>
                  <p className="text-white/80 text-sm">{review.comment}</p>
                  <p className="text-white/40 text-xs mt-2">{review.date}</p>
                </div>
              ))}
              {(!tasker.taskerData?.reviews && !tasker.reviews) && (
                <p className="text-white/50 text-center py-4">No reviews yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

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

  const NotificationPanel = () => (
    <div className="absolute right-0 top-full mt-2 w-80 bg-slate-800 rounded-xl border border-white/20 shadow-2xl z-50 max-h-96 overflow-y-auto">
      <div className="p-4 border-b border-white/20 flex justify-between items-center">
        <h3 className="text-white font-semibold">Notifications</h3>
        <button onClick={() => setNotifications(prev => prev.map(n => ({...n, read: true})))} className="text-cyan-400 text-xs">Mark all read</button>
      </div>
      <div className="divide-y divide-white/10">
        {notifications.map(n => (
          <div key={n.id} className={`p-4 hover:bg-white/5 cursor-pointer ${!n.read ? 'bg-cyan-500/10' : ''}`}>
            <div className="flex gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${n.type === 'match' ? 'bg-green-500/20' : n.type === 'offer' ? 'bg-cyan-500/20' : 'bg-purple-500/20'}`}>
                {n.type === 'match' ? <Target className="text-green-400" size={14}/> : n.type === 'offer' ? <DollarSign className="text-cyan-400" size={14}/> : <MessageSquare className="text-purple-400" size={14}/>}
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{n.title}</p>
                <p className="text-white/60 text-xs">{n.desc}</p>
                <p className="text-white/40 text-xs mt-1">{n.time}</p>
              </div>
              {!n.read && <div className="w-2 h-2 bg-cyan-400 rounded-full"/>}
            </div>
          </div>
        ))}
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
          <div className="relative">
            <button onClick={() => setShowNotifPanel(!showNotifPanel)} className="relative">
              <Bell className="w-6 h-6 text-white/80 cursor-pointer"/>
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">{notifications.filter(n => !n.read).length}</span>
              )}
            </button>
            {showNotifPanel && <NotificationPanel/>}
          </div>
          {user ? (
            <>
              <button onClick={() => setShowDisputeCenter(true)} className="px-3 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg flex items-center gap-1 text-sm">
                <Scale size={16}/>Disputes
              </button>
              <span className="text-white/80 text-sm">Hi, {user.name}</span>
              <button onClick={logout} className="px-4 py-2 text-white hover:bg-white/20 rounded-lg">Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => setShowDisputeCenter(true)} className="px-3 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg flex items-center gap-1 text-sm">
                <Scale size={16}/>Disputes
              </button>
              <button onClick={goHome} className="px-4 py-2 text-white hover:bg-white/20 rounded-lg">Back</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );

  const Notification = () => showNotification && (<div className="fixed top-6 right-6 bg-white/20 backdrop-blur-md border border-white/30 px-6 py-4 rounded-lg flex items-center space-x-3 z-50"><CheckCircle className="w-6 h-6 text-green-400"/><span className="font-semibold text-white">{notificationMessage}</span></div>);

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

  // Updated Live Tracking Component for Requester
  const LiveTracking = () => {
    const currentStageIndex = stageOrder.indexOf(taskStage);
    
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2"><Navigation className="text-cyan-400" size={20}/><span className="text-white font-semibold">Live Tracking</span></div>
          <span className={`px-2 py-1 rounded-full text-xs ${taskStage === 'at_delivery' ? 'bg-green-500/20 text-green-400' : 'bg-cyan-500/20 text-cyan-300'}`}>
            {getStageLabel(taskStage)}
          </span>
        </div>
        
        <div className="bg-slate-700 rounded-lg h-48 relative overflow-hidden mb-4">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-600 to-slate-800"/>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className={`w-4 h-4 ${taskStage === 'at_delivery' ? 'bg-green-500' : 'bg-cyan-500'} rounded-full animate-ping absolute`}/>
            <div className={`w-4 h-4 ${taskStage === 'at_delivery' ? 'bg-green-400' : 'bg-cyan-400'} rounded-full relative`}/>
          </div>
          <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-xs text-white">
            📍 {taskerLocation.lat.toFixed(4)}, {taskerLocation.lng.toFixed(4)}
          </div>
        </div>

        {/* Location Details */}
        {taskInProgress && (
          <div className="space-y-2 mb-4">
            {taskInProgress.fromLocation && (
              <div className={`flex items-center gap-2 p-2 rounded-lg ${currentStageIndex >= stageOrder.indexOf('at_pickup') ? 'bg-green-500/20' : 'bg-white/5'}`}>
                <MapPin size={16} className={currentStageIndex >= stageOrder.indexOf('at_pickup') ? 'text-green-400' : 'text-cyan-400'}/>
                <div>
                  <p className="text-white/60 text-xs">Pickup</p>
                  <p className="text-white text-sm">{taskInProgress.fromLocation}</p>
                </div>
                {currentStageIndex >= stageOrder.indexOf('at_pickup') && <CheckCircle size={14} className="text-green-400 ml-auto"/>}
              </div>
            )}
            {taskInProgress.toLocation && (
              <div className={`flex items-center gap-2 p-2 rounded-lg ${currentStageIndex >= stageOrder.indexOf('at_delivery') ? 'bg-green-500/20' : 'bg-white/5'}`}>
                <MapPin size={16} className={currentStageIndex >= stageOrder.indexOf('at_delivery') ? 'text-green-400' : 'text-white/60'}/>
                <div>
                  <p className="text-white/60 text-xs">Delivery</p>
                  <p className="text-white text-sm">{taskInProgress.toLocation}</p>
                </div>
                {currentStageIndex >= stageOrder.indexOf('at_delivery') && <CheckCircle size={14} className="text-green-400 ml-auto"/>}
              </div>
            )}
          </div>
        )}

        {/* Progress Bar */}
        <div className="flex items-center gap-1 mb-2">
          {stageOrder.slice(0, -1).map((stage, i) => (
            <div key={stage} className={`flex-1 h-2 rounded-full ${i <= currentStageIndex ? 'bg-cyan-500' : 'bg-white/20'}`}/>
          ))}
        </div>
        <p className="text-white/60 text-xs text-center">
          {currentStageIndex < stageOrder.length - 2 ? `Step ${currentStageIndex + 1} of ${stageOrder.length - 1}` : 'Almost there!'}
        </p>
      </div>
    );
  };

  // Tasker's Tracking View - Shows destinations
  const TaskerTracking = () => {
    const currentStageIndex = stageOrder.indexOf(taskStage);
    const task = taskerActiveTask;
    
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2"><Navigation className="text-cyan-400" size={20}/><span className="text-white font-semibold">Your Route</span></div>
          <span className={`px-2 py-1 rounded-full text-xs ${taskStage === 'at_delivery' ? 'bg-green-500/20 text-green-400' : 'bg-cyan-500/20 text-cyan-300'}`}>
            {getStageLabel(taskStage)}
          </span>
        </div>

        {/* Map placeholder */}
        <div className="bg-slate-700 rounded-lg h-40 relative overflow-hidden mb-4">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-600 to-slate-800"/>
          {/* Route visualization */}
          <div className="absolute inset-4 flex items-center justify-between">
            <div className={`w-4 h-4 rounded-full ${currentStageIndex >= stageOrder.indexOf('at_pickup') ? 'bg-green-500' : 'bg-cyan-500'}`}/>
            <div className="flex-1 h-1 mx-2 bg-white/20 relative">
              <div className={`absolute inset-y-0 left-0 bg-cyan-500 transition-all`} style={{width: `${(currentStageIndex / (stageOrder.length - 2)) * 100}%`}}/>
            </div>
            <div className={`w-4 h-4 rounded-full ${currentStageIndex >= stageOrder.indexOf('at_delivery') ? 'bg-green-500' : 'bg-white/30'}`}/>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"/>
          </div>
        </div>

        {/* Destination Cards */}
        <div className="space-y-3">
          {/* Pickup Location */}
          {(task?.fromLocation || task?.pickupLocation) && (
            <div className={`p-3 rounded-lg border ${currentStageIndex >= stageOrder.indexOf('at_pickup') ? 'bg-green-500/20 border-green-500/30' : 'bg-white/5 border-white/10'}`}>
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${currentStageIndex >= stageOrder.indexOf('at_pickup') ? 'bg-green-500' : 'bg-cyan-500'}`}>
                  {currentStageIndex >= stageOrder.indexOf('at_pickup') ? <CheckCircle size={14} className="text-white"/> : <span className="text-white text-xs font-bold">1</span>}
                </div>
                <span className="text-white font-medium">Pickup Location</span>
              </div>
              <p className="text-white/80 text-sm ml-8">{task?.fromLocation || task?.pickupLocation}</p>
              {currentStageIndex < stageOrder.indexOf('at_pickup') && (
                <button 
                  onClick={() => setTaskStage('en_route_pickup')}
                  className="mt-2 ml-8 px-3 py-1 bg-cyan-600 text-white text-xs rounded-lg hover:bg-cyan-700"
                >
                  Navigate →
                </button>
              )}
            </div>
          )}

          {/* Store Location (for returns) */}
          {task?.storeLocation && (
            <div className={`p-3 rounded-lg border ${currentStageIndex >= stageOrder.indexOf('in_transit') ? 'bg-green-500/20 border-green-500/30' : 'bg-white/5 border-white/10'}`}>
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${currentStageIndex >= stageOrder.indexOf('in_transit') ? 'bg-green-500' : 'bg-white/30'}`}>
                  {currentStageIndex >= stageOrder.indexOf('in_transit') ? <CheckCircle size={14} className="text-white"/> : <span className="text-white text-xs font-bold">2</span>}
                </div>
                <span className="text-white font-medium">Store</span>
              </div>
              <p className="text-white/80 text-sm ml-8">{task?.storeLocation}</p>
            </div>
          )}

          {/* Delivery Location */}
          {(task?.toLocation || task?.deliveryLocation) && (
            <div className={`p-3 rounded-lg border ${currentStageIndex >= stageOrder.indexOf('at_delivery') ? 'bg-green-500/20 border-green-500/30' : 'bg-white/5 border-white/10'}`}>
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${currentStageIndex >= stageOrder.indexOf('at_delivery') ? 'bg-green-500' : 'bg-white/30'}`}>
                  {currentStageIndex >= stageOrder.indexOf('at_delivery') ? <CheckCircle size={14} className="text-white"/> : <span className="text-white text-xs font-bold">{task?.storeLocation ? '3' : '2'}</span>}
                </div>
                <span className="text-white font-medium">Delivery Location</span>
              </div>
              <p className="text-white/80 text-sm ml-8">{task?.toLocation || task?.deliveryLocation}</p>
            </div>
          )}
        </div>

        {/* Stage Update Buttons */}
        <div className="mt-4 flex gap-2">
          {taskStage === 'accepted' && (
            <button onClick={() => setTaskStage('en_route_pickup')} className="flex-1 py-2 bg-cyan-600 text-white rounded-lg text-sm">Start Route</button>
          )}
          {taskStage === 'en_route_pickup' && (
            <button onClick={() => setTaskStage('at_pickup')} className="flex-1 py-2 bg-cyan-600 text-white rounded-lg text-sm">Arrived at Pickup</button>
          )}
          {taskStage === 'at_pickup' && (
            <button onClick={() => setTaskStage('in_transit')} className="flex-1 py-2 bg-cyan-600 text-white rounded-lg text-sm">Package Collected - Start Delivery</button>
          )}
          {taskStage === 'in_transit' && (
            <button onClick={() => setTaskStage('at_delivery')} className="flex-1 py-2 bg-cyan-600 text-white rounded-lg text-sm">Arrived at Delivery</button>
          )}
        </div>
      </div>
    );
  };

  const AdminDashboard = () => (
    <UniversalBackground><NavBar title="Admin Dashboard"/>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[{l:'Users',v:'15,234'},{l:'Taskers',v:'8,567'},{l:'Revenue',v:'R2.4M'},{l:'Escrow',v:'R340K'}].map(s => (<div key={s.l} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"><p className="text-white/70 text-sm">{s.l}</p><p className="text-3xl font-bold text-white">{s.v}</p></div>))}
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"><h3 className="text-xl font-bold text-white mb-4">Pending Verifications</h3>{[{n:'Thabo M.',t:'Police'},{n:'Lindiwe K.',t:'ID'},{n:'James N.',t:'License'}].map((v,i) => (<div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-lg mb-2"><div><p className="text-white">{v.n}</p><p className="text-white/50 text-xs">{v.t}</p></div><div className="flex gap-2"><button className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-sm">Approve</button><button className="px-3 py-1 bg-red-500/20 text-red-400 rounded text-sm">Reject</button></div></div>))}</div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"><h3 className="text-xl font-bold text-white mb-4">Escrow Transactions</h3>{[{a:'Task #1234',d:'R850 held'},{a:'Task #1235',d:'R1200 held'},{a:'Task #1230',d:'R450 released'}].map((t,i) => (<div key={i} className="p-3 border-l-2 border-cyan-500 bg-white/5 rounded-r-lg mb-2"><p className="text-white text-sm">{t.a}</p><p className="text-white/50 text-xs">{t.d}</p></div>))}</div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><AlertTriangle size={20} className="text-orange-400"/>Active Disputes</h3>
            {disputes.filter(d => d.status === 'open').map((d, i) => (
              <div key={i} className="p-3 bg-orange-500/10 border-l-2 border-orange-500 rounded-r-lg mb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white text-sm font-medium">{d.taskTitle}</p>
                    <p className="text-white/50 text-xs">{d.reason}</p>
                    <p className="text-orange-400 text-xs mt-1">{d.amount}</p>
                  </div>
                  <button 
                    onClick={() => {
                      const updated = disputes.map(dispute => 
                        dispute.id === d.id ? {...dispute, status: 'in_review', messages: [...dispute.messages, {sender: 'admin', text: 'Admin is now reviewing this dispute.', time: 'Just now'}]} : dispute
                      );
                      setDisputes(updated);
                      showNotif('Dispute marked as In Review');
                    }}
                    className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs hover:bg-blue-500/30"
                  >
                    Review
                  </button>
                </div>
              </div>
            ))}
            {disputes.filter(d => d.status === 'open').length === 0 && (
              <p className="text-white/50 text-sm text-center py-4">No active disputes</p>
            )}
          </div>
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

          <div className="flex gap-4">
            <button onClick={() => setCurrentView('requester-dashboard')} className="flex-1 px-6 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700">Back to Dashboard</button>
            <button onClick={() => { setNewTask({ title: '', description: '', budget: '', location: '', deadline: '', category: '', fromLocation: '', toLocation: '', pickupLocation: '', storeLocation: '', deliveryLocation: '' }); setCurrentView('post-task'); }} className="flex-1 px-6 py-3 border border-cyan-400/50 text-cyan-300 rounded-lg font-semibold hover:bg-cyan-500/20">Post Another Task</button>
          </div>
        </div>
      </div>
    </UniversalBackground>
  );

  const LandingView = () => (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(8, 51, 68, 0.85), rgba(15, 23, 42, 0.95)), url('https://ucarecdn.com/0a88ac4d-fd70-4a56-be1e-5ef5a39c66b9/-/format/auto/')`,
      }}
    >
      <nav className="bg-white/5 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={goHome} className="flex items-center space-x-2"><TaskNestLogo size="md" color="white"/><span className="text-2xl font-bold text-white tracking-tight">TaskNest</span></button>
          <div className="flex space-x-4">
            <button onClick={() => { setShowAuth(true); setAuthMode('login'); }} className="px-4 py-2 text-white hover:bg-white/20 rounded-lg">Login</button>
            <button onClick={() => { setShowAuth(true); setAuthMode('signup'); }} className="px-4 py-2 bg-white text-cyan-900 rounded-lg font-semibold">Sign Up</button>
            <button onClick={() => setAdminMode(true)} className="px-4 py-2 bg-white/10 text-white rounded-lg flex items-center gap-2"><Shield size={16}/>Admin</button>
          </div>
        </div>
      </nav>
      
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-6xl font-light text-white mb-6 tracking-tight">
            Get Things Done with <span className="text-cyan-400 font-normal">TaskNest</span>
          </h1>
          <p className="text-xl text-white/80 mb-4 max-w-3xl mx-auto font-light tracking-wide">
            Connect with skilled professionals for any task. Post a job or find work – all in one trusted marketplace.
          </p>
          <p className="text-2xl text-cyan-300 mb-12 font-light italic tracking-wide">
            Connecting Communities, One Task At A Time.
          </p>

          {/* Preview Section */}
          <div className="mb-12">
            <p className="text-white/60 text-sm uppercase tracking-widest mb-4">Preview the Platform</p>
            <div className="flex justify-center space-x-6">
              <button onClick={() => { setUserRole('requester'); setCurrentView('requester-dashboard'); }} className="group px-8 py-4 bg-white text-gray-800 rounded-xl font-medium text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all">
                <Users className="inline-block w-6 h-6 mr-2 text-cyan-900"/>I Need Help
                <ChevronRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition"/>
              </button>
              <button onClick={() => { setUserRole('tasker'); setCurrentView('tasker-dashboard'); }} className="group px-8 py-4 bg-cyan-700 text-white rounded-xl font-medium text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all">
                <Wallet className="inline-block w-6 h-6 mr-2"/>I Want to Work
                <ChevronRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition"/>
              </button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-8 mb-20">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all hover:scale-105">
            <Shield className="w-12 h-12 text-cyan-400 mx-auto mb-4"/>
            <h3 className="text-xl font-semibold text-white mb-2">Secure Platform</h3>
            <p className="text-white/70 font-light">Protected escrow payments</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all hover:scale-105">
            <Clock className="w-12 h-12 text-cyan-400 mx-auto mb-4"/>
            <h3 className="text-xl font-semibold text-white mb-2">Fast Matching</h3>
            <p className="text-white/70 font-light">Get offers within minutes</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all hover:scale-105">
            <Award className="w-12 h-12 text-cyan-400 mx-auto mb-4"/>
            <h3 className="text-xl font-semibold text-white mb-2">Quality Service</h3>
            <p className="text-white/70 font-light">Verified professionals</p>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-20">
          <h2 className="text-4xl font-light text-white mb-12 text-center tracking-tight">Popular Categories</h2>
          <div className="grid grid-cols-5 gap-6">
            {[
      {icon: Package, title: 'Package Pick Ups', gradient: from-cyan-600 to-blue-600', shadow: 'shadow-cyan-600/30'},
      {icon: RotateCcw, title: 'Store Returns/Exchanges', gradient: from-cyan-600 to-blue-600', shadow: 'shadow-cyan-600/30'},
      {icon: Mail, title: 'Mailing Packages', gradient: 'from-cyan-600 to-blue-600', shadow: 'shadow-cyan-600/30'},
      {icon: Truck, title: 'Deliveries', gradient: from-cyan-600 to-blue-600', shadow: 'shadow-cyan-600/30'},
      {icon: Clock, title: 'Queueing', gradient: from-cyan-600 to-blue-600' shadow: 'shadow-cyan-600/30'}
            ].map((c, i) => (
              <div key={i} className={`group cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-2`}>
                <div className={`bg-gradient-to-br ${c.gradient} rounded-2xl p-6 text-center shadow-lg ${c.shadow} hover:shadow-xl transition-shadow`}>
                  <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <c.icon className="w-8 h-8 text-white drop-shadow-lg"/>
                  </div>
                  <h3 className="text-base font-semibold text-white drop-shadow-md">{c.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* About */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 border border-white/20 mb-12 text-left">
          <h2 className="text-3xl font-light text-white mb-6 text-center tracking-tight">About TaskNest</h2>
          <p className="text-lg text-white/80 font-light leading-relaxed">
            TaskNest is a South African-born mobile and web platform that connects everyday people with trusted local "taskers" who can run errands and complete small jobs. From deliveries and grocery pickups to queueing and household tasks, TaskNest simplifies daily life while creating income opportunities for unemployed youth and informal workers.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-2 gap-8 mb-20">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-left">
            <h3 className="text-2xl font-semibold text-cyan-400 mb-4">Our Mission</h3>
            <p className="text-white/80 font-light leading-relaxed">To empower communities by bridging the gap between time-strapped users and capable taskers promoting convenience, trust, and inclusive economic growth in underserved townships.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-left">
            <h3 className="text-2xl font-semibold text-cyan-400 mb-4">Our Vision</h3>
            <p className="text-white/80 font-light leading-relaxed">A future where digital platforms unlock opportunities in every corner of South Africa, enabling people to earn, connect, and thrive through community-driven services.</p>
          </div>
        </div>

        {/* Team */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 border border-white/20">
          <h2 className="text-3xl font-light text-white mb-10 text-center tracking-tight">Meet The Team</h2>
          <div className="grid grid-cols-3 gap-8">
            {[
              {i:'SK',n:'Siyonela Kubukeli',r:'Chief Financial Officer'},
              {i:'AZ',n:'Amanda Zangqa',r:'Chief Development Officer'},
              {i:'FN',n:'Fiona Ngcamba',r:'Chief Operations Officer'}
            ].map((m, idx) => (
              <div key={idx} className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-cyan-600 to-teal-700 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4 shadow-lg">{m.i}</div>
                <h4 className="text-xl font-semibold text-white mb-1">{m.n}</h4>
                <p className="text-cyan-400 font-light">{m.r}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="bg-slate-900/50 border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-white/60 font-light">© 2025 TaskNest. All rights reserved.</div>
      </footer>
    </div>
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
        {!postedTask ? (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-12 text-center border border-white/20"><Briefcase className="w-16 h-16 text-white/30 mx-auto mb-4"/><p className="text-white/70 mb-4">No active tasks</p><button onClick={() => setCurrentView('post-task')} className="px-6 py-3 bg-cyan-600 text-white rounded-lg">Post Your First Task</button></div>
        ) : taskInProgress ? (
          <div className="bg-cyan-500/20 border border-cyan-400/30 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div><h3 className="text-xl font-bold text-white mb-2">{taskInProgress.title}</h3><span className="px-3 py-1 bg-cyan-500/30 text-cyan-300 rounded-full text-sm">In Progress</span></div>
              <span className="text-2xl font-bold text-green-400">{taskInProgress.price}</span>
            </div>
            <p className="text-white/80 mb-4">Tasker: {taskInProgress.tasker}</p>
            <div className="flex gap-3"><button onClick={() => setCurrentView('task-tracking')} className="px-4 py-2 bg-cyan-600 text-white rounded-lg">Track & Message</button></div>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex justify-between items-start mb-4">
              <div><h3 className="text-xl font-bold text-white mb-2">{postedTask.title}</h3><span className="px-3 py-1 bg-cyan-500/30 text-cyan-300 rounded-full text-sm">{postedTask.category}</span></div>
              <span className="text-2xl font-bold text-green-400">R{postedTask.budget}</span>
            </div>
            <p className="text-white/80 mb-4">{postedTask.description}</p>
            <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-lg p-3 mb-4"><p className="text-yellow-300 text-sm flex items-center gap-2"><Wallet size={16}/>R{totalWithFee(postedTask.budget)} held in escrow (includes 15% service fee)</p></div>
            <div className="flex justify-between items-center pt-4 border-t border-white/20"><span className="text-cyan-400">3 offers received</span><button onClick={() => setCurrentView('view-offers')} className="px-4 py-2 bg-cyan-600 text-white rounded-lg">View Offers</button></div>
          </div>
        )}
      </div>
    </UniversalBackground>
  );

  const PostTaskView = () => {
    const [localTask, setLocalTask] = useState(newTask);
    const suggestedTaskers = getSuggestedTaskers();
    
    const handleSubmit = () => {
      if (localTask.title && localTask.budget) {
        setNewTask(localTask);
        setPostedTask({...localTask});
        setEscrowAmount(totalWithFee(localTask.budget));
        showNotif('Task posted! R' + totalWithFee(localTask.budget) + ' held in escrow');
        addNotification('task', 'Task Posted', localTask.title);
        setCurrentView('requester-dashboard');
      }
    };

    const getCategoryFields = () => {
      switch (localTask.category) {
        case 'Deliveries':
        case 'Package Pick Ups':
        case 'Mailing Packages':
          return (
            <>
              <div><label className="block text-sm font-semibold text-white/80 mb-2">Pickup Location (From)</label><input value={localTask.fromLocation} onChange={e => setLocalTask({...localTask, fromLocation: e.target.value})} className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white" placeholder="e.g., 123 Main St, Sandton"/></div>
              <div><label className="block text-sm font-semibold text-white/80 mb-2">Delivery Location (To)</label><input value={localTask.toLocation} onChange={e => setLocalTask({...localTask, toLocation: e.target.value})} className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white" placeholder="e.g., 456 Oak Ave, Rosebank"/></div>
            </>
          );
        case 'Store Returns/Exchanges':
          return (
            <>
              <div><label className="block text-sm font-semibold text-white/80 mb-2">Pickup Location</label><input value={localTask.pickupLocation} onChange={e => setLocalTask({...localTask, pickupLocation: e.target.value})} className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white" placeholder="Where to pick up items"/></div>
              <div><label className="block text-sm font-semibold text-white/80 mb-2">Store Location</label><input value={localTask.storeLocation} onChange={e => setLocalTask({...localTask, storeLocation: e.target.value})} className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white" placeholder="Store name and address"/></div>
              <div><label className="block text-sm font-semibold text-white/80 mb-2">Return Delivery Location</label><input value={localTask.deliveryLocation} onChange={e => setLocalTask({...localTask, deliveryLocation: e.target.value})} className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white" placeholder="Where to deliver receipt/items"/></div>
            </>
          );
        case 'Queueing':
          return (
            <div><label className="block text-sm font-semibold text-white/80 mb-2">Queue Location</label><input value={localTask.location} onChange={e => setLocalTask({...localTask, location: e.target.value})} className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white" placeholder="e.g., Home Affairs Randburg"/></div>
          );
        default:
          return (
            <div><label className="block text-sm font-semibold text-white/80 mb-2">Location</label><input value={localTask.location} onChange={e => setLocalTask({...localTask, location: e.target.value})} className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white"/></div>
          );
      }
    };
    
    return (
      <UniversalBackground><NavBar showBack onBack={() => setCurrentView('requester-dashboard')}/>
        <div className="max-w-5xl mx-auto px-6 py-8">
          <h2 className="text-3xl font-bold text-white mb-8">Post a New Task</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 space-y-6">
              <div><label className="block text-sm font-semibold text-white/80 mb-2">Task Title</label><input value={localTask.title} onChange={e => setLocalTask({...localTask, title: e.target.value})} className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white" placeholder="e.g., Pick up package from depot"/></div>
              <div><label className="block text-sm font-semibold text-white/80 mb-2">Category</label><select value={localTask.category} onChange={e => setLocalTask({...localTask, category: e.target.value})} className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white"><option value="" className="bg-slate-800">Select</option>{categories.map(c => <option key={c} value={c} className="bg-slate-800">{c}</option>)}</select></div>
              
              {localTask.category && getCategoryFields()}
              
              <div><label className="block text-sm font-semibold text-white/80 mb-2">Description</label><textarea value={localTask.description} onChange={e => setLocalTask({...localTask, description: e.target.value})} rows="3" className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white"/></div>
              <div className="grid grid-cols-2 gap-6">
                <div><label className="block text-sm font-semibold text-white/80 mb-2">Budget (R)</label><input type="number" value={localTask.budget} onChange={e => setLocalTask({...localTask, budget: e.target.value})} className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white"/></div>
                <div><label className="block text-sm font-semibold text-white/80 mb-2">Deadline</label><input value={localTask.deadline} onChange={e => setLocalTask({...localTask, deadline: e.target.value})} className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white" placeholder="e.g., Today, Tomorrow"/></div>
              </div>

              {localTask.budget && (
                <div className="bg-white/5 rounded-xl p-6 border border-white/20">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><DollarSign size={20}/>Payment Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-white/70"><span>Task Budget</span><span>R{localTask.budget}</span></div>
                    <div className="flex justify-between text-white/70"><span>Service Fee (15%)</span><span>R{serviceFee(localTask.budget)}</span></div>
                    <div className="flex justify-between text-white font-bold pt-2 border-t border-white/20"><span>Total to Pay</span><span>R{totalWithFee(localTask.budget)}</span></div>
                  </div>
                  <div className="mt-4 bg-cyan-500/20 border border-cyan-400/30 rounded-lg p-3"><p className="text-cyan-300 text-xs flex items-center gap-2"><Shield size={14}/>Funds will be held in escrow until task completion</p></div>
                </div>
              )}
              
              <div className="flex space-x-4">
                <button onClick={() => setCurrentView('requester-dashboard')} className="flex-1 px-6 py-3 border border-white/30 text-white rounded-lg">Cancel</button>
                <button 
                  onClick={() => {
                    if (localTask.title && localTask.budget) {
                      setNewTask(localTask);
                      setPaymentTask(localTask);
                      setShowPayFastModal(true);
                    }
                  }} 
                  className="flex-1 px-6 py-3 bg-teal-600 text-white rounded-lg flex items-center justify-center gap-2"
                >
                  <CreditCard size={18}/>
                  Pay with PayFast R{totalWithFee(localTask.budget) || 0}
                </button>
              </div>
            </div>

            {/* AI Suggestions */}
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><Zap className="text-yellow-400" size={18}/>AI Suggested Taskers</h3>
                {suggestedTaskers.length > 0 ? (
                  <div className="space-y-3">
                    {suggestedTaskers.map((tasker, i) => (
                      <div key={i} className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full flex items-center justify-center text-white text-sm font-bold">{tasker.name.charAt(0)}</div>
                            <div>
                              <p className="text-white text-sm font-medium">{tasker.name}</p>
                              <div className="flex items-center gap-1 text-xs text-white/60"><Star className="w-3 h-3 text-yellow-400 fill-yellow-400"/>{tasker.rating}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">{tasker.matchScore}% match</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {tasker.skills.slice(0, 2).map((skill, j) => (<span key={j} className="px-2 py-0.5 bg-white/10 text-white/70 rounded text-xs">{skill}</span>))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/50 text-sm">Select a category to see AI-recommended taskers</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </UniversalBackground>
    );
  };

  const ViewOffersView = () => {
    const rankedOffers = offers.map(o => ({
      ...o,
      matchScore: calculateMatchScore(postedTask || {}, { skills: [postedTask?.category], location: 'Johannesburg', rating: o.rating, completedTasks: o.completedTasks })
    })).sort((a, b) => b.matchScore - a.matchScore);

    return (
      <UniversalBackground><NavBar showBack onBack={() => setCurrentView('requester-dashboard')}/>
        <div className="max-w-5xl mx-auto px-6 py-8">
          <h2 className="text-2xl font-bold text-white mb-6">Offers Received (3)</h2>
          <div className="space-y-4">
            {rankedOffers.map((o, idx) => (
              <div key={o.id} className={`bg-white/10 backdrop-blur-md rounded-xl p-6 border ${idx === 0 ? 'border-green-500/50 ring-1 ring-green-500/30' : 'border-white/20'}`}>
                {idx === 0 && (
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs flex items-center gap-1"><ThumbsUp size={12}/>AI Top Recommendation</span>
                    <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs">{o.matchScore}% match</span>
                  </div>
                )}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full flex items-center justify-center text-white text-xl font-bold">{o.taskerName.charAt(0)}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-white">{o.taskerName}</h3>
                        <BadgeCheck className="text-cyan-400" size={16}/>
                      </div>
                      <Badges t={o}/>
                      <div className="flex items-center gap-2 mt-1 text-sm text-white/70">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400"/>{o.rating} ({o.completedTasks} tasks)
                      </div>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-green-400">{o.price}</p>
                </div>
                <p className="text-white/80 mb-4 bg-white/5 p-3 rounded-lg">{o.proposal}</p>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setViewingTaskerProfile(o)} 
                    className="px-4 py-2 border border-white/30 text-white rounded-lg flex items-center gap-2 hover:bg-white/10"
                  >
                    <User size={16}/>View Profile & Reviews
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedOffer(o);
                      setTaskInProgress({...postedTask, tasker: o.taskerName, price: o.price, taskerData: o.taskerData});
                      setTaskStage('accepted');
                      setMessages([{text: 'Hi! I accepted your offer. When can you start?', sender: 'requester', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}]);
                      showNotif('Offer accepted! You can now message ' + o.taskerName);
                      addNotification('status', 'Offer Accepted', o.taskerName + ' will start your task');
                      setCurrentView('task-tracking');
                    }} 
                    className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
                  >
                    Accept & Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </UniversalBackground>
    );
  };

  const TaskTrackingView = () => (
    <UniversalBackground><NavBar showBack onBack={() => setCurrentView('requester-dashboard')}/>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-white mb-6">Task In Progress</h2>
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"><p className="text-white/60 text-xs">Status</p><p className="text-lg font-bold text-cyan-400">{getStageLabel(taskStage)}</p></div>
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
            <div className="flex gap-3">
              <button onClick={() => {
                showNotif('✓ Payment of ' + taskInProgress?.price + ' released to ' + taskInProgress?.tasker + '!');
                setEscrowAmount(0);
                setPostedTask(null);
                setTaskInProgress(null);
                setTaskCompleted(false);
                setCompletionPhotos([]);
                setTaskStage('accepted');
                setMessages([]);
                setCurrentView('payment-success');
              }} className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 flex items-center gap-2"><CheckCircle size={18}/>Confirm & Release Payment</button>
              <button 
                onClick={() => { setDisputeTask(taskInProgress); setShowDisputeModal(true); }}
                className="px-6 py-3 border border-orange-400/50 text-orange-400 rounded-lg hover:bg-orange-500/10 flex items-center gap-2"
              >
                <AlertTriangle size={18}/>Raise Dispute
              </button>
            </div>
          </div>
        )}

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">Progress Timeline</h3>
          {stageOrder.map((stage, i) => {
            const currentIndex = stageOrder.indexOf(taskStage);
            const isDone = i <= currentIndex;
            const isCurrent = stage === taskStage;
            return (
              <div key={stage} className="flex items-center space-x-4 mb-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDone ? 'bg-green-500' : 'bg-white/20'}`}>
                  <CheckCircle className="w-5 h-5 text-white"/>
                </div>
                <p className={isDone ? 'text-white font-medium' : 'text-white/40'}>{getStageLabel(stage)}</p>
                {isCurrent && !taskCompleted && <span className="px-2 py-1 bg-cyan-500/30 text-cyan-300 rounded-full text-xs animate-pulse">Current</span>}
              </div>
            );
          })}
        </div>
      </div>
    </UniversalBackground>
  );

  const TaskerDashboard = () => {
    const recommendedTasks = getRecommendedTasks();
    
    return (
      <UniversalBackground><NavBar title="Tasker Dashboard"/>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"><p className="text-white/70 text-sm">Available</p><p className="text-3xl font-bold text-white">{availableTasks.length}</p></div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"><p className="text-white/70 text-sm">Active</p><p className="text-3xl font-bold text-cyan-400">{taskerActiveTask ? 1 : 0}</p></div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"><p className="text-white/70 text-sm">Completed</p><p className="text-3xl font-bold text-green-400">32</p></div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <p className="text-white/70 text-sm">Available Balance</p>
              <p className="text-3xl font-bold text-green-400">R{taskerBalance.toLocaleString()}</p>
              <button 
                onClick={() => setShowWithdrawModal(true)}
                className="mt-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm hover:bg-green-500/30 flex items-center gap-1"
              >
                <ArrowDownToLine size={14}/>Withdraw
              </button>
            </div>
          </div>
          
          {/* Profile Card */}
          {user && (
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full flex items-center justify-center text-white text-xl font-bold">{user.name?.charAt(0)}</div>
                  <div>
                    <div className="flex items-center gap-2"><h3 className="text-lg font-bold text-white">{user.name}</h3><BadgeCheck className="text-cyan-400" size={16}/></div>
                    <Badges t={user}/>
                  </div>
                </div>
                <button onClick={() => setShowProfileModal(true)} className="px-4 py-2 border border-white/30 text-white rounded-lg hover:bg-white/10">Edit Profile</button>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                <div className="bg-white/5 rounded-lg p-3"><p className="text-white/60">Service Radius</p><p className="text-white font-medium">{taskerProfile.serviceRadius} km</p></div>
                <div className="bg-white/5 rounded-lg p-3"><p className="text-white/60">Min Task Fee</p><p className="text-white font-medium">R{taskerProfile.minTaskFee}</p></div>
                <div className="bg-white/5 rounded-lg p-3"><p className="text-white/60">Portfolio Items</p><p className="text-white font-medium">{taskerProfile.portfolio.length}</p></div>
              </div>
            </div>
          )}

          {taskerActiveTask && (
            <div className="bg-cyan-500/20 border border-cyan-400/30 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-white mb-2">Active Job: {taskerActiveTask.title}</h3>
              <p className="text-white/70 mb-4">{taskerActiveTask.description}</p>
              <button onClick={() => setCurrentView('tasker-active-job')} className="px-4 py-2 bg-cyan-600 text-white rounded-lg">View & Complete</button>
            </div>
          )}

          {/* AI Recommended Tasks */}
          {recommendedTasks.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Zap className="text-yellow-400"/>AI Recommended for You</h2>
              <div className="grid grid-cols-3 gap-4">
                {recommendedTasks.map(t => (
                  <div key={t.id} onClick={() => { setSelectedBrowseTask(t); setCurrentView('task-detail'); }} className="bg-gradient-to-br from-cyan-500/20 to-teal-500/20 backdrop-blur-md rounded-xl p-5 border border-cyan-400/30 hover:border-cyan-400/50 cursor-pointer">
                    <div className="flex justify-between items-start mb-3">
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">{t.matchScore}% match</span>
                      <span className="text-lg font-bold text-green-400">{t.budget}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{t.title}</h3>
                    <p className="text-white/60 text-sm mb-2">{t.description}</p>
                    <div className="flex items-center gap-2 text-xs text-white/50"><MapPin size={12}/>{t.location}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <h2 className="text-2xl font-bold text-white mb-6">All Available Tasks</h2>
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
        
        {/* Profile Edit Modal */}
        {showProfileModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-xl max-w-lg w-full max-h-[85vh] overflow-y-auto border border-white/20 p-6">
              <div className="flex justify-between mb-6"><h2 className="text-xl font-bold text-white">Edit Profile</h2><button onClick={() => setShowProfileModal(false)} className="text-white/60"><X size={20}/></button></div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-white/80 mb-2">Service Radius: {taskerProfile.serviceRadius} km</label>
                  <input type="range" min="5" max="50" value={taskerProfile.serviceRadius} onChange={e => setTaskerProfile({...taskerProfile, serviceRadius: parseInt(e.target.value)})} className="w-full"/>
                </div>
                <div>
                  <label className="block text-sm text-white/80 mb-2">Minimum Task Fee (R)</label>
                  <input type="number" value={taskerProfile.minTaskFee} onChange={e => setTaskerProfile({...taskerProfile, minTaskFee: parseInt(e.target.value)})} className="w-full p-3 bg-white/10 border border-white/30 rounded-lg text-white"/>
                </div>
                <div>
                  <label className="block text-sm text-white/80 mb-2">Portfolio</label>
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    {taskerProfile.portfolio.map((item, i) => (
                      <div key={i} className="bg-white/10 rounded-lg h-20 flex items-center justify-center border border-white/20 relative">
                        <Package className="text-cyan-400" size={24}/>
                        <button onClick={() => setTaskerProfile({...taskerProfile, portfolio: taskerProfile.portfolio.filter((_, j) => j !== i)})} className="absolute top-1 right-1 w-5 h-5 bg-red-500/80 rounded-full flex items-center justify-center"><X size={12} className="text-white"/></button>
                      </div>
                    ))}
                    <button onClick={() => setTaskerProfile({...taskerProfile, portfolio: [...taskerProfile.portfolio, { id: Date.now(), type: 'image', title: 'New Work' }]})} className="border-2 border-dashed border-white/30 rounded-lg h-20 flex items-center justify-center hover:border-cyan-500"><Upload className="text-white/50" size={20}/></button>
                  </div>
                </div>
                <button onClick={() => { setShowProfileModal(false); showNotif('Profile updated!'); }} className="w-full py-3 bg-cyan-600 text-white rounded-lg">Save Changes</button>
              </div>
            </div>
          </div>
        )}
      </UniversalBackground>
    );
  };

  const TaskDetailView = () => (
    <UniversalBackground><NavBar showBack onBack={() => setCurrentView('tasker-dashboard')}/>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 mb-6">
          <div className="flex justify-between mb-6">
            <div><h1 className="text-3xl font-bold text-white mb-2">{selectedBrowseTask?.title}</h1><span className="px-3 py-1 bg-cyan-500/30 text-cyan-300 rounded-full text-sm">{selectedBrowseTask?.category}</span></div>
            <div className="text-right"><p className="text-3xl font-bold text-green-400">{selectedBrowseTask?.budget}</p></div>
          </div>
          <p className="text-white/80 mb-6">{selectedBrowseTask?.description}</p>
          
          {/* Location Details */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {selectedBrowseTask?.fromLocation && (
              <div className="bg-white/5 p-4 rounded-lg"><p className="text-white/50 text-sm">Pickup Location</p><p className="text-white">{selectedBrowseTask.fromLocation}</p></div>
            )}
            {selectedBrowseTask?.toLocation && (
              <div className="bg-white/5 p-4 rounded-lg"><p className="text-white/50 text-sm">Delivery Location</p><p className="text-white">{selectedBrowseTask.toLocation}</p></div>
            )}
            {selectedBrowseTask?.pickupLocation && (
              <div className="bg-white/5 p-4 rounded-lg"><p className="text-white/50 text-sm">Pickup Location</p><p className="text-white">{selectedBrowseTask.pickupLocation}</p></div>
            )}
            {selectedBrowseTask?.storeLocation && (
              <div className="bg-white/5 p-4 rounded-lg"><p className="text-white/50 text-sm">Store</p><p className="text-white">{selectedBrowseTask.storeLocation}</p></div>
            )}
            {selectedBrowseTask?.deliveryLocation && (
              <div className="bg-white/5 p-4 rounded-lg"><p className="text-white/50 text-sm">Return To</p><p className="text-white">{selectedBrowseTask.deliveryLocation}</p></div>
            )}
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/5 p-4 rounded-lg"><p className="text-white/50 text-sm">Location</p><p className="text-white">{selectedBrowseTask?.location}</p></div>
            <div className="bg-white/5 p-4 rounded-lg"><p className="text-white/50 text-sm">Deadline</p><p className="text-white">{selectedBrowseTask?.deadline}</p></div>
            <div className="bg-white/5 p-4 rounded-lg"><p className="text-white/50 text-sm">Client</p><p className="text-white">{selectedBrowseTask?.requester}</p></div>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">Submit Your Offer</h2>
          <div className="space-y-4">
            <div><label className="block text-sm text-white/80 mb-2">Your Price (R)</label><input className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white"/></div>
            <div><label className="block text-sm text-white/80 mb-2">Your Proposal</label><textarea rows="4" className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white" placeholder="Why are you the best fit?"/></div>
            <div className="flex gap-4">
              <button onClick={() => setCurrentView('tasker-dashboard')} className="flex-1 px-6 py-3 border border-white/30 text-white rounded-lg">Cancel</button>
              <button onClick={() => {
                setTaskerActiveTask(selectedBrowseTask);
                setTaskStage('accepted');
                setMessages([{text: 'Hello! I am on my way to your location.', sender: 'tasker', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}]);
                showNotif('Offer accepted by client! Task started.');
                addNotification('status', 'Task Started', 'You are now working on: ' + selectedBrowseTask.title);
                setCurrentView('tasker-active-job');
              }} className="flex-1 px-6 py-3 bg-cyan-600 text-white rounded-lg">Submit Offer</button>
            </div>
          </div>
        </div>
      </div>
    </UniversalBackground>
  );

  const TaskerActiveJobView = () => {
    const [photos, setPhotos] = useState([]);
    const addPhoto = () => { if (photos.length < 3) setPhotos([...photos, { id: Date.now(), uploaded: true }]); };

    return (
      <UniversalBackground><NavBar showBack onBack={() => setCurrentView('tasker-dashboard')}/>
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h2 className="text-3xl font-bold text-white mb-6">Active Job</h2>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"><p className="text-white/60 text-xs">Status</p><p className="text-lg font-bold text-cyan-400">{getStageLabel(taskStage)}</p></div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"><p className="text-white/60 text-xs">Client</p><p className="text-lg font-bold text-white">{taskerActiveTask?.requester}</p></div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"><p className="text-white/60 text-xs">Earnings</p><p className="text-lg font-bold text-green-400">{taskerActiveTask?.budget}</p></div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <TaskerTracking/>
            <MessagePanel/>
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
                  setTaskStage('completed');
                  showNotif('Task marked complete! Awaiting client approval for payment.');
                  addNotification('status', 'Task Completed', 'Awaiting client confirmation');
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
      <PayFastModal/>
      <WithdrawModal/>
      <RaiseDisputeModal/>
      <DisputeCenterModal/>
      {viewingTaskerProfile && <TaskerProfileModal tasker={viewingTaskerProfile} onClose={() => setViewingTaskerProfile(null)}/>}
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
