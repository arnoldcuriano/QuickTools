# Server API

There is no implemented QuickTools server API at this time.

## Current Server State

The `server` package contains dependencies and empty folders for a future Express application:

- `controllers`
- `middleware`
- `models`
- `routes`
- `utils`

`server/app.js` is empty. No routes, middleware, request validation, upload handling, persistence, or error response format is implemented.

## Installed Server Dependencies

The package currently includes dependencies commonly used for:

- Express routing.
- Security headers with helmet.
- CORS.
- Compression.
- Request logging with morgan.
- Environment variables with dotenv.
- File uploads with multer.
- Image processing with sharp and jimp.

These dependencies do not define runtime behavior by themselves.

## API Documentation Rule

Before implementing a backend route, document:

- Method and path.
- Request body or upload format.
- Validation rules.
- Size limits.
- Success response.
- Error response.
- Security and privacy considerations.
- Whether uploaded files are retained, transformed, or discarded.

Do not claim an endpoint exists until it is wired into the server app.
