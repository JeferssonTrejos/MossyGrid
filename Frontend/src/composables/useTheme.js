import { ref, onMounted } from 'vue';

export function useTheme() {
    const isDarkMode = ref(false);

    const applyTheme = (theme) => {
        const root = document.documentElement;

        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        root.setAttribute('data-theme', theme);

        localStorage.setItem('mossy-theme', theme);
    };

    const toggleTheme = () => {
        isDarkMode.value = !isDarkMode.value;
        const newTheme = isDarkMode.value ? 'dark' : 'light';
        applyTheme(newTheme);
    };

    onMounted(() => {
        const savedTheme = localStorage.getItem('mossy-theme') || 'light';
        isDarkMode.value = savedTheme === 'dark';
        applyTheme(savedTheme);
    });

    return { isDarkMode, toggleTheme };
}