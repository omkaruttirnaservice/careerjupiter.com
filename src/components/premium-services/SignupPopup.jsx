import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';

const SignupPopup = ({ isOpen, onClose }) => {
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [otpExpired, setOtpExpired] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let countdown;
    if (otpSent && !otpExpired) {
      setTimer(60);
      countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            setOtpExpired(true);
            toast.error('OTP expired. Please request a new one.');
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [otpSent]);

  const validateMobile = (number) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(number);
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    setMobile(value);

    // Reset OTP status if number changes
    setOtpSent(false);
    setOtp('');
    setGeneratedOtp('');
    setOtpExpired(false);

    if (value === '') {
      setMobileError('Mobile number is required.');
    } else if (!validateMobile(value)) {
      setMobileError('Enter a valid 10-digit Indian mobile number.');
    } else {
      setMobileError('');
    }
  };

  const handleGetOtp = (e) => {
    e.preventDefault();

    if (!name || !mobile) {
      setMobileError('Please fill all fields.');
      return;
    }

    if (mobileError) return;

    const otpGenerated = '1234'; // Dummy OTP
    setGeneratedOtp(otpGenerated);
    setOtpSent(true);
    setOtpExpired(false);

    Swal.fire({
      icon: 'success',
      title: 'OTP Sent!',
      text: `Your OTP is ${otpGenerated}`,
      confirmButtonColor: '#6D28D9',
    });
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();

    if (otpExpired) {
      toast.error('OTP has expired. Please request a new one.');
      return;
    }

    if (otp === generatedOtp) {
      Swal.fire({
        icon: 'success',
        title: 'Inquiry Accepted!',
        text: 'Your inquiry has been accepted. We will contact you soon!',
        confirmButtonColor: '#6D28D9',
      }).then(() => {
        onClose();
      });
    } else {
      toast.error('Incorrect OTP. Try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="animate-scaleUp bg-white rounded-2xl p-8 w-80 shadow-2xl">
        <h2 className="text-xl font-bold mb-6 text-center text-purple-600">Sign Up</h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-xl"
            required
          />

          <div>
            <input
              type="tel"
              placeholder="Mobile Number"
              value={mobile}
              onChange={handleMobileChange}
              className={`w-full p-2 border rounded-xl ${mobileError ? 'border-red-500' : ''}`}
              maxLength="10"
              required
            />
            {mobileError && (
              <p className="text-red-500 text-xs mt-1">{mobileError}</p>
            )}
          </div>

          {otpSent ? (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-2 border rounded-xl"
                maxLength="4"
                disabled={otpExpired}
              />
              <button
                type="submit"
                onClick={handleVerifyOtp}
                className={`w-full py-2 rounded-xl text-white ${
                  otpExpired ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
                } transition transform hover:scale-105`}
                disabled={otpExpired}
              >
                Submit
              </button>
              {!otpExpired && (
                <p className="text-xs text-gray-500 text-center">OTP expires in: {timer}s</p>
              )}
            </>
          ) : (
            <button
              type="submit"
              onClick={handleGetOtp}
              className="w-full py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition transform hover:scale-105"
            >
              Get OTP
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="mt-2 text-sm text-gray-500 hover:underline"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPopup;
