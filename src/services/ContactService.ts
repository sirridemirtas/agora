import { BaseService } from './BaseService';
import { ApiResponse } from './types';

// Valid subject options
export type ContactSubject = 'Genel' | 'Destek' | 'Öneri' | 'Teknik' | 'Şikayet';

// Request data type
export type ContactFormData = {
  name: string;
  email: string;
  subject: ContactSubject;
  message: string;
};

// Response data type
export type ContactFormResponse = {
  message: string;
};

export class ContactService extends BaseService {
  async submitContactForm(formData: ContactFormData): Promise<ApiResponse<ContactFormResponse>> {
    return this.fetchApi<ContactFormResponse>('/contact', {
      method: 'POST',
      data: formData,
    });
  }
}