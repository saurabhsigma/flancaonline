"use client";

import { useMemo, useState } from "react";
import {
  BadgeCheck,
  ChevronRight,
  CircuitBoard,
  GraduationCap,
  HeartPulse,
  LayoutGrid,
  Palette,
  Sparkles,
  Store,
  Truck,
  Users,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatTechStack } from "@/lib/utils";

type Product = {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
};

const productGlyphs = [
  LayoutGrid,
  GraduationCap,
  Sparkles,
  Store,
  HeartPulse,
  Users,
  Truck,
  Palette,
  CircuitBoard,
  BadgeCheck,
];

function getProductGlyph(product: Product, index: number) {
  const title = product.title.toLowerCase();

  if (title.includes("lms") || title.includes("school") || title.includes("learn")) {
    return GraduationCap;
  }

  if (title.includes("cms") || title.includes("news") || title.includes("content")) {
    return LayoutGrid;
  }

  if (title.includes("commerce") || title.includes("retail") || title.includes("store") || title.includes("pos")) {
    return Store;
  }

  if (title.includes("clinic") || title.includes("health")) {
    return HeartPulse;
  }

  if (title.includes("hr") || title.includes("hire") || title.includes("team")) {
    return Users;
  }

  if (title.includes("fleet") || title.includes("logistics")) {
    return Truck;
  }

  return productGlyphs[index % productGlyphs.length];
}

export function ProductShowcase({ products }: { products: Product[] }) {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const selectedProduct = useMemo(
    () => products.find((product) => product._id === selectedProductId) ?? null,
    [products, selectedProductId],
  );

  return (
    <>
      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        {products.map((product, index) => {
          const Glyph = getProductGlyph(product, index);

          return (
          <Card
            key={product._id}
            className="group overflow-hidden border-border/70 bg-card/85"
          >
            <button
              type="button"
              onClick={() => setSelectedProductId(product._id)}
              className="block h-full w-full text-left"
            >
              <div className="relative overflow-hidden bg-gradient-to-br from-primary/15 via-secondary/30 to-accent/15 px-6 py-8 sm:px-8">
                <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-primary/20 blur-2xl" />
                <div className="absolute -bottom-10 left-8 h-24 w-24 rounded-full bg-accent/20 blur-2xl" />
                <div className="relative flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex h-16 w-16 items-center justify-center rounded-3xl border border-white/60 bg-white/80 text-primary shadow-lg backdrop-blur dark:border-white/10 dark:bg-slate-950/80">
                      <Glyph className="h-7 w-7" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                        Featured product
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Built to feel polished, fast, and easy to use.
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/85 text-primary shadow-sm backdrop-blur">
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-semibold">{product.title}</h3>
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
          );
        })}
      </div>

      {selectedProduct ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8" onClick={() => setSelectedProductId(null)}>
          <Card
            className="relative w-full max-w-3xl overflow-hidden border-border/70 bg-background shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/30 to-accent/20 px-8 py-10">
                <div className="absolute -left-10 top-8 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
                <div className="absolute -right-8 bottom-0 h-28 w-28 rounded-full bg-accent/25 blur-3xl" />
                <div className="relative flex h-full min-h-[260px] items-center justify-center">
                  <div className="grid gap-4 rounded-[2rem] border border-white/60 bg-white/75 p-6 shadow-xl dark:border-white/10 dark:bg-slate-950/75">
                    <div className="flex items-center gap-4">
                      <span className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                        <Sparkles className="h-7 w-7" />
                      </span>
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                          Product preview
                        </p>
                        <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                          {selectedProduct.title}
                        </h3>
                      </div>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {selectedProduct.techStack.slice(0, 4).map((tech) => (
                        <div
                          key={tech}
                          className="rounded-2xl border border-border/60 bg-background/80 px-3 py-2 text-sm text-muted-foreground"
                        >
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
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