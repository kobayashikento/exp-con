import React from 'react';

import { Curtains } from 'react-curtains';

import Header from '../Components/Header';
import CurtainContent from '../Sections/CurtainContent';
import SectionRed from '../Sections/SectionRed';
import SectionYellow from '../Sections/SectionYellow';
import Perks from '../Sections/Perks';
import Review from '../Sections/SectionReview';
import SectionGet from '../Sections/SectionGet';
import SectionFooter from '../Sections/SectionFooter';

import { Scrollbars } from 'react-custom-scrollbars';

import { useTrail, animated, useSpring } from 'react-spring';

// Redux
import { connect } from 'react-redux';
import { setMenuIndex } from '../Redux/actions/propertyAction';

import '../Assets/styles/landingPage.css';

const LandingPage = (props) => {
    const [playing, setPlaying] = React.useState(false);
    const [speakerHover, setSpeakerHover] = React.useState(false);
    const [text, setText] = React.useState("");

    //refs
    const cursorRef = React.useRef();
    const scrollRef = React.useRef();

    // handlers for speakers
    const handlePlay = () => {
        setPlaying(!playing)
    }

    const handleSpeakerHover = (state) => {
        if (state) {
            setSpeakerHover(true);
        } else {
            setSpeakerHover(false);
        }
    }

    const handleScroll = (e) => {
        if (props.size[1] * 0.51 < e.scrollTop && e.scrollTop < props.size[1] * 1.5 && props.setMenuIndex !== 1) {
            props.setMenuIndex(1);
        } else if (props.size[1] * 1.5 < e.scrollTop && e.scrollTop < props.size[1] * 2.5 && props.setMenuIndex !== 2) {
            props.setMenuIndex(2);
        } else if (props.size[1] * 2.5 < e.scrollTop && e.scrollTop < props.size[1] * 3.5 && props.setMenuIndex !== 3) {
            props.setMenuIndex(3);
        } else if (props.size[1] * 3.5 < e.scrollTop && e.scrollTop < props.size[1] * 5 && props.setMenuIndex !== 4) {
            props.setMenuIndex(4);
        } else if (props.size[1] * 5 < e.scrollTop && e.scrollTop < props.size[1] * 6.5) {
            props.setMenuIndex(0);
        } else if (e.scrollTop < props.size[1] * 0.51) {
            props.setMenuIndex(0);
        }
    }


    const mouseMove = (e) => {
        if (props.size[1] < e.pageY + scrollRef.current.getScrollTop() && e.pageY + scrollRef.current.getScrollTop() < props.size[1] * 2) {
            setText("CLICK");
        } else if (props.size[1] * 2 < e.pageY + scrollRef.current.getScrollTop() && e.pageY + scrollRef.current.getScrollTop() < props.size[1] * 3) {
            setText("REVEAL");
        } else {
            setText("");
        }
    }

    React.useEffect(() => {
        if (cursorRef && scrollRef) {
            window.addEventListener('mousemove', mouseMove);
        }
        return () => window.removeEventListener('mousemove', mouseMove);
    }, [cursorRef]);

    // cursor config
    const stiff = { mass: 1, tension: 170, friction: 26 }
    const slow = { mass: 5, tension: 200, friction: 50 }
    const trans = (x, y) => `translate3d(${x}px,${y - (142 / 1920 * props.size[0]) / 2.75}px,0) translate3d(-50%,-50%,0)`;
    const [trail, set] = useTrail(1, () => ({ xy: [0, 0], config: i => (i === 0 ? stiff : slow) }))

    const cursorSpring = useSpring({
        to: {
            height: text === "REVEAL" ? `${142 / 1920 * props.size[0]}px` : speakerHover ? `${142 / 1920 * props.size[0]}px` : "0px",
            width: text === "REVEAL" ? `${142 / 1920 * props.size[0]}px` : speakerHover ? `${142 / 1920 * props.size[0]}px` : "0px",
            opacity: text === "REVEAL" ? 1 : speakerHover ? 1 : 0
        },
        from: { height: `0px`, width: `0px`, opacity: 0 }
    });

    React.useEffect(() => {
        if (props.navIndex === 1) {
            scrollRef.current.view.scroll({ top: props.size[1], behavior: 'smooth' });
        } else if (props.navIndex === 2) {
            scrollRef.current.view.scroll({ top: props.size[1] * 2, behavior: 'smooth' });
        } else if (props.navIndex === 3) {
            scrollRef.current.view.scroll({ top: props.size[1] * 3, behavior: 'smooth' });
        } else if (props.navIndex === 4) {
            scrollRef.current.view.scroll({ top: props.size[1] * 4.15, behavior: 'smooth' });
        }
    }, [props.navIndex])

    return (
        <div onMouseMove={e => set({ xy: [e.pageX, e.pageY] })} style={{ cursor: text === "REVEAL" ? "move" : speakerHover ? "move" : "auto" }}>
            {trail.map((prop, index) => (
                <animated.div key={index} ref={cursorRef} style={{
                    ...cursorSpring, transform: prop.xy.interpolate(trans), position: "absolute",
                    font: `normal normal bold ${27 / 1920 * props.size[0]}px/${33 / 1920 * props.size[0]}px Helvetica Neue`, letterSpacing: `${2.7 / 1920 * props.size[0]}`, zIndex: 1020,
                    color: text === "REVEAL" ? "#000000" : speakerHover ? "#FFFFFF" : "white", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%",
                    pointerEvents: "none", border: text === "REVEAL" ? `3px solid #000000` : speakerHover ? `3px solid #ffffff` : `3px solid #ffffff`,
                }} >
                    {text}
                </animated.div>
            ))}
            <Scrollbars
                // This will activate auto hide
                ref={scrollRef}
                autoHide
                style={{ height: `${props.size[1]}px` }}
                thumbSize={50}
                onScrollFrame={handleScroll}
            >
                <div className="node-master" style={{ background: "black" }}>
                    <Curtains
                        pixelRatio={Math.min(1.5, window.devicePixelRatio)}
                        autoRender={false}
                    >
                        <CurtainContent
                            size={props.size}
                        />
                    </Curtains>
                    <SectionRed
                        playing={playing}
                        handlePlay={() => handlePlay()}
                        handleSpeakerHover={(state) => handleSpeakerHover(state)}
                    />
                    <SectionYellow />
                    <Perks />
                    <Review />
                    <SectionGet />
                    <SectionFooter />
                </div>
            </Scrollbars>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        menuIndex: state.propertyReducer.menuIndex,
        size: state.propertyReducer.size,
        navIndex: state.propertyReducer.navIndex
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setMenuIndex: (index) => dispatch(setMenuIndex(index)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);