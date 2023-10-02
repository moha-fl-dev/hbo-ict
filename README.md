# Lingo Incident Management Project

Welcome to the Lingo project, a simplified incident management system inspired by ServiceNow. This project is divided into two main parts: the frontend (`lingo-pages`) and the backend (`lingo-api`).

## Tech Stack

- **Frontend (`lingo-pages`):**

  - [Next.js](https://nextjs.org/)
  - [Shadcn](https://github.com/shadcn-ui/ui) (component library)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [React Query](https://react-query.tanstack.com/)
  - [React Hook Form](https://react-hook-form.com/)
  - [Zod](https://github.com/colinhacks/zod)
  - [Axios](https://axios-http.com/): Including instances and interceptors for handling HTTP requests.
  - [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) in the Next.js app for token validation.

- **Backend (`lingo-api`):**

  - [Nest.js](https://nestjs.com/)
  - [Supabase](https://supabase.io/) for authentication and database.

- **Development and Build:**
  - [Nx](https://nx.dev/): Extensible Dev Tools for Monorepos.

## Project Setup

1. **Clone the Repository:**
   To get started, clone the `lingo-pages` branch as follows:

   ```bash
   git clone -b next-pages https://github.com/moha-fl-dev/hbo-ict.git
   ```

2. **Environment Setup:**
   This project is connected to a Supabase project. To run it locally, you'll need to setup the environment variables with your Supabase credentials. You can find the necessary environment variables in the `.env.example` file in both the frontend and backend directories.

3. **Run the project:**
   Navigate to the project directories (`lingo-pages` and `lingo-api`), install the dependencies using `pnpm install`, and start the development server using `pnpm run lingo-pages`.

## Nx Monorepo Setup

This project is structured as a monorepo using [Nx](https://nx.dev/), which facilitates the organization and sharing of code between the frontend and backend. Below are the libraries contained within the Nx monorepo:

- **libs/lingo/auth:** This library contains the Nest.js authentication module.
- **libs/lingo/query-fns:** Defines the Axios instance, axios interceptors and query functions utilized across the project.
- **libs/lingo/types:** Shared types library which includes both Zod and TypeScript types. This is shared between the frontend and backend for consistent type checking.
- **libs/lingo/utils:** Lingo API utility library. This defines various configurations, decorators, pipes, and specific app schemas.
- **libs/shared/nest-app-config:** This library defines the configuration of the Nest.js application, including environment variable validation.
- **libs/shared/ui:** Contains the UI components, blocks, and shared layouts utilized across the project. The component library used is Shadcn. Note: everyting in **libs/shared/ui/src/lib/components:** is shadcn

The monorepo structure facilitates the sharing of code and libraries across the frontend and backend, ensuring a unified and streamlined development experience.

### Running the Project within Nx

1. **Install Dependencies:**

   ```bash
   pnpm install
   ```

2. **Serve the Project:**
   from the root dir

   ```
   run pnpm run lingo-pages
   ```

These commands will start the backend and frontend development servers in parralel, enabling a live-reloading development environment.
