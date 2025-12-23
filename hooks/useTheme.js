// composables/useTheme.js
import { ref, computed, watch, onMounted } from 'vue'

// 预设主题色（可扩展更多）
const DEFAULT_THEMES = {
    primary: '#409EFF', // 默认蓝色
    secondary: '#67C23A', // 默认绿色
}

export function useTheme() {
    // 1. 响应式存储当前主题色（优先从本地存储读取）
    const theme = ref({})

    // 2. 初始化：读取本地存储 + 合并默认值
    onMounted(() => {
        const savedTheme = localStorage.getItem('app-theme')
        theme.value = savedTheme ? JSON.parse(savedTheme) : DEFAULT_THEMES
        // 初始化时同步 CSS 变量
        syncCssVars(theme.value)
    })

    // 3. 计算属性：简化获取单个主题色（可选）
    const primaryColor = computed(() => theme.value.primary)
    const secondaryColor = computed(() => theme.value.secondary)

    // 4. 切换主题色的方法（支持单个/批量修改）
    const setTheme = (newTheme) => {
        theme.value = { ...theme.value, ...newTheme }
    }

    // 5. 重置为默认主题
    const resetTheme = () => {
        theme.value = { ...DEFAULT_THEMES }
    }

    // 6. 同步主题色到 CSS 变量（核心：让样式响应变化）
    function syncCssVars(themeObj) {
        Object.entries(themeObj).forEach(([key, value]) => {
            document.documentElement.style.setProperty(`--${key}-color`, value)
        })
    }

    // 7. 监听主题变化：自动同步 CSS 变量 + 持久化到本地存储
    watch(
        theme,
        (newTheme) => {
            syncCssVars(newTheme)
            localStorage.setItem('app-theme', JSON.stringify(newTheme))
        },
        { deep: true } // 深度监听对象变化
    )

    // 暴露给外部的方法/状态
    return {
        theme, // 完整主题对象
        primaryColor, // 主色（快捷访问）
        secondaryColor, // 辅助色（快捷访问）
        setTheme, // 修改主题色
        resetTheme // 重置主题
    }
}