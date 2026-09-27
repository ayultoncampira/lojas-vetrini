import React from "react";
import { ArrowRight } from "lucide-react";
import { STORE_CONFIG } from "../data/storeConfig";

interface CategorySectionProps {
  onSelectCategory: (category: string) => void;
  onSelectType: (type: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  onSelectCategory,
  onSelectType,
}) => {
  return (
    <section className="py-14 sm:py-20 bg-[#FAF9F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Cabeçalho */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-stone-500 font-medium">
            Estrutura & Navegação
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-stone-950 font-normal">
            Categorias & Estilos
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Navegue por público ou escolha diretamente pelo tipo de peça desejada para seu momento.
          </p>
        </div>

        {/* Grade de Públicos Principais */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {STORE_CONFIG.categories.map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="p-5 sm:p-6 bg-white border border-stone-200 hover:border-stone-950 cursor-pointer transition-all duration-200 flex flex-col justify-between group"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectCategory(cat.id);
                }
              }}
            >
              <div className="space-y-2">
                <span className="text-[11px] font-mono tabular-nums text-stone-400">
                  0{idx + 1}
                </span>
                <h3 className="font-editorial text-xl sm:text-2xl text-stone-900 group-hover:text-stone-700 transition-colors">
                  {cat.label}
                </h3>
                <p className="text-xs text-stone-500 line-clamp-2">
                  {cat.description}
                </p>
              </div>

              <div className="pt-4 flex items-center text-xs uppercase tracking-wider font-semibold text-stone-900 group-hover:text-stone-600">
                <span>Ver peças</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Tipos de Peças (Segmentos rápidos) */}
        <div className="pt-6 border-t border-stone-200/80">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-wider font-semibold text-stone-500">
              Navegar por tipo de peça
            </span>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            {STORE_CONFIG.types.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => onSelectType(type.id)}
                className="px-4 py-2.5 bg-white border border-stone-200 hover:border-stone-900 text-xs uppercase tracking-wider font-medium text-stone-800 hover:text-stone-950 transition-colors"
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
