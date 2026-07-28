# 🍺 Beer Control API

Backend del sistema **Beer Control**, desarrollado con **NestJS**, **Prisma** y **PostgreSQL**, siguiendo principios de **Clean Architecture** y **Domain-Driven Design (DDD)**.

---

# Tecnologías

- NestJS 11
- TypeScript
- Prisma ORM
- PostgreSQL
- Swagger (OpenAPI)
- Class Validator
- Class Transformer

---

# Arquitectura

El proyecto sigue una arquitectura basada en **DDD + Clean Architecture**, separando claramente las responsabilidades de cada capa.

```
src/
│
├── core/
│   ├── application/
│   ├── domain/
│   ├── presentation/
│   └── constants/
│
├── database/
│   └── prisma/
│
├── modules/
│   └── identity/
│
└── main.ts
```

Cada módulo contiene:

```
application/
domain/
infrastructure/
presentation/
```

---

# Módulos

Actualmente el proyecto contiene el siguiente módulo:

## Identity

### Company

Operaciones implementadas:

- Crear empresa
- Obtener empresa
- Listar empresas (Paginado)
- Actualizar empresa
- Eliminación lógica (Soft Delete)

---

# Características

## Validación

Se utiliza **ValidationPipe** de forma global.

- Transformación automática
- Whitelist
- Validación de DTOs

---

## Manejo de errores

La aplicación utiliza un **GlobalExceptionFilter** para centralizar todas las respuestas de error.

Formato:

```json
{
  "success": false,
  "statusCode": 404,
  "error": "NotFoundException",
  "message": "Company not found.",
  "path": "/api/companies/123",
  "timestamp": "2026-07-29T18:00:00.000Z"
}
```

---

## Respuestas

Las respuestas exitosas son envueltas automáticamente mediante un **ResponseInterceptor**.

Formato:

```json
{
  "success": true,
  "data": {}
}
```

---

# Base de datos

ORM:

- Prisma

Motor:

- PostgreSQL

Migraciones:

```bash
npx prisma migrate dev
```

Abrir Prisma Studio:

```bash
npx prisma studio
```

---

# Instalación

```bash
npm install
```

---

# Variables de entorno

Crear un archivo:

```
.env
```

Ejemplo:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/beer_control"
PORT=3000
```

---

# Ejecutar proyecto

Modo desarrollo

```bash
npm run start:dev
```

Modo producción

```bash
npm run build

npm run start:prod
```

---

# Swagger

Disponible en:

```
http://localhost:3000/docs
```

API:

```
http://localhost:3000/api
```

---

# Estructura del dominio

```
Company
│
├── Branch
│      ├── Warehouse
│      └── Employees
│
├── Products
│
├── Suppliers
│
├── Customers
│
├── Purchases
│
└── Sales
```

---

# Convenciones

- Clean Architecture
- Domain-Driven Design
- Repository Pattern
- CQRS ligero (Commands / Queries)
- Soft Delete
- DTOs para entrada y salida
- Prisma como capa de persistencia

---

# Autor

Beer Control API

2026