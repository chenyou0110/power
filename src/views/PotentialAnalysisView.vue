<template>
  <div class="potential-analysis-view">
    <div class="page-title">
      <i class="fas fa-chart-bar"></i>
      潜力分析管理
    </div>
    <div class="mb-4">
      <button class="btn btn-primary" @click="startAnalysis">
        <i class="fas fa-play mr-2"></i>
        开始分析
      </button>
      <button class="btn btn-success" @click="refreshData">
        <i class="fas fa-sync-alt mr-2"></i>
        刷新数据
      </button>
      <button class="btn btn-warning" @click="exportAnalysis">
        <i class="fas fa-download mr-2"></i>
        导出分析结果
      </button>
    </div>
    
    <!-- 分析配置 -->
    <div class="card mb-4">
      <div class="card-header">
        <i class="fas fa-cogs mr-2"></i>
        分析配置
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-4">
            <div class="form-group">
              <label>分析类型</label>
              <select class="form-select" v-model="analysisConfig.type">
                <option value="load">负荷潜力分析</option>
                <option value="renewable">新能源潜力分析</option>
                <option value="storage">储能潜力分析</option>
                <option value="comprehensive">综合潜力分析</option>
              </select>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label>分析周期</label>
              <select class="form-select" v-model="analysisConfig.period">
                <option value="day">日</option>
                <option value="week">周</option>
                <option value="month">月</option>
                <option value="year">年</option>
              </select>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label>数据中心</label>
              <select class="form-select" v-model="analysisConfig.dataCenter">
                <option value="all">所有数据中心</option>
                <option value="DC001">北区数据中心A</option>
                <option value="DC002">南区数据中心B</option>
                <option value="DC003">东区数据中心C</option>
                <option value="DC004">西区数据中心D</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-6">
            <div class="form-group">
              <label>开始日期</label>
              <input type="date" class="form-control" v-model="analysisConfig.startDate">
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label>结束日期</label>
              <input type="date" class="form-control" v-model="analysisConfig.endDate">
            </div>
          </div>
        </div>
        <div class="mt-4">
          <button class="btn btn-primary" @click="applyConfig">
            <i class="fas fa-check mr-2"></i>
            应用配置
          </button>
        </div>
      </div>
    </div>
    
    <!-- 分析结果 -->
    <div class="card mb-4">
      <div class="card-header">
        <i class="fas fa-chart-line mr-2"></i>
        分析结果
      </div>
      <div class="card-body">
        <div style="height: 400px;">
          <canvas id="potential-analysis-chart"></canvas>
        </div>
        <div class="mt-4">
          <h6 class="fw-bold mb-3">分析统计</h6>
          <div class="row">
            <div class="col-md-3">
              <div class="stat-card">
                <div class="stat-value">1800 kW</div>
                <div class="stat-label">可调节潜力</div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="stat-card">
                <div class="stat-value">1200 kW</div>
                <div class="stat-label">负荷潜力</div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="stat-card">
                <div class="stat-value">500 kW</div>
                <div class="stat-label">新能源潜力</div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="stat-card">
                <div class="stat-value">100 kW</div>
                <div class="stat-label">储能潜力</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 分析历史 -->
    <div class="card mb-4">
      <div class="card-header">
        <i class="fas fa-history mr-2"></i>
        分析历史
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>分析时间</th>
                <th>分析类型</th>
                <th>分析周期</th>
                <th>可调节潜力</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="history in analysisHistory" :key="history.id">
                <td>{{ history.time }}</td>
                <td>{{ history.type }}</td>
                <td>{{ history.period }}</td>
                <td>{{ history.potential }}</td>
                <td><span class="status-badge status-success">成功</span></td>
                <td>
                  <button class="btn btn-sm btn-info" @click="viewAnalysis(history)">
                    <i class="fas fa-eye"></i>
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

// 分析配置数据
const analysisConfig = ref({
  type: 'comprehensive',
  period: 'day',
  dataCenter: 'all',
  startDate: '',
  endDate: ''
})

// 分析历史数据
const analysisHistory = ref([
  {
    id: 1,
    time: '2024-01-19 10:00',
    type: '综合潜力分析',
    period: '日',
    potential: '1800 kW',
    status: 'success'
  },
  {
    id: 2,
    time: '2024-01-18 15:30',
    type: '负荷潜力分析',
    period: '日',
    potential: '1200 kW',
    status: 'success'
  },
  {
    id: 3,
    time: '2024-01-17 09:00',
    type: '新能源潜力分析',
    period: '日',
    potential: '500 kW',
    status: 'success'
  }
])

// 分析结果图表
let analysisChart = null

// 初始化分析结果图表
const initAnalysisChart = () => {
  const ctx = document.getElementById('potential-analysis-chart')
  if (ctx && typeof Chart !== 'undefined') {
    analysisChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['北区数据中心A', '南区数据中心B', '东区数据中心C', '西区数据中心D'],
        datasets: [
          {
            label: '负荷潜力 (kW)',
            data: [400, 350, 300, 150],
            backgroundColor: 'rgba(26, 115, 232, 0.6)'
          },
          {
            label: '新能源潜力 (kW)',
            data: [200, 150, 100, 50],
            backgroundColor: 'rgba(52, 168, 83, 0.6)'
          },
          {
            label: '储能潜力 (kW)',
            data: [30, 25, 25, 20],
            backgroundColor: 'rgba(251, 188, 5, 0.6)'
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

// 开始分析
const startAnalysis = () => {
  console.log('开始分析:', analysisConfig.value)
  // 这里可以添加开始分析的逻辑
}

// 刷新数据
const refreshData = () => {
  console.log('刷新数据')
  // 这里可以添加刷新数据的逻辑
}

// 导出分析结果
const exportAnalysis = () => {
  console.log('导出分析结果')
  // 这里可以添加导出分析结果的逻辑
}

// 应用配置
const applyConfig = () => {
  console.log('应用配置:', analysisConfig.value)
  // 这里可以添加应用配置的逻辑
}

// 查看分析历史
const viewAnalysis = (history) => {
  console.log('查看分析历史:', history)
  // 这里可以添加查看分析历史的逻辑
}

// 组件挂载后初始化图表
onMounted(() => {
  initAnalysisChart()
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
</style>