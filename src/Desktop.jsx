import React, { useState, useEffect } from 'react';
import { FolderOpen, Code, BookOpen, Terminal as TerminalIcon, X, Minus, Square } from 'lucide-react';

// كود المنظومة المتكامل لـ محمد تقي رزاق
const Desktop = () => {
  const [windows, setWindows] = useState([]);
  const [showStartMenu, setShowStartMenu] = useState(false);

  // دالة فتح النوافذ
  const openWindow = (id, title, content) => {
    if (windows.find(w => w.id === id)) return;
    const newWindow = { id, title, content };
    setWindows([...windows, newWindow]);
  };

  const closeWindow = (id) => setWindows(windows.filter(w => w.id !== id));

  return (
    <div className="w-screen h-screen overflow-hidden relative bg-black text-green-500 font-mono">
      {/* خلفية ماتريكس بسيطة */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* أيقونات سطح المكتب */}
      <div className="absolute top-8 left-8 flex flex-col gap-8 z-10">
        <button onClick={() => openWindow('info', 'USER_INFO', <UserInfo />)} className="flex flex-col items-center gap-2 hover:bg-green-500/10 p-2 rounded transition-all">
          <TerminalIcon className="w-10 h-10" />
          <span className="text-xs">SINO_INFO</span>
        </button>
        <button onClick={() => openWindow('skills', 'SKILLS', <Skills />)} className="flex flex-col items-center gap-2 hover:bg-green-500/10 p-2 rounded transition-all">
          <Code className="w-10 h-10" />
          <span className="text-xs">SKILLS</span>
        </button>
      </div>

      {/* عرض النوافذ المفتوحة */}
      {windows.map((win) => (
        <div key={win.id} className="absolute top-20 left-1/4 w-[500px] bg-black border-2 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)] z-20">
          <div className="bg-green-500 text-black p-1 flex justify-between items-center cursor-move">
            <span className="text-sm font-bold ml-2">{win.title}</span>
            <div className="flex gap-1">
              <button className="hover:bg-green-600 p-1"><Minus size={14} /></button>
              <button onClick={() => closeWindow(win.id)} className="hover:bg-red-500 p-1"><X size={14} /></button>
            </div>
          </div>
          <div className="p-4 h-[300px] overflow-auto">
            {win.content}
          </div>
        </div>
      ))}

      {/* شريط المهام السفلي */}
      <div className="absolute bottom-0 w-full h-12 bg-black border-t-2 border-green-500 flex items-center px-4 gap-4 z-30">
        <button onClick={() => setShowStartMenu(!showStartMenu)} className="bg-green-500 text-black px-4 py-1 font-bold hover:bg-green-400">START</button>
        <div className="text-xs ml-auto">IP: 192.168.1.100 | BAGHDAD_STATION</div>
      </div>
    </div>
  );
};

// مكونات المحتوى (بديلة للملفات المفقودة)
const UserInfo = () => (
  <div className="space-y-2">
    <p>> NAME: محمد تقي رزاق (سينو)</p>
    <p>> AGE: 26 YEARS OLD</p>
    <p>> RANK: CYBER SECURITY EXPERT</p>
    <p>> AUTHOR: بوابة الأمن السيبراني: من الصفر إلى الاحتراف</p>
  </div>
);

const Skills = () => (
  <div className="grid grid-cols-2 gap-2">
    <div className="border border-green-800 p-2 italic">> Penetration Testing</div>
    <div className="border border-green-800 p-2 italic">> Python for Hacking</div>
    <div className="border border-green-800 p-2 italic">> Network Security</div>
    <div className="border border-green-800 p-2 italic">> Social Engineering</div>
  </div>
);

export default Desktop;
