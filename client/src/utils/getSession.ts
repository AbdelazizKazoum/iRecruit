export const fetchSession = async () => {
  const response = await fetch("/api/getSession");
  if (response.ok) {
    const session = await response.json();

    return session;
  } else {
  }
};
