import React, { useState, useEffect, useRef } from "react";
import img_1 from "./assets/images/image_1.png";
import img_2 from "./assets/images/image_2.png";
const Slide8: React.FC = () => {
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
  return <div id="slide-8" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-8" style={{
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
          }}>{"\u0627\u0644\u062A\u0642\u0646\u064A\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0629"}</span></p></div><div key={4} style={{
        position: "absolute",
        left: "554.67px",
        top: "384px",
        width: "5546.68px",
        height: "128px",
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
          fontSize: "calc(79.64pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(79.64pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            color: "#E2E8F0"
          }}>{"\u064A\u0639\u0631\u0636 \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062A\u0642\u0646\u064A\u0627\u062A \u0627\u0644\u0645\u062E\u062A\u0644\u0641\u0629 \u0627\u0644\u062A\u064A \u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0647\u0627 \u0641\u064A \u0627\u0644\u0645\u0634\u0631\u0648\u0639:"}</span></p></div><div key={5} style={{
        position: "absolute",
        left: "600px",
        top: "600px",
        width: "5456px",
        height: "880px"
      }}><div key={0} style={{
          position: "absolute",
          left: "3756px",
          top: "0px",
          width: "1700px",
          height: "880px",
          boxSizing: "border-box",
          backgroundColor: "#26264E",
          border: "6px solid #C36C4F",
          borderRadius: "40px"
        }} /><div key={1} style={{
          position: "absolute",
          left: "3856px",
          top: "60px",
          width: "1500px",
          height: "760px",
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
              color: "#C36C4F"
            }}>{"code"}</span></p><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            marginTop: "22.5pt",
            fontSize: "calc(90pt * var(--pptx-font-scale, 1))",
            marginBottom: "0"
          }}><span style={{
              fontSize: "calc(90pt * var(--pptx-font-scale, 1))",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              fontWeight: "700",
              color: "#FFFFFF"
            }}>{"\u0627\u0644\u0644\u063A\u0627\u062A \u0627\u0644\u0628\u0631\u0645\u062C\u064A\u0629"}</span></p><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            marginTop: "22.5pt",
            fontSize: "calc(52pt * var(--pptx-font-scale, 1))",
            marginBottom: "0"
          }}><span style={{
              fontSize: "calc(52pt * var(--pptx-font-scale, 1))",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              color: "#94A3B8"
            }}>{"\u0627\u0644\u0644\u063A\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0629 \u0641\u064A \u062A\u0637\u0648\u064A\u0631 \u0627\u0644\u0645\u0634\u0631\u0648\u0639:"}</span></p><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            marginTop: "30pt",
            textIndent: "-56px",
            paddingLeft: "48px",
            fontSize: "calc(48pt * var(--pptx-font-scale, 1))",
            marginBottom: "0"
          }}><span style={{
              marginRight: "8px",
              color: "#CBD5E1",
              fontSize: "48pt"
            }}>{"\u25CF"}</span><span style={{
              fontSize: "calc(48pt * var(--pptx-font-scale, 1))",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              color: "#CBD5E1"
            }}>{"\u0644\u063A\u0629 \u0627\u0644\u0628\u0631\u0645\u062C\u0629 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629"}</span></p><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            marginTop: "15pt",
            textIndent: "-56px",
            paddingLeft: "48px",
            fontSize: "calc(48pt * var(--pptx-font-scale, 1))",
            marginBottom: "0"
          }}><span style={{
              marginRight: "8px",
              color: "#CBD5E1",
              fontSize: "48pt"
            }}>{"\u25CF"}</span><span style={{
              fontSize: "calc(48pt * var(--pptx-font-scale, 1))",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              color: "#CBD5E1"
            }}>{"\u0644\u063A\u0627\u062A \u062A\u0637\u0648\u064A\u0631 \u0627\u0644\u0648\u0627\u062C\u0647\u0627\u062A"}</span></p></div><div key={2} style={{
          position: "absolute",
          left: "1878px",
          top: "0px",
          width: "1700px",
          height: "880px",
          boxSizing: "border-box",
          backgroundColor: "#26264E",
          border: "6px solid #C36C4F",
          borderRadius: "40px"
        }} /><div key={3} style={{
          position: "absolute",
          left: "1978px",
          top: "60px",
          width: "1500px",
          height: "760px",
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
              color: "#C36C4F"
            }}>{"layers"}</span></p><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            marginTop: "22.5pt",
            fontSize: "calc(90pt * var(--pptx-font-scale, 1))",
            marginBottom: "0"
          }}><span style={{
              fontSize: "calc(90pt * var(--pptx-font-scale, 1))",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              fontWeight: "700",
              color: "#FFFFFF"
            }}>{"\u0627\u0644\u0623\u0637\u0631 \u0627\u0644\u062A\u0642\u0646\u064A\u0629"}</span></p><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            marginTop: "22.5pt",
            fontSize: "calc(52pt * var(--pptx-font-scale, 1))",
            marginBottom: "0"
          }}><span style={{
              fontSize: "calc(52pt * var(--pptx-font-scale, 1))",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              color: "#94A3B8"
            }}>{"\u0627\u0644\u0645\u0643\u062A\u0628\u0627\u062A \u0648\u0623\u0637\u0631 \u0627\u0644\u0639\u0645\u0644 \u0644\u062A\u0633\u0631\u064A\u0639 \u0627\u0644\u062A\u0637\u0648\u064A\u0631:"}</span></p><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            marginTop: "30pt",
            textIndent: "-56px",
            paddingLeft: "48px",
            fontSize: "calc(48pt * var(--pptx-font-scale, 1))",
            marginBottom: "0"
          }}><span style={{
              marginRight: "8px",
              color: "#CBD5E1",
              fontSize: "48pt"
            }}>{"\u25CF"}</span><span style={{
              fontSize: "calc(48pt * var(--pptx-font-scale, 1))",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              color: "#CBD5E1"
            }}>{"\u0625\u0637\u0627\u0631 \u0639\u0645\u0644 \u0627\u0644\u0648\u0627\u062C\u0647\u0629 \u0627\u0644\u062E\u0644\u0641\u064A\u0629"}</span></p><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            marginTop: "15pt",
            textIndent: "-56px",
            paddingLeft: "48px",
            fontSize: "calc(48pt * var(--pptx-font-scale, 1))",
            marginBottom: "0"
          }}><span style={{
              marginRight: "8px",
              color: "#CBD5E1",
              fontSize: "48pt"
            }}>{"\u25CF"}</span><span style={{
              fontSize: "calc(48pt * var(--pptx-font-scale, 1))",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              color: "#CBD5E1"
            }}>{"\u0645\u0643\u062A\u0628\u0627\u062A \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"}</span></p></div><div key={4} style={{
          position: "absolute",
          left: "0px",
          top: "0px",
          width: "1700px",
          height: "880px",
          boxSizing: "border-box",
          backgroundColor: "#26264E",
          border: "6px solid #C36C4F",
          borderRadius: "40px"
        }} /><div key={5} style={{
          position: "absolute",
          left: "100px",
          top: "60px",
          width: "1500px",
          height: "760px",
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
              color: "#C36C4F"
            }}>{"build"}</span></p><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            marginTop: "22.5pt",
            fontSize: "calc(90pt * var(--pptx-font-scale, 1))",
            marginBottom: "0"
          }}><span style={{
              fontSize: "calc(90pt * var(--pptx-font-scale, 1))",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              fontWeight: "700",
              color: "#FFFFFF"
            }}>{"\u0627\u0644\u0623\u062F\u0648\u0627\u062A \u0627\u0644\u0628\u0631\u0645\u062C\u064A\u0629"}</span></p><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            marginTop: "22.5pt",
            fontSize: "calc(52pt * var(--pptx-font-scale, 1))",
            marginBottom: "0"
          }}><span style={{
              fontSize: "calc(52pt * var(--pptx-font-scale, 1))",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              color: "#94A3B8"
            }}>{"\u0623\u062F\u0648\u0627\u062A \u0627\u0644\u062A\u0637\u0648\u064A\u0631 \u0648\u0627\u0644\u0628\u064A\u0626\u0627\u062A \u0627\u0644\u0628\u0631\u0645\u062C\u064A\u0629:"}</span></p><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            marginTop: "30pt",
            textIndent: "-56px",
            paddingLeft: "48px",
            fontSize: "calc(48pt * var(--pptx-font-scale, 1))",
            marginBottom: "0"
          }}><span style={{
              marginRight: "8px",
              color: "#CBD5E1",
              fontSize: "48pt"
            }}>{"\u25CF"}</span><span style={{
              fontSize: "calc(48pt * var(--pptx-font-scale, 1))",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              color: "#CBD5E1"
            }}>{"\u0628\u064A\u0626\u0629 \u0627\u0644\u062A\u0637\u0648\u064A\u0631 \u0627\u0644\u0645\u062A\u0643\u0627\u0645\u0644\u0629"}</span></p><p style={{
            textAlign: "right",
            lineHeight: "1.2",
            marginTop: "15pt",
            textIndent: "-56px",
            paddingLeft: "48px",
            fontSize: "calc(48pt * var(--pptx-font-scale, 1))",
            marginBottom: "0"
          }}><span style={{
              marginRight: "8px",
              color: "#CBD5E1",
              fontSize: "48pt"
            }}>{"\u25CF"}</span><span style={{
              fontSize: "calc(48pt * var(--pptx-font-scale, 1))",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              color: "#CBD5E1"
            }}>{"\u0623\u062F\u0648\u0627\u062A \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0646\u0633\u062E \u0648\u0627\u0644\u062A\u062D\u0643\u0645"}</span></p></div></div></div></div>;
};
export default Slide8;
