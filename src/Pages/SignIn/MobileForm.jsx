

import { Field, ErrorMessage, useFormikContext } from "formik"
import { useState, useEffect } from "react"
import AlreadyRegisteredModal from "./AlreadyRegisteredModal"
import { Navigate, useNavigate } from "react-router-dom"

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

}) {
  const { values, resetForm } = useFormikContext()
  const [otp, setOtp] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    if (referenceId) {
      setOtp("")
    }
  }, [referenceId])


  return (
    <div className="space-y-4">
     

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <Field
              name="mobile_no"
              type="tel"
              maxLength="10"
              placeholder="Enter 10-digit mobile number"
              disabled={otpSent && otpCooldown}
              className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition w-full ${
                otpSent && otpCooldown ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
              }`}
            />

            <button
              type="button"
              onClick={() => onSendOtp(values.mobile_no)}
              className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                otpCooldown || isSendingOtp
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              disabled={otpCooldown || isSendingOtp}
            >
              {isSendingOtp ? "Sending..." : otpSent ? "Resend OTP" : "Get OTP"}
            </button>
          </div>

          {otpCooldown &&  (
            <p className="text-sm text-gray-500 mt-1">
              Resend OTP available in {otpTimer} seconds
            </p>
          )}

<p className="text-md text-gray-500 mt-1">  
  You have already registered! Please go to 
  <button 
    type="button"
    onClick={() => navigate('/Sign-in')}
    className="text-blue-600 hover:underline ml-1"
  > 
    Sign in page
  </button>
    
</p>
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
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '')
                setOtp(value.slice(0, 6))
              }}
              className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              maxLength={6}
              inputMode="numeric"
            />
            <button
              type="button"
              onClick={() => onVerifyAndSignup(otp, values.mobile_no)}
              disabled={isLoading || otp.length !== 6}
              className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                isLoading 
                  ? "bg-blue-400 cursor-wait" 
                  : otp.length === 6
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-400 text-gray-600 cursor-not-allowed"
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
          className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-red-500 transition"
        >
          CLOSE
        </button>
      )}
    </div>
  )
}