import React, { useState, useEffect } from 'react';
import { 
  Sparkles, ArrowRight, CheckCircle2, Search, Award, 
  Users, Code, Building, Star, MessageSquare, Zap, Terminal,
  Cpu, Layers, Play, Check, ShieldCheck, Flame, Compass,
  Database, RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { createWhatsAppDirectQueryLink } from '../services/whatsappService';

interface HeroSectionProps {
  onOpenEnrollment: (courseOrProgram?: string) => void;
  onSearchCourse: (query: string) => void;
}

type SimulatorTrack = 'fullstack' | 'ai_ml' | 'embedded_iot' | 'java_cloud';

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenEnrollment,
  onSearchCourse
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSimulatorTrack, setActiveSimulatorTrack] = useState<SimulatorTrack>('fullstack');
  const [isRunningCode, setIsRunningCode] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [copiedCode, setCopiedCode] = useState(false);

  // Dynamic Batch Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ days: 4, hours: 14, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { ...prev, days: Math.max(0, prev.days - 1), hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchCourse(searchQuery);
      const el = document.getElementById('courses');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const codeSnippets: Record<SimulatorTrack, {
    title: string;
    badge: string;
    lang: string;
    code: string;
    runLogs: string[];
    specs: { memory: string; latency: string; throughput: string; cert: string };
  }> = {
    fullstack: {
      title: 'Full-Stack Distributed System',
      badge: 'React 19 • Node.js • Redis • MongoDB',
      lang: 'typescript',
      code: `// TechTrainX Production Microservice
import { createEngine } from '@techtrainx/core';
import { RedisCluster } from '@techtrainx/cache';

export async function bootstrapSystem() {
  const cluster = await RedisCluster.connect({ shards: 3 });
  const app = createEngine({ port: 8080, rateLimit: 10000 });

  app.post('/api/v1/stream', async (ctx) => {
    await cluster.publish('events:telemetry', ctx.body);
    return ctx.json({ status: 200, latency: '4.2ms' });
  });

  return app.listen(() => console.log('🚀 System Online'));
}`,
      runLogs: [
        '⚡ [BUILD] Compiling TypeScript 5.8 AST trees...',
        '🔗 [REDIS] Connected to cluster (3 shards active)',
        '📡 [INGRESS] Reverse proxy listening on port 8080',
        '✅ [BENCHMARK] P99 Latency: 4.2ms | 10k req/sec verified',
        '🎓 [RESULT] Production system ready for deployment!'
      ],
      specs: { memory: '64MB', latency: '< 5ms', throughput: '10,000 req/s', cert: 'ISO & University Approved' }
    },
    ai_ml: {
      title: 'GenAI & RAG Inference Pipeline',
      badge: 'Python 3.12 • LangChain • Vector DB • Llama 3',
      lang: 'python',
      code: `# TechTrainX GenAI Autonomous Agent
from techtrainx_ai import NeuralPipeline, VectorStore
from transformers import AutoTokenizer

pipeline = NeuralPipeline(model="meta-llama/Llama-3-8B-Instruct")
vectors = VectorStore.load_embeddings("./engineering_kb")

def execute_reasoning_loop(query: str):
    context = vectors.similarity_search(query, k=5)
    response = pipeline.generate_cot(query=query, context=context)
    return { "answer": response.text, "confidence": 0.994 }

print(execute_reasoning_loop("Optimize microservice DB pool"))`,
      runLogs: [
        '🧠 [MODEL] Loading Llama-3-8B quantization weights (4-bit)...',
        '📚 [VECTOR] Indexed 45,000 engineering research vectors',
        '🔍 [RAG] High-dimensional Cosine similarity search: 0.994 match',
        '✨ [OUTPUT] Generated optimal connection pooling strategy',
        '🎯 [SKILL] Student qualified in Enterprise AI Agent Systems'
      ],
      specs: { memory: '5.2GB VRAM', latency: '48ms/token', throughput: '120 tokens/s', cert: 'Industry AI Practitioner' }
    },
    embedded_iot: {
      title: 'Robotics & Hardware Firmware',
      badge: 'ESP32 • FreeRTOS • LoRaWan • LiDAR • C++',
      lang: 'cpp',
      code: `// TechTrainX Industrial Sensor Node
#include <WiFi.h>
#include <TechTrainX_Sensors.h>

HardwareLiDAR lidar(GPIO_NUM_18);
TelemetryStream stream("lora.techtrainx.io");

void setup() {
  Serial.begin(115200);
  lidar.calibratePrecision(0.01);
  xTaskCreatePinnedToCore(sensorTelemetryTask, "Sensors", 4096, NULL, 1, NULL, 0);
}

void loop() {
  float distance = lidar.getFilteredDistance();
  stream.transmitPacket({ .dist = distance, .timestamp = millis() });
  delay(20);
}`,
      runLogs: [
        '🔌 [HARDWARE] Microcontroller connected (ESP32-S3 Dual-Core 240MHz)',
        '📡 [SENSORS] LiDAR optical array calibrated to 0.01mm tolerance',
        '🌐 [LORA] 868MHz wireless telemetry link established',
        '⚡ [RTOS] Real-time task pinned to Core 0 with zero jitter',
        '🛠️ [FOUNDRY] Physical working hardware prototype verified!'
      ],
      specs: { memory: '512KB SRAM', latency: '20ms polling', throughput: '50 packets/s', cert: 'Embedded Systems Specialist' }
    },
    java_cloud: {
      title: 'Java Spring Cloud Microservices',
      badge: 'Java 21 • Spring Boot 3 • Kafka • Docker',
      lang: 'java',
      code: `// TechTrainX High-Throughput Event Processor
@SpringBootApplication
@EnableKafka
public class TransactionServiceApplication {
  @KafkaListener(topics = "orders.industrial", groupId = "ttx-workers")
  public void processOrder(@Payload OrderEvent event) {
    OrderEntity entity = repository.save(OrderMapper.toEntity(event));
    metricsRegistry.counter("orders.processed").increment();
    log.info("Processed Transaction ID: {}", entity.getId());
  }
}`,
      runLogs: [
        '☕ [JVM] OpenJDK 21 LTS virtual threads initialized',
        '🍃 [SPRING] Spring Boot 3.3.2 microservice context loaded',
        '📨 [KAFKA] Consuming topic "orders.industrial" with 12 partitions',
        '💾 [DATABASE] Transaction committed with ACID guarantees',
        '💼 [PLACEMENT] Corporate Java Enterprise standard attained'
      ],
      specs: { memory: '256MB Heap', latency: '< 8ms', throughput: '25,000 msg/s', cert: 'Enterprise Cloud Architect' }
    }
  };

  const handleRunCodeSimulator = () => {
    setIsRunningCode(true);
    setTerminalOutput(['⏳ Initializing sandbox execution environment...']);

    const currentTrackLogs = codeSnippets[activeSimulatorTrack].runLogs;
    let step = 0;

    const interval = setInterval(() => {
      if (step < currentTrackLogs.length) {
        const line = currentTrackLogs[step];
        setTerminalOutput(prev => [...prev, line]);
        step++;
      } else {
        clearInterval(interval);
        setIsRunningCode(false);
      }
    }, 450);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippets[activeSimulatorTrack].code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="hero" className="relative min-h-[92vh] pt-6 pb-16 px-4 overflow-hidden flex flex-col justify-center bg-[#030712] cyber-grid-bg">
      {/* Background Cyber Ambient Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-cyan-600/18 via-sky-600/12 to-indigo-600/22 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-5 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-24 left-5 w-[350px] h-[350px] bg-indigo-500/12 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Dynamic Top Ticker Banner */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 p-2.5 px-4 rounded-2xl bg-gradient-to-r from-slate-900/90 via-cyan-950/40 to-slate-900/90 border border-cyan-500/25 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-slate-200">
              Industrial Training & Hardware Lab Admissions Open for Summer / Fall 2026
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold text-cyan-300">
            <div className="flex items-center gap-1 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-cyan-500/30">
              <Flame className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
              <span>Seat Lock Closes In:</span>
              <span className="font-mono font-black text-white">
                {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
              </span>
            </div>
            <button
              onClick={() => onOpenEnrollment()}
              className="hidden sm:inline-flex items-center gap-1 text-[11px] font-extrabold text-white bg-cyan-600 hover:bg-cyan-500 px-3 py-1 rounded-lg transition-colors cursor-pointer"
            >
              <span>Fast-Track Seat</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Mission, Value Proposition & Search */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            {/* Top Brand Micro Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-bold tracking-wide shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Placement-First Industrial Tech Foundry</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="text-emerald-400 font-semibold">100% Practical</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-black tracking-tight text-white leading-[1.12]">
              Architect <span className="gradient-text-cyan">Real Tech</span>.<br />
              Build <span className="gradient-text-indigo">Real Hardware</span>.<br />
              Lead <span className="gradient-text-emerald">Top Engineering</span>.
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              We replace boring passive lectures with <strong>5-hour daily hands-on industrial development</strong>. Build enterprise software microservices, embedded IoT systems, and deep-tech hardware prototypes with direct 1-on-1 mentorship.
            </p>

            {/* Smart Search Bar */}
            <form onSubmit={handleSearchSubmit} className="relative max-w-lg mx-auto lg:mx-0 pt-1">
              <div className="glass-panel p-1.5 rounded-2xl border border-cyan-500/30 flex items-center gap-2 shadow-2xl focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all bg-slate-950/80">
                <Search className="w-4 h-4 text-cyan-400 ml-2.5 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Stacks: MERN, Python AI, Java Spring, Arduino, ESP32..."
                  className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none px-2"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 text-white font-bold text-xs shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                >
                  Explore Stacks
                </button>
              </div>
            </form>

            {/* Key Quality Pillars */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <div className="p-1 rounded bg-emerald-500/10 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-bold text-white text-[11px]">5-Hour Daily Labs</p>
                  <p className="text-[9px] text-slate-400">Zero Theory Fluff</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <div className="p-1 rounded bg-cyan-500/10 text-cyan-400">
                  <Cpu className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-bold text-white text-[11px]">Hardware & Kits</p>
                  <p className="text-[9px] text-slate-400">Physical Workbenches</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
                <div className="p-1 rounded bg-indigo-500/10 text-indigo-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-bold text-white text-[11px]">ISO Verified</p>
                  <p className="text-[9px] text-slate-400">University Approved</p>
                </div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                id="hero-enroll-primary-btn"
                onClick={() => onOpenEnrollment()}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 text-slate-950 font-black text-sm shadow-xl shadow-cyan-500/25 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Enroll in Industrial Training</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <a
                href={createWhatsAppDirectQueryLink('Free Demo Class & Career Consultation')}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-950/50 text-emerald-300 border border-emerald-500/40 font-bold text-sm hover:bg-emerald-900/50 transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Book 1-on-1 Mentor Demo</span>
              </a>
            </div>

          </div>

          {/* Right Column: Live Deep-Tech Interactive Simulator Command Center */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-xl">
              
              {/* Simulator Card Container */}
              <div className="glass-card rounded-3xl border border-cyan-500/30 overflow-hidden shadow-2xl bg-slate-950/95 relative z-10">
                
                {/* Simulator Header & Track Tabs */}
                <div className="p-3.5 bg-slate-900/90 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    </div>
                    <span className="text-xs font-mono text-slate-400 ml-2">techtrainx://lab-runtime</span>
                  </div>

                  {/* Track Switcher Pills */}
                  <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                    {(['fullstack', 'ai_ml', 'embedded_iot', 'java_cloud'] as SimulatorTrack[]).map((trackKey) => {
                      const labels: Record<SimulatorTrack, string> = {
                        fullstack: 'FullStack',
                        ai_ml: 'GenAI & ML',
                        embedded_iot: 'IoT & Robotics',
                        java_cloud: 'Java Cloud'
                      };
                      return (
                        <button
                          key={trackKey}
                          onClick={() => {
                            setActiveSimulatorTrack(trackKey);
                            setTerminalOutput([]);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                            activeSimulatorTrack === trackKey
                              ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-500/50 shadow-sm'
                              : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                          }`}
                        >
                          {labels[trackKey]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sub-header: Track Title & Live Specs */}
                <div className="px-4 py-2.5 bg-slate-900/50 border-b border-slate-800/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white">{codeSnippets[activeSimulatorTrack].title}</span>
                    <span className="text-[10px] text-cyan-400 ml-2 font-mono">{codeSnippets[activeSimulatorTrack].badge}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyCode}
                      className="text-[10px] text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800 border border-slate-700 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Code className="w-3 h-3 text-cyan-400" />}
                      <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                    </button>
                    <button
                      onClick={handleRunCodeSimulator}
                      disabled={isRunningCode}
                      className="px-3 py-1 rounded-lg bg-gradient-to-r from-emerald-600 to-cyan-600 text-slate-950 font-black text-[11px] hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50"
                    >
                      {isRunningCode ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3 fill-current" />}
                      <span>{isRunningCode ? 'Compiling...' : 'Run Sandbox'}</span>
                    </button>
                  </div>
                </div>

                {/* Code Window */}
                <div className="p-4 bg-[#050914] font-mono text-[11px] leading-relaxed text-slate-300 overflow-x-auto max-h-[190px] terminal-code-scroll border-b border-slate-800">
                  <pre className="whitespace-pre">
                    <code>{codeSnippets[activeSimulatorTrack].code}</code>
                  </pre>
                </div>

                {/* Live Terminal Output Drawer */}
                <div className="p-3.5 bg-slate-950 font-mono text-[10px] text-slate-400 space-y-1 min-h-[110px]">
                  <div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-slate-500 border-b border-slate-900 pb-1">
                    <span className="flex items-center gap-1 text-cyan-400 font-bold">
                      <Terminal className="w-3 h-3" /> Console Output & Benchmark
                    </span>
                    <span>Status: {isRunningCode ? 'Executing' : 'Idle / Ready'}</span>
                  </div>

                  {terminalOutput.length === 0 ? (
                    <p className="text-slate-600 italic pt-2">
                      Click <strong className="text-emerald-400 font-normal">"Run Sandbox"</strong> above to trigger live system compilation and verify performance metrics.
                    </p>
                  ) : (
                    terminalOutput.map((log, idx) => (
                      <p key={idx} className={`animate-in fade-in duration-150 ${log.includes('✅') || log.includes('🎓') || log.includes('🎯') || log.includes('🛠️') || log.includes('💼') ? 'text-emerald-400 font-bold' : log.includes('⚡') || log.includes('🔗') || log.includes('🧠') || log.includes('🔌') || log.includes('☕') ? 'text-cyan-300' : 'text-slate-300'}`}>
                        {log}
                      </p>
                    ))
                  )}
                </div>

                {/* Specs Footer Bar */}
                <div className="px-4 py-2.5 bg-slate-900/90 border-t border-slate-800 grid grid-cols-4 gap-2 text-center text-[10px]">
                  <div>
                    <span className="text-slate-500 block text-[9px]">Memory</span>
                    <span className="font-mono font-bold text-white">{codeSnippets[activeSimulatorTrack].specs.memory}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[9px]">Latency</span>
                    <span className="font-mono font-bold text-cyan-400">{codeSnippets[activeSimulatorTrack].specs.latency}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[9px]">Throughput</span>
                    <span className="font-mono font-bold text-emerald-400">{codeSnippets[activeSimulatorTrack].specs.throughput}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[9px]">Standard</span>
                    <span className="font-bold text-amber-400 truncate block">{codeSnippets[activeSimulatorTrack].specs.cert}</span>
                  </div>
                </div>

              </div>

              {/* Floating Stat Pill 1 */}
              <div className="absolute -top-4 -left-4 z-20 glass-panel p-2.5 rounded-2xl border border-cyan-500/40 shadow-xl hidden sm:flex items-center gap-2.5 bg-slate-900/90">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-black text-xs">
                  <Star className="w-4 h-4 fill-cyan-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">4.9 / 5.0 Rating</p>
                  <p className="text-[9px] text-slate-400">10,000+ Students Certified</p>
                </div>
              </div>

              {/* Floating Stat Pill 2 */}
              <div className="absolute -bottom-4 -right-4 z-20 glass-panel p-2.5 rounded-2xl border border-indigo-500/40 shadow-xl hidden sm:flex items-center gap-2.5 bg-slate-900/90">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-black text-xs">
                  <Zap className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Highest 24 LPA</p>
                  <p className="text-[9px] text-slate-400">Average 7.8 LPA at MNCs</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Global Tech Marquee Bar */}
        <div className="mt-14 pt-6 border-t border-slate-800/80">
          <p className="text-center text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-4">
            Standard Industry Stacks Deployed in TechTrainX Production Labs
          </p>
          <div className="tech-ticker-container">
            <div className="tech-ticker-content">
              {[
                'React 19 & Next.js 15', 'Node.js & Express', 'TypeScript 5.8', 'Python 3.12 & Django',
                'Spring Boot 3 & Kafka', 'PostgreSQL & Redis', 'MongoDB Atlas', 'Docker & Kubernetes',
                'LangChain & Llama 3', 'Flutter 3 & Dart', 'ESP32 & Arduino C++', 'FreeRTOS & LoRa',
                'TensorFlow & PyTorch', 'REST & GraphQL APIs', 'AWS Cloud Architectures'
              ].map((tech, i) => (
                <div key={i} className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-200 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  <span>{tech}</span>
                </div>
              ))}
              {[
                'React 19 & Next.js 15', 'Node.js & Express', 'TypeScript 5.8', 'Python 3.12 & Django',
                'Spring Boot 3 & Kafka', 'PostgreSQL & Redis', 'MongoDB Atlas', 'Docker & Kubernetes',
                'LangChain & Llama 3', 'Flutter 3 & Dart', 'ESP32 & Arduino C++', 'FreeRTOS & LoRa',
                'TensorFlow & PyTorch', 'REST & GraphQL APIs', 'AWS Cloud Architectures'
              ].map((tech, i) => (
                <div key={`dup-${i}`} className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-200 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

