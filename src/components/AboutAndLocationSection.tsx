import React from "react";
import { MapPin, MessageCircle, Navigation, Star, ArrowUpRight } from "lucide-react";
import { STORE_CONFIG } from "../data/storeConfig";

export const AboutAndLocationSection: React.FC = () => {
  return (
    <section id="sobre" className="py-14 sm:py-20 bg-[#FAF9F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Seção Sobre */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs uppercase tracking-widest text-stone-500 font-medium">
              Sobre a Loja
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-stone-950 font-normal">
              Flavinha Store em Bagé
            </h2>
            <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-light">
              "{STORE_CONFIG.about.short}"
            </p>
            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
              {STORE_CONFIG.about.editorial}
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs text-stone-600">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-stone-900 text-stone-900" />
                <strong className="text-stone-900 font-semibold">{STORE_CONFIG.rating.score}</strong>
                <span>estrelas</span>
              </div>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>{STORE_CONFIG.rating.count} avaliações públicas</span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[16/10] overflow-hidden bg-stone-200 border border-stone-200">
              <img
                src="/images/editorial/boutique-interior.jpg"
                alt="Interior boutique Flavinha Store em Bagé"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* Seção Localização & Atendimento */}
        <div className="pt-10 border-t border-stone-200/80">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white border border-stone-200 p-6 sm:p-8 md:p-10">
            {/* Endereço */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-stone-900">
                <MapPin className="w-5 h-5 text-stone-800" />
                <h3 className="font-editorial text-2xl text-stone-900 font-medium">
                  Localização da Loja
                </h3>
              </div>

              <div className="text-sm text-stone-700 space-y-1">
                <p className="font-semibold text-stone-900">{STORE_CONFIG.name}</p>
                <p>{STORE_CONFIG.address.street}</p>
                <p>{STORE_CONFIG.address.neighborhood}</p>
                <p>{STORE_CONFIG.address.city} — {STORE_CONFIG.address.state}</p>
                <p className="text-xs text-stone-500 tabular-nums">CEP: {STORE_CONFIG.address.postalCode}</p>
              </div>

              <div className="pt-2">
                <a
                  href={STORE_CONFIG.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-stone-950 hover:bg-stone-800 text-white text-xs uppercase tracking-widest font-semibold transition-colors inline-flex items-center gap-2"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Como chegar no Google Maps</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Atendimento WhatsApp */}
            <div className="space-y-4 border-t md:border-t-0 md:border-l md:pl-8 border-stone-200 pt-6 md:pt-0">
              <div className="flex items-center gap-2 text-stone-900">
                <MessageCircle className="w-5 h-5 text-stone-800" />
                <h3 className="font-editorial text-2xl text-stone-900 font-medium">
                  Atendimento Personalizado
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Tire dúvidas sobre tamanhos, cores ou consulte valores diretamente com nossa equipe pelo canal oficial de WhatsApp da Flavinha Store.
              </p>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${STORE_CONFIG.whatsapp.raw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 border border-stone-300 hover:border-stone-950 bg-stone-50 hover:bg-white text-stone-900 text-xs uppercase tracking-widest font-semibold transition-colors inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-stone-800" />
                  <span>Chamar no WhatsApp: {STORE_CONFIG.whatsapp.display}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
