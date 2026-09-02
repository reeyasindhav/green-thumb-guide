import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, tasks as seedTasks, type Product } from "./data";

const AUTH_KEY = "cropwise.session";
const CART_KEY = "cropwise.cart";
const TASK_KEY = "cropwise.tasks";

export type SessionUser = {
  name: string;
  email: string;
  initials: string;
  city: string;
  plan: string;
};

type CartLine = { id: string; qty: number };

type Store = {
  hydrated: boolean;
  user: SessionUser | null;
  signIn: (email: string, name?: string) => void;
  signOut: () => void;
  cart: CartLine[];
  cartCount: number;
  cartTotal: number;
  cartLines: Array<{ product: Product; qty: number }>;
  addToCart: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateProfile: (patch: Partial<Pick<SessionUser, "name" | "city">>) => void;
  doneTasks: string[];
  toggleTask: (id: string) => void;
  todayProgress: number;
};

const StoreContext = createContext<Store | null>(null);

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [user, setUser] = useState<SessionUser | null>(null);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [doneTasks, setDoneTasks] = useState<string[]>([]);

  useEffect(() => {
    setUser(read<SessionUser | null>(AUTH_KEY, null));
    setCart(read<CartLine[]>(CART_KEY, []));
    setDoneTasks(read<string[]>(TASK_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem(TASK_KEY, JSON.stringify(doneTasks));
  }, [doneTasks, hydrated]);

  const signIn = useCallback((email: string, name?: string) => {
    const resolved = name?.trim() || email.split("@")[0] || "Gardener";
    const pretty = resolved
      .replace(/[._-]+/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .trim();
    const next: SessionUser = {
      name: pretty,
      email,
      initials: initialsOf(pretty) || "CG",
      city: "Portland, OR",
      plan: "Grower",
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(next));
    setUser(next);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
  }, []);

  const addToCart = useCallback((id: string, qty = 1) => {
    setCart((prev) => {
      const found = prev.find((l) => l.id === id);
      if (found) return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { id, qty }];
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setCart((prev) =>
      qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
    );
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const updateProfile = useCallback((patch: Partial<Pick<SessionUser, "name" | "city">>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const name = patch.name?.trim() || prev.name;
      const next: SessionUser = {
        ...prev,
        ...patch,
        name,
        initials: initialsOf(name) || prev.initials,
      };
      localStorage.setItem(AUTH_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const toggleTask = useCallback((id: string) => {
    setDoneTasks((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));
  }, []);

  const cartLines = useMemo(
    () =>
      cart
        .map((line) => {
          const product = products.find((p) => p.id === line.id);
          return product ? { product, qty: line.qty } : null;
        })
        .filter((l): l is { product: Product; qty: number } => l !== null),
    [cart],
  );

  const value = useMemo<Store>(() => {
    const todaysTasks = seedTasks.filter((t) => t.day === 1);
    const completed = todaysTasks.filter((t) => doneTasks.includes(t.id)).length;
    return {
      hydrated,
      user,
      signIn,
      signOut,
      cart,
      cartLines,
      cartCount: cart.reduce((n, l) => n + l.qty, 0),
      cartTotal: cartLines.reduce((n, l) => n + l.product.price * l.qty, 0),
      addToCart,
      setQty,
      removeFromCart,
      clearCart,
      updateProfile,
      doneTasks,
      toggleTask,
      todayProgress: todaysTasks.length ? Math.round((completed / todaysTasks.length) * 100) : 0,
    };
  }, [hydrated, user, signIn, signOut, cart, cartLines, addToCart, setQty, removeFromCart, clearCart, updateProfile, doneTasks, toggleTask]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    return {
      hydrated: false,
      user: null,
      signIn: () => {},
      signOut: () => {},
      cart: [],
      cartLines: [],
      cartCount: 0,
      cartTotal: 0,
      addToCart: () => {},
      setQty: () => {},
      removeFromCart: () => {},
      clearCart: () => {},
      updateProfile: () => {},
      doneTasks: [],
      toggleTask: () => {},
      todayProgress: 0,
    } satisfies Store;
  }
  return ctx;
}
