import React, { useState, useRef, useEffect } from 'react';
import { X, Music, CheckCheck, VolumeX } from 'lucide-react';

const ChooseMusicsModal = ({ musics, isOpen, onClose, onSet }) => {
  const [currentMusic, setCurrentMusic] = useState(null);
  const audioRef = useRef(null);
  const modalRef = useRef(null);

  const handlePlay = (music) => {
    setCurrentMusic(music);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const audio = new Audio(music.url);
    audioRef.current = audio;
    audio.play();
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  };

  const handleSet = () => {
    if (currentMusic) {
      onSet(currentMusic);
    }
    stopAudio();
    onClose();
  };

  // Close modal on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        stopAudio();
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-2 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="w-full sm:p-1 max-w-xl rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 border border-purple-500/20 relative"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            stopAudio();
            onClose();
          }}
          className="absolute top-4 right-4 cursor-pointer z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm border border-white/10"
        >
          <X className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
        </button>

        {/* Header */}
        <div className="p-4 sm:p-6 pb-4">
          <div className="flex items-center justify-start sm:justify-center gap-3 mb-2 h-fit">
            <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
              <Music className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
            </div>
            <p className="text-xl sm:text-2xl !bg-gradient-to-r from-purple-500 to-pink-500 !bg-clip-text !text-transparent font-bold">
              Choose Your Music
            </p>
          </div>
        </div>

        {/* Music List */}
        <div className="p-4 sm:p-6 pb-4 !pt-0">
          <div className="space-y-3 max-h-[60vh] overflow-y-auto sm:pr-2 scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-transparent">
            {musics.map((music) => (
              <div
                key={music.id}
                onClick={() => handlePlay(music)}
                className={`flex items-center relative justify-between gap-4 p-2 rounded-xl cursor-pointer transition-all duration-300 border backdrop-blur-sm ${
                  currentMusic?.id === music.id
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/50 shadow-lg shadow-purple-500/20'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-300/30'
                }`}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="relative">
                    <img
                      src={music.cover}
                      alt={music.name}
                      className="w-10 h-10 object-cover rounded-lg shadow-lg"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg hidden items-center justify-center">
                      {music.name === 'No Music ?' ? (
                        <VolumeX className="w-6 h-6 text-white" />
                      ) : (
                        <Music className="w-6 h-6 text-white" />
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium capitalize text-white text-sm">
                      {music.name}
                    </span>
                    <div className="text-xs text-gray-400">
                      {music.duration}
                    </div>
                  </div>
                </div>
                {currentMusic?.id === music.id && (
                  <div className="absolute right-3">
                    <div className="w-9 h-9 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <CheckCheck className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-7 pb-6 mt-2">
          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                stopAudio();
                onClose();
              }}
              className="px-6 py-1.5 cursor-pointer text-sm rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 text-white font-medium border border-white/20"
            >
              Cancel
            </button>
            <button
              onClick={handleSet}
              disabled={!currentMusic}
              className={`px-6 py-1.5 cursor-pointer text-sm rounded-lg font-medium transition-all duration-200 ${
                currentMusic
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-gray-500 cursor-not-allowed text-gray-300'
              }`}
            >
              Set Music
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseMusicsModal;
