import React from "react";
import { ArrowUpRight, MessageCircle, Instagram, MapPin } from "lucide-react";
import { STORE_CONFIG } from "../data/storeConfig";

interface FooterProps {
  onNavClick: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between">
          {/* Coluna 1: Nome da Marca & Localização */}
          <div className="md:col-span-5 space-y-3">
            <span className="font-editorial text-2xl sm:text-3xl text-white font-medium tracking-tight block">
              {STORE_CONFIG.name}
            </span>
            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              {STORE_CONFIG.tagline} Vitrine digital e catálogo de moda contemporânea em {STORE_CONFIG.city} — {STORE_CONFIG.state}.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-stone-400 pt-1">
              <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span>{STORE_CONFIG.address.street} - {STORE_CONFIG.address.neighborhood}, {STORE_CONFIG.city} - {STORE_CONFIG.state}</span>
            </div>
          </div>

          {/* Coluna 2: Navegação Rápida */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-[11px] uppercase tracking-widest text-stone-400 font-semibold block mb-2">
              Navegação
            </span>
            <div className="flex flex-col space-y-2 text-xs">
              <button
                type="button"
                onClick={() => onNavClick("inicio")}
                className="text-left text-stone-300 hover:text-white transition-colors"
              >
                Início
              </button>
              <button
                type="button"
                onClick={() => onNavClick("novidades")}
                className="text-left text-stone-300 hover:text-white transition-colors"
              >
                Novidades
              </button>
              <button
                type="button"
                onClick={() => onNavClick("catalogo")}
                className="text-left text-stone-300 hover:text-white transition-colors"
              >
                Catálogo Geral
              </button>
              <button
                type="button"
                onClick={() => onNavClick("promocoes")}
                className="text-left text-stone-300 hover:text-white transition-colors"
              >
                Promoções
              </button>
              <button
                type="button"
                onClick={() => onNavClick("sobre")}
                className="text-left text-stone-300 hover:text-white transition-colors"
              >
                Sobre a Loja
              </button>
            </div>
          </div>

          {/* Coluna 3: Contatos Oficiais */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-[11px] uppercase tracking-widest text-stone-400 font-semibold block mb-2">
              Canais Oficiais
            </span>
            <div className="space-y-2 text-xs">
              <a
                href={`https://wa.me/${STORE_CONFIG.whatsapp.raw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-stone-300 hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: {STORE_CONFIG.whatsapp.display}</span>
                <ArrowUpRight className="w-3 h-3 text-stone-500" />
              </a>

              <a
                href={STORE_CONFIG.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-stone-300 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4 text-rose-400" />
                <span>Instagram: {STORE_CONFIG.instagram.handle}</span>
                <ArrowUpRight className="w-3 h-3 text-stone-500" />
              </a>

              <a
                href={STORE_CONFIG.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-stone-300 hover:text-white transition-colors"
              >
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Como chegar (Google Maps)</span>
                <ArrowUpRight className="w-3 h-3 text-stone-500" />
              </a>
            </div>
          </div>
        </div>

        {/* Linha de Copyright */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-3">
          <p>
            © {new Date().getFullYear()} {STORE_CONFIG.name}. Todos os direitos reservados. {STORE_CONFIG.city} — {STORE_CONFIG.state}.
          </p>
          <p className="text-[11px] text-stone-400">
            Vitrine digital para consulta e atendimento exclusivo via WhatsApp.
          </p>
        </div>
      </div>
    </footer>
  );
};
