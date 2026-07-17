import React, { useState, useEffect, useRef } from "react";
import img_1 from "./assets/images/image_1.png";
import img_2 from "./assets/images/image_2.png";
const Slide6: React.FC = () => {
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
  return <div id="slide-6" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-6" style={{
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
        height: "192px",
        boxSizing: "border-box",
        backgroundColor: "rgba(0, 0, 0, 0)",
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
          }}>{"\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0629"}</span></p></div><div key={4} style={{
        position: "absolute",
        left: "554.67px",
        top: "384px",
        width: "5546.68px",
        height: "192px",
        boxSizing: "border-box",
        backgroundColor: "rgba(0, 0, 0, 0)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0px 0px 0px 0px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "right",
          lineHeight: "1.2",
          fontSize: "calc(79.64pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(79.64pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            color: "#E2E8F0"
          }}>{"\u064A\u0634\u0631\u062D \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u064A \u062A\u0645 \u062C\u0645\u0639\u0647\u0627 \u0623\u0648 \u062A\u0648\u0644\u064A\u062F\u0647\u0627 \u062E\u0644\u0627\u0644 \u0627\u0644\u0645\u0634\u0631\u0648\u0639\u060C \u0633\u0648\u0627\u0621 \u0643\u0627\u0646\u062A \u0646\u0635\u064A\u0629 \u0623\u0648 \u063A\u064A\u0631 \u0646\u0635\u064A\u0629 \u0645\u062B\u0644 \u0627\u0644\u0635\u0648\u0631 \u0648\u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629."}</span></p></div><div key={5} style={{
        position: "absolute",
        left: "3602px",
        top: "701.87px",
        width: "2500px",
        height: "740.23px"
      }}><div key={0} style={{
          position: "absolute",
          left: "0px",
          top: "0px",
          width: "2500px",
          height: "740.23px",
          boxSizing: "border-box",
          backgroundColor: "#26264E",
          border: "6px solid #C36C4F",
          borderRadius: "32.18px"
        }} /><div key={1} style={{
          position: "absolute",
          left: "120px",
          top: "64.37px",
          width: "2260px",
          height: "611.5px",
          boxSizing: "border-box",
          backgroundColor: "transparent",
          padding: "0px 0px 0px 0px",
          wordWrap: "break-word"
        }}><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            fontSize: "calc(140pt * var(--pptx-font-scale, 1))",
            marginTop: "0",
            marginBottom: "0"
          }}><span style={{
              fontSize: "calc(140pt * var(--pptx-font-scale, 1))",
              fontFamily: "'Material Icons', sans-serif",
              color: "#C36C4F"
            }}>{"storage"}</span></p><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            marginTop: "15pt",
            fontSize: "calc(95pt * var(--pptx-font-scale, 1))",
            marginBottom: "0"
          }}><span style={{
              fontSize: "calc(95pt * var(--pptx-font-scale, 1))",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              fontWeight: "700",
              color: "#FFFFFF"
            }}>{"\u0645\u0635\u0627\u062F\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"}</span></p><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            marginTop: "22.5pt",
            fontSize: "calc(56pt * var(--pptx-font-scale, 1))",
            marginBottom: "0"
          }}><span style={{
              fontSize: "calc(56pt * var(--pptx-font-scale, 1))",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              color: "#CBD5E1"
            }}>{"\u0645\u0627 \u0647\u064A \u0645\u0635\u0627\u062F\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u064A \u0627\u0633\u062A\u062E\u062F\u0645\u062A\u0647\u0627 \u0641\u064A \u0627\u0644\u0645\u0634\u0631\u0648\u0639\u061F \u062D\u062F\u062F \u0645\u0627 \u0625\u0630\u0627 \u0643\u0627\u0646\u062A \u062E\u0627\u0631\u062C\u064A\u0629 \u0623\u0648 \u062A\u0645 \u062A\u0648\u0644\u064A\u062F\u0647\u0627 \u062A\u0644\u0642\u0627\u0626\u064A\u064B\u0627."}</span></p></div></div><div key={6} style={{
        position: "absolute",
        left: "554px",
        top: "701.87px",
        width: "2500px",
        height: "740.23px"
      }}><div key={0} style={{
          position: "absolute",
          left: "0px",
          top: "0px",
          width: "2500px",
          height: "740.23px",
          boxSizing: "border-box",
          backgroundColor: "#26264E",
          border: "6px solid #C36C4F",
          borderRadius: "32.18px"
        }} /><div key={1} style={{
          position: "absolute",
          left: "120px",
          top: "64.37px",
          width: "2260px",
          height: "611.5px",
          boxSizing: "border-box",
          backgroundColor: "transparent",
          padding: "0px 0px 0px 0px",
          wordWrap: "break-word"
        }}><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            fontSize: "calc(140pt * var(--pptx-font-scale, 1))",
            marginTop: "0",
            marginBottom: "0"
          }}><span style={{
              fontSize: "calc(140pt * var(--pptx-font-scale, 1))",
              fontFamily: "'Material Icons', sans-serif",
              color: "#C36C4F"
            }}>{"auto_fix_high"}</span></p><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            marginTop: "15pt",
            fontSize: "calc(95pt * var(--pptx-font-scale, 1))",
            marginBottom: "0"
          }}><span style={{
              fontSize: "calc(95pt * var(--pptx-font-scale, 1))",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              fontWeight: "700",
              color: "#FFFFFF"
            }}>{"\u062A\u0646\u0638\u064A\u0641 \u0648\u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"}</span></p><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            marginTop: "22.5pt",
            fontSize: "calc(56pt * var(--pptx-font-scale, 1))",
            marginBottom: "0"
          }}><span style={{
              fontSize: "calc(56pt * var(--pptx-font-scale, 1))",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              color: "#CBD5E1"
            }}>{"\u0645\u0627 \u0627\u0644\u0630\u064A \u0642\u0645\u062A \u0628\u0647 \u0644\u062A\u0646\u0638\u064A\u0641 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0623\u0648 \u0645\u0639\u0627\u0644\u062C\u062A\u0647\u0627 \u0644\u062A\u0635\u0628\u062D \u062C\u0627\u0647\u0632\u0629 \u0644\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0641\u064A \u0627\u0644\u0646\u0645\u0627\u0630\u062C\u061F"}</span></p></div></div></div></div>;
};
export default Slide6;
