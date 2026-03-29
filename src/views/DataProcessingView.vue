<template>
  <div class="data-processing-view">
    <div class="page-title">
      <i class="fas fa-database"></i>
      数据处理
    </div>
    <div class="mb-4">
      <button class="btn btn-primary">
        <i class="fas fa-upload mr-2"></i>
        导入历史数据
      </button>
      <button class="btn btn-success">
        <i class="fas fa-sync-alt mr-2"></i>
        数据预处理
      </button>
      <button class="btn btn-warning">
        <i class="fas fa-download mr-2"></i>
        导出数据
      </button>
    </div>
    
    <!-- 历史负荷数据导入 -->
    <div class="card mb-6 shadow-sm">
      <div class="card-header bg-white border-bottom">
        <i class="fas fa-file-import mr-2 text-primary"></i>
        <h5 class="mb-0 font-weight-bold">历史负荷数据导入</h5>
      </div>
      <div class="card-body">
        <div class="row mb-4">
          <div class="col-md-6">
            <div class="form-group">
              <label class="font-weight-medium">导入文件</label>
              <div class="input-group">
                <input type="file" class="form-control" accept=".xlsx,.csv">
                <div class="input-group-append">
                  <button class="btn btn-primary">
                    <i class="fas fa-upload"></i>
                  </button>
                </div>
              </div>
              <small class="form-text text-muted">支持 Excel 和 CSV 格式</small>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label class="font-weight-medium">数据来源</label>
              <select class="form-select">
                <option value="manual">手动上传</option>
                <option value="api">API 接口</option>
                <option value="database">数据库</option>
              </select>
            </div>
          </div>
        </div>
        <div class="mt-6">
          <h6 class="fw-bold mb-3 border-bottom pb-2">最近导入记录</h6>
          <div class="table-responsive">
            <table class="table table-sm table-hover">
              <thead class="bg-light">
                <tr>
                  <th>文件名</th>
                  <th>导入时间</th>
                  <th>数据量</th>
                  <th>状态</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>load_data_20240119.xlsx</td>
                  <td>2024-01-19 10:00</td>
                  <td>10,000条</td>
                  <td><span class="status-badge status-success">成功</span></td>
                </tr>
                <tr>
                  <td>load_data_20240118.csv</td>
                  <td>2024-01-18 15:30</td>
                  <td>8,500条</td>
                  <td><span class="status-badge status-success">成功</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 数据预处理配置 -->
    <div class="card mb-6 shadow-sm">
      <div class="card-header bg-white border-bottom">
        <i class="fas fa-cogs mr-2 text-primary"></i>
        <h5 class="mb-0 font-weight-bold">数据预处理配置</h5>
      </div>
      <div class="card-body">
        <div class="row mb-6">
          <div class="col-md-4">
            <div class="form-group">
              <label class="font-weight-medium">缺失值填充</label>
              <select class="form-select">
                <option value="mean">均值填充</option>
                <option value="median">中位数填充</option>
                <option value="linear">线性插值</option>
              </select>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label class="font-weight-medium">异常值剔除</label>
              <select class="form-select">
                <option value="iqr">IQE 方法</option>
                <option value="zscore">Z-Score 方法</option>
                <option value="none">不剔除</option>
              </select>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label class="font-weight-medium">数据归一化</label>
              <select class="form-select">
                <option value="minmax">Min-Max 归一化</option>
                <option value="standard">标准化</option>
                <option value="none">不归一化</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 季节数据划分 -->
    <div class="card mb-6 shadow-sm">
      <div class="card-header bg-white border-bottom">
        <i class="fas fa-calendar-alt mr-2 text-primary"></i>
        <h5 class="mb-0 font-weight-bold">季节数据划分</h5>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <div class="form-check mb-4">
                <input type="checkbox" class="form-check-input" id="seasonal-divide" checked>
                <label class="form-check-label font-weight-medium" for="seasonal-divide">启用季节数据划分</label>
              </div>
              <div class="row">
                <div class="col-md-3">
                  <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="spring" checked>
                    <label class="form-check-label" for="spring">春季</label>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="summer" checked>
                    <label class="form-check-label" for="summer">夏季</label>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="autumn" checked>
                    <label class="form-check-label" for="autumn">秋季</label>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="winter" checked>
                    <label class="form-check-label" for="winter">冬季</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 特征向量配置 -->
    <div class="card mb-6 shadow-sm">
      <div class="card-header bg-white border-bottom">
        <i class="fas fa-feather mr-2 text-primary"></i>
        <h5 class="mb-0 font-weight-bold">特征向量配置</h5>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <p class="text-muted mb-4">选择用于预测模型的特征向量</p>
              <div class="row">
                <div class="col-md-2">
                  <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="temp" checked>
                    <label class="form-check-label" for="temp">温度</label>
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="humidity" checked>
                    <label class="form-check-label" for="humidity">湿度</label>
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="time" checked>
                    <label class="form-check-label" for="time">时间</label>
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="dayofweek">
                    <label class="form-check-label" for="dayofweek">星期几</label>
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="holiday">
                    <label class="form-check-label" for="holiday">节假日</label>
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="weather">
                    <label class="form-check-label" for="weather">天气</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 数据集管理 -->
    <div class="card mb-6 shadow-sm">
      <div class="card-header bg-white border-bottom">
        <i class="fas fa-layer-group mr-2 text-primary"></i>
        <h5 class="mb-0 font-weight-bold">数据集管理</h5>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-3">
            <div class="form-group">
              <label class="font-weight-medium">训练集比例</label>
              <div class="slider-container mt-2">
                <input type="range" min="50" max="90" value="70" class="form-range">
                <input type="number" value="70" class="form-control" style="width: 80px;">
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label class="font-weight-medium">验证集比例</label>
              <div class="slider-container mt-2">
                <input type="range" min="5" max="30" value="15" class="form-range">
                <input type="number" value="15" class="form-control" style="width: 80px;">
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label class="font-weight-medium">测试集比例</label>
              <div class="slider-container mt-2">
                <input type="range" min="5" max="30" value="15" class="form-range">
                <input type="number" value="15" class="form-control" style="width: 80px;">
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label class="font-weight-medium">操作</label>
              <button class="btn btn-primary w-100 mt-2">
                <i class="fas fa-check mr-2"></i>
                应用配置
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 数据处理组件
</script>

<style scoped>
</style>