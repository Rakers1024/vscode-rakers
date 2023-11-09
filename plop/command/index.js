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

    //创建时间
    let date = new Date();
    let year = date.getFullYear();
    let month = (date.getMonth() + 1 + "").padStart(2, "0");
    let day = (date.getDate() + "").padStart(2, "0");
    let hour = (date.getHours() + "").padStart(2, "0");
    let minute = (date.getMinutes() + "").padStart(2, "0");
    let createTime = `${year}-${month}-${day} ${hour}:${minute}`;

    const actions = [];
    // 使用json读取并添加commands
    actions.push({
      type: "modify",
      path: "package.json",
      transform: (file, _) => {
        const json = JSON.parse(file);
        json.contributes.commands.push({
          title: commandTitle,
          command: `vscode-rakers.${commandType}`,
        });
        return JSON.stringify(json, null, 2);
      },
    });

    // 生成文件
    actions.push({
      type: "add",
      path: "src/extensions/{{commandType}}.ts",
      templateFile: "plop/command/extension.ts.hbs",
      data: {
        commandType,
        commandTitle,
        createTime,
      },
    });

    return actions;
  },
};
