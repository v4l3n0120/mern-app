import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import ViteSvgPlugin from 'vite-plugin-svg'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ViteSvgPlugin(), react()],
})
