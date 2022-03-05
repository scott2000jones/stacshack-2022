import React, { useEffect, useRef } from 'react'

export default function LocalStream({ userMedia }) {
  const videoRef = useRef()

  const setStream = (stream) => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream
    }
  }

  const handleCanPlay = () => {
    videoRef.current.play()
  }

  useEffect(() => {
    if (userMedia) setStream(userMedia)
  }, [userMedia])

  return (
    <div>
      <video
        style={{ width: 300, height: 300, position: 'absolute', top: 30 }}
        onContextMenu={(event) => event.preventDefault()}
        ref={videoRef}
        onCanPlay={handleCanPlay}
        autoPlay
        playsInline
        muted
      />
    </div>
  )
}