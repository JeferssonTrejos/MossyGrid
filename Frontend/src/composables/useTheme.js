import { ref, onMounted } from 'vue';

export function useTheme() {
    const isDarkMode = ref(false);

    const applyTheme = (theme) => {
        const root = document.documentElement;
        root.setAttribute('data-theme', theme);
        
        // 💡 Sincronizamos con Tailwind
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        localStorage.setItem('mossy-theme', theme);
    };
    const toggleTheme = () => {
        isDarkMode.value = !isDarkMode.value;
        applyTheme(isDarkMode.value ? 'dark' : 'light');
    };

    onMounted(() => {
        const savedTheme = localStorage.getItem('mossy-theme') || 'light';
        isDarkMode.value = savedTheme === 'dark';
        applyTheme(savedTheme);
    });

    return { isDarkMode, toggleTheme };
}
