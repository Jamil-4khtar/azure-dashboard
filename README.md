# Azure Dashboard

A modern, responsive dashboard for managing and monitoring Azure resources built with Next.js. This dashboard serves as the admin interface for the Azure Project website editor with full CMS capabilities.

## 🏗️ Architecture Overview

This dashboard is part of a larger Azure Project ecosystem:

- **Website**: Next.js (user-facing site) ✅
- **Editor/Dashboard**: Next.js (this repository) 🚧
- **Backend**: Node.js (separated from Next.js) 🚧

## 🚀 Tech Stack

- **Framework**: Next.js 15.5.4 with App Router
- **Styling**: Tailwind CSS v4
- **UI Components**: React Icons
- **Theme**: next-themes for dark/light mode
- **State Management**: React Hooks + js-cookie
- **Linting**: ESLint with Next.js config
- **Language**: JavaScript with JSConfig

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0 (or yarn/pnpm/bun)
- **Git** for version control

## 🛠️ Installation & Setup

1. **Clone the repository**

    git clone https://github.com/Jamil-4khtar/azure-dashboard.git
    cd azure-dashboard

2. **Install dependencies**
		
    	npm install
    *or*
		
    	yarn install
    *or*
    	
		pnpm install
    *or*

    	bun install

3. **Environment Variables**
   
   Create a `.env.local` file in the root directory:

    cp .env.example .env.local  # if .env.example exists
    # or create .env.local manually

   Required environment variables:

    # App Configuration
    	NEXT_PUBLIC_APP_URL=http://localhost:3001
    	NEXT_PUBLIC_API_URL=http://localhost:3000


4. **Start the development server**

    	npm run dev

   Open http://localhost:3001 in your browser.

## 📜 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Development** | `npm run dev` | Starts development server on port 3001 with hot reload |
| **Build** | `npm run build` | Creates optimized production build |
| **Start** | `npm run start` | Starts production server on port 3001 |
| **Lint** | `npm run lint` | Runs ESLint to check code quality |

### Port Configuration

This dashboard runs on **port 3001** to avoid conflicts with the main website (typically on port **3002**).

## 📁 Project Structure

    azure-dashboard/
    ├── app/                  # Next.js App Router pages
    ├── components/           # Reusable React components
    ├── features/             # Feature-specific components and logic
    ├── public/               # Static assets (images, icons, etc.)
    ├── .vscode/              # VS Code workspace settings
    ├── eslint.config.mjs     # ESLint configuration
    ├── jsconfig.json         # JavaScript project configuration
    ├── next.config.mjs       # Next.js configuration
    ├── package.json          # Dependencies and scripts
    ├── postcss.config.mjs    # PostCSS configuration
    └── README.md             # Project documentation

## 🎨 Features

- **Responsive Design**: Works seamlessly on desktop and mobile devices  
- **Dark/Light Theme**: Built-in theme switching with next-themes  
- **Modern UI**: Clean, modern interface with Tailwind CSS  
- **Component-Based**: Modular architecture with reusable components  
- **Feature Organization**: Structured feature-based code organization  
- **Performance Optimized**: Built with Next.js best practices  

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to [Vercel](https://vercel.com)
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/your-repo-name)

### Manual Deployment

1. **Build the application**

    	npm run build

2. **Start the production server**

    	npm run start

### Docker Deployment (Optional)

Create a `Dockerfile`:

    FROM node:18-alpine
    WORKDIR /app
    COPY package*.json ./
    RUN npm ci --only=production
    COPY . .
    RUN npm run build
    EXPOSE 3001
    CMD ["npm", "start"]

## 🔧 Development Guidelines

### Code Style
- Follow ESLint rules defined in `eslint.config.mjs`  
- Use Prettier for consistent formatting  
- Follow Next.js conventions for file naming and structure  

### Component Guidelines
- Use functional components with hooks  
- Keep components small and focused  
- Place reusable components in `/components`  
- Feature-specific components go in `/features`  

### Git Workflow
- Create feature branches from `master`  
- Use conventional commit messages  
- Submit pull requests for code review  

## 🤝 Contributing

1. Fork the repository  
2. Create a feature branch (`git checkout -b feature/amazing-feature`)  
3. Commit your changes (`git commit -m 'Add amazing feature'`)  
4. Push to the branch (`git push origin feature/amazing-feature`)  
5. Open a Pull Request  

## 📝 License

This project is private and proprietary.

## 🐛 Troubleshooting

### Common Issues

**Port already in use**

    # Kill process on port 3001
    lsof -ti:3001 | xargs kill -9
    # Or use a different port
    npm run dev -- -p 3002

**Environment variables not loading**
- Ensure `.env.local` exists and has correct syntax  
- Restart the development server after adding new variables  
- Check that variables start with `NEXT_PUBLIC_` for client-side access  

**Build fails**

    # Clear Next.js cache
    rm -rf .next

    # Delete node_modules and reinstall
    rm -rf node_modules && npm install

- Check for TypeScript errors if using TypeScript  

## 📞 Support

For questions or issues:  
- Create an issue in this repository  
- Check existing documentation  
- Review Next.js documentation: https://nextjs.org/docs

---

**Built with ❤️ for the Azure Project ecosystem**
