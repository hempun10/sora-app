import { ImageSourcePropType } from "react-native";

export interface BottomBarProps {
  icon: ImageSourcePropType;
  color: string;
  focused: boolean;
  name: string;
}

export interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
}

export interface LoaderProps {
  isLoading: boolean;
}

export interface FormFieldProps {
  title: string;
  value: string;
  handleChange: (value: string) => void;
  otherStyles?: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  placeholder?: string;
}
export interface SearchInputProps {
  value: string;
  handleChange: (value: string) => void;
  otherStyles?: string;
}

export interface EmptyStateProps {
  title: string;
  subtitle: string;
}
