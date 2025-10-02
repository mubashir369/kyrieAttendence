"use client";
import { X, Crown } from "lucide-react";

export default function PremiumOptionsModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-96 p-6 relative text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex justify-center items-center gap-2 mb-4">
          <Crown className="w-7 h-7 text-yellow-500 animate-bounce" />
          <h2 className="text-xl font-bold text-gray-900">Premium Feature</h2>
        </div>

        {/* Message */}
        <p className="text-gray-700 text-sm mb-4">
          ✨ This feature is <span className="font-semibold text-yellow-600">Premium</span>.  
          If you’d like to unlock it, please get in touch with us 💎
        </p>

        {/* Contact Info */}
        <div className="bg-gray-50 rounded-lg p-4 shadow-inner text-left space-y-2 text-sm">
          <p>🌐 <a href="https://www.eliabyte.com" target="_blank" className="text-blue-600 hover:underline">eliabyte.com</a></p>
          <p>📧 <a href="mailto:eliabyte.sales@gmail.com" className="text-blue-600 hover:underline">eliabyte.sales@gmail.com</a></p>
          <p>📱 <a href="tel:+916282831369" className="text-blue-600 hover:underline">+91 62828 31369</a></p>
        </div>

        {/* Footer CTA */}
        <div className="mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Got it 🚀
          </button>
        </div>
      </div>
    </div>
  );
}
