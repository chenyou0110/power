<template>
  <div class="user-permission-view">
    <div class="page-title">
      <i class="fas fa-users-cog"></i>
      用户权限管理
    </div>
    <div class="mb-4">
      <button class="btn btn-primary" @click="addUser">
        <i class="fas fa-plus mr-2"></i>
        添加用户
      </button>
      <button class="btn btn-success" @click="refreshData">
        <i class="fas fa-sync-alt mr-2"></i>
        刷新数据
      </button>
      <button class="btn btn-warning" @click="exportUsers">
        <i class="fas fa-download mr-2"></i>
        导出用户
      </button>
    </div>
    
    <!-- 用户列表 -->
    <div class="card mb-4">
      <div class="card-header">
        <i class="fas fa-users mr-2"></i>
        用户列表
      </div>
      <div class="card-body">
        <div class="row mb-4">
          <div class="col-md-4">
            <div class="form-group">
              <label>搜索用户</label>
              <div class="input-group">
                <input type="text" class="form-control" v-model="searchQuery" placeholder="输入用户名或邮箱">
                <div class="input-group-append">
                  <button class="btn btn-primary" @click="searchUsers">
                    <i class="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label>角色筛选</label>
              <select class="form-select" v-model="filterRole">
                <option value="">所有角色</option>
                <option value="admin">管理员</option>
                <option value="operator">操作员</option>
                <option value="viewer">查看员</option>
              </select>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label>状态筛选</label>
              <select class="form-select" v-model="filterStatus">
                <option value="">所有状态</option>
                <option value="active">活跃</option>
                <option value="inactive">非活跃</option>
              </select>
            </div>
          </div>
          <div class="col-md-2">
            <div class="form-group">
              <label>操作</label>
              <button class="btn btn-primary w-100" @click="filterUsers">
                <i class="fas fa-filter mr-1"></i> 筛选
              </button>
            </div>
          </div>
        </div>
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>用户ID</th>
                <th>用户名</th>
                <th>邮箱</th>
                <th>角色</th>
                <th>状态</th>
                <th>创建时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.role }}</td>
                <td>
                  <span :class="['status-badge', user.status === 'active' ? 'status-success' : 'status-info']">
                    {{ user.statusText }}
                  </span>
                </td>
                <td>{{ user.createTime }}</td>
                <td>
                  <button class="btn btn-sm btn-primary" @click="editUser(user)">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn-sm btn-info" @click="viewUser(user)">
                    <i class="fas fa-eye"></i>
                  </button>
                  <button class="btn btn-sm btn-danger" @click="deleteUser(user)">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <!-- 角色管理 -->
    <div class="card mb-4">
      <div class="card-header">
        <i class="fas fa-user-shield mr-2"></i>
        角色管理
      </div>
      <div class="card-body">
        <div class="mb-4">
          <button class="btn btn-primary" @click="addRole">
            <i class="fas fa-plus mr-2"></i>
            添加角色
          </button>
        </div>
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>角色名称</th>
                <th>描述</th>
                <th>用户数量</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="role in roles" :key="role.id">
                <td>{{ role.name }}</td>
                <td>{{ role.description }}</td>
                <td>{{ role.userCount }}</td>
                <td>
                  <button class="btn btn-sm btn-primary" @click="editRole(role)">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn-sm btn-info" @click="viewRole(role)">
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

// 用户数据
const users = ref([
  {
    id: 'USER001',
    username: 'admin',
    email: 'admin@example.com',
    role: '管理员',
    status: 'active',
    statusText: '活跃',
    createTime: '2024-01-01 00:00'
  },
  {
    id: 'USER002',
    username: 'operator',
    email: 'operator@example.com',
    role: '操作员',
    status: 'active',
    statusText: '活跃',
    createTime: '2024-01-02 10:00'
  },
  {
    id: 'USER003',
    username: 'viewer',
    email: 'viewer@example.com',
    role: '查看员',
    status: 'inactive',
    statusText: '非活跃',
    createTime: '2024-01-03 15:00'
  }
])

// 角色数据
const roles = ref([
  {
    id: 'ROLE001',
    name: '管理员',
    description: '拥有所有权限',
    userCount: 1
  },
  {
    id: 'ROLE002',
    name: '操作员',
    description: '拥有操作权限',
    userCount: 1
  },
  {
    id: 'ROLE003',
    name: '查看员',
    description: '仅拥有查看权限',
    userCount: 1
  }
])

// 搜索和筛选
const searchQuery = ref('')
const filterRole = ref('')
const filterStatus = ref('')

// 添加用户
const addUser = () => {
  console.log('添加用户')
  // 这里可以添加添加用户的逻辑
}

// 刷新数据
const refreshData = () => {
  console.log('刷新数据')
  // 这里可以添加刷新数据的逻辑
}

// 导出用户
const exportUsers = () => {
  console.log('导出用户')
  // 这里可以添加导出用户的逻辑
}

// 搜索用户
const searchUsers = () => {
  console.log('搜索用户:', searchQuery.value)
  // 这里可以添加搜索用户的逻辑
}

// 筛选用户
const filterUsers = () => {
  console.log('筛选用户:', {
    role: filterRole.value,
    status: filterStatus.value
  })
  // 这里可以添加筛选用户的逻辑
}

// 编辑用户
const editUser = (user) => {
  console.log('编辑用户:', user)
  // 这里可以添加编辑用户的逻辑
}

// 查看用户
const viewUser = (user) => {
  console.log('查看用户:', user)
  // 这里可以添加查看用户的逻辑
}

// 删除用户
const deleteUser = (user) => {
  console.log('删除用户:', user)
  // 这里可以添加删除用户的逻辑
}

// 添加角色
const addRole = () => {
  console.log('添加角色')
  // 这里可以添加添加角色的逻辑
}

// 编辑角色
const editRole = (role) => {
  console.log('编辑角色:', role)
  // 这里可以添加编辑角色的逻辑
}

// 查看角色
const viewRole = (role) => {
  console.log('查看角色:', role)
  // 这里可以添加查看角色的逻辑
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

.status-info {
  background-color: rgba(26, 115, 232, 0.1);
  color: #1a73e8;
}
</style>