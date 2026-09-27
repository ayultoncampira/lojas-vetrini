import React from "react";
import { Product } from "../data/products";
import { ProductCard } from "./ProductCard";
import { Tag, ArrowRight } from "lucide-react";

interface PromotionsSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onExploreCatalog: () => void;
}

export const PromotionsSection: React.FC<PromotionsSectionProps> = ({
  products,
  onSelectProduct,
  onExploreCatalog,
}) => {
  const promoProducts = products.filter((p) => p.isPromotion);

  return (
    <section className="py-10 sm:py-16 bg-[#FAF9F5] min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Cabeçalho */}
        <div className="border-b border-stone-200 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-stone-500 font-medium">
              <Tag className="w-3.5 h-3.5" />
              <span>Oportunidades Especiais</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-4xl text-stone-950 font-normal">
              Seleção em Promoção
            </h1>
          </div>

          <p className="text-xs text-stone-500 max-w-xs sm:text-right">
            Peças selecionadas com condições especiais calculadas diretamente na vitrine.
          </p>
        </div>

        {/* Grade de Promoções ou Estado Vazio Elegante */}
        {promoProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-white border border-stone-200 p-8 max-w-lg mx-auto">
            <h2 className="font-editorial text-2xl text-stone-900">
              Nenhuma promoção ativa no momento
            </h2>
            <p className="text-xs text-stone-500 leading-relaxed">
              No momento, todas as nossas peças estão com valores regulares de lançamento e curadoria. Acompanhe nossas novidades ou consulte condições pelo WhatsApp.
            </p>
            <button
              type="button"
              onClick={onExploreCatalog}
              className="mt-4 px-6 py-3 bg-stone-950 text-white text-xs uppercase tracking-widest font-semibold hover:bg-stone-800 transition-colors inline-flex items-center gap-2"
            >
              <span>Ver catálogo completo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 lg:gap-x-8 gap-y-8 sm:gap-y-12">
            {promoProducts.map((product) => (
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
