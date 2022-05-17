import { createContext, useState, useEffect, useContext } from 'react';
import axios from '../axios';
const NO_USER = { profile: {}, isAuth: false };

const UserContext = createContext();

const UserProvider = ({ children, value: initUser }) => {
  // console.log('initUser', initUser);

  const [user, setUser] = useState(() =>
    initUser?._id ? { profile: { ...initUser }, isAuth: true } : NO_USER,
  );

  const getProfile = async () => {
    try {
      const { data } = await axios.get('/user/profile');
      console.log(data);
      setUser({ profile: data.user, isAuth: true });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(getProfile, []);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post('/auth/login', {
        email,
        password,
      });
      console.log(data);
      setUser({ profile: data.user, isAuth: true });
    } catch (err) {
      throw err;
    }
  };
  const register = async (user) => {
    try {
      const { data } = await axios.post('/user/new', user);
      setUser({ profile: data.user, isAuth: true });
    } catch (err) {
      throw err;
    }
  };
  const logout = async () => {
    try {
      await axios.get('/auth/logout');
      setUser({ ...NO_USER });
    } catch (err) {
      throw err;
    }
  };
  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

function useUserContext() {
  return useContext(UserContext);
}

export { UserContext, UserProvider, useUserContext };
