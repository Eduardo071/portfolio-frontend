export interface PersonalInfo {
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  company: string;
  location: string;
  bio: string;
  email: string;
  linkedin: string;
  phone: string;
  available: boolean;
}

export interface Role {
  title: string;
  period: string;
  current?: boolean;
}

export interface Experience {
  company: string;
  location: string;
  roles: Role[];
  bullets: string[];
  tags: string[];
}

export interface SkillCategory {
  name: string;
  icon: string;
  primary: string[];
  secondary: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  icon: string;
}

export interface Profile {
  personal: PersonalInfo;
  experience: Experience[];
  skills: SkillCategory[];
  education: Education[];
}
