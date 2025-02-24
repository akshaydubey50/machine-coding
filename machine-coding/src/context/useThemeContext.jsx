// context/useThemeContext.jsx
import { useContext, createContext, useState, useEffect } from "react";

export const ThemeContext = createContext(null);

export const ThemeContextProvider = ({ children }) => {
    const [isReady, setIsReady] = useState(false);
    
    // Check system preference initially
    const getInitialTheme = () => {
        // Check localStorage first
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            return savedTheme;
        }
        
        // If no saved preference, check system preference
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return "dark";
        }
        
        return "light"; // default to light
    };

    const [theme, setTheme] = useState(getInitialTheme);

    // Handle theme changes
    useEffect(() => {
        // Remove both classes first to ensure clean state
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.remove("light");
        
        // Add the current theme class
        document.documentElement.classList.add(theme);
        
        // Save to localStorage
        localStorage.setItem("theme", theme);
        
        // Mark as ready
        setIsReady(true);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {isReady ? children : <span>Loading theme...</span>}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useThemeContext must be used within a ThemeContextProvider");
    }
    return context;
};