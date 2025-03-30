"use client";
import { useContext } from 'react'
import { LoginModalContext } from '@/contexts/LoginModalProvider'

export function useLoginModal() {
  const context = useContext(LoginModalContext)
  if (!context) {
    throw new Error('useLoginModal, LoginModalProvider içinde kullanılmalıdır')
  }
  return context
}