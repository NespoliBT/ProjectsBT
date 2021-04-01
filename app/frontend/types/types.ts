export interface Project {
  id: number;
  name: string;
  technology: string;
  description: string;
  enviroments: Enviroment[];
}

export interface Enviroment {
  name: string;
  plugins: Plugin[];
}

export interface Plugin {
  name: string;
  inputs: Input[];
}

export interface Input {
  name: string;
  type: string;
  value: string;
}

export interface NewProject {
  id: number;
  name: string;
  technology: string;
  description: string;
  enviroments: {
    name: string;
    plugins: NewPlugin[];
  }[];
  standalonePlugins: NewPlugin[];
}

export interface NewPlugin {
  name: string;
  inputs: NewInput[];
}

export interface NewInput {
  name: string;
  type: string;
  value: string;
}

export interface FormPlugin {
  name: string;
  icon: string;
  class: string;
  envBound: boolean;
  inputs: FormInput[];
}

export interface FormInput {
  name: string;
  type: string;
  placeholder: string;
}
