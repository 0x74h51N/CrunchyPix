import useClickableHandlers from '@/hooks/useClickableHandlers';
import { ToastType } from '@/lib/types/common.types';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';

const Toaster = ({
  toasts,
  onClose,
}: {
  toasts: ToastType[];
  onClose: (id: number) => void;
}) => {
  const { handleMouseEnter, handleMouseLeave } = useClickableHandlers();
  if (typeof window === 'undefined') return null;
  return createPortal(
    <div className="toast toast-top toast-center z-[500] flex flex-col gap-2  cursor-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -32 }}
            transition={{ type: 'spring', damping: 24, stiffness: 350 }}
            className={clsx(
              'alert text-white flex items-center',
              toast.type === 'success' ? 'alert-success' : 'alert-error',
            )}
          >
            <span className="flex-1">{toast.msg}</span>
            <button
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="btn btn-sm btn-circle btn-ghost cursor-none hover:bg-transparent active:bg-transparent"
              onClick={() => {
                handleMouseLeave();
                onClose(toast.id);
              }}
            >
              <IoClose />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>,
    document.body,
  );
};

export default Toaster;
