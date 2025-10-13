import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//import { useLocation } from 'react-router-dom';

// https://vite.dev/config/
export default defineConfig(()=>{
  //const currentURL = useLocation().search
  return {
    plugins: [
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler']],
        },
      }),
    ],
    base:"./",
  }
})
