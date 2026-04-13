import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/chinaCourse/',   // ← مهم جدًا: اسم الريبو بالضبط (مع الـ slash في النهاية)
})