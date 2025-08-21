import { supabase } from '../../../core/lib/supabaseClient';
import type { Skill } from '@routes/cv-builder/types/types';

const toFrontendFormat = (item: any): Skill => ({
  id: item.id,
  category: item.category,
  skills: item.skills || [],
});

const toBackendFormat = (item: Skill, userId: string) => ({
  // Let the DB generate a new UUID for temporary IDs
  id: item.id.startsWith('temp-') ? undefined : item.id,
  user_id: userId,
  category: item.category,
  skills: item.skills,
});

export const skillService = {
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
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) {
        return { error, data: null };
      }

      return { error: null, data: data.map(toFrontendFormat) };
    } catch (error) {
      return { error, data: null };
    }
  },

  async saveSkill(skill: Skill): Promise<{ error: any; data: Skill | null }> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const upsertData = toBackendFormat(skill, user.id);

      const { data, error } = await supabase
        .from('skills')
        .upsert([upsertData], { defaultToNull: false })
        .select()
        .single();

      if (error) {
        console.error('Error upserting skill:', error);
        return { error, data: null };
      }

      return { error: null, data: toFrontendFormat(data) };
    } catch (error) {
      console.error('Unexpected error in saveSkill:', error);
      return { error, data: null };
    }
  },

  async deleteSkill(
    skillId: string
  ): Promise<{ error: any; data: any | null }> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { error, data } = await supabase
        .from('skills')
        .delete()
        .eq('id', skillId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error deleting skill:', error);
        return { error, data: null };
      }

      return { error: null, data };
    } catch (error) {
      console.error('Unexpected error in deleteSkill:', error);
      return { error, data: null };
    }
  },
};
