# React-Laravel Full-Stack Project

## Prerequisites

Before you begin, ensure you have the following installed:
- Docker
- Docker Compose
- Make
- Git

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/mickaelnambs/laravel_react_ecommerce.git
cd laravel_react_ecommerce
```

### 2. Backend Setup (Laravel)

Navigate to the backend directory:
```bash
cd backend
```

Install and start the backend project:
```bash
make project-install
```

Insert your Stripe secret key in .env file:
```
STRIPE_KEY="your stripe secret key"
```

The Backoffice will be accessible at `http://localhost:8000`

### 3. Frontend Setup (React)

Navigate to the frontend directory:
```bash
cd ../frontend
```

Install and start the frontend project:
```bash
make install
```

Insert your Stripe publishable key in .env file:
```
VITE_STRIPE_PUBLIC_KEY=your stripe public key
```

The React application will be accessible at `http://localhost:3000`

## Login Credentials

### Default Admin User
- **Email**: `admin@gmail.com`
- **Password**: `password`