// import { UserInfo } from 'firebase/auth';
import { create } from "zustand";

interface ForgetStore {
  isForgotten: boolean;
  setForget: (value: boolean) => void;
}

export const useForgetStore = create<ForgetStore>((set) => ({
  isForgotten: false,
  setForget: (value: boolean) => set({ isForgotten: value }),
}));

interface navbarStore {
  isNavbar: boolean;
  setNavbar: (value: boolean) => void;
}

export const useNavbarStore = create<navbarStore>((set) => ({
  isNavbar: false,
  setNavbar: (value: boolean) => set({ isNavbar: value }),
}));

interface TabContentStore {
  isPopular: boolean;
  setPopular: (value: boolean) => void;
}

export const useTabContentStore = create<TabContentStore>((set) => ({
  isPopular: false,
  setPopular: (value: boolean) => set({ isPopular: value }),
}));

export interface userLogin {
  user: string;
  email: string;
  role: string;
  roles: string[];
  fullName: string;
  image: string;
  id: number;
}

interface UserStore {
  user: userLogin | null;
  setUser: (user: userLogin | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

interface userGGLogin {
  user_id: string;
  email: string;
  name: string;
  picture: string;
}
interface UserGGStore {
  userGG: userGGLogin | null;
  setUserGG: (user: userGGLogin | null) => void;
}

export const useUserGGStore = create<UserGGStore>((set) => ({
  userGG: null,
  setUserGG: (userGG) => set({ userGG }),
}));

type ButtonNavRefStore = {
  buttonNavRef: React.RefObject<HTMLButtonElement> | null;
  setButtonNavRef: (ref: React.RefObject<HTMLButtonElement>) => void;
};

export const useButtonNavRefStore = create<ButtonNavRefStore>((set) => ({
  buttonNavRef: null,
  setButtonNavRef: (ref) => set({ buttonNavRef: ref }),
}));
