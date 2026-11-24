import { Typography } from "@/components/ui/typography"
import { ScrambleText } from "@/components/motion/ScrambleText"

export default function SocialProof() {
  return (
    <section className="relative flex min-h-[calc(100svh-5rem)] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">

        {/* Decoração: anjos */}
        <img
            src="/angels.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute top-0 hidden select-none lg:block"
        />

        {/* Conteúdo */}
        <div className="relative z-10 flex flex-col items-center gap-10">

            {/* Título */}
            <Typography variant="display-md" className="mb-4 max-w-4xl text-(--areia-800)">
                <ScrambleText text="Obra" autoPlay />
            </Typography>

            <div className="w-auto inline-grid align-center grid-cols-2 gap-8">
                <a href="https://portal.cin.ufpe.br/">
                    <img
                        src="/cin-ufpe.png"
                        alt="CIn-UFPE"
                        className="h-16 w-auto"
                    />
                </a>

                <a href="https://ufpeclinicadigital.tisaude.com/">
                    <img
                        src="/clinica-digital-ufpe.png"
                        alt="Clínica Digital da UFPE"
                        className="h-16 w-auto"
                    />
                </a>

            </div>

            <Typography variant="body" className="max-w-md text-pretty italic text-medium">
                Este produto é fruto de um projeto de extensão vinculado à disciplina CIN0136 - Desenvolvimento de Software, com os professores Kiev Gama e Vinícius Garcia.
            </Typography>

        </div>

    </section>
  )
}
