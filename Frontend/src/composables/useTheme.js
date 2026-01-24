import { ref, onMounted } from 'vue';

export function useTheme() {
    const isDarkMode = ref(false);

    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        // Forzamos el color del body por si acaso
        document.body.style.backgroundColor = theme === 'dark' ? '#1a1a1a' : '#f3f4f6';
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