'use client';

import { Typography } from '@mui/material';
import React from 'react';

export default function InputField({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  icon,
  iconColor = "#B7CADB",
  inputProps = {},
  showToggle,
  onToggle,
  showValue,
  className = "",
}) {
  return (
    <div className="relative flex-1">
      {icon && React.cloneElement(icon, {
        style: {
          position: 'absolute',
          left: 10,
          top: '50%',
          transform: 'translateY(-50%)',
          color: iconColor,
          fontSize: 22,
        }
      })}
      <input
        type={showToggle ? (showValue ? "text" : "password") : type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`pl-10 pr-2 py-2 w-full rounded bg-transparent border-b border-gray-600 text-white outline-none focus:border-[#7FE9F8] text-[19px] ${className}`}
        autoComplete="off"
        {...inputProps}
      />
      {showToggle && onToggle && (
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
          tabIndex={-1}
          onClick={onToggle}
        >
          {showValue}
        </button>
      )}
    </div>
  );
}