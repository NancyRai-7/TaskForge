import React from 'react';

/**
 * Realistic, precision-crafted vector SVG icon suite for TaskForge.
 * Standard 24x24 viewBox, 1.8 stroke-width, clean geometric curves.
 */

export function LogoMark({ size = 26, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="28" height="28" rx="8" fill="#20231F" />
      {/* Precision forged anvil / prism facets */}
      <path
        d="M6 9.5L14 5L22 9.5V18.5L14 23L6 18.5V9.5Z"
        stroke="#C6F36A"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 5V14M14 14L22 9.5M14 14L6 9.5M14 14V23"
        stroke="#C6F36A"
        strokeWidth="1.5"
        strokeOpacity="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Central forge energy spark */}
      <circle cx="14" cy="14" r="2.2" fill="#C6F36A" />
    </svg>
  );
}

function BaseSvg({ size = 18, className = '', children, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function UsersIcon(props) {
  return (
    <BaseSvg {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </BaseSvg>
  );
}

export function UserIcon(props) {
  return (
    <BaseSvg {...props}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </BaseSvg>
  );
}

export function CrownIcon(props) {
  return (
    <BaseSvg {...props}>
      <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
    </BaseSvg>
  );
}

export function ShieldIcon(props) {
  return (
    <BaseSvg {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </BaseSvg>
  );
}

export function BellIcon(props) {
  return (
    <BaseSvg {...props}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </BaseSvg>
  );
}

export function MessageSquareIcon(props) {
  return (
    <BaseSvg {...props}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </BaseSvg>
  );
}

export function ClockIcon(props) {
  return (
    <BaseSvg {...props}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </BaseSvg>
  );
}

export function CheckCircleIcon(props) {
  return (
    <BaseSvg {...props}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </BaseSvg>
  );
}

export function AlertCircleIcon(props) {
  return (
    <BaseSvg {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </BaseSvg>
  );
}

export function FolderKanbanIcon(props) {
  return (
    <BaseSvg {...props}>
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
      <path d="M8 10v4" />
      <path d="M12 10v2" />
      <path d="M16 10v6" />
    </BaseSvg>
  );
}

export function CheckSquareIcon(props) {
  return (
    <BaseSvg {...props}>
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </BaseSvg>
  );
}

export function ListTodoIcon(props) {
  return (
    <BaseSvg {...props}>
      <rect x="3" y="5" width="6" height="6" rx="1" />
      <path d="m3 17 2 2 4-4" />
      <path d="M13 6h8" />
      <path d="M13 12h8" />
      <path d="M13 18h8" />
    </BaseSvg>
  );
}

export function LayoutDashboardIcon(props) {
  return (
    <BaseSvg {...props}>
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </BaseSvg>
  );
}

export function CompassIcon(props) {
  return (
    <BaseSvg {...props}>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </BaseSvg>
  );
}

export function ActivityIcon(props) {
  return (
    <BaseSvg {...props}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </BaseSvg>
  );
}

export function ArrowLeftRightIcon(props) {
  return (
    <BaseSvg {...props}>
      <polyline points="8 3 4 7 8 11" />
      <path d="M4 7h16" />
      <polyline points="16 21 20 17 16 13" />
      <path d="M20 17H4" />
    </BaseSvg>
  );
}

export function AtSignIcon(props) {
  return (
    <BaseSvg {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
    </BaseSvg>
  );
}

export function CalendarIcon(props) {
  return (
    <BaseSvg {...props}>
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </BaseSvg>
  );
}

export function SettingsIcon(props) {
  return (
    <BaseSvg {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </BaseSvg>
  );
}

export function SearchIcon(props) {
  return (
    <BaseSvg {...props}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" x2="16.65" y1="21" y2="16.65" />
    </BaseSvg>
  );
}

export function PlusIcon(props) {
  return (
    <BaseSvg {...props}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </BaseSvg>
  );
}

export function CheckIcon(props) {
  return (
    <BaseSvg {...props}>
      <polyline points="20 6 9 17 4 12" />
    </BaseSvg>
  );
}

export function XIcon(props) {
  return (
    <BaseSvg {...props}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </BaseSvg>
  );
}

export function ChevronDownIcon(props) {
  return (
    <BaseSvg {...props}>
      <polyline points="6 9 12 15 18 9" />
    </BaseSvg>
  );
}

export function TrashIcon(props) {
  return (
    <BaseSvg {...props}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </BaseSvg>
  );
}

export function SparklesIcon(props) {
  return (
    <BaseSvg {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </BaseSvg>
  );
}

export function GlobeIcon(props) {
  return (
    <BaseSvg {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </BaseSvg>
  );
}

export function LaptopIcon(props) {
  return (
    <BaseSvg {...props}>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </BaseSvg>
  );
}

export function DownloadIcon(props) {
  return (
    <BaseSvg {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </BaseSvg>
  );
}

export function SlidersIcon(props) {
  return (
    <BaseSvg {...props}>
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </BaseSvg>
  );
}

