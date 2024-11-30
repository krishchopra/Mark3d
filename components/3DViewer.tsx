import React from 'react';

"use client";

interface ThreeDViewerProps {
	productImage: string;
}

export default function ThreeDViewer({ productImage }: ThreeDViewerProps) {
	return (
		<div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
			<img
				src={productImage}
				alt="3D View"
				className="max-w-full max-h-full object-contain"
			/>
			<div className="absolute bottom-4 text-gray-500">
				3D View (Simulated)
			</div>
		</div>
	);
}
