export interface Product {
  id: string;
  name: string;
  category: string; // e.g. "Feminino", "Masculino", "Infantil", "Bebê"
  audience: string;
  type: string; // e.g. "Vestidos", "Blusas", "Calças", "Conjuntos", "Saias", "Casacos", "Acessórios"
  price: number | null; // null represents "Consulte o valor"
  previousPrice: number | null;
  sizes: string[];
  colors: string[];
  description: string;
  images: string[];
  isNew: boolean;
  isFeatured: boolean;
  isPromotion: boolean;
}

export const DEMO_PRODUCTS: Product[] = [
  {
    id: "demo-01",
    name: "Peça Demonstrativa 01 · Vestido Midi Linho",
    category: "Feminino",
    audience: "Feminino",
    type: "Vestidos",
    price: 189.90,
    previousPrice: 239.90,
    sizes: ["P", "M", "G"],
    colors: ["Bege Areia", "Off-White", "Preto"],
    description: "Item demonstrativo para vitrine digital. Silhueta midi contemporânea em tecido com toque de linho, decote delicado e caimento fluido para diferentes ocasiões.",
    images: [
      "/images/products/vestido-midi.jpg",
      "/images/editorial/hero-editorial.jpg",
    ],
    isNew: true,
    isFeatured: true,
    isPromotion: true,
  },
  {
    id: "demo-02",
    name: "Peça Demonstrativa 02 · Blazer Alfaiataria Estruturado",
    category: "Feminino",
    audience: "Feminino",
    type: "Casacos",
    price: 289.90,
    previousPrice: null,
    sizes: ["P", "M", "G", "GG"],
    colors: ["Marfim", "Preto"],
    description: "Item demonstrativo para vitrine digital. Corte de alfaiataria atemporal com acabamento refinado, lapela clássica e forro confortável.",
    images: [
      "/images/products/blazer-alfaiataria.jpg",
    ],
    isNew: true,
    isFeatured: true,
    isPromotion: false,
  },
  {
    id: "demo-03",
    name: "Peça Demonstrativa 03 · Blusa Cetim Minimal",
    category: "Feminino",
    audience: "Feminino",
    type: "Blusas",
    price: 119.90,
    previousPrice: 159.90,
    sizes: ["PP", "P", "M", "G"],
    colors: ["Preto Ébano", "Pérola"],
    description: "Item demonstrativo para vitrine digital. Toque suave acetinado com caimento leve, ideal para composições casuais ou sofisticadas.",
    images: [
      "/images/products/blusa-cetim.jpg",
    ],
    isNew: false,
    isFeatured: true,
    isPromotion: true,
  },
  {
    id: "demo-04",
    name: "Peça Demonstrativa 04 · Calça Pantalona Alfaiataria",
    category: "Feminino",
    audience: "Feminino",
    type: "Calças",
    price: 199.90,
    previousPrice: 249.90,
    sizes: ["36", "38", "40", "42"],
    colors: ["Bege Claro", "Terracota", "Preto"],
    description: "Item demonstrativo para vitrine digital. Modelagem ampla de cintura alta, cós limpo e caimento estruturado de elegância prática.",
    images: [
      "/images/products/calca-pantalona.jpg",
    ],
    isNew: true,
    isFeatured: false,
    isPromotion: true,
  },
  {
    id: "demo-05",
    name: "Peça Demonstrativa 05 · Saia Midi Plissada",
    category: "Feminino",
    audience: "Feminino",
    type: "Saias",
    price: 149.90,
    previousPrice: null,
    sizes: ["P", "M", "G"],
    colors: ["Champagne", "Oliva Suave"],
    description: "Item demonstrativo para vitrine digital. Movimento leve com dobras plissadas precisas e elástico sutil na cintura.",
    images: [
      "/images/products/saia-midi.jpg",
    ],
    isNew: false,
    isFeatured: true,
    isPromotion: false,
  },
  {
    id: "demo-06",
    name: "Peça Demonstrativa 06 · Trench Coat Clássico",
    category: "Feminino",
    audience: "Feminino",
    type: "Casacos",
    price: 389.90,
    previousPrice: 479.90,
    sizes: ["P", "M", "G"],
    colors: ["Caramelo", "Areia"],
    description: "Item demonstrativo para vitrine digital. Peça atemporal de meia-estação com faixa na cintura e abotoamento frontal sofisticado.",
    images: [
      "/images/products/trench-coat.jpg",
    ],
    isNew: true,
    isFeatured: true,
    isPromotion: true,
  },
  {
    id: "demo-07",
    name: "Peça Demonstrativa 07 · Suéter Tricot Gola Alta",
    category: "Feminino",
    audience: "Feminino",
    type: "Blusas",
    price: 169.90,
    previousPrice: null,
    sizes: ["P", "M", "G"],
    colors: ["Off-White", "Caramelo"],
    description: "Item demonstrativo para vitrine digital. Trama canelada aconchegante com toque macio e modelagem descontraída.",
    images: [
      "/images/products/tricot-gola.jpg",
    ],
    isNew: true,
    isFeatured: false,
    isPromotion: false,
  },
  {
    id: "demo-08",
    name: "Peça Demonstrativa 08 · Vestido Longo Estampado",
    category: "Feminino",
    audience: "Feminino",
    type: "Vestidos",
    price: 239.90,
    previousPrice: 299.90,
    sizes: ["P", "M", "G"],
    colors: ["Estampa Botânica"],
    description: "Item demonstrativo para vitrine digital. Fluidez marcante com padrão floral contemporâneo e toque suave.",
    images: [
      "/images/products/vestido-estampado.jpg",
    ],
    isNew: false,
    isFeatured: false,
    isPromotion: true,
  },
  {
    id: "demo-09",
    name: "Peça Demonstrativa 09 · Bolsa Tote Couro Legítimo",
    category: "Feminino",
    audience: "Feminino",
    type: "Acessórios",
    price: 219.90,
    previousPrice: null,
    sizes: ["Único"],
    colors: ["Conhaque", "Preto"],
    description: "Item demonstrativo para vitrine digital. Acessório versátil com acabamento primoroso e amplo espaço interno.",
    images: [
      "/images/products/bolsa-couro.jpg",
    ],
    isNew: true,
    isFeatured: false,
    isPromotion: false,
  },
  {
    id: "demo-10",
    name: "Peça Demonstrativa 10 · Conjunto Alfaiataria Edição Especial",
    category: "Feminino",
    audience: "Feminino",
    type: "Conjuntos",
    price: null, // Testando "Consulte o valor" para peças sem preço confirmado!
    previousPrice: null,
    sizes: ["P", "M", "G"],
    colors: ["Cru", "Preto"],
    description: "Item demonstrativo para vitrine digital com valor sob consulta. Peça coordenada em alfaiataria leve para ocasiões especiais.",
    images: [
      "/images/products/blazer-alfaiataria.jpg",
      "/images/products/calca-pantalona.jpg",
    ],
    isNew: true,
    isFeatured: true,
    isPromotion: false,
  },
];
