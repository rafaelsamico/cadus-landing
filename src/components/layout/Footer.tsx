import { ShimmerText } from "@/components/motion/ShimmerText"
import { Separator } from "@/components/ui/separator"
import { Typography } from "@/components/ui/typography"

export default function Footer() {
  return (
    <footer>
      <Separator />
      <div className="mx-auto w-auto px-6 pt-8 pb-4">
        <div className="flex flex-col gap-0 items-center justify-between">

          <Typography variant="body" className="flex items-center gap-1">
            Feito com cuidado no
            <a
              href="https://www.cin.ufpe.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <img
                src="/cin-ufpe-icon.svg"
                alt=""
                className="h-6 w-auto"
              />
              <span className="font-bold text-[#DB1E2F] hover:underline">CIn-UFPE</span>
            </a>
          </Typography>

          <Typography variant="body">
            Desenhado por{" "}
            <a
              href="https://www.cin.ufpe.br/~rsd2"
              target="_blank"
              rel="noopener noreferrer"
              className="group font-bold"
            >
              <ShimmerText className="underline-offset-2 group-hover:underline group-hover:decoration-foreground">
                Samico
              </ShimmerText>
            </a>
            . Código-fonte no{" "}
            <a
              href="https://github.com/rafaelsamico/cadus-landing"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:underline"
            >
              GitHub
            </a>
            .
          </Typography>

          <Typography variant="overline"className="mt-8">
            © {new Date().getFullYear()} Cadus. Todos os direitos reservados.
          </Typography>

          <span className="font-display font-black tracking-tighter leading-none whitespace-nowrap text-[26vw] text-(--areia-800)">
            Cadus.
          </span>

        </div>
      </div>
    </footer>
  )
}
