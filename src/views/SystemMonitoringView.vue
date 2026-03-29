<template>
  <div class="system-monitoring-view">
    <div class="page-title">
      <i class="fas fa-desktop"></i>
      系统监控管理
    </div>
    <div class="mb-4">
      <button class="btn btn-primary" @click="refreshData">
        <i class="fas fa-sync-alt mr-2"></i>
        刷新数据
      </button>
      <button class="btn btn-success" @click="clearAlerts">
        <i class="fas fa-bell-slash mr-2"></i>
        清除告警
      </button>
      <button class="btn btn-warning" @click="exportLogs">
        <i class="fas fa-download mr-2"></i>
        导出日志
      </button>
    </div>
    
    <!-- 系统状态概览 -->
    <div class="row mb-4">
      <div class="col-md-3">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-server"></i>
          </div>
          <div class="stat-value">100%</div>
          <div class="stat-label">系统运行状态</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-memory"></i>
          </div>
          <div class="stat-value">65%</div>
          <div class="stat-label">内存使用率</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-hard-drive"></i>
          </div>
          <div class="stat-value">45%</div>
          <div class="stat-label">磁盘使用率</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <div class="stat-value">3</div>
          <div class="stat-label">未处理告警</div>
        </div>
      </div>
    </div>
    
    <!-- 系统资源监控 -->
    <div class="card mb-4">
      <div class="card-header">
        <i class="fas fa-chart-line mr-2"></i>
        系统资源监控
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <div style="height: 300px;">
              <canvas id="cpu-memory-chart"></canvas>
            </div>
          </div>
          <div class="col-md-6">
            <div style="height: 300px;">
              <canvas id="disk-network-chart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 系统日志 -->
    <div class="card mb-4">
      <div class="card-header">
        <i class="fas fa-file-alt mr-2"></i>
        系统日志
      </div>
      <div class="card-body">
        <div class="row mb-4">
          <div class="col-md-4">
            <div class="form-group">
              <label>日志级别</label>
              <select class="form-select">
                <option value="all">所有级别</option>
                <option value="info">信息</option>
                <option value="warning">警告</option>
                <option value="error">错误</option>
              </select>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label>时间范围</label>
              <select class="form-select">
                <option value="1h">最近1小时</option>
                <option value="24h">最近24小时</option>
                <option value="7d">最近7天</option>
              </select>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label>搜索日志</label>
              <div class="input-group">
                <input type="text" class="form-control" placeholder="输入关键词">
                <div class="input-group-append">
                  <button class="btn btn-primary">
                    <i class="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>时间</th>
                <th>级别</th>
                <th>模块</th>
                <th>消息</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="log in systemLogs" :key="log.id">
                <td>{{ log.time }}</td>
                <td>
                  <span :class="['status-badge', getLogLevelClass(log.level)]">
                    {{ log.level }}
                  </span>
                </td>
                <td>{{ log.module }}</td>
                <td>{{ log.message }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <!-- 告警管理 -->
    <div class="card mb-4">
      <div class="card-header">
        <i class="fas fa-bell mr-2"></i>
        告警管理
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>时间</th>
                <th>级别</th>
                <th>告警类型</th>
                <th>告警信息</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="alert in systemAlerts" :key="alert.id">
                <td>{{ alert.time }}</td>
                <td>
                  <span :class="['status-badge', getAlertLevelClass(alert.level)]">
                    {{ alert.level }}
                  </span>
                </td>
                <td>{{ alert.type }}</td>
                <td>{{ alert.message }}</td>
                <td>
                  <span :class="['status-badge', alert.status === 'unhandled' ? 'status-danger' : 'status-success']">
                    {{ alert.statusText }}
                  </span>
                </td>
                <td>
                  <button class="btn btn-sm btn-primary" @click="handleAlert(alert)">
                    <i class="fas fa-check"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

// 系统日志数据
const systemLogs = ref([
  {
    id: 1,
    time: '2024-01-19 10:00:00',
    level: 'info',
    module: '系统',
    message: '系统启动成功'
  },
  {
    id: 2,
    time: '2024-01-19 09:30:00',
    level: 'warning',
    module: '设备',
    message: '制冷设备A温度异常'
  },
  {
    id: 3,
    time: '2024-01-19 09:00:00',
    level: 'error',
    module: '数据库',
    message: '数据库连接失败'
  }
])

// 系统告警数据
const systemAlerts = ref([
  {
    id: 1,
    time: '2024-01-19 10:30:00',
    level: 'error',
    type: '设备告警',
    message: '服务器B CPU利用率过高',
    status: 'unhandled',
    statusText: '未处理'
  },
  {
    id: 2,
    time: '2024-01-19 10:15:00',
    level: 'warning',
    type: '设备告警',
    message: '制冷设备A温度异常',
    status: 'unhandled',
    statusText: '未处理'
  },
  {
    id: 3,
    time: '2024-01-19 10:00:00',
    level: 'info',
    type: '系统告警',
    message: '系统备份完成',
    status: 'handled',
    statusText: '已处理'
  }
])

// 图表实例
let cpuMemoryChart = null
let diskNetworkChart = null

// 获取日志级别样式类
const getLogLevelClass = (level) => {
  switch (level) {
    case 'info': return 'status-info'
    case 'warning': return 'status-warning'
    case 'error': return 'status-danger'
    default: return 'status-info'
  }
}

// 获取告警级别样式类
const getAlertLevelClass = (level) => {
  switch (level) {
    case 'info': return 'status-info'
    case 'warning': return 'status-warning'
    case 'error': return 'status-danger'
    default: return 'status-info'
  }
}

// 初始化CPU内存图表
const initCpuMemoryChart = () => {
  const ctx = document.getElementById('cpu-memory-chart')
  if (ctx && typeof Chart !== 'undefined') {
    cpuMemoryChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00'],
        datasets: [
          {
            label: 'CPU利用率 (%)',
            data: [40, 45, 42, 50, 60, 65],
            borderColor: '#ea4335',
            backgroundColor: 'rgba(234, 67, 53, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: '内存使用率 (%)',
            data: [60, 62, 63, 64, 65, 66],
            borderColor: '#1a73e8',
            backgroundColor: 'rgba(26, 115, 232, 0.1)',
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    })
  }
}

// 初始化磁盘网络图表
const initDiskNetworkChart = () => {
  const ctx = document.getElementById('disk-network-chart')
  if (ctx && typeof Chart !== 'undefined') {
    diskNetworkChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00'],
        datasets: [
          {
            label: '磁盘使用率 (%)',
            data: [40, 41, 42, 43, 44, 45],
            borderColor: '#fbbc05',
            backgroundColor: 'rgba(251, 188, 5, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: '网络流量 (MB/s)',
            data: [10, 15, 12, 20, 25, 30],
            borderColor: '#34a853',
            backgroundColor: 'rgba(52, 168, 83, 0.1)',
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
  }
}

// 刷新数据
const refreshData = () => {
  console.log('刷新数据')
  // 这里可以添加刷新数据的逻辑
}

// 清除告警
const clearAlerts = () => {
  console.log('清除告警')
  // 这里可以添加清除告警的逻辑
}

// 导出日志
const exportLogs = () => {
  console.log('导出日志')
  // 这里可以添加导出日志的逻辑
}

// 处理告警
const handleAlert = (alert) => {
  console.log('处理告警:', alert)
  // 这里可以添加处理告警的逻辑
}

// 组件挂载后初始化图表
onMounted(() => {
  initCpuMemoryChart()
  initDiskNetworkChart()
})
</script>

<style scoped>
/* 状态标签样式 */
.status-badge {
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  display: inline-block;
}

.status-success {
  background-color: rgba(52, 168, 83, 0.1);
  color: #34a853;
}

.status-warning {
  background-color: rgba(251, 188, 5, 0.1);
  color: #fbbc05;
}

.status-danger {
  background-color: rgba(234, 67, 53, 0.1);
  color: #ea4335;
}

.status-info {
  background-color: rgba(26, 115, 232, 0.1);
  color: #1a73e8;
}
</style>