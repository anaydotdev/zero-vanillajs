import { Router } from '../src/router.js'

import '@tailwindplus/elements'; // registers all <el-*> components

import './main.css'

const router = new Router()
router.register('/', async () => {
  await import('../src/pages/home.ts')
  return 'home-page'
})
router.listen()
