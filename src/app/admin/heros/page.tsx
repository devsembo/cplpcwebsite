import { getAllPageHeroes } from "@/lib/data/page-hero";
import HeroImageForm from "./HeroImageForm";

export default async function AdminHerosPage() {
    const heroes = await getAllPageHeroes();

    return (
        <div>
            <h1 className="text-2xl font-bold text-cplp-navy mb-2">Heros de Página</h1>
            <p className="text-sm text-cplp-grey mb-8">
                Imagem de fundo mostrada no topo de cada página. Sem imagem, a página mostra o
                fundo de cor sólida habitual.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {heroes.map((hero) => (
                    <HeroImageForm key={hero.pageKey} pageKey={hero.pageKey} imageUrl={hero.imageUrl} />
                ))}
            </div>
        </div>
    );
}
