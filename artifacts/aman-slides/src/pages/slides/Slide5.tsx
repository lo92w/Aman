import React, { useState, useEffect, useRef } from "react";
const base = import.meta.env.BASE_URL;
const Slide5: React.FC = () => {
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
    <div id="slide-5" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{ backgroundColor: "#000" }}>
      <div id="slide-inner-5" style={{
        position: "absolute", width: "6656px", height: "1728px", overflow: "hidden",
        transformOrigin: "top left", color: "#FFFFFF", backgroundColor: "#212145",
        transform: `scale(${layout.s})`, left: layout.x + "px", top: layout.y + "px"
      }}>
        <img crossOrigin="anonymous" src={`${base}slide-images/image_1.png`} alt="bg-left" style={{ position: "absolute", left: "0px", top: "0px", width: "3072px", height: "1728px", objectFit: "fill" }} />
        <img crossOrigin="anonymous" src={`${base}slide-images/image_2.png`} alt="bg" style={{ position: "absolute", left: "-85.5px", top: "0px", width: "6885px", height: "1728px", objectFit: "fill" }} />
        {/* Title */}
        <div style={{ position: "absolute", left: "554.67px", top: "160px", width: "5546.68px", height: "224.06px", backgroundColor: "transparent", display: "flex", flexDirection: "column", justifyContent: "center", wordWrap: "break-word" }}>
          <p style={{ textAlign: "right", lineHeight: "1.2", fontSize: "calc(159.29pt * var(--pptx-font-scale, 1))", marginTop: "0", marginBottom: "0" }}>
            <span style={{ fontSize: "calc(159.29pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: "700", color: "#C36C4F" }}>{"وصف الفكرة ومواءمتها للمسار"}</span>
          </p>
        </div>
        {/* Card 1 - Benefits */}
        <div style={{ position: "absolute", left: "500px", top: "500px", width: "1800px", height: "950.02px" }}>
          <div style={{ position: "absolute", left: "0px", top: "0px", width: "1800px", height: "950.02px", boxSizing: "border-box", backgroundColor: "#25244C", border: "6px solid #93C47D", borderRadius: "40px" }} />
          <div style={{ position: "absolute", left: "100px", top: "80px", width: "1600px", height: "790.02px", backgroundColor: "transparent", wordWrap: "break-word" }}>
            <p style={{ textAlign: "right", lineHeight: "1.2", fontSize: "calc(110pt * var(--pptx-font-scale, 1))", marginTop: "0", marginBottom: "0" }}>
              <span style={{ fontSize: "calc(110pt * var(--pptx-font-scale, 1))", fontFamily: "'Material Icons', sans-serif", color: "#93C47D" }}>{"auto_awesome"}</span>
            </p>
            <p style={{ textAlign: "right", lineHeight: "1.2", marginTop: "30pt", fontSize: "calc(75pt * var(--pptx-font-scale, 1))", marginBottom: "0" }}>
              <span style={{ fontSize: "calc(75pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: "700", color: "#FFFFFF" }}>{"الفوائد والابتكار"}</span>
            </p>
            <p style={{ textAlign: "right", lineHeight: "1.2", marginTop: "22.5pt", fontSize: "calc(48pt * var(--pptx-font-scale, 1))", marginBottom: "0" }}>
              <span style={{ fontSize: "calc(48pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "#CBD5E1" }}>{"حماية استباقية قبل وقوع الاحتيال — درجة ثقة مركّبة من 8 عوامل — تجربة بنكية عربية RTL أولى بالاتجاه"}</span>
            </p>
          </div>
        </div>
        {/* Card 2 - Problem handling */}
        <div style={{ position: "absolute", left: "2428px", top: "500px", width: "1800px", height: "950.02px" }}>
          <div style={{ position: "absolute", left: "0px", top: "0px", width: "1800px", height: "950.02px", boxSizing: "border-box", backgroundColor: "#25244C", border: "6px solid #C36C4F", borderRadius: "40px" }} />
          <div style={{ position: "absolute", left: "100px", top: "80px", width: "1600px", height: "790.02px", backgroundColor: "transparent", wordWrap: "break-word" }}>
            <p style={{ textAlign: "right", lineHeight: "1.2", fontSize: "calc(110pt * var(--pptx-font-scale, 1))", marginTop: "0", marginBottom: "0" }}>
              <span style={{ fontSize: "calc(110pt * var(--pptx-font-scale, 1))", fontFamily: "'Material Icons', sans-serif", color: "#C36C4F" }}>{"construction"}</span>
            </p>
            <p style={{ textAlign: "right", lineHeight: "1.2", marginTop: "30pt", fontSize: "calc(75pt * var(--pptx-font-scale, 1))", marginBottom: "0" }}>
              <span style={{ fontSize: "calc(75pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: "700", color: "#FFFFFF" }}>{"معالجة المشكلة"}</span>
            </p>
            <p style={{ textAlign: "right", lineHeight: "1.2", marginTop: "22.5pt", fontSize: "calc(48pt * var(--pptx-font-scale, 1))", marginBottom: "0" }}>
              <span style={{ fontSize: "calc(48pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "#CBD5E1" }}>{"محرك ثقة يعمل في الوقت الفعلي — 4 مسارات حماية ديناميكية بحسب درجة المخاطرة"}</span>
            </p>
          </div>
        </div>
        {/* Card 3 - Developed idea */}
        <div style={{ position: "absolute", left: "4356px", top: "500px", width: "1800px", height: "950.02px" }}>
          <div style={{ position: "absolute", left: "0px", top: "0px", width: "1800px", height: "950.02px", boxSizing: "border-box", backgroundColor: "#25244C", border: "6px solid #A99FE3", borderRadius: "40px" }} />
          <div style={{ position: "absolute", left: "100px", top: "80px", width: "1600px", height: "790.02px", backgroundColor: "transparent", wordWrap: "break-word" }}>
            <p style={{ textAlign: "right", lineHeight: "1.2", fontSize: "calc(110pt * var(--pptx-font-scale, 1))", marginTop: "0", marginBottom: "0" }}>
              <span style={{ fontSize: "calc(110pt * var(--pptx-font-scale, 1))", fontFamily: "'Material Icons', sans-serif", color: "#A99FE3" }}>{"tips_and_updates"}</span>
            </p>
            <p style={{ textAlign: "right", lineHeight: "1.2", marginTop: "30pt", fontSize: "calc(75pt * var(--pptx-font-scale, 1))", marginBottom: "0" }}>
              <span style={{ fontSize: "calc(75pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: "700", color: "#FFFFFF" }}>{"الفكرة المطوّرة"}</span>
            </p>
            <p style={{ textAlign: "right", lineHeight: "1.2", marginTop: "22.5pt", fontSize: "calc(48pt * var(--pptx-font-scale, 1))", marginBottom: "0" }}>
              <span style={{ fontSize: "calc(48pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "#CBD5E1" }}>{"نموذج أولي متكامل يحاكي تطبيقًا بنكيًا حقيقيًا بواجهة عربية مع سيناريوهات احتيال مُعبّأة ومُختبرة"}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Slide5;
