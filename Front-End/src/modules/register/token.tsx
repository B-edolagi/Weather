// api.ts
export const getToken = async (): Promise<string | null> => {
  const requestOptions = {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({ username: "lol", password: "123" }),
  };

  try {
    const response = await fetch("http://localhost:8080/auth", requestOptions);
    const data = await response.json();
    if (data.token) {
      return data.token;
    } else {
      console.error("Токен не найден в ответе.");
      return null;
    }
  } catch (error) {
    console.error("Произошла ошибка:", error);
    return null;
  }
};
