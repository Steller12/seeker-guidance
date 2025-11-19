import { useEffect, useState } from 'react'

import { useSpeechCapture } from '../hooks/useSpeechCapture'
import type { AnswerMode } from '../types/profile'

interface AnswerInputProps {
  disabled?: boolean
  onSubmit: (text: string, mode: AnswerMode) => void
}

export const AnswerInput = ({ disabled, onSubmit }: AnswerInputProps) => {
  const [text, setText] = useState('')
  const {
    isSupported,
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
  } = useSpeechCapture()

  useEffect(() => {
    if (isListening) {
      setText(transcript)
    }
  }, [isListening, transcript])

  const handleMic = () => {
    if (disabled) return
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  const handleSubmit = () => {
    if (!text.trim()) return
    const mode: AnswerMode = isListening ? 'voice' : 'text'
    onSubmit(text, mode)
    setText('')
    if (isListening) {
      stopListening()
    }
  }

  return (
    <div className="answer-input">
      <div className="input-shell">
        <textarea
          className="search-field"
          placeholder={
            isListening
              ? 'Listening... describe your answer.'
              : 'Type your answer or tap the mic to speak.'
          }
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={3}
          disabled={disabled && !isListening}
        />
        <button
          type="button"
          className={`mic-button ${isListening ? 'active' : ''}`}
          onClick={handleMic}
          disabled={disabled || !isSupported}
        >
          {isListening ? '●' : '🎙'}
        </button>
      </div>
      {!isSupported && (
        <p className="hint">Speech input is unavailable on this browser. Please type.</p>
      )}
      {error && <p className="hint">{error}</p>}
      <button className="primary" onClick={handleSubmit} disabled={disabled}>
        Send answer
      </button>
    </div>
  )
}


