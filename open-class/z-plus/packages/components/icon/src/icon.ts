import { ExtractPropTypes } from "vue";
// ExtractPropTypes vue内置的一个类型，传入类型，它会返回一个props类型

export const iconProps = {
  size: {
    type: Number,
  },
  color: {
    type: String,
  }
} as const
//  as const 表示此类型是只读的

export type IconProps = ExtractPropTypes<typeof iconProps>;
