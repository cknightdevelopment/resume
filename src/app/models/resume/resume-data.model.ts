export interface ResumeDataModel {
  cliName: string;
  facts: string[];
  education: EducationModel[];
  skills: SkillSetModel[];
  links: LinkModel[];
  workHistory: WorkHistoryModel[];
  contact: ContactModel;
  issue: IssueModel;
  help: HelpModel;
}

export interface EducationModel {
  name: string;
  url: string;
  logo: string;
  location: string;
  start: string;
  end: string;
  degree: string;
  highlights: string[];
  other: string[];
}

export interface SkillSetModel {
  title: string;
  maxRating: number;
  ratings: SkillRatingModel[];
}

export interface SkillRatingModel {
  name: string;
  rating: number;
}

export interface LinkModel {
  title: string;
  url: string;
  icon: string;
}

export interface WorkHistoryModel {
  employer: string;
  position: string;
  start: string;
  end: string;
  details: string[];
}

export class ContactModel {
  email: string;
  phone: string;
}

export class IssueModel {
  url: string;
  title?: string;
}

export class HelpModel {
  commands: CommandHelpModel[];
}

export class CommandHelpModel {
  name: string;
  description: string;
  arguments?: ArgumentHelpModel[];
}

export class ArgumentHelpModel {
  name: string;
  description: string;
  required?: boolean;
  default?: string;
}
