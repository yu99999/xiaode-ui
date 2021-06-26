
storybook 默认会启用 tree-shaking 所以引入的 less 文件可以在解析 loader 配置 sideEffects: true
css-loader 启用 module: true 会将类名编译为哈希字符串