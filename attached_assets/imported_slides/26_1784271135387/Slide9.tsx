import React, { useState, useEffect, useRef } from "react";
import img_1 from "./assets/images/image_1.png";
import img_2 from "./assets/images/image_2.png";
const Slide9: React.FC = () => {
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
  return <div id="slide-9" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-9" style={{
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
        left: "733.19px",
        top: "515.52px",
        width: "2463.06px",
        height: "1031.56px",
        boxSizing: "border-box",
        backgroundColor: "rgba(30, 27, 75, 0.61)",
        borderRadius: "115.3px"
      }} /><div key={4} style={{
        position: "absolute",
        left: "3465.47px",
        top: "515.52px",
        width: "2463.06px",
        height: "1031.56px",
        boxSizing: "border-box",
        backgroundColor: "rgba(30, 27, 75, 0.61)",
        borderRadius: "115.3px"
      }} /><div key={5} style={{
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
          }}>{"\u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0648\u0627\u0644\u062A\u062D\u0642\u0642"}</span></p></div><div key={6} style={{
        position: "absolute",
        left: "3674.65px",
        top: "576px",
        width: "2079.99px",
        height: "800.05px",
        boxSizing: "border-box",
        backgroundColor: "rgba(0, 0, 0, 0)",
        padding: "0px 0px 0px 0px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "right",
          lineHeight: "1.2",
          fontSize: "calc(204.8pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(204.8pt * var(--pptx-font-scale, 1))",
            fontFamily: "'Material Icons', sans-serif",
            color: "#A99FE3"
          }}>{"science"}</span></p><p style={{
          textAlign: "right",
          lineHeight: "1.2",
          fontSize: "calc(113.78pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(113.78pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontWeight: "700",
            color: "#FFFFFF"
          }}>{"\u0627\u0644\u0646\u0645\u0627\u0630\u062C \u0627\u0644\u0623\u0648\u0644\u064A\u0629 \u0648\u0627\u0644\u0646\u062A\u0627\u0626\u062C"}</span></p><p style={{
          textAlign: "right",
          lineHeight: "1.2",
          marginTop: "51.2pt",
          fontSize: "calc(60pt * var(--pptx-font-scale, 1))",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(60pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            color: "#CBD5E1"
          }}>{"\u0645\u0627 \u0647\u064A \u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0623\u0648\u0644\u064A\u0629 \u0623\u0648 \u0627\u0644\u0646\u0645\u0627\u0630\u062C \u0627\u0644\u0623\u0648\u0644\u064A\u0629 \u0627\u0644\u062A\u064A \u0642\u0645\u062A \u0628\u062A\u0637\u0648\u064A\u0631\u0647\u0627 \u0648\u0627\u0644\u0639\u0645\u0644 \u0639\u0644\u064A\u0647\u0627 \u062E\u0644\u0627\u0644 \u0647\u0630\u0647 \u0627\u0644\u0645\u0631\u062D\u0644\u0629 \u0644\u062F\u0639\u0645 \u0623\u0647\u062F\u0627\u0641 \u0645\u0634\u0631\u0648\u0639\u0643\u061F"}</span></p></div><div key={7} style={{
        position: "absolute",
        left: "901.33px",
        top: "576px",
        width: "2079.99px",
        height: "800.05px",
        boxSizing: "border-box",
        backgroundColor: "rgba(0, 0, 0, 0)",
        padding: "0px 0px 0px 0px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "right",
          lineHeight: "1.2",
          fontSize: "calc(204.8pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(204.8pt * var(--pptx-font-scale, 1))",
            fontFamily: "'Material Icons', sans-serif",
            color: "#A99FE3"
          }}>{"fact_check"}</span></p><p style={{
          textAlign: "right",
          lineHeight: "1.2",
          fontSize: "calc(113.78pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(113.78pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontWeight: "700",
            color: "#FFFFFF"
          }}>{"\u0645\u062B\u0627\u0644 \u062A\u0637\u0628\u064A\u0642\u064A \u0645\u0642\u062A\u0631\u062D"}</span></p><p style={{
          textAlign: "right",
          lineHeight: "1.2",
          marginTop: "51.2pt",
          fontSize: "calc(60pt * var(--pptx-font-scale, 1))",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(60pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            color: "#CBD5E1"
          }}>{"\"\u0642\u0645\u0646\u0627 \u0628\u0627\u062E\u062A\u0628\u0627\u0631 \u0646\u0645\u0648\u0630\u062C \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0648\u0636\u0639\u064A\u0627\u062A \u0639\u0644\u0649 50 \u0645\u0642\u0637\u0639 \u0641\u064A\u062F\u064A\u0648 \u062A\u062C\u0631\u064A\u0628\u064A\" \u0644\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u0641\u0627\u0639\u0644\u064A\u0629 \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0648\u062F\u0642\u0629 \u0627\u0644\u0645\u062E\u0631\u062C\u0627\u062A \u0642\u0628\u0644 \u0627\u0644\u0625\u0637\u0644\u0627\u0642."}</span></p></div></div></div>;
};
export default Slide9;
