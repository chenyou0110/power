<template>
  <div class="forecast-execution-view">
    <div class="page-title">
      <i class="fas fa-play-circle"></i>
      预测执行
    </div>
    <div class="mb-4">
      <button class="btn btn-primary">
        <i class="fas fa-play mr-2"></i>
        开始预测
      </button>
      <button class="btn btn-success">
        <i class="fas fa-tasks mr-2"></i>
        创建预测任务
      </button>
      <button class="btn btn-warning">
        <i class="fas fa-download mr-2"></i>
        导出预测结果
      </button>
    </div>
    
    <!-- 预测参数设置 -->
    <div class="card mb-4">
      <div class="card-header">
        <i class="fas fa-cog mr-2"></i>
        预测参数设置
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-4">
            <div class="form-group">
              <label>历史数据时间范围</label>
              <div class="input-group">
                <input type="date" class="form-control" value="2024-01-12">
                <span class="input-group-text">至</span>
                <input type="date" class="form-control" value="2024-01-19">
              </div>
              <small class="form-text text-muted">默认：过去7天</small>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label>预测模型</label>
              <select class="form-select">
                <option value="lstm" selected>LSTM (长短期记忆网络)</option>
                <option value="rnn">RNN (循环神经网络)</option>
                <option value="arima">ARIMA (自回归积分滑动平均)</option>
                <option value="xgboost">XGBoost (梯度提升树)</option>
                <option value="prophet">Prophet (时间序列预测)</option>
              </select>
              <small class="form-text text-muted">默认：LSTM</small>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label>预测时长</label>
              <select class="form-select">
                <option value="1h">1小时</option>
                <option value="24h" selected>24小时</option>
                <option value="7d">7天</option>
                <option value="30d">30天</option>
              </select>
              <small class="form-text text-muted">默认：24小时</small>
            </div>
          </div>
          <div class="col-md-2">
            <div class="form-group">
              <label>应用设置</label>
              <button class="btn btn-primary w-100">
                <i class="fas fa-check mr-2"></i>
                应用
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 数据中心预测表格 -->
    <div class="card mb-4">
      <div class="card-header">
        <i class="fas fa-table mr-2"></i>
        数据中心预测列表
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>数据中心</th>
                <th>当前负载(kW)</th>
                <th>预测负载(kW)</th>
                <th>预测误差(%)</th>
                <th>预测时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr data-id="DC001">
                <td>北区数据中心A</td>
                <td>850</td>
                <td>870</td>
                <td>2.35</td>
                <td>2024-01-19 10:30</td>
                <td>
                  <button class="btn btn-sm btn-info view-forecast-details">
                    <i class="fas fa-eye"></i>
                  </button>
                </td>
              </tr>
              <tr data-id="DC002">
                <td>南区数据中心B</td>
                <td>1020</td>
                <td>1050</td>
                <td>2.94</td>
                <td>2024-01-19 10:30</td>
                <td>
                  <button class="btn btn-sm btn-info view-forecast-details">
                    <i class="fas fa-eye"></i>
                  </button>
                </td>
              </tr>
              <tr data-id="DC003">
                <td>东区数据中心C</td>
                <td>890</td>
                <td>910</td>
                <td>2.25</td>
                <td>2024-01-19 10:30</td>
                <td>
                  <button class="btn btn-sm btn-info view-forecast-details">
                    <i class="fas fa-eye"></i>
                  </button>
                </td>
              </tr>
              <tr data-id="DC004">
                <td>西区数据中心D</td>
                <td>520</td>
                <td>530</td>
                <td>1.92</td>
                <td>2024-01-19 10:30</td>
                <td>
                  <button class="btn btn-sm btn-info view-forecast-details">
                    <i class="fas fa-eye"></i>
                  </button>
                </td>
              </tr>
              <tr data-id="DC005">
                <td>北区数据中心E</td>
                <td>780</td>
                <td>800</td>
                <td>2.56</td>
                <td>2024-01-19 10:30</td>
                <td>
                  <button class="btn btn-sm btn-info view-forecast-details">
                    <i class="fas fa-eye"></i>
                  </button>
                </td>
              </tr>
              <tr data-id="DC006">
                <td>南区数据中心F</td>
                <td>950</td>
                <td>970</td>
                <td>2.11</td>
                <td>2024-01-19 10:30</td>
                <td>
                  <button class="btn btn-sm btn-info view-forecast-details">
                    <i class="fas fa-eye"></i>
                  </button>
                </td>
              </tr>
              <tr data-id="DC007">
                <td>东区数据中心G</td>
                <td>810</td>
                <td>830</td>
                <td>2.47</td>
                <td>2024-01-19 10:30</td>
                <td>
                  <button class="btn btn-sm btn-info view-forecast-details">
                    <i class="fas fa-eye"></i>
                  </button>
                </td>
              </tr>
              <tr data-id="DC008">
                <td>西区数据中心H</td>
                <td>920</td>
                <td>940</td>
                <td>2.17</td>
                <td>2024-01-19 10:30</td>
                <td>
                  <button class="btn btn-sm btn-info view-forecast-details">
                    <i class="fas fa-eye"></i>
                  </button>
                </td>
              </tr>
              <tr data-id="DC009">
                <td>北区数据中心I</td>
                <td>720</td>
                <td>740</td>
                <td>2.78</td>
                <td>2024-01-19 10:30</td>
                <td>
                  <button class="btn btn-sm btn-info view-forecast-details">
                    <i class="fas fa-eye"></i>
                  </button>
                </td>
              </tr>
              <tr data-id="DC010">
                <td>南区数据中心J</td>
                <td>830</td>
                <td>850</td>
                <td>2.41</td>
                <td>2024-01-19 10:30</td>
                <td>
                  <button class="btn btn-sm btn-info view-forecast-details">
                    <i class="fas fa-eye"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <!-- 预测结果 -->
    <div class="card mb-4">
      <div class="card-header">
        <i class="fas fa-chart-line mr-2"></i>
        预测结果
      </div>
      <div class="card-body">
        <div style="height: 400px;">
          <canvas id="forecast-result-chart"></canvas>
        </div>
        <div class="mt-4">
          <h6 class="fw-bold mb-3">预测统计</h6>
          <div class="row">
            <div class="col-md-3">
              <div class="stat-card">
                <div class="stat-value">8900 kW</div>
                <div class="stat-label">预测峰值负载</div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="stat-card">
                <div class="stat-value">6200 kW</div>
                <div class="stat-label">预测平均负载</div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="stat-card">
                <div class="stat-value">4500 kW</div>
                <div class="stat-label">预测最低负载</div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="stat-card">
                <div class="stat-value">2.1%</div>
                <div class="stat-label">预测误差</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 预测历史 -->
    <div class="card mb-4">
      <div class="card-header">
        <i class="fas fa-history mr-2"></i>
        预测历史
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>预测时间</th>
                <th>模型名称</th>
                <th>预测时长</th>
                <th>预测峰值</th>
                <th>预测误差</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2024-01-19 10:00</td>
                <td>LSTM 模型</td>
                <td>24小时</td>
                <td>8900 kW</td>
                <td>2.1%</td>
                <td><span class="status-badge status-success">成功</span></td>
                <td>
                  <button class="btn btn-sm btn-info">
                    <i class="fas fa-eye"></i>
                  </button>
                </td>
              </tr>
              <tr>
                <td>2024-01-18 15:30</td>
                <td>RNN 模型</td>
                <td>24小时</td>
                <td>9100 kW</td>
                <td>3.5%</td>
                <td><span class="status-badge status-success">成功</span></td>
                <td>
                  <button class="btn btn-sm btn-info">
                    <i class="fas fa-eye"></i>
                  </button>
                </td>
              </tr>
              <tr>
                <td>2024-01-17 09:00</td>
                <td>ARIMA 模型</td>
                <td>24小时</td>
                <td>9200 kW</td>
                <td>4.2%</td>
                <td><span class="status-badge status-success">成功</span></td>
                <td>
                  <button class="btn btn-sm btn-info">
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
import { onMounted } from 'vue'
import Chart from 'chart.js/auto'

// 预测结果图表
let forecastChart = null

// 初始化预测结果图表
const initForecastChart = () => {
  const ctx = document.getElementById('forecast-result-chart')
  if (ctx && typeof Chart !== 'undefined') {
    forecastChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
        datasets: [
          {
            label: '预测负载 (kW)',
            data: [6200, 5800, 5500, 5300, 6500, 7800, 8200, 8500, 8900, 8700, 8200, 7500],
            borderColor: '#1a73e8',
            backgroundColor: 'rgba(26, 115, 232, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: '历史负载 (kW)',
            data: [6000, 5600, 5300, 5100, 6300, 7600, 8000, 8300, 8700, 8500, 8000, 7300],
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

// 组件挂载后初始化图表
onMounted(() => {
  initForecastChart()
})
</script>

<style scoped>
</style>