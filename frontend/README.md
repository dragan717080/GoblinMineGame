<div align=center>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="public/react-light.svg">
  <source media="(prefers-color-scheme: light)" srcset="public/react-dark.svg">
  <img alt="React">
</picture>

# React Library

### React Library App with TypeScript, Vite, Tailwind CSS, ESLint, Prettier, and Husky.

</div>

## Technologies Used

- ⚡ **[React](https://react.dev/)** - A JavaScript library for building user interfaces. It follows a component-based architecture
- 🔥 **[App Router](https://reactrouter.com/)** - It allows defining routes in a declarative manner and map them to specific components
- 🚀 **[Vite](https://vite.dev/)** - A lightning-fast build tool and development server for JavaScript applications
- 🎨 **[Tailwind CSS](https://tailwindcss.com/)** - A Utility-First CSS Framework for Rapid UI Development
- 📦 **[TypeScript](https://www.typescriptlang.org/)** - A typed superset of JavaScript that compiles to plain JavaScript
- 📝 **[ESLint](https://eslint.org/)** - The pluggable linting utility for JavaScript and JSX
- 🛠 **[Prettier](https://prettier.io/)** - An opinionated code formatter
- 🐶 **[Husky](https://typicode.github.io/husky/#/)** - A tool that makes Git hooks easy
- 🚫 **[lint-staged](https://github.com/okonet/lint-staged)** - Run linters against staged git files
- 📄 **[commitlint](https://commitlint.js.org/#/)** - Lint commit messages

## Set the environment variables

```
VITE_API_BASE_URL="http://127.0.0.1:8000"
```

## Install dependencies and run

```bash
git clone https://github.com/dragan717080/GoblinMineGame.git

pnpm install

pnpm dev
```

## Available Scripts

In the project directory, you can run:

| **Script**   | **Description**                                      |
| ------------ | ---------------------------------------------------- |
| `dev`        | Runs the app in the development mode.                |
| `build`      | Builds the app for production to the `.next` folder. |
| `start`      | Runs the built app in the production mode.           |
| `preview`    | Builds and serves the app in the production mode.    |
| `lint`       | Runs next lint on the project.                       |
| `type-check` | Runs TypeScript type checker.                        |
| `fmt`        | Formats the code with Prettier.                      |
| `fmt:check`  | Checks if the code is formatted with Prettier.       |
| `prepare`    | Installs husky git hooks.                            |
