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

const toBackendFormat = (item: Project, userId: string) => ({
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

  async saveProject(
    project: Project
  ): Promise<{ error: any; data: Project | null }> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const upsertData = toBackendFormat(project, user.id);

      const { data, error } = await supabase
        .from('projects')
        .upsert([upsertData], { defaultToNull: false })
        .select()
        .single();

      if (error) {
        console.error('Error upserting project:', error);
        return { error, data: null };
      }

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
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { error, data } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error deleting project:', error);
        return { error, data: null };
      }

      return { error: null, data };
    } catch (error) {
      console.error('Unexpected error in deleteProject:', error);
      return { error, data: null };
    }
  },
};
