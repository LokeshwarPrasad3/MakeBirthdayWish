import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const CandleInteraction = () => {
  const [isBlown, setIsBlown] = useState(false);
  // eslint-disable-next-line 
  const [blowThreshold, setBlowThreshold] = useState(0.1);
  const audioContextRef = useRef(null);
  const analyzerRef = useRef(null);
  const dataArrayRef = useRef(null);
  const sourceRef = useRef(null);
  const streamRef = useRef(null);
  const candleRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    initAudio();
    ambientMovement();
  }, []);

  const initAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });

      streamRef.current = stream;
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      analyzerRef.current = audioContextRef.current.createAnalyser();
      sourceRef.current.connect(analyzerRef.current);
      analyzerRef.current.fftSize = 2048;
      analyzerRef.current.smoothingTimeConstant = 0.8;

      dataArrayRef.current = new Uint8Array(analyzerRef.current.frequencyBinCount);
      checkAudioLevel();
    } catch (err) {
      console.error("Microphone access denied:", err);
    }
  };

  const checkAudioLevel = () => {
    if (!analyzerRef.current || !dataArrayRef.current) return;

    analyzerRef.current.getByteFrequencyData(dataArrayRef.current);
    const average = dataArrayRef.current.reduce((a, b) => a + b) / dataArrayRef.current.length;
    const normalizedValue = average / 256;

    if (normalizedValue > blowThreshold * 0.8 && !isBlown) {
      candleRef.current.classList.add("wind-effect");
      setTimeout(() => {
        extinguishCandle();
        candleRef.current.classList.remove("wind-effect");
      }, 300);
    }

    requestAnimationFrame(checkAudioLevel);
  };

  const extinguishCandle = () => {
    setIsBlown(true);
    candleRef.current.classList.add("extinguished");
    setTimeout(() => {
      navigate("/birthday");
    }, 3000);
  };

const ambientMovement = () => {
  const intervalId = setInterval(() => {
    if (!isBlown) {
      const flame = document.querySelector(".flame");
      const innerFlame = document.querySelector(".inner-flame");
      
      if (flame && innerFlame) {
        const randomX = (Math.random() - 0.5) * 2;
        const randomScale = 0.95 + Math.random() * 0.1;
        
        flame.style.transform = `rotate(${randomX}deg) scaleY(${randomScale})`;
        innerFlame.style.transform = `translateX(10%) rotate(${-randomX}deg) scaleY(${randomScale + 0.05})`;
      }
    }
  }, 100);

  // Cleanup interval on component unmount
  return () => clearInterval(intervalId);
};

  return (
    <div className="container">
      {/* <h1>Blow to Extinguish the Candle</h1> */}
      <div className="candle" ref={candleRef}>
        <div className="flame-wrapper">
          <div className="flame">
            <div className="inner-flame"></div>
            <div className="glow"></div>
          </div>
          <div className="smoke-container">
            <div className="smoke smoke1"></div>
            <div className="smoke smoke2"></div>
            <div className="smoke smoke3"></div>
          </div>
        </div>
        <div className="wick"></div>
        <div className="wax"></div>
        <div className="drip drip1"></div>
        <div className="drip drip2"></div>
      </div>
      <p className="instruction">🎤 Allow microphone access and blow to interact</p>
      {/* <div className="sensitivity-control">
        <label htmlFor="sensitivity">Microphone Sensitivity:</label>
        <input
          type="range"
          id="sensitivity"
          min="0.05"
          max="0.3"
          step="0.01"
          value={blowThreshold}
          onChange={(e) => setBlowThreshold(parseFloat(e.target.value))}
        />
      </div> */}
    </div>
  );
};

export default CandleInteraction;
