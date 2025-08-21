import { supabase } from '../../../core/lib/supabaseClient';
import type { Education } from '@routes/cv-builder/types/types';

// Helper to convert database fields to frontend format
const toFrontendFormat = (item: any): Education => ({
  id: item.id,
  degreeTitle: item.degree_title,
  majors: item.majors,
  institute: item.institute,
  gpaValue: item.gpa_value,
  gpaType: item.gpa_type,
  city: item.city,
  startDate: item.start_date,
  endDate: item.end_date,
  isCurrent: item.is_current,
});

// Helper to convert frontend format to database fields
const toBackendFormat = (item: Education, userId: string) => ({
  id: item.id.startsWith('temp-') ? undefined : item.id,
  user_id: userId,
  degree_title: item.degreeTitle,
  majors: item.majors,
  institute: item.institute,
  gpa_value: item.gpaValue,
  gpa_type: item.gpaType,
  city: item.city,
  start_date: item.startDate,
  // Ensure endDate is null if they are currently studying
  end_date: item.isCurrent ? null : item.endDate,
  is_current: item.isCurrent,
});

export const educationService = {
  async loadEducation(): Promise<{ error: any; data: Education[] | null }> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return { error: 'User not authenticated', data: null };

      // Sort by current first, then by end date, so most recent is at the top
      const { data, error } = await supabase
        .from('education')
        .select('*')
        .eq('user_id', user.id)
        .order('is_current', { ascending: false })
        .order('end_date', { ascending: false, nullsFirst: false });

      if (error) return { error, data: null };
      return { error: null, data: data.map(toFrontendFormat) };
    } catch (error) {
      return { error, data: null };
    }
  },

  async saveEducation(
    educationItem: Education
  ): Promise<{ error: any; data: any }> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const formattedItem = toBackendFormat(educationItem, user.id);

      const { data, error } = await supabase
        .from('education')
        .upsert([formattedItem], { onConflict: 'id', defaultToNull: false })
        .select()
        .single();

      if (error) {
        console.error('Error upserting education:', error);
        return { error, data: null };
      }

      return { error: null, data: toFrontendFormat(data) };
    } catch (error) {
      console.error('Unexpected error in saveEducation:', error);
      return { error, data: null };
    }
  },

  async deleteEducation(id: string): Promise<{ error: any }> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('education')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error deleting education:', error);
        return { error };
      }

      return { error: null };
    } catch (error) {
      console.error('Unexpected error in deleteEducation:', error);
      return { error };
    }
  },
};
