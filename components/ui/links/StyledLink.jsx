// app/components/StyledLink.jsx

'use client'; // This must be a client component to use the usePathname hook.

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const StyledLink = ({
  href,
  children,
  className = '',
  variant = 'primary',
  iconBefore,
  iconAfter,
  ...props // Pass down other Link props like 'target', 'rel', etc.
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  // --- Style Definitions ---

  // 1. Base styles applied to all links
  const baseStyles =
    'inline-flex items-center justify-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 rounded-md';

  // 2. Variant-specific styles
  let variantStyles = '';
  switch (variant) {
    case 'subtle':
      variantStyles = 'text-gray-500 hover:text-gray-900';
      break;
    case 'underline':
      variantStyles = 'text-blue-600 underline-offset-4 hover:underline';
      break;
    case 'primary':
    default:
      variantStyles = 'text-[var(--primary)] hover:text-blue-800';
      break;
  }

  // 3. Active state styles (applied when the link's href matches the current URL)
  const activeStyles = isActive ? 'font-bold text-blue-700' : '';

  // 4. Combine all classes using a template literal
  const combinedClassName = `
    ${baseStyles}
    ${variantStyles}
    ${activeStyles}
    ${className}
  `.trim(); // .trim() removes any leading/trailing whitespace

  return (
    <Link href={href} className={combinedClassName} {...props}>
      {iconBefore}
      <span>{children}</span>
      {iconAfter}
    </Link>
  );
};

export default StyledLink;