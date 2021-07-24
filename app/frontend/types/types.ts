export interface ProjectT {
  id: number;
  name: string;
  technology: string;
  description: string;
  enviroments: EnviromentT[];
  standalonePlugins: PluginT[];
}

export interface EnviromentT {
  name: string;
  plugins: PluginT[];
}

export interface PluginT {
  name: string;
  inputs: InputT[];
}

export interface InputT {
  name: string;
  type: string;
  value: string;
  id: number;
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
