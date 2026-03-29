<template>
  <div id="device-basic" class="page-section">
    <div class="page-title">
      <i class="fas fa-cog"></i>
      设备基础管理
    </div>
    <div class="mb-4">
      <button class="btn btn-primary">
        <i class="fas fa-plus mr-2"></i>
        添加设备
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
              <tr>
                <td>DEV001</td>
                <td>服务器A</td>
                <td>北区数据中心A</td>
                <td>服务器</td>
                <td><span class="status-badge status-success">在线</span></td>
                <td>华为</td>
                <td>RH2288H V5</td>
                <td>192.168.1.101</td>
                <td>
                  <button class="btn btn-sm btn-primary">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn-sm btn-info">
                    <i class="fas fa-eye"></i>
                  </button>
                </td>
              </tr>
              <tr>
                <td>DEV002</td>
                <td>服务器B</td>
                <td>南区数据中心B</td>
                <td>服务器</td>
                <td><span class="status-badge status-success">在线</span></td>
                <td>华为</td>
                <td>RH2288H V5</td>
                <td>192.168.1.102</td>
                <td>
                  <button class="btn btn-sm btn-primary">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn-sm btn-info">
                    <i class="fas fa-eye"></i>
                  </button>
                </td>
              </tr>
              <tr>
                <td>DEV003</td>
                <td>服务器C</td>
                <td>东区数据中心C</td>
                <td>服务器</td>
                <td><span class="status-badge status-success">在线</span></td>
                <td>华为</td>
                <td>RH2288H V5</td>
                <td>192.168.1.103</td>
                <td>
                  <button class="btn btn-sm btn-primary">
                    <i class="fas fa-edit"></i>
                  </button>
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
// 设备基础管理组件
</script>

<style scoped>
/* 可以添加组件特定的样式 */
</style>