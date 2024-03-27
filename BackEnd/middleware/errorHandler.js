export function errorHandler(err, req, res, next) {
  // Log the error
  console.error(err);

  // Send an appropriate error response
  res.status(500).json({ error: 'An unexpected error occurred' });
}