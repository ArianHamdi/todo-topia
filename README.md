# Todo Topia

## Overview

Todo Topia is an intuitive todo list application designed to help users organize and categorize their tasks efficiently. With this tool, users can effortlessly segregate tasks, ensuring that their daily chores, professional commitments, and personal goals are neatly delineated and easily accessible.

## Features

### Multilingual Support:

Todo Topia is built with a global audience in mind. The application currently supports the following languages:

- English (en)
- Spanish (es)
- Italian (it)
- French (fr)
- German (de)

The app will automatically synchronize the language based on the user's Telegram settings.

### Theme Synchronization:

In line with our aim to offer a seamless user experience, Todo Topia automatically synchronizes its theme with the user's preferred theme settings on Telegram.

## Project Setup

### Initial Steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/ArianHamdi/todo-topia
   ```

2. **Install Dependencies**:

   ```bash
   pnpm install
   ```

3. **Environment Configuration**:
   Create a `.env` file in the root directory of your project. Use the `.env.example` file as a reference and fill in your `DATABASE_URL` and `BOT_API_TOKEN`.

### Development:

For local development, we suggest using `ngrok` to tunnel the server. After starting the development server using:

````bash
pnpm dev
‍‍‍```

You can set up ngrok to tunnel the local server:

```bash
ngrok http 3000
````

This will provide you with a public URL to access your local development server.

### Tools and Libraries:

- **TypeScript**: Provides static typing to JavaScript, ensuring a more robust codebase.
- **ESLint**: Identifies and fixes problematic patterns found in JavaScript/TypeScript code.
- **Prettier**: An opinionated code formatter ensuring that all output code conforms to a consistent style.
- **Lint-Staged**: Runs linters against staged git files, making sure you're only committing files that meet your linting criteria.
- **Husky**: Enhances git hooks by making them easier to use, share, and configure.

  > Note: Husky should install automatically when you use `pnpm install`. If for some reason it doesn't, execute the following command:
  >
  > ```bash
  > npm run prepare
  > ```

### Documentation:

For detailed documentation and component visualization, we leverage **Storybook**. To launch Storybook, use the command:

```bash
pnpm storybook
```
