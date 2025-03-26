export function determineArtifactType(
  artifact: string,
  searchArtifact: (artifact: string, type: string) => void
) {
  const trimmed = artifact.trim(); // <-- Trim whitespace

  const ipRegex =
    /((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(([a-fA-F0-9]{1,4}:){1,7}[a-fA-F0-9]{1,4}|::|([a-fA-F0-9]{1,4})?::([a-fA-F0-9]{1,4}:?){0,6}[a-fA-F0-9]{1,4})/;
  const hashRegex = /[a-fA-F0-9]{32,64}$/i;
  const urlRegex =
    /(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?/i;

  if (ipRegex.test(trimmed)) {
    console.debug("Artifact type: IP Address");
    searchArtifact(trimmed, "IP");
  } else if (hashRegex.test(trimmed)) {
    console.debug("Artifact type: Hash");
    searchArtifact(trimmed, "Hash");
  } else if (urlRegex.test(trimmed)) {
    console.debug("Artifact type: Domain");
    searchArtifact(trimmed, "Domain");
  } else {
    console.debug("Artifact type: Unknown");
    throw new Error("Invalid artifact");
  }
}


export function getEndpoint(type: string): string {
  switch (type) {
    case "IP":
      return "/api/ip";
    case "Hash":
      return "/api/hash";
    case "Domain":
      return "/api/domain";
    default:
      throw new Error("Unknown artifact type");
  }
}

export async function fetchArtifactData(
  trimmed: string,
  type: string
): Promise<string> {
  const endpoint = getEndpoint(type);

  const baseURL =
    window.location.origin === "https://osint.lukealbertson.com"
      ? "https://osint.carsonww.com"
      : "https://osint.carsonww.com"; // SWITCHED FOR DEVELOPMENT window.location.origin;

  const response = await fetch(`${baseURL}${endpoint}?artifact=${trimmed}`);
  console.debug(response);
  if (!response.ok) {
    throw new Error("Error fetching data");
  }

  return await response.text();
}
