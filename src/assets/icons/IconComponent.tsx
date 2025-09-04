// icons.tsx

const icons = {
    envelope: (
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 
        2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 
        0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 
        0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 
        0 0 1-1.07 1.916l-7.5 4.615a2.25 
        2.25 0 0 1-2.36 0L3.32 8.91a2.25 
        2.25 0 0 1-1.07-1.916V6.75"
        />
    ),
    chevron_double_down: (
        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
    ),
    // add more icons here...
};

export type IconName = keyof typeof icons;

export const IconComponent = ({
    name,
    className = "size-6",
}: {
    name: IconName;
    className?: string;
}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={className}
    >
        {icons[name]}
    </svg>
);
