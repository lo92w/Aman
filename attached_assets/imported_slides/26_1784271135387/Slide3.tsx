import React, { useState, useEffect, useRef } from "react";
import img_1 from "./assets/images/image_1.png";
import img_2 from "./assets/images/image_2.png";
import img_3 from "./assets/images/image_6.png";
const Slide3: React.FC = () => {
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
  return <div id="slide-3" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-3" style={{
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
        left: "677.01px",
        top: "273.68px",
        width: "5301.86px",
        height: "372.94px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        padding: "62.7px 62.7px 62.7px 62.7px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "center",
          lineHeight: "1.2",
          fontSize: "calc(182.88pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(182.88pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontWeight: "700",
            color: "#C36C4F"
          }}>{"\u0623\u0639\u0636\u0627\u0621 \u0627\u0644\u0641\u0631\u064A\u0642"}</span></p></div><div key={4} style={{
        position: "absolute",
        left: "4950.03px",
        top: "794.13px",
        width: "237.01px",
        height: "207.24px",
        boxSizing: "border-box",
        backgroundColor: "#A99FE3",
        borderRadius: "38.98px"
      }} /><div key={5} style={{
        position: "absolute",
        left: "4757.59px",
        top: "1003.03px",
        width: "621.89px",
        height: "248.03px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "37.46px 37.46px 37.46px 37.46px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "center",
          lineHeight: "2.4",
          fontSize: "calc(68.44pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(68.44pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic Medium', 'IBM Plex Sans Arabic', sans-serif",
            fontWeight: "500",
            color: "#FFFFFF"
          }}>{"\u0627\u0633\u0645 \u0627\u0644\u0639\u0636\u0648"}</span></p></div><img key={6} src={img_3} alt="Google Shape;94;p17" style={{
        position: "absolute",
        left: "5022.31px",
        top: "827.41px",
        width: "92.46px",
        height: "140.68px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><div key={7} style={{
        position: "absolute",
        left: "3601.59px",
        top: "1003.03px",
        width: "621.89px",
        height: "248.03px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "37.46px 37.46px 37.46px 37.46px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "center",
          lineHeight: "2.4",
          fontSize: "calc(68.44pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(68.44pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic Medium', 'IBM Plex Sans Arabic', sans-serif",
            fontWeight: "500",
            color: "#FFFFFF"
          }}>{"\u0627\u0633\u0645 \u0627\u0644\u0639\u0636\u0648"}</span></p></div><div key={8} style={{
        position: "absolute",
        left: "2429.59px",
        top: "1003.03px",
        width: "621.89px",
        height: "248.03px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "37.46px 37.46px 37.46px 37.46px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "center",
          lineHeight: "2.4",
          fontSize: "calc(68.44pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(68.44pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic Medium', 'IBM Plex Sans Arabic', sans-serif",
            fontWeight: "500",
            color: "#FFFFFF"
          }}>{"\u0627\u0633\u0645 \u0627\u0644\u0639\u0636\u0648"}</span></p></div><div key={9} style={{
        position: "absolute",
        left: "1273.59px",
        top: "1003.03px",
        width: "621.89px",
        height: "248.03px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "37.46px 37.46px 37.46px 37.46px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "center",
          lineHeight: "2.4",
          fontSize: "calc(68.44pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(68.44pt * var(--pptx-font-scale, 1))",
            fontFamily: "'IBM Plex Sans Arabic Medium', 'IBM Plex Sans Arabic', sans-serif",
            fontWeight: "500",
            color: "#FFFFFF"
          }}>{"\u0627\u0633\u0645 \u0627\u0644\u0639\u0636\u0648"}</span></p></div><div key={10} style={{
        position: "absolute",
        left: "3794.03px",
        top: "794.13px",
        width: "237.01px",
        height: "207.24px",
        boxSizing: "border-box",
        backgroundColor: "#A99FE3",
        borderRadius: "38.98px"
      }} /><img key={11} src={img_3} alt="Google Shape;99;p17" style={{
        position: "absolute",
        left: "3866.31px",
        top: "827.41px",
        width: "92.46px",
        height: "140.68px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><div key={12} style={{
        position: "absolute",
        left: "2622.03px",
        top: "794.13px",
        width: "237.01px",
        height: "207.24px",
        boxSizing: "border-box",
        backgroundColor: "#A99FE3",
        borderRadius: "38.98px"
      }} /><img key={13} src={img_3} alt="Google Shape;101;p17" style={{
        position: "absolute",
        left: "2694.31px",
        top: "827.41px",
        width: "92.46px",
        height: "140.68px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><div key={14} style={{
        position: "absolute",
        left: "1466.03px",
        top: "794.13px",
        width: "237.01px",
        height: "207.24px",
        boxSizing: "border-box",
        backgroundColor: "#A99FE3",
        borderRadius: "38.98px"
      }} /><img key={15} src={img_3} alt="Google Shape;103;p17" style={{
        position: "absolute",
        left: "1538.31px",
        top: "827.41px",
        width: "92.46px",
        height: "140.68px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /></div></div>;
};
export default Slide3;
