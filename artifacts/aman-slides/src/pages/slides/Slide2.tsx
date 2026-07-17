import React, { useState, useEffect, useRef } from "react";
const base = import.meta.env.BASE_URL;
const Slide2: React.FC = () => {
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
  const items = [
    { num: "01", label: "المشكلة والحل" },
    { num: "02", label: "وصف الفكرة ومواءمتها" },
    { num: "03", label: "أعضاء الفريق" },
    { num: "04", label: "البيانات المستخدمة" },
    { num: "05", label: "التقنيات المستخدمة" },
    { num: "06", label: "الاختبار والتحقق" },
    { num: "07", label: "العرض التوضيحي" },
  ];
  const colR = items.slice(0, 4);
  const colL = items.slice(4);
  const rowH = 246.69;
  const topStart = 494.03;
  return (
    <div id="slide-2" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{ backgroundColor: "#000" }}>
      <div id="slide-inner-2" style={{
        position: "absolute", width: "6656px", height: "1728px", overflow: "hidden",
        transformOrigin: "top left", color: "#FFFFFF", backgroundColor: "#212145",
        transform: `scale(${layout.s})`, left: layout.x + "px", top: layout.y + "px"
      }}>
        <img crossOrigin="anonymous" src={`${base}slide-images/image_1.png`} alt="bg-left" style={{ position: "absolute", left: "0px", top: "0px", width: "3072px", height: "1728px", objectFit: "fill" }} />
        <img crossOrigin="anonymous" src={`${base}slide-images/image_2.png`} alt="bg" style={{ position: "absolute", left: "-85.5px", top: "0px", width: "6885px", height: "1728px", objectFit: "fill" }} />
        {/* Section title */}
        <div style={{ position: "absolute", left: "3726.49px", top: "203.9px", width: "2421.76px", height: "171.02px", backgroundColor: "transparent", padding: "56.19px 56.19px 56.19px 56.19px", wordWrap: "break-word" }}>
          <p style={{ textAlign: "right", lineHeight: "1.8", fontSize: "calc(96pt * var(--pptx-font-scale, 1))", marginTop: "0", marginBottom: "0" }}>
            <span style={{ fontSize: "calc(96pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: "700", color: "#C36C4F" }}>{"المحتويات"}</span>
          </p>
        </div>
        {/* Right column items (01–04) */}
        {colR.map((item, i) => (
          <React.Fragment key={item.num}>
            <div style={{ position: "absolute", left: "4489.56px", top: `${topStart + i * rowH}px`, width: "1265.92px", height: "143.72px", backgroundColor: "transparent", display: "flex", flexDirection: "column", justifyContent: "center", padding: "65.67px 65.67px 65.67px 65.67px", wordWrap: "break-word" }}>
              <p style={{ textAlign: "right", lineHeight: "1.2", fontSize: "calc(72pt * var(--pptx-font-scale, 1))", marginTop: "0", marginBottom: "0" }}>
                <span style={{ fontSize: "calc(72pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "#ffffff" }}>{item.label}</span>
              </p>
            </div>
            <div style={{ position: "absolute", left: "5816.73px", top: `${topStart + i * rowH}px`, width: "307.46px", height: "143.72px", backgroundColor: "#A99FE3", borderRadius: "27.03px", display: "flex", flexDirection: "column", justifyContent: "center", padding: "65.67px 0px 65.67px 0px", wordWrap: "break-word" }}>
              <p style={{ textAlign: "center", lineHeight: "1.2", fontSize: "calc(88.95pt * var(--pptx-font-scale, 1))", marginTop: "0", marginBottom: "0" }}>
                <span style={{ fontSize: "calc(88.95pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: "700", color: "#ffffff" }}>{item.num}</span>
              </p>
            </div>
          </React.Fragment>
        ))}
        {/* Left column items (05–07) */}
        {colL.map((item, i) => (
          <React.Fragment key={item.num}>
            <div style={{ position: "absolute", left: "1681.83px", top: `${topStart + i * rowH}px`, width: "1740.66px", height: "143.72px", backgroundColor: "transparent", display: "flex", flexDirection: "column", justifyContent: "center", padding: "65.67px 65.67px 65.67px 65.67px", wordWrap: "break-word" }}>
              <p style={{ textAlign: "right", lineHeight: "1.2", fontSize: "calc(72pt * var(--pptx-font-scale, 1))", marginTop: "0", marginBottom: "0" }}>
                <span style={{ fontSize: "calc(72pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "#ffffff" }}>{item.label}</span>
              </p>
            </div>
            <div style={{ position: "absolute", left: "3484.02px", top: `${topStart + i * rowH}px`, width: "307.46px", height: "143.72px", backgroundColor: "#A99FE3", borderRadius: "27.03px", display: "flex", flexDirection: "column", justifyContent: "center", padding: "65.67px 0px 65.67px 0px", wordWrap: "break-word" }}>
              <p style={{ textAlign: "center", lineHeight: "1.2", fontSize: "calc(88.95pt * var(--pptx-font-scale, 1))", marginTop: "0", marginBottom: "0" }}>
                <span style={{ fontSize: "calc(88.95pt * var(--pptx-font-scale, 1))", fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: "700", color: "#ffffff" }}>{item.num}</span>
              </p>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
export default Slide2;
