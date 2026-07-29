# 🍺 Beer Control API

Beer Control es un ERP SaaS desarrollado para la administración integral de cervecerías, bares y distribuidores de cerveza.

El proyecto está construido utilizando **NestJS**, **Prisma ORM**, **PostgreSQL** y siguiendo los principios de **Clean Architecture**, **Domain-Driven Design (DDD)** y una arquitectura de **Monolito Modular**.

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
- CQRS (Commands / Queries)

---

# 📂 Arquitectura

El proyecto sigue una arquitectura basada en módulos independientes.

```text
src/
├── core/
├── config/
├── database/
└── modules/
```

Cada módulo mantiene la siguiente estructura.

```text
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

Actualmente el proyecto se encuentra organizado por dominios funcionales.

```text
modules/

Organization
├── Company       ✅
└── Branch        ✅

Inventory
├── Warehouse     ✅
└── Category      ✅
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

# 🏬 Warehouse

Implementado completamente.

### Características

- CRUD completo
- Relación con Branch
- Validación de existencia de Branch
- Código único por sucursal
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

```text
Commands
Queries
Use Cases
Results
```

## Domain

```text
Entities
Repositories
Enums
```

## Infrastructure

```text
Persistence
Repositories
Mappers
```

## Presentation

```text
Controllers
DTOs
Response Mappers
```

---

# 📏 Convenciones de Desarrollo

## Entidades

Todas las entidades:

- Heredan de `BaseEntity`.
- Utilizan propiedades privadas (`_name`, `_code`, etc.).
- Exponen únicamente getters.
- Toda modificación se realiza mediante métodos de dominio (`update`, `activate`, `deactivate`, etc.).

---

## Repositories

Cada módulo define únicamente un contrato.

```ts
export abstract class CompanyRepository {}
```

La implementación pertenece a Infrastructure.

---

## Mappers

Todos los mappers implementan exactamente los siguientes métodos:

```text
toDomain()
toCreate()
toUpdate()
```

No se utilizan métodos como:

```text
toPersistence()
fromEntity()
```

---

## Commands

Toda operación de escritura recibe un Command.

Ejemplo:

```ts
execute(command: CreateCompanyCommand)
```

Nunca se reciben parámetros individuales.

---

## Queries

Toda operación de lectura recibe un Query.

Ejemplo:

```ts
execute(query: GetCompanyQuery)
```

---

## Results

Cada caso de uso retorna un objeto específico.

```text
CreateResult
UpdateResult
DeleteResult
GetResult
SummaryResult
```

Los listados siempre retornan:

```ts
PageResult<T>
```

---

## Controllers

Los controllers únicamente:

- reciben DTOs
- crean Commands o Queries
- ejecutan casos de uso

No contienen lógica de negocio.

---

## ResponseMapper

Transforman entidades del dominio en objetos de respuesta.

Nunca se exponen directamente las entidades del dominio.

---

# 📋 Checklist para nuevos módulos

Antes de considerar un módulo terminado debe verificarse:

- [ ] Modelo Prisma
- [ ] Migración
- [ ] Prisma Client
- [ ] Entity
- [ ] Repository
- [ ] Mapper
- [ ] Prisma Repository
- [ ] Create
- [ ] Update
- [ ] Delete
- [ ] Get
- [ ] List
- [ ] DTOs
- [ ] Response Mapper
- [ ] Controller
- [ ] Module
- [ ] Swagger
- [ ] CRUD probado

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
| Warehouse | ✅ |
| Category | ✅ |
| Brand | ⏳ |
| Unit | ⏳ |
| Product | ⏳ |
| Inventory | ⏳ |
| Inventory Movement | ⏳ |

## Compras

| Módulo | Estado |
|---------|--------|
| Supplier | ⏳ |
| Purchase Order | ⏳ |
| Purchase Detail | ⏳ |

## Ventas

| Módulo | Estado |
|---------|--------|
| Customer | ⏳ |
| Sale | ⏳ |
| Sale Detail | ⏳ |

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

```text
http://localhost:3000/api
```

---

# 🧱 Principios de Desarrollo

- Clean Architecture
- Domain-Driven Design (DDD)
- SOLID
- CQRS
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

Desarrollado con ❤️ utilizando NestJS, Prisma ORM y PostgreSQL.