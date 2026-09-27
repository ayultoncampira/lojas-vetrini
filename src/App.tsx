import React, { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { FeaturedEditorial } from "./components/FeaturedEditorial";
import { CategorySection } from "./components/CategorySection";
import { CatalogSection } from "./components/CatalogSection";
import { PromotionsSection } from "./components/PromotionsSection";
import { NovidadesSection } from "./components/NovidadesSection";
import { InstagramSection } from "./components/InstagramSection";
import { AboutAndLocationSection } from "./components/AboutAndLocationSection";
import { Footer } from "./components/Footer";
import { ProductDetailModal } from "./components/ProductDetailModal";
import { SearchModal } from "./components/SearchModal";
import { CartDrawer } from "./components/CartDrawer";
import { CartProvider, useCart } from "./context/CartContext";
import { DEMO_PRODUCTS, Product } from "./data/products";
import { Check } from "lucide-react";

const MainContent: React.FC = () => {
  const [activeView, setActiveView] = useState<string>("inicio");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Filtros contextuais passados para a visualização do Catálogo
  const [catalogFilters, setCatalogFilters] = useState<{
    audience: string;
    type: string;
    onlyPromo: boolean;
    onlyNew: boolean;
  }>({
    audience: "Todos",
    type: "Todos",
    onlyPromo: false,
    onlyNew: false,
  });

  const { toastMessage } = useCart();

  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseProduct = () => {
    setSelectedProduct(null);
  };

  const handleSelectCategory = (category: string) => {
    setCatalogFilters({
      audience: category,
      type: "Todos",
      onlyPromo: false,
      onlyNew: false,
    });
    setActiveView("catalogo");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectType = (type: string) => {
    setCatalogFilters({
      audience: "Todos",
      type: type,
      onlyPromo: false,
      onlyNew: false,
    });
    setActiveView("catalogo");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleExploreNew = () => {
    setActiveView("novidades");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleExplorePromos = () => {
    setActiveView("promocoes");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewAllCatalog = () => {
    setCatalogFilters({
      audience: "Todos",
      type: "Todos",
      onlyPromo: false,
      onlyNew: false,
    });
    setActiveView("catalogo");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-stone-900 selection:bg-stone-950 selection:text-white">
      {/* Toast Feedback sutil */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-stone-950 text-white px-4 py-2.5 text-xs font-medium tracking-wide shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header com Navegação e Ações */}
      <Header
        activeView={activeView}
        setActiveView={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        openSearch={() => setIsSearchOpen(true)}
      />

      {/* Conteúdo Principal com base na View Ativa */}
      <main className="flex-1">
        {activeView === "inicio" && (
          <>
            <Hero
              onExploreNew={handleExploreNew}
              onExplorePromos={handleExplorePromos}
            />
            <FeaturedEditorial
              products={DEMO_PRODUCTS}
              onSelectProduct={handleOpenProduct}
              onViewAllCatalog={handleViewAllCatalog}
            />
            <CategorySection
              onSelectCategory={handleSelectCategory}
              onSelectType={handleSelectType}
            />
            <InstagramSection />
            <AboutAndLocationSection />
          </>
        )}

        {activeView === "novidades" && (
          <NovidadesSection
            products={DEMO_PRODUCTS}
            onSelectProduct={handleOpenProduct}
            onExploreCatalog={handleViewAllCatalog}
          />
        )}

        {activeView === "catalogo" && (
          <CatalogSection
            products={DEMO_PRODUCTS}
            onSelectProduct={handleOpenProduct}
            initialAudience={catalogFilters.audience}
            initialType={catalogFilters.type}
            initialOnlyPromo={catalogFilters.onlyPromo}
            initialOnlyNew={catalogFilters.onlyNew}
          />
        )}

        {activeView === "categorias" && (
          <div className="py-6">
            <CategorySection
              onSelectCategory={handleSelectCategory}
              onSelectType={handleSelectType}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
              <button
                type="button"
                onClick={handleViewAllCatalog}
                className="px-8 py-3.5 bg-stone-950 text-white text-xs uppercase tracking-widest font-semibold hover:bg-stone-800 transition-colors"
              >
                Abrir catálogo com todas as peças
              </button>
            </div>
          </div>
        )}

        {activeView === "promocoes" && (
          <PromotionsSection
            products={DEMO_PRODUCTS}
            onSelectProduct={handleOpenProduct}
            onExploreCatalog={handleViewAllCatalog}
          />
        )}

        {activeView === "sobre" && (
          <div className="py-4">
            <AboutAndLocationSection />
            <InstagramSection />
          </div>
        )}
      </main>

      {/* Rodapé Limpo */}
      <Footer onNavClick={(view) => {
        setActiveView(view);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }} />

      {/* Modal de Detalhes do Produto */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={handleCloseProduct}
      />

      {/* Modal de Pesquisa */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={DEMO_PRODUCTS}
        onSelectProduct={handleOpenProduct}
      />

      {/* Drawer da Sacola */}
      <CartDrawer onContinueShopping={() => {
        if (activeView === "inicio") {
          setActiveView("catalogo");
        }
      }} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <CartProvider>
      <MainContent />
    </CartProvider>
  );
};

export default App;
