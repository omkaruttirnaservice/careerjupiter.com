import { useEffect, useState } from "react";

export default function OtpTimer({ isActive, onTimeout }) {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            onTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, onTimeout]);

  if (!isActive) return null;

  return (
    <p className="text-sm text-gray-500 mt-1">
      Resend OTP available in {timeLeft} seconds
    </p>
  );
}