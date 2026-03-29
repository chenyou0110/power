<template>
  <div class="app">
    <!-- 侧边栏导航 -->
    <div class="sidebar" :class="{ collapsed: isSidebarCollapsed }" id="sidebar">
      <div class="sidebar-header">
        <span class="logo-text">电力调度平台</span>
        <button class="sidebar-toggle" id="sidebar-toggle" @click="toggleSidebar">
          <i class="fas" :class="isSidebarCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'"></i>
        </button>
      </div>
      <ul class="sidebar-menu">
        <li>
          <router-link to="/" class="menu-link" data-target="dashboard">
            <i class="fas fa-home menu-icon"></i>
            <span class="menu-text">平台首页</span>
          </router-link>
        </li>
        <li>
          <a href="#" class="menu-link with-submenu" @click.prevent="toggleSubmenu($event)">
            <i class="fas fa-server menu-icon"></i>
            <span class="menu-text">数据中心设备管理</span>
            <i class="fas fa-chevron-down submenu-toggle" :class="{ rotated: openSubmenu === 'data-center' }"></i>
          </a>
          <ul class="submenu" :class="{ show: openSubmenu === 'data-center' }">
            <li>
              <router-link to="/device-basic" class="menu-link" data-target="device-basic">
                <i class="fas fa-cog menu-icon"></i>
                <span class="menu-text">设备基础管理</span>
              </router-link>
            </li>
            <li>
              <router-link to="/device-status" class="menu-link" data-target="device-status">
                <i class="fas fa-heartbeat menu-icon"></i>
                <span class="menu-text">设备状态监控</span>
              </router-link>
            </li>
            <li>
              <router-link to="/microgrid-equipment" class="menu-link" data-target="microgrid-equipment">
                <i class="fas fa-network-wired menu-icon"></i>
                <span class="menu-text">微网设备管理</span>
              </router-link>
            </li>
          </ul>
        </li>
        <li>
          <a href="#" class="menu-link with-submenu" @click.prevent="toggleSubmenu($event)">
            <i class="fas fa-chart-line menu-icon"></i>
            <span class="menu-text">负荷预测管理</span>
            <i class="fas fa-chevron-down submenu-toggle" :class="{ rotated: openSubmenu === 'load-forecast' }"></i>
          </a>
          <ul class="submenu" :class="{ show: openSubmenu === 'load-forecast' }">
            <li>
              <router-link to="/data-processing" class="menu-link" data-target="data-processing">
                <i class="fas fa-database menu-icon"></i>
                <span class="menu-text">数据处理</span>
              </router-link>
            </li>
            <li>
              <router-link to="/model-management" class="menu-link" data-target="model-management">
                <i class="fas fa-brain menu-icon"></i>
                <span class="menu-text">模型管理</span>
              </router-link>
            </li>
            <li>
              <router-link to="/forecast-execution" class="menu-link" data-target="forecast-execution">
                <i class="fas fa-play-circle menu-icon"></i>
                <span class="menu-text">预测执行</span>
              </router-link>
            </li>
          </ul>
        </li>
        <li>
          <a href="#" class="menu-link with-submenu" @click.prevent="toggleSubmenu($event)">
            <i class="fas fa-bolt menu-icon"></i>
            <span class="menu-text">电力调度管理</span>
            <i class="fas fa-chevron-down submenu-toggle" :class="{ rotated: openSubmenu === 'power-dispatch' }"></i>
          </a>
          <ul class="submenu" :class="{ show: openSubmenu === 'power-dispatch' }">
            <li>
              <router-link to="/dispatch-strategy" class="menu-link" data-target="dispatch-strategy">
                <i class="fas fa-chess menu-icon"></i>
                <span class="menu-text">调度策略管理</span>
              </router-link>
            </li>
            <li>
              <router-link to="/task-dispatch" class="menu-link" data-target="task-dispatch">
                <i class="fas fa-tasks menu-icon"></i>
                <span class="menu-text">任务调度管理</span>
              </router-link>
            </li>
          </ul>
        </li>
        <li>
          <router-link to="/potential-analysis" class="menu-link" data-target="potential-analysis">
            <i class="fas fa-chart-bar menu-icon"></i>
            <span class="menu-text">潜力分析管理</span>
          </router-link>
        </li>
        <li>
          <a href="#" class="menu-link with-submenu" @click.prevent="toggleSubmenu($event)">
            <i class="fas fa-cogs menu-icon"></i>
            <span class="menu-text">系统管理</span>
            <i class="fas fa-chevron-down submenu-toggle" :class="{ rotated: openSubmenu === 'system-management' }"></i>
          </a>
          <ul class="submenu" :class="{ show: openSubmenu === 'system-management' }">
            <li>
              <router-link to="/user-permission" class="menu-link" data-target="user-permission">
                <i class="fas fa-users-cog menu-icon"></i>
                <span class="menu-text">用户权限管理</span>
              </router-link>
            </li>
            <li>
              <router-link to="/system-monitoring" class="menu-link" data-target="system-monitoring">
                <i class="fas fa-desktop menu-icon"></i>
                <span class="menu-text">系统监控管理</span>
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- 顶部导航栏 -->
      <div class="top-navbar">
        <div class="navbar-left">
          <h1 id="page-title">{{ pageTitle }}</h1>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item active" aria-current="page">{{ breadcrumb }}</li>
            </ol>
          </nav>
        </div>
        <div class="user-menu">
          <div class="user-avatar" @click="toggleUserDropdown">
            <i class="fas fa-user"></i>
          </div>
          <ul class="dropdown-menu dropdown-menu-end" :class="{ show: isUserDropdownOpen }">
            <li>
              <a class="dropdown-item" href="#">
                <i class="fas fa-user-circle mr-2"></i> 个人资料
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                <i class="fas fa-cog mr-2"></i> 系统设置
              </a>
            </li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li>
              <a class="dropdown-item" href="#">
                <i class="fas fa-sign-out-alt mr-2"></i> 退出登录
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- 页面内容 -->
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isSidebarCollapsed = ref(false)
const openSubmenu = ref(null)
const isUserDropdownOpen = ref(false)

// 监听路由变化，更新页面标题和面包屑
const pageTitle = computed(() => {
  const titles = {
    '/': '电力调度平台',
    '/device-basic': '设备基础管理',
    '/device-status': '设备状态监控',
    '/microgrid-equipment': '微网设备管理',
    '/data-processing': '数据处理',
    '/model-management': '模型管理',
    '/forecast-execution': '预测执行',
    '/dispatch-strategy': '调度策略管理',
    '/task-dispatch': '任务调度管理',
    '/potential-analysis': '潜力分析管理',
    '/user-permission': '用户权限管理',
    '/system-monitoring': '系统监控管理'
  }
  return titles[route.path] || '电力调度平台'
})

const breadcrumb = computed(() => {
  const breadcrumbs = {
    '/': '平台首页',
    '/device-basic': '设备基础管理',
    '/device-status': '设备状态监控',
    '/microgrid-equipment': '微网设备管理',
    '/data-processing': '数据处理',
    '/model-management': '模型管理',
    '/forecast-execution': '预测执行',
    '/dispatch-strategy': '调度策略管理',
    '/task-dispatch': '任务调度管理',
    '/potential-analysis': '潜力分析管理',
    '/user-permission': '用户权限管理',
    '/system-monitoring': '系统监控管理'
  }
  return breadcrumbs[route.path] || '平台首页'
})

// 切换侧边栏
const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

// 切换子菜单
const toggleSubmenu = (event) => {
  const target = event.currentTarget
  const submenuId = target.getAttribute('data-target') || target.parentElement.getAttribute('data-target') || 
    target.closest('li').getAttribute('data-target') || 
    target.closest('li').querySelector('a').getAttribute('data-target') ||
    target.textContent.trim().replace(/\s+/g, '-').toLowerCase()
  
  openSubmenu.value = openSubmenu.value === submenuId ? null : submenuId
}

// 切换用户下拉菜单
const toggleUserDropdown = () => {
  isUserDropdownOpen.value = !isUserDropdownOpen.value
}

// 点击其他地方关闭下拉菜单
const handleClickOutside = (event) => {
  if (!event.target.closest('.user-menu')) {
    isUserDropdownOpen.value = false
  }
}

// 添加点击事件监听器
window.addEventListener('click', handleClickOutside)

// 组件销毁时移除事件监听器
import { onUnmounted } from 'vue'
onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>