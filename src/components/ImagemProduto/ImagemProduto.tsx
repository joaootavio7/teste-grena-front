import { useMemo, useState } from "react";
import produto01 from "../../assets/products/produto-01-sao-paulo.jpg";
import produto02 from "../../assets/products/produto-02-palmeiras.jpg";
import produto03 from "../../assets/products/produto-03-corinthians.jpg";
import produto04 from "../../assets/products/produto-04-lakers.jpg";
import produto05 from "../../assets/products/produto-05-celtics.jpg";
import produto06 from "../../assets/products/produto-06-nike-air-run.jpg";
import produto07 from "../../assets/products/produto-07-puma-carina.jpg";
import produto08 from "../../assets/products/produto-08-puma-squad.jpg";
import produto09 from "../../assets/products/produto-09-inter-infantil.jpg";
import produto10 from "../../assets/products/produto-10-meias-puma.jpg";
import produto11 from "../../assets/products/produto-11-shorts-adidas.jpg";
import produto12 from "../../assets/products/produto-12-coqueteleira.jpg";

interface ImagemProdutoProps {
  nome: string;
  imagem?: string | null;
}

const imagensCatalogo: Record<string, string> = {
  "camisa são paulo": produto01,
  "camisa palmeiras": produto02,
  "camisa corinthians": produto03,
  "regata lakers": produto04,
  "regata boston": produto05,
  "tênis nike": produto06,
  "tênis puma": produto07,
  "blusão puma": produto08,
  "conjunto infantil": produto09,
  "kit meias": produto10,
  "shorts adidas": produto11,
  "coqueteleira": produto12,
};

function imagemLocal(nome: string): string | undefined {
  const nomeNormalizado = nome.toLocaleLowerCase("pt-BR");
  const chave = Object.keys(imagensCatalogo).find((item) => nomeNormalizado.includes(item));
  return chave ? imagensCatalogo[chave] : undefined;
}

function ImagemProduto({ nome, imagem }: ImagemProdutoProps) {
  const imagemBanco = imagem?.trim() || "";
  const imagemCatalogo = useMemo(() => imagemLocal(nome), [nome]);
  const imagemBusca = useMemo(() => {
    const termo = encodeURIComponent(nome.trim());
    return `https://tse1.mm.bing.net/th?q=${termo}&w=600&h=600&c=7&rs=1&p=0`;
  }, [nome]);
  const [tentativa, setTentativa] = useState(0);
  const fontes = [imagemBanco, imagemCatalogo, imagemBusca].filter(Boolean);
  const src = fontes[tentativa] || imagemBusca;

  return (
    <div className="produto-card-imagem">
      <img
        key={`${nome}-${tentativa}`}
        src={src}
        alt={nome}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={(event) => {
          if (tentativa < fontes.length - 1) {
            setTentativa((valor) => valor + 1);
            return;
          }
          event.currentTarget.style.display = "none";
          const container = event.currentTarget.parentElement;
          if (container && !container.querySelector("span")) {
            const aviso = document.createElement("span");
            aviso.textContent = "Imagem indisponível";
            container.appendChild(aviso);
          }
        }}
      />
    </div>
  );
}

export default ImagemProduto;
