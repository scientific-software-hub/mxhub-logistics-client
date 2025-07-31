<template>
  <div class="scanner-page">
    <h2>Scan Your Badge</h2>
<!--    class="hidden-input"-->
    <input
        ref="scannerInput"
        v-model="scanInput"
        @keyup.enter="onScan"

        autofocus
    />
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="loading">Logging in...</p>
  </div>
</template>

<script>
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
    this.$refs.scannerInput.focus()
  },
  methods: {
    onScan: async function() {
      try {
        //action=login&username=alice&password=secret123
        const parsed = new URLSearchParams(this.scanInput.trim())
        if (parsed.get('action') !== 'login') throw new Error('Invalid action')

        const login = parsed.get('username')
        const password = parsed.get('password')

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