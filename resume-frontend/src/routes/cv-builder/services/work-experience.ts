import { supabase } from '../../../core/lib/supabaseClient';
import type { WorkExperience } from '@routes/cv-builder/types/types';

const toFrontendFormat = (item: any): WorkExperience => ({
  id: item.id,
  company: item.company,
  position: item.position,
  location: item.location,
  startDate: item.start_date,
  endDate: item.end_date,
  currentlyWorking: item.is_current || false,
  description: item.description || [],
});

const toBackendFormat = (item: WorkExperience, userId: string) => ({
  id: item.id.startsWith('temp-') ? undefined : item.id,
  user_id: userId,
  company: item.company,
  position: item.position,
  location: item.location,
  start_date: item.startDate,
  end_date: item.endDate,
  is_current: item.currentlyWorking,
  description: item.description,
});

export const workExperienceService = {
  async loadWorkExperience(): Promise<{
    error: any;
    data: WorkExperience[] | null;
  }> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return { error: 'User not authenticated', data: null };

      const { data, error } = await supabase
        .from('work_experience')
        .select('*')
        .eq('user_id', user.id)
        .order('start_date', { ascending: false });

      if (error) return { error, data: null };

      return { error: null, data: data.map(toFrontendFormat) };
    } catch (error) {
      return { error, data: null };
    }
  },
  async saveWorkExperience(
    experienceItem: WorkExperience
  ): Promise<{ error: any; data: WorkExperience | null }> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const upsertData = toBackendFormat(experienceItem, user.id);

      const { data: savedData, error } = await supabase
        .from('work_experience')
        .upsert(upsertData)
        .select()
        .single();

      if (error) {
        console.error('Error upserting work experience:', error);
        return { error, data: null };
      }

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
      } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('work_experience')
        .delete()
        .match({ id: id, user_id: user.id });

      if (error) console.error('Error deleting work experience:', error);
      return { error };
    } catch (error) {
      return { error };
    }
  },
};
