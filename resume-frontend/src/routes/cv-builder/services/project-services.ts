import { supabase } from '../../../core/lib/supabaseClient';
import type { Project } from '@routes/cv-builder/types/types';

const toFrontendFormat = (item: any): Project => ({
  id: item.id,
  title: item.title,
  link: item.link || '',
  startDate: item.start_date,
  endDate: item.end_date,
  description: item.description,
  technologies: item.technologies || [],
});

const toBackendFormat = (item: Project, userId: string) => {
  const backendItem: any = {
    user_id: userId,
    title: item.title || '',
    link: item.link || null,
    start_date: item.startDate || null,
    end_date: item.endDate || null,
    description: item.description || null,
    technologies: item.technologies || [],
  };

  // Only include ID if it's not a temporary ID
  if (item.id && !item.id.startsWith('temp-')) {
    backendItem.id = item.id;
  }

  return backendItem;
};

export const projectService = {
  async loadProjects(): Promise<{ error: any; data: Project[] | null }> {
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
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('start_date', { ascending: false });

      if (error) {
        console.error('Database error loading projects:', error);
        return { error, data: null };
      }

      const formattedData = data ? data.map(toFrontendFormat) : [];
      console.log('Loaded projects:', formattedData);
      return { error: null, data: formattedData };
    } catch (error) {
      console.error('Unexpected error in loadProjects:', error);
      return { error, data: null };
    }
  },

  async saveProject(
    project: Project
  ): Promise<{ error: any; data: Project | null }> {
    try {
      console.log('Saving project:', project);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error('User authentication error:', userError);
        return { error: 'User not authenticated', data: null };
      }

      const formattedItem = toBackendFormat(project, user.id);
      console.log('Formatted project for database:', formattedItem);

      let result;

      // Check if this is an update (has existing ID) or insert (new record)
      if (project.id && !project.id.startsWith('temp-')) {
        // Update existing record
        result = await supabase
          .from('projects')
          .update(formattedItem)
          .eq('id', project.id)
          .eq('user_id', user.id)
          .select()
          .single();
      } else {
        // Insert new record
        result = await supabase
          .from('projects')
          .insert([formattedItem])
          .select()
          .single();
      }

      const { data, error } = result;

      if (error) {
        console.error('Database error saving project:', error);
        return { error, data: null };
      }

      console.log('Successfully saved project:', data);
      return { error: null, data: toFrontendFormat(data) };
    } catch (error) {
      console.error('Unexpected error in saveProject:', error);
      return { error, data: null };
    }
  },

  async deleteProject(
    projectId: string
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
        .from('projects')
        .delete()
        .eq('id', projectId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Database error deleting project:', error);
        return { error, data: null };
      }

      return { error: null, data };
    } catch (error) {
      console.error('Unexpected error in deleteProject:', error);
      return { error, data: null };
    }
  },
};
