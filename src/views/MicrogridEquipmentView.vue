<template>
  <div class="microgrid-equipment-view">
    <div class="page-title">
      <i class="fas fa-network-wired"></i>
      微网设备管理
    </div>
    <div class="mb-4">
      <button class="btn btn-primary" @click="addDevice">
        <i class="fas fa-plus mr-2"></i>
        添加微网设备
      </button>
      <button class="btn btn-success" @click="refreshData">
        <i class="fas fa-sync-alt mr-2"></i>
        刷新数据
      </button>
      <button class="btn btn-warning" @click="exportData">
        <i class="fas fa-download mr-2"></i>
        导出数据
      </button>
    </div>
    
    <!-- 微网设备概览 -->
    <div class="row mb-4">
      <div class="col-md-3">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-solar-system"></i>
          </div>
          <div class="stat-value">5</div>
          <div class="stat-label">新能源设备</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-battery-three-quarters"></i>
          </div>
          <div class="stat-value">3</div>
          <div class="stat-label">储能设备</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-gas-pump"></i>
          </div>
          <div class="stat-value">2</div>
          <div class="stat-label">燃气轮机</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-bolt"></i>
          </div>
          <div class="stat-value">1000 kW</div>
          <div class="stat-label">新能源总出力</div>
        </div>
      </div>
    </div>
    
    <!-- 新能源设备管理 -->
    <div class="card mb-4">
      <div class="card-header">
        <i class="fas fa-solar-system mr-2"></i>
        新能源设备管理
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>设备编号</th>
                <th>设备名称</th>
                <th>设备类型</th>
                <th>状态</th>
                <th>当前出力</th>
                <th>额定功率</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="device in renewableDevices" :key="device.id">
                <td>{{ device.id }}</td>
                <td>{{ device.name }}</td>
                <td>{{ device.type }}</td>
                <td>
                  <span :class="[
                    'status-badge',
                    device.status === 'running' ? 'status-success' : 'status-danger'
                  ]">
                    {{ device.statusText }}
                  </span>
                </td>
                <td>{{ device.currentOutput }}</td>
                <td>{{ device.ratedPower }}</td>
                <td>
                  <button class="btn btn-sm btn-primary" @click="editDevice(device)">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn-sm btn-info" @click="viewDevice(device)">
                    <i class="fas fa-eye"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <!-- 储能设备管理 -->
    <div class="card mb-4">
      <div class="card-header">
        <i class="fas fa-battery-three-quarters mr-2"></i>
        储能设备管理
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>设备编号</th>
                <th>设备名称</th>
                <th>状态</th>
                <th>当前SOC</th>
                <th>额定容量</th>
                <th>充电功率</th>
                <th>放电功率</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="device in storageDevices" :key="device.id">
                <td>{{ device.id }}</td>
                <td>{{ device.name }}</td>
                <td>
                  <span :class="[
                    'status-badge',
                    device.status === 'running' ? 'status-success' : 'status-danger'
                  ]">
                    {{ device.statusText }}
                  </span>
                </td>
                <td>{{ device.currentSOC }}</td>
                <td>{{ device.ratedCapacity }}</td>
                <td>{{ device.chargePower }}</td>
                <td>{{ device.dischargePower }}</td>
                <td>
                  <button class="btn btn-sm btn-primary" @click="editDevice(device)">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn-sm btn-info" @click="viewDevice(device)">
                    <i class="fas fa-eye"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <!-- 燃气轮机配置 -->
    <div class="card mb-4">
      <div class="card-header">
        <i class="fas fa-gas-pump mr-2"></i>
        燃气轮机配置
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>设备编号</th>
                <th>设备名称</th>
                <th>状态</th>
                <th>当前出力</th>
                <th>出力范围</th>
                <th>启停参数</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="device in gasTurbines" :key="device.id">
                <td>{{ device.id }}</td>
                <td>{{ device.name }}</td>
                <td>
                  <span :class="[
                    'status-badge',
                    device.status === 'running' ? 'status-success' : 
                    device.status === 'standby' ? 'status-info' : 'status-danger'
                  ]">
                    {{ device.statusText }}
                  </span>
                </td>
                <td>{{ device.currentOutput }}</td>
                <td>{{ device.outputRange }}</td>
                <td>{{ device.startStopParams }}</td>
                <td>
                  <button class="btn btn-sm btn-primary" @click="editDevice(device)">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn-sm btn-info" @click="viewDevice(device)">
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
import { ref } from 'vue'

// 新能源设备数据
const renewableDevices = ref([
  {
    id: 'PV001',
    name: '光伏阵列A',
    type: '光伏',
    status: 'running',
    statusText: '运行中',
    currentOutput: '500 kW',
    ratedPower: '600 kW'
  },
  {
    id: 'PV002',
    name: '光伏阵列B',
    type: '光伏',
    status: 'running',
    statusText: '运行中',
    currentOutput: '400 kW',
    ratedPower: '500 kW'
  },
  {
    id: 'WT001',
    name: '风机A',
    type: '风电',
    status: 'running',
    statusText: '运行中',
    currentOutput: '300 kW',
    ratedPower: '400 kW'
  }
])

// 储能设备数据
const storageDevices = ref([
  {
    id: 'BAT001',
    name: '储能系统A',
    status: 'running',
    statusText: '运行中',
    currentSOC: '65%',
    ratedCapacity: '500 kWh',
    chargePower: '200 kW',
    dischargePower: '200 kW'
  },
  {
    id: 'BAT002',
    name: '储能系统B',
    status: 'running',
    statusText: '运行中',
    currentSOC: '70%',
    ratedCapacity: '300 kWh',
    chargePower: '150 kW',
    dischargePower: '150 kW'
  }
])

// 燃气轮机数据
const gasTurbines = ref([
  {
    id: 'GT001',
    name: '燃气轮机A',
    status: 'standby',
    statusText: '待机',
    currentOutput: '0 kW',
    outputRange: '0-500 kW',
    startStopParams: '启动时间: 5分钟'
  },
  {
    id: 'GT002',
    name: '燃气轮机B',
    status: 'standby',
    statusText: '待机',
    currentOutput: '0 kW',
    outputRange: '0-300 kW',
    startStopParams: '启动时间: 4分钟'
  }
])

// 编辑设备
const editDevice = (device) => {
  console.log('编辑设备:', device)
}

// 查看设备详情
const viewDevice = (device) => {
  console.log('查看设备详情:', device)
}

// 添加微网设备
const addDevice = () => {
  console.log('添加微网设备')
  // 这里可以添加添加微网设备的逻辑
}

// 刷新数据
const refreshData = () => {
  console.log('刷新数据')
  // 这里可以添加刷新数据的逻辑
}

// 导出数据
const exportData = () => {
  console.log('导出数据')
  // 这里可以添加导出数据的逻辑
}
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