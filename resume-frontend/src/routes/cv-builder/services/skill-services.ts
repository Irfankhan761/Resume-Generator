import { supabase } from '../../../core/lib/supabaseClient';
import type { Skill } from '@routes/cv-builder/types/types';

const toFrontendFormat = (item: any): Skill => ({
  id: item.id,
  category: item.category,
  skills: item.skills || [],
});

const toBackendFormat = (item: Skill, userId: string) => {
  const backendItem: any = {
    user_id: userId,
    category: item.category || '',
    skills: item.skills || [],
  };

  // Only include ID if it's not a temporary ID
  if (item.id && !item.id.startsWith('temp-')) {
    backendItem.id = item.id;
  }

  return backendItem;
};

export const skillService = {
  async loadSkills(): Promise<{ error: any; data: Skill[] | null }> {
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
        .from('skills')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Database error loading skills:', error);
        return { error, data: null };
      }

      const formattedData = data ? data.map(toFrontendFormat) : [];
      console.log('Loaded skills:', formattedData);
      return { error: null, data: formattedData };
    } catch (error) {
      console.error('Unexpected error in loadSkills:', error);
      return { error, data: null };
    }
  },

  async saveSkill(skill: Skill): Promise<{ error: any; data: Skill | null }> {
    try {
      console.log('Saving skill:', skill);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error('User authentication error:', userError);
        return { error: 'User not authenticated', data: null };
      }

      const formattedItem = toBackendFormat(skill, user.id);
      console.log('Formatted skill for database:', formattedItem);

      let result;

      // Check if this is an update (has existing ID) or insert (new record)
      if (skill.id && !skill.id.startsWith('temp-')) {
        // Update existing record
        result = await supabase
          .from('skills')
          .update(formattedItem)
          .eq('id', skill.id)
          .eq('user_id', user.id)
          .select()
          .single();
      } else {
        // Insert new record
        result = await supabase
          .from('skills')
          .insert([formattedItem])
          .select()
          .single();
      }

      const { data, error } = result;

      if (error) {
        console.error('Database error saving skill:', error);
        return { error, data: null };
      }

      console.log('Successfully saved skill:', data);
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
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error('User authentication error:', userError);
        return { error: 'User not authenticated', data: null };
      }

      const { error, data } = await supabase
        .from('skills')
        .delete()
        .eq('id', skillId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Database error deleting skill:', error);
        return { error, data: null };
      }

      return { error: null, data };
    } catch (error) {
      console.error('Unexpected error in deleteSkill:', error);
      return { error, data: null };
    }
  },
};
