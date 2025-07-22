import type { MobileMenuOverlayProps } from '../types'

function MobileMenuOverlay({ isOpen, onClose }: MobileMenuOverlayProps) {
  if (!isOpen) return null

  return <div className="fixed inset-0 z-40 lg:hidden" onClick={onClose} />
}

export { MobileMenuOverlay }
