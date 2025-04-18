export type UserGoal = 'build_muscle' | 'lose_fat' | 'stay_fit' | 'strength' | 'endurance'
export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced'
export type EquipmentAccess = 'full_gym' | 'home_gym' | 'minimal' | 'park'
export type WorkoutFrequency = '2-3' | '3-4' | '4-5' | '5+'
export type PhysicalLimitations = 'none' | 'back' | 'joints' | 'other'
export type WorkoutPreferences = 'traditional' | 'functional' | 'hiit' | 'strength'

export interface Routine {
  id: string
  user_id: string
  goal: UserGoal
  experience_level: ExperienceLevel
  created_at: string
  updated_at: string
}

export interface RoutineDay {
  id: string
  routine_id: string
  day_of_week: number
  created_at: string
}

export interface Exercise {
  id: string
  routine_day_id: string
  name: string
  sets: number
  reps: number
  created_at: string
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      routines: {
        Row: Routine
        Insert: Omit<Routine, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Routine, 'id' | 'created_at' | 'updated_at'>>
      }
      routine_days: {
        Row: RoutineDay
        Insert: Omit<RoutineDay, 'id' | 'created_at'>
        Update: Partial<Omit<RoutineDay, 'id' | 'created_at'>>
      }
      exercises: {
        Row: Exercise
        Insert: Omit<Exercise, 'id' | 'created_at'>
        Update: Partial<Omit<Exercise, 'id' | 'created_at'>>
      }
      user_preferences: {
        Row: {
          id: number
          created_at: string
          email: string
          fitness_goals: string[]
          experience_level: ExperienceLevel
          equipment_access: EquipmentAccess
          workout_frequency: WorkoutFrequency
          physical_limitations: PhysicalLimitations
          workout_preferences: WorkoutPreferences
          updated_at: string | null
        }
        Insert: {
          id?: number
          created_at?: string
          email: string
          fitness_goals: string[]
          experience_level: ExperienceLevel
          equipment_access: EquipmentAccess
          workout_frequency: WorkoutFrequency
          physical_limitations: PhysicalLimitations
          workout_preferences: WorkoutPreferences
          updated_at?: string | null
        }
        Update: {
          id?: number
          created_at?: string
          email?: string
          fitness_goals?: string[]
          experience_level?: ExperienceLevel
          equipment_access?: EquipmentAccess
          workout_frequency?: WorkoutFrequency
          physical_limitations?: PhysicalLimitations
          workout_preferences?: WorkoutPreferences
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_goal: UserGoal
      experience_level: ExperienceLevel
    }
  }
} 