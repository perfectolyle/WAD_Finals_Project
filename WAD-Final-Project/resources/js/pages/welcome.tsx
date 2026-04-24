import ScrollCanvas from '@/components/scroll-canvas';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    Activity,
    ArrowDown,
    ArrowRight,
    BarChart3,
    Box,
    Clock,
    Cpu,
    Globe,
    LogIn,
    MapPin,
    Package,
    Search,
    Shield,
    ShieldCheck,
    Star,
    TrendingUp,
    Truck,
    UserPlus,
    Zap
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Welcome() {
    const { auth } = usePage().props as any;
    const isLoggedIn = !!auth?.user;
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="bg-[#110c0a] min-h-screen text-white font-sans selection:bg-[#e8734a]/30">
            <Head title="Welcome">
                <meta name="description" content="LogisTECH — The most advanced logistics and e-commerce management platform. Track, manage, and scale." />
            </Head>

            {/* ── Navbar ── */}
            <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-2xl">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#e8734a] to-[#f0a070] shadow-lg shadow-[#e8734a]/20">
                            <Package className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-black tracking-tight text-white">
                            Logis<span className="text-[#f0a070]">TECH</span>
                        </span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
                        <a href="#features" className="hover:text-white transition-colors">Features</a>
                        <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
                        <a href="#stats" className="hover:text-white transition-colors">Impact</a>
                    </div>
                    <div className="flex items-center gap-3">
                        {isLoggedIn ? (
                            <Link
                                href="/dashboard"
                                className="inline-flex h-10 items-center gap-2 rounded-full bg-gradient-to-r from-[#e8734a] to-[#f0a070] px-6 text-sm font-bold text-white shadow-lg shadow-[#e8734a]/25 transition-all hover:scale-105 hover:shadow-[#e8734a]/40"
                            >
                                Dashboard <ArrowRight className="h-4 w-4" />
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 text-sm font-medium text-white/90 transition-all hover:bg-white/10"
                                >
                                    <LogIn className="h-4 w-4" /> Log in
                                </Link>
                                <Link
                                    href="/register"
                                    className="inline-flex h-10 items-center gap-2 rounded-full bg-gradient-to-r from-[#e8734a] to-[#f0a070] px-5 text-sm font-bold text-white shadow-lg shadow-[#e8734a]/25 transition-all hover:scale-105 hover:shadow-[#e8734a]/40"
                                >
                                    <UserPlus className="h-4 w-4" /> Sign up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* ── Hero Section (Overlay for 3D Canvas) ── */}
            <div
                className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center"
                id="hero-overlay"
            >
                {/* Dark Vignette Overlay for Readability */}
                <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/80 via-black/20 to-black/80" />
                
                <div className="text-center w-full max-w-4xl px-6 pointer-events-auto relative z-10">
                    <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-[#f0a070]/20 bg-[#f0a070]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#f0a070] backdrop-blur-md shadow-[0_0_20px_rgba(240,160,112,0.1)]">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f0a070] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f0a070]"></span>
                        </span>
                        LogisTECH v2.0 is Live
                    </div>
                    
                    <h1 className="animate-fade-in-up mb-8 text-5xl font-black leading-[1.1] tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] md:text-7xl lg:text-[5.5rem]" style={{ animationDelay: '0.1s' }}>
                        The Future of <br className="hidden md:block"/>
                        <span className="bg-gradient-to-r from-[#e8734a] via-[#f0a070] to-[#ffc8a8] bg-clip-text text-transparent drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">Global Logistics</span>
                    </h1>
                    
                    <p className="animate-fade-in-up mx-auto max-w-2xl text-lg text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] md:text-xl font-medium" style={{ animationDelay: '0.2s' }}>
                        Seamlessly orchestrate your entire supply chain. From AI-driven warehouse sorting to real-time fleet tracking, deliver joy with precision.
                    </p>

                    {/* Tracking Search Bar */}
                    <div className="animate-fade-in-up mt-10 mx-auto max-w-md relative group" style={{ animationDelay: '0.3s' }}>
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#e8734a] to-[#f0a070] rounded-full blur opacity-40 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative flex items-center bg-black/60 border border-white/20 rounded-full p-2 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                            <Search className="h-5 w-5 text-white/60 ml-3" />
                            <input 
                                type="text" 
                                placeholder="Enter tracking number (e.g. LTX-90210)..." 
                                className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-white/50 text-sm px-4"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#f0a070] hover:text-white transition-colors">
                                Track
                            </button>
                        </div>
                    </div>

                    <div className="animate-fade-in-up mt-16" style={{ animationDelay: '0.5s' }}>
                        <div className="flex animate-bounce flex-col items-center gap-2 text-white/50 drop-shadow-lg">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Scroll to Deploy</span>
                            <ArrowDown className="h-4 w-4" />
                        </div>
                    </div>
                </div>
            </div>

            {/* ── 3D Scroll Animation ── */}
            <div className="bg-[#110c0a] relative">
                <ScrollCanvas
                    totalFrames={585}
                    framePath="/frames/frame-"
                    scrollHeight={600}
                />

                {/* ── Tracking Progress Bar ── */}
                <div
                    className="fixed bottom-10 left-1/2 z-50 w-full max-w-3xl -translate-x-1/2 px-6 pointer-events-none"
                    id="tracking-bar"
                    style={{ opacity: 0 }}
                >
                    <div className="relative p-4 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-xl shadow-2xl">
                        <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                            <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#e8734a] via-[#f0a070] to-[#ffc8a8] shadow-[0_0_10px_#e8734a] transition-all duration-300" id="tracking-progress" style={{ width: '0%' }} />
                        </div>
                        <div className="mt-4 flex justify-between text-xs font-bold uppercase tracking-widest text-white/30">
                            <div className="flex flex-col items-center gap-1" id="step-1">
                                <Box className="h-4 w-4" />
                                <span>Hub Sort</span>
                            </div>
                            <div className="flex flex-col items-center gap-1" id="step-2">
                                <Truck className="h-4 w-4" />
                                <span>In Transit</span>
                            </div>
                            <div className="flex flex-col items-center gap-1" id="step-3">
                                <MapPin className="h-4 w-4" />
                                <span>Delivered</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scene 1: Warehouse */}
                <div
                    className="pointer-events-none fixed left-0 right-0 top-0 z-30 flex h-screen items-center justify-start p-4 md:p-12 lg:p-24"
                    id="scene-warehouse"
                    style={{ opacity: 0, transform: 'translateY(40px)' }}
                >
                    <div className="max-w-md w-full bg-black/60 p-8 rounded-[2rem] backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                        <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400/80">Active Node: WH-01</span>
                            </div>
                            <Activity className="h-4 w-4 text-white/30" />
                        </div>
                        
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
                                <Cpu className="h-6 w-6 text-[#f0a070]" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-white tracking-tight">Auto-Sort Matrix</h2>
                                <p className="text-xs font-medium text-[#f0a070]">AI Pattern Recognition</p>
                            </div>
                        </div>
                        
                        <p className="text-sm text-white/60 leading-relaxed mb-8">
                            Robotic sorting arrays process up to 50,000 parcels per hour with millimeter precision, cross-referencing global routing tables instantly.
                        </p>
                        
                        <div className="grid grid-cols-2 gap-3">
                            <div className="rounded-xl bg-gradient-to-b from-white/5 to-transparent p-4 border border-white/5">
                                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Throughput</div>
                                <div className="text-xl font-bold text-white">50k <span className="text-xs text-white/30">/hr</span></div>
                            </div>
                            <div className="rounded-xl bg-gradient-to-b from-[#e8734a]/10 to-transparent p-4 border border-[#e8734a]/20">
                                <div className="text-[10px] uppercase tracking-widest text-[#f0a070]/60 mb-1">Accuracy</div>
                                <div className="text-xl font-bold text-[#f0a070]">99.98%</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scene 2: Transit */}
                <div
                    className="pointer-events-none fixed left-0 right-0 top-0 z-30 flex h-screen items-center justify-end p-4 md:p-12 lg:p-24"
                    id="scene-delivery"
                    style={{ opacity: 0, transform: 'translateY(40px)' }}
                >
                    <div className="max-w-md w-full bg-black/60 p-8 rounded-[2rem] backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                        <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                            <Globe className="h-4 w-4 text-white/30" />
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400/80">Fleet GPS Uplink</span>
                                <div className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4 mb-4 justify-end text-right">
                            <div>
                                <h2 className="text-2xl font-black text-white tracking-tight">Dynamic Routing</h2>
                                <p className="text-xs font-medium text-[#f0a070]">Weather & Traffic AI</p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
                                <TrendingUp className="h-6 w-6 text-[#f0a070]" />
                            </div>
                        </div>
                        
                        <p className="text-sm text-white/60 leading-relaxed mb-8 text-right">
                            Vehicles are continuously re-routed based on real-time atmospheric data, reducing carbon emissions and cutting transit times.
                        </p>
                        
                        <div className="space-y-3">
                            <div className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/5">
                                <span className="text-xs font-medium text-white/50">Avg. Fuel Saving</span>
                                <span className="text-sm font-bold text-emerald-400">-32%</span>
                            </div>
                            <div className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/5">
                                <span className="text-xs font-medium text-white/50">Ping Latency</span>
                                <span className="text-sm font-bold text-white">12ms</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scene 3: Delivered */}
                <div
                    className="pointer-events-none fixed left-0 right-0 top-0 z-30 flex h-screen items-center justify-center p-4"
                    id="scene-delivered"
                    style={{ opacity: 0, transform: 'translateY(40px)' }}
                >
                    <div className="max-w-2xl w-full text-center bg-black/40 p-10 md:p-16 rounded-[3rem] backdrop-blur-3xl border border-white/20 shadow-[0_0_100px_rgba(232,115,74,0.15)] relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#f0a070] to-transparent opacity-50"></div>
                        
                        <div className="mb-8 flex justify-center">
                            <div className="relative">
                                <div className="absolute inset-0 bg-[#f0a070] blur-xl opacity-20 rounded-full animate-pulse"></div>
                                <div className="h-20 w-20 bg-gradient-to-br from-[#e8734a] to-[#f0a070] rounded-full flex items-center justify-center relative shadow-xl border border-white/20">
                                    <ShieldCheck className="h-10 w-10 text-white" />
                                </div>
                            </div>
                        </div>
                        
                        <h2 className="mb-4 text-4xl md:text-6xl font-black text-white tracking-tighter">Mission <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e8734a] to-[#f0a070]">Accomplished</span></h2>
                        <p className="text-lg md:text-xl text-white/60 leading-relaxed mb-10 max-w-lg mx-auto">
                            Proof of delivery secured on immutable logs. Client notified. 
                            Ready for the next operation.
                        </p>
                        
                        <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
                            <div>
                                <div className="text-2xl font-bold text-white">100%</div>
                                <div className="text-[10px] uppercase tracking-widest text-white/30 mt-1">Chain of Custody</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white">&lt; 1s</div>
                                <div className="text-[10px] uppercase tracking-widest text-white/30 mt-1">Sync Time</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-[#f0a070]">5.0 <Star className="inline h-4 w-4 fill-current -mt-1" /></div>
                                <div className="text-[10px] uppercase tracking-widest text-white/30 mt-1">CSAT Score</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Global Stats Section ── */}
            <section id="stats" className="relative z-10 border-y border-white/5 bg-[#0a0706] py-12 overflow-hidden">
                <div className="mx-auto max-w-7xl px-6 relative">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4 divide-x divide-white/5">
                        <div className="text-center px-4">
                            <div className="text-4xl font-black text-white tracking-tighter mb-2">12M+</div>
                            <div className="text-xs font-medium uppercase tracking-widest text-white/40">Parcels Delivered</div>
                        </div>
                        <div className="text-center px-4">
                            <div className="text-4xl font-black text-[#f0a070] tracking-tighter mb-2">99.9%</div>
                            <div className="text-xs font-medium uppercase tracking-widest text-white/40">SLA Compliance</div>
                        </div>
                        <div className="text-center px-4">
                            <div className="text-4xl font-black text-white tracking-tighter mb-2">24/7</div>
                            <div className="text-xs font-medium uppercase tracking-widest text-white/40">Active Monitoring</div>
                        </div>
                        <div className="text-center px-4">
                            <div className="text-4xl font-black text-white tracking-tighter mb-2">150+</div>
                            <div className="text-xs font-medium uppercase tracking-widest text-white/40">Global Hubs</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── How It Works ── */}
            <section id="how-it-works" className="relative z-10 bg-[#110c0a] py-32">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-20">
                        <span className="text-[#f0a070] font-bold tracking-widest uppercase text-sm mb-4 block">The Process</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">From Click to Customer</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                        <div className="relative text-center">
                            <div className="mx-auto h-24 w-24 rounded-full bg-black border border-white/10 flex items-center justify-center mb-6 relative z-10 shadow-xl">
                                <Package className="h-10 w-10 text-white/60" />
                                <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-[#e8734a] text-white font-bold flex items-center justify-center text-sm">1</div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Order Ingestion</h3>
                            <p className="text-sm text-white/50 leading-relaxed">API seamlessly pulls orders from your storefront, automatically allocating inventory.</p>
                        </div>

                        <div className="relative text-center">
                            <div className="mx-auto h-24 w-24 rounded-full bg-black border border-white/10 flex items-center justify-center mb-6 relative z-10 shadow-xl">
                                <Cpu className="h-10 w-10 text-[#f0a070]" />
                                <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-[#e8734a] text-white font-bold flex items-center justify-center text-sm">2</div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Smart Routing</h3>
                            <p className="text-sm text-white/50 leading-relaxed">AI determines the most cost-effective and fastest hub for fulfillment.</p>
                        </div>

                        <div className="relative text-center">
                            <div className="mx-auto h-24 w-24 rounded-full bg-black border border-white/10 flex items-center justify-center mb-6 relative z-10 shadow-xl">
                                <Truck className="h-10 w-10 text-white/60" />
                                <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-[#e8734a] text-white font-bold flex items-center justify-center text-sm">3</div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Last-Mile Execution</h3>
                            <p className="text-sm text-white/50 leading-relaxed">Drivers receive optimized manifests, while customers get live tracking links.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Bento Grid Features Section ── */}
            <section id="features" className="relative z-10 bg-[#0a0706] py-32 border-t border-white/5">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-16 md:w-2/3">
                        <h2 className="mb-6 text-4xl font-black text-white md:text-6xl tracking-tighter">
                            A Platform engineered for <br/>
                            <span className="bg-gradient-to-r from-[#e8734a] to-[#f0a070] bg-clip-text text-transparent">Scale.</span>
                        </h2>
                        <p className="text-lg text-white/50 font-light">Stop managing spreadsheets. Start managing a logistics empire with enterprise-grade tools available out of the box.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
                        {/* Feature 1: Large */}
                        <div className="md:col-span-2 group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-10 transition-all hover:bg-white/[0.04]">
                            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#e8734a]/10 blur-3xl transition-all group-hover:bg-[#e8734a]/20" />
                            <BarChart3 className="h-10 w-10 text-[#f0a070] mb-6" />
                            <h3 className="mb-4 text-2xl font-bold text-white">Predictive Analytics Dashboard</h3>
                            <p className="max-w-md text-white/50 leading-relaxed">Anticipate supply chain disruptions before they happen. Our Laravel backend crunches historical data to forecast inventory needs and suggest restocking schedules.</p>
                        </div>

                        {/* Feature 2: Small */}
                        <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-10 transition-all hover:bg-white/[0.04]">
                            <Shield className="h-10 w-10 text-white/70 mb-6" />
                            <h3 className="mb-4 text-xl font-bold text-white">Role-Based Access</h3>
                            <p className="text-sm text-white/50 leading-relaxed">Granular permissions powered by Laravel Gates. Secure your data with absolute precision.</p>
                        </div>

                        {/* Feature 3: Small */}
                        <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-10 transition-all hover:bg-white/[0.04]">
                            <Clock className="h-10 w-10 text-white/70 mb-6" />
                            <h3 className="mb-4 text-xl font-bold text-white">Real-Time Sync</h3>
                            <p className="text-sm text-white/50 leading-relaxed">Inertia.js ensures your React frontend reflects backend changes instantly, without page reloads.</p>
                        </div>

                        {/* Feature 4: Large */}
                        <div className="md:col-span-2 group relative overflow-hidden rounded-[2rem] border border-[#e8734a]/20 bg-[#e8734a]/[0.02] p-10 transition-all hover:bg-[#e8734a]/[0.05]">
                            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[#e8734a]/10 blur-3xl" />
                            <Box className="h-10 w-10 text-[#f0a070] mb-6" />
                            <h3 className="mb-4 text-2xl font-bold text-white">Unified Inventory Management</h3>
                            <p className="max-w-md text-white/50 leading-relaxed">Manage thousands of SKUs across multiple warehouses. Track stock movements, set low-stock alerts, and generate detailed manifests with a single click.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA Section ── */}
            <section className="relative z-10 py-32 overflow-hidden">
                <div className="absolute inset-0 bg-[#e8734a] opacity-5"></div>
                <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-[#e8734a]/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="mx-auto max-w-4xl px-6 text-center relative z-10">
                    <h2 className="mb-8 text-5xl font-black text-white md:text-7xl tracking-tighter">Ready to <span className="italic font-light">Ship?</span></h2>
                    <p className="mb-12 text-xl text-white/60 font-light max-w-2xl mx-auto">Join the logistics revolution. Modernize your workflow with LogisTECH today.</p>
                    
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        {isLoggedIn ? (
                            <Link
                                href="/dashboard"
                                className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-white px-10 text-lg font-bold text-black shadow-xl transition-all hover:scale-105"
                            >
                                Enter Dashboard <ArrowRight className="h-5 w-5" />
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/register"
                                    className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-white px-10 text-lg font-bold text-black shadow-xl transition-all hover:scale-105"
                                >
                                    Create Free Account
                                </Link>
                                <Link
                                    href="/login"
                                    className="inline-flex h-14 items-center justify-center gap-3 rounded-full border border-white/20 bg-transparent px-10 text-lg font-medium text-white transition-all hover:bg-white/10"
                                >
                                    Sign In to Portal
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer className="relative z-10 border-t border-white/10 bg-[#0a0706] pt-20 pb-10">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
                        <div className="col-span-2">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#e8734a] to-[#f0a070]">
                                    <Package className="h-4 w-4 text-white" />
                                </div>
                                <span className="text-xl font-bold text-white tracking-tight">LogisTECH</span>
                            </div>
                            <p className="text-white/40 text-sm max-w-sm leading-relaxed">
                                A premier web application demonstrating advanced React + Laravel integrations for logistics management. Built for WAD 2.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4">Product</h4>
                            <ul className="space-y-3 text-sm text-white/50">
                                <li><a href="#" className="hover:text-[#f0a070] transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-[#f0a070] transition-colors">Integrations</a></li>
                                <li><a href="#" className="hover:text-[#f0a070] transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-[#f0a070] transition-colors">Changelog</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4">Resources</h4>
                            <ul className="space-y-3 text-sm text-white/50">
                                <li><a href="#" className="hover:text-[#f0a070] transition-colors">Documentation</a></li>
                                <li><a href="#" className="hover:text-[#f0a070] transition-colors">API Reference</a></li>
                                <li><a href="#" className="hover:text-[#f0a070] transition-colors">Community</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4">Legal</h4>
                            <ul className="space-y-3 text-sm text-white/50">
                                <li><a href="#" className="hover:text-[#f0a070] transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-[#f0a070] transition-colors">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 text-xs text-white/30">
                        <p>© {new Date().getFullYear()} LogisTECH. All rights reserved.</p>
                        <div className="flex gap-4 mt-4 md:mt-0">
                            <span>Laravel v12.0</span>
                            <span>React 19</span>
                            <span>Inertia.js</span>
                        </div>
                    </div>
                </div>
            </footer>

            {/* ── CSS Animations ── */}
            <style>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) both;
                }
            `}</style>

            {/* ── Scroll-synced overlay controller ── */}
            <ScrollOverlayController />
        </div>
    );
}

/**
 * Manages all fixed overlay visibility based on scroll position.
 */
function ScrollOverlayController() {
    useEffect(() => {
        const hero = document.getElementById('hero-overlay');
        const scene1 = document.getElementById('scene-warehouse');
        const scene2 = document.getElementById('scene-delivery');
        const scene3 = document.getElementById('scene-delivered');
        const trackingBar = document.getElementById('tracking-bar');
        const trackingProgress = document.getElementById('tracking-progress');
        const step1 = document.getElementById('step-1');
        const step2 = document.getElementById('step-2');
        const step3 = document.getElementById('step-3');

        const handleScroll = () => {
            const container = document.getElementById('canvas-container');
            if (!container) return;
            
            const rect = container.getBoundingClientRect();
            const containerTop = -rect.top;
            const scrollableHeight = container.scrollHeight - window.innerHeight;
            
            const progress = scrollableHeight > 0 
                ? Math.max(0, Math.min(1, containerTop / scrollableHeight))
                : 0;

            // Hero fades out
            if (hero) {
                const heroOpacity = Math.max(0, 1 - progress * 15);
                hero.style.opacity = String(heroOpacity);
                hero.style.display = heroOpacity > 0.01 ? 'flex' : 'none';
            }

            // Tracking Bar
            if (trackingBar) {
                const barVisible = progress > 0.05 && progress < 0.90;
                trackingBar.style.opacity = barVisible ? '1' : '0';
                trackingBar.style.transform = `translateX(-50%) translateY(${barVisible ? '0' : '40px'})`;
                trackingBar.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            }

            if (trackingProgress) {
                const trackP = Math.max(0, Math.min(1, (progress - 0.05) / 0.85));
                trackingProgress.style.width = `${trackP * 100}%`;
                
                if (step1) step1.style.color = trackP > 0.1 ? '#f0a070' : '';
                if (step2) step2.style.color = trackP > 0.5 ? '#f0a070' : '';
                if (step3) step3.style.color = trackP > 0.9 ? '#f0a070' : '';
            }

            // Scene 1 — Warehouse: 8%–28%
            applyScene(scene1, progress, 0.08, 0.15, 0.23, 0.28);

            // Scene 2 — Delivery: 38%–58%
            applyScene(scene2, progress, 0.38, 0.45, 0.53, 0.58);

            // Scene 3 — Delivered: 68%–85%
            applyScene(scene3, progress, 0.68, 0.75, 0.82, 0.88);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Init
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return null;
}

function applyScene(
    el: HTMLElement | null,
    progress: number,
    fadeInStart: number,
    fadeInEnd: number,
    fadeOutStart: number,
    fadeOutEnd: number,
) {
    if (!el) return;
    let opacity = 0;
    let y = 40;
    let scale = 0.95;

    if (progress > fadeInStart && progress < fadeInEnd) {
        const t = (progress - fadeInStart) / (fadeInEnd - fadeInStart);
        const easeOut = 1 - Math.pow(1 - t, 3);
        opacity = easeOut;
        y = 40 - easeOut * 40;
        scale = 0.95 + easeOut * 0.05;
    } else if (progress >= fadeInEnd && progress < fadeOutStart) {
        opacity = 1;
        y = 0;
        scale = 1;
    } else if (progress >= fadeOutStart && progress < fadeOutEnd) {
        const t = (progress - fadeOutStart) / (fadeOutEnd - fadeOutStart);
        const easeIn = t * t;
        opacity = 1 - easeIn;
        y = -easeIn * 40;
        scale = 1 + easeIn * 0.05;
    }

    el.style.opacity = String(Math.max(0, Math.min(1, opacity)));
    el.style.transform = `translateY(${y}px) scale(${scale})`;
    el.style.transition = 'opacity 0.1s linear, transform 0.1s linear';
}
