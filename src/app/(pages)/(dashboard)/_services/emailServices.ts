export const fetchEmails = async (accessToken: string, userEmail: string) => {
  //TODO: update URL to .env route
  const res = await fetch("http://localhost:8000/api/gmail/fetch-emails/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ email: userEmail }),
  });

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  return res.json();
};
