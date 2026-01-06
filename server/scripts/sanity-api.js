const API_BASE = "http://localhost:3000";

async function fail(message) {
  console.error("❌ API SANITY CHECK FAILED:");
  console.error("   " + message);
  process.exit(1);
}

function ok(message) {
  console.log("✓", message);
}

async function run() {
  // ---- 1. health ----
  const healthRes = await fetch(`${API_BASE}/api/health`);
  if (!healthRes.ok) {
    await fail("Health endpoint not reachable");
  }
  ok("Health endpoint reachable");

  // ---- 2. page fetch ----
  const res = await fetch(`${API_BASE}/api/pages/home`);
  if (!res.ok) {
    await fail(`/api/pages/home returned ${res.status}`);
  }
  ok("Home page endpoint returned 200");

  // ---- 3. json ----
  let data;
  try {
    data = await res.json();
  } catch {
    await fail("Response is not valid JSON");
  }
  ok("Response is valid JSON");

  // ---- 4. contract ----
 if (!data.id || !data.slug) {
  await fail("Missing page identity fields");
}

if (!Array.isArray(data.sections)) {
  await fail("Missing or invalid `sections` array");
}

  if (!Array.isArray(data.sections)) {
    await fail("`sections` is not an array");
  }
  ok("Sections array exists");

  if (data.sections.length === 0) {
    await fail("No sections returned");
  }
  ok(`Sections count: ${data.sections.length}`);

  // ---- 5. blocks ----
  const sectionsWithoutBlocks = data.sections.filter(
    s => !Array.isArray(s.blocks) || s.blocks.length === 0
  );

  if (sectionsWithoutBlocks.length > 0) {
    await fail("One or more sections have no blocks");
  }
  ok("All sections have blocks");

  console.log("🎉 API sanity check passed");
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
