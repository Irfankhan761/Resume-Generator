import { supabase } from '../lib/supabaseClient';
import type { Education } from '@routes/cv-builder/types/types';

// Helper to convert database fields to frontend format
const toFrontendFormat = (item: any): Education => ({
  id: item.id,
  institution: item.institution,
  degree: item.degree,
  field: item.field_of_study,
  startDate: item.start_date,
  endDate: item.end_date,
  gpa: item.gpa || '',
  achievements: item.achievements || [],
  current: item.is_current || false,
});

// Helper to convert frontend format to database fields
const toBackendFormat = (item: Education, userId: string) => ({
  id: item.id.startsWith('temp-') ? undefined : item.id, // Let Supabase generate ID for new items
  user_id: userId,
  institution: item.institution,
  degree: item.degree,
  field_of_study: item.field,
  gpa: item.gpa,
  start_date: item.startDate,
  end_date: item.endDate,
  is_current: item.current,
  achievements: item.achievements,
});

export const educationService = {
  // Load all education entries for the current user
  async loadEducation(): Promise<{ error: any; data: Education[] | null }> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        return { error: 'User not authenticated', data: null };
      }

      const { data, error } = await supabase
        .from('education')
        .select('*')
        .eq('user_id', user.id)
        .order('start_date', { ascending: false });

      if (error) {
        return { error, data: null };
      }

      const formattedData = data.map(toFrontendFormat);
      return { error: null, data: formattedData };
    } catch (error) {
      return { error, data: null };
    }
  },

  // Save (upsert/delete) all education entries
  async saveEducation(
    educationList: Education[]
  ): Promise<{ error: any; data: any }> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // 1. Format new/updated items for upsert
      const upsertData = educationList.map((edu) =>
        toBackendFormat(edu, user.id)
      );

      const { data: savedData, error: upsertError } = await supabase
        .from('education')
        .upsert(upsertData, { defaultToNull: false }) // <--- FIX APPLIED HERE
        .select();

      if (upsertError) {
        console.error('Error upserting education:', upsertError);
        return { error: upsertError, data: null };
      }

      // 2. Delete entries that are no longer in the list
      const savedIds = savedData.map((item) => item.id);
      const { data: existingEntries, error: fetchError } = await supabase
        .from('education')
        .select('id')
        .eq('user_id', user.id);

      if (fetchError) {
        console.warn(
          'Could not fetch existing entries for cleanup.',
          fetchError
        );
      } else {
        const idsToDelete = existingEntries
          .map((e) => e.id)
          .filter((id) => !savedIds.includes(id));

        if (idsToDelete.length > 0) {
          const { error: deleteError } = await supabase
            .from('education')
            .delete()
            .in('id', idsToDelete);

          if (deleteError) {
            console.warn('Error deleting old education entries:', deleteError);
          }
        }
      }

      const formattedData = savedData.map(toFrontendFormat);
      return { error: null, data: formattedData };
    } catch (error) {
      console.error('Unexpected error in saveEducation:', error);
      return { error, data: null };
    }
  },
};
