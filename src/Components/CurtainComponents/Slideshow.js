import React from 'react';
import { Plane, useCurtains } from 'react-curtains';
import gsap from 'gsap';
import { vertexShader, fragmentShader } from './Shader';

import LandingPageContent from '../LandingPage/LandingPageContent';

import '../../Assets/styles/curtainStyle.css';

import { useSpring, animated } from 'react-spring'

import landing_image_1 from '../../Assets/pictures/LandingPage/landing_image_1.png';
import landing_image_2 from '../../Assets/pictures/LandingPage/landing_image_2.png';
import landing_image_3 from '../../Assets/pictures/LandingPage/landing_image_3.png';

const Slideshow = (props) => {
    const [plane, setPlane] = React.useState(null);

    const slideshowInner = React.useRef(null);

    // slideshow states
    const [activeTexture, setActiveTexture] = React.useState(1);
    const [activeRadio, setActiveRadio] = React.useState(1);
    const [cycleIndex, setCycleIndex] = React.useState(2);
    const [maxTextures, setMaxTextures] = React.useState(0);

    // regs
    const isChanging = React.useRef(false);
    const tween = React.useRef(null);
    const activeTex = React.useRef(null);
    const nextTex = React.useRef(null);

    React.useEffect(() => {
        if (slideshowInner.current) {
            setMaxTextures(slideshowInner.current.childElementCount);
        }

        let currentTween = tween.current;
        return () => {
            if (currentTween) {
                currentTween.kill();
            }
        };
    }, []);

    const uniforms = {
        transitionTimer: {
            name: "uTransitionTimer",
            type: "1f",
            value: 0
        }
    };

    const onLoading = (plane, texture) => {
        // improve texture rendering on small screens with LINEAR_MIPMAP_NEAREST minFilter
        texture.setMinFilter(texture.gl.LINEAR_MIPMAP_NEAREST);
    };

    const onReady = (plane) => {
        setPlane(plane);
    };

    const handleRadioClick = (index) => {
        if (!isChanging.current && plane && index !== activeTexture) {
            isChanging.current = true;
            // check what will be next image
            let nextTextureIndex;
            if (index < maxTextures) {
                nextTextureIndex = index;
                setActiveRadio(nextTextureIndex);
            } else {
                nextTextureIndex = 1;
                setActiveRadio(nextTextureIndex)
            }
            // apply it to our next texture
            nextTex.current.setSource(plane.images[nextTextureIndex]);
            tween.current = gsap.to(plane.uniforms.transitionTimer, {
                duration: 1.25,
                value: 90,
                ease: "power2.inOut",
                onComplete: () => {
                    isChanging.current = false;
                    tween.current = null;

                    plane.uniforms.transitionTimer.value = 0;

                    const activeTextureIndex = nextTextureIndex;
                    // our next texture becomes our active texture
                    activeTex.current.setSource(plane.images[activeTextureIndex]);
                    setActiveTexture(activeTextureIndex);
                }
            });
        }
    };

    React.useEffect(() => {
        const timer = window.setInterval(() => {
            handleRadioClick(cycleIndex);
            switch (cycleIndex){
                case 1: {
                    setCycleIndex(2);
                    break;
                }
                case 2: {
                    setCycleIndex(3);
                    break;
                }
                case 3: {
                    setCycleIndex(1);
                    break;
                }
            }
            
        }, 10000);
        return () => {
            window.clearInterval(timer);
        };
    }, [isChanging, plane, cycleIndex])

    useCurtains(
        (curtains) => {
            if (plane) {
                // first we set our very first image as the active texture
                activeTex.current = plane.createTexture({
                    sampler: "activeTex",
                    fromTexture: plane.textures[activeTexture]
                });
                // next we set the second image as next texture but this is not mandatory
                // as we will reset the next texture on slide change
                nextTex.current = plane.createTexture({
                    sampler: "nextTex",
                    fromTexture: plane.textures[activeTexture + 1]
                });
            }
        },
        [plane]
    );

    //onChange={handleChange}
    const springFirst = useSpring({
        to: { transform: activeRadio === 1 ? `scale(1.1)` : `scale(0)` },
        from: { transform: `scale(0)`, background: "#FFF", margin: "0px", border: "1px", boxShadow: "none" },
    })

    const springSecond = useSpring({
        to: { transform: activeRadio === 2 ? `scale(1.1)` : `scale(0)` },
        from: { transform: `scale(0)`, background: "#FFF", margin: "0px", border: "1px", boxShadow: "none" },
    })

    const springThird = useSpring({
        to: { transform: activeRadio === 3 ? `scale(1.1)` : `scale(0)` },
        from: { transform: `scale(0)`, background: "#FFF", margin: "0px", border: "1px", boxShadow: "none" },
    })



    return (
        <Plane
            className="Slideshow"
            // plane init parameters
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={uniforms}
            // plane events
            onLoading={onLoading}
            onReady={onReady}
        >
            <LandingPageContent
                size={props.size}
            />
            <div style={{ position: "absolute", bottom: `${37 / 1080 * props.size[1]}px`, height: "17px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div className="radio-btn" onClick={() => handleRadioClick(1)}>
                    <animated.div style={springFirst} className="radio-btn" />
                </div>
                <div className="radio-btn" onClick={() => handleRadioClick(2)}>
                    <animated.div style={springSecond} className="radio-btn" />
                </div>
                <div className="radio-btn" onClick={() => handleRadioClick(3)}>
                    <animated.div style={springThird} className="radio-btn" />
                </div>
            </div>
            <div ref={slideshowInner}>
                <img
                    src="https://www.curtainsjs.com/examples/medias/displacement.jpg"
                    data-sampler="displacement"
                    alt=""
                />
                <img src={landing_image_1} alt="" />
                <img src={landing_image_2} alt="" />
                <img src={landing_image_3} alt="" />
            </div>
        </Plane>
    );
}

export default React.memo(Slideshow);