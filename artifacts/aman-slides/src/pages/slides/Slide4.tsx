import React, { useState, useEffect, useRef } from "react";
const base = import.meta.env.BASE_URL;
const Slide4: React.FC = () => {
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
    <div id="slide-4" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{ backgroundColor: "#000" }}>
      <div id="slide-inner-4" style={{
        position: "absolute", width: "6656px", height: "1728px", overflow: "hidden",
        transformOrigin: "top left", color: "#FFFFFF", backgroundColor: "#212145",
        transform: `scale(${layout.s})`, left: layout.x + "px", top: layout.y + "px"
      }}>
        <img crossOrigin="anonymous" src={`${base}slide-images/image_1.png`} alt="bg-left" style={{ position: "absolute", left: "0px", top: "0px", width: "3072px", height: "1728px", objectFit: "fill" }} />
        <img crossOrigin="anonymous" src={`${base}slide-images/image_2.png`} alt="bg" style={{ position: "absolute", left: "-85.5px", top: "0px", width: "6885px", height: "1728px", objectFit: "fill" }} />
        {/* Title */}
        <div style={{ position: "absolute", left: "3450px", top: "180px", width: "2500px", height: "220px", backgroundColor: "rgba(0,0,0,0)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0px 50px 0px 0px", wordWrap: "break-word" }}>
          <p style={{ textAlign: "right", lineHeight: "1.2", fontSize: "calc(110pt * var(--pptx-font-scale, 1))", marginTop: "0", marginBottom: "0" }}>
            <span style={{ fontSize: "calc(110pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: "700", color: "#C36C4F" }}>{"المشكلة وحلّها"}</span>
          </p>
        </div>
        {/* Problem card */}
        <div style={{ position: "absolute", left: "3500px", top: "470px", width: "2450.02px", height: "980px" }}>
          <div style={{ position: "absolute", left: "0px", top: "0px", width: "2450.02px", height: "980px", boxSizing: "border-box", backgroundColor: "#26264E", border: "6px solid #FFD966", borderRadius: "39.99px" }} />
          <div style={{ position: "absolute", left: "120px", top: "60px", width: "2210.02px", height: "860px", boxSizing: "border-box", backgroundColor: "transparent", wordWrap: "break-word" }}>
            <p style={{ textAlign: "right", lineHeight: "1.2", fontSize: "calc(130pt * var(--pptx-font-scale, 1))", marginTop: "0", marginBottom: "0" }}>
              <span style={{ fontSize: "calc(130pt * var(--pptx-font-scale, 1))", fontFamily: "'Material Icons', sans-serif", color: "#FFD966" }}>{"report_problem"}</span>
            </p>
            <p style={{ textAlign: "right", lineHeight: "1.2", marginTop: "22.5pt", fontSize: "calc(85pt * var(--pptx-font-scale, 1))", marginBottom: "0" }}>
              <span style={{ fontSize: "calc(85pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: "700", color: "#FFFFFF" }}>{"المشكلة"}</span>
            </p>
            <p style={{ textAlign: "right", lineHeight: "1.3", marginTop: "30pt", fontSize: "calc(52pt * var(--pptx-font-scale, 1))", marginBottom: "0" }}>
              <span style={{ fontSize: "calc(52pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "#CBD5E1" }}>{"الاحتيال المالي عبر الهندسة الاجتماعية يكلّف المستخدمين خسائر فورية. البنوك تُنفّذ التحويلات دون أي تحليل للمخاطر — بمجرد الضغط على \"تحويل\" لا رجعة."}</span>
            </p>
          </div>
        </div>
        {/* Solution card */}
        <div style={{ position: "absolute", left: "700px", top: "470px", width: "2450.02px", height: "980px" }}>
          <div style={{ position: "absolute", left: "0px", top: "0px", width: "2450.02px", height: "980px", boxSizing: "border-box", backgroundColor: "#26264E", border: "6px solid #93C47D", borderRadius: "39.99px" }} />
          <div style={{ position: "absolute", left: "120px", top: "60px", width: "2210.02px", height: "860px", boxSizing: "border-box", backgroundColor: "transparent", wordWrap: "break-word" }}>
            <p style={{ textAlign: "right", lineHeight: "1.2", fontSize: "calc(130pt * var(--pptx-font-scale, 1))", marginTop: "0", marginBottom: "0" }}>
              <span style={{ fontSize: "calc(130pt * var(--pptx-font-scale, 1))", fontFamily: "'Material Icons', sans-serif", color: "#93C47D" }}>{"lightbulb"}</span>
            </p>
            <p style={{ textAlign: "right", lineHeight: "1.2", marginTop: "22.5pt", fontSize: "calc(85pt * var(--pptx-font-scale, 1))", marginBottom: "0" }}>
              <span style={{ fontSize: "calc(85pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: "700", color: "#FFFFFF" }}>{"الحل المقترح"}</span>
            </p>
            <p style={{ textAlign: "right", lineHeight: "1.3", marginTop: "30pt", fontSize: "calc(52pt * var(--pptx-font-scale, 1))", marginBottom: "0" }}>
              <span style={{ fontSize: "calc(52pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "#CBD5E1" }}>{"طبقة ثقة ذكية تُحلّل كل تحويل وتُصدر درجة ثقة (4–98) توجّهه عبر 4 مسارات: فوري، تحقق اجتماعي، موافقة مستلِم، أو حجب تام."}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Slide4;
