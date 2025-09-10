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
const toBackendFormat = (item: Education, userId: string) => {
  const backendItem: any = {
    user_id: userId,
    degree_title: item.degreeTitle,
    majors: item.majors || null,
    institute: item.institute || null,
    gpa_value: item.gpaValue || null,
    gpa_type: item.gpaType || null,
    city: item.city || null,
    start_date: item.startDate || null,
    end_date: item.isCurrent ? null : item.endDate || null,
    is_current: item.isCurrent || false,
  };

  // Only include ID if it's not a temporary ID
  if (item.id && !item.id.startsWith('temp-')) {
    backendItem.id = item.id;
  }

  return backendItem;
};

export const educationService = {
  async loadEducation(): Promise<{ error: any; data: Education[] | null }> {
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
        .from('education')
        .select('*')
        .eq('user_id', user.id)
        .order('is_current', { ascending: false })
        .order('end_date', { ascending: false, nullsFirst: false });

      if (error) {
        console.error('Database error loading education:', error);
        return { error, data: null };
      }

      return { error: null, data: data ? data.map(toFrontendFormat) : [] };
    } catch (error) {
      console.error('Unexpected error in loadEducation:', error);
      return { error, data: null };
    }
  },

  async saveEducation(
    educationItem: Education
  ): Promise<{ error: any; data: any }> {
    try {
      console.log('Saving education item:', educationItem);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error('User authentication error:', userError);
        return { error: 'User not authenticated', data: null };
      }

      const formattedItem = toBackendFormat(educationItem, user.id);
      console.log('Formatted item for database:', formattedItem);

      let result;

      // Check if this is an update (has existing ID) or insert (new record)
      if (educationItem.id && !educationItem.id.startsWith('temp-')) {
        // Update existing record
        result = await supabase
          .from('education')
          .update(formattedItem)
          .eq('id', educationItem.id)
          .eq('user_id', user.id)
          .select()
          .single();
      } else {
        // Insert new record
        result = await supabase
          .from('education')
          .insert([formattedItem])
          .select()
          .single();
      }

      const { data, error } = result;

      if (error) {
        console.error('Database error saving education:', error);
        return { error, data: null };
      }

      console.log('Successfully saved education:', data);
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
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error('User authentication error:', userError);
        return { error: 'User not authenticated' };
      }

      const { error } = await supabase
        .from('education')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Database error deleting education:', error);
        return { error };
      }

      return { error: null };
    } catch (error) {
      console.error('Unexpected error in deleteEducation:', error);
      return { error };
    }
  },
};
