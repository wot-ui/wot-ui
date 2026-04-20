# 案例

我们非常欢迎大家一起贡献优秀的 Demo 与案例，欢迎在此 [issue](https://github.com/Moonofweisheng/wot-design-uni/issues/16) 提交案例。

Wot UI 已被很多公司和团队在生产环境使用，下面是一些优秀的案例：

<div class="cases-container">
  <el-card v-for="(item, index) in cases" :key="index" shadow="hover">
    <template #header>
      <span class="case-title">{{ item.name }}</span>
      <span class="case-description">{{ item.description }}</span>
    </template>
    <el-image :src="item.image" />
  </el-card>
</div>

<style scoped>
.cases-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 240px));
  justify-content: center;
  gap: 16px;
  margin: 20px 0;
}

:deep(.el-card) {
  border-radius: 10px;
}

:deep(.el-card__header) {
  padding: 14px 16px 10px;
}

:deep(.el-card__body) {
  padding: 0 16px 16px;
}

.case-title {
  font-size: 16px;
  font-weight: 500;
}

.case-description {
  display: block;
  margin-top: 6px;
  font-size: 12px;
  line-height: 1.5;
  color: #999;
}

:deep(.el-card__body .el-image) {
  width: 100%;
  max-width: 208px;
  border-radius: 4px;
}

:deep(.el-card__body .el-image__inner) {
  display: block;
  width: 100%;
  height: auto;
}

@media (max-width: 640px) {
  .cases-container {
    grid-template-columns: minmax(0, 1fr);
    justify-content: stretch;
  }

  :deep(.el-card__body .el-image) {
    max-width: none;
  }
}
</style>

<script setup>
import { useCaseData } from '@wot-ui/vitepress-theme'
const { data:cases } = useCaseData()
</script>
