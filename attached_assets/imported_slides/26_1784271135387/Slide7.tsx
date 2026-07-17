import React, { useState, useEffect, useRef } from "react";
import img_1 from "./assets/images/image_1.png";
import img_2 from "./assets/images/image_2.png";
const Slide7: React.FC = () => {
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
  return <div id="slide-7" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-7" style={{
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
        left: "554.66px",
        top: "160px",
        width: "5546.64px",
        height: "192px"
      }}><div key={0} style={{
          position: "absolute",
          left: "0px",
          top: "0px",
          width: "5546.64px",
          height: "192px",
          boxSizing: "border-box",
          backgroundColor: "rgba(0, 0, 0, 0)"
        }} /><div key={1} style={{
          position: "absolute",
          left: "0px",
          top: "0px",
          width: "5546.64px",
          height: "192px",
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
            }}>{"\u0643\u064A\u0641\u064A\u0629 \u062A\u0648\u0641\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0648\u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0647\u0627"}</span></p></div></div><div key={4} style={{
        position: "absolute",
        left: "3500px",
        top: "500px",
        width: "2600px",
        height: "950.02px"
      }}><div key={0} style={{
          position: "absolute",
          left: "0px",
          top: "0px",
          width: "2600px",
          height: "950.02px",
          boxSizing: "border-box",
          backgroundColor: "#26264E",
          border: "8px solid #C36C4F",
          borderRadius: "40px"
        }} /><div key={1} style={{
          position: "absolute",
          left: "150px",
          top: "70px",
          width: "2300px",
          height: "810.02px",
          boxSizing: "border-box",
          backgroundColor: "transparent",
          padding: "0px 0px 0px 0px",
          wordWrap: "break-word"
        }}><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            fontSize: "calc(150pt * var(--pptx-font-scale, 1))",
            marginTop: "0",
            marginBottom: "0"
          }}><span style={{
              fontSize: "calc(150pt * var(--pptx-font-scale, 1))",
              fontFamily: "'Material Icons', sans-serif",
              color: "#C36C4F"
            }}>{"cloud_download"}</span></p><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            marginTop: "22.5pt",
            fontSize: "calc(100pt * var(--pptx-font-scale, 1))",
            marginBottom: "0"
          }}><span style={{
              fontSize: "calc(100pt * var(--pptx-font-scale, 1))",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              fontWeight: "700",
              color: "#FFFFFF"
            }}>{"\u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"}</span></p><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            marginTop: "30pt",
            fontSize: "calc(58pt * var(--pptx-font-scale, 1))",
            marginBottom: "0"
          }}><span style={{
              fontSize: "calc(58pt * var(--pptx-font-scale, 1))",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              color: "#CBD5E1"
            }}>{"\u064A\u0648\u0636\u062D \u0647\u0630\u0627 \u0627\u0644\u062C\u0627\u0646\u0628 \u0627\u0644\u0637\u0631\u0642 \u0648\u0627\u0644\u0642\u0646\u0648\u0627\u062A \u0627\u0644\u062A\u064A \u062A\u0645 \u0645\u0646 \u062E\u0644\u0627\u0644\u0647\u0627 \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0629 \u0641\u064A \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0648\u062A\u0623\u0645\u064A\u0646\u0647\u0627."}</span></p></div></div><div key={5} style={{
        position: "absolute",
        left: "554px",
        top: "500px",
        width: "2600px",
        height: "950.02px"
      }}><div key={0} style={{
          position: "absolute",
          left: "0px",
          top: "0px",
          width: "2600px",
          height: "950.02px",
          boxSizing: "border-box",
          backgroundColor: "#26264E",
          border: "8px solid #C36C4F",
          borderRadius: "40px"
        }} /><div key={1} style={{
          position: "absolute",
          left: "150px",
          top: "70px",
          width: "2300px",
          height: "810.02px",
          boxSizing: "border-box",
          backgroundColor: "transparent",
          padding: "0px 0px 0px 0px",
          wordWrap: "break-word"
        }}><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            fontSize: "calc(150pt * var(--pptx-font-scale, 1))",
            marginTop: "0",
            marginBottom: "0"
          }}><span style={{
              fontSize: "calc(150pt * var(--pptx-font-scale, 1))",
              fontFamily: "'Material Icons', sans-serif",
              color: "#C36C4F"
            }}>{"analytics"}</span></p><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            marginTop: "22.5pt",
            fontSize: "calc(100pt * var(--pptx-font-scale, 1))",
            marginBottom: "0"
          }}><span style={{
              fontSize: "calc(100pt * var(--pptx-font-scale, 1))",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              fontWeight: "700",
              color: "#FFFFFF"
            }}>{"\u062A\u062D\u0644\u064A\u0644 \u0648\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"}</span></p><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            marginTop: "30pt",
            fontSize: "calc(58pt * var(--pptx-font-scale, 1))",
            marginBottom: "0"
          }}><span style={{
              fontSize: "calc(58pt * var(--pptx-font-scale, 1))",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              color: "#CBD5E1"
            }}>{"\u064A\u0634\u0631\u062D \u0643\u064A\u0641\u064A\u0629 \u062A\u0648\u0638\u064A\u0641 \u0648\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641\u0629 \u0644\u062A\u062D\u0642\u064A\u0642 \u0643\u0627\u0645\u0644 \u0623\u0647\u062F\u0627\u0641 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0648\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0646\u0647\u0627\u0626\u064A\u0629 \u0628\u062F\u0642\u0629."}</span></p></div></div></div></div>;
};
export default Slide7;
