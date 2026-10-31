# Proposed REST API contract — TechVault

**Status:** proposal for the separately developed Spring Boot backend. These endpoints and DTOs are expectations for integration planning only; they are not implemented or verified backend routes.

## Conventions

- Base URL: configured by `VITE_API_BASE_URL`.
- Store identifier: `techvault`, sent as `X-Store-Id` on every request.
- Suggested prefix: `/api/v1`.
- JSON request/response bodies; ISO-8601 timestamps.
- Suggested error envelope: `{ "code": "VALIDATION_ERROR", "message": "Readable summary", "fieldErrors": { "email": "Invalid email" }, "traceId": "..." }`.
- Product IDs should be stable server IDs. Pagination is recommended for catalogue endpoints.

## Proposed resources

| Domain | Method | Proposed path | Purpose |
|---|---|---|---|
| Authentication | POST | `/api/v1/auth/register` | Create customer account |
| Authentication | POST | `/api/v1/auth/login` | Authenticate and issue session/token |
| Authentication | POST | `/api/v1/auth/refresh` | Refresh access token |
| Authentication | POST | `/api/v1/auth/logout` | Revoke session |
| Products | GET | `/api/v1/products` | Search/filter/sort/paginate catalogue |
| Products | GET | `/api/v1/products/{productId}` | Product detail and variants |
| Products | GET | `/api/v1/products/{productId}/related` | Related products |
| Categories | GET | `/api/v1/categories` | Category tree/list |
| Categories | GET | `/api/v1/categories/{slug}/products` | Category catalogue |
| Inventory | GET | `/api/v1/inventory/{productId}` | Available stock by product |
| Inventory | GET | `/api/v1/inventory/variants/{variantId}` | Variant availability |
| Cart | GET | `/api/v1/cart` | Retrieve customer cart |
| Cart | PUT | `/api/v1/cart` | Replace/synchronize cart lines |
| Cart | DELETE | `/api/v1/cart/items/{lineId}` | Remove cart line |
| Wishlist | GET | `/api/v1/wishlist` | Retrieve saved products |
| Wishlist | PUT | `/api/v1/wishlist` | Synchronize saved product IDs |
| Orders | GET | `/api/v1/orders` | Customer order history |
| Orders | GET | `/api/v1/orders/{orderId}` | Order detail |
| Checkout | POST | `/api/v1/checkout/quote` | Validate cart and calculate totals |
| Checkout | POST | `/api/v1/checkout/orders` | Create order from validated checkout |

## Example DTOs

### Product summary

```json
{
  "id": "prod_123",
  "slug": "nova-x-pro-256",
  "name": "Nova X Pro 256GB",
  "brand": { "id": "brand_nova", "name": "Nova" },
  "category": { "id": "cat_phones", "name": "Smartphones", "slug": "smartphones" },
  "price": { "amount": 89900, "currency": "USD" },
  "compareAtPrice": { "amount": 99900, "currency": "USD" },
  "rating": { "average": 4.8, "count": 284 },
  "inventory": { "available": 18, "status": "IN_STOCK" },
  "media": [{ "url": "https://cdn.example.test/nova-x-pro.webp", "alt": "Nova X Pro" }]
}
```

### Product list query

```http
GET /api/v1/products?q=wireless&category=audio&brand=nova&minPrice=50&maxPrice=300&minRating=4&sort=POPULAR&page=0&size=24
X-Store-Id: techvault
```

Recommended sort enum: `POPULAR`, `PRICE_ASC`, `PRICE_DESC`, `NEWEST`.

### Cart synchronization

```json
{
  "items": [
    { "variantId": "variant_abc", "quantity": 2 }
  ]
}
```

Response should return authoritative line IDs, current unit prices, availability and totals. The backend must revalidate all prices and stock; never trust browser-submitted amounts.

### Auth

Register request:

```json
{ "name": "Alex Morgan", "email": "alex@example.com", "password": "not-a-real-password" }
```

Login request:

```json
{ "email": "alex@example.com", "password": "not-a-real-password" }
```

Return a secure session or token according to the backend's auth design. Prefer HttpOnly, Secure, SameSite cookies for browser sessions; do not persist sensitive tokens in localStorage.

### Checkout quote

```json
{
  "items": [{ "variantId": "variant_abc", "quantity": 2 }],
  "shippingAddress": {
    "name": "Alex Morgan",
    "addressLine1": "1 Example Street",
    "city": "Example City",
    "postalCode": "10001",
    "countryCode": "US"
  }
}
```

Suggested response: `{ "currency":"USD", "subtotal":179800, "shipping":0, "tax":0, "total":179800, "lines":[...] }` with amounts represented in minor currency units.

### Order creation

The real order endpoint should accept validated cart references, address IDs/details, selected shipping method and a payment-provider intent/reference. Payment authorization must happen through a PCI-compliant provider; this frontend demo intentionally has no payment integration.

## Frontend adapter work before production

1. Agree on DTO names, pagination, currency minor-unit conventions, auth/session strategy and error format.
2. Map server DTOs into the existing UI product shape in `src/services` (or dedicated mappers).
3. Replace local-only auth/cart/wishlist/order persistence with authenticated service calls.
4. Implement cancellation, retry and user-facing error states for network failures.
5. Add server-side validation for stock, discounts, shipping and totals.
6. Add tests for expired sessions, out-of-stock variants, stale prices and failed checkout.
