<template>
  <div class="login-wrapper">
    <div :class="['login-form', { 'login-form__signup': signup }]">
      <div class="form sign-in">
        <h2>欢迎回来</h2>
        <label>
          <span>账号</span>
          <el-input placeholder="请输入账号" v-model="loginForm.username" clearable />
        </label>
        <label>
          <span>密码</span>
          <el-input type="password" v-model="loginForm.password" clearable />
        </label>
        <p class="forgot-pass"><a href="javascript:">忘记密码？</a></p>
        <button type="button" class="submit">登 录</button>
        <button type="button" class="fb-btn">使用 <span>微信</span> 帐号登录</button>
      </div>

      <div class="sub-content">
        <div class="img">
          <div class="img__text img__text__up">
            <h2>还未注册？</h2>
            <p>立即注册，开启心动之旅！</p>
          </div>
          <div class="img__text img__text__in">
            <h2>已有帐号？</h2>
            <p>有帐号就登录吧，好久不见了！</p>
          </div>
          <div class="img__btn" @click="handleChangeLoginStatus">
            <span class="btn_up">注 册</span>
            <span class="btn_in">登 录</span>
          </div>
        </div>
        <div class="form sign-up">
          <h2>立即注册</h2>
          <label>
            <span>用户名</span>
            <input type="text" />
          </label>
          <label>
            <span>邮箱</span>
            <input type="email" />
          </label>
          <label>
            <span>密码</span>
            <input type="password" />
          </label>
          <button type="button" class="submit">注 册</button>
          <button type="button" class="fb-btn">使用 <span>facebook</span> 帐号注册</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Login',
  props: {},
  setup() {
    const signup = ref(false)
    const loginForm = ref({
      username: '',
      password: '',
    })
    const signupForm = ref({
      username: '',
      password: '',
      submitPassword: '',
    })
    const handleChangeLoginStatus = () => {
      signup.value = !signup.value
    }
    return {
      handleChangeLoginStatus,
      signup,
      loginForm,
      signupForm,
    }
  },
})
</script>
<style lang="scss" scoped>
.login-wrapper {
  width: 100%;
  height: 100%;
  background-color: rgb(237, 237, 237);
}
.login-form {
  overflow: hidden;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 900px;
  height: 550px;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 4px;

  .form {
    position: relative;
    width: 640px;
    height: 100%;
    transition: transform 0.6s ease-in-out;
    padding: 50px 30px 0;

    input,
    button {
      border: none;
      outline: none;
      background: none;
    }

    button {
      display: block;
      margin: 0 auto;
      width: 260px;
      height: 36px;
      border-radius: 30px;
      color: #fff;
      font-size: 15px;
      cursor: pointer;
    }

    h2 {
      width: 100%;
      font-size: 26px;
      text-align: center;
    }

    label {
      display: block;
      width: 260px;
      margin: 25px auto 0;
      text-align: center;
      span {
        font-size: 12px;
        color: #909399;
        text-transform: uppercase;
      }
    }

    input {
      display: block;
      width: 100%;
      margin-top: 5px;
      padding-bottom: 5px;
      font-size: 16px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.4);
      text-align: center;
    }

    .forgot-pass {
      margin-top: 15px;
      text-align: center;
      font-size: 12px;
      color: #cfcfcf;
      a {
        color: #cfcfcf;
      }
    }

    .submit {
      margin-top: 40px;
      margin-bottom: 20px;
      background: #d4af7a;
      text-transform: uppercase;
    }

    .fb-btn {
      border: 2px solid #d3dae9;
      color: #8fa1c7;
      span {
        font-weight: bold;
        color: #455a81;
      }
    }
  }

  .sign-up {
    transform: translate3d(-900px, 0, 0);
  }
  .sign-in {
    transition-timing-function: ease-out;
  }

  .sub-content {
    overflow: hidden;
    position: absolute;
    left: 640px;
    top: 0;
    width: 900px;
    height: 100%;
    background: #fff;
    transition: transform 0.6s ease-in-out;

    .img {
      overflow: hidden;
      z-index: 2;
      position: absolute;
      left: 0;
      top: 0;
      width: 260px;
      height: 100%;
      padding-top: 360px;
      &::before {
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        width: 900px;
        height: 100%;
        background-image: url(@/assets/images/login-bg.jpg);
        background-size: cover;
        transition: transform 0.6s ease-in-out;
      }
      &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
      }
    }
  }

  .img__text {
    z-index: 2;
    position: absolute;
    left: 0;
    top: 50px;
    width: 100%;
    padding: 0 20px;
    text-align: center;
    color: #fff;
    transition: transform 0.6s ease-in-out;
    h2 {
      margin-bottom: 10px;
      font-weight: normal;
    }
    p {
      font-size: 14px;
      line-height: 1.5;
    }
    &__in {
      transform: translateX(-520px);
    }
  }
  .img__btn {
    overflow: hidden;
    z-index: 2;
    position: relative;
    width: 100px;
    height: 36px;
    margin: 0 auto;
    background: transparent;
    color: #fff;
    text-transform: uppercase;
    font-size: 15px;
    cursor: pointer;
    &::after {
      content: '';
      z-index: 2;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border: 2px solid #fff;
      border-radius: 30px;
    }
    span {
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      transition: transform 0.6s;
      &.btn_up {
        transform: translateY(0);
      }
      &.btn_in {
        transform: translateY(-72px);
      }
    }
  }

  &__signup {
    .sub-content {
      transform: translate3d(-640px, 0, 0);
    }
    .sign-up {
      transform: translate3d(260px, 0, 0);
    }
    .sign-in {
      transition-timing-function: ease-in-out;
      transition-duration: 0.6s;
      transform: translate3d(640px, 0, 0);
    }
    .img::before {
      transform: translate3d(640px, 0, 0);
    }
    .img__text {
      &__up {
        transform: translateX(520px);
      }
      &__in {
        transform: translateX(0);
      }
    }
    .img__btn span {
      &.btn_in {
        transform: translateY(0);
      }
      &.btn_up {
        transform: translateY(-72px);
      }
    }
  }
}
/* 利用穿透，设置input边框隐藏 */
:deep(.el-input__wrapper) {
  box-shadow: 0 0 0 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 0;
}
:deep(.el-input__inner) {
  box-shadow: 0 0 0 0px;
  text-align: center;
}
:deep(.el-input__inner:hover) {
  box-shadow: 0 0 0 0px;
}
:deep(.el-input__inner:focus) {
  box-shadow: 0 0 0 0px;
}
</style>
