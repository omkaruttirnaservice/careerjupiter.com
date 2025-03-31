import { Field, ErrorMessage, useFormikContext } from "formik";
import { useState } from "react";
import OtpTimer from "./OtpTimer";

export default function MobileForm({
    onSendOtp,
    onVerifyAndSignup,
    otpSent,
    isLoading,
    showAskLater,
    onAskLater,
    referenceId,
    otpCooldown,
    otpTimer,
    isSendingOtp,
  })  {
  const { values } = useFormikContext();
  const [otp, setOtp] = useState("");
  const [isMobileEdited, setIsMobileEdited] = useState(false);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mobile Number
        </label>
        <div className="flex flex-col gap-3">
  {/* Mobile Input + OTP Button in Same Row */}
  <div className="flex flex-col gap-3">
  {/* Mobile Number + OTP Button in Same Line */}
  <div className="flex gap-2">
    <Field
      name="mobile_no"
      type="tel"
      maxLength="10"
      placeholder="Enter 10-digit mobile number"
      disabled={otpSent && otpCooldown} // Disable only when OTP sent & cooldown active
      className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition w-full ${
        otpSent && otpCooldown ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
      }`}
    />

    <button
      type="button"
      onClick={() => onSendOtp(values.mobile_no)}
      className={`px-4 py-2 rounded-lg font-medium transition ${
        otpCooldown || isSendingOtp
          ? "bg-gray-400 text-gray-600 cursor-not-allowed"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
      disabled={otpCooldown || isSendingOtp}
    >
      {isSendingOtp ? "Sending..." : otpSent ? "Resend OTP" : "Get OTP"}
    </button>
  </div>

  
</div>



  {/* Timer Text Below Input */}
  {otpCooldown && (
    <p className="text-sm text-gray-500 mt-1">
      Resend OTP available in {otpTimer} seconds
    </p>
  )}
</div>

        <ErrorMessage
          name="mobile_no"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      {referenceId && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Enter OTP
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              maxLength={6}
            />
            <button
              type="button"
              onClick={() => onVerifyAndSignup(otp, values.mobile_no)}
              disabled={isLoading}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                isLoading
                  ? "bg-blue-400 cursor-wait"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {isLoading ? "Processing..." : "Verify & Sign Up"}
            </button>
          </div>
        </div>
      )}

      {showAskLater && !referenceId && (
        <button
          type="button"
          onClick={onAskLater}
          className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
        >
          Ask Me Later
        </button>
      )}
    </div>
  );
}
