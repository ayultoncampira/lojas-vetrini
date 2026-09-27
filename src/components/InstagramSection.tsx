import React from "react";
import { ArrowUpRight, Instagram } from "lucide-react";
import { STORE_CONFIG } from "../data/storeConfig";

export const InstagramSection: React.FC = () => {
  // Composição editorial com fotos de referência visual para o feed da boutique
  const feedImages = [
    { src: "/images/editorial/boutique-interior.jpg", alt: "Espaço Flavinha Store em Bagé" },
    { src: "/images/products/vestido-midi.jpg", alt: "Curadoria de Vestidos" },
    { src: "/images/products/blazer-alfaiataria.jpg", alt: "Alfaiataria Contemporânea" },
    { src: "/images/editorial/hero-editorial.jpg", alt: "Produção de Moda" },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#FAF9F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-stone-200 pb-5 gap-4">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-stone-500 font-medium">
              Acompanhe Nosso Cotidiano
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-stone-950 font-normal">
              Siga a Flavinha
            </h2>
          </div>

          <a
            href={STORE_CONFIG.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-widest font-semibold text-stone-900 hover:text-stone-600 transition-colors inline-flex items-center gap-1.5 group self-start sm:self-auto"
          >
            <Instagram className="w-4 h-4" />
            <span>{STORE_CONFIG.instagram.handle}</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Grade de Fotos do Editorial/Instagram */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {feedImages.map((item, idx) => (
            <a
              key={idx}
              href={STORE_CONFIG.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square overflow-hidden bg-stone-200 group block focus:outline-none focus-visible:ring-1 focus-visible:ring-stone-900"
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-stone-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-xs tracking-wider uppercase font-medium bg-stone-900/80 px-3 py-1.5 backdrop-blur-xs flex items-center gap-1.5">
                  <Instagram className="w-3.5 h-3.5" />
                  Ver no Insta
                </span>
              </div>
            </a>
          ))}
        </div>

        <p className="text-[11px] text-stone-400 text-center">
          Fotos demonstrativas de ambientação e estilo. Siga nosso perfil oficial para novidades diárias nos stories.
        </p>
      </div>
    </section>
  );
};
