import * as React from "react"
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react"

import { cn } from "@/lib/utils"

/**
 * Cor de repouso do texto (e das bordas do gradiente): a cor de foreground do
 * tema. É o que sobra à mostra entre as passadas do brilho.
 */
const DEFAULT_BASE = "var(--foreground)"

/**
 * Arco de cores do brilho — um "nascer do sol": rosa → laranja → branco → azul.
 * Fica confinado ao miolo do gradiente e só aparece quando a faixa cruza o
 * texto. Aceita qualquer cor CSS (HEX, rgb(), oklch(), var(--…)).
 */
const DEFAULT_COLORS = [
  "#FF6B9D", 
  "#FFA552", 
  "#FFFFFF", 
  "#5B8DEF"
]

export interface ShimmerTextProps
  extends Omit<HTMLMotionProps<"span">, "children" | "color"> {
  /** Texto a exibir. */
  children: React.ReactNode
  /** Cor de repouso do texto (bordas do gradiente). */
  base?: string
  /** Cores do brilho, na ordem em que aparecem conforme a faixa cruza o texto. */
  colors?: string[]
  /**
   * Largura da faixa colorida em múltiplos da largura do texto. Maior = brilho
   * mais longo e suave; menor = mais curto e nítido.
   */
  spread?: number
  /** Duração de uma passada do brilho, em segundos. */
  duration?: number
  /** Pausa entre uma passada e a próxima, em segundos. Menor = mais frequente. */
  repeatDelay?: number
}

/**
 * Texto com um brilho de gradiente colorido que cruza da esquerda para a
 * direita em passadas espaçadas.
 *
 * O texto vira a "janela" de um `linear-gradient` recortado por
 * `background-clip: text` — só as cores que caem sobre os glifos aparecem. O
 * gradiente é desenhado em três regiões: base sólida (1 largura de texto) à
 * esquerda, o arco colorido (`spread` larguras de texto) no miolo, e base
 * sólida (1 largura de texto) à direita. Em repouso a janela cai inteira sobre
 * uma das bases, e deslizar o `background-position` arrasta o miolo colorido
 * através do texto.
 *
 * Como as duas bases são iguais, o repouso é uma cor sólida e o recomeço do
 * ciclo não pula. Não roda em loop contínuo: cada passada é seguida de uma
 * pausa (`repeatDelay`). A tipografia (fonte, tamanho, peso) é herdada do pai
 * via `className`. Respeita `prefers-reduced-motion`: nesse caso mostra o texto
 * na cor de repouso, parado.
 */
function ShimmerText({
  children,
  className,
  base = DEFAULT_BASE,
  colors = DEFAULT_COLORS,
  spread = 2.4,
  duration = 1.1,
  repeatDelay = 1,
  ...props
}: ShimmerTextProps) {
  const reduced = useReducedMotion()

  // O gradiente tem `spread + 2` larguras de texto: 1 de base, `spread` de cor,
  // 1 de base. A faixa colorida vive entre L% e R%; fora disso é base sólida.
  // O arco começa e termina na própria base, então nasce e morre sem costura.
  const total = spread + 2
  const left = 100 / total
  const right = (100 * (spread + 1)) / total
  // `colors` está em ordem de APARIÇÃO, mas o brilho varre o texto da direita
  // para a esquerda — então a faixa é montada com as cores invertidas no espaço
  // para que a primeira da lista seja a primeira a surgir.
  const band = [base, ...[...colors].reverse(), base]
  const stops = band
    .map((c, i) => {
      const at = left + (i * (right - left)) / (band.length - 1)
      return `${c} ${at.toFixed(2)}%`
    })
    .join(", ")
  const gradient = `linear-gradient(90deg, ${base} 0%, ${stops}, ${base} 100%)`

  const style: React.CSSProperties = {
    backgroundImage: gradient,
    backgroundSize: `${(total * 100).toFixed(2)}% 100%`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    color: "transparent",
  }

  return (
    <motion.span
      className={cn("inline-block", className)}
      style={style}
      // 100% → 0% faz a faixa colorida entrar pela esquerda e sair pela direita;
      // os dois extremos caem nas bases sólidas e iguais.
      animate={reduced ? undefined : { backgroundPositionX: ["100%", "0%"] }}
      transition={
        reduced
          ? undefined
          : {
              duration,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay,
              repeatType: "loop",
            }
      }
      {...props}
    >
      {children}
    </motion.span>
  )
}

export { ShimmerText }
