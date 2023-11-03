import * as path from "path";
import Mocha from "mocha";
import { glob } from "glob";

export async function run(): Promise<void> {
  // 创建 mocha 测试
  const mocha = new Mocha({
    ui: "tdd",
    color: true,
  });

  const testsRoot = path.resolve(__dirname, "..");
  const files = await glob("**/**.test.js", { cwd: testsRoot });

  // 将文件添加到测试套件中
  files.forEach(f => mocha.addFile(path.resolve(testsRoot, f)));

  try {
    return new Promise<void>((c, e) => {
      // 运行 mocha 测试
      mocha.run(failures => {
        if (failures > 0) {
          e(new Error(`${failures} 个测试失败.`));
        } else {
          c();
        }
      });
    });
  } catch (err) {
    console.error(err);
  }
}
