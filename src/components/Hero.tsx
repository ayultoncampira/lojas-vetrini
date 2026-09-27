import React from "react";
import { ArrowRight, Star } from "lucide-react";
import { STORE_CONFIG } from "../data/storeConfig";

interface HeroProps {
  onExploreNew: () => void;
  onExplorePromos: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreNew,
  onExplorePromos,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF9F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Lado Esquerdo: Tipografia Editorial e Apresentação */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              {/* Trust marker discreto sem pills candy */}
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-medium">
                <span>{STORE_CONFIG.city} — {STORE_CONFIG.state}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 text-stone-700">
                  <Star className="w-3.5 h-3.5 fill-stone-800 text-stone-800" />
                  <span className="tabular-nums font-semibold">{STORE_CONFIG.rating.score}</span>
                  <span className="text-stone-400">({STORE_CONFIG.rating.count} avaliações)</span>
                </span>
              </div>

              <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-stone-950 tracking-tight leading-[1.08] text-balance">
                FLAVINHA STORE
              </h1>

              <p className="font-editorial text-2xl sm:text-3xl text-stone-700 font-light italic">
                {STORE_CONFIG.tagline}
              </p>

              <p className="text-sm sm:text-base text-stone-600 max-w-lg leading-relaxed pt-1">
                Uma vitrine digital pensada para inspirar seu estilo. Explore novas chegadas e seleções especiais com atendimento direto e pessoal pelo WhatsApp.
              </p>
            </div>

            {/* Ações Primárias */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onExploreNew}
                className="px-7 py-4 bg-stone-950 hover:bg-stone-800 text-white text-xs uppercase tracking-widest font-semibold transition-all inline-flex items-center justify-center gap-2 shadow-xs group"
              >
                <span>Explorar novidades</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onExplorePromos}
                className="px-7 py-4 border border-stone-300 hover:border-stone-950 bg-white/60 hover:bg-white text-stone-800 text-xs uppercase tracking-widest font-semibold transition-all inline-flex items-center justify-center gap-2"
              >
                <span>Ver promoções</span>
              </button>
            </div>

            {/* Informações de Curadoria */}
            <div className="pt-4 border-t border-stone-200/80 flex items-center gap-6 text-xs text-stone-500">
              <div>
                <span className="block text-stone-900 font-semibold uppercase tracking-wider">Atendimento Local</span>
                <span>Bagé e região</span>
              </div>
              <div className="h-6 w-px bg-stone-300" />
              <div>
                <span className="block text-stone-900 font-semibold uppercase tracking-wider">Sem Cadastro</span>
                <span>Pedido direto no WhatsApp</span>
              </div>
            </div>
          </div>

          {/* Lado Direito: Fotografia Editorial Protagonista */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/5] w-full overflow-hidden bg-stone-200 shadow-xl">
              <img
                src="/images/editorial/hero-editorial.jpg"
                alt="Flavinha Store Editorial de Moda em Bagé"
                className="w-full h-full object-cover object-center transform hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white flex items-end justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-stone-200 block">
                    Curadoria Contemporânea
                  </span>
                  <span className="font-editorial text-lg sm:text-xl font-normal drop-shadow-sm">
                    Coleções Selecionadas
                  </span>
                </div>
                <span className="text-xs uppercase tracking-wider font-medium text-stone-300">
                  Bagé — RS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
