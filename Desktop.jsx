import { useState, useEffect } from 'react';
import Window from './Window';
import DesktopIcon from './DesktopIcon';
import Taskbar from './Taskbar';
import Terminal from './Terminal';
import MyLibrary from './MyLibrary';
import Skills from './Skills';
import Projects from './Projects';
import StartMenu from './StartMenu';
import AudioPlayer from './AudioPlayer';
import { FolderOpen, Code, BookOpen, Terminal as TerminalIcon } from 'lucide-react';

export const Desktop = () => {
  const [windows, setWindows] = useState([]);
  const [nextZIndex, setNextZIndex] = useState(100);
  const [showStartMenu, setShowStartMenu] = useState(false);

  const openWindow = (id, title, icon, content) => {
    const existingWindow = windows.find(w => w.id === id);
    
    if (existingWindow) {
      bringToFront(id);
      return;
    }

    const newWindow = {
      id,
      title,
      icon,
      content,
      position: { x: 100 + windows.length * 30, y: 80 + windows.length * 30 },
      size: { width: 700, height: 500 },
      zIndex: nextZIndex,
      minimized: false
    };

    setWindows([...windows, newWindow]);
    setNextZIndex(nextZIndex + 1);
  };

  const closeWindow = (id) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  const minimizeWindow = (id) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, minimized: true } : w
    ));
  };

  const restoreWindow = (id) => {
    const window = windows.find(w => w.id === id);
    if (window) {
      setWindows(windows.map(w => 
        w.id === id ? { ...w, minimized: false, zIndex: nextZIndex } : w
      ));
      setNextZIndex(nextZIndex + 1);
    }
  };

  const bringToFront = (id) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, zIndex: nextZIndex } : w
    ));
    setNextZIndex(nextZIndex + 1);
  };

  const updateWindowPosition = (id, position) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, position } : w
    ));
  };

  const updateWindowSize = (id, size) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, size } : w
    ));
  };

  const desktopIcons = [
    {
      id: 'my-library',
      label: 'My Library',
      icon: <FolderOpen className="w-8 h-8" />,
      onClick: () => openWindow('my-library', 'My Library', <FolderOpen className="w-4 h-4" />, <MyLibrary />)
    },
    {
      id: 'skills',
      label: 'Skills',
      icon: <Code className="w-8 h-8" />,
      onClick: () => openWindow('skills', 'Skills', <Code className="w-4 h-4" />, <Skills />)
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: <BookOpen className="w-8 h-8" />,
      onClick: () => openWindow('projects', 'Projects', <BookOpen className="w-4 h-4" />, <Projects />)
    },
    {
      id: 'terminal',
      label: 'Terminal',
      icon: <TerminalIcon className="w-8 h-8" />,
      onClick: () => openWindow('terminal', 'Terminal', <TerminalIcon className="w-4 h-4" />, <Terminal />)
    }
  ];

  useEffect(() => {
    const handleClickOutside = () => {
      setShowStartMenu(false);
    };

    if (showStartMenu) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showStartMenu]);

  return (
    <div className="desktop-bg w-screen h-screen overflow-hidden relative">
      {/* Matrix Rain Effect (subtle) */}
      <div className="matrix-rain" />

      {/* Desktop Icons */}
      <div className="absolute top-8 left-8 flex flex-col gap-6 z-10">
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            label={icon.label}
            icon={icon.icon}
            onClick={icon.onClick}
          />
        ))}
      </div>

      {/* Windows */}
      {windows.map((window) => (
        !window.minimized && (
          <Window
            key={window.id}
            id={window.id}
            title={window.title}
            icon={window.icon}
            position={window.position}
            size={window.size}
            zIndex={window.zIndex}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            onFocus={() => bringToFront(window.id)}
            onPositionChange={(pos) => updateWindowPosition(window.id, pos)}
            onSizeChange={(size) => updateWindowSize(window.id, size)}
          >
            {window.content}
          </Window>
        )
      ))}

      {/* Start Menu */}
      {showStartMenu && (
        <StartMenu
          onOpenWindow={openWindow}
          onClose={() => setShowStartMenu(false)}
        />
      )}

      {/* Audio Player */}
      <AudioPlayer />

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        onWindowClick={restoreWindow}
        onStartClick={(e) => {
          e.stopPropagation();
          setShowStartMenu(!showStartMenu);
        }}
      />
    </div>
  );
};

export default Desktop;
