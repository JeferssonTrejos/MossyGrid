import { ref, onMounted } from 'vue';

export function useTheme() {
  const isDarkMode = ref(false);

  const applyTheme = (theme) => {
    const root = document.documentElement;
    isDarkMode.value = (theme === 'dark');

    if (theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }

    localStorage.setItem('mossy-theme', theme);
  };

  const toggleTheme = () => {
    const newTheme = isDarkMode.value ? 'light' : 'dark';
    applyTheme(newTheme);
  };

  onMounted(() => {
    const savedTheme = localStorage.getItem('mossy-theme');
    
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const themeToApply = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    applyTheme(themeToApply);
  });

  return { isDarkMode, toggleTheme };
}