import { Link } from "react-router-dom"

import { Separator } from "@/components/ui/separator"

export default function Header() {
  return (
    <header className="bg-background">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        {/* Logo do Cadus */}
        <Link to="/">
          <span className="font-display font-black text-4xl tracking-tight">
            <span className="text-(--mata-600)">Cadus</span>
            <span className="text-(--barro-600)">.</span>
          </span>
        </Link>
      </div>
      <Separator />
    </header>
  )
}
