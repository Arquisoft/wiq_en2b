import AuthManager from "../components/auth/AuthManager";

describe("AuthManager", () => {
  let authManager;

  beforeEach(() => {
    authManager = new AuthManager();
  });

  afterEach(() => {
    // Limpiar el localStorage después de cada prueba
    localStorage.clear();
  });

  test("Instancia única", () => {
    const authManager2 = new AuthManager();
    expect(authManager).toBe(authManager2);
  });

  test("Iniciar sesión correctamente", () => {
    authManager.setLoggedIn(true);
    expect(authManager.isLoggedIn()).toBe(true);
  });

  test("Cerrar sesión correctamente", () => {
    authManager.setLoggedIn(true);
    authManager.setLoggedIn(false);
    expect(authManager.isLoggedIn()).toBe(false);
  });

  test("Configuración de encabezados de autorización", () => {
    localStorage.setItem("accessToken", "fakeAccessToken");
    authManager.setLoggedIn(true);
    const axiosInstance = authManager.getAxiosInstance();
    expect(axiosInstance.defaults.headers.common["Authorization"]).toBe(
      "Bearer fakeAccessToken"
    );
  });

  test("Eliminar encabezados de autorización al cerrar sesión", () => {
    localStorage.setItem("accessToken", "fakeAccessToken");
    authManager.setLoggedIn(true);
    authManager.setLoggedIn(false);
    const axiosInstance = authManager.getAxiosInstance();
    expect(axiosInstance.defaults.headers.common["Authorization"]).toBe(
      undefined
    );
  });
});
