<template>
  <div class="task-dispatch-view">
    <div class="page-title">
      <i class="fas fa-tasks"></i>
      任务调度管理
    </div>
    <div class="mb-4">
      <button class="btn btn-primary" @click="addTask">
        <i class="fas fa-plus mr-2"></i>
        添加任务
      </button>
      <button class="btn btn-success" @click="refreshData">
        <i class="fas fa-sync-alt mr-2"></i>
        刷新数据
      </button>
      <button class="btn btn-warning" @click="exportTasks">
        <i class="fas fa-download mr-2"></i>
        导出任务
      </button>
    </div>
    
    <!-- 任务列表 -->
    <div class="card mb-4">
      <div class="card-header">
        <i class="fas fa-list-alt mr-2"></i>
        调度任务列表
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>任务ID</th>
                <th>任务名称</th>
                <th>任务类型</th>
                <th>状态</th>
                <th>优先级</th>
                <th>开始时间</th>
                <th>结束时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="task in tasks" :key="task.id">
                <td>{{ task.id }}</td>
                <td>{{ task.name }}</td>
                <td>{{ task.type }}</td>
                <td>
                  <span :class="[
                    'status-badge',
                    task.status === 'running' ? 'status-success' : 
                    task.status === 'pending' ? 'status-info' : 
                    task.status === 'completed' ? 'status-success' : 'status-danger'
                  ]">
                    {{ task.statusText }}
                  </span>
                </td>
                <td>{{ task.priority }}</td>
                <td>{{ task.startTime }}</td>
                <td>{{ task.endTime }}</td>
                <td>
                  <button class="btn btn-sm btn-primary" @click="editTask(task)">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn-sm btn-info" @click="viewTask(task)">
                    <i class="fas fa-eye"></i>
                  </button>
                  <button class="btn btn-sm btn-success" @click="startTask(task)">
                    <i class="fas fa-play"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <!-- 任务配置 -->
    <div class="card mb-4">
      <div class="card-header">
        <i class="fas fa-cogs mr-2"></i>
        任务配置
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-4">
            <div class="form-group">
              <label>任务名称</label>
              <input type="text" class="form-control" v-model="taskForm.name" placeholder="输入任务名称">
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label>任务类型</label>
              <select class="form-select" v-model="taskForm.type">
                <option value="dispatch">电力调度</option>
                <option value="forecast">负荷预测</option>
                <option value="analysis">潜力分析</option>
                <option value="maintenance">设备维护</option>
              </select>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label>优先级</label>
              <select class="form-select" v-model="taskForm.priority">
                <option value="high">高</option>
                <option value="medium">中</option>
                <option value="low">低</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-6">
            <div class="form-group">
              <label>开始时间</label>
              <input type="datetime-local" class="form-control" v-model="taskForm.startTime">
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label>结束时间</label>
              <input type="datetime-local" class="form-control" v-model="taskForm.endTime">
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-12">
            <div class="form-group">
              <label>任务描述</label>
              <textarea class="form-control" rows="3" v-model="taskForm.description" placeholder="输入任务描述"></textarea>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-6">
            <div class="form-group">
              <label>执行策略</label>
              <select class="form-select" v-model="taskForm.strategy">
                <option value="economic">经济调度策略</option>
                <option value="security">安全调度策略</option>
                <option value="environmental">环保调度策略</option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label>执行设备</label>
              <select class="form-select" v-model="taskForm.equipment">
                <option value="all">所有设备</option>
                <option value="storage">储能设备</option>
                <option value="gas">燃气轮机</option>
                <option value="renewable">新能源设备</option>
              </select>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <button class="btn btn-primary" @click="saveTask">
            <i class="fas fa-save mr-2"></i>
            保存任务
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 任务数据
const tasks = ref([
  {
    id: 'TASK001',
    name: '经济调度任务',
    type: '电力调度',
    status: 'running',
    statusText: '运行中',
    priority: '高',
    startTime: '2024-01-19 10:00',
    endTime: '2024-01-19 11:00'
  },
  {
    id: 'TASK002',
    name: '负荷预测任务',
    type: '负荷预测',
    status: 'pending',
    statusText: '待执行',
    priority: '中',
    startTime: '2024-01-19 12:00',
    endTime: '2024-01-19 13:00'
  },
  {
    id: 'TASK003',
    name: '潜力分析任务',
    type: '潜力分析',
    status: 'completed',
    statusText: '已完成',
    priority: '低',
    startTime: '2024-01-18 15:00',
    endTime: '2024-01-18 16:00'
  }
])

// 编辑任务
const editTask = (task) => {
  console.log('编辑任务:', task)
}

// 查看任务
const viewTask = (task) => {
  console.log('查看任务:', task)
}

// 开始任务
const startTask = (task) => {
  console.log('开始任务:', task)
}

// 添加任务
const addTask = () => {
  console.log('添加任务')
  // 这里可以添加添加任务的逻辑
}

// 刷新数据
const refreshData = () => {
  console.log('刷新数据')
  // 这里可以添加刷新数据的逻辑
}

// 导出任务
const exportTasks = () => {
  console.log('导出任务')
  // 这里可以添加导出任务的逻辑
}

// 保存任务
const saveTask = () => {
  console.log('保存任务')
  // 这里可以添加保存任务的逻辑
}

// 任务表单数据
const taskForm = ref({
  name: '',
  type: 'dispatch',
  priority: 'medium',
  startTime: '',
  endTime: '',
  description: '',
  strategy: 'economic',
  equipment: 'all'
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

.status-danger {
  background-color: rgba(234, 67, 53, 0.1);
  color: #ea4335;
}
</style>