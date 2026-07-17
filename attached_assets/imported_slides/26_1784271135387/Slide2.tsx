import React, { useState, useEffect, useRef } from "react";
import img_1 from "./assets/images/image_1.png";
import img_2 from "./assets/images/image_2.png";
const Slide2: React.FC = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState({
    s: 1,
    x: 0,
    y: 0
  });
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      const s = Math.min(w / 6656, h / 1728);
      setLayout({
        s,
        x: (w - 6656 * s) / 2,
        y: (h - 1728 * s) / 2
      });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return <div id="slide-2" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-2" style={{
      position: "absolute",
      width: "6656px",
      height: "1728px",
      overflow: "hidden",
      transformOrigin: "top left",
      color: "#FFFFFF",
      backgroundColor: "#212145",
      transform: `scale(${layout.s})`,
      left: layout.x + "px",
      top: layout.y + "px"
    }}><img key={0} src={img_1} alt="Google Shape;9;p1" style={{
        position: "absolute",
        left: "0px",
        top: "0px",
        width: "3072px",
        height: "1728px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={1} src={img_2} alt="Google Shape;10;p1" style={{
        position: "absolute",
        left: "0px",
        top: "0px",
        width: "3072px",
        height: "1728px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={2} src={img_2} alt="Google Shape;30;p6" style={{
        position: "absolute",
        left: "-85.5px",
        top: "0px",
        width: "6885px",
        height: "1728px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><div key={3} style={{
        position: "absolute",
        left: "4489.56px",
        top: "494.03px",
        width: "1265.92px",
        height: "143.72px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "65.67px 65.67px 65.67px 65.67px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "right",
          lineHeight: "1.2",
          fontSize: "calc(72pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(72pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            color: "#ffffff"
          }}>{"\u0627\u0644\u0645\u062D\u062A\u0648\u0649 1"}</span></p></div><div key={4} style={{
        position: "absolute",
        left: "5816.73px",
        top: "494.03px",
        width: "307.46px",
        height: "143.72px",
        boxSizing: "border-box",
        backgroundColor: "#A99FE3",
        borderRadius: "27.03px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "65.67px 0px 65.67px 0px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "center",
          lineHeight: "1.2",
          fontSize: "calc(88.95pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(88.95pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontWeight: "700",
            color: "#ffffff"
          }}>{"01"}</span></p></div><div key={5} style={{
        position: "absolute",
        left: "4489.56px",
        top: "740.72px",
        width: "1265.92px",
        height: "143.72px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "65.67px 65.67px 65.67px 65.67px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "right",
          lineHeight: "1.2",
          fontSize: "calc(72pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(72pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            color: "#ffffff"
          }}>{"\u0627\u0644\u0645\u062D\u062A\u0648\u0649 2"}</span></p></div><div key={6} style={{
        position: "absolute",
        left: "5816.73px",
        top: "740.72px",
        width: "307.46px",
        height: "143.72px",
        boxSizing: "border-box",
        backgroundColor: "#A99FE3",
        borderRadius: "27.03px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "65.67px 0px 65.67px 0px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "center",
          lineHeight: "1.2",
          fontSize: "calc(88.95pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(88.95pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontWeight: "700",
            color: "#ffffff"
          }}>{"02"}</span></p></div><div key={7} style={{
        position: "absolute",
        left: "4491.48px",
        top: "997.2px",
        width: "1265.92px",
        height: "143.72px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "65.67px 65.67px 65.67px 65.67px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "right",
          lineHeight: "1.2",
          fontSize: "calc(72pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(72pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            color: "#ffffff"
          }}>{"\u0627\u0644\u0645\u062D\u062A\u0648\u0649 3"}</span></p></div><div key={8} style={{
        position: "absolute",
        left: "5816.73px",
        top: "997.2px",
        width: "307.46px",
        height: "143.72px",
        boxSizing: "border-box",
        backgroundColor: "#A99FE3",
        borderRadius: "27.03px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "65.67px 0px 65.67px 0px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "center",
          lineHeight: "1.2",
          fontSize: "calc(88.95pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(88.95pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontWeight: "700",
            color: "#ffffff"
          }}>{"03"}</span></p></div><div key={9} style={{
        position: "absolute",
        left: "4489.56px",
        top: "1243.9px",
        width: "1265.92px",
        height: "143.72px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "65.67px 65.67px 65.67px 65.67px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "right",
          lineHeight: "1.2",
          fontSize: "calc(72pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(72pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            color: "#ffffff"
          }}>{"\u0627\u0644\u0645\u062D\u062A\u0648\u0649 4"}</span></p></div><div key={10} style={{
        position: "absolute",
        left: "5816.73px",
        top: "1243.9px",
        width: "307.46px",
        height: "143.72px",
        boxSizing: "border-box",
        backgroundColor: "#A99FE3",
        borderRadius: "27.03px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "65.67px 0px 65.67px 0px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "center",
          lineHeight: "1.2",
          fontSize: "calc(88.95pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(88.95pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontWeight: "700",
            color: "#ffffff"
          }}>{"04"}</span></p></div><div key={11} style={{
        position: "absolute",
        left: "1681.83px",
        top: "494.03px",
        width: "1740.66px",
        height: "143.72px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "65.67px 65.67px 65.67px 65.67px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "right",
          lineHeight: "1.2",
          fontSize: "calc(72pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(72pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            color: "#ffffff"
          }}>{"\u0627\u0644\u0645\u062D\u062A\u0648\u0649 5"}</span></p></div><div key={12} style={{
        position: "absolute",
        left: "3484.02px",
        top: "494.03px",
        width: "307.46px",
        height: "143.72px",
        boxSizing: "border-box",
        backgroundColor: "#A99FE3",
        borderRadius: "27.03px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "65.67px 0px 65.67px 0px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "center",
          lineHeight: "1.2",
          fontSize: "calc(88.95pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(88.95pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontWeight: "700",
            color: "#ffffff"
          }}>{"05"}</span></p></div><div key={13} style={{
        position: "absolute",
        left: "1681.99px",
        top: "740.72px",
        width: "1740.66px",
        height: "143.72px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "65.67px 65.67px 65.67px 65.67px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "right",
          lineHeight: "1.2",
          fontSize: "calc(72pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(72pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            color: "#ffffff"
          }}>{"\u0627\u0644\u0645\u062D\u062A\u0648\u0649 6"}</span></p></div><div key={14} style={{
        position: "absolute",
        left: "3484.02px",
        top: "740.72px",
        width: "307.46px",
        height: "143.72px",
        boxSizing: "border-box",
        backgroundColor: "#A99FE3",
        borderRadius: "27.03px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "65.67px 0px 65.67px 0px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "center",
          lineHeight: "1.2",
          fontSize: "calc(88.95pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(88.95pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontWeight: "700",
            color: "#ffffff"
          }}>{"06"}</span></p></div><div key={15} style={{
        position: "absolute",
        left: "1682.37px",
        top: "997.2px",
        width: "1740.66px",
        height: "143.72px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "65.67px 65.67px 65.67px 65.67px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "right",
          lineHeight: "1.2",
          fontSize: "calc(72pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(72pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            color: "#ffffff"
          }}>{"\u0627\u0644\u0645\u062D\u062A\u0648\u0649 7"}</span></p></div><div key={16} style={{
        position: "absolute",
        left: "3484.02px",
        top: "997.2px",
        width: "307.46px",
        height: "143.72px",
        boxSizing: "border-box",
        backgroundColor: "#A99FE3",
        borderRadius: "27.03px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "65.67px 0px 65.67px 0px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "center",
          lineHeight: "1.2",
          fontSize: "calc(88.95pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(88.95pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontWeight: "700",
            color: "#ffffff"
          }}>{"07"}</span></p></div><div key={17} style={{
        position: "absolute",
        left: "3726.49px",
        top: "203.9px",
        width: "2421.76px",
        height: "171.02px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        padding: "56.19px 56.19px 56.19px 56.19px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "right",
          lineHeight: "1.8",
          fontSize: "calc(96pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(96pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontWeight: "700",
            color: "#C36C4F"
          }}>{"\u0627\u0644\u0645\u062D\u062A\u0648\u064A\u0627\u062A"}</span></p></div></div></div>;
};
export default Slide2;
