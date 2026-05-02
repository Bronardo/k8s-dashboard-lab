const API_BASE_URL = "http://localhost:8002";

async function fetchWorkloads() {
  const response = await fetch(`${API_BASE_URL}/api/v1/dashboard/workloads`, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json();
}
