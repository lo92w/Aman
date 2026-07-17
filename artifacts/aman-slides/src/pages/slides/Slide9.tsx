import React, { useState, useEffect, useRef } from "react";
const base = import.meta.env.BASE_URL;
const Slide9: React.FC = () => {
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
    <div id="slide-9" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{ backgroundColor: "#000" }}>
      <div id="slide-inner-9" style={{
        position: "absolute", width: "6656px", height: "1728px", overflow: "hidden",
        transformOrigin: "top left", color: "#FFFFFF", backgroundColor: "#212145",
        transform: `scale(${layout.s})`, left: layout.x + "px", top: layout.y + "px"
      }}>
        <img crossOrigin="anonymous" src={`${base}slide-images/image_1.png`} alt="bg-left" style={{ position: "absolute", left: "0px", top: "0px", width: "3072px", height: "1728px", objectFit: "fill" }} />
        <img crossOrigin="anonymous" src={`${base}slide-images/image_2.png`} alt="bg" style={{ position: "absolute", left: "-85.5px", top: "0px", width: "6885px", height: "1728px", objectFit: "fill" }} />
        {/* Card backgrounds */}
        <div style={{ position: "absolute", left: "733.19px", top: "515.52px", width: "2463.06px", height: "1031.56px", boxSizing: "border-box", backgroundColor: "rgba(30,27,75,0.61)", borderRadius: "115.3px" }} />
        <div style={{ position: "absolute", left: "3465.47px", top: "515.52px", width: "2463.06px", height: "1031.56px", boxSizing: "border-box", backgroundColor: "rgba(30,27,75,0.61)", borderRadius: "115.3px" }} />
        {/* Title */}
        <div style={{ position: "absolute", left: "554.67px", top: "160px", width: "5546.68px", height: "192px", backgroundColor: "rgba(0,0,0,0)", display: "flex", flexDirection: "column", justifyContent: "center", wordWrap: "break-word" }}>
          <p style={{ textAlign: "right", lineHeight: "1.2", fontSize: "calc(159.29pt * var(--pptx-font-scale, 1))", marginTop: "0", marginBottom: "0" }}>
            <span style={{ fontSize: "calc(159.29pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: "700", color: "#C36C4F" }}>{"الاختبار والتحقق"}</span>
          </p>
        </div>
        {/* Card right - results */}
        <div style={{ position: "absolute", left: "3674.65px", top: "576px", width: "2079.99px", height: "800.05px", backgroundColor: "rgba(0,0,0,0)", wordWrap: "break-word" }}>
          <p style={{ textAlign: "right", lineHeight: "1.2", fontSize: "calc(204.8pt * var(--pptx-font-scale, 1))", marginTop: "0", marginBottom: "0" }}>
            <span style={{ fontSize: "calc(204.8pt * var(--pptx-font-scale, 1))", fontFamily: "'Material Icons', sans-serif", color: "#A99FE3" }}>{"science"}</span>
          </p>
          <p style={{ textAlign: "right", lineHeight: "1.2", fontSize: "calc(113.78pt * var(--pptx-font-scale, 1))", marginTop: "0", marginBottom: "0" }}>
            <span style={{ fontSize: "calc(113.78pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: "700", color: "#FFFFFF" }}>{"النتائج الأولية"}</span>
          </p>
          <p style={{ textAlign: "right", lineHeight: "1.2", marginTop: "51.2pt", fontSize: "calc(60pt * var(--pptx-font-scale, 1))", marginBottom: "0" }}>
            <span style={{ fontSize: "calc(60pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "#CBD5E1" }}>{"نموذج أولي كامل مع 4 سيناريوهات احتيال — محرك الثقة صنّف كل السيناريوهات بدقة 100% — 4 مسارات حماية مُختبرة يدويًا"}</span>
          </p>
        </div>
        {/* Card left - test example */}
        <div style={{ position: "absolute", left: "901.33px", top: "576px", width: "2079.99px", height: "800.05px", backgroundColor: "rgba(0,0,0,0)", wordWrap: "break-word" }}>
          <p style={{ textAlign: "right", lineHeight: "1.2", fontSize: "calc(204.8pt * var(--pptx-font-scale, 1))", marginTop: "0", marginBottom: "0" }}>
            <span style={{ fontSize: "calc(204.8pt * var(--pptx-font-scale, 1))", fontFamily: "'Material Icons', sans-serif", color: "#A99FE3" }}>{"fact_check"}</span>
          </p>
          <p style={{ textAlign: "right", lineHeight: "1.2", fontSize: "calc(113.78pt * var(--pptx-font-scale, 1))", marginTop: "0", marginBottom: "0" }}>
            <span style={{ fontSize: "calc(113.78pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: "700", color: "#FFFFFF" }}>{"مثال تطبيقي"}</span>
          </p>
          <p style={{ textAlign: "right", lineHeight: "1.35", marginTop: "51.2pt", fontSize: "calc(60pt * var(--pptx-font-scale, 1))", marginBottom: "0" }}>
            <span style={{ fontSize: "calc(60pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "#CBD5E1" }}>{"موثوق (98) — فوري | متوسط (62) — تحقق اجتماعي | استثماري (22) — موافقة مستلِم | شبكة (4) — حجب تام"}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Slide9;
