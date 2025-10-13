export async function GET(req) {
  // This endpoint returns user data that will be displayed in the plugin
  const userData2 = {
    firstName: "john",
    lastName: "Doe",
    email: "john.doe@example.com",
    // phone: "+1 (555) 123-4567",
    // company: "Acme Corporation",
    // position: null
  };

  return new Response(JSON.stringify(userData2), {
    status: 200,
    headers: { 
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS(req) {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

