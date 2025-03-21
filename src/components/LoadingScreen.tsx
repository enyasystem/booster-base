import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.8, ease: "easeInOut" }
      }}
      className="fixed inset-0 z-[9999] bg-gradient-to-br from-blue-900 to-blue-950 flex items-center justify-center"
    >
      <div className="relative">
        {/* Circular Loader */}
        <div className="relative w-24 h-24">
          {/* Outer circle */}
          <motion.div
            className="absolute inset-0 border-4 border-blue-200/30 rounded-full"
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity
            }}
          />
          
          {/* Inner circle */}
          <motion.div
            className="absolute inset-2 border-4 border-t-blue-400 border-r-blue-400 border-b-transparent border-l-transparent rounded-full"
            animate={{
              rotate: -360
            }}
            transition={{
              duration: 1.5,
              ease: "linear",
              repeat: Infinity
            }}
          />
          
          {/* Center dot */}
          <motion.div
            className="absolute inset-[42%] bg-blue-400 rounded-full"
            animate={{
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 1,
              ease: "easeInOut",
              repeat: Infinity
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
