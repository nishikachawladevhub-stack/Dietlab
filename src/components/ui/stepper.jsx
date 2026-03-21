"use client";

import { Children, cloneElement, useEffect, useMemo, useRef, useState } from "react";

export function Step({ children }) {
  return <>{children}</>;
}

export default function Stepper({
  children,
  initialStep = 1,
  onStepChange,
  onFinalStepCompleted,
  backButtonText = "Back",
  nextButtonText = "Next",
}) {
  const steps = useMemo(() => Children.toArray(children), [children]);
  const total = steps.length;
  const normalizedInitial = Math.min(Math.max(initialStep, 1), Math.max(total, 1));
  const [currentStep, setCurrentStep] = useState(normalizedInitial);
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef(null);

  const goNext = () => {
    if (currentStep >= total) {
      if (onFinalStepCompleted) onFinalStepCompleted();
      const next = 1;
      setCurrentStep(next);
      if (onStepChange) onStepChange(next);
      return;
    }

    const next = currentStep + 1;
    setCurrentStep(next);
    if (onStepChange) onStepChange(next);
  };

  const activeStepElement = steps[currentStep - 1];
  const activeChildren = (activeStepElement && activeStepElement.props && activeStepElement.props.children) || [];
  const activeChildArray = Array.isArray(activeChildren) ? activeChildren : [activeChildren];

  const titleNode =
    activeChildArray.find((c) => c && typeof c === "object" && c.type && String(c.type).toLowerCase() === "h2") ||
    activeChildArray.find((c) => c && typeof c === "object" && c.type && String(c.type).toLowerCase() === "h3");
  const descNodes = activeChildArray.filter(
    (c) => c && typeof c === "object" && c.type && String(c.type).toLowerCase() === "p"
  );

  const styledTitle = titleNode
    ? cloneElement(titleNode, {
        style: {
          margin: 0,
          fontSize: "25px",
          fontWeight: 700,
          color: "#0f172a",
          ...(titleNode.props?.style || {}),
        },
      })
    : null;

  const styledDesc = descNodes.map((node, idx) =>
    cloneElement(node, {
      key: idx,
      style: {
        margin: 0,
        marginTop: "8px",
        fontSize: "19px",
        color: "#4f6f75",
        lineHeight: 1.6,
        ...(node.props?.style || {}),
      },
    })
  );

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
      <style>{`
        @keyframes stepperContentFadeInUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div
        ref={cardRef}
        key={currentStep}
        style={{
          background: "#ffffff",
          border: "1px solid rgba(114, 218, 232, 0.2)",
          borderRadius: "14px",
          padding: "28px 26px",
          boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(8px)",
          animation: isInView ? "stepperContentFadeInUp 0.5s ease-out both" : "none",
        }}
      >
        {/* Progress dots row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: "10px",
            marginBottom: "26px",
            userSelect: "none",
          }}
        >
          {Array.from({ length: total }).map((_, i) => {
            const stepNo = i + 1;
            const active = stepNo === currentStep;

            return (
              <div key={i} style={{ display: "flex", alignItems: "center" }}>
                <span
                  style={{
                    width: active ? "18px" : "10px",
                    height: "6px",
                    borderRadius: "999px",
                    background: active ? "#72dae8" : "rgba(75, 85, 99, 0.25)",
                    transition: "width 0.25s ease, background-color 0.25s ease",
                  }}
                  aria-hidden="true"
                />
                {i !== total - 1 && (
                  <span
                    style={{
                      width: "46px",
                      height: "2px",
                      background: active ? "rgba(114, 218, 232, 0.65)" : "rgba(75, 85, 99, 0.16)",
                      borderRadius: "999px",
                      marginLeft: "10px",
                      transition: "background-color 0.25s ease",
                    }}
                    aria-hidden="true"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Current step content */}
        <div
          style={{
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          {styledTitle}
          {styledDesc}
        </div>

        {/* Next button */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "28px" }}>
          <button
            type="button"
            onClick={goNext}
            style={{
              padding: "10px 18px",
              borderRadius: "12px",
              border: "1px solid #72dae8",
              background: "#72dae8",
              color: "#0f172a",
              cursor: "pointer",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
              boxShadow: "0 10px 25px rgba(114, 218, 232, 0.25)",
            }}
          >
            {nextButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}

