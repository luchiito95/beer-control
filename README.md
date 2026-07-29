# 🍺 Beer Control API

Beer Control es un ERP SaaS desarrollado para la administración integral de cervecerías, bares y distribuidores de cerveza.

El proyecto está construido utilizando **NestJS**, **Prisma ORM**, **PostgreSQL** y siguiendo los principios de **Clean Architecture**, **DDD (Domain-Driven Design)** y una arquitectura de **Monolito Modular**.

---

# 🚀 Tecnologías

- NestJS 11
- TypeScript
- PostgreSQL
- Prisma ORM
- Docker
- Swagger / OpenAPI
- Class Validator
- Clean Architecture
- Domain-Driven Design (DDD)

---

# 📂 Arquitectura

El proyecto sigue una arquitectura basada en módulos independientes.

```
src/
├── core/
├── config/
├── database/
└── modules/
```

Cada módulo mantiene la siguiente estructura:

```
module/
├── application/
├── domain/
├── infrastructure/
├── presentation/
└── module.ts
```

---

# 🏗️ Core

Actualmente el proyecto cuenta con una capa Core reutilizable para todos los módulos.

## Application

- Pagination
- PageRequest
- PageResult

## Domain

- BaseEntity
- BaseRepository

## Presentation

- Global Exception Filter
- Response Interceptor
- Pagination DTO

---

# 🗄️ Infraestructura

Implementado:

- Docker
- PostgreSQL
- Prisma ORM
- Prisma Migrations
- PrismaService
- DatabaseModule
- Swagger
- ValidationPipe Global
- Global Exception Filter
- Response Interceptor

---

# 📦 Organización del Dominio

Actualmente se encuentra implementado el módulo **Organization**.

```
Organization
│
├── Company
└── Branch
```

---

# 🏢 Company

Implementado completamente.

### Características

- CRUD completo
- Soft Delete
- Validaciones de dominio
- DTOs
- Swagger
- Repository Pattern
- Prisma Repository
- Mappers
- Pagination

---

# 🏪 Branch

Implementado completamente.

### Características

- CRUD completo
- Relación con Company
- Validación de existencia de Company
- Código único por empresa
- Soft Delete
- DTOs
- Swagger
- Repository Pattern
- Prisma Repository
- Mappers
- Pagination

---

# 🧩 Convenciones de Arquitectura

Todos los módulos implementan exactamente la misma estructura.

## Application

```
Commands
Queries
Use Cases
Results
```

## Domain

```
Entities
Repositories
Enums
```

## Infrastructure

```
Persistence
Repositories
Mappers
```

## Presentation

```
Controllers
DTOs
Response Mappers
```

---

# 📋 Estado del Proyecto

## Organización

| Módulo | Estado |
|---------|--------|
| Company | ✅ |
| Branch | ✅ |

## Inventario

| Módulo | Estado |
|---------|--------|
| Warehouse | ⏳ |
| Product | ⏳ |
| Inventory | ⏳ |

## Compras

| Módulo | Estado |
|---------|--------|
| Supplier | ⏳ |
| Purchase Order | ⏳ |

## Ventas

| Módulo | Estado |
|---------|--------|
| Customer | ⏳ |
| Sales | ⏳ |

## Caja

| Módulo | Estado |
|---------|--------|
| Cash Register | ⏳ |

## Reportes

| Módulo | Estado |
|---------|--------|
| Dashboard | ⏳ |
| Reports | ⏳ |

## Configuración

| Módulo | Estado |
|---------|--------|
| Settings | ⏳ |

---

# 📖 API

La documentación se encuentra disponible mediante Swagger.

```
http://localhost:3000/api
```

---

# 🧱 Principios de Desarrollo

- Clean Architecture
- Domain-Driven Design (DDD)
- SOLID
- Repository Pattern
- Dependency Injection
- Modular Monolith
- API First
- OpenAPI (Swagger)

---

# ▶️ Ejecutar el proyecto

## Instalar dependencias

```bash
npm install
```

## Levantar PostgreSQL

```bash
docker compose up -d
```

## Ejecutar migraciones

```bash
npx prisma migrate dev
```

## Generar Prisma Client

```bash
npx prisma generate
```

## Ejecutar el proyecto

```bash
npm run start:dev
```

---

# 👨‍💻 Autor

Desarrollado con ❤️ utilizando NestJS + Prisma + PostgreSQL.