
# AliAlaa Portfolio

This is a Next.js personal portfolio website for AliAlaa, built with Firebase Studio. It showcases projects, skills, a blog, and contact information, along with a private admin dashboard for content management.

## Tech Stack

This project utilizes a modern tech stack for a robust and performant web application:

*   **Next.js:**
    *   **Role:** The core React framework for building the application.
    *   **Usage:** Handles server-side rendering (SSR), static site generation (SSG), routing (App Router), API routes, and overall project structure. Provides features like image optimization (`next/image`).

*   **React:**
    *   **Role:** A JavaScript library for building user interfaces.
    *   **Usage:** Used to create reusable UI components for all pages and interactive elements.

*   **TypeScript:**
    *   **Role:** A superset of JavaScript that adds static typing.
    *   **Usage:** Enhances code quality, developer experience, and maintainability by catching errors during development.

*   **Tailwind CSS:**
    *   **Role:** A utility-first CSS framework.
    *   **Usage:** Styles the entire application, providing a highly customizable and responsive design system without writing custom CSS extensively.

*   **ShadCN UI:**
    *   **Role:** A collection of beautifully designed, accessible, and reusable UI components.
    *   **Usage:** Provides pre-built components like Buttons, Cards, Dialogs, Forms, Tables, etc., built on top of Radix UI and styled with Tailwind CSS. Accelerates UI development.

*   **Lucide React:**
    *   **Role:** A library of simply beautiful and consistent SVG icons.
    *   **Usage:** Provides most of the icons used throughout the application for navigation, actions, and visual cues.

*   **Recharts:**
    *   **Role:** A composable charting library built on React components.
    *   **Usage:** Used to display charts and graphs on the admin dashboard (e.g., content views, engagement).

*   **Node.js:**
    *   **Role:** JavaScript runtime environment.
    *   **Usage:** Next.js applications run on Node.js for server-side operations and the build process.

*   **npm (or Yarn):**
    *   **Role:** Package manager for Node.js.
    *   **Usage:** Manages project dependencies and scripts.

*   **Firebase (App Hosting):**
    *   **Role:** A platform for deploying and hosting web applications.
    *   **Usage:** The `apphosting.yaml` file is configured for deploying this Next.js application to Firebase App Hosting.

*   **HTML/CSS/JavaScript:**
    *   **Role:** The fundamental building blocks of the web.
    *   **Usage:** Underpin all frontend development. Next.js and React compile down to these for the browser.

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm or Yarn

### Installation & Setup

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root of your project by copying `.env.example` (if one exists) or by creating a new one. Add the following variables:
    ```env
    # Admin Credentials (used for mock login and API based login)
    ADMIN_EMAIL=your_admin_email@example.com
    ADMIN_PASSWORD=your_admin_password

    # CockroachDB / PostgreSQL Connection
    DB_HOST=
    DB_PORT=26257
    DB_USER=
    DB_PASSWORD=
    DB_DATABASE=
    DB_SSL_ROOT_CERT_PATH= # e.g., $env:appdata\postgresql\root.crt or path/to/your/root.crt
    ```
    Replace the placeholder values with your actual credentials. `ADMIN_EMAIL` and `ADMIN_PASSWORD` are used by the `/api/login` route. Other variables are for database connection.

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```
This will start the development server, usually on `http://localhost:9002` (as specified in `package.json`).

### Building for Production

To create a production-ready build:
```bash
npm run build
```
This command prepares your app for deployment. The specific output (static export vs. server deployment) depends on your `next.config.ts` settings. The current `next.config.ts` does not specify `output: 'export'`, so it will build for a Node.js server environment, suitable for platforms like Firebase App Hosting.

## Project Structure

*   `src/app/`: Contains all the pages, layouts, and route-specific components (using Next.js App Router).
*   `src/components/`: Shared UI components (e.g., layout, ShadCN UI components).
*   `src/lib/`: Utility functions.
*   `src/context/`: React Context providers (e.g., `ThemeContext`).
*   `src/data/`: Mock data used in the application.
*   `public/`: Static assets like images (though `next/image` is preferred for optimization).
*   `next.config.ts`: Configuration file for Next.js.
*   `tailwind.config.ts`: Configuration file for Tailwind CSS.
*   `package.json`: Lists project dependencies and scripts.
*   `apphosting.yaml`: Configuration for Firebase App Hosting.

## Admin Dashboard

The application includes a private admin dashboard accessible via the `/login` page. Use the admin credentials defined in your `.env` file (specifically `ADMIN_EMAIL` and `ADMIN_PASSWORD` for the `/api/login` route). The dashboard allows for:
*   Managing portfolio projects (view, add, edit, delete - currently using mock data).
*   Viewing messages (from mock data, as database integration is not fully active by default).
*   Account settings.

## Notes
*   The current admin login functionality uses environment variables `ADMIN_EMAIL` and `ADMIN_PASSWORD` checked on the server-side via an API route.
*   Contact form messages are currently logged to the console by the API route and displayed from mock data on the dashboard. Full database integration (e.g., CockroachDB) needs to be completed by the developer in `src/app/api/contact/route.ts` and `src/app/api/messages/*` routes, and `src/app/dashboard/messages/page.tsx`.
```