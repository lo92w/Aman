import React, { useState, useEffect, useRef } from "react";
import img_1 from "./assets/images/image_1.png";
import img_2 from "./assets/images/image_2.png";
import img_3 from "./assets/images/image_7.jpg";
const Slide10: React.FC = () => {
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
  return <div id="slide-10" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-10" style={{
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
      }} /><div key={2} style={{
        position: "absolute",
        left: "416px",
        top: "160px",
        width: "5824px",
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
          }}>{"\u0627\u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0648\u0636\u064A\u062D\u064A (\u0644\u0642\u0637\u0627\u062A - \u0641\u064A\u062F\u064A\u0648\u0647\u0627\u062A - \u0645\u062D\u0627\u0643\u0627\u0629)"}</span></p></div><div key={3} style={{
        position: "absolute",
        left: "1470.52px",
        top: "480px",
        width: "1526.94px",
        height: "928.05px"
      }}><div key={0} style={{
          position: "absolute",
          left: "0px",
          top: "0px",
          width: "1526.94px",
          height: "928.05px",
          boxSizing: "border-box",
          backgroundColor: "rgba(30, 27, 75, 0.4)",
          border: "8.54px solid #2D2A54",
          borderRadius: "51.2px"
        }} /><div key={1} style={{
          position: "absolute",
          left: "50.9px",
          top: "38.4px",
          width: "1425.14px",
          height: "851.25px",
          boxSizing: "border-box",
          borderRadius: "38.4px",
          overflow: "hidden"
        }}><img src={img_3} alt="A modern software dashboard displaying a digital simulation interface, clean dark UI, futuristic design" style={{
            position: "absolute",
            left: "-39.63px",
            top: "0px",
            width: "1504.39px",
            height: "851.25px",
            maxWidth: "none"
          }} /></div><div key={2} style={{
          position: "absolute",
          left: "636.23px",
          top: "368px",
          width: "254.49px",
          height: "192px",
          boxSizing: "border-box",
          backgroundColor: "rgba(0, 0, 0, 0)"
        }} /></div><div key={4} style={{
        position: "absolute",
        left: "3226.11px",
        top: "480px",
        width: "2875.25px",
        height: "928.05px"
      }}><div key={0} style={{
          position: "absolute",
          left: "0px",
          top: "0px",
          width: "2875.25px",
          height: "928.05px",
          boxSizing: "border-box",
          backgroundColor: "rgba(30, 27, 75, 0.4)",
          border: "8.54px solid #2D2A54",
          borderRadius: "67.49px"
        }} /><div key={1} style={{
          position: "absolute",
          left: "261.39px",
          top: "64px",
          width: "2352.47px",
          height: "800.05px",
          boxSizing: "border-box",
          backgroundColor: "transparent",
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
              fontFamily: "'Material Icons', sans-serif",
              color: "#C36C4F"
            }}>{"track_changes"}</span></p><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            marginTop: "34.13pt",
            fontSize: "calc(85.33pt * var(--pptx-font-scale, 1))",
            marginBottom: "0"
          }}><span style={{
              fontSize: "calc(85.33pt * var(--pptx-font-scale, 1))",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              fontWeight: "700",
              color: "#FFFFFF"
            }}>{"\u0627\u0644\u0647\u062F\u0641 \u0645\u0646 \u0627\u0644\u0639\u0631\u0636"}</span></p><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            marginTop: "34.13pt",
            fontSize: "calc(62.58pt * var(--pptx-font-scale, 1))",
            marginBottom: "0"
          }}><span style={{
              fontSize: "calc(62.58pt * var(--pptx-font-scale, 1))",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              color: "#CBD5E1"
            }}>{"\u0627\u0644\u0647\u062F\u0641 \u0627\u0644\u0623\u0633\u0627\u0633\u064A \u0647\u0648 \u0625\u0638\u0647\u0627\u0631 \u0645\u0627 \u0625\u0630\u0627 \u0643\u0627\u0646 \u0642\u062F \u062A\u0645 \u0625\u0646\u062C\u0627\u0632 "}</span><span style={{
              fontSize: "calc(62.58pt * var(--pptx-font-scale, 1))",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              fontWeight: "700",
              color: "#C36C4F"
            }}>{"30%"}</span><span style={{
              fontSize: "calc(62.58pt * var(--pptx-font-scale, 1))",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              color: "#CBD5E1"
            }}>{" \u0645\u0646 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0628\u0634\u0643\u0644 \u0641\u0639\u0644\u064A \u0648\u0645\u0644\u0645\u0648\u0633 \u0645\u0646 \u062E\u0644\u0627\u0644 \u0627\u0644\u0644\u0642\u0637\u0627\u062A \u0623\u0648 \u0627\u0644\u0641\u064A\u062F\u064A\u0648\u0647\u0627\u062A."}</span></p></div></div></div></div>;
};
export default Slide10;
