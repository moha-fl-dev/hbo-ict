# Lingo Incident Management Project

Welkom bij het Lingo project, een vereenvoudigd incidentbeheersysteem geïnspireerd door ServiceNow. Dit project is opgedeeld in twee hoofdonderdelen: de frontend (lingo-pages) en de backend (lingo-api).

# Belangrijkste Technologieën

## Overzicht

Dit document biedt een overzicht van de belangrijkste technologieën die worden gebruikt in het `@hbo-ict/source` project, zoals aangegeven in het `package.json` bestand.

## Technologieën

### NX

NX is een set van extensie tools voor monorepo ondersteuning, waarmee efficiënter met meerdere projecten gewerkt kan worden.

### Next.js

Next.js is een populair React framework dat functies zoals server-side rendering en het genereren van statische websites mogelijk maakt.

### TailwindCSS

TailwindCSS is een utility-first CSS framework voor snel ontwerpen van op maat gemaakte gebruikersinterfaces.

### Radix UI

Radix UI biedt een set van laagdrempelige, toegankelijke UI-componenten voor het bouwen van hoogwaardige, aanpasbare ontwerpen.

### Prisma

Prisma is een open-source database toolkit die het werken met databases in applicaties vereenvoudigt, inclusief een ORM.

### Supabase

Supabase is een open-source alternatief voor Firebase, dat zowel database-functionaliteiten als authenticatiediensten biedt.

### Axios

Axios is een populaire JavaScript-bibliotheek die wordt gebruikt om HTTP-verzoeken uit te voeren.

### React Query

React Query is een bibliotheek voor het beheren van server-state in React-applicaties, wat helpt bij het synchroniseren van data.

### Zod

Zod is een TypeScript-first schema declaration en validation library, die helpt bij het valideren van data.

### NestJS

NestJS is een framework voor het bouwen van efficiënte, schaalbare Node.js server-side applicaties, gebaseerd op TypeScript.

---

Dit overzicht vertegenwoordigt de kern van de technologische stack die wordt gebruikt in het `@hbo-ict/source` project.

# Installatiegids voor het Lingo Project

Dit document leidt je door het proces van het opzetten van het Lingo project in een NX geïntegreerde monorepo.

## Vereisten

Zorg ervoor dat de volgende hulpmiddelen geïnstalleerd zijn:

- Git
- Node.js (versie > 18 < 19)
- pnpm

## Installatie Stappen

### Stap 1: Kloon de Repository

Kloon de repository naar je lokale systeem:

```shell
git clone https://github.com/moha-fl-dev/hbo-ict.git
cd lingo-project-directory
```

```shell
git checkout next-pages-dir
```

```shell
pnpm i
```

### Stap 4: Stel de Environment Variabelen in

Maak een `.env` bestand in de root van het project en voeg de onderstaande variabelen toe. Deze variabelen zijn nodig voor de configuratie van de API en de front-end applicatie. Vervang de placeholders met de daadwerkelijke waarden voor je project.

```plaintext
API_PORT=3002
SUPABASE_URL=jouw_supabase_url
SUPABASE_ANON_KEY=jouw_supabase_anon_key
SUPABASE_JWT_SECRET=jouw_supabase_jwt_secret
DB_DIRECT_URL=jouw_directe_database_url
DATABASE_URL=jouw_database_url
NEXT_APP_ORIGIN=http://localhost:4200
NEXT_PUBLIC_API_URL=http://localhost:${API_PORT}
NEXT_PUBLIC_SITE_URL=http://localhost:4200
NEXT_COOKIE_NAME=session-token
```

### Stap 5: Genereer Prisma Types

Om de Prisma types te genereren die nodig zijn voor type-safe database queries, voer je het volgende commando uit vanuit de root van je project:

```bash
pnpm nx run lingo-schema:generate-types
```

Dit is de stap om Prisma types te genereren, essentieel voor het waarborgen van typeveiligheid binnen je project.

### Stap 6: Start de API en Front-end Parallel

Om de API en de front-end tegelijkertijd te starten, wat de ontwikkeling efficiënter maakt, voer je het volgende commando uit vanuit de root van je project:

```bash
pnpm run lingo-apps
```

Dit is de laatste stap om de ontwikkelingsservers op te starten, waarna je de Lingo-applicatie in je browser kunt openen en gebruiken.

Nu kun je de Lingo applicatie in je browser bekijken door naar `http://localhost:4200` te gaan en de API is bereikbaar via `https://localhost:3002`.

---

### Belangrijke Opmerking: Gebruik in Incognito Modus

Houd er rekening mee dat de Lingo applicatie **niet** gebruikt kan worden in de incognitomodus van de browser. Dit is een gevolg van de beslissing om ondertekende cookies te gebruiken, genomen voordat de beperkingen van deze benadering volledig bekend waren. Deze beperkingen zijn vooral merkbaar in browsers wanneer de API en de front-end niet op hetzelfde topniveau domein draaien.

In retrospect, had ik geweten over deze beperking, dan had ik wellicht gekozen voor het gebruik van lokale opslag (local storage) voor de JWT aan de kant van de client (Next.js). Het gebruik van ondertekende cookies vereist een consistente state van de browser, iets wat vaak beperkt wordt in de incognitomodus. Om deze reden wordt aanbevolen om de Lingo applicatie in de normale modus van de browser te gebruiken voor een optimale ervaring en correcte werking.
