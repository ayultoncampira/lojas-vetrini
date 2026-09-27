import React, { useState } from "react";
import { Search, ShoppingBag, Menu, X, ArrowUpRight } from "lucide-react";
import { STORE_CONFIG } from "../data/storeConfig";
import { useCart } from "../context/CartContext";

interface HeaderProps {
  activeView: string;
  setActiveView: (view: string) => void;
  openSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  openSearch,
}) => {
  const { totalQuantity, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "inicio", label: "Início" },
    { id: "novidades", label: "Novidades" },
    { id: "catalogo", label: "Catálogo" },
    { id: "categorias", label: "Categorias" },
    { id: "promocoes", label: "Promoções" },
    { id: "sobre", label: "Sobre" },
  ];

  const handleNavClick = (viewId: string) => {
    setActiveView(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20">
            {/* Mobile menu trigger */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 text-stone-800 hover:text-stone-950 focus:outline-none focus-visible:ring-1 focus-visible:ring-stone-900"
                aria-label="Abrir menu de navegação"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            {/* Zone 1: Wordmark Brand */}
            <div className="flex-1 lg:flex-initial text-center lg:text-left">
              <button
                type="button"
                onClick={() => handleNavClick("inicio")}
                className="inline-block text-left group"
              >
                <span className="font-editorial text-2xl sm:text-3xl font-medium tracking-tight text-stone-900 group-hover:text-stone-700 transition-colors">
                  {STORE_CONFIG.name}
                </span>
              </button>
            </div>

            {/* Zone 2: Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-widest font-medium text-stone-600">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`py-1 transition-colors relative whitespace-nowrap ${
                    activeView === item.id
                      ? "text-stone-950 font-semibold"
                      : "hover:text-stone-950"
                  }`}
                >
                  {item.label}
                  {activeView === item.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-stone-900 rounded-full" />
                  )}
                </button>
              ))}
              <a
                href={STORE_CONFIG.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="py-1 hover:text-stone-950 transition-colors inline-flex items-center gap-0.5 whitespace-nowrap"
              >
                Instagram
                <ArrowUpRight className="w-3 h-3 text-stone-400" />
              </a>
            </nav>

            {/* Zone 3: Actions (Search & Cart) */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                type="button"
                onClick={openSearch}
                className="p-2 text-stone-700 hover:text-stone-950 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-stone-900 flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium"
                aria-label="Pesquisar produtos"
              >
                <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                <span className="hidden md:inline">Pesquisar</span>
              </button>

              <button
                type="button"
                onClick={openCart}
                className="p-2 relative text-stone-900 hover:text-stone-700 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-stone-900 flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium"
                aria-label={`Sacola com ${totalQuantity} itens`}
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5" />
                  {totalQuantity > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-4.5 h-4.5 px-1 bg-stone-900 text-white text-[10px] font-semibold tabular-nums rounded-full flex items-center justify-center animate-in fade-in zoom-in-75 duration-200">
                      {totalQuantity}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline">Sacola</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="relative w-full max-w-xs bg-[#FAF9F5] h-full shadow-2xl flex flex-col z-10 p-6 border-r border-stone-200">
            <div className="flex items-center justify-between pb-6 border-b border-stone-200">
              <span className="font-editorial text-2xl font-medium text-stone-900">
                {STORE_CONFIG.name}
              </span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-stone-500 hover:text-stone-900"
                aria-label="Fechar menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 flex-1 space-y-4 overflow-y-auto">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left py-2.5 text-base font-medium tracking-wide transition-colors ${
                    activeView === item.id
                      ? "text-stone-950 font-semibold"
                      : "text-stone-600 hover:text-stone-950"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <a
                href={STORE_CONFIG.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-2.5 text-base font-medium text-stone-600 hover:text-stone-950 transition-colors"
              >
                <span>Instagram ({STORE_CONFIG.instagram.handle})</span>
                <ArrowUpRight className="w-4 h-4 text-stone-400" />
              </a>
            </div>

            <div className="pt-6 border-t border-stone-200 space-y-2 text-xs text-stone-500">
              <p className="font-medium text-stone-800">{STORE_CONFIG.city} — {STORE_CONFIG.state}</p>
              <p>{STORE_CONFIG.address.street} - {STORE_CONFIG.address.neighborhood}</p>
              <p className="tabular-nums">WhatsApp: {STORE_CONFIG.whatsapp.display}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
