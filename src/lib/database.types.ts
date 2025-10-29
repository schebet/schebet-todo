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
      tasks: {
        Row: {
          id: string
          title: string
          description: string
          priority: 'висока' | 'средња' | 'ниска'
          category: 'посао' | 'лично' | 'куповина' | 'учење'
          status: 'активан' | 'завршен' | 'хитан'
          due_date: string | null
          due_time: string | null
          progress: number
          documents_count: number
          participants_count: number
          completed: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string
          priority: 'висока' | 'средња' | 'ниска'
          category: 'посао' | 'лично' | 'куповина' | 'учење'
          status?: 'активан' | 'завршен' | 'хитан'
          due_date?: string | null
          due_time?: string | null
          progress?: number
          documents_count?: number
          participants_count?: number
          completed?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          priority?: 'висока' | 'средња' | 'ниска'
          category?: 'посао' | 'лично' | 'куповина' | 'учење'
          status?: 'активан' | 'завршен' | 'хитан'
          due_date?: string | null
          due_time?: string | null
          progress?: number
          documents_count?: number
          participants_count?: number
          completed?: boolean
          created_at?: string
        }
      }
    }
  }
}
