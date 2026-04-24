import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M20 8H17L14 2H10L7 8H4C2.9 8 2 8.9 2 10V20C2 21.1 2.9 22 4 22H20C21.1 22 20 21.1 20 20V10C22 8.9 21.1 8 20 8ZM12 4.26L14.15 8H9.85L12 4.26ZM20 20H4V10H20V20Z"
                fill="currentColor"
            />
            <path
                d="M9 12L6 15L9 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
            <path
                d="M15 12L18 15L15 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
            <path
                d="M13 11L11 19"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
            />
        </svg>
    );
}
