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
      organizationName: "Your Organization",
      organizationWebsite: "",
      defaultIssuerName: "Admin",
      contactEmail: "admin@organization.com",
      setSettings: (settings) => set((state) => ({ ...state, ...settings })),
    }),
    {
      name: 'credledger-settings', // name of the item in the storage (must be unique)
    }
  )
);
