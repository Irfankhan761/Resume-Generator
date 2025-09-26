import { supabase } from '../../../core/lib/supabaseClient';
import type { WorkExperience } from '@routes/cv-builder/types/types';

const toFrontendFormat = (item: any): WorkExperience => ({
  id: item.id,
  company: item.company,
  position: item.position,
  location: item.location || '',
  startDate: item.start_date,
  endDate: item.end_date,
  currentlyWorking: item.is_current || false,
  description: item.description || [],
});

const toBackendFormat = (item: WorkExperience, userId: string) => {
  const backendItem: any = {
    user_id: userId,
    company: item.company || '',
    position: item.position || '',
    location: item.location || null,
    start_date: item.startDate || null,
    end_date: item.currentlyWorking ? null : item.endDate || null,
    is_current: item.currentlyWorking || false,
    description: item.description || [],
  };

  // Only include ID if it's not a temporary ID
  if (item.id && !item.id.startsWith('temp-')) {
    backendItem.id = item.id;
  }

  return backendItem;
};

export const workExperienceService = {
  async loadWorkExperience(): Promise<{
    error: any;
    data: WorkExperience[] | null;
  }> {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error('User authentication error:', userError);
        return { error: 'User not authenticated', data: null };
      }

      const { data, error } = await supabase
        .from('work_experience')
        .select('*')
        .eq('user_id', user.id)
        .order('start_date', { ascending: false });

      if (error) {
        console.error('Database error loading work experience:', error);
        return { error, data: null };
      }

      const formattedData = data ? data.map(toFrontendFormat) : [];
      console.log('Loaded work experience:', formattedData);
      return { error: null, data: formattedData };
    } catch (error) {
      console.error('Unexpected error in loadWorkExperience:', error);
      return { error, data: null };
    }
  },

  async saveWorkExperience(
    experienceItem: WorkExperience
  ): Promise<{ error: any; data: WorkExperience | null }> {
    try {
      console.log('Saving work experience:', experienceItem);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error('User authentication error:', userError);
        return { error: 'User not authenticated', data: null };
      }

      const formattedItem = toBackendFormat(experienceItem, user.id);
      console.log('Formatted work experience for database:', formattedItem);

      let result;

      // Check if this is an update (has existing ID) or insert (new record)
      if (experienceItem.id && !experienceItem.id.startsWith('temp-')) {
        // Update existing record
        result = await supabase
          .from('work_experience')
          .update(formattedItem)
          .eq('id', experienceItem.id)
          .eq('user_id', user.id)
          .select()
          .single();
      } else {
        // Insert new record
        result = await supabase
          .from('work_experience')
          .insert([formattedItem])
          .select()
          .single();
      }

      const { data: savedData, error } = result;

      if (error) {
        console.error('Database error saving work experience:', error);
        return { error, data: null };
      }

      console.log('Successfully saved work experience:', savedData);
      return { error: null, data: toFrontendFormat(savedData) };
    } catch (error) {
      console.error('Unexpected error in saveWorkExperience:', error);
      return { error, data: null };
    }
  },

  async deleteWorkExperience(id: string): Promise<{ error: any }> {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error('User authentication error:', userError);
        return { error: 'User not authenticated' };
      }

      const { error } = await supabase
        .from('work_experience')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Database error deleting work experience:', error);
        return { error };
      }

      return { error: null };
    } catch (error) {
      console.error('Unexpected error in deleteWorkExperience:', error);
      return { error };
    }
  },
};
