module.exports = {
  description: "创建command",
  prompts: [
    {
      type: "input",
      name: "commandTitle",
      message: "请输入command标题（如：复制名称）:",
    },
    {
      type: "input",
      name: "commandType",
      message: "请输入command值（如：copyFileName）:",
    },
  ],
  actions: data => {
    let { commandType, commandTitle } = data;

    if (!commandType) {
      console.log("请填写完整!");
      return [];
    }

    const actions = [];
    //tag
    actions.push({
      type: "modify",
      path: "../../package.json",
      pattern: /(("commands": \[[\s\S]*?)\n\s*(\]))(?=\n)/,
      template: `$2,\n{
        "title": "${commandTitle}",
        "command": "vscode-rakers.${commandType}"
      },\n$3`,
    });

    return actions;
  },
};
