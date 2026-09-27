import React, { useState, useEffect } from "react";
import { X, Plus, Minus, MessageCircle, ShoppingBag, Check } from "lucide-react";
import { Product } from "../data/products";
import { formatBRL, calculateDiscountPercentage } from "../utils/formatters";
import { buildProductInterestWhatsAppUrl } from "../utils/whatsapp";
import { useCart } from "../context/CartContext";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
}) => {
  const { addItem } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [addedSuccess, setAddedSuccess] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedImageIndex(0);
      setQuantity(1);
      setValidationError(null);
      setAddedSuccess(false);

      // Pré-selecionar cor se houver apenas uma
      if (product.colors && product.colors.length === 1) {
        setSelectedColor(product.colors[0]);
      } else if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      } else {
        setSelectedColor("");
      }

      // Pré-selecionar tamanho apenas se for tamanho único
      if (product.sizes && product.sizes.length === 1 && product.sizes[0].toLowerCase().includes("único")) {
        setSelectedSize(product.sizes[0]);
      } else {
        setSelectedSize("");
      }

      // Prevenir scroll do body quando o modal está aberto
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [product]);

  if (!product) return null;

  const discount = calculateDiscountPercentage(
    product.previousPrice,
    product.price
  );

  const handleAddToCart = () => {
    // Validação de tamanho obrigatória se o produto possuir opções de tamanho
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setValidationError("Selecione um tamanho para continuar.");
      return;
    }

    setValidationError(null);
    addItem(product, selectedSize, selectedColor, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 400);
  };

  const handleDirectWhatsApp = () => {
    const url = buildProductInterestWhatsAppUrl(
      product.name,
      selectedSize || undefined,
      selectedColor || undefined
    );
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-title"
    >
      <div
        className="relative bg-[#FAF9F5] w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200/80 flex flex-col md:flex-row my-auto transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão Fechar */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white text-stone-700 hover:text-stone-950 transition-colors shadow-xs"
          aria-label="Fechar detalhes"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lado Esquerdo: Galeria de Imagens (Protagonista) */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col justify-between bg-stone-100/60 border-b md:border-b-0 md:border-r border-stone-200/70">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-200/60">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-all duration-300"
            />
            {product.isNew && (
              <span className="absolute top-3 left-3 bg-stone-900 text-white text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1">
                Novidade
              </span>
            )}
            {discount && (
              <span className="absolute bottom-3 left-3 bg-stone-100 text-stone-900 border border-stone-300 text-xs font-bold px-2 py-0.5 tabular-nums">
                {discount}% OFF
              </span>
            )}
          </div>

          {/* Miniaturas se houver mais de 1 imagem */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-16 h-20 shrink-0 overflow-hidden border-2 transition-all ${
                    selectedImageIndex === idx
                      ? "border-stone-900 opacity-100"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} foto ${idx + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Lado Direito: Informações e Compra */}
        <div className="w-full md:w-1/2 p-5 sm:p-7 md:p-9 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Metadados Sutis */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-medium">
              <span>{product.type}</span>
              <span aria-hidden="true">·</span>
              <span>{product.category}</span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-400">Ref: {product.id}</span>
            </div>

            {/* Nome do Produto */}
            <h1
              id="product-title"
              className="font-editorial text-2xl sm:text-3xl text-stone-950 font-normal leading-snug"
            >
              {product.name}
            </h1>

            {/* Preços */}
            <div className="flex items-baseline gap-3 pt-1 border-b border-stone-200/80 pb-4">
              <span className="text-2xl sm:text-3xl font-semibold text-stone-950 tabular-nums">
                {formatBRL(product.price)}
              </span>

              {product.previousPrice && (
                <span className="text-base text-stone-400 line-through tabular-nums">
                  {formatBRL(product.previousPrice)}
                </span>
              )}

              {discount && (
                <span className="text-xs uppercase tracking-wider font-semibold text-stone-800 bg-stone-200/70 px-2 py-0.5">
                  Economize {discount}%
                </span>
              )}
            </div>

            {/* Descrição */}
            <p className="text-sm text-stone-600 leading-relaxed pt-1">
              {product.description}
            </p>

            {/* Seleção de Tamanho */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="uppercase tracking-wider font-semibold text-stone-900">
                    Tamanho
                  </span>
                  {selectedSize ? (
                    <span className="text-stone-600 font-medium">Selecionado: {selectedSize}</span>
                  ) : (
                    <span className="text-stone-400">Escolha uma opção</span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => {
                          setSelectedSize(size);
                          setValidationError(null);
                        }}
                        className={`min-w-11 h-11 px-3 text-xs font-semibold uppercase tracking-wider transition-all border ${
                          isSelected
                            ? "border-stone-950 bg-stone-950 text-white"
                            : "border-stone-300 bg-white text-stone-800 hover:border-stone-950"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Seleção de Cor */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="uppercase tracking-wider font-semibold text-stone-900">
                    Cor
                  </span>
                  <span className="text-stone-600 font-medium">{selectedColor}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => {
                    const isSelected = selectedColor === color;
                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-2 text-xs font-medium transition-all border ${
                          isSelected
                            ? "border-stone-950 bg-stone-100 text-stone-950 font-semibold"
                            : "border-stone-200 bg-white text-stone-700 hover:border-stone-400"
                        }`}
                      >
                        {color}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantidade */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-stone-900">
                Quantidade
              </span>
              <div className="flex items-center border border-stone-300 bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="p-2 text-stone-600 hover:text-stone-950 disabled:opacity-40 transition-colors"
                  aria-label="Diminuir quantidade"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-sm font-semibold text-stone-900 tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 text-stone-600 hover:text-stone-950 transition-colors"
                  aria-label="Aumentar quantidade"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Alerta Elegante de Validação (Não usar alert nativo) */}
            {validationError && (
              <div
                role="alert"
                className="p-3 bg-stone-900 text-white text-xs font-medium tracking-wide flex items-center justify-between animate-in fade-in"
              >
                <span>{validationError}</span>
              </div>
            )}
          </div>

          {/* Ações de Compra e Contato */}
          <div className="pt-4 border-t border-stone-200/80 space-y-3">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`w-full py-4 px-6 text-xs uppercase tracking-widest font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                addedSuccess
                  ? "bg-stone-800 text-white"
                  : "bg-stone-950 hover:bg-stone-800 text-white active:scale-[0.99]"
              }`}
            >
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  Adicionado à Sacola
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  Adicionar à Sacola
                </>
              )}
            </button>

            {/* Botão de contato direto WhatsApp para a peça individual */}
            <button
              type="button"
              onClick={handleDirectWhatsApp}
              className="w-full py-3 px-4 border border-stone-300 hover:border-stone-900 text-stone-800 hover:text-stone-950 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2 bg-white"
            >
              <MessageCircle className="w-4 h-4 text-stone-700" />
              Tenho interesse (Consultar no WhatsApp)
            </button>

            <p className="text-[11px] text-stone-400 text-center">
              Atendimento direto da loja física em Bagé — RS. Disponibilidade confirmada via WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
