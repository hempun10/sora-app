import { ImageSourcePropType } from "react-native";

export interface BottomBarProps {
  icon: ImageSourcePropType;
  color: string;
  focused: boolean;
  name: string;
}
