export async function GET() {
  return Response.json({ status: 'Healthy', timestamp: new Date().toISOString() })
}