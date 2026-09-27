import React from "react";
import { Product } from "../data/products";
import { formatBRL, calculateDiscountPercentage } from "../utils/formatters";

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
}) => {
  const discount = calculateDiscountPercentage(
    product.previousPrice,
    product.price
  );

  return (
    <article
      onClick={() => onSelect(product)}
      className="group cursor-pointer flex flex-col focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-900"
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(product);
        }
      }}
      aria-label={`Ver detalhes de ${product.name}`}
    >
      {/* Container de Imagem Protagonista */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100/90 mb-3 sm:mb-4">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />

        {/* Badges sutis e elegantes */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10 pointer-events-none">
          {product.isNew && (
            <span className="bg-stone-900/90 backdrop-blur-xs text-white text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5">
              Novidade
            </span>
          )}
          {discount && (
            <span className="bg-stone-100/95 backdrop-blur-xs text-stone-900 border border-stone-300/80 text-[10px] font-bold tracking-wider px-2 py-0.5 tabular-nums">
              -{discount}%
            </span>
          )}
        </div>

        {/* Hover overlay hint */}
        <div className="absolute inset-x-0 bottom-0 py-2.5 bg-gradient-to-t from-stone-900/40 via-stone-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
          <span className="text-white text-xs uppercase tracking-widest font-medium drop-shadow-sm">
            Ver detalhes
          </span>
        </div>
      </div>

      {/* Metadados e Tipografia */}
      <div className="flex flex-col flex-1 space-y-1">
        <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-stone-600 font-medium">
          <span>{product.type}</span>
          <span aria-hidden="true">·</span>
          <span>{product.audience}</span>
        </div>

        <h3 className="text-sm sm:text-base font-normal text-stone-900 group-hover:text-stone-700 transition-colors line-clamp-1">
          {product.name}
        </h3>

        {/* Preço atual e anterior com desconto */}
        <div className="pt-0.5 flex items-baseline gap-2 flex-wrap">
          <span className="text-sm sm:text-base font-semibold text-stone-950 tabular-nums">
            {formatBRL(product.price)}
          </span>

          {product.previousPrice && (
            <span className="text-xs text-stone-500 line-through tabular-nums">
              {formatBRL(product.previousPrice)}
            </span>
          )}

          {discount && (
            <span className="text-[11px] text-stone-700 font-medium tracking-tight">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Cores disponíveis preview sutil */}
        {product.colors && product.colors.length > 0 && (
          <p className="text-[11px] text-stone-500 truncate pt-0.5">
            {product.colors.join(" · ")}
          </p>
        )}
      </div>
    </article>
  );
};
