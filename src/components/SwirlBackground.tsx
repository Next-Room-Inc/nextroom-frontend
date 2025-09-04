import { motion } from "framer-motion";

const SwirlBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <motion.div
            className="relative  "
        >
            {/* Dark base background */}
            <div className="absolute inset-0 bg-[#2a0d0c]" />

            {/* Animated swirling gradient layers */}
            <motion.div
                className="absolute inset-0"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    backgroundImage: `
            radial-gradient(circle at 30% 30%, #cc3300 0%, transparent 70%),
            radial-gradient(circle at 70% 40%, #ff0000 0%, transparent 70%),
            radial-gradient(circle at 40% 70%, #800000 0%, transparent 70%),
            radial-gradient(circle at 80% 80%, #ff0000 0%, transparent 70%)
          `,
                    backgroundSize: "200% 200%",
                    backgroundRepeat: "no-repeat",
                }}
            />

            {children}
        </motion.div>
    );
};

export default SwirlBackground;
