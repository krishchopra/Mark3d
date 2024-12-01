declare module "react-native-3d-model-view" {
  import { ViewProps } from "react-native";
  import { Component } from "react";

  interface ModelViewProps extends ViewProps {
    source: {
      model: string;
      texture?: string;
    };
    backgroundColor?: string;
    camera?: {
      position: [number, number, number];
      target: [number, number, number];
    };
    onLoadModelStart?: () => void;
    onLoadModelSuccess?: () => void;
    onLoadModelError?: (error: any) => void;
    onTap?: (event: any) => void;
  }

  export default class ModelView extends Component<ModelViewProps> {}
}
