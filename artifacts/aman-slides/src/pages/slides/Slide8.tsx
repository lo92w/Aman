import React, { useState, useEffect, useRef } from "react";
const base = import.meta.env.BASE_URL;
const Slide8: React.FC = () => {
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
    <div id="slide-8" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{ backgroundColor: "#000" }}>
      <div id="slide-inner-8" style={{
        position: "absolute", width: "6656px", height: "1728px", overflow: "hidden",
        transformOrigin: "top left", color: "#FFFFFF", backgroundColor: "#212145",
        transform: `scale(${layout.s})`, left: layout.x + "px", top: layout.y + "px"
      }}>
        <img crossOrigin="anonymous" src={`${base}slide-images/image_1.png`} alt="bg-left" style={{ position: "absolute", left: "0px", top: "0px", width: "3072px", height: "1728px", objectFit: "fill" }} />
        <img crossOrigin="anonymous" src={`${base}slide-images/image_2.png`} alt="bg" style={{ position: "absolute", left: "-85.5px", top: "0px", width: "6885px", height: "1728px", objectFit: "fill" }} />
        {/* Title */}
        <div style={{ position: "absolute", left: "554.67px", top: "160px", width: "5546.68px", height: "192px", backgroundColor: "rgba(0,0,0,0)", display: "flex", flexDirection: "column", justifyContent: "center", wordWrap: "break-word" }}>
          <p style={{ textAlign: "right", lineHeight: "1.2", fontSize: "calc(159.29pt * var(--pptx-font-scale, 1))", marginTop: "0", marginBottom: "0" }}>
            <span style={{ fontSize: "calc(159.29pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: "700", color: "#C36C4F" }}>{"التقنيات المستخدمة"}</span>
          </p>
        </div>
        <div style={{ position: "absolute", left: "554.67px", top: "384px", width: "5546.68px", height: "128px", backgroundColor: "transparent", display: "flex", flexDirection: "column", justifyContent: "center", wordWrap: "break-word" }}>
          <p style={{ textAlign: "right", lineHeight: "1.2", fontSize: "calc(79.64pt * var(--pptx-font-scale, 1))", marginTop: "0", marginBottom: "0" }}>
            <span style={{ fontSize: "calc(79.64pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "#E2E8F0" }}>{"بُني المشروع بمنهجية OpenAPI-first على monorepo كامل بـ TypeScript:"}</span>
          </p>
        </div>
        {/* Three tech cards */}
        <div style={{ position: "absolute", left: "600px", top: "600px", width: "5456px", height: "880px" }}>
          {/* Card 1 - Tools */}
          <div style={{ position: "absolute", left: "3756px", top: "0px", width: "1700px", height: "880px", boxSizing: "border-box", backgroundColor: "#26264E", border: "6px solid #C36C4F", borderRadius: "40px" }} />
          <div style={{ position: "absolute", left: "3856px", top: "60px", width: "1500px", height: "760px", backgroundColor: "transparent", wordWrap: "break-word" }}>
            <p style={{ textAlign: "right", lineHeight: "1.2", fontSize: "calc(130pt * var(--pptx-font-scale, 1))", marginTop: "0", marginBottom: "0" }}>
              <span style={{ fontSize: "calc(130pt * var(--pptx-font-scale, 1))", fontFamily: "'Material Icons', sans-serif", color: "#C36C4F" }}>{"build"}</span>
            </p>
            <p style={{ textAlign: "right", lineHeight: "1.2", marginTop: "22.5pt", fontSize: "calc(90pt * var(--pptx-font-scale, 1))", marginBottom: "0" }}>
              <span style={{ fontSize: "calc(90pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: "700", color: "#FFFFFF" }}>{"الأدوات"}</span>
            </p>
            <p style={{ textAlign: "right", lineHeight: "1.3", marginTop: "22.5pt", fontSize: "calc(48pt * var(--pptx-font-scale, 1))", marginBottom: "0" }}>
              <span style={{ fontSize: "calc(48pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "#CBD5E1" }}>{"Replit — pnpm Monorepo — OpenAPI — Zod — shadcn/ui — PostgreSQL"}</span>
            </p>
          </div>
          {/* Card 2 - Frameworks */}
          <div style={{ position: "absolute", left: "1878px", top: "0px", width: "1700px", height: "880px", boxSizing: "border-box", backgroundColor: "#26264E", border: "6px solid #C36C4F", borderRadius: "40px" }} />
          <div style={{ position: "absolute", left: "1978px", top: "60px", width: "1500px", height: "760px", backgroundColor: "transparent", wordWrap: "break-word" }}>
            <p style={{ textAlign: "right", lineHeight: "1.2", fontSize: "calc(130pt * var(--pptx-font-scale, 1))", marginTop: "0", marginBottom: "0" }}>
              <span style={{ fontSize: "calc(130pt * var(--pptx-font-scale, 1))", fontFamily: "'Material Icons', sans-serif", color: "#C36C4F" }}>{"layers"}</span>
            </p>
            <p style={{ textAlign: "right", lineHeight: "1.2", marginTop: "22.5pt", fontSize: "calc(90pt * var(--pptx-font-scale, 1))", marginBottom: "0" }}>
              <span style={{ fontSize: "calc(90pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: "700", color: "#FFFFFF" }}>{"الأطر التقنية"}</span>
            </p>
            <p style={{ textAlign: "right", lineHeight: "1.3", marginTop: "22.5pt", fontSize: "calc(48pt * var(--pptx-font-scale, 1))", marginBottom: "0" }}>
              <span style={{ fontSize: "calc(48pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "#CBD5E1" }}>{"React + Vite — Express 5 — TanStack Query — Drizzle ORM — Wouter"}</span>
            </p>
          </div>
          {/* Card 3 - Languages */}
          <div style={{ position: "absolute", left: "0px", top: "0px", width: "1700px", height: "880px", boxSizing: "border-box", backgroundColor: "#26264E", border: "6px solid #C36C4F", borderRadius: "40px" }} />
          <div style={{ position: "absolute", left: "100px", top: "60px", width: "1500px", height: "760px", backgroundColor: "transparent", wordWrap: "break-word" }}>
            <p style={{ textAlign: "right", lineHeight: "1.2", fontSize: "calc(130pt * var(--pptx-font-scale, 1))", marginTop: "0", marginBottom: "0" }}>
              <span style={{ fontSize: "calc(130pt * var(--pptx-font-scale, 1))", fontFamily: "'Material Icons', sans-serif", color: "#C36C4F" }}>{"code"}</span>
            </p>
            <p style={{ textAlign: "right", lineHeight: "1.2", marginTop: "22.5pt", fontSize: "calc(90pt * var(--pptx-font-scale, 1))", marginBottom: "0" }}>
              <span style={{ fontSize: "calc(90pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: "700", color: "#FFFFFF" }}>{"اللغات البرمجية"}</span>
            </p>
            <p style={{ textAlign: "right", lineHeight: "1.3", marginTop: "22.5pt", fontSize: "calc(48pt * var(--pptx-font-scale, 1))", marginBottom: "0" }}>
              <span style={{ fontSize: "calc(48pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "#CBD5E1" }}>{"TypeScript (Frontend + Backend) — SQL — Orval Codegen (توليد الكود تلقائيًا)"}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Slide8;
