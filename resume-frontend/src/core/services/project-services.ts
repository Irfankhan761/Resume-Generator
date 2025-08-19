import { supabase } from '../lib/supabaseClient';
import type { Project } from '@routes/cv-builder/types/types';

// Helper to convert database fields to frontend format
const toFrontendFormat = (item: any): Project => ({
  id: item.id,
  title: item.title,
  link: item.link || '',
  startDate: item.start_date,
  endDate: item.end_date,
  description: item.description,
  technologies: item.technologies || [],
});

// Helper to convert frontend format to database fields
const toBackendFormat = (item: Project, userId: string) => ({
  // If the ID is temporary, let the DB generate a new UUID
  id: item.id.startsWith('temp-') ? undefined : item.id,
  user_id: userId,
  title: item.title,
  link: item.link,
  start_date: item.startDate,
  end_date: item.endDate,
  description: item.description,
  technologies: item.technologies,
});

export const projectService = {
  // Load all project entries for the current user
  async loadProjects(): Promise<{ error: any; data: Project[] | null }> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        return { error: 'User not authenticated', data: null };
      }

      const { data, error } = await supabase
        .from('projects')
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

  // Save (upsert/delete) all project entries
  async saveProjects(
    projectList: Project[]
  ): Promise<{ error: any; data: Project[] | null }> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // 1. Format the current list of projects for the database
      const upsertData = projectList.map((proj) =>
        toBackendFormat(proj, user.id)
      );

      // 2. Upsert the data (create or update)
      const { data: savedData, error: upsertError } = await supabase
        .from('projects')
        .upsert(upsertData, { defaultToNull: false }) // Important: Prevents null ID error
        .select();

      if (upsertError) {
        console.error('Error upserting projects:', upsertError);
        return { error: upsertError, data: null };
      }

      // 3. Clean up: Delete any projects from the DB that are no longer in the list
      const savedIds = savedData.map((item) => item.id);
      const { data: existingEntries } = await supabase
        .from('projects')
        .select('id')
        .eq('user_id', user.id);

      if (existingEntries) {
        const idsToDelete = existingEntries
          .map((e) => e.id)
          .filter((id) => !savedIds.includes(id));

        if (idsToDelete.length > 0) {
          await supabase.from('projects').delete().in('id', idsToDelete);
        }
      }

      const formattedData = savedData.map(toFrontendFormat);
      return { error: null, data: formattedData };
    } catch (error) {
      console.error('Unexpected error in saveProjects:', error);
      return { error, data: null };
    }
  },
};
