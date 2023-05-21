'use client'

import type { PanInfo } from 'framer-motion'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import React from 'react'

export default function Modal({
  children,
  showModal,
  setShowModal,
  bgColor = 'bg-neutral-600',
  closeWithX,
}: {
  children: React.ReactNode
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  bgColor?: string
  closeWithX?: boolean
}) {
  const mobileModalRef = React.useRef<HTMLDivElement | null>(null)
  const desktopModalRef = React.useRef<HTMLDivElement | null>(null)

  const closeModal = React.useCallback(
    (closeWithX?: boolean) => {
      if (!closeWithX)
        setShowModal(false)
    },
    [setShowModal],
  )

  const onKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !closeWithX)
        setShowModal(false)
    },
    [closeWithX, setShowModal],
  )

  React.useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  const controls = useAnimation()

  const transitionProps = React.useMemo(
    () => ({
      type: 'spring',
      stiffness: 500,
      damping: 30,
    }),
    [],
  )

  React.useEffect(() => {
    controls.start({
      y: 0,
      transition: transitionProps,
    })
  }, [controls, transitionProps])

  async function handleDragEnd(_: unknown, info: PanInfo) {
    const offset = info.offset.y
    const velocity = info.velocity.y
    const height = mobileModalRef.current?.getBoundingClientRect().height || 0
    if (offset > height / 2 || velocity > 800) {
      await controls.start({ y: '100%', transition: transitionProps })
      closeModal()
    }
    else {
      controls.start({ y: 0, transition: transitionProps })
    }
  }

  return (
    <AnimatePresence>
      {showModal && (
        <div className="absolute">
          <motion.div
            ref={mobileModalRef}
            key="mobile-modal"
            className="group fixed inset-x-0 bottom-0 z-40 w-screen cursor-grab active:cursor-grabbing sm:hidden"
            initial={{ y: '100%' }}
            animate={controls}
            exit={{ y: '100%' }}
            transition={transitionProps}
            drag="y"
            dragDirectionLock
            onDragEnd={handleDragEnd}
            dragElastic={{ top: 0, bottom: 1 }}
            dragConstraints={{ top: 0, bottom: 0 }}
          >
            <div className={`h-7 ${bgColor} rounded-t-4xl -mb-1 flex w-full items-center justify-center border-t border-gray-200`}>
              <div className="-mr-1 h-1 w-6 rounded-full bg-main-600 transition-all group-active:rotate-12" />
              <div className="h-1 w-6 rounded-full bg-main-600 transition-all group-active:-rotate-12" />
            </div>
            {children}
          </motion.div>
          <motion.div
            ref={desktopModalRef}
            key="desktop-modal"
            className="fixed inset-0 z-50 hidden min-h-screen items-center justify-center sm:flex"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            onMouseDown={(e) => {
              if (desktopModalRef.current === e.target)
                closeModal(closeWithX)
            }}
          >
            {children}
          </motion.div>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-30 bg-black bg-opacity-40 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => closeModal(closeWithX)}
          />
        </div>
      )}
    </AnimatePresence>
  )
}
