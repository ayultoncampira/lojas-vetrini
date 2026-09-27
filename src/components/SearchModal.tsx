import React, { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, X, ArrowRight } from "lucide-react";
import { Product } from "../data/products";
import { formatBRL } from "../utils/formatters";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      document.body.style.overflow = "hidden";
    } else {
      setSearchTerm("");
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredProducts = searchTerm.trim()
    ? products.filter((p) => {
        const query = searchTerm.toLowerCase();
        return (
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.audience.toLowerCase().includes(query) ||
          p.type.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.colors.some((c) => c.toLowerCase().includes(query))
        );
      })
    : [];

  const handleSelect = (product: Product) => {
    onSelectProduct(product);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative bg-[#FAF9F5] w-full max-w-2xl shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input Bar */}
        <div className="p-4 sm:p-6 border-b border-stone-200 flex items-center gap-3">
          <SearchIcon className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquise por vestidos, blusas, alfaiataria, cores..."
            className="w-full bg-transparent text-base sm:text-lg text-stone-900 placeholder:text-stone-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-900 transition-colors"
            aria-label="Fechar busca"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sugestões Rápidas quando o input estiver vazio */}
        {!searchTerm.trim() && (
          <div className="p-6 space-y-4">
            <span className="text-xs uppercase tracking-wider font-semibold text-stone-400">
              Sugestões de busca
            </span>
            <div className="flex flex-wrap gap-2">
              {["Vestidos", "Linho", "Blazer", "Alfaiataria", "Pantalona", "Cetim", "Trench Coat"].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSearchTerm(tag)}
                  className="px-3 py-1.5 text-xs bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Resultados */}
        {searchTerm.trim() && (
          <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 divide-y divide-stone-200/80">
            {filteredProducts.length === 0 ? (
              <div className="py-12 text-center space-y-2">
                <p className="font-editorial text-lg text-stone-800">
                  Nenhuma peça encontrada.
                </p>
                <p className="text-xs text-stone-500">
                  Tente buscar por outro termo ou navegue pelo nosso catálogo completo.
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="pb-3 text-xs uppercase tracking-wider font-semibold text-stone-400">
                  {filteredProducts.length} {filteredProducts.length === 1 ? "resultado encontrado" : "resultados encontrados"}
                </div>
                {filteredProducts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelect(p)}
                    className="w-full py-3 px-2 flex items-center gap-4 text-left hover:bg-stone-100/80 transition-colors group"
                  >
                    <div className="w-14 h-18 bg-stone-200 shrink-0 overflow-hidden">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase tracking-wider text-stone-400">
                        {p.type} · {p.audience}
                      </span>
                      <h4 className="text-sm font-medium text-stone-900 truncate group-hover:text-stone-700">
                        {p.name}
                      </h4>
                      <p className="text-xs font-semibold text-stone-900 tabular-nums">
                        {formatBRL(p.price)}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-stone-800 transition-colors" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
