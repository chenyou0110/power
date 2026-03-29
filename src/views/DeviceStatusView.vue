<template>
  <div class="device-status-view">
    <div class="page-title">
      <i class="fas fa-heartbeat"></i>
      设备状态监控
    </div>
    <div class="mb-4">
      <button class="btn btn-primary" @click="refreshData">
        <i class="fas fa-sync-alt mr-2"></i>
        刷新数据
      </button>
      <button class="btn btn-success" @click="pauseAlerts">
        <i class="fas fa-bell-slash mr-2"></i>
        暂停告警
      </button>
      <button class="btn btn-warning" @click="exportData">
        <i class="fas fa-download mr-2"></i>
        导出数据
      </button>
    </div>
    
    <!-- 设备状态概览 -->
    <div class="row mb-4">
      <div class="col-md-3">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-server"></i>
          </div>
          <div class="stat-value">50/50</div>
          <div class="stat-label">在线设备</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <div class="stat-value">2</div>
          <div class="stat-label">告警设备</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-power-off"></i>
          </div>
          <div class="stat-value">0</div>
          <div class="stat-label">离线设备</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-percentage"></i>
          </div>
          <div class="stat-value">96%</div>
          <div class="stat-label">设备在线率</div>
        </div>
      </div>
    </div>
    
    <!-- 实时状态监控 -->
    <div class="card mb-4">
      <div class="card-header">
        <i class="fas fa-chart-line mr-2"></i>
        实时状态监控
      </div>
      <div class="card-body">
        <div class="row mb-4">
          <div class="col-md-4">
            <div class="form-group">
              <label>选择设备</label>
              <select class="form-select" v-model="selectedDeviceType">
                <option value="all">全部设备</option>
                <option value="server">服务器</option>
                <option value="cooling">制冷设备</option>
                <option value="power">配电设备</option>
              </select>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label>时间范围</label>
              <select class="form-select" v-model="timeRange">
                <option value="1h">最近1小时</option>
                <option value="4h">最近4小时</option>
                <option value="24h">最近24小时</option>
              </select>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label>刷新间隔</label>
              <select class="form-select" v-model="refreshInterval">
                <option value="5s">5秒</option>
                <option value="15s">15秒</option>
                <option value="30s">30秒</option>
                <option value="60s">60秒</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div style="height: 300px;">
              <canvas id="realtime-device-status-chart"></canvas>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card">
              <div class="card-header">
                <i class="fas fa-bell mr-2"></i>
                实时告警信息
              </div>
              <div class="card-body">
                <ul class="list-unstyled">
                  <li v-for="alert in alerts" :key="alert.id" class="mb-3 p-2 border rounded" :style="{ backgroundColor: alert.level === 'danger' ? 'rgba(234, 67, 53, 0.1)' : 'rgba(251, 188, 5, 0.1)' }">
                    <div class="d-flex justify-content-between">
                      <span :class="['font-weight-bold', alert.level === 'danger' ? 'text-danger' : 'text-warning']">{{ alert.device }}</span>
                      <span class="text-sm">{{ alert.time }}</span>
                    </div>
                    <div class="text-sm">{{ alert.message }}</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 设备状态详情 -->
    <div class="card mb-4">
      <div class="card-header">
        <i class="fas fa-list-alt mr-2"></i>
        设备状态详情
      </div>
      <div class="card-body">
        <!-- 筛选功能 -->
        <div class="row mb-4">
          <div class="col-md-3">
            <div class="form-group">
              <label>数据中心</label>
              <select class="form-select" v-model="filterDataCenter">
                <option value="">全部数据中心</option>
                <option value="DC001">北区数据中心A</option>
                <option value="DC002">南区数据中心B</option>
                <option value="DC003">东区数据中心C</option>
                <option value="DC004">西区数据中心D</option>
                <option value="DC005">北区数据中心E</option>
                <option value="DC006">南区数据中心F</option>
                <option value="DC007">东区数据中心G</option>
                <option value="DC008">西区数据中心H</option>
                <option value="DC009">北区数据中心I</option>
                <option value="DC010">南区数据中心J</option>
              </select>
            </div>
          </div>
          <div class="col-md-2">
            <div class="form-group">
              <label>设备类型</label>
              <select class="form-select" v-model="filterDeviceType">
                <option value="">全部类型</option>
                <option value="server">服务器</option>
                <option value="cooling">制冷设备</option>
                <option value="power">配电设备</option>
              </select>
            </div>
          </div>
          <div class="col-md-2">
            <div class="form-group">
              <label>设备状态</label>
              <select class="form-select" v-model="filterStatus">
                <option value="">全部状态</option>
                <option value="normal">正常</option>
                <option value="warning">警告</option>
                <option value="alarm">告警</option>
              </select>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label>搜索设备</label>
              <div class="input-group">
                <input type="text" class="form-control" placeholder="输入设备名称或编号" v-model="searchQuery">
                <div class="input-group-append">
                  <button class="btn btn-primary" @click="searchDevices">
                    <i class="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-2">
            <div class="form-group">
              <label>操作</label>
              <div class="d-flex">
                <button class="btn btn-primary mr-2" @click="filterDevices">
                  <i class="fas fa-filter mr-1"></i> 筛选
                </button>
                <button class="btn btn-secondary" @click="resetFilters">
                  <i class="fas fa-redo mr-1"></i> 重置
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th>设备编号</th>
                <th>设备名称</th>
                <th>状态</th>
                <th>CPU利用率</th>
                <th>内存利用率</th>
                <th>磁盘利用率</th>
                <th>温度</th>
                <th>电压</th>
                <th>电流</th>
                <th>最后更新</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="device in devices" :key="device.id">
                <td>{{ device.id }}</td>
                <td>{{ device.name }}</td>
                <td>
                  <span :class="[
                    'status-badge',
                    device.status === 'normal' ? 'status-success' : 
                    device.status === 'warning' ? 'status-warning' : 'status-danger'
                  ]">
                    {{ device.statusText }}
                  </span>
                </td>
                <td>{{ device.cpuUsage }}</td>
                <td>{{ device.memoryUsage }}</td>
                <td>{{ device.diskUsage }}</td>
                <td>{{ device.temperature }}</td>
                <td>{{ device.voltage }}</td>
                <td>{{ device.current }}</td>
                <td>{{ device.lastUpdated }}</td>
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

// 状态管理
const selectedDeviceType = ref('all')
const timeRange = ref('1h')
const refreshInterval = ref('5s')
const filterDataCenter = ref('')
const filterDeviceType = ref('')
const filterStatus = ref('')
const searchQuery = ref('')

// 设备状态数据
const devices = ref([
  {
    id: 'DEV101',
    name: '服务器A',
    status: 'normal',
    statusText: '正常',
    cpuUsage: '45%',
    memoryUsage: '60%',
    diskUsage: '35%',
    temperature: '38°C',
    voltage: '220V',
    current: '5A',
    lastUpdated: '10:30:00'
  },
  {
    id: 'DEV102',
    name: '服务器B',
    status: 'warning',
    statusText: '警告',
    cpuUsage: '85%',
    memoryUsage: '75%',
    diskUsage: '45%',
    temperature: '42°C',
    voltage: '220V',
    current: '8A',
    lastUpdated: '10:30:00'
  },
  {
    id: 'DEV103',
    name: '制冷设备A',
    status: 'alarm',
    statusText: '告警',
    cpuUsage: '-',
    memoryUsage: '-',
    diskUsage: '-',
    temperature: '45°C',
    voltage: '220V',
    current: '12A',
    lastUpdated: '10:30:00'
  },
  {
    id: 'DEV104',
    name: '配电设备A',
    status: 'normal',
    statusText: '正常',
    cpuUsage: '-',
    memoryUsage: '-',
    diskUsage: '-',
    temperature: '35°C',
    voltage: '220V',
    current: '20A',
    lastUpdated: '10:30:00'
  }
])

// 告警信息
const alerts = ref([
  {
    id: 1,
    device: '制冷设备A',
    message: '温度异常 (45°C)',
    level: 'danger',
    time: '10:23:45'
  },
  {
    id: 2,
    device: '服务器B',
    message: 'CPU利用率过高 (85%)',
    level: 'warning',
    time: '10:15:22'
  }
])

// 实时状态图表
let realtimeChart = null

// 初始化实时状态图表
const initRealtimeChart = () => {
  const ctx = document.getElementById('realtime-device-status-chart')
  if (ctx && typeof Chart !== 'undefined') {
    realtimeChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00'],
        datasets: [
          {
            label: 'CPU利用率 (%)',
            data: [40, 45, 42, 50, 60, 65],
            borderColor: '#1a73e8',
            backgroundColor: 'rgba(26, 115, 232, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: '温度 (°C)',
            data: [35, 36, 37, 38, 39, 40],
            borderColor: '#ea4335',
            backgroundColor: 'rgba(234, 67, 53, 0.1)',
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

// 搜索设备
const searchDevices = () => {
  console.log('搜索设备:', searchQuery.value)
}

// 刷新数据
const refreshData = () => {
  console.log('刷新数据')
  // 这里可以添加刷新数据的逻辑
}

// 暂停告警
const pauseAlerts = () => {
  console.log('暂停告警')
  // 这里可以添加暂停告警的逻辑
}

// 导出数据
const exportData = () => {
  console.log('导出数据')
  // 这里可以添加导出数据的逻辑
}

// 筛选设备
const filterDevices = () => {
  console.log('筛选设备:', {
    dataCenter: filterDataCenter.value,
    deviceType: filterDeviceType.value,
    status: filterStatus.value,
    search: searchQuery.value
  })
  // 这里可以添加筛选设备的逻辑
}

// 重置筛选
const resetFilters = () => {
  filterDataCenter.value = ''
  filterDeviceType.value = ''
  filterStatus.value = ''
  searchQuery.value = ''
}

// 组件挂载后初始化图表
onMounted(() => {
  initRealtimeChart()
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
</style>