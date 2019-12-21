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

export enum FunctionReturnTypes {
  any = "any",
  boolean = "boolean",
  function = "function",
  number = "number",
  string = "string",
  table = "table",
}

export interface FunctionOutput {
  type: FunctionReturnTypes
  description: string
}

export interface Function {
  name: string
  category: FunctionCategories
  output: FunctionOutput
}

export interface Page {
  path: string
  title: string
  description: string
  css: string
  body: string
  function?: Function
}
