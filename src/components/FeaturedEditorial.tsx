import React from "react";
import { ArrowRight } from "lucide-react";
import { Product } from "../data/products";
import { ProductCard } from "./ProductCard";
import { formatBRL, calculateDiscountPercentage } from "../utils/formatters";

interface FeaturedEditorialProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onViewAllCatalog: () => void;
}

export const FeaturedEditorial: React.FC<FeaturedEditorialProps> = ({
  products,
  onSelectProduct,
  onViewAllCatalog,
}) => {
  // Pegamos os primeiros itens marcados como isNew ou isFeatured
  const featured = products.filter((p) => p.isFeatured || p.isNew);
  const heroProduct = featured[0] || products[0];
  const sideProducts = featured.slice(1, 3);
  const restProducts = featured.slice(3, 7);

  const heroDiscount = calculateDiscountPercentage(
    heroProduct?.previousPrice,
    heroProduct?.price
  );

  return (
    <section className="py-14 sm:py-20 bg-[#FAF9F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 border-b border-stone-200 pb-5 gap-4">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-stone-500 font-medium">
              Curadoria da Estação
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-stone-950 font-normal">
              Novidades em Destaque
            </h2>
          </div>

          <button
            type="button"
            onClick={onViewAllCatalog}
            className="text-xs uppercase tracking-widest font-semibold text-stone-900 hover:text-stone-600 transition-colors inline-flex items-center gap-1.5 group self-start sm:self-auto"
          >
            <span>Ver catálogo completo</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Composição Assimétrica Editorial: 1 Grande + 2 Menores */}
        {heroProduct && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12 sm:mb-16">
            {/* Produto Hero em Destaque Grande */}
            <div
              onClick={() => onSelectProduct(heroProduct)}
              className="lg:col-span-7 group cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectProduct(heroProduct);
                }
              }}
            >
              <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] w-full overflow-hidden bg-stone-100 shadow-sm">
                <img
                  src={heroProduct.images[0]}
                  alt={heroProduct.name}
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-stone-950 text-white text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1">
                    Destaque
                  </span>
                  {heroDiscount && (
                    <span className="bg-white/95 text-stone-950 text-xs font-bold px-2 py-0.5 tabular-nums">
                      {heroDiscount}% OFF
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-4 space-y-1">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-medium">
                  <span>{heroProduct.type}</span>
                  <span aria-hidden="true">·</span>
                  <span>{heroProduct.audience}</span>
                </div>
                <h3 className="font-editorial text-2xl sm:text-3xl text-stone-950 group-hover:text-stone-700 transition-colors">
                  {heroProduct.name}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 max-w-xl">
                  {heroProduct.description}
                </p>
                <div className="pt-1 flex items-baseline gap-3">
                  <span className="text-lg font-semibold text-stone-950 tabular-nums">
                    {formatBRL(heroProduct.price)}
                  </span>
                  {heroProduct.previousPrice && (
                    <span className="text-xs text-stone-400 line-through tabular-nums">
                      {formatBRL(heroProduct.previousPrice)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Coluna Lateral com 2 Peças Menores */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 sm:gap-8">
              {sideProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={onSelectProduct}
                />
              ))}
            </div>
          </div>
        )}

        {/* Linha Adicional de Curadoria */}
        {restProducts.length > 0 && (
          <div className="pt-8 border-t border-stone-200/70">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {restProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={onSelectProduct}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
