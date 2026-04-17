// app/loading.tsx
export default function Loading() {
  return (
    <div className="loader-root">
      <div className="spinner">
        <div className="arc arc-1" />
        <div className="arc arc-2" />
        <div className="arc arc-3" />
      </div>

      <style>{`
        .loader-root {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(2px);
          z-index: 9999;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .spinner {
          position: relative;
          width: 52px;
          height: 52px;
          animation: smoothSpin 1.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes smoothSpin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .arc {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 3px solid transparent;
        }

        .arc-1 {
          border-top-color: rgba(255, 255, 255, 1);
          border-right-color: rgba(255, 255, 255, 0.5);
          animation: arcPulse 1.4s ease-in-out infinite;
        }

        .arc-2 {
          inset: 8px;
          border-top-color: rgba(255, 255, 255, 0.6);
          border-right-color: rgba(255, 255, 255, 0.2);
          animation: arcPulse 1.4s ease-in-out infinite 0.15s;
        }

        .arc-3 {
          inset: 16px;
          border-top-color: rgba(255, 255, 255, 0.3);
          animation: arcPulse 1.4s ease-in-out infinite 0.3s;
        }

        @keyframes arcPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}