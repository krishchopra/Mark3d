"use client";

import React, { useState } from "react";
import ProductCard from "./ProductCard";
import ThreeDViewer from "./3DViewer";

const products = [
	{
		id: "1",
		name: "Vintage Chair",
		price: 150,
		image: "/placeholder.svg?height=200&width=200",
	},
	{
		id: "2",
		name: "Retro Lamp",
		price: 80,
		image: "/placeholder.svg?height=200&width=200",
	},
	{
		id: "3",
		name: "Antique Table",
		price: 300,
		image: "/placeholder.svg?height=200&width=200",
	},
	{
		id: "4",
		name: "Classic Bookshelf",
		price: 200,
		image: "/placeholder.svg?height=200&width=200",
	},
];

export default function ProductGrid() {
	const [selected3DProduct, setSelected3DProduct] = useState<string | null>(
		null
	);

	return (
		<div className="w-full max-w-6xl">
			{selected3DProduct ? (
				<div className="w-full aspect-square">
					<ThreeDViewer
						productImage={
							products.find((p) => p.id === selected3DProduct)
								?.image || ""
						}
					/>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{products.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
							onView3D={() => setSelected3DProduct(product.id)}
						/>
					))}
				</div>
			)}
		</div>
	);
}
