import React, { useState, useEffect, useRef } from "react";
import img_1 from "./assets/images/image_1.png";
import img_2 from "./assets/images/image_2.png";
import img_3 from "./assets/images/image_3.png";
import img_4 from "./assets/images/image_4.png";
import img_5 from "./assets/images/image_5.png";
const Slide1: React.FC = () => {
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
  return <div id="slide-1" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-1" style={{
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
        left: "1424.87px",
        top: "742.1px",
        width: "3806.24px",
        height: "504.54px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        padding: "80.3px 80.3px 80.3px 80.3px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "right",
          lineHeight: "1.2",
          fontSize: "calc(252.13pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(252.13pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontWeight: "700",
            color: "#ffffff"
          }}>{"\u0627\u0633\u0645 \u0627\u0644\u0641\u0631\u064A\u0642 "}</span></p></div><div key={3} style={{
        position: "absolute",
        left: "3036.93px",
        top: "558.26px",
        width: "2194.2px",
        height: "245.32px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        padding: "80.3px 80.3px 80.3px 80.3px",
        ["--pptx-font-scale"]: "0.9",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "right",
          lineHeight: "1.2",
          fontSize: "calc(127.16pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(127.16pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontWeight: "700",
            color: "#C36C4F"
          }}>{"\u0627\u0644\u0645\u0633\u0627\u0631"}</span></p></div><img key={4} src={img_3} alt="Google Shape;65;p15" style={{
        position: "absolute",
        left: "802.72px",
        top: "224.75px",
        width: "646.33px",
        height: "126.87px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={5} src={img_4} alt="Google Shape;66;p15" style={{
        position: "absolute",
        left: "5869.72px",
        top: "129.2px",
        width: "519.53px",
        height: "317.96px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={6} src={img_5} alt="Google Shape;67;p15" style={{
        position: "absolute",
        left: "281.72px",
        top: "212.33px",
        width: "399.84px",
        height: "151.7px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /></div></div>;
};
export default Slide1;
