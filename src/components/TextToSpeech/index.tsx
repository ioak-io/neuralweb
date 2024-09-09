import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonVariantType, IconButton, ThemeType } from "basicui";
import React, { useState, useRef, useEffect, ChangeEvent } from "react";

interface Props {
  text: string;
}

const TextToSpeech = (props: Props) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [rate, setRate] = useState<number>(1);
  const [volume, setVolume] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(
    null
  );

  const startSpeaking = () => {
    if (utterance) {
      speechSynthesis.cancel();
    }
    const newUtterance = new SpeechSynthesisUtterance(props.text);
    newUtterance.rate = rate;
    newUtterance.volume = volume;
    newUtterance.onstart = () => {
      setIsPlaying(true);
    };
    newUtterance.onend = () => {
      setIsPlaying(false);
      setProgress(0);
    };
    setUtterance(newUtterance);
    speechSynthesis.speak(newUtterance);
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
    setProgress(0);
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    // Seeking is not supported with SpeechSynthesisUtterance
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      speechSynthesis.cancel();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      speechSynthesis.cancel();
    };
  }, []);

  return (
    <div>
      {isPlaying && (
        <IconButton
          onClick={stopSpeaking}
          circle
          variant={ButtonVariantType.fill}
          theme={ThemeType.default}
        >
          <FontAwesomeIcon icon={faStop} />
        </IconButton>
      )}
      {!isPlaying && (
        <IconButton
          onClick={startSpeaking}
          circle
          variant={ButtonVariantType.fill}
          theme={ThemeType.default}
        >
          <FontAwesomeIcon icon={faPlay} />
        </IconButton>
      )}
      {/* <label>
        Rate:
        <input
          type="range"
          min="0.1"
          max="2"
          step="0.1"
          value={rate}
          onChange={(e) => setRate(parseFloat(e.target.value))}
        />
        {rate}
      </label>
      <br />
      <label>
        Volume:
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
        />
        {volume}
      </label>
      <br />
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={progress}
        onChange={handleSeek}
        disabled={!isPlaying}
      />
      {Math.round(progress * 100)}% */}
    </div>
  );
};

export default TextToSpeech;
