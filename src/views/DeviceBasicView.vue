<template>
  <div id="device-basic" class="page-section">
    <div class="page-title">
      <i class="fas fa-cog"></i>
      设备基础管理
    </div>
    <div class="mb-4">
      <button class="btn btn-primary" @click="addDevice">
        <i class="fas fa-plus mr-2"></i>
        添加设备
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
    
    <!-- 搜索和筛选 -->
    <div class="card mb-4">
      <div class="card-body">
        <div class="row">
          <div class="col-md-3">
            <div class="form-group">
              <label>搜索设备</label>
              <div class="input-group">
                <input type="text" class="form-control" placeholder="输入设备名称或编号">
                <div class="input-group-append">
                  <button class="btn btn-primary">
                    <i class="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-2">
            <div class="form-group">
              <label>数据中心</label>
              <select class="form-select">
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
              <select class="form-select">
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
              <select class="form-select">
                <option value="">全部状态</option>
                <option value="online">在线</option>
                <option value="offline">离线</option>
                <option value="warning">警告</option>
              </select>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label>排序方式</label>
              <select class="form-select">
                <option value="name">按名称</option>
                <option value="status">按状态</option>
                <option value="type">按类型</option>
                <option value="datacenter">按数据中心</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 设备列表 -->
    <div class="card mb-4">
      <div class="card-header">
        <i class="fas fa-list-alt mr-2"></i>
        设备列表
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>设备编号</th>
                <th>设备名称</th>
                <th>数据中心</th>
                <th>设备类型</th>
                <th>状态</th>
                <th>厂商</th>
                <th>型号</th>
                <th>IP地址</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="device in devices" :key="device.id">
                <td>{{ device.id }}</td>
                <td>{{ device.name }}</td>
                <td>{{ device.datacenter }}</td>
                <td>{{ device.type }}</td>
                <td>
                  <span class="status-badge status-success">{{ device.status }}</span>
                </td>
                <td>{{ device.manufacturer }}</td>
                <td>{{ device.model }}</td>
                <td>{{ device.ip }}</td>
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

// 设备数据
const devices = ref([
  {
    id: 'DEV001',
    name: '服务器A',
    datacenter: '北区数据中心A',
    type: '服务器',
    status: '在线',
    manufacturer: '华为',
    model: 'RH2288H V5',
    ip: '192.168.1.101'
  },
  {
    id: 'DEV002',
    name: '服务器B',
    datacenter: '南区数据中心B',
    type: '服务器',
    status: '在线',
    manufacturer: '华为',
    model: 'RH2288H V5',
    ip: '192.168.1.102'
  },
  {
    id: 'DEV003',
    name: '服务器C',
    datacenter: '东区数据中心C',
    type: '服务器',
    status: '在线',
    manufacturer: '华为',
    model: 'RH2288H V5',
    ip: '192.168.1.103'
  },
  {
    id: 'DEV004',
    name: '服务器D',
    datacenter: '西区数据中心D',
    type: '服务器',
    status: '在线',
    manufacturer: '华为',
    model: 'RH2288H V5',
    ip: '192.168.1.104'
  },
  {
    id: 'DEV005',
    name: '服务器E',
    datacenter: '北区数据中心E',
    type: '服务器',
    status: '在线',
    manufacturer: '华为',
    model: 'RH2288H V5',
    ip: '192.168.1.105'
  },
  {
    id: 'DEV006',
    name: '服务器F',
    datacenter: '南区数据中心F',
    type: '服务器',
    status: '在线',
    manufacturer: '华为',
    model: 'RH2288H V5',
    ip: '192.168.1.106'
  },
  {
    id: 'DEV007',
    name: '服务器G',
    datacenter: '东区数据中心G',
    type: '服务器',
    status: '在线',
    manufacturer: '华为',
    model: 'RH2288H V5',
    ip: '192.168.1.107'
  },
  {
    id: 'DEV008',
    name: '服务器H',
    datacenter: '西区数据中心H',
    type: '服务器',
    status: '在线',
    manufacturer: '华为',
    model: 'RH2288H V5',
    ip: '192.168.1.108'
  },
  {
    id: 'DEV009',
    name: '服务器I',
    datacenter: '北区数据中心I',
    type: '服务器',
    status: '在线',
    manufacturer: '华为',
    model: 'RH2288H V5',
    ip: '192.168.1.109'
  },
  {
    id: 'DEV010',
    name: '服务器J',
    datacenter: '南区数据中心J',
    type: '服务器',
    status: '在线',
    manufacturer: '华为',
    model: 'RH2288H V5',
    ip: '192.168.1.110'
  }
])

// 操作函数
const addDevice = () => {
  console.log('添加设备')
  // 这里可以添加添加设备的逻辑
}

const refreshData = () => {
  console.log('刷新数据')
  // 这里可以添加刷新数据的逻辑
}

const exportData = () => {
  console.log('导出数据')
  // 这里可以添加导出数据的逻辑
}

const editDevice = (device) => {
  console.log('编辑设备:', device)
  // 这里可以添加编辑设备的逻辑
}

const viewDevice = (device) => {
  console.log('查看设备详情:', device)
  // 这里可以添加查看设备详情的逻辑
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