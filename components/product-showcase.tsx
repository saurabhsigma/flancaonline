"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ChevronRight, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatTechStack } from "@/lib/utils";

type Product = {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  images: { url: string; alt: string }[];
};

export function ProductShowcase({ products }: { products: Product[] }) {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const selectedProduct = useMemo(
    () => products.find((product) => product._id === selectedProductId) ?? null,
    [products, selectedProductId],
  );

  return (
    <>
      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        {products.map((product) => (
          <Card
            key={product._id}
            className="group overflow-hidden border-border/70 bg-card/85 transition duration-300 hover:-translate-y-2"
          >
            <button
              type="button"
              onClick={() => setSelectedProductId(product._id)}
              className="block h-full w-full text-left"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={product.images[0]?.url ?? "https://res.cloudinary.com/demo/image/upload/sample.jpg"}
                  alt={product.images[0]?.alt ?? product.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-semibold">{product.title}</h3>
                  <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  Click to view the product description.
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-primary">
                  {formatTechStack(product.techStack)}
                </p>
              </div>
            </button>
          </Card>
        ))}
      </div>

      {selectedProduct ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8 backdrop-blur-sm"
          onClick={() => setSelectedProductId(null)}
        >
          <Card
            className="relative w-full max-w-3xl overflow-hidden border-border/70 bg-background shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[240px] lg:min-h-full">
                <Image
                  src={selectedProduct.images[0]?.url ?? "https://res.cloudinary.com/demo/image/upload/sample.jpg"}
                  alt={selectedProduct.images[0]?.alt ?? selectedProduct.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-primary">Product</p>
                    <h3 className="mt-2 text-3xl font-semibold tracking-tight">
                      {selectedProduct.title}
                    </h3>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedProductId(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <p className="mt-5 text-sm leading-7 text-muted-foreground">
                  {selectedProduct.description}
                </p>
                <div className="mt-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Tech stack
                  </p>
                  <p className="mt-2 text-sm text-foreground">
                    {formatTechStack(selectedProduct.techStack)}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      ) : null}
    </>
  );
}