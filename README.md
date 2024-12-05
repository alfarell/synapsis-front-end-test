# BLOG APP

Blog post app with features to write, share, and explore engaging stories from writers.

## Technology used

Framework: Next.js 13 (with pages router)
Styling: Ant Design, Tailwind CSS
API: REST API with Axios
State Management: React Context API, Tanstack React Query
Deployment: AWS Amplify

## Getting Started

First, setup the environment variable.
Create `.env` file in the root directory of the project, or copy the `.env.sample` file and rename it to `.env`

```bash
cp .env.sample .env
```

Then, run this command to install all the required dependencies:

```bash
npm run install
```

Run this command to start the development server on your local machine:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the website.

## Important Scripts

`npm run dev`: Starts the application in development mode.
`npm run build`: Builds the application for production.
`npm run start`: Starts the application from production build.
`npm run lint`: Lints the code using ESLint.
`npm run prepare`: Prepares husky installation for git hooks.
