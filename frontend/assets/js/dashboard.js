function statusBadgeClass(status) {
  if (status === "Running") {
    return "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
  }
  if (status === "CrashLoopBackOff") {
    return "bg-rose-500/20 text-rose-300 border border-rose-500/30";
  }
  return "bg-amber-500/20 text-amber-300 border border-amber-500/30";
}

function renderPods() {
  const tableBody = document.getElementById("pods-table-body");
  const sourceBadge = document.getElementById("source-badge");
  const generatedAt = document.getElementById("generated-at");
  const errorBox = document.getElementById("error-box");
  const totalPods = document.getElementById("total-pods");
  const healthyPods = document.getElementById("healthy-pods");
  const unhealthyPods = document.getElementById("unhealthy-pods");

  sourceBadge.textContent = `Source: ${appState.source}`;
  generatedAt.textContent = appState.generatedAt
    ? `Updated: ${new Date(appState.generatedAt).toLocaleString()}`
    : "Updated: -";

  if (appState.error) {
    errorBox.classList.remove("hidden");
    errorBox.textContent = appState.error;
    tableBody.innerHTML = "";
    totalPods.textContent = "0";
    healthyPods.textContent = "0";
    unhealthyPods.textContent = "0";
    return;
  }

  errorBox.classList.add("hidden");

  const healthyCount = appState.pods.filter((p) => p.status === "Running").length;
  const unhealthyCount = appState.pods.length - healthyCount;

  totalPods.textContent = String(appState.pods.length);
  healthyPods.textContent = String(healthyCount);
  unhealthyPods.textContent = String(unhealthyCount);

  tableBody.innerHTML = appState.pods
    .map(
      (pod) => `
        <tr class="border-b border-slate-800/80 hover:bg-slate-800/50">
          <td class="px-4 py-3 font-medium text-slate-100">${pod.name}</td>
          <td class="px-4 py-3">
            <span class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusBadgeClass(pod.status)}">
              ${pod.status}
            </span>
          </td>
          <td class="px-4 py-3 text-slate-300">${pod.restart_count}</td>
          <td class="px-4 py-3 text-slate-300">${pod.age}</td>
        </tr>
      `
    )
    .join("");
}

async function loadDashboardData() {
  try {
    const payload = await fetchWorkloads();
    appState.source = payload.source ?? "unknown";
    appState.generatedAt = payload.generated_at ?? "";
    appState.pods = payload.data?.pods ?? [];
    appState.error = "";
  } catch (error) {
    appState.error = `Unable to load workloads: ${error.message}`;
  }

  renderPods();
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadDashboardData();
  setInterval(loadDashboardData, 15000);
});
