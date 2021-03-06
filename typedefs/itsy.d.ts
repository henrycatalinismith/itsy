export interface Point {
  x: number
  y: number
}

export interface Rect {
  x: number
  y: number
  width: number
  height: number
}

// prettier-ignore
export type PaletteIndex =
  |  0 |  1 |  2 |  3 |  4 |  5 |  6 |  7
  |  8 |  9 | 10 | 11 | 12 | 13 | 14 | 15

export interface PaletteColor {
  id: PaletteIndex
  hex: string
}

export type Palette = {
  [i in PaletteIndex]: PaletteColor
}

// prettier-ignore
export type SpritesheetPixelIndex =
  |   0 |   1 |   2 |   3 |   4 |   5 |   6 |   7
  |   8 |   9 |  10 |  11 |  12 |  13 |  14 |  15
  |  16 |  17 |  18 |  19 |  20 |  21 |  22 |  23
  |  24 |  25 |  26 |  27 |  28 |  29 |  30 |  31
  |  32 |  33 |  34 |  35 |  36 |  37 |  38 |  39
  |  40 |  41 |  42 |  43 |  44 |  45 |  46 |  47
  |  48 |  49 |  50 |  51 |  52 |  53 |  54 |  55
  |  56 |  57 |  58 |  59 |  60 |  61 |  62 |  63
  |  64 |  65 |  66 |  67 |  68 |  69 |  70 |  71
  |  72 |  73 |  74 |  75 |  76 |  77 |  78 |  79
  |  80 |  81 |  82 |  83 |  84 |  85 |  86 |  87
  |  88 |  89 |  90 |  91 |  92 |  93 |  94 |  95
  |  96 |  97 |  98 |  99 | 100 | 101 | 102 | 103
  | 104 | 105 | 106 | 107 | 108 | 109 | 110 | 111
  | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119
  | 120 | 121 | 122 | 123 | 124 | 125 | 126 | 127

export type Spritesheet = {
  [i in SpritesheetPixelIndex]: {
    [i in SpritesheetPixelIndex]: PaletteIndex
  }
}

export type PartialSpritesheet = {
  [i in SpritesheetPixelIndex]?: {
    [i in SpritesheetPixelIndex]?: PaletteIndex
  }
}

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

export interface HelpPage {
  path: string
  title: string
  description: string
  css: string
  body: string
  function?: Function
}
