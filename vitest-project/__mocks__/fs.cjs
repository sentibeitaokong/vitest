// 我们可以使用 `import`，但是那样的话
// 每个导出都需要明确定义

const { fs } = require('memfs')

module.exports = fs