import React, { useState, useEffect, useRef } from "react";
const base = import.meta.env.BASE_URL;
const Slide10: React.FC = () => {
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
    <div id="slide-10" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{ backgroundColor: "#000" }}>
      <div id="slide-inner-10" style={{
        position: "absolute", width: "6656px", height: "1728px", overflow: "hidden",
        transformOrigin: "top left", color: "#FFFFFF", backgroundColor: "#212145",
        transform: `scale(${layout.s})`, left: layout.x + "px", top: layout.y + "px"
      }}>
        <img crossOrigin="anonymous" src={`${base}slide-images/image_1.png`} alt="bg-left" style={{ position: "absolute", left: "0px", top: "0px", width: "3072px", height: "1728px", objectFit: "fill" }} />
        <img crossOrigin="anonymous" src={`${base}slide-images/image_2.png`} alt="bg-right" style={{ position: "absolute", left: "0px", top: "0px", width: "3072px", height: "1728px", objectFit: "fill" }} />
        {/* Title */}
        <div style={{ position: "absolute", left: "416px", top: "160px", width: "5824px", height: "192px", backgroundColor: "rgba(0,0,0,0)", display: "flex", flexDirection: "column", justifyContent: "center", wordWrap: "break-word" }}>
          <p style={{ textAlign: "right", lineHeight: "1.2", fontSize: "calc(159.29pt * var(--pptx-font-scale, 1))", marginTop: "0", marginBottom: "0" }}>
            <span style={{ fontSize: "calc(159.29pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: "700", color: "#C36C4F" }}>{"العرض التوضيحي (لقطات - فيديوهات - محاكاة)"}</span>
          </p>
        </div>
        {/* Screenshot card */}
        <div style={{ position: "absolute", left: "1470.52px", top: "480px", width: "1526.94px", height: "928.05px" }}>
          <div style={{ position: "absolute", left: "0px", top: "0px", width: "1526.94px", height: "928.05px", boxSizing: "border-box", backgroundColor: "rgba(30,27,75,0.4)", border: "8.54px solid #2D2A54", borderRadius: "51.2px" }} />
          <div style={{ position: "absolute", left: "50.9px", top: "38.4px", width: "1425.14px", height: "851.25px", boxSizing: "border-box", borderRadius: "38.4px", overflow: "hidden", backgroundColor: "#1a1a3e", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img crossOrigin="anonymous" src={`${base}slide-images/image_7.jpg`} alt="app-screenshot" style={{ position: "absolute", left: "-39.63px", top: "0px", width: "1504.39px", height: "851.25px", maxWidth: "none", objectFit: "cover" }} />
          </div>
        </div>
        {/* Info card */}
        <div style={{ position: "absolute", left: "3226.11px", top: "480px", width: "2875.25px", height: "928.05px" }}>
          <div style={{ position: "absolute", left: "0px", top: "0px", width: "2875.25px", height: "928.05px", boxSizing: "border-box", backgroundColor: "rgba(30,27,75,0.4)", border: "8.54px solid #2D2A54", borderRadius: "67.49px" }} />
          <div style={{ position: "absolute", left: "261.39px", top: "64px", width: "2352.47px", height: "800.05px", backgroundColor: "transparent", wordWrap: "break-word" }}>
            <p style={{ textAlign: "right", lineHeight: "1.2", fontSize: "calc(159.29pt * var(--pptx-font-scale, 1))", marginTop: "0", marginBottom: "0" }}>
              <span style={{ fontSize: "calc(159.29pt * var(--pptx-font-scale, 1))", fontFamily: "'Material Icons', sans-serif", color: "#C36C4F" }}>{"track_changes"}</span>
            </p>
            <p style={{ textAlign: "right", lineHeight: "1.2", marginTop: "34.13pt", fontSize: "calc(85.33pt * var(--pptx-font-scale, 1))", marginBottom: "0" }}>
              <span style={{ fontSize: "calc(85.33pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: "700", color: "#FFFFFF" }}>{"هدف العرض"}</span>
            </p>
            <p style={{ textAlign: "right", lineHeight: "1.3", marginTop: "34.13pt", fontSize: "calc(62.58pt * var(--pptx-font-scale, 1))", marginBottom: "0" }}>
              <span style={{ fontSize: "calc(62.58pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "#CBD5E1" }}>{"إظهار أن ما تم إنجازه "}</span>
              <span style={{ fontSize: "calc(62.58pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: "700", color: "#C36C4F" }}>{"نموذج أولي حقيقي"}</span>
              <span style={{ fontSize: "calc(62.58pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "#CBD5E1" }}>{" يعمل بالكامل: تحليل التحويل في الوقت الفعلي — مسار الحماية الديناميكي — محاكاة سيناريوهات الاحتيال الأربعة"}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Slide10;
