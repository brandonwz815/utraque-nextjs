export async function GET(request: Request) {
  return new Response('Hello, Next.js!');
}

export async function POST(request: Request) {
  const body = await request.json()
  console.log(body)

  // return new Response('OK');
  return new Response(JSON.stringify({hello:'world'}));
}
