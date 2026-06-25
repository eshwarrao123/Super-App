import { create } from "zustand";

export const useStore = create((set) => ({
    user: {
        name: "",
        username: "",
        email: "",
        mobile: "",
    },
    categories: [],
    notes: localStorage.getItem("super_app_notes") || "",

    setUser: (userData) => set({ user: userData }),
    setCategories: (categoryArray) => set({ categories: categoryArray }),
    setNotes: (noteText) => {
        localStorage.setItem("super_app_notes", noteText);
        set({ notes: noteText });
    },
    resetStore: () => set({
        user: { name: "", username: "", email: "", mobile: "" },
        categories: [],
        notes: ""
    })
}));