let fs = require('fs');
let exec = require('child_process').execSync;
let path = require('path');

let t_ts = process.uptime();

let t_root = "D:\\work\\client\\sanguoclient"; //项目根目录
let myWebPath = "D:\\work\\client\\myWeb"; //本地web目录

console.log("开始发布项目...请耐心等候编译...");

let buff = exec("cd " + t_root + " && egret publish");
console.log(buff.toString());

let t_timeCompile = process.uptime() - t_ts;
console.log("编译完成，耗时：" + t_timeCompile + "s");

console.log("复制相关文件到web目录...");

t_ts = process.uptime();

let releasePath = path.join(t_root, "/bin-release/web");
let t_soureFileList =
    [
        ["manifest.json", "v_common"],
        ["resource/default.res.json", "resource/v_common"],
        ["js", "js"],
        ["resource", "resource"]
    ];

//遍历本地发布目录，找出最新的发布目录
let t_lastestDir = walkDirAndFindLastestDir(releasePath);

//xcopy %ROOTDIR%\copyTestDir\*.* %ROOTDIR%\copyTestDir2 /s/y/i
for (let i = 0; i < t_soureFileList.length; i++) {
    let t_sourcePath = path.resolve(path.join(t_lastestDir, t_soureFileList[i][0]));
    let t_destPath = path.resolve(path.join(myWebPath, t_soureFileList[i][1]));
    console.log("复制 " + t_sourcePath + "...");
    // console.log(t_destPath);

    if (fs.statSync(t_sourcePath).isFile())
        copyFile(t_sourcePath, t_destPath);
    else
        copyDir(t_sourcePath, t_destPath);
    console.log("ok");

}

console.log("本地发布版本已经全部复制到myWeb文件夹...");
let t_timeCopy = process.uptime() - t_ts;
console.log("复制文件耗时：" + t_timeCopy + "s");
console.log("总耗时：" + (t_timeCompile + t_timeCopy) + "s");




//======================= function =======================
function walkDirAndFindLastestDir(pDir) {
    let t_ctimeMs = 0;
    let t_resultPath = "";
    fs.readdirSync(pDir).forEach((pFileName) => {
        let t_path = pDir + "\\" + pFileName;
        let t_stat = fs.statSync(t_path);
        if (t_stat.isDirectory()) {
            if (t_stat.ctimeMs > t_ctimeMs) {
                t_ctimeMs = t_stat.ctimeMs;
                t_resultPath = t_path;
            }
        }
    });
    return t_resultPath;
}

function copyFile(pSourceFile, pDestDir) {
    let t_pathSource = path.resolve(pSourceFile);
    let t_pathDest = path.resolve(pDestDir);
    //调用操作系统的复制命令
    let t_cmdStr = "xcopy " + t_pathSource + " " + t_pathDest + "\\" + " /s/y/i";
    exec(t_cmdStr);
}

function copyDir(pSourceDir, pDestDir) {
    let t_pathSource = path.resolve(pSourceDir);
    let t_pathDest = path.resolve(pDestDir);
    //调用操作系统的复制命令
    let t_cmdStr = "xcopy " + t_pathSource + "\\*.* " + t_pathDest + "\\" + " /s/y/i";
    exec(t_cmdStr);
}