// import React, { useEffect, useRef, useState } from 'react'

// const PulseHoverLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   //
//   const wrapperRef = useRef<any>(null);
//   const [pos, setPos] = useState({ x: 0, y: 0 });
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const wrapper = wrapperRef.current;
//     if (!wrapper) return;

//     const handleMouseMove = (e: MouseEvent) => {
//       const rect = wrapper.getBoundingClientRect();
//       setPos({
//         x: e.clientX - rect.left,
//         y: e.clientY - rect.top,
//       });
//     };

//     const handleMouseEnter = () => setVisible(true);
//     const handleMouseLeave = () => setVisible(false);

//     wrapper.addEventListener("mousemove", handleMouseMove);
//     wrapper.addEventListener("mouseenter", handleMouseEnter);
//     wrapper.addEventListener("mouseleave", handleMouseLeave);

//     return () => {
//       wrapper.removeEventListener("mousemove", handleMouseMove);
//       wrapper.removeEventListener("mouseenter", handleMouseEnter);
//       wrapper.removeEventListener("mouseleave", handleMouseLeave);
//     };
//   }, []);
//   //

//   return (
//     <div ref={wrapperRef} className='relative'    >
//       {visible && (
//         <>
//           <style>{`body { cursor: none`}</style>
//           <div
//             style={{
//               position: "absolute",
//               left: pos.x,
//               top: pos.y,
//               width: "60px",
//               height: "60px",
//               pointerEvents: "none",
//               transform: "translate(-50%, -50%)",
//               zIndex: 9999,
//             }}
//           >
//             <img
//               src="/assets/gif/pulse (3).gif"
//               alt="cursor"
//               style={{ width: "100%", height: "100%" }}
//             />
//           </div>
//         </>
//       )}
//       {children}
//     </div>
//   )
// }

// export default PulseHoverLayout


import React, { useCallback, useEffect, useRef, useState } from 'react';

type PulseHoverLayoutProps = {
  children: React.ReactNode;
  size?: number;
};

const PulseHoverLayout: React.FC<PulseHoverLayoutProps> = ({ children, size = 60 }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const updateCursorPosition = useCallback((e: MouseEvent) => {
    if (!wrapperRef.current || !cursorRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Use requestAnimationFrame to avoid layout thrashing
    requestAnimationFrame(() => {
      cursorRef.current!.style.transform = `translate(${x - size / 2}px, ${y - size / 2}px)`;
    });
  }, [size]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const showCursor = () => setVisible(true);
    const hideCursor = () => setVisible(false);

    wrapper.addEventListener('mousemove', updateCursorPosition);
    wrapper.addEventListener('mouseenter', showCursor);
    wrapper.addEventListener('mouseleave', hideCursor);

    return () => {
      wrapper.removeEventListener('mousemove', updateCursorPosition);
      wrapper.removeEventListener('mouseenter', showCursor);
      wrapper.removeEventListener('mouseleave', hideCursor);
    };
  }, [updateCursorPosition]);

  return (
    <div ref={wrapperRef} className="relative group cursor-none" >
      {visible && (
        <div
          ref={cursorRef}
          className="absolute pointer-events-none z-[9999]"
          style={{ width: size, height: size }}
        >
          <img
            src="/assets/gif/pulse (3).gif"
            alt="pulse cursor"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      )}
      {children}
    </div>
  );
};

export default PulseHoverLayout;
