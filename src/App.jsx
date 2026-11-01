import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  Play, Volume2, VolumeX, Home, ArrowLeft, ArrowRight, HelpCircle, 
  Settings, Bot, RotateCcw, Box, Eye, Sparkles, Award, Star, CheckCircle, 
  XCircle, Send, Info, ChevronRight, Layers, Grid, Calculator, Map, Lock, RefreshCw, MessageSquare
} from 'lucide-react';

// --- TTS Engine with Female SD Teacher Persona ---
const useTeacherVoice = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [voiceRate, setVoiceRate] = useState(0.88);
  const synthRef = useRef(window.speechSynthesis);
  const currentUtterance = useRef(null);

  const speak = (text) => {
    if (isMuted || !text) return;
    if (synthRef.current) {
      synthRef.current.cancel();
    }

    const cleanText = text.replace(/[$*^]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'id-ID';
    utterance.rate = voiceRate;
    utterance.pitch = 1.25;

    const voices = synthRef.current.getVoices();
    const idFemaleVoice = voices.find(v => 
      v.lang.includes('id') && 
      (v.name.toLowerCase().includes('female') || 
       v.name.toLowerCase().includes('perempuan') || 
       v.name.toLowerCase().includes('zira') || 
       v.name.toLowerCase().includes('gadis') ||
       v.name.toLowerCase().includes('indonesia'))
    ) || voices.find(v => v.lang.includes('id'));

    if (idFemaleVoice) utterance.voice = idFemaleVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    currentUtterance.current = utterance;
    synthRef.current.speak(utterance);
  };

  const stop = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  return { speak, stop, isSpeaking, isMuted, setIsMuted, voiceRate, setVoiceRate };
};

// --- Global Header ---
const Header = ({ currentScreen, setScreen, voiceControls }) => {
  const { isMuted, setIsMuted, isSpeaking, stop } = voiceControls;
  
  return (
    <header className="bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 text-white p-4 shadow-lg flex justify-between items-center z-50 rounded-b-2xl">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => { stop(); setScreen('menu'); }}>
        <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center font-bold text-xl border border-white/30 shadow-inner">
          S
        </div>
        <div>
          <h1 className="font-heading text-xl md:text-2xl font-extrabold tracking-wide drop-shadow-md">SEPHIA</h1>
          <p className="text-xs text-cyan-100 hidden sm:block">Spatial Exploration & Pedagogical AI</p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {isSpeaking && (
          <div className="flex items-center gap-1 bg-emerald-500/80 backdrop-blur border border-emerald-300 px-3 py-1 rounded-full text-xs animate-pulse font-medium">
            <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
            Ibu Guru SEPHIA Berbicara...
          </div>
        )}

        <button 
          onClick={() => setIsMuted(!isMuted)}
          className={`p-2.5 rounded-xl border transition-all ${isMuted ? 'bg-red-500/80 border-red-300' : 'bg-white/20 border-white/30 hover:bg-white/30'}`}
          title={isMuted ? "Aktifkan Suara" : "Matikan Suara"}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        {currentScreen !== 'splash' && currentScreen !== 'menu' && (
          <button 
            onClick={() => { stop(); setScreen('menu'); }}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-4 py-2 rounded-xl transition-all shadow-md active:scale-95"
          >
            <Home size={18} />
            <span className="hidden sm:inline">Menu Utama</span>
          </button>
        )}
      </div>
    </header>
  );
};

// --- Splash Screen ---
const SplashScreen = ({ setScreen, speak }) => {
  useEffect(() => {
    speak("Halo anak-anak pintar! Selamat datang di SEPHIA, media pembelajaran matematika interaktif materi kubus dan balok. Yuk, mulai petualangan seru kita bersama Ibu Guru!");
  }, []);

  return (
    <div className="min-h-[85vh] flex flex-col justify-between p-6 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white relative overflow-hidden rounded-3xl m-4 shadow-2xl border border-cyan-500/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(6,182,212,0.15),transparent)] pointer-events-none"></div>

      <div className="text-center mt-6 z-10 space-y-3">
        <span className="bg-cyan-500/20 text-cyan-300 text-xs md:text-sm px-4 py-1.5 rounded-full border border-cyan-400/40 font-semibold tracking-wider uppercase">
          Multimedia Pembelajaran Interaktif SD Kelas VI
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-200 to-orange-400 font-heading drop-shadow-lg">
          SEPHIA
        </h1>
        <p className="text-lg md:text-2xl font-bold text-slate-200">
          Spatial Exploration of Cubes and Cuboids
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 my-8 z-10">
        <div className="relative w-48 h-48 flex items-center justify-center bg-cyan-500/10 rounded-full border-2 border-cyan-400/30 animate-pulse">
          <Box size={100} className="text-cyan-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.6)]" />
        </div>

        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 max-w-md text-left space-y-2 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center font-bold text-xl text-white shadow-md">
              🧕
            </div>
            <div>
              <h3 className="font-bold text-cyan-300">Pengembang Application</h3>
              <p className="text-sm font-semibold">Dewi Anggraini</p>
            </div>
          </div>
          <hr className="border-white/10" />
          <p className="text-xs text-slate-300">
            <strong>Institusi:</strong> Universitas Muhammadiyah Malang<br />
            <strong>Program Studi:</strong> S2 Pedagogi<br />
            <strong>Mata Pelajaran:</strong> Matematika Bangun Ruang
          </p>
        </div>
      </div>

      <div className="text-center mb-6 z-10">
        <button 
          onClick={() => setScreen('menu')}
          className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-heading font-extrabold text-xl md:text-2xl px-10 py-4 rounded-2xl shadow-[0_0_30px_rgba(249,115,22,0.5)] transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto"
        >
          <Play size={28} className="fill-slate-950" />
          MULAI BELAJAR SEKARANG
        </button>
      </div>
    </div>
  );
};

// --- Main Menu Component ---
const MainMenu = ({ setScreen, speak }) => {
  useEffect(() => {
    speak("Silakan pilih menu belajar yang anak-anak mau! Ada Eksplorasi 3D, Unsur, Sifat, Rumus, dan Game Matematika!");
  }, []);

  const menuItems = [
    { id: 'kenali', title: '1. Kenali Bangun Ruang', icon: Eye, color: 'from-blue-500 to-indigo-600', desc: 'Pengertian dasar & objek nyata' },
    { id: 'eksplorasi', title: '2. Eksplorasi 3D & Jaring-Jaring', icon: Box, color: 'from-cyan-500 to-teal-600', desc: 'Transformasi lipatan interaktif' },
    { id: 'unsur', title: '3. Unsur Bangun Ruang', icon: Layers, color: 'from-emerald-500 to-green-600', desc: 'Sisi, rusuk & titik sudut' },
    { id: 'sifat', title: '4. Sifat Kubus & Balok', icon: Grid, color: 'from-purple-500 to-indigo-600', desc: 'Perbandingan karakteristik' },
    { id: 'luas', title: '5. Luas Permukaan', icon: Calculator, color: 'from-amber-500 to-orange-600', desc: 'Simulasi kalkulasi desimal' },
    { id: 'volume', title: '6. Volume Bangun Ruang', icon: Sparkles, color: 'from-rose-500 to-pink-600', desc: 'Simulasi kubus satuan 3D' },
    { id: 'game', title: '7. Game Peta Petualangan', icon: Map, color: 'from-yellow-400 to-amber-600', desc: '5 Level tantangan berhadiah' },
    { id: 'tentang', title: '8. Tentang & Pengaturan', icon: Info, color: 'from-slate-600 to-slate-800', desc: 'Informasi pengembang & voice' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 font-heading">Menu Utama Pembelajaran</h2>
        <p className="text-slate-600 font-medium">Pilih aktivitas interaktif di bawah ini untuk memulai belajar!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => setScreen(item.id)}
              className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all border-2 border-slate-100 hover:border-cyan-400 cursor-pointer flex flex-col justify-between transform hover:-translate-y-1 active:scale-95"
            >
              <div className="space-y-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon size={28} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-slate-800 group-hover:text-cyan-600 transition-colors">{item.title}</h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">{item.desc}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-end text-cyan-600 text-sm font-bold group-hover:translate-x-1 transition-transform">
                Buka <ChevronRight size={16} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- Module 1: Kenali Bangun Ruang ---
const KenaliModule = ({ speak }) => {
  useEffect(() => {
    speak("Ayo kenali bentuk kubus dan balok! Amati benda-benda nyata di sekitar kita seperti dadu dan kotak sepatu!");
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 bg-white rounded-3xl shadow-xl border border-slate-200">
      <h2 className="text-3xl font-bold font-heading text-slate-800 text-center">Kenali Kubus & Balok</h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-cyan-50/60 p-6 rounded-2xl border border-cyan-200 space-y-4">
          <span className="bg-cyan-500 text-white text-xs px-3 py-1 rounded-full font-bold">BANGUN RUANG 1</span>
          <h3 className="text-2xl font-bold text-cyan-900 font-heading">1. Kubus</h3>
          <p className="text-slate-700 leading-relaxed text-sm">
            Kubus adalah bangun ruang tiga dimensi yang dibatasi oleh <strong>6 buah bidang sisi berbentuk persegi</strong> yang kongruen (sama dan serupa).
          </p>
          <div className="bg-white p-4 rounded-xl border border-cyan-100 space-y-2 shadow-sm">
            <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider">Contoh Benda Nyata:</h4>
            <div className="flex gap-4 text-2xl">
              <span title="Dadu">🎲 Dadu</span>
              <span title="Rubik">🧩 Rubik</span>
              <span title="Kotak Hadiah">🎁 Kotak Kado</span>
            </div>
          </div>
        </div>

        <div className="bg-orange-50/60 p-6 rounded-2xl border border-orange-200 space-y-4">
          <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-bold">BANGUN RUANG 2</span>
          <h3 className="text-2xl font-bold text-orange-900 font-heading">2. Balok</h3>
          <p className="text-slate-700 leading-relaxed text-sm">
            Balok adalah bangun ruang tiga dimensi yang dibentuk oleh <strong>3 pasang persegi panjang</strong> di mana sisi-sisi yang berhadapan sama besar.
          </p>
          <div className="bg-white p-4 rounded-xl border border-orange-100 space-y-2 shadow-sm">
            <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider">Contoh Benda Nyata:</h4>
            <div className="flex gap-4 text-2xl">
              <span title="Buku">📚 Buku</span>
              <span title="Kotak Sepatu">👟 Kotak Sepatu</span>
              <span title="Lemari">🚪 Lemari</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Module 2: Eksplorasi 3D & Jaring-Jaring ---
const Eksplorasi3DModule = ({ speak }) => {
  const mountRef = useRef(null);
  const [shape, setShape] = useState('cube'); 
  const [unfoldProgress, setUnfoldProgress] = useState(0); 
  const progressRef = useRef(0);
  const meshGroupRef = useRef(null);
  const facesRef = useRef({});

  useEffect(() => {
    speak("Wah, ini adalah laboratorium 3D interaktif! Geser slider untuk membuka jaring-jaring. Perhatikan sisi atas warna merah tetap menempel pada sisi belakang warna kuning!");
  }, [shape]);

  useEffect(() => {
    progressRef.current = unfoldProgress;
  }, [unfoldProgress]);

  useEffect(() => {
    if (!mountRef.current) return;
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(4, 4, 6);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    meshGroupRef.current = mainGroup;

    const sizeX = shape === 'cube' ? 2 : 2.6;
    const sizeY = shape === 'cube' ? 2 : 1.6;
    const sizeZ = shape === 'cube' ? 2 : 1.4;

    const createFace = (w, h, color) => {
      const geom = new THREE.PlaneGeometry(w, h);
      const mat = new THREE.MeshStandardMaterial({ 
        color, 
        side: THREE.DoubleSide,
        roughness: 0.3,
        metalness: 0.1
      });
      return new THREE.Mesh(geom, mat);
    };

    const bottomFace = createFace(sizeX, sizeZ, 0x06b6d4); // Cyan
    bottomFace.rotation.x = Math.PI / 2;
    mainGroup.add(bottomFace);

    const frontPivot = new THREE.Group();
    frontPivot.position.set(0, 0, sizeZ / 2);
    const frontFace = createFace(sizeX, sizeY, 0x10b981); // Emerald
    frontFace.position.set(0, sizeY / 2, 0);
    frontPivot.add(frontFace);
    mainGroup.add(frontPivot);

    const backPivot = new THREE.Group();
    backPivot.position.set(0, 0, -sizeZ / 2);
    const backFace = createFace(sizeX, sizeY, 0xeab308); // Yellow
    backFace.position.set(0, sizeY / 2, 0);
    backPivot.add(backFace);
    mainGroup.add(backPivot);

    const topPivot = new THREE.Group();
    topPivot.position.set(0, sizeY, 0);
    const topFace = createFace(sizeX, sizeZ, 0xef4444); // Red Top
    topFace.position.set(0, 0, -sizeZ / 2);
    topFace.rotation.x = Math.PI / 2;
    topPivot.add(topFace);
    backFace.add(topPivot);

    const leftPivot = new THREE.Group();
    leftPivot.position.set(-sizeX / 2, 0, 0);
    const leftFace = createFace(sizeZ, sizeY, 0x3b82f6); // Blue
    leftFace.rotation.y = Math.PI / 2;
    leftFace.position.set(0, sizeY / 2, 0);
    leftPivot.add(leftFace);
    mainGroup.add(leftPivot);

    const rightPivot = new THREE.Group();
    rightPivot.position.set(sizeX / 2, 0, 0);
    const rightFace = createFace(sizeZ, sizeY, 0xf97316); // Orange
    rightFace.rotation.y = -Math.PI / 2;
    rightFace.position.set(0, sizeY / 2, 0);
    rightPivot.add(rightFace);
    mainGroup.add(rightPivot);

    facesRef.current = { frontPivot, backPivot, topPivot, leftPivot, rightPivot };

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const t = progressRef.current; 
      const angle = t * (Math.PI / 2);

      frontPivot.rotation.x = angle;
      backPivot.rotation.x = -angle;
      topPivot.rotation.x = -angle; 
      leftPivot.rotation.z = angle;
      rightPivot.rotation.z = -angle;

      mainGroup.rotation.y += 0.003;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [shape]);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 bg-white rounded-3xl shadow-xl border border-slate-200">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold font-heading text-slate-800">Eksplorasi 3D & Transformasi Jaring-Jaring</h2>
          <p className="text-sm text-slate-600">Amati transformasi bentuk 3D menjadi jaring-jaring 2D terbentang.</p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button 
            onClick={() => setShape('cube')} 
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${shape === 'cube' ? 'bg-cyan-500 text-white shadow' : 'text-slate-600'}`}
          >
            Kubus
          </button>
          <button 
            onClick={() => setShape('cuboid')} 
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${shape === 'cuboid' ? 'bg-cyan-500 text-white shadow' : 'text-slate-600'}`}
          >
            Balok
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-slate-50 rounded-2xl h-[420px] relative overflow-hidden border border-slate-200" ref={mountRef}>
          <div className="absolute top-4 left-4 bg-white/80 backdrop-blur p-3 rounded-xl border border-slate-200 text-xs font-semibold space-y-1 z-10 shadow">
            <p className="flex items-center gap-2"><span className="w-3 h-3 bg-red-500 rounded-full inline-block"></span> Sisi Atas (Tutup)</p>
            <p className="flex items-center gap-2"><span className="w-3 h-3 bg-cyan-500 rounded-full inline-block"></span> Sisi Alas (Bawah)</p>
            <p className="flex items-center gap-2"><span className="w-3 h-3 bg-yellow-500 rounded-full inline-block"></span> Sisi Belakang</p>
          </div>
        </div>

        <div className="bg-cyan-50/50 p-6 rounded-2xl border border-cyan-200 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-xl text-slate-800">Kontrol Lipatan Jaring-Jaring</h3>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 flex justify-between">
                <span>Kondisi Bangun Ruang</span>
                <span>{Math.round(unfoldProgress * 100)}% Terbuka</span>
              </label>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={unfoldProgress} 
                onChange={(e) => setUnfoldProgress(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => setUnfoldProgress(1)} 
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2.5 rounded-xl text-sm transition-all shadow"
              >
                Buka Full
              </button>
              <button 
                onClick={() => setUnfoldProgress(0)} 
                className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-2.5 rounded-xl text-sm transition-all"
              >
                Tutup Solid
              </button>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-cyan-100 text-xs text-slate-600 space-y-1">
            <p className="font-bold text-cyan-800">💡 Fakta Jaring-Jaring:</p>
            <p>Sisi atas (merah) diposisikan secara terikat pada rusuk atas sisi belakang (kuning) sehingga saat dilipat tidak ada bagian yang lepas atau mengambang!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Module 3: Unsur Bangun Ruang ---
const UnsurModule = ({ speak }) => {
  useEffect(() => {
    speak("Yuk pelajari 6 unsur utama pada kubus dan balok! Ada Sisi, Rusuk, Titik Sudut, Diagonal Bidang, Diagonal Ruang, dan Bidang Diagonal!");
  }, []);

  const unsurList = [
    { name: '1. Sisi / Bidang', amount: '6 Buah', desc: 'Bidang datar yang membatasi bagian dalam dan luar bangun ruang.' },
    { name: '2. Rusuk', amount: '12 Buah', desc: 'Garis potong pertemuan antara dua sisi bangun ruang.' },
    { name: '3. Titik Sudut', amount: '8 Buah', desc: 'Titik potong hasil pertemuan tiga buah rusuk.' },
    { name: '4. Diagonal Bidang', amount: '12 Buah', desc: 'Garis yang menghubungkan dua titik sudut berhadapan pada satu sisi.' },
    { name: '5. Diagonal Ruang', amount: '4 Buah', desc: 'Garis yang menghubungkan dua titik sudut berhadapan di dalam ruang.' },
    { name: '6. Bidang Diagonal', amount: '6 Buah', desc: 'Bidang yang dibentuk oleh dua diagonal bidang yang sejajar.' },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 bg-white rounded-3xl shadow-xl border border-slate-200">
      <h2 className="text-3xl font-bold font-heading text-slate-800 text-center">6 Unsur Utama Bangun Ruang</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {unsurList.map((item, idx) => (
          <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 hover:border-cyan-400 transition-all space-y-2">
            <span className="bg-cyan-100 text-cyan-800 text-xs font-extrabold px-2.5 py-1 rounded-md">{item.amount}</span>
            <h3 className="font-bold text-lg text-slate-800 font-heading">{item.name}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Module 4: Sifat-Sifat Kubus & Balok ---
const SifatModule = ({ speak }) => {
  useEffect(() => {
    speak("Berikut adalah tabel perbandingan sifat-sifat kubus dan balok. Perhatikan persamaannya!");
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 bg-white rounded-3xl shadow-xl border border-slate-200">
      <h2 className="text-3xl font-bold font-heading text-slate-800 text-center">Tabel Perbandingan Sifat</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-cyan-500 text-white font-heading text-sm">
              <th className="p-4 rounded-tl-xl">Karakteristik Unsur</th>
              <th className="p-4">Bangun Ruang Kubus</th>
              <th className="p-4 rounded-tr-xl">Bangun Ruang Balok</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-100 text-slate-700">
            <tr>
              <td className="p-4 font-bold bg-slate-50">Bentuk Sisi</td>
              <td className="p-4">6 sisi berbentuk <strong>Persegi Sama Besar</strong></td>
              <td className="p-4">6 sisi berbentuk <strong>Persegi Panjang</strong></td>
            </tr>
            <tr>
              <td className="p-4 font-bold bg-slate-50">Ukuran Rusuk</td>
              <td className="p-4">12 rusuk <strong>Sama Panjang</strong></td>
              <td className="p-4">12 rusuk terbagi jadi <strong>3 Pasang Rusuk Sejajar</strong></td>
            </tr>
            <tr>
              <td className="p-4 font-bold bg-slate-50">Besar Sudut</td>
              <td className="p-4">Semua sudut merupakan <strong>Sudut Siku-Siku (90°)</strong></td>
              <td className="p-4">Semua sudut merupakan <strong>Sudut Siku-Siku (90°)</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- Module 5: Luas Permukaan (Desimal Support) ---
const LuasPermukaanModule = ({ speak }) => {
  const [sisi, setSisi] = useState('5');
  const [p, setP] = useState('8');
  const [l, setL] = useState('4');
  const [t, setT] = useState('5');

  useEffect(() => {
    speak("Di menu ini anak-anak bisa mencoba menghitung luas permukaan dengan menginput angka desimal secara manual!");
  }, []);

  const numSisi = parseFloat(sisi.replace(',', '.')) || 0;
  const numP = parseFloat(p.replace(',', '.')) || 0;
  const numL = parseFloat(l.replace(',', '.')) || 0;
  const numT = parseFloat(t.replace(',', '.')) || 0;

  const lpKubus = 6 * (numSisi * numSisi);
  const lpBalok = 2 * (numP * numL + numP * numT + numL * numT);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 bg-white rounded-3xl shadow-xl border border-slate-200">
      <h2 className="text-3xl font-bold font-heading text-slate-800 text-center">Kalkulator Luas Permukaan (Mendukung Desimal)</h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-cyan-50/50 p-6 rounded-2xl border border-cyan-200 space-y-4">
          <h3 className="font-heading font-bold text-xl text-cyan-900">Luas Permukaan Kubus</h3>
          <p className="text-xs text-slate-600 font-mono bg-white p-2 rounded border border-cyan-100">LP = 6 × s²</p>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Panjang Sisi (s) cm:</label>
            <input 
              type="text" 
              value={sisi} 
              onChange={(e) => setSisi(e.target.value)} 
              className="w-full p-3 rounded-xl border border-slate-300 font-bold text-slate-800"
              placeholder="Contoh: 5.5"
            />
          </div>

          <div className="bg-white p-4 rounded-xl border border-cyan-200 space-y-2">
            <p className="text-xs text-slate-500 font-bold">Langkah Perhitungan:</p>
            <p className="text-xs font-mono">LP = 6 × ({numSisi} × {numSisi})</p>
            <p className="text-xs font-mono">LP = 6 × {(numSisi * numSisi).toFixed(2)}</p>
            <p className="text-lg font-extrabold text-cyan-700">Hasil: {lpKubus.toFixed(2)} cm²</p>
          </div>
        </div>

        <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-200 space-y-4">
          <h3 className="font-heading font-bold text-xl text-orange-900">Luas Permukaan Balok</h3>
          <p className="text-xs text-slate-600 font-mono bg-white p-2 rounded border border-orange-100">LP = 2 × (p×l + p×t + l×t)</p>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-xs font-bold text-slate-700">p (cm):</label>
              <input type="text" value={p} onChange={(e) => setP(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-800" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700">l (cm):</label>
              <input type="text" value={l} onChange={(e) => setL(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-800" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700">t (cm):</label>
              <input type="text" value={t} onChange={(e) => setT(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-800" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-orange-200 space-y-2">
            <p className="text-xs text-slate-500 font-bold">Langkah Perhitungan:</p>
            <p className="text-xs font-mono">LP = 2 × ({(numP*numL).toFixed(2)} + {(numP*numT).toFixed(2)} + {(numL*numT).toFixed(2)})</p>
            <p className="text-lg font-extrabold text-orange-700">Hasil: {lpBalok.toFixed(2)} cm²</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Module 6: Volume Bangun Ruang ---
const VolumeModule = ({ speak }) => {
  const [sisi, setSisi] = useState('4');
  const [p, setP] = useState('6');
  const [l, setL] = useState('3');
  const [t, setT] = useState('4');

  useEffect(() => {
    speak("Ayo pelajari perhitungan volume kubus dan balok dengan satuan cm kubik!");
  }, []);

  const numSisi = parseFloat(sisi.replace(',', '.')) || 0;
  const numP = parseFloat(p.replace(',', '.')) || 0;
  const numL = parseFloat(l.replace(',', '.')) || 0;
  const numT = parseFloat(t.replace(',', '.')) || 0;

  const vKubus = numSisi * numSisi * numSisi;
  const vBalok = numP * numL * numT;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 bg-white rounded-3xl shadow-xl border border-slate-200">
      <h2 className="text-3xl font-bold font-heading text-slate-800 text-center">Kalkulator Volume Bangun Ruang</h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-cyan-50/50 p-6 rounded-2xl border border-cyan-200 space-y-4">
          <h3 className="font-heading font-bold text-xl text-cyan-900">Volume Kubus</h3>
          <p className="text-xs text-slate-600 font-mono bg-white p-2 rounded border border-cyan-100">V = s³ = s × s × s</p>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Panjang Sisi (s) cm:</label>
            <input type="text" value={sisi} onChange={(e) => setSisi(e.target.value)} className="w-full p-3 rounded-xl border border-slate-300 font-bold text-slate-800" />
          </div>

          <div className="bg-white p-4 rounded-xl border border-cyan-200 space-y-2">
            <p className="text-xs font-mono">V = {numSisi} × {numSisi} × {numSisi}</p>
            <p className="text-lg font-extrabold text-cyan-700">Hasil: {vKubus.toFixed(2)} cm³</p>
          </div>
        </div>

        <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-200 space-y-4">
          <h3 className="font-heading font-bold text-xl text-orange-900">Volume Balok</h3>
          <p className="text-xs text-slate-600 font-mono bg-white p-2 rounded border border-orange-100">V = p × l × t</p>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-xs font-bold text-slate-700">p (cm):</label>
              <input type="text" value={p} onChange={(e) => setP(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-800" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700">l (cm):</label>
              <input type="text" value={l} onChange={(e) => setL(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-800" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700">t (cm):</label>
              <input type="text" value={t} onChange={(e) => setT(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-800" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-orange-200 space-y-2">
            <p className="text-xs font-mono">V = {numP} × {numL} × {numT}</p>
            <p className="text-lg font-extrabold text-orange-700">Hasil: {vBalok.toFixed(2)} cm³</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Module 7: Game Peta Petualangan 5 Level ---
const MapGameModule = ({ speak }) => {
  const [unlockedLevel, setUnlockedLevel] = useState(1);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [score, setScore] = useState(0);
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedAns, setSelectedAns] = useState(null);

  useEffect(() => {
    speak("Selamat datang di Peta Petualangan SEPHIA! Selesaikan setiap level dengan nilai minimal 70 persen untuk membuka level berikutnya!");
  }, []);

  const levelsData = [
    {
      level: 1,
      title: 'Level 1: Penjelajah Pemula',
      desc: 'Mengenal Sisi & Karakteristik Dasar',
      questions: [
        { q: 'Berapakah jumlah sisi pada sebuah kubus?', options: ['4 sisi', '6 sisi', '8 sisi', '12 sisi'], ans: 1 },
        { q: 'Semua sisi pada bangun kubus berbentuk...', options: ['Persegi Panjang', 'Segitiga', 'Persegi', 'Lingkaran'], ans: 2 }
      ]
    },
    {
      level: 2,
      title: 'Level 2: Petualang Spasial',
      desc: 'Mengidentifikasi Rusuk & Titik Sudut',
      questions: [
        { q: 'Jumlah titik sudut pada bangun balok adalah...', options: ['6', '8', '12', '16'], ans: 1 },
        { q: 'Jumlah rusuk yang dimiliki bangun kubus adalah...', options: ['8', '10', '12', '14'], ans: 2 }
      ]
    },
    {
      level: 3,
      title: 'Level 3: Ahli Jaring-Jaring',
      desc: 'Pemahaman Transformasi 3D ke 2D',
      questions: [
        { q: 'Berapakah jumlah bidang pada jaring-jaring balok?', options: ['4', '6', '8', '12'], ans: 1 }
      ]
    },
    {
      level: 4,
      title: 'Level 4: Master Luas Permukaan',
      desc: 'Kalkulasi Luas Permukaan',
      questions: [
        { q: 'Sebuah kubus memiliki panjang sisi 5 cm. Luas permukaannya adalah...', options: ['125 cm²', '150 cm²', '100 cm²', '60 cm²'], ans: 1 }
      ]
    },
    {
      level: 5,
      title: 'Level 5: SEPHIA Math Champion',
      desc: 'Kalkulasi Volume Kontekstual',
      questions: [
        { q: 'Sebuah kotak kardus berbentuk balok berukuran 6 cm x 4 cm x 3 cm. Berapakah volumenya?', options: ['72 cm³', '36 cm³', '48 cm³', '96 cm³'], ans: 0 }
      ]
    }
  ];

  const startLevel = (lvl) => {
    if (lvl > unlockedLevel) return;
    setCurrentLevel(lvl);
    setQuizIdx(0);
    setScore(0);
    setSelectedAns(null);
  };

  const submitAnswer = (idx) => {
    setSelectedAns(idx);
    const lvlObj = levelsData.find(l => l.level === currentLevel);
    if (idx === lvlObj.questions[quizIdx].ans) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    const lvlObj = levelsData.find(l => l.level === currentLevel);
    if (quizIdx + 1 < lvlObj.questions.length) {
      setQuizIdx(prev => prev + 1);
      setSelectedAns(null);
    } else {
      const finalPercentage = (score / lvlObj.questions.length) * 100;
      if (finalPercentage >= 50 && unlockedLevel === currentLevel) {
        setUnlockedLevel(prev => Math.min(prev + 1, 5));
      }
      alert(`Level Selesai! Skor Kamu: ${score}/${lvlObj.questions.length}`);
      setCurrentLevel(null);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 bg-white rounded-3xl shadow-xl border border-slate-200">
      <h2 className="text-3xl font-bold font-heading text-slate-800 text-center">Peta Petualangan 5 Level</h2>

      {!currentLevel ? (
        <div className="grid md:grid-cols-5 gap-4 my-8">
          {levelsData.map((lvl) => {
            const isLocked = lvl.level > unlockedLevel;
            return (
              <div 
                key={lvl.level}
                onClick={() => startLevel(lvl.level)}
                className={`p-6 rounded-2xl border-2 flex flex-col items-center justify-between text-center transition-all cursor-pointer ${
                  isLocked ? 'bg-slate-100 border-slate-300 opacity-60' : 'bg-cyan-50 border-cyan-400 hover:scale-105 shadow-md'
                }`}
              >
                {isLocked ? <Lock size={32} className="text-slate-400" /> : <Star size={32} className="text-amber-400 fill-amber-400" />}
                <div>
                  <h3 className="font-bold font-heading text-sm text-slate-800 mt-2">{lvl.title}</h3>
                  <p className="text-[10px] text-slate-500 mt-1">{lvl.desc}</p>
                </div>
                <button className={`mt-4 px-3 py-1 rounded-full text-xs font-bold ${isLocked ? 'bg-slate-300 text-slate-600' : 'bg-cyan-500 text-white'}`}>
                  {isLocked ? 'Terkunci' : 'Mainkan'}
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-bold font-heading text-lg text-cyan-800">Soal {quizIdx + 1}</h3>
            <button onClick={() => setCurrentLevel(null)} className="text-xs text-red-500 font-bold">Keluar Level</button>
          </div>

          <p className="text-lg font-bold text-slate-800">{levelsData.find(l => l.level === currentLevel).questions[quizIdx].q}</p>

          <div className="grid grid-cols-2 gap-4">
            {levelsData.find(l => l.level === currentLevel).questions[quizIdx].options.map((opt, oIdx) => (
              <button
                key={oIdx}
                onClick={() => submitAnswer(oIdx)}
                className={`p-4 rounded-xl border font-bold text-sm text-left transition-all ${
                  selectedAns === oIdx ? 'bg-cyan-500 text-white border-cyan-600' : 'bg-white text-slate-700 border-slate-300 hover:border-cyan-400'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {selectedAns !== null && (
            <button onClick={nextQuestion} className="bg-emerald-500 text-white font-bold px-6 py-2.5 rounded-xl shadow">
              Lanjut Soal <ChevronRight className="inline" size={16} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// --- Module 8: AI Tutor & Feedback Modal ---
const AIAndFeedbackModule = ({ speak }) => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Halo! Saya Robot SEPHIA AI. Ada konsep bangun ruang yang ingin kamu tanyakan?' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { sender: 'ai', text: `Wah, pertanyaan bagus tentang "${userMsg}"! Kubus dan balok adalah bangun ruang dasar. Coba periksa jumlah sisinya ya!` }
      ]);
    }, 800);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 bg-white rounded-3xl shadow-xl border border-slate-200">
      <h2 className="text-3xl font-bold font-heading text-slate-800 text-center">SEPHIA AI Tutor & Feedback</h2>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 h-80 overflow-y-auto space-y-3">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 rounded-2xl max-w-md text-sm ${m.sender === 'user' ? 'bg-cyan-500 text-white' : 'bg-white border border-slate-200 text-slate-800 shadow-sm'}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Tanyakan sesuatu ke SEPHIA AI..." 
          className="flex-1 p-3 rounded-xl border border-slate-300"
        />
        <button onClick={sendMessage} className="bg-cyan-500 text-white p-3 rounded-xl"><Send size={20} /></button>
      </div>
    </div>
  );
};

// --- Main App Controller ---
export default function App() {
  const [currentScreen, setScreen] = useState('splash');
  const voiceControls = useTeacherVoice();

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      <Header currentScreen={currentScreen} setScreen={setScreen} voiceControls={voiceControls} />

      <main className="flex-1 py-6">
        {currentScreen === 'splash' && <SplashScreen setScreen={setScreen} speak={voiceControls.speak} />}
        {currentScreen === 'menu' && <MainMenu setScreen={setScreen} speak={voiceControls.speak} />}
        {currentScreen === 'kenali' && <KenaliModule speak={voiceControls.speak} />}
        {currentScreen === 'eksplorasi' && <Eksplorasi3DModule speak={voiceControls.speak} />}
        {currentScreen === 'unsur' && <UnsurModule speak={voiceControls.speak} />}
        {currentScreen === 'sifat' && <SifatModule speak={voiceControls.speak} />}
        {currentScreen === 'luas' && <LuasPermukaanModule speak={voiceControls.speak} />}
        {currentScreen === 'volume' && <VolumeModule speak={voiceControls.speak} />}
        {currentScreen === 'game' && <MapGameModule speak={voiceControls.speak} />}
        {currentScreen === 'tentang' && <AIAndFeedbackModule speak={voiceControls.speak} />}
      </main>

      <footer className="bg-slate-900 text-slate-400 text-center py-4 text-xs font-semibold">
        © SEPHIA 2026 — Universitas Muhammadiyah Malang (Dewi Anggraini - S2 Pedagogi)
      </footer>
    </div>
  );
}
