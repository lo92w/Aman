import React, { useState, useEffect, useRef } from "react";
import img_1 from "./assets/images/image_1.png";
import img_2 from "./assets/images/image_2.png";
const Slide4: React.FC = () => {
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
  return <div id="slide-4" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-4" style={{
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
      }} /><img key={2} src={img_2} alt="Google Shape;108;p18" style={{
        position: "absolute",
        left: "-85.5px",
        top: "0px",
        width: "6885px",
        height: "1728px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><div key={3} style={{
        position: "absolute",
        left: "3450px",
        top: "180px",
        width: "2500px",
        height: "220px",
        boxSizing: "border-box",
        backgroundColor: "rgba(0, 0, 0, 0)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0px 50px 0px 0px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "right",
          lineHeight: "1.2",
          fontSize: "calc(110pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(110pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontWeight: "700",
            color: "#C36C4F"
          }}>{"\u0627\u0644\u0645\u0634\u0643\u0644\u0629 \u0648\u062D\u0644\u0651\u0647\u0627"}</span></p></div><div key={4} style={{
        position: "absolute",
        left: "3500px",
        top: "470px",
        width: "2450.02px",
        height: "980px"
      }}><div key={0} style={{
          position: "absolute",
          left: "0px",
          top: "0px",
          width: "2450.02px",
          height: "980px",
          boxSizing: "border-box",
          backgroundColor: "#26264E",
          border: "6px solid #FFD966",
          borderRadius: "39.99px"
        }} /><div key={1} style={{
          position: "absolute",
          left: "120px",
          top: "60px",
          width: "2210.02px",
          height: "860px",
          boxSizing: "border-box",
          backgroundColor: "transparent",
          padding: "0px 0px 0px 0px",
          wordWrap: "break-word"
        }}><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            fontSize: "calc(130pt * var(--pptx-font-scale, 1))",
            marginTop: "0",
            marginBottom: "0"
          }}><span style={{
              fontSize: "calc(130pt * var(--pptx-font-scale, 1))",
              fontFamily: "'Material Icons', sans-serif",
              color: "#FFD966"
            }}>{"report_problem"}</span></p><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            marginTop: "22.5pt",
            fontSize: "calc(85pt * var(--pptx-font-scale, 1))",
            marginBottom: "0"
          }}><span style={{
              fontSize: "calc(85pt * var(--pptx-font-scale, 1))",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              fontWeight: "700",
              color: "#FFFFFF"
            }}>{"\u0627\u0644\u0645\u0634\u0643\u0644\u0629"}</span></p><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            marginTop: "30pt",
            fontSize: "calc(52pt * var(--pptx-font-scale, 1))",
            marginBottom: "0"
          }}><span style={{
              fontSize: "calc(52pt * var(--pptx-font-scale, 1))",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              color: "#CBD5E1"
            }}>{"\u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0641\u062C\u0648\u0629 \u0623\u0648 \u0627\u0644\u0639\u0642\u0628\u0629 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629 \u0627\u0644\u062A\u064A \u064A\u0648\u0627\u062C\u0647\u0647\u0627 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0623\u0648 \u0627\u0644\u062C\u0645\u0647\u0648\u0631 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641 \u0628\u0648\u0636\u0648\u062D."}</span></p></div></div><div key={5} style={{
        position: "absolute",
        left: "700px",
        top: "470px",
        width: "2450.02px",
        height: "980px"
      }}><div key={0} style={{
          position: "absolute",
          left: "0px",
          top: "0px",
          width: "2450.02px",
          height: "980px",
          boxSizing: "border-box",
          backgroundColor: "#26264E",
          border: "6px solid #93C47D",
          borderRadius: "39.99px"
        }} /><div key={1} style={{
          position: "absolute",
          left: "120px",
          top: "60px",
          width: "2210.02px",
          height: "860px",
          boxSizing: "border-box",
          backgroundColor: "transparent",
          padding: "0px 0px 0px 0px",
          wordWrap: "break-word"
        }}><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            fontSize: "calc(130pt * var(--pptx-font-scale, 1))",
            marginTop: "0",
            marginBottom: "0"
          }}><span style={{
              fontSize: "calc(130pt * var(--pptx-font-scale, 1))",
              fontFamily: "'Material Icons', sans-serif",
              color: "#93C47D"
            }}>{"lightbulb"}</span></p><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            marginTop: "22.5pt",
            fontSize: "calc(85pt * var(--pptx-font-scale, 1))",
            marginBottom: "0"
          }}><span style={{
              fontSize: "calc(85pt * var(--pptx-font-scale, 1))",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              fontWeight: "700",
              color: "#FFFFFF"
            }}>{"\u0627\u0644\u062D\u0644 \u0627\u0644\u0645\u0642\u062A\u0631\u062D"}</span></p><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            marginTop: "30pt",
            fontSize: "calc(52pt * var(--pptx-font-scale, 1))",
            marginBottom: "0"
          }}><span style={{
              fontSize: "calc(52pt * var(--pptx-font-scale, 1))",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              color: "#CBD5E1"
            }}>{"\u062A\u0642\u062F\u064A\u0645 \u062D\u0644\u0648\u0644 \u0648\u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0645\u0634\u0643\u0644\u0629 \u0628\u0623\u0633\u0644\u0648\u0628 \u0645\u0628\u062A\u0643\u0631 \u0648\u0641\u0639\u0651\u0627\u0644 \u064A\u0636\u0645\u0646 \u062A\u062D\u0642\u064A\u0642 \u0627\u0644\u0623\u062B\u0631 \u0627\u0644\u0625\u064A\u062C\u0627\u0628\u064A."}</span></p></div></div></div></div>;
};
export default Slide4;
