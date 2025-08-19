import { supabase } from '../lib/supabaseClient';
import type { Skill } from '@routes/cv-builder/types/types';

// The frontend and backend formats are identical in this case, but helpers are good practice.
const toFrontendFormat = (item: any): Skill => ({
  id: item.id,
  category: item.category,
  skills: item.skills || [],
});

const toBackendFormat = (item: Skill, userId: string) => ({
  id: item.id.startsWith('temp-') ? undefined : item.id,
  user_id: userId,
  category: item.category,
  skills: item.skills, // The 'skills' array is stored directly as JSONB
});

export const skillService = {
  // Load all skill categories for the current user
  async loadSkills(): Promise<{ error: any; data: Skill[] | null }> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        return { error: 'User not authenticated', data: null };
      }

      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        return { error, data: null };
      }

      const formattedData = data.map(toFrontendFormat);
      return { error: null, data: formattedData };
    } catch (error) {
      return { error, data: null };
    }
  },

  // Save (upsert/delete) all skill categories
  async saveSkills(
    skillList: Skill[]
  ): Promise<{ error: any; data: Skill[] | null }> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // 1. Format the current list for the database
      const upsertData = skillList.map((skill) =>
        toBackendFormat(skill, user.id)
      );

      // 2. Upsert the data
      const { data: savedData, error: upsertError } = await supabase
        .from('skills')
        .upsert(upsertData, { defaultToNull: false }) // Prevents null ID error for new items
        .select();

      if (upsertError) {
        console.error('Error upserting skills:', upsertError);
        return { error: upsertError, data: null };
      }

      // 3. Clean up deleted categories
      const savedIds = savedData.map((item) => item.id);
      const { data: existingEntries } = await supabase
        .from('skills')
        .select('id')
        .eq('user_id', user.id);

      if (existingEntries) {
        const idsToDelete = existingEntries
          .map((e) => e.id)
          .filter((id) => !savedIds.includes(id));

        if (idsToDelete.length > 0) {
          await supabase.from('skills').delete().in('id', idsToDelete);
        }
      }

      const formattedData = savedData.map(toFrontendFormat);
      return { error: null, data: formattedData };
    } catch (error) {
      console.error('Unexpected error in saveSkills:', error);
      return { error, data: null };
    }
  },
};
