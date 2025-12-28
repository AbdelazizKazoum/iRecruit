export interface ResumeExperience {
  position: string;
  company: string;
  startDate: string;
  endDate?: string;
  currentlyWorking?: boolean;
  description?: string;
}

export interface ResumeEducation {
  degree: string;
  fieldOfStudy?: string;
  school: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface ResumeSkillGroup {
  category: string;
  skills: string[];
}

export interface ResumeData {
  fullName: string;
  email?: string;
  phone?: string;
  location?: string;
  summary?: string;
  experience: ResumeExperience[];
  education: ResumeEducation[];
  skills: ResumeSkillGroup[];
}
