const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative w-[80vw] sm:w-[60vw] bg-white rounded-2xl shadow-2xl p-6 text-gray-800">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl font-semibold"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
