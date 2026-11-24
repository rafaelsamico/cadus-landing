import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Hero from "@/components/sections/Hero"
import SocialProof from "@/components/sections/SocialProof"

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col gap-16">
        <Hero />
        <SocialProof />
      </main>
      <Footer />
    </>
  )
}