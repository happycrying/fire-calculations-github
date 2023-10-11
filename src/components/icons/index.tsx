import { Loading } from "~/components/icons/Loading";
import { QuestionMark } from "~/components/icons/QuestionMark";

export const icons = {
  loading:Loading,
  questionMark: QuestionMark
} as const;


export type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  width?: number;
  height?: number;
  [key: string]: any;
}

export function Icon({
                       name,
                       size = 36,
                       className,
                       width,
                       height,
                       ...props
                     }: IconProps) {
  const Icon = icons[name] as React.ElementType;
  return (
    <div
      className={className}
      style={{
        width: size !== -1 ? size + "px" : undefined,
        height: size !== -1 ? size + "px" : undefined,
      }}
      {...props}
    >
      <Icon width={width} height={height} color={props.color} />
    </div>
  );
}

export default icons;