<template>
  <div class="login-main">
    <div class="login-background">
      <img src="../../assets/login-bg.jpg" class="bg-img" />
    </div>
    <!-- <div class="login-title">后台管理系统-beta1.0.0</div> -->
    <div class="login-container">
      <el-form
        ref="loginRef"
        :model="loginForm"
        :rules="rules"
        :inline="false"
        :status-icon="false"
      >
        <el-form-item class="font-bold text-3xl text-center">
          <span>系统登录</span>
        </el-form-item>
        <el-form-item prop="account">
          <el-input
            v-model:model-value="loginForm.account"
            type="text"
            clearable
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model:model-value="loginForm.password"
            type="password"
            show-password
            clearable
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-col :span="14">
            <el-input
              v-model="loginForm.code"
              clearable
              placeholder="请输入验证码"
            ></el-input>
          </el-col>
          <el-col :span="10">
            <b-verfication-code
              :width="120"
              :verfication="verfication"
              @refreshCanvas="getVerficationCode"
            ></b-verfication-code>
          </el-col>
        </el-form-item>
      </el-form>
      <div class="btn-container">
        <el-button class="login-btn" type="primary" @click="onSubmit">
          登录
        </el-button>
        <p class="tips">还没账号？<span @click="register">去注册</span></p>
      </div>
    </div>
    <a class="license" href="https://www.freepik.com/vectors/background">
      Background vector created by freepik - www.freepik.com
    </a>
  </div>
</template>

<script setup lang="ts">
import { getVerfciation, login, LoginParams } from '@/api/user'
import BVerficationCode from '@/components/BVerficationCode.vue'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const loginRef = ref<HTMLFormElement | null>(null)
let loginForm = ref<LoginParams>({
  account: '',
  password: '',
  code: ''
})

let rules = {
  account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
}

let register = () => {}

const router = useRouter()
// 用户登录
let onSubmit = async () => {
  loginRef?.value?.validate().then(async (valid: boolean) => {
    if (!valid) return
    try {
      let { code, data, msg } = await login(loginForm.value)
      if (code === 200) {
        ElMessage.success(msg)
        console.log(data)
        router.push({ name: 'Layout' })
      }
    } catch (error) {
      console.log(error)
    }
  })
}
// 获取验证码
let verfication = ref('')
let getVerficationCode = () => {
  getVerfciation().then((res) => {
    console.log(res)
    verfication.value = res.data.code
  })
}
</script>

<style lang="scss" scoped>
.login-main {
  position: relative;
  width: 100vw;
  height: 100vh;
  user-select: none;
  .login-background {
    text-align: center;
    .bg-img {
      width: 100vw;
      height: 100vh;
      object-fit: fill;
    }
    .bg-title {
      font-size: 28px;
      font-weight: bold;
    }
  }
  .login-container {
    position: absolute;
    right: 30px;
    top: 23%;
    border: 1px soild #eee;
    border-radius: 5px;
    box-shadow: 0 2px 4px 2px rgba(199, 199, 199, 0.4);
    background: #fff;
    width: 400px;
    height: 400px;
    padding: 20px;
    margin: 20px;
    .btn-container {
      .login-btn {
        width: 100%;
      }
      .tips {
        font-size: 14px;
        margin-top: 10px;
        margin-left: 10px;
        span {
          color: $base-color;
          cursor: pointer;
        }
      }
    }
  }
  .license {
    position: fixed;
    bottom: 5px;
    right: 5px;
    font-size: 12px;
    color: rgb(70, 70, 70);
  }
}
</style>
