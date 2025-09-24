'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Box, Button, Checkbox, Typography, Modal, IconButton, FormControlLabel } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useFetchSignUp } from '../hooks/useFetchSignUp';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const termsText = (
  <Box>
    <Typography variant="h4" sx={{ color: '#9FF8F8',fontSize:30, fontWeight: 700, mb: 2 }}>
      Terms and Conditions
    </Typography>
    <Typography variant="subtitle1" sx={{ color: '#9FF8F8', fontWeight: 600, mb: 1 }}>
      Introduction
    </Typography>
    <Typography variant="body2" sx={{ color: '#fff', fontWeight: 400, mb: 2 }}>
      This document outlines the terms and conditions for using the Zeno AI system, an AI-driven economic forecasting and decision-support agent. By accessing or using Zeno, you agree to comply with and be bound by these terms. Your use of the system constitutes explicit consent to the collection, processing, and use of your data as described herein, in accordance with the Kenya Data Protection Act, 2019, and other applicable laws.
    </Typography>
    <Typography variant="subtitle1" sx={{ color: '#9FF8F8', fontWeight: 600, mb: 1 }}>
      Data Collection and Use
    </Typography>
    <Typography variant="body2" sx={{ color: '#fff', fontWeight: 400 }}>
      We collect and process your personal data for the purpose of providing Zeno's services, including economic...
    </Typography>
  </Box>
)

export default function SignUpPage() {
  const router = useRouter();
  const { signUp, isLoading, error } = useFetchSignUp();

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setLocalError(null);
  };

  const handleTermsAgree = () => {
    setAgreed(true);
    setTermsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.first_name || !form.last_name || !form.email || !form.password || !form.confirmPassword) {
      setLocalError('Please fill all fields.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setLocalError('Passwords do not match.');
      return;
    }
    if (!agreed) {
      setLocalError('You must agree to terms and conditions to continue.');
      return;
    }
    const response = await signUp({
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      password: form.password,
    });
    if (response && response.token) {
      router.push('/login');
    }
  };

  return (
    <Box
      minHeight="100vh"
      sx={{
        bgcolor: '#07162A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          borderRadius: 4,
          boxShadow: '0 0 24px 0 #26364C',
          background: 'rgba(14, 33, 58, 0.95)',
        //   width: { xs: '90%', sm: 540 },
          maxWidth: '165vw',
          p: 19,
          zIndex: 2,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: '#7FE9F8',
            fontWeight: 600,
            mb: 3,
            textAlign: 'left',
          }}
        >
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-[40px] ">
            <div className="relative flex-1">
              <PersonOutlineOutlinedIcon
                style={{
                  position: 'absolute',
                  left: 10,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#B7CADB',
                  fontSize: 22
                }}
              />
              <input
                type="text"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                placeholder="First Name"
                className="pl-10 text-[19px] pr-2 py-2 w-full rounded bg-transparent border-b border-gray-600 text-white outline-none focus:border-[#7FE9F8]"
                autoComplete="off"
              />
            </div>
            <div className="relative justify-start  flex-1">
              <PersonOutlineOutlinedIcon
                style={{
                  position: 'absolute',
                  left: 10,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#B7CADB',
                  fontSize: 22
                }}
              />
              <input
                type="text"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                className="pl-10 pr-2 text-[19px] py-2 w-full rounded bg-transparent border-b border-gray-600 text-white outline-none focus:border-[#7FE9F8]"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="relative mb-2">
            <EmailOutlinedIcon
              style={{
                position: 'absolute',
                left: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#B7CADB',
                fontSize: 22
              }}
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="pl-10 pr-2 py-2 w-full rounded bg-transparent border-b border-gray-600 text-white outline-none focus:border-[#7FE9F8]"
              autoComplete="off"
            />
          </div>
          <div className="relative mb-2">
            <LockOutlinedIcon
              style={{
                position: 'absolute',
                left: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#B7CADB',
                fontSize: 22
              }}
            />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="pl-10 pr-10 py-2 w-full rounded bg-transparent border-b border-gray-600 text-white outline-none focus:border-[#7FE9F8]"
              autoComplete="off"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
              tabIndex={-1}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <VisibilityOutlinedIcon style={{ color: '#B7CADB' }} />
              ) : (
                <VisibilityOffOutlinedIcon style={{ color: '#B7CADB' }} />
              )}
            </button>
          </div>
          <div className="relative mb-2">
            <LockOutlinedIcon
              style={{
                position: 'absolute',
                left: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#B7CADB',
                fontSize: 22
              }}
            />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="pl-10 pr-10 py-2 w-full rounded bg-transparent border-b border-gray-600 text-white outline-none focus:border-[#7FE9F8]"
              autoComplete="off"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
              tabIndex={-1}
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? (
                <VisibilityOutlinedIcon style={{ color: '#B7CADB' }} />
              ) : (
                <VisibilityOffOutlinedIcon style={{ color: '#B7CADB' }} />
              )}
            </button>
          </div>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 3, mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={agreed}
                  onChange={() => setTermsOpen(true)}
                  sx={{
                    color: '#B7CADB',
                    '&.Mui-checked': { color: '#7FE9F8' },
                  }}
                />
              }
              label={
                <Typography variant="body1" sx={{ color: '#fff', fontWeight: 600 }}>
                  Agree to <span style={{ color: '#9FF8F8', fontWeight: 600 }}>terms and conditions</span>
                </Typography>
              }
            />
            <Button
              variant="contained"
              type="submit"
              disabled={isLoading}
              sx={{
                bgcolor: '#7FE9F8',
                color: '#07162A',
                boxShadow: '0 2px 8px #26364C',
                fontWeight: 600,
                px: 4,
                py: 1.5,
                '&:hover': { bgcolor: '#63d4e0' },
                borderRadius: '10px',
                fontSize: '1.2rem',
              }}
            >
              Sign Up
            </Button>
          </Box>
          {(localError || error) && (
            <Typography sx={{ color: '#ff4f4f', mb: 2 }}>
              {localError || error?.message}
            </Typography>
          )}
        </form>
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body1" sx={{ color: '#fff' }}>
            Already have an account?{' '}
            <span
              style={{ color: '#7FE9F8', cursor: 'pointer', fontWeight: 600 }}
              onClick={() => router.push('/login')}
            >
              Sign In
            </span>
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          right: 32,
          bottom: 24,
          zIndex: 1,
          display: { xs: 'none', md: 'block' },
        }}
      >
        <Image src="/images/robot.png" alt="robot" width={300} height={210} priority />
      </Box>
      <Modal
        open={termsOpen}
        onClose={() => setTermsOpen(false)}
        sx={{ zIndex: 2000 }}
      >
        <Box
          sx={{
            background: 'rgba(14, 33, 58, 0.98)',
            borderRadius: 3,
            boxShadow: '0 0 24px 0 #26364C',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 420 },
            maxHeight: '80vh',
            p: 4,
            outline: 'none',
            color: '#fff',
            overflowY: 'auto',
            border: '2px solid #fff'
          }}
        >
          <IconButton
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              color: '#ff4f4f',
            }}
            onClick={() => setTermsOpen(false)}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
          {termsText}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 3 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={agreed}
                  onChange={() => setAgreed(!agreed)}
                  sx={{
                    color: '#B7CADB',
                    '&.Mui-checked': { color: '#7FE9F8' },
                  }}
                />
              }
              label={
                <Typography variant="body1" sx={{ color: '#fff', fontWeight: 600 }}>
                  Agree to <span style={{ color: '#9FF8F8', fontWeight: 600 }}>terms and conditions</span>
                </Typography>
              }
            />
            <Button
              variant="contained"
              disabled={!agreed}
              onClick={handleTermsAgree}
              sx={{
                bgcolor: '#53FF8B',
                color: '#07162A',
                fontWeight: 700,
                width:20,
                height:40,
                fontSize:'10px',
                borderRadius: '8px',
                px: 4,
                py: 1,
                '&:hover': { bgcolor: '#43d776' },
              }}
            >
              Agree
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}