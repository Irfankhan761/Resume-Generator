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

      const payload = {
        full_name: data.fullName,
        job_title: data.jobTitle,
        email: data.email,
        phone: data.phone,
        location: data.location,
        website: data.website,
        linkedin: data.linkedin,
        github: data.github,
        summary: data.summary,
        profile_image: data.profileImage ?? null,
      };

      const { data: existingData } = await supabase
        .from('personal_info')
        .select('id')
        .eq('user_id', user.data.user.id)
        .maybeSingle();

      if (existingData) {
        const { data: updatedData, error } = await supabase
          .from('personal_info')
          .update(payload)
          .eq('user_id', user.data.user.id)
          .select()
          .maybeSingle();

        return { error, data: updatedData };
      } else {
        const { data: newData, error } = await supabase
          .from('personal_info')
          .insert({
            user_id: user.data.user.id,
            ...payload,
          })
          .select()
          .maybeSingle();

        return { error, data: newData };
      }
    } catch (error) {
      console.error('Error in savePersonalInfo:', error);
      return { error, data: null };
    }
  },

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
        .maybeSingle();

      if (error) {
        console.error('Error loading personal info from DB:', error);
        return { error, data: null };
      }

      if (!personalInfo) {
        return { error: null, data: null };
      }
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
        profileImage: personalInfo.profile_image ?? undefined,
      };

      return { error: null, data: formattedData };
    } catch (error) {
      console.error('Unexpected error in loadPersonalInfo:', error);
      return { error, data: null };
    }
  },

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

  async updateProfileImage(
    profileImage: string | null
  ): Promise<{ error: any; data: any }> {
    try {
      const getUserResp = await supabase.auth.getUser();
      const user = getUserResp?.data?.user;
      if (!user) {
        const err = new Error('User not authenticated');
        console.error('updateProfileImage: no authenticated user');
        return { error: err, data: null };
      }

      const userId = user.id;
      const payload = { profile_image: profileImage ?? null };

      // Try update first (most common case)
      const { data: updatedData, error: updateError } = await supabase
        .from('personal_info')
        .update(payload)
        .eq('user_id', userId)
        .select()
        .maybeSingle();

      if (updateError) {
        // Log but keep going to attempt insert fallback
        console.warn(
          'updateProfileImage: update error (will try insert):',
          updateError
        );
      }

      // If update returned a row, return it
      if (updatedData) {
        return { error: null, data: updatedData };
      }

      // No existing row or update didn't return a row — insert a new one.
      // Use array form for insert to satisfy the TS signatures.
      const { data: insertedData, error: insertError } = await supabase
        .from('personal_info')
        .insert([{ user_id: userId, ...payload }])
        .select()
        .maybeSingle();

      if (insertError) {
        console.error('updateProfileImage: insert failed', insertError);
        return { error: insertError, data: null };
      }

      return { error: null, data: insertedData };
    } catch (err) {
      console.error('Unexpected error in updateProfileImage:', err);
      return { error: err, data: null };
    }
  },
};
