declare module "react-native-gl-model-view" {
	import { ViewProps } from "react-native";
	import { Component } from "react";

	interface ModelViewProps extends ViewProps {
		modelUrl: string;
		scale?: number;
		translateX?: number;
		translateY?: number;
		translateZ?: number;
		rotateX?: number;
		rotateY?: number;
		rotateZ?: number;
		animate?: boolean;
		onLoadEnd?: () => void;
		onLoadError?: (error: any) => void;
	}

	export default class ModelView extends Component<ModelViewProps> {}
}
