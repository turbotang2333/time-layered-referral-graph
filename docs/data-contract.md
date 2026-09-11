# 数据契约

这个前端模板只依赖一份静态 JSON。后端可以来自数据库、日志、表格或任何系统，只要最终输出同一种结构即可。

## 最小结构

```json
{
  "generatedAt": "2026-09-11T00:16:00+08:00",
  "nodes": [
    {
      "id": "n_001",
      "parent": null,
      "submittedAt": "2026-09-10 19:20:00",
      "label": "A001"
    }
  ]
}
```

## 字段说明

| 字段 | 类型 | 必填 | 说明 |
|---|---|---:|---|
| `generatedAt` | string | 是 | 数据快照生成时间 |
| `nodes` | array | 是 | 节点列表 |
| `nodes[].id` | string | 是 | 公开节点 ID，应不可反推真实身份 |
| `nodes[].parent` | string/null | 是 | 上级节点 ID；入口节点为 `null` |
| `nodes[].submittedAt` | string | 是 | 事件发生时间，建议精确到分钟 |
| `nodes[].label` | string | 否 | 节点展示短标签 |

## 后端只需要保证

1. `id` 唯一；
2. `parent` 要么为空，要么指向已有节点；
3. `submittedAt` 可被浏览器解析；
4. 公开 JSON 不包含敏感信息。

## 前端负责

1. 根据 `parent` 计算层级；
2. 根据 `submittedAt` 计算纵向时间位置；
3. 根据下级数量计算节点大小和颜色深浅；
4. 根据点击状态高亮上下游链路；
5. 根据缩放状态处理密集节点错开和入口聚合。
