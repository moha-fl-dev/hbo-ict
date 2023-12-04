# Lingo Project Architectuur

Welkom bij de documentatie van de architectuur van het Lingo project, een vereenvoudigde ServiceNow applicatie. Hieronder vind je een overzicht van de structuur van het project.

## Frontend (`lingo-pages`)

- **UI**: Bevat alle gebruikersinterface componenten en stijlen.
- **Hooks**: Een verzameling React hooks voor state en logic management binnen de UI componenten.
- **Actions**: Acties die gebruikt worden om met de backend te communiceren, vaak gekoppeld aan UI events.
- **Query Functions (`query-fns`)**: Functies die de data fetching logica encapsuleren, vaak gebruikt in combinatie met React Query.

## Backend (`lingo-api`)

- **API (End-to-End Testing)**: Bevat de e2e tests voor de API endpoints om te verzekeren dat alles naar behoren werkt.
- **Authenticatie (`supabase-auth`)**: Verantwoordelijk voor gebruikersauthenticatie, met behulp van Supabase als auth provider.
- **Ticket Aggregator**: Een service die tickets verzamelt en verwerkt.
- **Types**: Definieert de data types en interfaces die door het hele systeem worden gebruikt.

## Shared Libraries

- **Utilities (`lingo-utils`)**: Gedeelde hulpfuncties en utilities die in verschillende delen van de applicatie worden gebruikt.
- **Configuration (`config`)**: Bevat configuratiebestanden en -instellingen voor het project.
- **Prisma Client (`lingo-prisma-client`)**: De Prisma client die wordt gebruikt voor database interacties.
- **Schema (`lingo-schema`)**: Bevat de database schema's en modellen voor Prisma.

## Components (`component`)

- Technische componenten waarvoor een ticket kan worden aangemaakt, zoals Salesforce, SAP CM, etc.

## Features (`/features`)

- **Comments**: Module voor het beheren van commentaar op tickets.
- **Department**: Module voor afdelingsgerelateerde functionaliteiten.
- **Employee**: Module voor werknemer gerelateerde gegevens en acties.
- **Team**: Module om team data en interacties te beheren.
- **Ticket**: Beheert de tickets zelf, inclusief creatie, updates en statusbeheer.
- **Ticket Number**: Genereert en beheert unieke ticketnummers.

Deze architectuur zorgt voor een schaalbare en onderhoudbare codebasis, waarbij de frontend en backend logisch gescheiden zijn maar naadloos samenwerken.
