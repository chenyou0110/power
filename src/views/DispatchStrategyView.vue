<template>
  <div class="dispatch-strategy-view">
    <div class="page-title">
      <i class="fas fa-chess"></i>
      调度策略管理
    </div>
    <div class="mb-4">
      <button class="btn btn-primary" @click="addStrategy">
        <i class="fas fa-plus mr-2"></i>
        添加策略
      </button>
      <button class="btn btn-success" @click="refreshData">
        <i class="fas fa-sync-alt mr-2"></i>
        刷新数据
      </button>
      <button class="btn btn-warning" @click="exportStrategies">
        <i class="fas fa-download mr-2"></i>
        导出策略
      </button>
    </div>
    
    <!-- 策略列表 -->
    <div class="card mb-4">
      <div class="card-header">
        <i class="fas fa-list-alt mr-2"></i>
        调度策略列表
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>策略名称</th>
                <th>策略类型</th>
                <th>优先级</th>
                <th>状态</th>
                <th>创建时间</th>
                <th>更新时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="strategy in strategies" :key="strategy.id">
                <td>{{ strategy.name }}</td>
                <td>{{ strategy.type }}</td>
                <td>{{ strategy.priority }}</td>
                <td>
                  <span :class="[
                    'status-badge',
                    strategy.status === 'active' ? 'status-success' : 'status-info'
                  ]">
                    {{ strategy.statusText }}
                  </span>
                </td>
                <td>{{ strategy.createTime }}</td>
                <td>{{ strategy.updateTime }}</td>
                <td>
                  <button class="btn btn-sm btn-primary" @click="editStrategy(strategy)">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn-sm btn-info" @click="viewStrategy(strategy)">
                    <i class="fas fa-eye"></i>
                  </button>
                  <button class="btn btn-sm btn-success" @click="activateStrategy(strategy)">
                    <i class="fas fa-play"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <!-- 策略配置 -->
    <div class="card mb-4">
      <div class="card-header">
        <i class="fas fa-cogs mr-2"></i>
        策略配置
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-4">
            <div class="form-group">
              <label>策略名称</label>
              <input type="text" class="form-control" v-model="strategyForm.name" placeholder="输入策略名称">
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label>策略类型</label>
              <select class="form-select" v-model="strategyForm.type">
                <option value="economic">经济调度</option>
                <option value="security">安全调度</option>
                <option value="environmental">环保调度</option>
                <option value="comprehensive">综合调度</option>
              </select>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label>优先级</label>
              <select class="form-select" v-model="strategyForm.priority">
                <option value="1">1 (最高)</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5 (最低)</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-12">
            <div class="form-group">
              <label>策略描述</label>
              <textarea class="form-control" rows="3" v-model="strategyForm.description" placeholder="输入策略描述"></textarea>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-6">
            <div class="form-group">
              <label>触发条件</label>
              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="trigger-load" v-model="strategyForm.triggers.load">
                <label class="form-check-label" for="trigger-load">负载阈值</label>
              </div>
              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="trigger-price" v-model="strategyForm.triggers.price">
                <label class="form-check-label" for="trigger-price">电价波动</label>
              </div>
              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="trigger-renewable" v-model="strategyForm.triggers.renewable">
                <label class="form-check-label" for="trigger-renewable">新能源出力</label>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label>执行动作</label>
              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="action-storage" v-model="strategyForm.actions.storage">
                <label class="form-check-label" for="action-storage">储能充放电</label>
              </div>
              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="action-gas" v-model="strategyForm.actions.gas">
                <label class="form-check-label" for="action-gas">燃气轮机启停</label>
              </div>
              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="action-demand" v-model="strategyForm.actions.demand">
                <label class="form-check-label" for="action-demand">需求响应</label>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <button class="btn btn-primary" @click="saveStrategy">
            <i class="fas fa-save mr-2"></i>
            保存策略
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 策略数据
const strategies = ref([
  {
    id: 1,
    name: '经济调度策略',
    type: '经济调度',
    priority: 1,
    status: 'active',
    statusText: '活跃',
    createTime: '2024-01-18 15:30',
    updateTime: '2024-01-19 10:00'
  },
  {
    id: 2,
    name: '安全调度策略',
    type: '安全调度',
    priority: 2,
    status: 'inactive',
    statusText: '非活跃',
    createTime: '2024-01-17 10:00',
    updateTime: '2024-01-18 15:30'
  },
  {
    id: 3,
    name: '环保调度策略',
    type: '环保调度',
    priority: 3,
    status: 'inactive',
    statusText: '非活跃',
    createTime: '2024-01-16 09:00',
    updateTime: '2024-01-17 10:00'
  }
])

// 编辑策略
const editStrategy = (strategy) => {
  console.log('编辑策略:', strategy)
}

// 查看策略
const viewStrategy = (strategy) => {
  console.log('查看策略:', strategy)
}

// 激活策略
const activateStrategy = (strategy) => {
  console.log('激活策略:', strategy)
}

// 添加策略
const addStrategy = () => {
  console.log('添加策略')
  // 这里可以添加添加策略的逻辑
}

// 刷新数据
const refreshData = () => {
  console.log('刷新数据')
  // 这里可以添加刷新数据的逻辑
}

// 导出策略
const exportStrategies = () => {
  console.log('导出策略')
  // 这里可以添加导出策略的逻辑
}

// 保存策略
const saveStrategy = () => {
  console.log('保存策略')
  // 这里可以添加保存策略的逻辑
}

// 策略表单数据
const strategyForm = ref({
  name: '',
  type: 'economic',
  priority: '1',
  description: '',
  triggers: {
    load: false,
    price: false,
    renewable: false
  },
  actions: {
    storage: false,
    gas: false,
    demand: false
  }
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

.status-info {
  background-color: rgba(26, 115, 232, 0.1);
  color: #1a73e8;
}
</style>