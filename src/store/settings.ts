import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  organizationName: string;
  defaultIssuerName: string;
  contactEmail: string;
  setSettings: (settings: Partial<SettingsState>) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      organizationName: "Acme University",
      defaultIssuerName: "Admin",
      contactEmail: "admin@acme.edu",
      setSettings: (settings) => set((state) => ({ ...state, ...settings })),
    }),
    {
      name: 'credledger-settings', // name of the item in the storage (must be unique)
    }
  )
);
