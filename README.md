# NestJS MySQL Authentication Project

A NestJS application with MySQL database integration featuring user authentication. This project includes basic login and signup functionality using JWT tokens.

## 🚀 Features

- **User Registration** - Sign up with email and password
- **User Login** - Authentication with JWT tokens
- **MySQL Database** - User data storage with TypeORM
- **Password Hashing** - Secure password storage with bcrypt
- **JWT Authentication** - Token-based authentication system
- **Input Validation** - Request validation using class-validator
- **TypeScript** - Full TypeScript support for type safety

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MySQL](https://www.mysql.com/) (v8.0 or higher)

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/biswass101/NestJs-MySQL.git
   cd NestJs-MySQL
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   DB_DATABASE=nestjs_auth_db
   
   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRES_IN=24h
   
   # Application Configuration
   PORT=3000
   ```

4. **Database Setup**
   
   Create a MySQL database:
   ```sql
   CREATE DATABASE nestjs_auth_db;
   ```

## 🏃‍♂️ Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

The application will be available at `http://localhost:3000`

## 🔐 Authentication Endpoints

### Sign Up
```http
POST /auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

## 🏗️ Project Structure

```
src/
├── app.module.ts          # Root application module
├── main.ts               # Application entry point
├── auth/                 # Authentication module
│   ├── auth.controller.ts    # Auth endpoints (login, signup)
│   ├── auth.service.ts       # Auth business logic
│   ├── auth.module.ts        # Auth module configuration
│   ├── dto/                  # Data transfer objects
│   │   ├── login.dto.ts      # Login request validation
│   │   └── signup.dto.ts     # Signup request validation
│   ├── entities/             # Database entities
│   │   └── user.entity.ts    # User entity
│   └── guards/               # Authentication guards
│       └── jwt-auth.guard.ts # JWT guard
└── database/             # Database configuration
    └── database.module.ts    # TypeORM configuration
```

## 🛠️ Technologies Used

- **Framework**: [NestJS](https://nestjs.com/) - Progressive Node.js framework
- **Database**: [MySQL](https://www.mysql.com/) - Relational database
- **ORM**: [TypeORM](https://typeorm.io/) - Database ORM
- **Authentication**: [JWT](https://jwt.io/) - JSON Web Tokens
- **Password Hashing**: [bcrypt](https://www.npmjs.com/package/bcrypt) - Password encryption
- **Validation**: [class-validator](https://github.com/typestack/class-validator) - Request validation
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run start` | Start the application |
| `npm run start:dev` | Start in development mode with hot reload |
| `npm run start:prod` | Start in production mode |
| `npm run build` | Build the application |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt before storing
- **JWT Tokens**: Secure token-based authentication
- **Input Validation**: All requests are validated using DTOs
- **Environment Variables**: Sensitive data stored in environment variables

## 🚀 Next Steps

This is a basic authentication setup. You can extend it by adding:

- **Profile Management** - Update user profile endpoints
- **Password Reset** - Forgot password functionality
- **Email Verification** - Verify email addresses
- **Role-Based Access** - Admin/User roles
- **Refresh Tokens** - Token refresh mechanism
- **Social Login** - Google/Facebook authentication

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the [MIT License](LICENSE).

## 👨‍💻 Author

**Biswas** - [biswass101](https://github.com/biswass101)

## 📞 Support

If you have any questions or need help:
- Open an issue on GitHub
- Contact: [your-email@example.com]

---

⭐ If you found this project helpful, please give it a star on GitHub!
