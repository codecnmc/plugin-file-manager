<!--
 * @Author: 羊驼
 * @Date: 2025-08-07 09:28:35
 * @LastEditors: 羊驼
 * @LastEditTime: 2025-08-19 16:55:19
 * @Description: file content
-->
<template>
  <div>
    <router-view />
    <messages v-model="messages" />
    <v-dialog
      v-model="confirm.visible"
      width="400px"
    >
      <v-card color="white">
        <v-card-title class="d-flex justify-space-between">
          <span>{{confirm.title}}</span>
          <v-icon
            size="24"
            class="cursor-pointer"
            @click="confirm.close"
          >mdi-close</v-icon>
        </v-card-title>
        <v-card-text>
          {{confirm.content}}
        </v-card-text>
        <v-card-actions class="pa-4 d-flex justify-end">
          <v-btn
            flat
            @click="confirm.close"
          >取消</v-btn>
          <v-btn
            color="primary"
            @click="confirm.submit"
          >确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import api from "@common/api.js";
import Messages from "./components/Messages.vue";
export default {
  components: {
    Messages,
  },
  data() {
    return {
      // 消息
      messages: [],
      // 确认配置
      confirm: {
        visible: false,
        title: "测试",
        content: "测试内容",
        close: () => {},
        submit: () => {},
      },
    };
  },
  provide() {
    return {
      invoke: this.invoke,
      on: this.on,
      remove: this.remove,
      send: this.send,
      api,
      // 提示信息调用
      message: ({ type, message }) => {
        this.messages.push({ type, message });
      },
      // 弹窗确认调用
      showConfirm: ({
        title,
        content,
        close = () => {},
        submit = () => {},
      }) => {
        this.confirm.visible = true;
        this.confirm.title = title;
        this.confirm.content = content;
        let done = () => {
          this.confirm.visible = false;
        };
        this.confirm.close = () => {
          close();
          done();
        };
        this.confirm.submit = () => {
          submit(done);
        };
      },
    };
  },
  methods: {
    // 调用ipc vue3的proxy 会导致对象无法传输 所以序列化一遍
    invoke(command, ...args) {
      let target = JSON.parse(JSON.stringify(args));
      return window.electron.ipcRenderer.invoke(command, ...target);
    },
    // ipcMain.webContents.send事件监听
    on(command, callback) {
      window.electron.ipcRenderer.on(command, callback);
    },
    // 移除事件监听
    remove(command, callback) {
      window.electron.ipcRenderer.remove(command, callback);
    },
    // 发送事件监听给listener 的ipcMain.on 但是后续发现不需要 自己手动在底层brocast进行事件发送
    send(command, ...args) {
      window.electron.ipcRenderer.send(command, ...args);
    },
  },
};
</script>

<style>
:root {
  --radius: 10px;
  --w: 90px;
  --file-item-hover: #eee;
}
body,
html {
  overflow: hidden;
}
body::-webkit-scrollbar {
  display: none;
  /* 隐藏滚动条 */
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  width: 100vw;
  height: 100vh;
  background: transparent !important;
}
</style>
