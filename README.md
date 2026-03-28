# Client Gateway

A NestJS-based API gateway for microservices communication with TCP transport and comprehensive validation.

## Description

This is a client gateway built with NestJS framework that serves as the communication layer between clients and microservices. It handles request routing, validation, and microservice communication using TCP transport protocol. The gateway provides a unified API interface for multiple backend services including products and orders management.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- Git
- Docker (for NATS server)

## Installation and Setup

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/Nest-Microservices-Learn-Course/client-gateway.git
cd client-gateway
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Or using yarn
yarn install
```

### 3. Environment Configuration

Copy the environment template and configure your environment variables:

```bash
cp .env.template .env
```

Edit the `.env` file with your specific configuration for microservices hosts and ports.

### 4. Start NATS Server

Start the NATS message broker for microservice communication:

```bash
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```

### 5. Start Microservices

Ensure that the microservices you want to consume (products, orders) are running and accessible.

## Running the Application

### Development Mode

```bash
# Using npm
npm run start:dev

# Or using yarn
yarn start:dev
```

The application will start in watch mode with hot reload on port 3000.

### Production Mode

```bash
# Build the application
npm run build

# Run in production mode
npm run start:prod
```

### Debug Mode

```bash
npm run start:debug
```

## Available Scripts

- `npm run start` - Start the application
- `npm run start:dev` - Start in development mode with hot reload
- `npm run start:debug` - Start in debug mode
- `npm run start:prod` - Start in production mode
- `npm run build` - Build the application
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run test:cov` - Run tests with coverage
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## API Documentation

Once the application is running, you can access the API endpoints at `http://localhost:3000/api`. The gateway provides routes for:

- **Products**: `/api/products/*`
- **Orders**: `/api/orders/*`

## Project Structure

```
src/
├── commons/           # Common utilities, DTOs, and exception filters
│   ├── dto/           # Shared DTOs (pagination, order-pagination)
│   └── exceptions/    # Custom exception filters
├── config/            # Configuration files (environment, services)
├── orders/            # Orders module with CRUD operations
│   ├── dto/           # Order-specific DTOs
│   ├── enum/          # Order enums (status)
│   └── entities/      # Order entities
├── products/          # Products module with CRUD operations
│   ├── dto/           # Product-specific DTOs
│   └── entities/      # Product entities
├── app.module.ts      # Root module
└── main.ts           # Application entry point
```

## Technologies Used

- **NestJS** - Progressive Node.js framework
- **@nestjs/microservices** - Microservices support
- **@nestjs/common** - Common NestJS utilities
- **class-validator** - Validation decorators
- **class-transformer** - Data transformation
- **dotenv** - Environment variable management
- **Joi** - Data validation library
- **TypeScript** - Typed JavaScript
- **RxJS** - Reactive programming library
- **TCP Transport** - Microservice communication protocol