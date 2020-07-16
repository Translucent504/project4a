import React, { useRef, useState } from 'react';
import useWebAnimations from "@wellyshen/use-web-animations";
import Bird from './Bird'

import sonic from './images/slow.png'
import latest from './images/latest.png'
import idle from './images/idle.png'
import bg1 from './images/bg1.png'

const containerStyle = {
  position: 'absolute',
  top: '580px',
  left: '50px',
  width: '90px',
  height: '91px',
  overflow: 'hidden',
  cursor: 'pointer'
}

const birdContainerStyle = {
  position: 'absolute',
  top: '-20px',
  left: '50px',
  width: '170px',
  height: '200px',
  overflow: 'hidden',
  cursor: 'pointer',
}

const App = () => {
  const [currentImg, setCurrentImg] = useState(idle)
  const containerRef = useRef();

  const containerObj = useWebAnimations({
    ref: containerRef,
    autoPlay: false,
    keyframes: {
      transform: ["translateX(100vw)"],
    },
    timing: {
      delay: 0,
      duration: 5000,
      iterations: Infinity,
      direction: "normal",
    }
  })

  const birdContainerObj = useWebAnimations({
    keyframes: {
      transform: ["translateX(100vw)"],
    },
    timing: {
      delay: 0,
      duration: 5000,
      iterations: Infinity,
      direction: "normal",
    }
  })

  const sonicObj = useWebAnimations({
    keyframes: {
      transform: ["translateX(-100%)"], // Move by 500px
      // Go through three colors
    },
    timing: {
      delay: 100, // Start with a 500ms delay
      duration: 800, // Run for 1000ms
      iterations: Infinity, // Repeat once
      direction: "alternate", // Run the animation forwards and then backwards
      easing: "steps(15,end)", //steps(9,end)
    }
  })

  const speedUp = () => {
    const sonicAnimation = sonicObj.getAnimation()
    const containerAnimation = containerObj.getAnimation()

    if (containerAnimation.playState === 'paused') {
      if (containerAnimation.playbackRate <= 2) {
        setCurrentImg(sonic)
        sonicAnimation.cancel()
        sonicObj.animate({
          keyframes: {
            transform: ["translateX(-100%)"],
          },
          timing: {
            delay: 0,
            duration: 800,
            iterations: Infinity,
            direction: "normal",
            easing: "steps(9,end)",
          }
        })
      }

      containerAnimation.play()
    }

    //sonicAnimation.updatePlaybackRate(sonicAnimation.playbackRate * 1.5)
    containerAnimation.updatePlaybackRate(containerAnimation.playbackRate * 1.1)

    if (containerAnimation.playbackRate > 2) {
      if (currentImg !== latest) {
        setCurrentImg(latest)
      }
      sonicAnimation.cancel()
      sonicObj.animate({
        keyframes: {
          transform: ["translateX(-100%)"],
        },
        timing: {
          delay: 0,
          duration: 800,
          iterations: Infinity,
          direction: "normal",
          easing: "steps(14,end)",
        }
      })
      console.log(sonicObj.getAnimation())

    }
  }

  const slowDown = () => {
    const sonicAnimation = sonicObj.getAnimation()
    const containerAnimation = containerObj.getAnimation()
    if (sonicAnimation.playbackRate >= 1) {
      sonicAnimation.updatePlaybackRate(sonicAnimation.playbackRate * 0.9)
    }
    if (containerAnimation.playbackRate >= 1) {
      containerAnimation.updatePlaybackRate(containerAnimation.playbackRate * 0.8)
    }
    if (containerAnimation.playbackRate <= 2) {
      setCurrentImg(sonic)
      sonicAnimation.cancel()
      sonicObj.animate({
        keyframes: {
          transform: ["translateX(-100%)"],
        },
        timing: {
          delay: 0,
          duration: 800,
          iterations: Infinity,
          direction: "normal",
          easing: "steps(9,end)",
        }
      })
    }
  }

  setInterval(() => {
    try {
      if (containerObj.getAnimation().playState !== 'paused') {
        slowDown()
      }
    } catch (e) {
      console.log(`There are no errors here, stop looking`)
    }
  }, 8000);


  return (
    <div style={{ width: '100vw', height: '100vh', backgroundImage: `url(${bg1})` }}>
      <div ref={containerRef} style={containerStyle}>
        <img ref={sonicObj.ref} src={currentImg} alt="" />
      </div>
      <button style={{ transform:'scale(2)',position: 'absolute', left: '50%', top: '100px' }} onClick={speedUp}>Sonic Speed Up</button>

      <div ref={birdContainerObj.ref} style={birdContainerStyle}>
        <Bird />
      </div>

    </div>
  );
}

export default App;
