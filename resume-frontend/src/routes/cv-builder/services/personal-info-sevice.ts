import { supabase } from '../../../core/lib/supabaseClient';
import type { PersonalInfo } from '@routes/cv-builder/types/types';

export const personalInfoService = {
  async savePersonalInfo(
    data: PersonalInfo
  ): Promise<{ error: any; data: any }> {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        throw new Error('User not authenticated');
      }

      const { data: existingData } = await supabase
        .from('personal_info')
        .select('id')
        .eq('user_id', user.data.user.id)
        .single();

      if (existingData) {
        // Update existing record
        const { data: updatedData, error } = await supabase
          .from('personal_info')
          .update({
            full_name: data.fullName,
            job_title: data.jobTitle,
            email: data.email,
            phone: data.phone,
            location: data.location,
            website: data.website,
            linkedin: data.linkedin,
            github: data.github,
            summary: data.summary,
          })
          .eq('user_id', user.data.user.id)
          .select()
          .single();

        return { error, data: updatedData };
      } else {
        // Insert new record
        const { data: newData, error } = await supabase
          .from('personal_info')
          .insert({
            user_id: user.data.user.id,
            full_name: data.fullName,
            job_title: data.jobTitle,
            email: data.email,
            phone: data.phone,
            location: data.location,
            website: data.website,
            linkedin: data.linkedin,
            github: data.github,
            summary: data.summary,
          })
          .select()
          .single();

        return { error, data: newData };
      }
    } catch (error) {
      return { error, data: null };
    }
  },

  // Load personal info for current user
  async loadPersonalInfo(): Promise<{ error: any; data: PersonalInfo | null }> {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        return { error: 'User not authenticated', data: null };
      }

      const { data: personalInfo, error } = await supabase
        .from('personal_info')
        .select('*')
        .eq('user_id', user.data.user.id)
        .single();

      if (error) {
        return { error, data: null };
      }

      if (!personalInfo) {
        return { error: null, data: null };
      }

      // Convert database fields to component format
      const formattedData: PersonalInfo = {
        fullName: personalInfo.full_name,
        jobTitle: personalInfo.job_title,
        email: personalInfo.email,
        phone: personalInfo.phone,
        location: personalInfo.location || '',
        website: personalInfo.website || '',
        linkedin: personalInfo.linkedin || '',
        github: personalInfo.github || '',
        summary: personalInfo.summary,
      };

      return { error: null, data: formattedData };
    } catch (error) {
      return { error, data: null };
    }
  },

  // Delete personal info
  async deletePersonalInfo(): Promise<{ error: any }> {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        return { error: 'User not authenticated' };
      }

      const { error } = await supabase
        .from('personal_info')
        .delete()
        .eq('user_id', user.data.user.id);

      return { error };
    } catch (error) {
      return { error };
    }
  },
};
