'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

const messages = [
  'Click me!',
  'I was so lucky to meet you',
  'And day by day... I only fall more in love with you',
  "It's the only thing that actually excites me to grow older",
  'I love you baby ❤️'
];

const finalMessage = "Buuuut.. do you love me?";
const secondMessage = "Whaaaat really??? You don't love me?";
const thirdMessage = "Come on, say you love me!";

interface TrailHeart {
  id: number;
  x: number;
  y: number;
}

interface BackgroundHeart {
  id: number;
  x: number;
  duration: number;
  delay: number;
}

function generateInitialHearts(): BackgroundHeart[] {
  const hearts: BackgroundHeart[] = [];
  let bgId = 0;
  for (let i = 0; i < 15; i++) {
    const duration = Math.random() * 5 + 8;
    hearts.push({
      id: bgId++,
      x: Math.random() * 100,
      duration: duration,
      delay: Math.random() * duration
    });
  }
  return hearts;
}

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showSecondQuestion, setShowSecondQuestion] = useState(false);
  const [showThirdQuestion, setShowThirdQuestion] = useState(false);
  const [showYesResponse, setShowYesResponse] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [trailHearts, setTrailHearts] = useState<TrailHeart[]>([]);
  const [backgroundHearts, setBackgroundHearts] = useState<BackgroundHeart[]>(generateInitialHearts);
  const trailIdRef = useRef(0);
  const bgIdRef = useRef(15);

  useEffect(() => {
    const interval = setInterval(() => {
      const duration = Math.random() * 5 + 8;
      setBackgroundHearts(prev => [
        ...prev,
        {
          id: bgIdRef.current++,
          x: Math.random() * 100,
          duration: duration,
          delay: 0
        }
      ].slice(-30));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let lastX = 0, lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });

      if (Math.abs(e.clientX - lastX) > 10 || Math.abs(e.clientY - lastY) > 10) {
        setTrailHearts(prev => [
          ...prev.slice(-20),
          { id: trailIdRef.current++, x: e.clientX, y: e.clientY }
        ]);
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (trailHearts.length > 0) {
      const timeout = setTimeout(() => {
        setTrailHearts(prev => prev.slice(1));
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [trailHearts]);

  const handleNoClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (showSecondQuestion) {
      setShowThirdQuestion(true);
    } else {
      setShowSecondQuestion(true);
    }
  }, [showSecondQuestion]);

  const handleYesClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setShowQuestion(false);
    setShowSecondQuestion(false);
    setShowThirdQuestion(false);
    setShowYesResponse(true);
  }, []);

  const handleClick = useCallback(() => {
    if (isFading) return;

    if (currentIndex >= messages.length - 1 && !showQuestion) {
      setShowQuestion(true);
      return;
    }

    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setIsFading(false);
    }, 500);
  }, [currentIndex, isFading, showQuestion]);

  return (
    <>
      {backgroundHearts.map(heart => (
        <div
          key={heart.id}
          className="backgroundHeart"
          style={{
            left: `${heart.x}vw`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`
          }}
        >
          💕
        </div>
      ))}

      {trailHearts.map(heart => (
        <div
          key={heart.id}
          className="trailHeart"
          style={{
            left: heart.x,
            top: heart.y
          }}
        >
          💕
        </div>
      ))}

      <div
        className="cursorHeart"
        style={{
          left: cursorPos.x - 12,
          top: cursorPos.y - 12
        }}
      >
        💕
      </div>

      <div className="container" onClick={handleClick}>
        {showYesResponse ? (
          <div className="yes-response">
            <h1 className="love-text">I LOVE YOU TOOOOOOOOOOOOOOOOOOOOOO</h1>
            <img src="/i-love-you-wow.gif" alt="I Love You Wow" className="yes-gif" />
          </div>
        ) : !showQuestion ? (
          <h1
            className={`message ${isFading ? 'fade-out' : 'fade-in'}`}
            style={{ opacity: isFading ? 0 : 1 }}
          >
            {messages[currentIndex]}
          </h1>
        ) : showThirdQuestion ? (
          <div className="question-container">
            <h1 className="question">{thirdMessage}</h1>
            <div className="buttons">
              <button className="yes-btn" onClick={handleYesClick}>Yes</button>
              <button className="no-btn" onClick={(e) => e.stopPropagation()}>No</button>
            </div>
            <img src="/penguin-gas.gif" alt="Penguin Gas" className="penguin-gif" />
          </div>
        ) : showSecondQuestion ? (
          <div className="question-container">
            <h1 className="question">{secondMessage}</h1>
            <div className="buttons">
              <button className="yes-btn" onClick={handleYesClick}>Yes</button>
              <button className="no-btn" onClick={handleNoClick}>No</button>
            </div>
            <img src="/scared-oh-no.gif" alt="Scared Oh No" className="penguin-gif" />
          </div>
        ) : (
          <div className="question-container">
            <h1 className="question">{finalMessage}</h1>
            <div className="buttons">
              <button className="yes-btn" onClick={handleYesClick}>Yes</button>
              <button className="no-btn" onClick={handleNoClick}>No</button>
            </div>
            <img src="/i-love-you-flirt.gif" alt="I Love You Flirt" className="penguin-gif" />
          </div>
        )}
      </div>
    </>
  );
}