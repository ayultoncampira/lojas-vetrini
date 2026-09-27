export interface StoreConfig {
  name: string;
  tagline: string;
  city: string;
  state: string;
  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    postalCode: string;
    full: string;
  };
  whatsapp: {
    display: string;
    raw: string; // for wa.me links: 5553984450638
  };
  instagram: {
    handle: string;
    url: string;
  };
  mapsUrl: string;
  rating: {
    score: number;
    count: number;
  };
  about: {
    short: string;
    editorial: string;
  };
  categories: Array<{
    id: string;
    label: string;
    description: string;
  }>;
  types: Array<{
    id: string;
    label: string;
  }>;
}

export const STORE_CONFIG: StoreConfig = {
  name: "Flavinha Store",
  tagline: "Moda para diferentes momentos.",
  city: "Bagé",
  state: "RS",
  address: {
    street: "R. Vinte e Um de Abril, 1576",
    neighborhood: "São Judas",
    city: "Bagé",
    state: "RS",
    postalCode: "96415-480",
    full: "R. Vinte e Um de Abril, 1576 - São Judas, Bagé - RS, 96415-480",
  },
  whatsapp: {
    display: "(53) 98445-0638",
    raw: "5553984450638",
  },
  instagram: {
    handle: "@storeflavinha",
    url: "https://www.instagram.com/storeflavinha/",
  },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=R.+Vinte+e+Um+de+Abril,+1576+-+S%C3%A3o+Judas,+Bag%C3%A9+-+RS,+96415-480",
  rating: {
    score: 4.9,
    count: 106,
  },
  about: {
    short: "Uma loja de moda em Bagé, com atendimento próximo e peças selecionadas para diferentes estilos e momentos.",
    editorial: "Na Flavinha Store em Bagé, cada peça é pensada para valorizar o cotidiano e ocasiões especiais. Esta vitrine digital apresenta sugestões e referências da nossa curadoria, com atendimento dedicado diretamente no WhatsApp.",
  },
  categories: [
    { id: "Feminino", label: "Feminino", description: "Peças selecionadas para o dia a dia e momentos especiais." },
    { id: "Masculino", label: "Masculino", description: "Linha casual e contemporânea." },
    { id: "Infantil", label: "Infantil", description: "Conforto e versatilidade para os pequenos." },
    { id: "Bebê", label: "Bebê", description: "Peças delicadas e macias para os primeiros passos." },
  ],
  types: [
    { id: "Vestidos", label: "Vestidos" },
    { id: "Blusas", label: "Blusas" },
    { id: "Calças", label: "Calças" },
    { id: "Conjuntos", label: "Conjuntos" },
    { id: "Saias", label: "Saias" },
    { id: "Casacos", label: "Casacos" },
    { id: "Acessórios", label: "Acessórios" },
  ],
};
