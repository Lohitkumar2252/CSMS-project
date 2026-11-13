import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const LOGO = "TECH-BRIDGE"; // replace with your app's name

export default function Intro({ onReveal, onDone }) {
  const root = useRef(null);

  useGSAP(
    () => {
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
        //   sessionStorage.setItem("seenIntro", "1"); change this if want to keep session track
          onDone();
        },
      });

      tl.from(".intro-letter", {
        yPercent: 100,
        duration: 0.7,
        stagger: 0.07,
        ease: "power4.out",
      })
        .to(
          ".intro-letter",
          { yPercent: -100, duration: 0.45, stagger: 0.035, ease: "power3.in" },
          "+=0.3"
        )
        .to(
          ".intro-panel",
          { yPercent: -100, duration: 0.8, ease: "power4.inOut" },
          "-=0.1"
        )
        .call(onReveal, null, "-=0.45");

      return () => {
        document.body.style.overflow = "";
      };
    },
    { scope: root }
  );

  return (
    <div ref={root} className="fixed inset-0 z-[9999]">
      <div className="intro-panel absolute inset-0 bg-neutral-950" />
      <div className="absolute inset-0 grid place-items-center">
        <div className="flex overflow-hidden py-1 text-[length:clamp(2rem,9vw,6rem)] font-extrabold leading-tight tracking-[0.08em] text-white">
          {LOGO.split("").map((letter, i) => (
            <span key={i} className="intro-letter inline-block whitespace-pre">
              {letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}