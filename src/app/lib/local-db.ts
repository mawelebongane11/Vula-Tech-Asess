"use client"

import { User, Favourite } from './data-processor';

/**
 * Defensive storage wrapper to prevent state corruption.
 */
const STORAGE_KEYS = {
  USERS: 'vula_users_registry',
  FAVOURITES: 'vula_favs_registry',
};

export interface LocalDatabase {
  users: User[];
  favourites: Favourite[];
}

export const localDb = {
  saveData: (users: User[], favourites: Favourite[]) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      localStorage.setItem(STORAGE_KEYS.FAVOURITES, JSON.stringify(favourites));
    } catch (e) {
      console.error('Persistence failed:', e);
    }
  },

  loadData: (): LocalDatabase => {
    if (typeof window === 'undefined') return { users: [], favourites: [] };
    
    const parseJson = (key: string) => {
      try {
        const json = localStorage.getItem(key);
        if (!json || json === 'undefined' || json === 'null' || json.trim() === '') {
          return [];
        }
        const parsed = JSON.parse(json);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        return [];
      }
    };

    return {
      users: parseJson(STORAGE_KEYS.USERS),
      favourites: parseJson(STORAGE_KEYS.FAVOURITES),
    };
  },

  clearData: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.USERS);
    localStorage.removeItem(STORAGE_KEYS.FAVOURITES);
  }
};