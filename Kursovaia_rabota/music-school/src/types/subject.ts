// @/types/subject.ts
export interface Subject {
  id: number
  name: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  hours: number
}

export interface SubjectForm {
  id?: number
  name: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  hours: number
}

export const SUBJECTS_STORAGE_KEY = 'music-school-subjects'