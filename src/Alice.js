import React, { useEffect } from 'react'
import useWebAnimations from '@wellyshen/use-web-animations'
import './Alice.css'
import spriteRunningAliceQueenSmall from './images/sprite_running-alice-queen_small.png'
import palm3Small from './images/palm3_small.png'
import bushSmall from './images/bush_small.png'
import wRookUprightSmall from './images/w_rook_upright_small.png'
import rPawnUprightSmall from './images/r_pawn_upright_small.png'
import wRookSmall from './images/w_rook_small.png'
import palm1Small from './images/palm1_small.png'
import rPawnSmall from './images/r_pawn_small.png'
import rKnightSmall from './images/r_knight_small.png'
import palm2Small from './images/palm2_small.png'


const Alice = () => {
    /* Background animations */
    var sceneryFrames = [
        { transform: 'translateX(100%)' },
        { transform: 'translateX(-100%)' }
    ];

    var sceneryTimingBackground = {
        duration: 36000,
        iterations: Infinity
    };

    var sceneryTimingForeground = {
        duration: 12000,
        iterations: Infinity
    };

    const { ref: background1, getAnimation: background1Movement } = useWebAnimations({
        keyframes: sceneryFrames,
        timing: sceneryTimingBackground
    })

    const { ref: background2, getAnimation: background2Movement } = useWebAnimations({
        keyframes: sceneryFrames,
        timing: {
            ...sceneryTimingBackground,
            iterationStart: 0.5
        }
    })

    const { ref: foreground1, getAnimation: foreground1Movement } = useWebAnimations({
        keyframes: sceneryFrames,
        timing: {
            ...sceneryTimingForeground,
            iterationStart: 0.5
        }
    })

    const { ref: foreground2, getAnimation: foreground2Movement } = useWebAnimations({
        keyframes: sceneryFrames,
        timing: sceneryTimingForeground
    })

    var spriteFrames = [
        { transform: 'translateY(0)' },
        { transform: 'translateY(-100%)' }
    ];

    const { ref: redQueenAliceSprite, getAnimation: redQueenAlice } = useWebAnimations({
        keyframes: spriteFrames,
        timing: {
            easing: 'steps(7, end)',
            direction: "reverse",
            duration: 600,
            playbackRate: 1,
            iterations: Infinity
        }
    })
    /* Alice tires so easily! 
      Every so many seconds, reduce their playback rate so they slow a little. 
    */



    /* If Alice and the Red Queen are running at a speed of 1, the background doesn't move. */
    /* But if they fall under 1, the background slides backwards */

    useEffect(() => {
        var adjustBackgroundPlayback = function () {
            var sceneries = [foreground1Movement(), foreground2Movement(), background1Movement(), background2Movement()];
            try {
                if (redQueenAlice().playbackRate < .8) {
                    sceneries.forEach(function (anim) {
                        anim.playbackRate = redQueenAlice().playbackRate / 2 * -1;
                    });
                } else if (redQueenAlice().playbackRate > 1.2) {
                    sceneries.forEach(function (anim) {
                        anim.playbackRate = redQueenAlice().playbackRate / 2;
                    });
                } else {
                    sceneries.forEach(function (anim) {
                        anim.playbackRate = 0;
                    });
                }
            }
            catch (error) {
                console.log("No errors here buddy :)")
            }
        }
        var goFaster = function () {
            redQueenAlice().playbackRate *= 1.1;
            adjustBackgroundPlayback();
        }
        setInterval(function () {
            /* Set decay */
            if (redQueenAlice().playbackRate > .4) {
                redQueenAlice().playbackRate *= .9;
            }
            adjustBackgroundPlayback();
        }, 3000);
        document.addEventListener("click", goFaster);
        document.addEventListener("touchstart", goFaster);
    }, [background1Movement, background2Movement, foreground1Movement, foreground2Movement, redQueenAlice])




    return (
        <div className="wrapper">
            <div className="sky">
            </div>
            <div className="earth">
                <div id="red-queen_and_alice">
                    <img ref={redQueenAliceSprite} id="red-queen_and_alice_sprite" src={spriteRunningAliceQueenSmall} alt="Alice and the Red Queen running to stay in place." />
                </div>
            </div>

            <div className="scenery" id="foreground1" ref={foreground1}>
                <img id="palm3" src={palm3Small} alt=" " />
            </div>
            <div className="scenery" id="foreground2" ref={foreground2}>
                <img id="bush" src={bushSmall} alt=" " />
                <img id="w_rook_upright" src={wRookUprightSmall} alt=" " />
            </div>
            <div className="scenery" id="background1" ref={background1}>
                <img id="r_pawn_upright" src={rPawnUprightSmall} alt=" " />
                <img id="w_rook" src={wRookSmall} alt=" " />
                <img id="palm1" src={palm1Small} alt=" " />
            </div>
            <div className="scenery" id="background2" ref={background2}>
                <img id="r_pawn" src={rPawnSmall} alt=" " />

                <img id="r_knight" src={rKnightSmall} alt=" " />
                <img id="palm2" src={palm2Small} alt=" " />
            </div>
        </div>
    )
}

export default Alice
