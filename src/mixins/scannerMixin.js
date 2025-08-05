export default {
    data() {
        return {
            scanBuffer: ''
        }
    },
    methods: {
        onKeyDown(e) {
            if (e.key === 'Enter') {
                const message = this.scanBuffer
                this.scanBuffer = ''
                this.processScan(message) // expects component to have processScan()
            } else if (e.key.length === 1) {
                this.scanBuffer += e.key
            }
        },
        processScan: function(message){
            // Match: action=<something>&value=<something>
            // Captures: group 1 = action, group 2 = value
            const match = message.match(/^action=([^&]+)&value=(.+)$/);
            if (match) {
                const action = match[1];
                const value = match[2];

                switch(action){
                    case 'location':
                        this.setLocation(value);
                        break;
                    case 'login':
                        this.doLogin(value);
                        break;
                    case 'logout':
                        this.doLogout();
                        break;
                    case 'submit':
                        this.onSetLocation();
                        break;
                    case 'cancel':
                        this.onClearLocationForm();
                        break;
                    default:
                    console.warn('Unknown scan action:', action);
                }
            } else {
                // No action/value pattern → treat as plain barcode
                this.setBarcode(message);
            }
        }
    },
    mounted() {
        window.addEventListener('keydown', this.onKeyDown)
    },
    beforeDestroy() {
        window.removeEventListener('keydown', this.onKeyDown)
    }
}