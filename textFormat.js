export function formatCol(colStr, strsPerLine = 5, quoteType = 1) {
    // 定义引号类型映射
    const quoteMap = {
        1: "'",       // 半角单引号
        2: '"',       // 半角双引号
        3: "N''",     // SQL转义风格（N''）
    };
    // 获取引号类型
    const quoteChar = quoteMap[quoteType] || "'";
    // 处理输入字符串：分割、去空格、过滤空行
    const processed = colStr
        .split('\n')
        .map(str => str.trim())
        .filter(str => str.length > 0);
    // 包裹引号
    const quoted = processed.map(str => {
        // 特殊处理N''格式（需要双单引号）
        if (quoteChar === "N''") {
            return `N'${str.replace(/'/g, "''")}'`;
        }
        return `${quoteChar}${str}${quoteChar}`;
    });
    // 按strsPerLine分块处理
    const chunks = [];
    for (let i = 0; i < quoted.length; i += strsPerLine) {
        const chunk = quoted.slice(i, i + strsPerLine);
        chunks.push(chunk.join(', '));
    }
    // 连接各块（最后一块不加换行符）
    return chunks.join(', \n');
}


