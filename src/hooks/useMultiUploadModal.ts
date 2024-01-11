import { create } from 'zustand';

interface useMultiUploadModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useMultiUploadModal = create<useMultiUploadModal>((set) => ({
  
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useMultiUploadModal;