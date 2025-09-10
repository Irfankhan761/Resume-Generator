import { supabase } from '../lib/supabaseClient';
import { User, Session, AuthError } from '@supabase/supabase-js';

export interface AuthResponse {
  user: User | null;
  session: Session | null;
  error: AuthError | null;
}

export const signUp = async (
  email: string,
  password: string,
  username: string
): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    });

    return {
      user: data.user,
      session: data.session,
      error,
    };
  } catch (error) {
    return {
      user: null,
      session: null,
      error: error as AuthError,
    };
  }
};

export const signIn = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return {
      user: data.user,
      session: data.session,
      error,
    };
  } catch (error) {
    return {
      user: null,
      session: null,
      error: error as AuthError,
    };
  }
};

export const signOut = async (): Promise<{ error: AuthError | null }> => {
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (error) {
    return { error: error as AuthError };
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const getCurrentUserFromSession = async (): Promise<User | null> => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) throw error;
    return session?.user ?? null;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
};

export const onAuthStateChange = (
  callback: (event: string, session: Session | null) => void
) => {
  return supabase.auth.onAuthStateChange(callback);
};

export const updatePassword = async (
  newPassword: string
): Promise<{ error: AuthError | null }> => {
  try {
    const resetToken = localStorage.getItem('supabaseResetToken');

    if (resetToken) {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      return { error };
    } else {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      return { error };
    }
  } catch (error) {
    return { error: error as AuthError };
  }
};

export const resetPasswordForEmail = async (
  email: string
): Promise<{ error: AuthError | null }> => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    return { error };
  } catch (error) {
    return { error: error as AuthError };
  }
};
