# Search System Integration 

The Search feature (`GET /api/artisans/search`) has been implemented to handle complex dynamic filtering using MySQL queries. 

## Route Handled
**Endpoint**: `GET /artisans/search`
(If mounted in `server.js` under `/api/artisans/search`, the actual URL becomes `http://localhost:5000/api/artisans/search?skill=...`)

## Supported Query Parameters
You can mix and match any of these (none are required):
* `skill` (string) -> e.g., `?skill=Plumbing`
* `location` (string) -> e.g., `?location=Kigali`
* `minRating` (number) -> e.g., `?minRating=4` (Requires an inner join and `HAVING` clause to filter the calculated average reviews)
* `priceMin` (number) -> e.g., `?priceMin=10`
* `priceMax` (number) -> e.g., `?priceMax=100`

## How to Integrate with `server.js`

Add these two lines to `backend/server.js`:

```javascript
// 1. Import the route
const searchRoutes = require('./routes/search');

// 2. Mount it to your preferred path (e.g. /api/artisans/search)
app.use('/api/artisans/search', searchRoutes);
```

## How to Test Independently
If someone else is occupying `server.js`, you can test the database search logic entirely independently by running:

```bash
node test-search.js
```

This boots up a separate instance on port `5001`!

## Important Note on the Database Schema!
To make `search.js` work seamlessly with the frontend profile logic, we wrote the search SQL query expecting the `artisans` table to have `hourly_rate` (which serves as the "price") and `skill` (a string) fields. If you run the SQL `schema.sql`, please make sure to **ADD** these columns to the `artisans` table!

