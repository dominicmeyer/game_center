import { configDefaults, defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, 'packages/template/*'],
    include: ["tests/unit/**/*"],
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
})