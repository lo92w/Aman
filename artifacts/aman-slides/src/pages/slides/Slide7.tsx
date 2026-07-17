import React, { useState, useEffect, useRef } from "react";
const base = import.meta.env.BASE_URL;
const Slide7: React.FC = () => {
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
    <div id="slide-7" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{ backgroundColor: "#000" }}>
      <div id="slide-inner-7" style={{
        position: "absolute", width: "6656px", height: "1728px", overflow: "hidden",
        transformOrigin: "top left", color: "#FFFFFF", backgroundColor: "#212145",
        transform: `scale(${layout.s})`, left: layout.x + "px", top: layout.y + "px"
      }}>
        <img crossOrigin="anonymous" src={`${base}slide-images/image_1.png`} alt="bg-left" style={{ position: "absolute", left: "0px", top: "0px", width: "3072px", height: "1728px", objectFit: "fill" }} />
        <img crossOrigin="anonymous" src={`${base}slide-images/image_2.png`} alt="bg" style={{ position: "absolute", left: "-85.5px", top: "0px", width: "6885px", height: "1728px", objectFit: "fill" }} />
        {/* Title */}
        <div style={{ position: "absolute", left: "554.66px", top: "160px", width: "5546.64px", height: "192px", backgroundColor: "rgba(0,0,0,0)", display: "flex", flexDirection: "column", justifyContent: "center", wordWrap: "break-word" }}>
          <p style={{ textAlign: "right", lineHeight: "1.2", fontSize: "calc(159.29pt * var(--pptx-font-scale, 1))", marginTop: "0", marginBottom: "0" }}>
            <span style={{ fontSize: "calc(159.29pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: "700", color: "#C36C4F" }}>{"كيفية توفير البيانات واستخدامها"}</span>
          </p>
        </div>
        {/* Card right - data acquisition */}
        <div style={{ position: "absolute", left: "3500px", top: "500px", width: "2600px", height: "950.02px" }}>
          <div style={{ position: "absolute", left: "0px", top: "0px", width: "2600px", height: "950.02px", boxSizing: "border-box", backgroundColor: "#26264E", border: "8px solid #C36C4F", borderRadius: "40px" }} />
          <div style={{ position: "absolute", left: "150px", top: "70px", width: "2300px", height: "810.02px", backgroundColor: "transparent", wordWrap: "break-word" }}>
            <p style={{ textAlign: "right", lineHeight: "1.2", fontSize: "calc(150pt * var(--pptx-font-scale, 1))", marginTop: "0", marginBottom: "0" }}>
              <span style={{ fontSize: "calc(150pt * var(--pptx-font-scale, 1))", fontFamily: "'Material Icons', sans-serif", color: "#C36C4F" }}>{"cloud_download"}</span>
            </p>
            <p style={{ textAlign: "right", lineHeight: "1.2", marginTop: "22.5pt", fontSize: "calc(100pt * var(--pptx-font-scale, 1))", marginBottom: "0" }}>
              <span style={{ fontSize: "calc(100pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: "700", color: "#FFFFFF" }}>{"توليد البيانات"}</span>
            </p>
            <p style={{ textAlign: "right", lineHeight: "1.2", marginTop: "30pt", fontSize: "calc(58pt * var(--pptx-font-scale, 1))", marginBottom: "0" }}>
              <span style={{ fontSize: "calc(58pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "#CBD5E1" }}>{"سكريبت البذر (seed) يُنشئ تلقائيًا 4 مستفيدين بخصائص مختلفة تُغطّي كل مسارات الحماية — RESTful API يُوفّر البيانات للواجهة في الوقت الفعلي"}</span>
            </p>
          </div>
        </div>
        {/* Card left - data analysis */}
        <div style={{ position: "absolute", left: "554px", top: "500px", width: "2600px", height: "950.02px" }}>
          <div style={{ position: "absolute", left: "0px", top: "0px", width: "2600px", height: "950.02px", boxSizing: "border-box", backgroundColor: "#26264E", border: "8px solid #C36C4F", borderRadius: "40px" }} />
          <div style={{ position: "absolute", left: "150px", top: "70px", width: "2300px", height: "810.02px", backgroundColor: "transparent", wordWrap: "break-word" }}>
            <p style={{ textAlign: "right", lineHeight: "1.2", fontSize: "calc(150pt * var(--pptx-font-scale, 1))", marginTop: "0", marginBottom: "0" }}>
              <span style={{ fontSize: "calc(150pt * var(--pptx-font-scale, 1))", fontFamily: "'Material Icons', sans-serif", color: "#C36C4F" }}>{"analytics"}</span>
            </p>
            <p style={{ textAlign: "right", lineHeight: "1.2", marginTop: "22.5pt", fontSize: "calc(100pt * var(--pptx-font-scale, 1))", marginBottom: "0" }}>
              <span style={{ fontSize: "calc(100pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: "700", color: "#FFFFFF" }}>{"محرك الثقة"}</span>
            </p>
            <p style={{ textAlign: "right", lineHeight: "1.2", marginTop: "30pt", fontSize: "calc(58pt * var(--pptx-font-scale, 1))", marginBottom: "0" }}>
              <span style={{ fontSize: "calc(58pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "#CBD5E1" }}>{"يُحلّل 8 عوامل في الوقت الفعلي (التاريخ، عمر الحساب، التقارير، المبلغ، الكلمات المشبوهة، السرعة، نقاط المال البغيض، تطابق الاسم) ويُنتج درجة ثقة تُوجّه مسار الحماية"}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Slide7;
