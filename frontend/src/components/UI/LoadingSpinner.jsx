import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'blue', 
  text = 'Yuklanmoqda...', 
  fullScreen = false 
}) => {
  const sizeClasses = {
    small: 'h-6 w-6',
    medium: 'h-12 w-12',
    large: 'h-16 w-16',
    extra: 'h-24 w-24'
  };

  const colorClasses = {
    blue: 'border-blue-600',
    white: 'border-white',
    gray: 'border-gray-600',
    green: 'border-green-600',
    red: 'border-red-600'
  };

  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const dotsVariants = {
    animate: {
      transition: {
        staggerChildren: 0.2,
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };

  const dotVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  const Spinner = () => (
    <motion.div
      className={`${sizeClasses[size]} border-4 border-t-transparent rounded-full ${colorClasses[color]}`}
      variants={spinnerVariants}
      animate="animate"
    />
  );

  // Unused spinner components removed to fix warnings
  // You can add them back if needed in the future

  const content = (
    <div className={`flex flex-col items-center justify-center space-y-4 ${fullScreen ? 'min-h-screen' : 'py-8'}`}>
      {/* Logo Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center space-x-2 mb-4"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white font-bold">
          P
        </div>
        <span className="text-xl font-bold text-gray-800">Paket UZB</span>
      </motion.div>

      {/* Main Spinner */}
      <Spinner />

      {/* Loading Text */}
      {text && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <p className={`font-medium ${color === 'white' ? 'text-white' : 'text-gray-700'}`}>
            {text}
          </p>
          
          {/* Animated dots */}
          <motion.div
            className="flex justify-center mt-2"
            variants={dotsVariants}
            animate="animate"
          >
            <span className={color === 'white' ? 'text-white' : 'text-gray-500'}>
              <motion.span variants={dotVariants}>.</motion.span>
              <motion.span variants={dotVariants}>.</motion.span>
              <motion.span variants={dotVariants}>.</motion.span>
            </span>
          </motion.div>
        </motion.div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm z-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};

// Different spinner variants for different use cases
export const ButtonSpinner = ({ size = 'small', color = 'white' }) => (
  <motion.div
    className={`${size === 'small' ? 'h-4 w-4' : 'h-5 w-5'} border-2 border-t-transparent rounded-full ${
      color === 'white' ? 'border-white' : 'border-current'
    }`}
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
  />
);

export const InlineSpinner = ({ text = 'Yuklanmoqda' }) => (
  <div className="flex items-center space-x-2">
    <motion.div
      className="h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
    <span className="text-sm text-gray-600">{text}</span>
  </div>
);

export const CardSpinner = () => (
  <div className="flex justify-center py-12">
    <motion.div
      className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

export const SkeletonLoader = ({ lines = 3, className = "" }) => (
  <div className={`animate-pulse ${className}`}>
    {[...Array(lines)].map((_, index) => (
      <div
        key={index}
        className={`bg-gray-200 rounded h-4 mb-3 ${
          index === lines - 1 ? 'w-3/4' : 'w-full'
        }`}
      />
    ))}
  </div>
);

export const ProductCardSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 rounded-2xl h-64 mb-4" />
    <div className="px-4 pb-4">
      <div className="bg-gray-200 rounded h-4 w-1/3 mb-2" />
      <div className="bg-gray-200 rounded h-6 w-full mb-2" />
      <div className="bg-gray-200 rounded h-4 w-2/3 mb-4" />
      <div className="bg-gray-200 rounded h-8 w-1/2 mb-4" />
      <div className="bg-gray-200 rounded h-12 w-full" />
    </div>
  </div>
);

export default LoadingSpinner;