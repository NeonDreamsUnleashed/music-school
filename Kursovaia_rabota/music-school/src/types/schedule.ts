export interface Teacher {
  id: number
  name: string
  age: number
  subject: string
  photo: string
}

export interface Student {
  id: number
  firstName: string
  lastName: string
  age: number
  subject: string
}

export interface Lesson {
  id: number
  date: string
  time: string
  teacherId: number
  studentIds: number[]
  subject: string
}

export interface LessonFormData {
  teacherId: string | number
  studentIds: number[]
  date: string
  time: string
  subject: string
}