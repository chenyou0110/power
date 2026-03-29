<template>
  <div class="data-center-management">
    <div class="page-title">
      <i class="fas fa-database"></i>
      数据中心管理
    </div>
    
    <!-- 操作按钮 -->
    <div class="mb-4">
      <button class="btn btn-primary">
        <i class="fas fa-plus mr-2"></i>
        添加数据中心
      </button>
      <button class="btn btn-success">
        <i class="fas fa-sync-alt mr-2"></i>
        刷新数据
      </button>
      <button class="btn btn-warning">
        <i class="fas fa-download mr-2"></i>
        导出数据
      </button>
    </div>
    
    <!-- 搜索和筛选 -->
    <div class="card mb-4">
      <div class="card-body">
        <div class="row">
          <div class="col-md-4">
            <div class="form-group">
              <label>搜索数据中心</label>
              <div class="input-group">
                <input type="text" class="form-control" placeholder="输入数据中心名称或ID">
                <div class="input-group-append">
                  <button class="btn btn-primary">
                    <i class="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label>状态筛选</label>
              <select class="form-select">
                <option value="">全部状态</option>
                <option value="running">运行中</option>
                <option value="warning">警告</option>
                <option value="offline">离线</option>
              </select>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label>区域筛选</label>
              <select class="form-select">
                <option value="">全部区域</option>
                <option value="north">北区</option>
                <option value="south">南区</option>
                <option value="east">东区</option>
                <option value="west">西区</option>
              </select>
            </div>
          </div>
          <div class="col-md-2">
            <div class="form-group">
              <label>排序方式</label>
              <select class="form-select">
                <option value="name">按名称</option>
                <option value="load">按负载率</option>
                <option value="status">按状态</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 数据中心概览 -->
    <div class="row mb-4">
      <div class="col-md-3">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-server"></i>
          </div>
          <div class="stat-value">10</div>
          <div class="stat-label">数据中心总数</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-check-circle"></i>
          </div>
          <div class="stat-value">8</div>
          <div class="stat-label">运行中</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <div class="stat-value">2</div>
          <div class="stat-label">警告</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-bolt"></i>
          </div>
          <div class="stat-value">68%</div>
          <div class="stat-label">平均负载率</div>
        </div>
      </div>
    </div>
    
    <!-- 数据中心详细表格 -->
    <div class="card mb-4">
      <div class="card-header">
        <i class="fas fa-list-alt mr-2"></i>
        数据中心详细信息
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table id="data-center-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>数据中心名称</th>
                <th>区域</th>
                <th>总容量(kW)</th>
                <th>当前负载(kW)</th>
                <th>负载率</th>
                <th>电力来源</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr data-id="1" class="data-center-row">
                <td>DC001</td>
                <td>北区数据中心A</td>
                <td>北区</td>
                <td>1200</td>
                <td>850</td>
                <td>70.8%</td>
                <td>电网+光伏</td>
                <td><span class="status-badge status-success">运行中</span></td>
                <td>
                  <button class="btn btn-sm btn-primary view-details" @click="viewDetails('DC001')">
                    <i class="fas fa-eye"></i>
                  </button>
                </td>
              </tr>
              <tr data-id="2" class="data-center-row">
                <td>DC002</td>
                <td>南区数据中心B</td>
                <td>南区</td>
                <td>1500</td>
                <td>1020</td>
                <td>68.0%</td>
                <td>电网+风电</td>
                <td><span class="status-badge status-success">运行中</span></td>
                <td>
                  <button class="btn btn-sm btn-primary view-details" @click="viewDetails('DC002')">
                    <i class="fas fa-eye"></i>
                  </button>
                </td>
              </tr>
              <tr data-id="3" class="data-center-row">
                <td>DC003</td>
                <td>东区数据中心C</td>
                <td>东区</td>
                <td>1000</td>
                <td>890</td>
                <td>89.0%</td>
                <td>电网</td>
                <td><span class="status-badge status-warning">警告</span></td>
                <td>
                  <button class="btn btn-sm btn-primary view-details" @click="viewDetails('DC003')">
                    <i class="fas fa-eye"></i>
                  </button>
                </td>
              </tr>
              <tr data-id="4" class="data-center-row">
                <td>DC004</td>
                <td>西区数据中心D</td>
                <td>西区</td>
                <td>800</td>
                <td>520</td>
                <td>65.0%</td>
                <td>电网+光伏+储能</td>
                <td><span class="status-badge status-success">运行中</span></td>
                <td>
                  <button class="btn btn-sm btn-primary view-details" @click="viewDetails('DC004')">
                    <i class="fas fa-eye"></i>
                  </button>
                </td>
              </tr>
              <tr data-id="5" class="data-center-row">
                <td>DC005</td>
                <td>北区数据中心E</td>
                <td>北区</td>
                <td>1100</td>
                <td>780</td>
                <td>70.9%</td>
                <td>电网+风电</td>
                <td><span class="status-badge status-success">运行中</span></td>
                <td>
                  <button class="btn btn-sm btn-primary view-details" @click="viewDetails('DC005')">
                    <i class="fas fa-eye"></i>
                  </button>
                </td>
              </tr>
              <tr data-id="6" class="data-center-row">
                <td>DC006</td>
                <td>南区数据中心F</td>
                <td>南区</td>
                <td>1300</td>
                <td>950</td>
                <td>73.1%</td>
                <td>电网+光伏</td>
                <td><span class="status-badge status-success">运行中</span></td>
                <td>
                  <button class="btn btn-sm btn-primary view-details" @click="viewDetails('DC006')">
                    <i class="fas fa-eye"></i>
                  </button>
                </td>
              </tr>
              <tr data-id="7" class="data-center-row">
                <td>DC007</td>
                <td>东区数据中心G</td>
                <td>东区</td>
                <td>900</td>
                <td>810</td>
                <td>90.0%</td>
                <td>电网</td>
                <td><span class="status-badge status-warning">警告</span></td>
                <td>
                  <button class="btn btn-sm btn-primary view-details" @click="viewDetails('DC007')">
                    <i class="fas fa-eye"></i>
                  </button>
                </td>
              </tr>
              <tr data-id="8" class="data-center-row">
                <td>DC008</td>
                <td>西区数据中心H</td>
                <td>西区</td>
                <td>1400</td>
                <td>920</td>
                <td>65.7%</td>
                <td>电网+风电+储能</td>
                <td><span class="status-badge status-success">运行中</span></td>
                <td>
                  <button class="btn btn-sm btn-primary view-details" @click="viewDetails('DC008')">
                    <i class="fas fa-eye"></i>
                  </button>
                </td>
              </tr>
              <tr data-id="9" class="data-center-row">
                <td>DC009</td>
                <td>北区数据中心I</td>
                <td>北区</td>
                <td>1050</td>
                <td>720</td>
                <td>68.6%</td>
                <td>电网+光伏</td>
                <td><span class="status-badge status-success">运行中</span></td>
                <td>
                  <button class="btn btn-sm btn-primary view-details" @click="viewDetails('DC009')">
                    <i class="fas fa-eye"></i>
                  </button>
                </td>
              </tr>
              <tr data-id="10" class="data-center-row">
                <td>DC010</td>
                <td>南区数据中心J</td>
                <td>南区</td>
                <td>1250</td>
                <td>830</td>
                <td>66.4%</td>
                <td>电网+风电+光伏</td>
                <td><span class="status-badge status-success">运行中</span></td>
                <td>
                  <button class="btn btn-sm btn-primary view-details" @click="viewDetails('DC010')">
                    <i class="fas fa-eye"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <!-- 数据中心图表 -->
    <div class="row mb-4">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <i class="fas fa-chart-line mr-2"></i>
            数据中心负载趋势
          </div>
          <div class="card-body">
            <canvas id="load-trend-chart" height="300"></canvas>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <i class="fas fa-chart-pie mr-2"></i>
            电力来源分布
          </div>
          <div class="card-body">
            <canvas id="power-source-chart" height="300"></canvas>
          </div>
        </div>
      </div>
    </div>
    
    <div class="row mb-4">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <i class="fas fa-chart-bar mr-2"></i>
            数据中心负载率对比
          </div>
          <div class="card-body">
            <canvas id="load-comparison-chart" height="300"></canvas>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 数据中心详情模态框 -->
    <div class="modal fade" id="data-center-modal" tabindex="-1" aria-labelledby="data-center-modal-label" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="data-center-modal-label">数据中心详情</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div id="data-center-details">
              <!-- 详情内容将通过JavaScript动态填充 -->
              <div v-if="selectedDataCenter">
                <h6 class="fw-bold mb-3">{{ selectedDataCenter.name }}</h6>
                <div class="row">
                  <div class="col-md-6">
                    <p><strong>ID:</strong> {{ selectedDataCenter.id }}</p>
                    <p><strong>区域:</strong> {{ selectedDataCenter.region }}</p>
                    <p><strong>总容量:</strong> {{ selectedDataCenter.totalCapacity }} kW</p>
                    <p><strong>当前负载:</strong> {{ selectedDataCenter.currentLoad }} kW</p>
                    <p><strong>负载率:</strong> {{ selectedDataCenter.loadRate }}</p>
                  </div>
                  <div class="col-md-6">
                    <p><strong>电力来源:</strong> {{ selectedDataCenter.powerSource }}</p>
                    <p><strong>状态:</strong> <span :class="['status-badge', selectedDataCenter.status === '运行中' ? 'status-success' : 'status-warning']">{{ selectedDataCenter.status }}</span></p>
                    <p><strong>新能源消纳率:</strong> {{ selectedDataCenter.renewableRate }}</p>
                    <p><strong>储能SOC:</strong> {{ selectedDataCenter.batterySOC }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary">编辑信息</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

// 数据中心详情
const selectedDataCenter = ref(null)

// 数据中心详细数据
const dataCenters = [
  {
    id: 'DC001',
    name: '北区数据中心A',
    region: '北区',
    totalCapacity: 1200,
    currentLoad: 850,
    loadRate: '70.8%',
    powerSource: '电网+光伏',
    status: '运行中',
    renewableRate: '92%',
    batterySOC: '68%'
  },
  {
    id: 'DC002',
    name: '南区数据中心B',
    region: '南区',
    totalCapacity: 1500,
    currentLoad: 1020,
    loadRate: '68.0%',
    powerSource: '电网+风电',
    status: '运行中',
    renewableRate: '88%',
    batterySOC: '65%'
  },
  {
    id: 'DC003',
    name: '东区数据中心C',
    region: '东区',
    totalCapacity: 1000,
    currentLoad: 890,
    loadRate: '89.0%',
    powerSource: '电网',
    status: '警告',
    renewableRate: '0%',
    batterySOC: '0%'
  },
  {
    id: 'DC004',
    name: '西区数据中心D',
    region: '西区',
    totalCapacity: 800,
    currentLoad: 520,
    loadRate: '65.0%',
    powerSource: '电网+光伏+储能',
    status: '运行中',
    renewableRate: '75%',
    batterySOC: '62%'
  },
  {
    id: 'DC005',
    name: '北区数据中心E',
    region: '北区',
    totalCapacity: 1100,
    currentLoad: 780,
    loadRate: '70.9%',
    powerSource: '电网+风电',
    status: '运行中',
    renewableRate: '85%',
    batterySOC: '67%'
  },
  {
    id: 'DC006',
    name: '南区数据中心F',
    region: '南区',
    totalCapacity: 1300,
    currentLoad: 950,
    loadRate: '73.1%',
    powerSource: '电网+光伏',
    status: '运行中',
    renewableRate: '80%',
    batterySOC: '64%'
  },
  {
    id: 'DC007',
    name: '东区数据中心G',
    region: '东区',
    totalCapacity: 900,
    currentLoad: 810,
    loadRate: '90.0%',
    powerSource: '电网',
    status: '警告',
    renewableRate: '0%',
    batterySOC: '0%'
  },
  {
    id: 'DC008',
    name: '西区数据中心H',
    region: '西区',
    totalCapacity: 1400,
    currentLoad: 920,
    loadRate: '65.7%',
    powerSource: '电网+风电+储能',
    status: '运行中',
    renewableRate: '82%',
    batterySOC: '66%'
  },
  {
    id: 'DC009',
    name: '北区数据中心I',
    region: '北区',
    totalCapacity: 1050,
    currentLoad: 720,
    loadRate: '68.6%',
    powerSource: '电网+光伏',
    status: '运行中',
    renewableRate: '78%',
    batterySOC: '63%'
  },
  {
    id: 'DC010',
    name: '南区数据中心J',
    region: '南区',
    totalCapacity: 1250,
    currentLoad: 830,
    loadRate: '66.4%',
    powerSource: '电网+风电+光伏',
    status: '运行中',
    renewableRate: '85%',
    batterySOC: '65%'
  }
]

// 查看数据中心详情
const viewDetails = (id) => {
  selectedDataCenter.value = dataCenters.find(dc => dc.id === id)
  // 这里可以添加打开模态框的逻辑
  console.log('查看数据中心详情:', selectedDataCenter.value)
}

// 图表实例
let loadTrendChart = null
let powerSourceChart = null
let loadComparisonChart = null

// 初始化负载趋势图表
const initLoadTrendChart = () => {
  const ctx = document.getElementById('load-trend-chart')
  if (ctx && typeof Chart !== 'undefined') {
    loadTrendChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
        datasets: [
          {
            label: '北区数据中心A',
            data: [800, 750, 900, 950, 920, 850],
            borderColor: '#1a73e8',
            backgroundColor: 'rgba(26, 115, 232, 0.1)',
            tension: 0.4
          },
          {
            label: '南区数据中心B',
            data: [950, 900, 1050, 1100, 1080, 1020],
            borderColor: '#34a853',
            backgroundColor: 'rgba(52, 168, 83, 0.1)',
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    })
  }
}

// 初始化电力来源分布图表
const initPowerSourceChart = () => {
  const ctx = document.getElementById('power-source-chart')
  if (ctx && typeof Chart !== 'undefined') {
    powerSourceChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['电网', '光伏', '风电', '储能'],
        datasets: [
          {
            data: [60, 20, 15, 5],
            backgroundColor: ['#1a73e8', '#34a853', '#fbbc05', '#ea4335']
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    })
  }
}

// 初始化负载率对比图表
const initLoadComparisonChart = () => {
  const ctx = document.getElementById('load-comparison-chart')
  if (ctx && typeof Chart !== 'undefined') {
    loadComparisonChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['DC001', 'DC002', 'DC003', 'DC004', 'DC005', 'DC006', 'DC007', 'DC008', 'DC009', 'DC010'],
        datasets: [
          {
            label: '负载率 (%)',
            data: [70.8, 68.0, 89.0, 65.0, 70.9, 73.1, 90.0, 65.7, 68.6, 66.4],
            backgroundColor: '#1a73e8'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
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

// 组件挂载后初始化图表
onMounted(() => {
  initLoadTrendChart()
  initPowerSourceChart()
  initLoadComparisonChart()
})
</script>

<style scoped>
/* 组件特定样式 */
</style>