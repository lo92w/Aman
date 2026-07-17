import React, { useState, useEffect, useRef } from "react";
import img_1 from "./assets/images/image_1.png";
import img_2 from "./assets/images/image_2.png";
const Slide11: React.FC = () => {
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
  return <div id="slide-11" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-11" style={{
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
          }}>{"\u0627\u0644\u062A\u062D\u062F\u064A\u0627\u062A \u0648\u0627\u0644\u062E\u0637\u0637 \u0627\u0644\u0645\u0633\u062A\u0642\u0628\u0644\u064A\u0629"}</span></p></div><div key={3} style={{
        position: "absolute",
        left: "4437.33px",
        top: "448px",
        width: "1802.68px",
        height: "1024px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        padding: "136.53px 136.53px 136.53px 136.53px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "right",
          lineHeight: "1.2",
          fontSize: "calc(136.53pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(136.53pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontWeight: "700",
            color: "#BCA6FF"
          }}>{"01"}</span></p><p style={{
          textAlign: "right",
          lineHeight: "1.2",
          marginTop: "51.2pt",
          fontSize: "calc(91.02pt * var(--pptx-font-scale, 1))",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(91.02pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontWeight: "700",
            color: "#BCA6FF"
          }}>{"\u0627\u0644\u062A\u062D\u062F\u064A\u0627\u062A"}</span></p><p style={{
          textAlign: "right",
          lineHeight: "1.2",
          marginTop: "51.2pt",
          fontSize: "calc(62.58pt * var(--pptx-font-scale, 1))",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(62.58pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            color: "#FFFFFF"
          }}>{"\u0645\u0627 \u0647\u064A \u0627\u0644\u0639\u0648\u0627\u0626\u0642 \u0627\u0644\u062A\u064A \u062A\u0648\u0627\u062C\u0647\u0643\u061F"}</span></p><p style={{
          textAlign: "right",
          lineHeight: "1.2",
          marginTop: "34.13pt",
          fontSize: "calc(59.73pt * var(--pptx-font-scale, 1))",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(59.73pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            color: "#A5B4FC"
          }}>{"(\u0645\u062B\u0644 \u063A\u064A\u0627\u0628 \u0627\u0644\u0623\u062F\u0644\u0629 \u0627\u0644\u062A\u062C\u0631\u064A\u0628\u064A\u0629 \u0623\u0648 \u0627\u0644\u0642\u064A\u0648\u062F \u0627\u0644\u062D\u0633\u0627\u0628\u064A\u0629)."}</span></p></div><div key={4} style={{
        position: "absolute",
        left: "2426.67px",
        top: "448px",
        width: "1802.68px",
        height: "1024px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        padding: "136.53px 136.53px 136.53px 136.53px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "right",
          lineHeight: "1.2",
          fontSize: "calc(136.53pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(136.53pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontWeight: "700",
            color: "#BCA6FF"
          }}>{"02"}</span></p><p style={{
          textAlign: "right",
          lineHeight: "1.2",
          marginTop: "51.2pt",
          fontSize: "calc(91.02pt * var(--pptx-font-scale, 1))",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(91.02pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontWeight: "700",
            color: "#BCA6FF"
          }}>{"\u0645\u0627 \u062A\u062D\u062A\u0627\u062C \u0625\u0644\u0649 \u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629 \u0641\u064A\u0647"}</span></p><p style={{
          textAlign: "right",
          lineHeight: "1.2",
          marginTop: "51.2pt",
          fontSize: "calc(62.58pt * var(--pptx-font-scale, 1))",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(62.58pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            color: "#FFFFFF"
          }}>{"\u0643\u064A\u0641 \u064A\u0645\u0643\u0646 \u0645\u0633\u0627\u0639\u062F\u062A\u0643\u061F"}</span></p><p style={{
          textAlign: "right",
          lineHeight: "1.2",
          marginTop: "34.13pt",
          fontSize: "calc(59.73pt * var(--pptx-font-scale, 1))",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(59.73pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            color: "#A5B4FC"
          }}>{"(\u0645\u062B\u0644 \u062A\u0648\u0641\u064A\u0631 \u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0648\u0627\u062C\u0647\u0627\u062A \u0628\u0631\u0645\u062C\u064A\u0629 API \u0623\u0648 \u0627\u0644\u0623\u062C\u0647\u0632\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629)."}</span></p></div><div key={5} style={{
        position: "absolute",
        left: "416px",
        top: "448px",
        width: "1802.68px",
        height: "1024px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        padding: "136.53px 136.53px 136.53px 136.53px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "right",
          lineHeight: "1.2",
          fontSize: "calc(136.53pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(136.53pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontWeight: "700",
            color: "#BCA6FF"
          }}>{"03"}</span></p><p style={{
          textAlign: "right",
          lineHeight: "1.2",
          marginTop: "51.2pt",
          fontSize: "calc(91.02pt * var(--pptx-font-scale, 1))",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(91.02pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontWeight: "700",
            color: "#BCA6FF"
          }}>{"\u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0645\u0633\u062A\u0642\u0628\u0644\u064A"}</span></p><p style={{
          textAlign: "right",
          lineHeight: "1.2",
          marginTop: "51.2pt",
          fontSize: "calc(62.58pt * var(--pptx-font-scale, 1))",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(62.58pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            color: "#FFFFFF"
          }}>{"\u062A\u0623\u0643\u062F \u0645\u0646 \u0639\u0631\u0636 \u062E\u0627\u0631\u0637\u0629 \u0627\u0644\u0637\u0631\u064A\u0642 \u0627\u0644\u062A\u064A \u062A\u063A\u0637\u064A 70% \u0645\u0646 \u0627\u0644\u062A\u0642\u062F\u0645."}</span></p><p style={{
          textAlign: "right",
          lineHeight: "1.2",
          marginTop: "34.13pt",
          fontSize: "calc(59.73pt * var(--pptx-font-scale, 1))",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(59.73pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            color: "#A5B4FC"
          }}>{"\u062D\u064A\u062B \u062A\u0635\u0641 \u062E\u0637\u0629 \u0627\u0644\u0623\u0633\u0628\u0648\u0639\u064A\u0646 \u0627\u0644\u0645\u0642\u0628\u0644\u064A\u0646 \u0648\u0627\u0644\u0623\u0647\u062F\u0627\u0641 \u0627\u0644\u0645\u0631\u062C\u0648 \u062A\u062D\u0642\u064A\u0642\u0647\u0627."}</span></p></div><svg key={6} style={{
        position: "absolute",
        left: "6186.3px",
        top: "612.9px",
        width: "1px",
        height: "217.67px",
        overflow: "visible"
      }}><line x1="0" y1="0" x2="0" y2="217.67" stroke="#BCA6FF" strokeWidth="8" /></svg><svg key={7} style={{
        position: "absolute",
        left: "4158.57px",
        top: "612.9px",
        width: "1px",
        height: "217.67px",
        overflow: "visible"
      }}><line x1="0" y1="0" x2="0" y2="217.67" stroke="#BCA6FF" strokeWidth="8" /></svg><svg key={8} style={{
        position: "absolute",
        left: "2130.83px",
        top: "612.9px",
        width: "1px",
        height: "217.67px",
        overflow: "visible"
      }}><line x1="0" y1="0" x2="0" y2="217.67" stroke="#BCA6FF" strokeWidth="8" /></svg></div></div>;
};
export default Slide11;
