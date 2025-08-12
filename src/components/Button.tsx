import { motion } from 'framer-motion';

export const PrimaryButton: React.FC<{
    disabled?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    icon?: string | null;
    className?: string;
    button?: boolean;
    color?: 'red' | 'black' | 'disabled'
}
> = ({
    children = '',
    onClick = () => { },
    icon = null,
    className = '',
    color = 'red',
    disabled = false
}) => {
        const buttonColors = {
            'red': 'bg-[#B3322F] hover:bg-black',
            'black': 'hover:bg-[#B3322F] bg-black',
            'disabled': 'bg-[#CCCCCC]'
        }
        const bgColor = disabled ? buttonColors['disabled'] : buttonColors[color]

        return (
            <motion.button
                disabled={disabled}
                onClick={onClick}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className={` ${className} px-10  text-center py-2 text-white rounded-full flex items-center justify-center ${bgColor} ${icon ? 'gap-2' : ''} `}
            >
                {children}
                {icon && <img src={icon} alt="" className="h-3 mt-1.5" />}
            </motion.button>
        )
    };
export const Button: React.FC<{
    disabled?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    className?: string;
    button?: boolean;
}
> = ({
    children = '',
    onClick = () => { },
    className = ' text-center py-2 text-white rounded-full flex items-center justify-center',
    disabled = false
}) => {


        return (
            <motion.button
                disabled={disabled}
                onClick={onClick}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className={` ${className} cursor-pointer `}
            >
                {children}
            </motion.button>
        )
    };