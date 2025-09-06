import React, { useRef, useEffect } from "react";

interface AutoResizeTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = (props) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const resizeTextarea = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto"; // reset
    el.style.height = el.scrollHeight + "px"; // set to content height
  };

  useEffect(() => {
    resizeTextarea(); // adjust on mount
  }, []);

  return (
    <textarea
      {...props}
      ref={textareaRef}
      onInput={resizeTextarea}
      className={`overflow-hidden resize-none ${props.className || ""}`}
    />
  );
};

export default AutoResizeTextarea;
