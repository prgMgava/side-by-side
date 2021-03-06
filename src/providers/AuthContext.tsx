import {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
  Dispatch
} from "react";
import { api } from "../services/api";
import jwt_decode from "jwt-decode";
import { User } from "../types/userData";
import { AxiosResponse } from "axios";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthState {
  accessToken: string;
  id: () => string; 
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  id: () => string;
  accessToken: string;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  getUser: () => void;
  userData: User;
  setData: Dispatch<React.SetStateAction<AuthState>>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [data, setData] = useState<AuthState>(() => {
    const accessToken = localStorage.getItem("@SideBySide:accessToken");
    const id = localStorage.getItem("@SideBySide:id");
    if (accessToken && id) {
      return { accessToken, id: JSON.parse(id) };
    }
    return {} as AuthState;
  });
  const [userData, setUserData] = useState({} as User);
  const signIn = useCallback(
    async (
      { email, password }: SignInCredentials
    ) => {
      const response = await api.post("/login", { email, password });
      
      const { accessToken } = response.data;
      const { sub: id } = jwt_decode<string>(accessToken);
      localStorage.setItem("@SideBySide:accessToken", accessToken);
      localStorage.setItem("@SideBySide:id", JSON.stringify(id));
      setData({ accessToken, id });
    },
    []
  );

  const signOut = useCallback(() => {
    localStorage.removeItem("@SideBySide:accessToken");
    localStorage.removeItem("@SideBySide:id");

    setData({} as AuthContextData);
  }, []);

  const getUser = () => {
    api
      .get(`/users/${data.id}`, {
        headers: { Authorization: `Bearer ${data.accessToken}` },
      })
      .then((response: AxiosResponse<User>) => setUserData(response.data))
      .catch((err) => console.log(err));
  };
  return (
    <AuthContext.Provider
      value={{
        id: data.id,
        accessToken: data.accessToken,
        signIn,
        signOut,
        getUser,
        userData,
        setData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { useAuth, AuthProvider };
