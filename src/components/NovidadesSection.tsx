import React from "react";
import { Product } from "../data/products";
import { ProductCard } from "./ProductCard";
import { Sparkles, ArrowRight } from "lucide-react";

interface NovidadesSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onExploreCatalog: () => void;
}

export const NovidadesSection: React.FC<NovidadesSectionProps> = ({
  products,
  onSelectProduct,
  onExploreCatalog,
}) => {
  const newProducts = products.filter((p) => p.isNew);

  return (
    <section className="py-10 sm:py-16 bg-[#FAF9F5] min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Cabeçalho */}
        <div className="border-b border-stone-200 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-stone-500 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Lançamentos Recentes</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-4xl text-stone-950 font-normal">
              Novidades da Loja
            </h1>
          </div>

          <p className="text-xs text-stone-500 max-w-xs sm:text-right">
            Peças recém-chegadas à nossa vitrine com disponibilidade para consulta direta em Bagé.
          </p>
        </div>

        {/* Grade de Novidades */}
        {newProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-white border border-stone-200 p-8 max-w-lg mx-auto">
            <h2 className="font-editorial text-2xl text-stone-900">
              Nenhuma novidade recente
            </h2>
            <p className="text-xs text-stone-500 leading-relaxed">
              Estamos preparando a nova coleção. Navegue pelas nossas peças em catálogo.
            </p>
            <button
              type="button"
              onClick={onExploreCatalog}
              className="mt-4 px-6 py-3 bg-stone-950 text-white text-xs uppercase tracking-widest font-semibold hover:bg-stone-800 transition-colors inline-flex items-center gap-2"
            >
              <span>Ver catálogo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 lg:gap-x-8 gap-y-8 sm:gap-y-12">
            {newProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
