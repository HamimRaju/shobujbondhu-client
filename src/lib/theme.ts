export const THEME_STORAGE_KEY = "sb-theme";

/**
 * Runs before first paint (inlined in <head>) so the saved or system theme
 * is applied without a flash. Falls back to the OS preference.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}var d=document.documentElement;d.dataset.theme=t;d.style.colorScheme=t}catch(e){}})();`;
