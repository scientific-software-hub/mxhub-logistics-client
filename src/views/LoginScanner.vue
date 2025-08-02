<template>
  <div class="scanner-page">
    <h1 class="text-4xl text-center font-bold mb-6">Welcome to P11 Dewar Scanning Point</h1>

    <div class="logo-container mb-8 text-center">
      <img
          src="../assets/img/Desy_logo_3c_web.svg"
          alt="Company Logo"
          class="mx-auto max-w-xs h-auto"
      />
    </div>

    <h2 class="text-3xl text-center font-bold">Please Scan Your Badge...</h2>
<!--    class="hidden-input"-->
    <input
        ref="scannerInput"
        v-model="scanInput"
        @keyup.enter="onScan"
        class="hidden-input"
        autofocus
    />
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="loading">Logging you in! Have a great day!</p>
  </div>
</template>

<script>
import scannerMixin from "@/mixins/scannerMixin";

export default {
  name: 'LoginScanner',
  data() {
    return {
      scanInput: '',
      error: '',
      loading: false,
    }
  },
  mounted() {
    // this.$refs.scannerInput.focus()
  },
  mixins: [scannerMixin],
  methods: {
    doLogin: async function(value) {
      try {
        //action=login&value=alice:ispyb
        const [ login, password ] = value.split(":");

        if (!login || !password) throw new Error('Missing credentials')

        this.error = ''
        this.loading = true

        await this.$store.dispatch('auth/loginViaQr', { login, password })

        this.$router.push('/dashboard')
      } catch (err) {
        this.error = err.message || 'Login failed'
      } finally {
        this.scanInput = '' // clear input
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.hidden-input {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 1px;
  width: 1px;
}
.scanner-page {
  text-align: center;
  margin-top: 5rem;
}
.error {
  color: red;
  margin-top: 1rem;
}
</style>