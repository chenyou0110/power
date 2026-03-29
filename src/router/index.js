import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/device-basic',
      name: 'device-basic',
      component: () => import('../views/DeviceBasicView.vue')
    },
    {
      path: '/device-status',
      name: 'device-status',
      component: () => import('../views/DeviceStatusView.vue')
    },
    {
      path: '/microgrid-equipment',
      name: 'microgrid-equipment',
      component: () => import('../views/MicrogridEquipmentView.vue')
    },
    {
      path: '/data-processing',
      name: 'data-processing',
      component: () => import('../views/DataProcessingView.vue')
    },
    {
      path: '/model-management',
      name: 'model-management',
      component: () => import('../views/ModelManagementView.vue')
    },
    {
      path: '/forecast-execution',
      name: 'forecast-execution',
      component: () => import('../views/ForecastExecutionView.vue')
    },
    {
      path: '/dispatch-strategy',
      name: 'dispatch-strategy',
      component: () => import('../views/DispatchStrategyView.vue')
    },
    {
      path: '/task-dispatch',
      name: 'task-dispatch',
      component: () => import('../views/TaskDispatchView.vue')
    },
    {
      path: '/potential-analysis',
      name: 'potential-analysis',
      component: () => import('../views/PotentialAnalysisView.vue')
    },
    {
      path: '/user-permission',
      name: 'user-permission',
      component: () => import('../views/UserPermissionView.vue')
    },
    {
      path: '/system-monitoring',
      name: 'system-monitoring',
      component: () => import('../views/SystemMonitoringView.vue')
    },
    {
      path: '/data-center',
      name: 'data-center',
      component: () => import('../views/DataCenterView.vue')
    }
  ]
})

export default router