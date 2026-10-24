"use client";

import { useState } from "react";

type M = { n: string; titre: string; lede: string; pour: string; slug: string };

// Une ligne par mission ; elle s'ouvre en glissant
export default function Missions({ missions }: { missions: M[] }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <ul className="mrs">
      {missions.map((m) => {
        const on = open === m.slug;
        return (
          <li key={m.slug} className={`mr${on ? " open" : ""}`}>
            <button type="button" aria-expanded={on} aria-controls={`m-${m.slug}`} onClick={() => setOpen(on ? null : m.slug)}>
              <span className="mono">{m.n}</span>
              <span className="mr-t">{m.titre}</span>
              <span className="mr-l">{m.lede}</span>
              <span className="pl" aria-hidden="true" />
            </button>
            <div className="mr-b" id={`m-${m.slug}`}>
              <div>
                <p>Idéal pour {m.pour}</p>
                <a className="lk" href={`/missions/${m.slug}`}>
                  Découvrir la mission {m.titre.toLowerCase()}
                </a>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
