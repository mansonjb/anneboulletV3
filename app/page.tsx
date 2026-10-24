import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { FaqBlock, JsonLd } from "@/components/blocks";
import { getProjet, legende, projets, src, type Projet } from "@/data/projets";
import { faqPages, missions, secteurs, services, zones } from "@/data/site";
import Planche, { type Tuile } from "@/components/v3/Planche";
import Reveal from "@/components/v3/Reveal";
import Enfilade from "@/components/v3/Enfilade";
import Missions from "@/components/v3/Missions";
import Matieres from "@/components/v3/Matieres";

const p = (slug: string) => getProjet(slug) as Projet;
const oleron = p("maison-de-famille-saint-denis-d-oleron");

// Planche d'ambiance : x, y en % de l'écran, largeur en vw, profondeur au curseur
const tuiles: Tuile[] = [
  { src: src(p("piece-de-vie-sur-mesure-aytre").photos[0]), x: 5, y: 9, w: 12, d: 0.6, ratio: "4 / 5" },
  { src: "/matieres/zellige.jpg", x: 22, y: 12, w: 7, d: 1.4, ratio: "4 / 5" },
  { src: src(p("maison-de-ville-renovee-la-rochelle").photos[0]), x: 76, y: 8, w: 14, d: 0.8, ratio: "3 / 2" },
  { src: "/matieres/rotin.jpg", x: 88, y: 60, w: 8, d: 1.5, ratio: "1" },
  { src: src(p("decoration-maison-esprit-surf-la-rochelle").photos[0]), x: 66, y: 63, w: 12, d: 1, ratio: "4 / 5" },
  { src: "/matieres/pierre.jpg", x: 60, y: 9, w: 7, d: 1.6, ratio: "3 / 2" },
  { src: src(p("maison-de-village-saint-clement-des-baleines").photos[0]), x: 4, y: 62, w: 13, d: 0.9, ratio: "4 / 5" },
  { src: "/matieres/laiton.jpg", x: 24, y: 68, w: 7, d: 1.2, ratio: "1" },
];

const matieres = [
  { nom: "Le bois", ligne: "Il porte la maison et la réchauffe.", img: "bois", lieu: "Charpente apparente, Saint-Denis-d'Oléron" },
  { nom: "Les fibres", ligne: "Rotin et jute laissent passer une lumière adoucie.", img: "rotin", lieu: "Suspensions, Saint-Denis-d'Oléron" },
  { nom: "Les textiles", ligne: "Lin et tissus imprimés invitent à s'installer.", img: "lin", lieu: "Coussins, Saint-Denis-d'Oléron" },
  { nom: "Le zellige", ligne: "Chaque carreau renvoie la lumière à sa façon.", img: "zellige", lieu: "Douche, Saint-Clément-des-Baleines" },
  { nom: "La pierre", ligne: "Elle garde la mémoire du lieu.", img: "pierre", lieu: "Mur en pierre, Saint-Clément-des-Baleines" },
  { nom: "Le laiton", ligne: "Il se patine avec le temps et réchauffe la lumière.", img: "laiton", lieu: "Pommeau de douche, Les Portes-en-Ré" },
];

const etapes = [
  { titre: "Premier contact", texte: "Un échange pour comprendre votre projet et vos envies." },
  { titre: "Visite et devis", texte: "Une rencontre sur place, puis un devis accompagné d'un débriefing écrit." },
  { titre: "Carnet de projet", texte: "Un questionnaire sur votre façon de vivre et le relevé des cotes." },
  { titre: "Esquisse puis projet", texte: "Avant-projet sommaire, puis détaillé : plans de principe, matières, 3D." },
  { titre: "Suivi et réception", texte: "Un suivi esthétique du chantier, jusqu'à la réception." },
];

export default function Home() {
  const pieces = projets.map((x) => ({
    slug: x.slug,
    titre: x.titre.split(",")[0],
    lieu: x.commune,
    meta: legende(x),
    src: src(x.photos[0]),
    alt: x.alt,
  }));
  return (
    <div className="home">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Anne Boullet Studio",
          description: "Décoratrice d'intérieur à La Rochelle : conseil, conception et décoration pour les particuliers et les professionnels.",
          url: "https://anneboulletv3.vercel.app",
          address: { "@type": "PostalAddress", addressLocality: "La Rochelle", postalCode: "17000", addressCountry: "FR" },
          areaServed: ["La Rochelle", "Île de Ré", "Oléron", "Châtelaillon-Plage", "Rochefort", "Royan", "Saintes"],
          knowsAbout: ["Décoration d'intérieur", "Agencement intérieur", "Signalétique", "Rénovation"],
        }}
      />
      <Planche tuiles={tuiles} principale={src(oleron.photos[0])} alt="Séjour de la maison de famille à Saint-Denis-d'Oléron : charpente apparente, bois blond, lin et rotin" />

      <section className="man">
        <Reveal className="man-t">
          Des maisons lumineuses et chaleureuses, <span className="it">pensées pour durer.</span> Chaque projet part de la lumière, de la maison telle qu&apos;elle
          est et de la façon dont vous y vivez. Conseil, conception et décoration pour les particuliers et les professionnels, à une heure autour de La Rochelle.
        </Reveal>
        <p className="zones">
          <span className="mono">Le studio intervient à</span>
          {zones.map((z) => (
            <a key={z.slug} className="lk" href={`/zones/${z.slug}`}>
              {z.nom}
            </a>
          ))}
          <span>Châtelaillon-Plage</span>
          <span>Rochefort</span>
          <span>Royan</span>
        </p>
      </section>

      <Enfilade pieces={pieces} />
      <p className="v3-more">
        <a className="lk" href="/realisations">
          Toutes les réalisations
        </a>
      </p>

      <section className="sec" id="missions">
        <h2 className="h2">
          Trois façons <span className="it">de travailler ensemble</span>
        </h2>
        <p className="lead">Du simple regard extérieur au projet complet : vous choisissez le niveau d&apos;accompagnement.</p>
        <Missions missions={missions.map((m) => ({ n: m.n, titre: m.titre, lede: m.lede, pour: m.pour, slug: m.slug }))} />
        <ol className="steps">
          {etapes.map((s, i) => (
            <li key={s.titre}>
              <span className="mono">{String(i + 1).padStart(2, "0")}</span>
              <b>{s.titre}</b>
              <p>{s.texte}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mat3" id="matieres">
        <h2 className="h2">
          Une maison se raconte <span className="it">par ses matières</span>
        </h2>
        <p className="lead">
          Avant les couleurs et les meubles, je pense à ce que vous toucherez chaque jour : des matières naturelles, travaillées par des artisans d&apos;ici, qui
          vieillissent avec la maison.
        </p>
        <Matieres matieres={matieres} />
        <p className="hint mono soft">
          <span>Faites glisser les matières</span>
          <span>06 matières</span>
        </p>
      </section>

      <section className="q">
        <Reveal as="blockquote" mode="mots">
          « C&apos;est une parfaite rénovation, faite avec du goût, des idées novatrices et du talent. <span className="it">Je n&apos;aurais jamais osé la couleur sans elle.</span> »
        </Reveal>
        <p className="mono soft cite">Sylvie B. · Rénovation d&apos;un appartement · Avis Google</p>
      </section>

      <section className="sec" id="professionnels">
        <h2 className="h2">
          Des lieux de travail <span className="it">où chacun se sent bien</span>
        </h2>
        <p className="lead">Lieux d&apos;accueil qui rassurent, espaces de travail apaisés : conçus avec la même attention qu&apos;une maison.</p>
        <div className="pg">
          {secteurs.map((s) => (
            <a key={s.slug} href={`/professionnels/${s.slug}`}>
              <div className="ph">
                {s.photo ? <Image src={s.photo} alt={s.h1} fill sizes="(max-width: 900px) 100vw, 33vw" /> : <span className="mono soft">Photos à venir</span>}
              </div>
              <h3>{s.nom}</h3>
              <p>{s.detail}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="sec" id="savoir-faire">
        <h2 className="h2">
          Huit <span className="it">savoir-faire</span>
        </h2>
        <ul className="sf3">
          {services.map((s) => (
            <li key={s.slug}>
              <a href={`/services/${s.slug}`}>{s.nom}</a>
            </li>
          ))}
        </ul>
      </section>

      <FaqBlock items={faqPages.accueil} />

      <section className="ct" id="contact">
        <div>
          <h2 className="h2">
            Parlons de <span className="it">votre projet</span>
          </h2>
          <p className="lead">Quelques lignes suffisent. Anne vous recontacte pour un premier échange, puis un rendez-vous sur place.</p>
        </div>
        <ContactForm />
      </section>
    </div>
  );
}
