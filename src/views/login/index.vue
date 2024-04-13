<template>
  <div class="login-wrapper flex">
    <div class="container relative h-full py-2 mx-auto sm:px-10 flex">
      <div class="flex flex-col justify-center mt-auto mb-auto">
        <!-- 平台名称 -->
        <div class="text-white text-3xl -mt-20 mb-15">
          {{ platformInfo.title }}
        </div>
        <img src="@/assets/login-img.png" class="w-1/2" />
        <!-- 平台描述 -->
        <div class="text-white mt-10">
          {{ platformInfo.description }}
        </div>
      </div>
      <div class="login-form py-2 mx-auto my-auto">
        <h2>{{ t('login') }}</h2>
        <el-form
          ref="loginFormRef"
          :model="ruleForm"
          :rules="rules"
          class="w-100"
        >
          <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input
              v-model="ruleForm.username"
              :placeholder="t('username')"
              clearable
            >
              <template #prefix>
                <Icon icon="ep-user" />
              </template>
            </el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              v-model="ruleForm.password"
              type="password"
              :placeholder="t('password')"
              clearable
            >
              <template #prefix>
                <Icon icon="ep-lock" />
              </template>
            </el-input>
          </el-form-item>
          <!-- 验证码 -->
          <el-form-item prop="captcha">
            <div class="flex w-full items-center justify-between">
              <el-input
                v-model="ruleForm.captcha"
                :placeholder="t('captcha')"
                clearable
              >
                <template #prefix>
                  <Icon icon="ep-position" />
                </template>
              </el-input>
              <!-- 验证码，后续通过接口获取，使用image标签展示 -->
              <el-button class="ml-4">
                {{ captchaCode }}
              </el-button>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="w-full"
              :loading="loading"
              @click="submitForm"
            >
              {{ t('login') }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { Icon } from '@iconify/vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
// TODO 调用登录接口
// import { login } from '@/api/login';

export default defineComponent({
  name: 'Login',
  components: { Icon },
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const platformInfo = ref({
      title: 'Vue Admin',
      description: '开箱即用的后台管理框架：vue3+ts+vite5+pina',
    });
    const loginFormRef = ref<FormInstance>();
    // TODO 默认验证码，后续通过接口获取
    const captchaCode = ref('1234');
    const ruleForm = reactive({
      username: 'admin',
      password: '123456',
      captcha: '1234',
    });
    const rules = reactive<FormRules<typeof ruleForm>>({
      // 请输入用户名
      username: [
        { required: true, message: t('pleaseInputUsername'), trigger: 'blur' },
      ],
      // 请输入密码
      password: [
        { required: true, message: t('pleaseInputPassword'), trigger: 'blur' },
      ],
      // 请输入验证码
      captcha: [
        { required: true, message: t('pleaseInputCaptcha'), trigger: 'blur' },
      ],
    });
    const loading = ref(false);

    const submitForm = () => {
      if (!loginFormRef.value) {
        return;
      }
      loading.value = true;
      loginFormRef.value.validate((valid) => {
        if (valid) {
          // TODO 调用后端登录逻辑，将登录信息缓存起来备用
          // login(ruleForm).then((res) => {
          //   console.log(res);
          // });
          // 模拟登录loading
          setTimeout(() => {
            loading.value = false;
            router.push({ name: 'Home' });
          }, 1000);
        } else {
          loading.value = false;
          return false;
        }
      });
    };
    return {
      t,
      platformInfo,
      loginFormRef,
      ruleForm,
      rules,
      captchaCode,
      loading,
      submitForm,
    };
  },
});
</script>
<style lang="scss" scoped>
.login-wrapper {
  width: 100%;
  height: 100%;
  min-height: 100%;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin-left: -48%;
    background: url('@/assets/login-bg.svg') no-repeat center;
    background-size: auto 100%;
    background-position: 100%;
  }

  .login-form {
    border: 1px solid var(--next-color-primary);
    border-radius: 8px;
    padding: 2rem;
  }
}
</style>
<i18n>
  zh-cn:
    login: 登录
    username: 用户名
    password: 密码
    captcha: 验证码
    pleaseInputUsername: 请输入用户名
    pleaseInputPassword: 请输入密码
    pleaseInputCaptcha: 请输入验证码
    
  en:
    login: Login
    username: Username
    password: Password
    captcha: Captcha
    pleaseInputUsername: Please input username
    pleaseInputPassword: Please input password
    pleaseInputCaptcha: Please input captcha
</i18n>
