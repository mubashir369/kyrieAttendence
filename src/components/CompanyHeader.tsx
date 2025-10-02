"use client";

export default function CompanyHeader() {
  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white text-xs md:text-sm shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 py-2 space-y-2 md:space-y-0">
        
        {/* Marquee Text */}
        <div className="overflow-hidden whitespace-nowrap w-full md:w-1/2">
          <p className="animate-marquee font-semibold text-center md:text-left">
            👉 For more details about this app or if you have more requirements, feel free to contact us.
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap justify-center md:justify-end items-center space-x-4 md:space-x-6 font-medium">
          <a
            href="https://www.eliabyte.com/"
            target="_blank"
            className="flex items-center space-x-1 relative group"
          >
            <span className="transition-transform group-hover:scale-110 group-hover:text-yellow-300">
              🌐
            </span>
            <span className="group-hover:text-yellow-300 transition-colors duration-300">
              eliyabyte.com
            </span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
          </a>

          <a
            href="mailto:eliyabyte.sales@gmail.com"
            className="flex items-center space-x-1 relative group"
          >
            <span className="transition-transform group-hover:scale-110 group-hover:text-green-300">
              📧
            </span>
            <span className="group-hover:text-green-300 transition-colors duration-300">
              eliyabyte.sales@gmail.com
            </span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-300 transition-all duration-300 group-hover:w-full"></span>
          </a>

          <a
            href="https://api.whatsapp.com/send?phone=916282831369&text=Hello%20I%20would%20like%20to%20know%20more%20about%20your%20services."
            target="_blank"
            className="flex items-center space-x-1 relative group"
          >
            <span className="transition-transform group-hover:scale-110 group-hover:text-blue-300 animate-pulse">
              📱
            </span>
            <span className="group-hover:text-blue-300 transition-colors duration-300">
              916282831369
            </span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>
      </div>

      {/* Marquee Animation */}
      <style jsx>{`
        .animate-marquee {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 15s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}
