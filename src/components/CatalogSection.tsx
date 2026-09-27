import React, { useState, useMemo } from "react";
import { SlidersHorizontal, ArrowUpDown, X, Search, RotateCcw } from "lucide-react";
import { Product } from "../data/products";
import { ProductCard } from "./ProductCard";
import { STORE_CONFIG } from "../data/storeConfig";

interface CatalogSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  initialAudience?: string;
  initialType?: string;
  initialOnlyPromo?: boolean;
  initialOnlyNew?: boolean;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  products,
  onSelectProduct,
  initialAudience = "Todos",
  initialType = "Todos",
  initialOnlyPromo = false,
  initialOnlyNew = false,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAudience, setSelectedAudience] = useState<string>(initialAudience);
  const [selectedType, setSelectedType] = useState<string>(initialType);
  const [selectedSize, setSelectedSize] = useState<string>("Todos");
  const [selectedColor, setSelectedColor] = useState<string>("Todos");
  const [onlyPromotions, setOnlyPromotions] = useState<boolean>(initialOnlyPromo);
  const [onlyNew, setOnlyNew] = useState<boolean>(initialOnlyNew);
  const [sortBy, setSortBy] = useState<"recents" | "price-asc" | "price-desc" | "name">("recents");
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Lista única de tamanhos disponíveis no catálogo
  const allSizes = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.sizes.forEach((s) => set.add(s)));
    return Array.from(set);
  }, [products]);

  // Lista única de cores disponíveis no catálogo
  const allColors = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.colors.forEach((c) => set.add(c)));
    return Array.from(set);
  }, [products]);

  // Filtragem
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Busca por texto
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesType = product.type.toLowerCase().includes(query);
        const matchesAudience = product.audience.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesDescription = product.description.toLowerCase().includes(query);
        const matchesColor = product.colors.some((c) => c.toLowerCase().includes(query));
        if (!matchesName && !matchesType && !matchesAudience && !matchesCategory && !matchesDescription && !matchesColor) {
          return false;
        }
      }

      // Filtro de Público / Categoria
      if (selectedAudience !== "Todos" && product.audience !== selectedAudience && product.category !== selectedAudience) {
        return false;
      }

      // Filtro de Tipo de peça
      if (selectedType !== "Todos" && product.type !== selectedType) {
        return false;
      }

      // Filtro de Tamanho
      if (selectedSize !== "Todos" && !product.sizes.includes(selectedSize)) {
        return false;
      }

      // Filtro de Cor
      if (selectedColor !== "Todos" && !product.colors.includes(selectedColor)) {
        return false;
      }

      // Filtro Apenas Promoções
      if (onlyPromotions && !product.isPromotion) {
        return false;
      }

      // Filtro Apenas Novidades
      if (onlyNew && !product.isNew) {
        return false;
      }

      return true;
    });
  }, [products, searchQuery, selectedAudience, selectedType, selectedSize, selectedColor, onlyPromotions, onlyNew]);

  // Ordenação
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case "price-asc":
        return list.sort((a, b) => {
          if (a.price === null) return 1;
          if (b.price === null) return -1;
          return a.price - b.price;
        });
      case "price-desc":
        return list.sort((a, b) => {
          if (a.price === null) return 1;
          if (b.price === null) return -1;
          return b.price - a.price;
        });
      case "name":
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case "recents":
      default:
        // Mantém ordenação ou prioriza isNew
        return list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }
  }, [filteredProducts, sortBy]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedAudience !== "Todos" ||
    selectedType !== "Todos" ||
    selectedSize !== "Todos" ||
    selectedColor !== "Todos" ||
    onlyPromotions ||
    onlyNew;

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedAudience("Todos");
    setSelectedType("Todos");
    setSelectedSize("Todos");
    setSelectedColor("Todos");
    setOnlyPromotions(false);
    setOnlyNew(false);
    setSortBy("recents");
  };

  return (
    <section className="py-8 sm:py-12 bg-[#FAF9F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Cabeçalho do Catálogo */}
        <div className="border-b border-stone-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-stone-500 font-medium">
              Vitrine Completa
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl text-stone-950 font-normal">
              Catálogo de Produtos
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-stone-500 tabular-nums">
              Mostrando {sortedProducts.length} de {products.length} peças
            </span>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-stone-800 hover:text-stone-950 underline inline-flex items-center gap-1 font-medium"
              >
                <RotateCcw className="w-3 h-3" />
                Limpar filtros
              </button>
            )}
          </div>
        </div>

        {/* Barra Superior de Controles e Filtros Rápidos */}
        <div className="bg-white border border-stone-200 p-4 space-y-4">
          {/* Linha 1: Campo de Busca e Botão de Filtro Mobile / Ordenação */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquisar por nome, tipo ou cor..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 focus:outline-none focus:border-stone-900 text-stone-900 placeholder:text-stone-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Botão de Toggle Filtros (Mobile) */}
              <button
                type="button"
                onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                className="sm:hidden px-3 py-2 border border-stone-200 text-xs uppercase tracking-wider font-medium text-stone-800 flex items-center gap-1.5"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Filtros {hasActiveFilters && "•"}
              </button>

              {/* Ordenar Dropdown */}
              <div className="flex items-center gap-1.5 border border-stone-200 px-3 py-2 bg-white">
                <ArrowUpDown className="w-3.5 h-3.5 text-stone-500" />
                <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 hidden sm:inline">
                  Ordenar:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-xs text-stone-900 font-medium focus:outline-none cursor-pointer"
                >
                  <option value="recents">Mais recentes</option>
                  <option value="price-asc">Menor preço</option>
                  <option value="price-desc">Maior preço</option>
                  <option value="name">Nome (A-Z)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Linha 2: Filtros Desktop ou Gaveta Mobile */}
          <div className={`${showFiltersMobile ? "block" : "hidden sm:block"} pt-3 border-t border-stone-100 space-y-3`}>
            {/* Segmentos de Categorias / Público */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 mr-2">
                Público:
              </span>
              <button
                type="button"
                onClick={() => setSelectedAudience("Todos")}
                className={`px-3 py-1 text-xs transition-colors ${
                  selectedAudience === "Todos"
                    ? "bg-stone-950 text-white font-medium"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                Todos
              </button>
              {STORE_CONFIG.categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedAudience(cat.id)}
                  className={`px-3 py-1 text-xs transition-colors ${
                    selectedAudience === cat.id
                      ? "bg-stone-950 text-white font-medium"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Segmentos de Tipos de Peça */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 mr-2">
                Peça:
              </span>
              <button
                type="button"
                onClick={() => setSelectedType("Todos")}
                className={`px-3 py-1 text-xs transition-colors ${
                  selectedType === "Todos"
                    ? "bg-stone-950 text-white font-medium"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                Todos os tipos
              </button>
              {STORE_CONFIG.types.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setSelectedType(type.id)}
                  className={`px-3 py-1 text-xs transition-colors ${
                    selectedType === type.id
                      ? "bg-stone-950 text-white font-medium"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>

            {/* Toggles Especiais: Apenas Novidades e Apenas Promoções + Tamanho */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100">
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-800 font-medium">
                  <input
                    type="checkbox"
                    checked={onlyNew}
                    onChange={(e) => setOnlyNew(e.target.checked)}
                    className="w-4 h-4 accent-stone-950 rounded-none cursor-pointer"
                  />
                  Apenas Novidades
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-800 font-medium">
                  <input
                    type="checkbox"
                    checked={onlyPromotions}
                    onChange={(e) => setOnlyPromotions(e.target.checked)}
                    className="w-4 h-4 accent-stone-950 rounded-none cursor-pointer"
                  />
                  Apenas Promoções
                </label>
              </div>

              {/* Filtro de Tamanho Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-500">
                  Tamanho:
                </span>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="px-2 py-1 bg-stone-50 border border-stone-200 text-xs text-stone-800 focus:outline-none"
                >
                  <option value="Todos">Todos</option>
                  {allSizes.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Grade de Produtos */}
        {sortedProducts.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-white border border-stone-200 p-8">
            <h3 className="font-editorial text-2xl text-stone-900">
              Nenhuma peça encontrada
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Não encontramos produtos para a combinação de filtros selecionada. Tente limpar alguns filtros para visualizar mais itens.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 px-6 py-2.5 bg-stone-900 text-white text-xs uppercase tracking-widest font-semibold hover:bg-stone-800 transition-colors"
            >
              Ver todas as peças
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 lg:gap-x-8 gap-y-8 sm:gap-y-12">
            {sortedProducts.map((product) => (
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
