<template>
  <div id="dashboard" class="page-section">
    <div class="page-title">
      <i class="fas fa-home"></i>
      平台首页
    </div>
    <div class="row">
      <div class="col-md-3">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-bolt"></i>
          </div>
          <div class="stat-value">{{ stats.totalLoad }}</div>
          <div class="stat-label">今日负载总量</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-solar-system"></i>
          </div>
          <div class="stat-value">{{ stats.renewableRate }}</div>
          <div class="stat-label">新能源消纳率</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-battery-three-quarters"></i>
          </div>
          <div class="stat-value">{{ stats.batterySOC }}</div>
          <div class="stat-label">储能SOC</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-yuan-sign"></i>
          </div>
          <div class="stat-value">{{ stats.estimatedCost }}</div>
          <div class="stat-label">预估运行成本</div>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-3">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-money-bill-wave"></i>
          </div>
          <div class="stat-value">{{ stats.todayPrice }}</div>
          <div class="stat-label">今日电价</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-plug"></i>
          </div>
          <div class="stat-value">{{ stats.gridPurchase }}</div>
          <div class="stat-label">电网购电量</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-sliders-h"></i>
          </div>
          <div class="stat-value">{{ stats.adjustablePotential }}</div>
          <div class="stat-label">可调节潜力</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <div class="stat-value">{{ stats.alerts }}</div>
          <div class="stat-label">异常告警</div>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            <i class="fas fa-chart-bar mr-2"></i>
            系统运行状态
          </div>
          <div class="card-body">
            <div style="height: 300px; width: 100%; padding: 0;">
              <canvas id="system-status-chart" style="width: 100% !important; height: 100% !important;"></canvas>
            </div>
            <div class="mt-4">
              <table class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>数据中心</th>
                    <th>当前负载 (kW)</th>
                    <th>峰值负载 (kW)</th>
                    <th>负载率</th>
                    <th>新能源消纳率</th>
                    <th>储能SOC</th>
                    <th>运行状态</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(datacenter, index) in datacenters" :key="index">
                    <td>{{ datacenter.name }}</td>
                    <td>{{ datacenter.currentLoad }}</td>
                    <td>{{ datacenter.peakLoad }}</td>
                    <td>{{ datacenter.loadRate }}</td>
                    <td>{{ datacenter.renewableRate }}</td>
                    <td>{{ datacenter.batterySOC }}</td>
                    <td>
                      <span :class="['badge', datacenter.status === '正常' ? 'bg-success' : 'bg-warning']">
                        {{ datacenter.status }}
                      </span>
                    </td>
                    <td>
                      <button class="btn btn-sm btn-primary" @click="viewDetails(datacenter)">
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
      <div class="col-md-4">
        <div class="card">
          <div class="card-header">
            <i class="fas fa-robot mr-2"></i>
            智能助手
          </div>
          <div class="card-body">
            <div class="text-center mb-3">
              <h6 class="fw-bold mb-2">选择智能体</h6>
              <div class="row gap-2">
                <div class="col-12">
                  <button class="btn btn-primary w-100 py-2 d-flex align-items-center justify-content-center gap-2 agent-btn" data-target="dispatch-agent">
                    <i class="fas fa-bolt"></i>
                    <span>调度智能体</span>
                  </button>
                </div>
                <div class="col-12">
                  <button class="btn btn-success w-100 py-2 d-flex align-items-center justify-content-center gap-2 agent-btn" data-target="forecast-agent">
                    <i class="fas fa-chart-line"></i>
                    <span>预测智能体</span>
                  </button>
                </div>
              </div>
            </div>
            <div class="mt-3">
              <h6 class="fw-bold mb-2">智能体功能</h6>
              <div class="border rounded p-2 bg-light">
                <p class="mb-1 text-sm"><strong>调度智能体：</strong>负责电力调度管理，包括调度策略制定、任务调度和微网调度等功能。</p>
                <p class="text-sm"><strong>预测智能体：</strong>负责负荷预测管理，包括数据处理、模型管理和预测执行等功能。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

// 统计数据
const stats = ref({
  totalLoad: '8900 kW',
  renewableRate: '89%',
  batterySOC: '65%',
  estimatedCost: '15800元',
  todayPrice: '0.68元/kWh',
  gridPurchase: '6200 kWh',
  adjustablePotential: '1800 kW',
  alerts: '2'
})

// 数据中心列表
const datacenters = ref([
  {
    name: '北区数据中心A',
    currentLoad: 1200,
    peakLoad: 1500,
    loadRate: '80%',
    renewableRate: '92%',
    batterySOC: '68%',
    status: '正常'
  },
  {
    name: '南区数据中心B',
    currentLoad: 950,
    peakLoad: 1200,
    loadRate: '79%',
    renewableRate: '88%',
    batterySOC: '65%',
    status: '正常'
  },
  {
    name: '东区数据中心C',
    currentLoad: 820,
    peakLoad: 1000,
    loadRate: '82%',
    renewableRate: '90%',
    batterySOC: '62%',
    status: '正常'
  },
  {
    name: '西区数据中心D',
    currentLoad: 780,
    peakLoad: 950,
    loadRate: '82%',
    renewableRate: '85%',
    batterySOC: '60%',
    status: '注意'
  },
  {
    name: '北区数据中心E',
    currentLoad: 1100,
    peakLoad: 1300,
    loadRate: '85%',
    renewableRate: '91%',
    batterySOC: '67%',
    status: '正常'
  }
])

// 系统运行状态图表
let systemStatusChart = null

// 查看数据中心详情
const viewDetails = (datacenter) => {
  console.log('查看数据中心详情:', datacenter)
  // 这里可以添加详情查看逻辑，比如打开模态框
}

// 初始化系统运行状态图表
const initSystemStatusChart = () => {
  if (systemStatusChart) systemStatusChart.destroy()
  
  const systemStatusCtx = document.getElementById('system-status-chart')
  if (systemStatusCtx && typeof Chart !== 'undefined') {
    systemStatusChart = new Chart(systemStatusCtx, {
      type: 'line',
      data: {
        labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
        datasets: [
          {
            label: '负载 (kW)',
            data: [8200, 8000, 7800, 7600, 8500, 8900, 8700, 8800, 8900, 8700, 8600, 8400],
            borderColor: '#1a73e8',
            backgroundColor: 'rgba(26, 115, 232, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: '新能源出力 (kW)',
            data: [100, 50, 20, 10, 500, 1000, 950, 900, 850, 600, 300, 200],
            borderColor: '#34a853',
            backgroundColor: 'rgba(52, 168, 83, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: '储能SOC (%)',
            data: [70, 68, 66, 65, 63, 65, 68, 70, 72, 70, 68, 66],
            borderColor: '#fbbc05',
            backgroundColor: 'rgba(251, 188, 5, 0.1)',
            tension: 0.4,
            fill: true,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: false
          }
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: '功率 (kW)'
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'SOC (%)'
            },
            grid: {
              drawOnChartArea: false
            },
            min: 0,
            max: 100
          }
        }
      }
    })
  }
}

// 组件挂载后初始化图表
onMounted(() => {
  initSystemStatusChart()
  
  // 监听窗口大小变化，重新调整图表
  window.addEventListener('resize', initSystemStatusChart)
})
</script>

<style scoped>
/* 可以添加组件特定的样式 */
</style>