[中文](README.md) | [English](README.en.md)
<p align="center">
	<img width="200px" height="200px" alt="logo" src="https://gitee.com/sxgan/zoey-open-images/raw/master/common/png/logo-music-wangyiyun-red.png">
</p>
<h1 align="center" style="margin: 30px 0 30px; font-weight: bold;">Zoey Music v1.1.0</h1>
<h4 align="center">A music client based on Electron 28+vite 5+Type Script 5+vue 3+pinia and other technologies</h4>
<p align="center">
	<a href="https://gitee.com/sxgan/zoey-music-boot"><img src="https://img.shields.io/badge/Zoey Music-v1.0.0-brightgreen.svg"></a>
	<a href="https://gitee.com/sxgan/zoey-music-boot/raw/master/LICENSE"><img src="https://img.shields.io/badge/LICENSE-Apache License-red.svg"></a>
</p>
Continuously updating... @sxgan

All resources are from public resources on the Internet and are for learning only

## Introduction to the platform

## Illustration

![review_01.gif](public%2Fdiagram%2Freview_01.gif)

## PROJECT INITIATION

### install dependencies

```sh
npm install
```
### Start the command

`Note`: Dev uses the local environment, Pro is the online environment, the picture is in the cloud, please use the Pro environment to start, the Pro environment will be started and the picture cannot be loaded.
However, it is normal after using build to build, the reason may be related to local development, or you can add images to the local area by yourself, pay attention to modify the path
```shell
npm run pro
```
### build commands
```shell
npm run build
```
Note: The initial boot loading will be slow, and the packaged file is in the `dist-electron/release/` directory, which generally stores the packaged version.
Enter the corresponding installation execution file according to the version, `win-unpacked` is the green version without installation, you can directly run the exe file, and the same is true for other system environments

### resolve process remnants
```shell
TASKKILL /F /IM electron.exe
```

## description of the project structure
```text
+ ├─┬ electron
+ │ ├── electron-env.d.ts             # Electron variable declaration file 
+ │ ├── main.ts                       # Electron main file 
+ │ ├── ipcMain.ts                    # Electron ipcMain file which is used for ipc communication
+ │ └── preload.ts                    # Electron preload scripts
+ │ └── env                           # vite environment variables folder
+ │ └── other                         # vite Other configuration folders, automatic imports, etc
+ │ └── public                        # Electron static resource folders
  ├─┬ src
  │ └── main.ts                       # vue entry ts file
  │ └── App.vue                       # Vue A single page that is used to mount to a index.html
  │ └── vite-env.d.ts                 # vite variable declaration file
  │ └─┬ assets
  │   └── css                         # vue public css folder
  │   └── fonts                       # vue font folder
  │   └── iconfonts                   # vue font icon folder
  │   └── images                      # vue pictures folder
  │ └── components                    # vue Component - A single-page component used to view the directory
  │ └── router                        
  │ │   └── index.ts                  # vue-router Profiles
  │ └── store                         # store the pinia store file directory
  │ └── hooks                         # store the hook public encapsulation method
  │ └── utils                         
  │ │   └── CommonUtils.ts            # vue public ts file common method
  │ │   └── http.ts                   # axios http configuration file
  │ └── views                         # store a single page of vue
  ├── index.html
  ├── electron-builder.json5          # electron build a configuration file
  ├── tsconfig.json                   # TypeScript profiles
  ├── tsconfig.node.json
  ├── package.json                    # dependencies
  └── vite.config.ts                  # vite config file
```
SVG images can be directly placed in the `src/assets/images/common/svg` directory and will be automatically loaded into the `svgplugin.vue` page
## Install the image and some package management tools

1.install the cnpm taobao image
```shell
npm install -g cnpm --registry=https://registry.npm.taobao.org

npm install -g cnpm --registry=https://registry.npmmirror.com
```
2.set npm as a taobao image
```shell
npm config set registry https://registry.npm.taobao.org

npm config set registry https://registry.npmmirror.com
```
3.check the cnpm image settings by npm
```shell
npm config get registry
```
4.View CNPM image settings by CNPM: (equivalent to using CNPM)
```shell
cnpm config get registry
```
5.install yarn
```shell
npm install -g yarn --registry=https://registry.npmmirror.com
```

## build the issue
Note: Use the 'Terminal Administrator' window in 'Win+X' to prevent the download from failing due to permissions

When using `npm run build`, we can't download the GitHub necessary build package, in this case we need to use yarn to build the downloaded package
Generally, it will be on the C drive, and it can be used permanently after building it once, so if you use npm to build it, you won't download it again
```shell 
yarn run build
```
Then you can use `npm run build`, the above command is just for easy download
