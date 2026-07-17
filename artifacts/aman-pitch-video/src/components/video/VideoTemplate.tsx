import React, { useEffect, useRef } from 'react';
import { useVideoPlayer } from '@/lib/video';
import { AnimatePresence, motion } from 'framer-motion';

import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';

export const SCENE_DURATIONS: Record<string, number> = {
  problem: 8000,
  solution: 8000,
  how_it_works: 12000,
  impact: 8000,
  close: 8000,
};

const SCENE_COMPONENTS: Record<string, React.ComponentType> = {
  problem: Scene1,
  solution: Scene2,
  how_it_works: Scene3,
  impact: Scene4,
  close: Scene5,
};

const SCENE_START_SEC: Record<string, number> = (() => {
  const out: Record<string, number> = {};
  let cumulativeMs = 0;
  for (const [key, ms] of Object.entries(SCENE_DURATIONS)) {
    out[key] = cumulativeMs / 1000;
    cumulativeMs += ms;
  }
  return out;
})();

const AUDIO_SEEK_EPSILON_SEC = 0.18;

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  muted = false,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  muted?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentScene, currentSceneKey } = useVideoPlayer({ durations, loop });

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '');
  const sceneIndex = Object.keys(SCENE_DURATIONS).indexOf(baseSceneKey);
  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.45;
    const targetTime = SCENE_START_SEC[baseSceneKey] ?? 0;
    if (Math.abs(audio.currentTime - targetTime) > AUDIO_SEEK_EPSILON_SEC) {
      audio.currentTime = targetTime;
    }
    audio.play().catch(() => {});
  }, [currentSceneKey, baseSceneKey, muted]);

  return (
    <>
      <div
        className="w-full h-screen overflow-hidden relative"
        style={{ backgroundColor: 'var(--brand-primary)' }}
        dir="rtl"
      >
        <GlobalBackground currentScene={sceneIndex} />

        <AnimatePresence mode="sync">
          {SceneComponent && <SceneComponent key={currentSceneKey} />}
        </AnimatePresence>
      </div>

      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}audio/bg_music.mp3`}
        preload="auto"
        autoPlay
        muted={muted}
      />
    </>
  );
}

function GlobalBackground({ currentScene }: { currentScene: number }) {
  const isS1 = currentScene === 0;
  const isS2 = currentScene === 1;
  const isS3 = currentScene === 2;
  const isS4 = currentScene === 3;

  return (
    <>
      <motion.img
        src={`${import.meta.env.BASE_URL}images/bg-tech.png`}
        className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen"
        animate={{
          scale: isS1 ? 1.1 : isS2 ? 1.05 : isS3 ? 1.15 : isS4 ? 1.0 : 1.1,
          x: isS1 ? '-2vw' : isS2 ? '0vw' : isS3 ? '2vw' : isS4 ? '0vw' : '-2vw',
          y: isS1 ? '2vh' : isS2 ? '0vh' : isS3 ? '-2vh' : isS4 ? '2vh' : '0vh',
          filter: isS1 ? 'hue-rotate(-40deg) saturate(1.5)' : 'hue-rotate(0deg) saturate(1)',
        }}
        transition={{ duration: 10, ease: 'linear' }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-[#02141E] via-transparent to-[#002134]"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Global Shield */}
      <motion.div
        className="absolute top-[50%] left-[50%]"
        initial={{ opacity: 0, scale: 0, x: '-50%', y: '-50%' }}
        animate={{
          opacity: isS1 ? 0 : currentScene === 4 ? 0 : 0.8,
          scale: isS1 ? 0.5 : isS2 ? 1 : isS3 ? 0.7 : isS4 ? 1.2 : 0,
          x: `calc(-50% + ${isS1 ? '0vw' : isS2 ? '-20vw' : isS3 ? '25vw' : isS4 ? '0vw' : '0vw'})`,
          y: `calc(-50% + ${isS1 ? '0vh' : isS2 ? '0vh' : isS3 ? '10vh' : isS4 ? '-5vh' : '0vh'})`,
          rotate: isS3 ? 15 : 0,
        }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/bg-shield.png`}
          className="w-[80vh] h-[80vh] object-contain mix-blend-screen"
        />
      </motion.div>
    </>
  );
}
