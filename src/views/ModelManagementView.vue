<template>
  <div class="model-management-view">
    <div class="page-title">
      <i class="fas fa-brain"></i>
      模型管理
    </div>
    <div class="mb-4">
      <button class="btn btn-primary">
        <i class="fas fa-plus mr-2"></i>
        添加模型
      </button>
      <button class="btn btn-success">
        <i class="fas fa-play mr-2"></i>
        训练模型
      </button>
      <button class="btn btn-warning">
        <i class="fas fa-download mr-2"></i>
        导出模型
      </button>
      <button class="btn btn-danger">
        <i class="fas fa-trash mr-2"></i>
        删除模型
      </button>
    </div>
    
    <!-- 模型列表 -->
    <div class="card mb-4">
      <div class="card-header">
        <i class="fas fa-list-alt mr-2"></i>
        预测模型列表
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>模型名称</th>
                <th>模型类型</th>
                <th>状态</th>
                <th>训练时间</th>
                <th>MAE</th>
                <th>RMSE</th>
                <th>MAPE</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="model in models" :key="model.id">
                <td>{{ model.name }}</td>
                <td>{{ model.type }}</td>
                <td>
                  <span :class="[
                    'status-badge',
                    model.status === 'trained' ? 'status-success' : 'status-warning'
                  ]">
                    {{ model.statusText }}
                  </span>
                </td>
                <td>{{ model.trainingTime }}</td>
                <td>{{ model.mae }}</td>
                <td>{{ model.rmse }}</td>
                <td>{{ model.mape }}</td>
                <td>
                  <button class="btn btn-sm btn-primary" @click="editModel(model)">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn-sm btn-info" @click="viewModel(model)">
                    <i class="fas fa-eye"></i>
                  </button>
                  <button class="btn btn-sm btn-success" @click="trainModel(model)">
                    <i class="fas fa-play"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <!-- 模型参数配置 -->
    <div class="card mb-4">
      <div class="card-header">
        <i class="fas fa-sliders-h mr-2"></i>
        模型参数配置
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-4">
            <div class="form-group">
              <label>模型类型</label>
              <select class="form-select">
                <option value="lstm">LSTM</option>
                <option value="rnn">RNN</option>
                <option value="arima">ARIMA</option>
                <option value="xgboost">XGBoost</option>
                <option value="prophet">Prophet</option>
              </select>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label>模型名称</label>
              <input type="text" class="form-control" placeholder="输入模型名称">
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label>模型版本</label>
              <input type="text" class="form-control" placeholder="输入版本号" value="v1.0">
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-6">
            <h6 class="fw-bold mb-3">神经网络参数</h6>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>神经元数量</label>
                  <input type="number" class="form-control" value="128">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>网络层数</label>
                  <input type="number" class="form-control" value="2">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>学习率</label>
                  <input type="number" class="form-control" value="0.001" step="0.0001">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>批量大小</label>
                  <input type="number" class="form-control" value="32">
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <h6 class="fw-bold mb-3">训练参数</h6>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>最大训练次数</label>
                  <input type="number" class="form-control" value="100">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>误差阈值</label>
                  <input type="number" class="form-control" value="0.001" step="0.0001">
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label>早停策略</label>
                  <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="early-stop" checked>
                    <label class="form-check-label" for="early-stop">启用早停</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-12">
            <button class="btn btn-primary">
              <i class="fas fa-save mr-2"></i>
              保存参数配置
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 模型性能评估 -->
    <div class="card mb-4">
      <div class="card-header">
        <i class="fas fa-chart-bar mr-2"></i>
        模型性能评估
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <div class="mb-4">
              <h6 class="fw-bold mb-2">模型准确率对比</h6>
              <div style="height: 300px;">
                <canvas id="model-accuracy-chart"></canvas>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-4">
              <h6 class="fw-bold mb-2">模型性能指标</h6>
              <div style="height: 300px;">
                <canvas id="model-performance-chart"></canvas>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-12">
            <div class="table-responsive">
              <table class="table table-sm">
                <thead>
                  <tr>
                    <th>评估指标</th>
                    <th>LSTM</th>
                    <th>RNN</th>
                    <th>ARIMA</th>
                    <th>XGBoost</th>
                    <th>Prophet</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>MAE</td>
                    <td>0.021</td>
                    <td>0.035</td>
                    <td>0.042</td>
                    <td>0.028</td>
                    <td>0.031</td>
                  </tr>
                  <tr>
                    <td>RMSE</td>
                    <td>0.032</td>
                    <td>0.048</td>
                    <td>0.056</td>
                    <td>0.039</td>
                    <td>0.041</td>
                  </tr>
                  <tr>
                    <td>MAPE</td>
                    <td>2.1%</td>
                    <td>3.5%</td>
                    <td>4.2%</td>
                    <td>2.8%</td>
                    <td>3.1%</td>
                  </tr>
                </tbody>
              </table>
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

// 模型数据
const models = ref([
  {
    id: 1,
    name: 'LSTM 模型',
    type: 'LSTM',
    status: 'trained',
    statusText: '已训练',
    trainingTime: '2024-01-18 15:30',
    mae: '0.021',
    rmse: '0.032',
    mape: '2.1%'
  },
  {
    id: 2,
    name: 'RNN 模型',
    type: 'RNN',
    status: 'trained',
    statusText: '已训练',
    trainingTime: '2024-01-17 10:00',
    mae: '0.035',
    rmse: '0.048',
    mape: '3.5%'
  },
  {
    id: 3,
    name: 'ARIMA 模型',
    type: 'ARIMA',
    status: 'trained',
    statusText: '已训练',
    trainingTime: '2024-01-16 09:00',
    mae: '0.042',
    rmse: '0.056',
    mape: '4.2%'
  }
])

// 图表实例
let modelAccuracyChart = null
let modelPerformanceChart = null

// 编辑模型
const editModel = (model) => {
  console.log('编辑模型:', model)
}

// 查看模型
const viewModel = (model) => {
  console.log('查看模型:', model)
}

// 训练模型
const trainModel = (model) => {
  console.log('训练模型:', model)
}

// 初始化模型准确率对比图表
const initModelAccuracyChart = () => {
  const ctx = document.getElementById('model-accuracy-chart')
  if (ctx && typeof Chart !== 'undefined') {
    modelAccuracyChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['LSTM', 'RNN', 'ARIMA', 'XGBoost', 'Prophet'],
        datasets: [
          {
            label: '准确率 (%)',
            data: [97.9, 96.5, 95.8, 97.2, 96.9],
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

// 初始化模型性能指标图表
const initModelPerformanceChart = () => {
  const ctx = document.getElementById('model-performance-chart')
  if (ctx && typeof Chart !== 'undefined') {
    modelPerformanceChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['MAE', 'RMSE', 'MAPE', '训练时间', '预测速度'],
        datasets: [
          {
            label: 'LSTM',
            data: [97, 96, 98, 85, 80],
            borderColor: '#1a73e8',
            backgroundColor: 'rgba(26, 115, 232, 0.1)'
          },
          {
            label: 'XGBoost',
            data: [94, 93, 95, 95, 90],
            borderColor: '#34a853',
            backgroundColor: 'rgba(52, 168, 83, 0.1)'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
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
  initModelAccuracyChart()
  initModelPerformanceChart()
})
</script>

<style scoped>
</style>