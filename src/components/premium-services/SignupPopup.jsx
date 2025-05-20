import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { sendOtp ,verifyOtp } from './api';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';

const SignupPopup = ({ isOpen, onClose }) => {
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [referenceId, setReferenceId] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpExpired, setOtpExpired] = useState(false);
  const [timer, setTimer] = useState(0);
  const [mobileError, setMobileError] = useState('');

  useEffect(() => {
    if (isOpen) resetForm();
  }, [isOpen]);

  const resetForm = () => {
    setMobile('');
    setName('');
    setOtp('');
    setReferenceId('');
    setOtpSent(false);
    setOtpVerified(false);
    setOtpExpired(false);
    setTimer(0);
    setMobileError('');
  };

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

  const validateMobile = (number) => /^[6-9]\d{9}$/.test(number);

  const handleMobileChange = (e) => {
    const value = e.target.value;
    setMobile(value);
    setOtp('');
    setReferenceId('');
    setOtpSent(false);
    setOtpVerified(false);
    setOtpExpired(false);

    if (!value) {
      setMobileError('Mobile number is required.');
    } else if (!validateMobile(value)) {
      setMobileError('Enter a valid 10-digit Indian mobile number.');
    } else {
      setMobileError('');
    }
  };

  const sendOtpMutation = useMutation({
    mutationFn: sendOtp,
    onSuccess: (data) => {
      if (data.success) {
        setOtpSent(true);
        setOtpExpired(false);
        setReferenceId(data.data.reference_id);
        setOtp('');
        Swal.fire({
          icon: 'success',
          title: 'OTP Sent!',
          text: 'An OTP has been sent to your mobile number.',
          confirmButtonColor: '#6D28D9',
        });
      } else {
        toast.error(data.message || 'Failed to send OTP.');
      }
    },
    onError: () => {
      toast.error('Network error. Please try again.');
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Inquiry Accepted!',
          html: '<br><b>We will contact you soon.</b>',
          confirmButtonColor: '#6D28D9',
        }).then(() => onClose());
      } else {
        toast.error(data.message || 'Incorrect OTP.');
      }
    },
    onError: () => {
      toast.error('Network error. Please try again.');
    },
  });

  const handleGetOtp = (e) => {
    e.preventDefault();
    if (!name || !mobile || mobileError) {
      setMobileError('Please enter valid name and mobile.');
      return;
    }
    sendOtpMutation.mutate({ name, mobile });
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otpExpired) {
      toast.error('OTP has expired. Please request a new one.');
      return;
    }

    if (!otp) {
      toast.error('Please enter OTP.');
      return;
    }

    verifyOtpMutation.mutate({ name, mobile, referenceId, otp });
  };

  const handleResendOtp = () => {
    if (!name || !mobile || mobileError) {
      toast.error('Enter name and mobile number.');
      return;
    }
    sendOtpMutation.mutate({ name, mobile });
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
            {mobileError && <p className="text-red-500 text-xs mt-1">{mobileError}</p>}
          </div>

          {!otpSent ? (
            <button
              type="submit"
              onClick={handleGetOtp}
              className="w-full py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition transform hover:scale-105"
            >
              Get OTP
            </button>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-2 border rounded-xl"
                maxLength="6"
                disabled={otpExpired}
              />

              {!otpExpired ? (
                <button
                  type="submit"
                  onClick={handleVerifyOtp}
                  className="w-full py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition transform hover:scale-105"
                >
                  Verify
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="w-full py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition transform hover:scale-105"
                >
                  Resend OTP
                </button>
              )}

              <p className="text-xs text-gray-500 text-center">
                {!otpExpired && `OTP expires in: ${timer} sec`}
              </p>
            </>
          )}

          <button
            type="button"
            onClick={onClose}
            className="mt-2 text-sm text-gray-500 hover:underline w-full text-center"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPopup;
