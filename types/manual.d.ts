export enum DataTypes {
  any = "any",
  boolean = "boolean",
  function = "function",
  number = "number",
  string = "string",
  table = "table",
}

export enum FunctionCategories {
  draw = "draw",
  graphics = "graphics",
  input = "input",
  math = "math",
  memory = "memory",
  misc = "misc",
  string = "string",
  tables = "tables",
}

export interface FunctionExample {
  name: string
  lua: string
}

export interface FunctionOutput {
  type: DataTypes
  desc: string
}

export interface FunctionParameter {
  name: string
  type: DataTypes
  desc: string
  default: string
}

export interface Function {
  name: string
  category: FunctionCategories
  input: FunctionParameter[]
  output: FunctionOutput
  examples: FunctionExample[]
}

export interface Page {
  path: string
  title: string
  description: string
  css: string
  body: string
  function?: Function
}
