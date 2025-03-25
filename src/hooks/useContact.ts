"use client";
import { useCallback, useMemo } from 'react';
// Import useApi directly from its file, not from the barrel import
import { useApi } from './useApi';
import { ContactService, ContactFormData, ContactFormResponse } from '@/services/ContactService';

export function useContact() {
  // Create contactService instance once with useMemo
  const contactService = useMemo(() => new ContactService(), []);
  
  // Memoize bound API function to prevent recreating it on each render
  const submitContactFormFn = useMemo(() => 
    contactService.submitContactForm.bind(contactService), 
  [contactService]);

  const {
    data: contactResponse,
    error: contactError,
    loading: contactLoading,
    execute: executeSubmitContactForm,
  } = useApi<ContactFormResponse, [ContactFormData]>(submitContactFormFn);

  const submitContactForm = useCallback(async (formData: ContactFormData) => {
    return executeSubmitContactForm(formData);
  }, [executeSubmitContactForm]);

  return {
    contactResponse,
    contactError,
    contactLoading,
    submitContactForm,
  };
}
