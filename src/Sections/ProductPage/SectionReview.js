import React from 'react';

// Material UI
import { Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import speakers_top from '../../Assets/pictures/Review/small_speakers_top.png';
import speakers_bot from '../../Assets/pictures/Review/small_speakers_bot.png';
import stage from '../../Assets/pictures/Yellow/layer-bg.png';

import { Link } from 'react-router-dom';

import { animated, useTrail, useSpring } from 'react-spring';

import '../../Assets/styles/yellow.css';

import { connect } from 'react-redux';

const Trail0 = ({ open, matches, children, ...props }) => {
    const items = React.Children.toArray(children)
    const trail = useTrail(items.length, {
        config: { mass: 5, tension: 2000, friction: 200 },
        opacity: open ? 1 : 0,
        x: open ? 0 : 20,
        from: { opacity: 0, x: 20 },
    })

    return (
        <div {...props}>
            <div style={{ display: "flex" }}>
                {trail.map(({ x, height, ...rest }, index) => (
                    <animated.div
                        key={items[index].key}
                        style={{ ...rest, transform: x.interpolate((x) => `translate3d(${x}px,0,0)`) }}>
                        <Typography style={{
                            fontSize: matches ? "calc(96px + (110 - 96) * ((100vw - 1024px) / (1600 - 1024)))" :
                                "calc(50px + (50 - 45) * ((100vw - 300px) / (1600 - 300)))",
                            textAlign: "left", fontWeight: "bold", fontStyle: "normal",
                            fontFamily: "'Rajdhani', sans-serif", color: "white", textShadow: "0px 11px 10px rgba(81,67,21,0.4)"
                        }}>{items[index]}</Typography>
                    </animated.div>
                ))}
            </div>
        </div>
    )
}

const SectionReview = (props) => {
    //refs
    const buttonTryRef = React.useRef();

    const matches = useMediaQuery('(min-width:1024px)', { noSsr: true });
    const mdUp = useMediaQuery('(max-width:1366px)', { noSsr: true });
    const smUp = useMediaQuery('(max-width:1280px)', { noSsr: true });
    const xsUp = useMediaQuery('(max-width:1024px)', { noSsr: true });

    // listening to button events
    React.useEffect(() => {
        if (buttonTryRef.current) {
            buttonTryRef.current.onmousemove = function (e) {
                e.target.style.setProperty('--x', e.offsetX + 'px');
                e.target.style.setProperty('--y', e.offsetY + 'px');
            }
        }
    }, [buttonTryRef])

    let buttonSpring = useSpring({
        to: { transform: props.render ? 'translateX(0%)' : 'translateX(100%)' },
        from: { transform: 'translateX(100%)' },
    })

    let textSpring1 = useSpring({
        to: { transform: props.render ? 'translateX(0%)' : 'translateX(-100%)' },
        from: { transform: 'translateX(-100%)' },
        delay: 200
    })

    let textSpring2 = useSpring({
        to: { transform: props.render ? 'translateX(0%)' : 'translateX(-100%)' },
        from: { transform: 'translateX(-100%)' },
        delay: 300
    })

    let textSpring3 = useSpring({
        to: { transform: props.render ? 'translateX(0%)' : 'translateX(-100%)' },
        from: { transform: 'translateX(-100%)' },
        delay: 400
    })

    return (
        matches ?
            <div style={{
                height: "100vh",
                background: "#DC2424",  /* fallback for old browsers */
                background: "-webkit-linear-gradient(to top, #4A569D, #DC2424)",  /* Chrome 10-25, Safari 5.1-6 */
                background: "linear-gradient(to bottom, rgb(154,59,21), rgb(10,48,87)", /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
                display: "flex", alignItems: "center", boxShadow: "rgb(0 0 0 / 56%) 0px 22px 70px 4px"
            }}>
                <div onMouseEnter={() => props.handleExpandCircle(true)} onMouseLeave={() => props.handleExpandCircle(false)} style={{ overflow: "hidden", display: "flex", position: "absolute", top: "8.8%", right: "6.6%" }}>
                    <animated.div style={{ ...buttonSpring, marginBottom: "25%", zoom: smUp ? "0.7" : mdUp ? "0.8" : "1.0" }}>
                        <Link to="/pricing" style={{ textDecoration: "none" }}>
                            <div style={{ display: "flex" }}>
                                <a style={{
                                    width: "248px", height: "62px",
                                }} className="btntry-try-noborder" data-text="TRY IT NOW" />
                            </div>
                        </Link>
                    </animated.div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", position: "absolute", left: `5.5%`, paddingTop: `${200.4 / 1920 * props.size[0]}px` }}>
                    <img alt="right_small_speakers" style={{
                        position: "absolute", width: `${550 / 1920 * props.size[0]}px`,
                        height: `auto`, background: `transparent 0% 0 % no - repeat padding- box`
                    }} src={speakers_top} />
                    <img alt="left_small_speakers" style={{
                        paddingTop: `${260 / 1920 * props.size[0]}px`,
                        marginLeft: `${(150.7 - 54.85) / 1920 * props.size[0]}px`, width: `${570 / 1920 * props.size[0]}px`,
                        height: `auto`, background: `transparent 0% 0 % no - repeat padding- box`
                    }} src={speakers_bot} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", marginLeft: `35%`, width: "50vw", marginTop: "2%" }}>
                    <Trail0 open={props.render} matches={matches} textIndex={0}>
                        <span>R</span>
                        <span>E</span>
                        <span>V</span>
                        <span>I</span>
                        <span>E</span>
                        <span>W</span>
                        <span>S</span>
                    </Trail0>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{ overflow: "hidden" }}>
                            <animated.div style={{ ...textSpring1, display: "flex", flexDirection: "column", paddingTop: `${66 / 1920 * props.size[0]}px`, padding: xsUp ? "0.5rem" : smUp || mdUp ? "1rem" : "3rem", zoom: smUp || mdUp ? "0.85" : "1" }}>
                                <Rating className="rating" name="read-only" size="large" defaultValue={5} readOnly style={{ color: "white" }} />
                                <Typography style={{
                                    fontSize: "calc(24px + (32 - 24) * ((100vw - 1024px) / (1600 - 1024)))", fontWeight: "normal", fontStyle: "normal",
                                    fontFamily: "DINNextLTPro-Medium", color: "white"
                                }}>
                                    ARTIST
                        </Typography>
                                <Typography style={{
                                    fontSize: "calc(16px + (22 - 16) * ((100vw - 1024px) / (1600 - 1024)))", fontWeight: "normal", fontStyle: "normal",
                                    fontFamily: "DINNextLTPro-Medium", color: "white",
                                }}>
                                    “Love it, it’s the Best. I can’t live without it!”
                        </Typography>
                            </animated.div>
                        </div>
                        <div style={{ overflow: "hidden" }}>
                            <animated.div style={{ ...textSpring2, display: "flex", flexDirection: "column", paddingTop: `${66 / 1920 * props.size[0]}px`, padding: xsUp ? "0.5rem" : smUp || mdUp ? "1rem" : "3rem", zoom: smUp || mdUp ? "0.85" : "1" }}>
                                <Rating className="rating" name="read-only" size="large" value={5} readOnly style={{ color: "white" }} />
                                <Typography style={{
                                    fontSize: "calc(24px + (32 - 24) * ((100vw - 1024px) / (1600 - 1024)))", fontWeight: "normal", fontStyle: "normal",
                                    fontFamily: "DINNextLTPro-Medium", color: "white"
                                }}>
                                    PRODUCER
                        </Typography>
                                <Typography style={{
                                    fontSize: "calc(16px + (22 - 16) * ((100vw - 1024px) / (1600 - 1024)))", fontWeight: "normal", fontStyle: "normal",
                                    fontFamily: "DINNextLTPro-Medium", color: "white",
                                }}>
                                    “Love it, it’s the Best. I can’t live without it!”
                        </Typography>
                            </animated.div>
                        </div>
                        <div style={{ overflow: "hidden" }}>
                            <animated.div style={{ ...textSpring3, display: "flex", flexDirection: "column", paddingTop: `${66 / 1920 * props.size[0]}px`, padding: xsUp ? "0.5rem" : smUp || mdUp ? "1rem" : "3rem", zoom: smUp || mdUp ? "0.85" : "1" }}>
                                <Rating className="rating" name="read-only" size="large" value={5} readOnly style={{ color: "white" }} />
                                <Typography style={{
                                    fontSize: "calc(24px + (32 - 24) * ((100vw - 1024px) / (1600 - 1024)))", fontWeight: "normal", fontStyle: "normal",
                                    fontFamily: "DINNextLTPro-Medium", color: "white", letterSpacing: "0"
                                }}>
                                    MUSIC FAN
                        </Typography>
                                <Typography style={{
                                    fontSize: "calc(16px + (22 - 16) * ((100vw - 1024px) / (1600 - 1024)))", fontWeight: "normal", fontStyle: "normal",
                                    fontFamily: "DINNextLTPro-Medium", color: "white",
                                }}>
                                    “Love it, it’s the Best. I can’t live without it!”
                        </Typography>
                            </animated.div>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div style={{
                height: "100vh", backgroundImage: `url(${stage})`, display: "flex", alignItems: "center", boxShadow: "rgb(0 0 0 / 56%) 0px 22px 70px 4px"
            }}>
                <div style={{ display: "flex", flexDirection: "column", position: "absolute", left: `5.5%`, paddingTop: `${200.4 / 1920 * props.size[0]}px` }}>
                    <img alt="right_small_speakers" style={{
                        position: "absolute", width: `100%`,
                        height: `auto`, background: `transparent 0% 0 % no - repeat padding- box`
                    }} src={speakers_top} />
                    <img alt="left_small_speakers" style={{
                        paddingTop: `50%`,
                        marginLeft: `${(150.7 - 54.85) / 1920 * props.size[0]}px`, width: `100%`,
                        height: `auto`, background: `transparent 0% 0 % no - repeat padding- box`
                    }} src={speakers_bot} />
                </div>
                <div style={{
                    display: "flex", flexDirection: "column", position: "absolute", height: "100vh", marginTop: "4%", width: "100vw",
                    justifyContent: "center", alignItems: "center"
                }}>
                    <Trail0 open={props.render} matches={matches}>
                        <span>R</span>
                        <span>E</span>
                        <span>V</span>
                        <span>I</span>
                        <span>E</span>
                        <span>W</span>
                        <span>S</span>
                    </Trail0>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <div style={{ overflow: "hidden" }}>
                            <animated.div style={{
                                ...textSpring1, display: "flex", flexDirection: "column", paddingTop: `0`,
                                padding: "2rem", paddingBottom: "0"
                            }}>
                                <Rating className="rating" name="read-only" size="large" defaultValue={5} readOnly style={{ color: "white" }} />
                                <Typography style={{
                                    fontSize: "calc(20px + (24 - 20) * ((100vw - 300px) / (1600 - 300)))", fontWeight: "normal", fontStyle: "normal",
                                    fontFamily: "DINNextLTPro-Medium", color: "white"
                                }}>
                                    ARTIST
                        </Typography>
                                <Typography style={{
                                    fontSize: "calc(14px + (17 - 14) * ((100vw - 300px) / (1600 - 300)))", fontWeight: "normal", fontStyle: "normal",
                                    fontFamily: "DINNextLTPro-Medium", color: "white",
                                }}>
                                    “Love it, it’s the Best. I can’t live without it!”
                        </Typography>
                            </animated.div>
                        </div>
                        <div style={{ overflow: "hidden" }}>
                            <animated.div style={{ ...textSpring2, display: "flex", flexDirection: "column", paddingTop: `1rem`, padding: "2rem", paddingBottom: "0" }}>
                                <Rating className="rating" name="read-only" size="large" value={5} readOnly style={{ color: "white" }} />
                                <Typography style={{
                                    fontSize: "calc(20px + (24 - 20) * ((100vw - 300px) / (1600 - 300)))", fontWeight: "normal", fontStyle: "normal",
                                    fontFamily: "DINNextLTPro-Medium", color: "white"
                                }}>
                                    PRODUCER
                        </Typography>
                                <Typography style={{
                                    fontSize: "calc(14px + (17 - 14) * ((100vw - 300px) / (1600 - 300)))", fontWeight: "normal", fontStyle: "normal",
                                    fontFamily: "DINNextLTPro-Medium", color: "white",
                                }}>
                                    “Love it, it’s the Best. I can’t live without it!”
                        </Typography>
                            </animated.div>
                        </div>
                        <div style={{ overflow: "hidden" }}>
                            <animated.div style={{ ...textSpring3, display: "flex", flexDirection: "column", paddingTop: `1rem`, padding: "2rem", paddingBottom: "0" }}>
                                <Rating className="rating" name="read-only" size="large" value={5} readOnly style={{ color: "white" }} />
                                <Typography style={{
                                    fontSize: "calc(20px + (24 - 20) * ((100vw - 300px) / (1600 - 300)))", fontWeight: "normal", fontStyle: "normal",
                                    fontFamily: "DINNextLTPro-Medium", color: "white"
                                }}>
                                    MUSIC FAN
                        </Typography>
                                <Typography style={{
                                    fontSize: "calc(14px + (17 - 14) * ((100vw - 300px) / (1600 - 300)))", fontWeight: "normal", fontStyle: "normal",
                                    fontFamily: "DINNextLTPro-Medium", color: "white",
                                }}>
                                    “Love it, it’s the Best. I can’t live without it!”
                        </Typography>
                            </animated.div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

const mapStateToProps = (state) => {
    return {
        size: state.propertyReducer.size,
        tryPos: state.propertyReducer.tryPos,
        demoPos: state.propertyReducer.demoPos,
    }
}

export default connect(mapStateToProps)(SectionReview)