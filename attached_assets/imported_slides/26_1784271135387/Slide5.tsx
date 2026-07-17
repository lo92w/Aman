import React, { useState, useEffect, useRef } from "react";
import img_1 from "./assets/images/image_1.png";
import img_2 from "./assets/images/image_2.png";
const Slide5: React.FC = () => {
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
  return <div id="slide-5" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-5" style={{
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
        left: "554.67px",
        top: "160px",
        width: "5546.68px",
        height: "224.06px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0px 0px 0px 0px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "right",
          lineHeight: "1.2",
          fontSize: "calc(159.29pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(159.29pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontWeight: "700",
            color: "#C36C4F"
          }}>{"\u0648\u0635\u0641 \u0648\u0645\u0648\u0627\u0621\u0645\u0629 \u0627\u0644\u0641\u0643\u0631\u0629 \u0644\u0644\u0645\u0633\u0627\u0631"}</span></p></div><div key={4} style={{
        position: "absolute",
        left: "500px",
        top: "500px",
        width: "1800px",
        height: "950.02px"
      }}><div key={0} style={{
          position: "absolute",
          left: "0px",
          top: "0px",
          width: "1800px",
          height: "950.02px",
          boxSizing: "border-box",
          backgroundColor: "#25244C",
          border: "6px solid #93C47D",
          borderRadius: "40px"
        }} /><div key={1} style={{
          position: "absolute",
          left: "100px",
          top: "80px",
          width: "1600px",
          height: "790.02px",
          boxSizing: "border-box",
          backgroundColor: "transparent",
          padding: "0px 0px 0px 0px",
          wordWrap: "break-word"
        }}><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            fontSize: "calc(110pt * var(--pptx-font-scale, 1))",
            marginTop: "0",
            marginBottom: "0"
          }}><span style={{
              fontSize: "calc(110pt * var(--pptx-font-scale, 1))",
              fontFamily: "'Material Icons', sans-serif",
              color: "#93C47D"
            }}>{"auto_awesome"}</span></p><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            marginTop: "30pt",
            fontSize: "calc(75pt * var(--pptx-font-scale, 1))",
            marginBottom: "0"
          }}><span style={{
              fontSize: "calc(75pt * var(--pptx-font-scale, 1))",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              fontWeight: "700",
              color: "#FFFFFF"
            }}>{"\u0627\u0644\u0641\u0648\u0627\u0626\u062F \u0648\u0627\u0644\u0627\u0628\u062A\u0643\u0627\u0631\u0627\u062A"}</span></p><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            marginTop: "22.5pt",
            fontSize: "calc(48pt * var(--pptx-font-scale, 1))",
            marginBottom: "0"
          }}><span style={{
              fontSize: "calc(48pt * var(--pptx-font-scale, 1))",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              color: "#CBD5E1"
            }}>{"\u0625\u0628\u0631\u0627\u0632 \u0646\u0642\u0627\u0637 \u0627\u0644\u0642\u0648\u0629 \u0648\u0627\u0644\u0627\u0628\u062A\u0643\u0627\u0631 \u0648\u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0636\u0627\u0641\u0629 \u0648\u0627\u0644\u0641\u0648\u0627\u0626\u062F \u0627\u0644\u0646\u0648\u0639\u064A\u0629 \u0627\u0644\u062A\u064A \u064A\u0642\u062F\u0645\u0647\u0627 \u0627\u0644\u062D\u0644."}</span></p></div></div><div key={5} style={{
        position: "absolute",
        left: "2428px",
        top: "500px",
        width: "1800px",
        height: "950.02px"
      }}><div key={0} style={{
          position: "absolute",
          left: "0px",
          top: "0px",
          width: "1800px",
          height: "950.02px",
          boxSizing: "border-box",
          backgroundColor: "#25244C",
          border: "6px solid #C36C4F",
          borderRadius: "40px"
        }} /><div key={1} style={{
          position: "absolute",
          left: "100px",
          top: "80px",
          width: "1600px",
          height: "790.02px",
          boxSizing: "border-box",
          backgroundColor: "transparent",
          padding: "0px 0px 0px 0px",
          wordWrap: "break-word"
        }}><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            fontSize: "calc(110pt * var(--pptx-font-scale, 1))",
            marginTop: "0",
            marginBottom: "0"
          }}><span style={{
              fontSize: "calc(110pt * var(--pptx-font-scale, 1))",
              fontFamily: "'Material Icons', sans-serif",
              color: "#C36C4F"
            }}>{"construction"}</span></p><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            marginTop: "30pt",
            fontSize: "calc(75pt * var(--pptx-font-scale, 1))",
            marginBottom: "0"
          }}><span style={{
              fontSize: "calc(75pt * var(--pptx-font-scale, 1))",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              fontWeight: "700",
              color: "#FFFFFF"
            }}>{"\u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0645\u0634\u0643\u0644\u0629"}</span></p><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            marginTop: "22.5pt",
            fontSize: "calc(48pt * var(--pptx-font-scale, 1))",
            marginBottom: "0"
          }}><span style={{
              fontSize: "calc(48pt * var(--pptx-font-scale, 1))",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              color: "#CBD5E1"
            }}>{"\u0635\u064A\u0627\u063A\u0629 \u062D\u0644\u0648\u0644 \u0639\u0645\u0644\u064A\u0629 \u0648\u0645\u0628\u062A\u0643\u0631\u0629 \u062A\u0633\u062A\u0647\u062F\u0641 \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0645\u0634\u0643\u0644\u0629 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u0648\u062A\u062E\u0637\u064A \u0627\u0644\u0639\u0642\u0628\u0627\u062A \u0628\u0641\u0639\u0627\u0644\u064A\u0629."}</span></p></div></div><div key={6} style={{
        position: "absolute",
        left: "4356px",
        top: "500px",
        width: "1800px",
        height: "950.02px"
      }}><div key={0} style={{
          position: "absolute",
          left: "0px",
          top: "0px",
          width: "1800px",
          height: "950.02px",
          boxSizing: "border-box",
          backgroundColor: "#25244C",
          border: "6px solid #A99FE3",
          borderRadius: "40px"
        }} /><div key={1} style={{
          position: "absolute",
          left: "100px",
          top: "80px",
          width: "1600px",
          height: "790.02px",
          boxSizing: "border-box",
          backgroundColor: "transparent",
          padding: "0px 0px 0px 0px",
          wordWrap: "break-word"
        }}><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            fontSize: "calc(110pt * var(--pptx-font-scale, 1))",
            marginTop: "0",
            marginBottom: "0"
          }}><span style={{
              fontSize: "calc(110pt * var(--pptx-font-scale, 1))",
              fontFamily: "'Material Icons', sans-serif",
              color: "#A99FE3"
            }}>{"tips_and_updates"}</span></p><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            marginTop: "30pt",
            fontSize: "calc(75pt * var(--pptx-font-scale, 1))",
            marginBottom: "0"
          }}><span style={{
              fontSize: "calc(75pt * var(--pptx-font-scale, 1))",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              fontWeight: "700",
              color: "#FFFFFF"
            }}>{"\u0627\u0644\u0641\u0643\u0631\u0629 \u0627\u0644\u0645\u0637\u0648\u0631\u0629"}</span></p><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            marginTop: "22.5pt",
            fontSize: "calc(48pt * var(--pptx-font-scale, 1))",
            marginBottom: "0"
          }}><span style={{
              fontSize: "calc(48pt * var(--pptx-font-scale, 1))",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              color: "#CBD5E1"
            }}>{"\u0634\u0631\u062D \u0645\u0641\u0635\u0644 \u0648\u0645\u062A\u0643\u0627\u0645\u0644 \u0644\u0644\u0641\u0643\u0631\u0629 \u0627\u0644\u062A\u064A \u062A\u0645 \u0627\u062E\u062A\u064A\u0627\u0631\u0647\u0627 \u0648\u062A\u0637\u0648\u064A\u0631\u0647\u0627 \u0644\u062A\u062A\u0646\u0627\u0633\u0628 \u062A\u0645\u0627\u0645\u0627\u064B \u0645\u0639 \u0645\u0633\u0627\u0631 \u0627\u0644\u0647\u0627\u0643\u0627\u062B\u0648\u0646."}</span></p></div></div></div></div>;
};
export default Slide5;
