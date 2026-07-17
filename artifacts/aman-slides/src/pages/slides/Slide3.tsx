import React, { useState, useEffect, useRef } from "react";
const base = import.meta.env.BASE_URL;
const Slide3: React.FC = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState({ s: 1, x: 0, y: 0 });
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth; const h = el.clientHeight;
      const s = Math.min(w / 6656, h / 1728);
      setLayout({ s, x: (w - 6656 * s) / 2, y: (h - 1728 * s) / 2 });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div id="slide-3" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{ backgroundColor: "#000" }}>
      <div id="slide-inner-3" style={{
        position: "absolute", width: "6656px", height: "1728px", overflow: "hidden",
        transformOrigin: "top left", color: "#FFFFFF", backgroundColor: "#212145",
        transform: `scale(${layout.s})`, left: layout.x + "px", top: layout.y + "px"
      }}>
        <img crossOrigin="anonymous" src={`${base}slide-images/image_1.png`} alt="bg-left" style={{ position: "absolute", left: "0px", top: "0px", width: "3072px", height: "1728px", objectFit: "fill" }} />
        <img crossOrigin="anonymous" src={`${base}slide-images/image_2.png`} alt="bg" style={{ position: "absolute", left: "-85.5px", top: "0px", width: "6885px", height: "1728px", objectFit: "fill" }} />
        {/* Title */}
        <div style={{ position: "absolute", left: "677.01px", top: "273.68px", width: "5301.86px", height: "372.94px", backgroundColor: "transparent", padding: "62.7px 62.7px 62.7px 62.7px", wordWrap: "break-word" }}>
          <p style={{ textAlign: "center", lineHeight: "1.2", fontSize: "calc(182.88pt * var(--pptx-font-scale, 1))", marginTop: "0", marginBottom: "0" }}>
            <span style={{ fontSize: "calc(182.88pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: "700", color: "#C36C4F" }}>{"صانع المشروع"}</span>
          </p>
        </div>
        {/* Single member card centered */}
        <div style={{ position: "absolute", left: "3011.52px", top: "794.13px", width: "633.01px", height: "207.24px", backgroundColor: "#A99FE3", borderRadius: "38.98px" }} />
        <img crossOrigin="anonymous" src={`${base}slide-images/image_6.png`} alt="member-icon" style={{ position: "absolute", left: "3276.31px", top: "827.41px", width: "92.46px", height: "140.68px", objectFit: "fill" }} />
        <div style={{ position: "absolute", left: "1779.59px", top: "1003.03px", width: "3096.89px", height: "248.03px", backgroundColor: "transparent", display: "flex", flexDirection: "column", justifyContent: "center", padding: "37.46px 37.46px 37.46px 37.46px", wordWrap: "break-word" }}>
          <p style={{ textAlign: "center", lineHeight: "2.4", fontSize: "calc(90pt * var(--pptx-font-scale, 1))", marginTop: "0", marginBottom: "0" }}>
            <span style={{ fontSize: "calc(90pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: "500", color: "#FFFFFF" }}>{"الياس المهداوي"}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Slide3;
