import React from "react";

const ReactModal = ({ children, onClose }) => {
  return (
    <>
      <div
        onClick={onClose}
        className="sticky border-10  z-[100090] flex items-center justify-center bg-black/75 p-3 backdrop-blur-sm sm:p-6"
      >
        <div
          className="card max-h-[90vh] w-full max-w-5xl overflow-y-auto border-white/10 bg-[linear-gradient(180deg,rgba(16,16,16,0.98)_0%,rgba(8,8,8,0.98)_100%)] p-4 shadow-[0_30px_120px_rgba(0,0,0,0.45)] sm:p-6"
          onClick={(event) => event.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default ReactModal;
