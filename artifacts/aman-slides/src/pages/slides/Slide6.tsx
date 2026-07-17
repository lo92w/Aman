import React, { useState, useEffect, useRef } from "react";
const base = import.meta.env.BASE_URL;
const Slide6: React.FC = () => {
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
    <div id="slide-6" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{ backgroundColor: "#000" }}>
      <div id="slide-inner-6" style={{
        position: "absolute", width: "6656px", height: "1728px", overflow: "hidden",
        transformOrigin: "top left", color: "#FFFFFF", backgroundColor: "#212145",
        transform: `scale(${layout.s})`, left: layout.x + "px", top: layout.y + "px"
      }}>
        <img crossOrigin="anonymous" src={`${base}slide-images/image_1.png`} alt="bg-left" style={{ position: "absolute", left: "0px", top: "0px", width: "3072px", height: "1728px", objectFit: "fill" }} />
        <img crossOrigin="anonymous" src={`${base}slide-images/image_2.png`} alt="bg" style={{ position: "absolute", left: "-85.5px", top: "0px", width: "6885px", height: "1728px", objectFit: "fill" }} />
        {/* Title */}
        <div style={{ position: "absolute", left: "554.67px", top: "160px", width: "5546.68px", height: "192px", backgroundColor: "rgba(0,0,0,0)", display: "flex", flexDirection: "column", justifyContent: "center", wordWrap: "break-word" }}>
          <p style={{ textAlign: "right", lineHeight: "1.2", fontSize: "calc(159.29pt * var(--pptx-font-scale, 1))", marginTop: "0", marginBottom: "0" }}>
            <span style={{ fontSize: "calc(159.29pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: "700", color: "#C36C4F" }}>{"البيانات المستخدمة"}</span>
          </p>
        </div>
        {/* Subtitle */}
        <div style={{ position: "absolute", left: "554.67px", top: "384px", width: "5546.68px", height: "192px", backgroundColor: "rgba(0,0,0,0)", display: "flex", flexDirection: "column", justifyContent: "center", wordWrap: "break-word" }}>
          <p style={{ textAlign: "right", lineHeight: "1.2", fontSize: "calc(79.64pt * var(--pptx-font-scale, 1))", marginTop: "0", marginBottom: "0" }}>
            <span style={{ fontSize: "calc(79.64pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "#E2E8F0" }}>{"سيناريوهات احتيال واقعية مُولَّدة اصطناعيًا لاختبار محرك الثقة وتقييم دقة مسارات الحماية الأربعة"}</span>
          </p>
        </div>
        {/* Card right - data sources */}
        <div style={{ position: "absolute", left: "3602px", top: "701.87px", width: "2500px", height: "740.23px" }}>
          <div style={{ position: "absolute", left: "0px", top: "0px", width: "2500px", height: "740.23px", boxSizing: "border-box", backgroundColor: "#26264E", border: "6px solid #C36C4F", borderRadius: "32.18px" }} />
          <div style={{ position: "absolute", left: "120px", top: "64.37px", width: "2260px", height: "611.5px", backgroundColor: "transparent", wordWrap: "break-word" }}>
            <p style={{ textAlign: "right", lineHeight: "1.2", fontSize: "calc(140pt * var(--pptx-font-scale, 1))", marginTop: "0", marginBottom: "0" }}>
              <span style={{ fontSize: "calc(140pt * var(--pptx-font-scale, 1))", fontFamily: "'Material Icons', sans-serif", color: "#C36C4F" }}>{"storage"}</span>
            </p>
            <p style={{ textAlign: "right", lineHeight: "1.2", marginTop: "15pt", fontSize: "calc(95pt * var(--pptx-font-scale, 1))", marginBottom: "0" }}>
              <span style={{ fontSize: "calc(95pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: "700", color: "#FFFFFF" }}>{"مصادر البيانات"}</span>
            </p>
            <p style={{ textAlign: "right", lineHeight: "1.2", marginTop: "22.5pt", fontSize: "calc(56pt * var(--pptx-font-scale, 1))", marginBottom: "0" }}>
              <span style={{ fontSize: "calc(56pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "#CBD5E1" }}>{"بيانات اصطناعية: ملفات ثقة المستلِمين، تقارير مجتمعية مُولَّدة، 4 سيناريوهات احتيال موثّقة (موثوق / متوسط / استثمار / شبكة)"}</span>
            </p>
          </div>
        </div>
        {/* Card left - data processing */}
        <div style={{ position: "absolute", left: "554px", top: "701.87px", width: "2500px", height: "740.23px" }}>
          <div style={{ position: "absolute", left: "0px", top: "0px", width: "2500px", height: "740.23px", boxSizing: "border-box", backgroundColor: "#26264E", border: "6px solid #C36C4F", borderRadius: "32.18px" }} />
          <div style={{ position: "absolute", left: "120px", top: "64.37px", width: "2260px", height: "611.5px", backgroundColor: "transparent", wordWrap: "break-word" }}>
            <p style={{ textAlign: "right", lineHeight: "1.2", fontSize: "calc(140pt * var(--pptx-font-scale, 1))", marginTop: "0", marginBottom: "0" }}>
              <span style={{ fontSize: "calc(140pt * var(--pptx-font-scale, 1))", fontFamily: "'Material Icons', sans-serif", color: "#C36C4F" }}>{"auto_fix_high"}</span>
            </p>
            <p style={{ textAlign: "right", lineHeight: "1.2", marginTop: "15pt", fontSize: "calc(95pt * var(--pptx-font-scale, 1))", marginBottom: "0" }}>
              <span style={{ fontSize: "calc(95pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: "700", color: "#FFFFFF" }}>{"معالجة البيانات"}</span>
            </p>
            <p style={{ textAlign: "right", lineHeight: "1.2", marginTop: "22.5pt", fontSize: "calc(56pt * var(--pptx-font-scale, 1))", marginBottom: "0" }}>
              <span style={{ fontSize: "calc(56pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "#CBD5E1" }}>{"PostgreSQL عبر Drizzle ORM — IBAN مُعيَّر مرتبط بملف ثقة لكل مستلِم — Zod schemas للتحقق من صحة البيانات"}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Slide6;
