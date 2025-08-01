<template>
  <div class="stores">


          <div class="flex sm:flex-row flex-col items-center w-full">
          <!--
                           Area for messages from back end
                           Currently conditional render based on error or warning
                       -->
          <div class="w-full min-h-24">
            <article class="m-2 px-12 py-4 border-l-4" v-bind:class="[isError ? 'bg-red-100 border-red-400 text-red-700' : 'bg-blue-100 border-blue-400 text-blue-800']">
              <div class="text-xl">
                {{message}}
              </div>
            </article>
          </div>
            <div class="flex justify-end">
              <button
                  type="button"
                  @click="onLogout"
                  class="w-16 h-16 text-white bg-link hover:bg-blue-800 rounded-full p-3 m-2"
                  title="Logout"
              >
                <i class="fa fa-lock fa-2x"></i>
              </button>
            </div>
          </div>
          <!-- First set of columns are the top form elements -->
            <div class="flex flex-col sm:flex-row">

                <!-- Form element to set locations -->
                <div class="w-1/2 border border-solid border-black m-2 p-2">
                    <h2 class="text-3xl text-center font-bold">Please, scan or click on Location</h2>
                    <form>
                      <div class="mb-3 px-2">
                            <label class="block text-gray-700">Location</label>
                            <input ref="location" type="text" class="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="location" v-on:keydown.enter="onLocationEnter" placeholder="Scan the location e.g. PICKING-POINT,  DEWAR-HOTEL or BEAMLINE">
                        </div>

                      <h2 class="text-3xl text-center font-bold">Please, scan dewar barcode</h2>
                        <div class="mb-3 px-2">
                            <label class="block text-gray-700">Barcode</label>
                            <input ref="barcode" type="text" class="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="barcode" v-on:keydown.enter="onBarcodeEnter" placeholder="Scan the QR code / barcode from the dewar case">
                        </div>

                        <!-- If location is STORES-IN do not show AWB field...
                        <div v-show="location.toUpperCase() != 'STORES-IN'" class="mb-3 px-2">
                            <label class="block text-gray-700">Airway Bill</label>
                            <input ref="awb" type="text" class="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="awb" v-on:keydown.enter="onAwbEnter" placeholder="Scan the DHL / FedEx Airway Bill">
                        </div> -->

                        <div class="flex">
                            <button type="submit" class="text-white bg-link hover:bg-blue-800 rounded p-1 m-2 w-1/2" v-on:click="onSetLocation">Submit</button>
                            <button type="cancel" class="text-white bg-info hover:bg-blue-600 rounded p-1 m-2 w-1/2"  v-on:click="onClearLocationForm">Cancel</button>
                        </div>

                      <h2 class="text-3xl text-center font-bold">Locations:</h2>
                      <br />
                      <div class="flex flex-col sm:flex-row">
                      <div class="w-1/2 mt-4">
                        <div class="flex-col text-center">
                          <div class="">
                            <img class="inline-block cursor-pointer" width=128 src='../assets/img/qr-picking-point.svg' @click="setLocation('PICKING-POINT')">
                          </div>
                          <p class="">PICKING-POINT</p>
                        </div>
                      </div>
                      <div class="w-1/2 mt-4">
                        <div class="flex-col text-center">
                          <div class="">
                            <img class="inline-block cursor-pointer" width=128 src='../assets/img/qr-dewar-hotel.svg' @click="setLocation('DEWAR-HOTEL')">
                          </div>
                          <p class="">DEWAR-HOTEL</p>
                        </div>
                      </div>
                      <div class="w-1/2 mt-4">
                        <div class="flex-col text-center">
                          <div class="">
                            <img class="inline-block cursor-pointer" width=128 src='../assets/img/qr-beamline.svg' @click="setLocation('BEAMLINE')">
                          </div>
                          <p class="">BEAMLINE</p>
                        </div>
                      </div>
                      </div> <!-- END STORES LOCATIONS -->
                    </form>
                </div>

              <div class="w-1/2 border border-solid border-black m-2 p-2 ">
                <section>
                  <h2 class="text-3xl text-center font-bold py-2">Find a Dewar</h2>
                  <form>
                    <div class="mb-3 px-2">
                      <label class="block text-gray-700">BarCode</label>
                      <input type="text" class="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="barcode" placeholder="e.g. DLS-MX-####">
                    </div>
                    <div class="flex">
                      <button type="submit" class="text-white bg-link hover:bg-blue-800 rounded p-1 m-2 w-1/2" v-on:click="getDewars(barcode, $event)">Search</button>
                      <button type="submit" class="text-white bg-info hover:bg-blue-600 rounded p-1 m-2 w-1/2" v-on:click="onClearFindForm">Cancel</button>
                    </div>
                  </form>
                </section>


                <!-- Display the stores history -->
                <div class="flex flex-col m-2 p-2">
                  <h1 class="text-3xl font-bold text-center p-4">History</h1>
                  <table class="border border-solid bg-white w-full">
                    <thead class="text-left bg-white-300 font-bold border border-solid">
                    <th class="border px-3 py-2">Date/Time</th><th class="border px-3 py-2">Barcode</th><th class="border px-3 py-2">Location</th><th class="border px-3 py-2">Status</th>
                    </thead>
                    <tbody class="">
                    <tr v-for="(dewar, index) in dewars" v-bind:key="index" class="hover:bg-blue-200">
                      <td class="p-2 border">{{dewar.date}}</td>
                      <td class="p-2 border">{{dewar.barcode.toUpperCase()}}</td>
                      <td class="p-2 border">{{dewar.storageLocation.toUpperCase()}}</td>
                      <td class="p-2 border">{{dewar.destination}}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>


            </div> <!-- End of columns -->

        <footer class="py-4">
            <!-- Only here to provide some padding -->
          {{scanBuffer}}
        </footer>
  </div>
</template>

<script>
// Importing axios so we can cancel requests
import {Howl} from 'howler'

export default {
  name: 'stores',
    data() {
      return {
        // Array for dewar history
        dewars: [],
        // Data elements for form input
        barcode: '',
        scanBuffer: '',
        location: '',
        awb: '',
        // Error message on find dewar, set location etc
        // isError if actual error, info otherwise
        message: "",
        isError: false,
        isFormOK: true,
        clearMessageInterval: 6, // Message interval in seconds
        logoutTimeout: null,
        refreshInterval: 3600*1000, // Page Refresh interval in milliseconds (i.e. every hour)
      }
    },
    // Initialize the sound library and files
    created: function() {
      const base = this.$router.options.base || ''

        this.sounds = {}
        this.sounds.success = new Howl({
            src: [`${base}/static/audio/success.mp3`, `${base}/static/audio/success.wav`]
        });
        this.sounds.fail = new Howl({
            src: [`${base}/static/audio/fail.mp3`, `${base}/static/audio/fail.wav`]
        });
    },
    // Lifecycle hook - called when Vue is mounted on the page...
    mounted: function() {
        console.log("UI for Store page is mounted")

        // When page is loaded set focus to the input location element
        this.$refs.location.focus();

      window.addEventListener('keydown', this.onKeyDown)

      this.logoutTimeout =  setTimeout(() => {
        this.$router.push('/');
      }, this.refreshInterval)
    },
    beforeDestroy() {
      console.log("UI for Store page is destroyed")
      window.removeEventListener('keydown', this.onKeyDown)
      if(this.logoutTimeout)
        clearTimeout(this.logoutTimeout)
    },
    watch: {
        message: function(val) {
            if (val !== "") {
                console.log("Clear message after " + this.clearMessageInterval + " s ")
                setTimeout(this.clearMessages, this.clearMessageInterval*1000)
            }
        }
    },
    methods: {
        refresh: function() {
            // window.localStorage.setItem('location', this.location)
            // We don't need to reload the page - just request an update from the server
            this.getDewars(barcode)
        },
      onLogout: function(){
          this.$router.push('/');
      },
      //action=setLocation&value=XXX
      onKeyDown: function(e) {
        if (e.key === 'Enter') {
          // process the scan
          const message = this.scanBuffer;
          this.processScan(message)
          this.scanBuffer = ''
        } else {
          // accumulate characters
          if (e.key.length === 1) {
            this.scanBuffer += e.key
          }
        }
      },
      processScan: function(message){
        // Match: action=<something>&value=<something>
        // Captures: group 1 = action, group 2 = value
        const match = message.match(/^action=([^&]+)&value=(.+)$/);
        if (match) {
          const action = match[1];
          const value = match[2];

          if (action === 'setLocation') {
            this.location = value;
          } else {
            console.warn('Unknown scan action:', action);
          }
        } else {
          // No action/value pattern → treat as plain barcode
          this.barcode = message;
        }
      },

        // Main method that retrieves dewar history from database
        getDewars: async function(barcode, event) {
          event.preventDefault()
          let self = this
          self.dewars = []


          const token = this.$store.getters['auth/token'];
          const url = `/ispyb/ispyb-ws/rest/${token}/dewar/${barcode}/history`

          try {
            const response = await this.$http.get(url);
            const dewars = response.data;

            dewars.forEach(dewar => {
              self.dewars.push(dewar)
            })

            self.playSuccess()
            self.message = "Found transport history for Dewar[" + barcode + "]"
            self.isError = false

          } catch(error){
            console.log("Error getting initial data")
            self.playFail();
            self.message = "No data found for Dewar[" + barcode + "] due to " + error.message
            self.isError = true
          }
        },
      setLocation: function(location){
          this.location = location;
      },

        // Method to update dewar location in database
        onSetLocation: async function(event) {
            console.log("onSetLocation")
            event.preventDefault()

            let self = this
            let validLocation = this.isValidLocation(this.location)

            if (this.barcode && this.location && validLocation) {
                const barcode = this.barcode
                const location = this.location
                const username = this.$store.getters['auth/currentUser'] // user name

                let formData = new FormData();
                formData.append('barCode', barcode)
                formData.append('location', location)
                formData.append('username', username)

              const token = this.$store.getters['auth/token'];
              const url = `/ispyb/ispyb-ws/rest/${token}/dewar/location`;
              try {
                await this.$http.post(url, formData, {
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                  }
                }); // goes to api/stores/routes.py or to Java server
                self.playSuccess()
                console.log("onSetLocation, Stores.vue")

                self.message = "Updated " + barcode + " to " + location
                self.isError = false

                // Request updated locations from DB
                await self.getDewars(barcode, event)
              } catch(error){
                console.log(error)
                self.message = "Error updating " + barcode + " to " + location
                self.isError = true
                self.playFail();
              } finally {
                // Set focus to barcode (likely to want to reuse location)
                this.$refs.barcode.focus()
                // Rest form values (Keep location element as is)
                this.barcode = ''
                this.awb = ''
              }
            } else {
                this.message = "Issue with form: "
                this.isError = true
                if (this.barcode === "") {
                    this.message += " no barcode provided..."
                }
                if (this.location === "") {
                    this.message += ' no location provided...'
                } else if (!validLocation) {
                    this.message += ' location not valid for this application...'
                }
            }
        },

      onClearFindForm: function(event) {
        event.preventDefault()
        this.barcode = ''
      },

        // Reset Form fields
        onClearLocationForm: function(event) {
            event.preventDefault()
            this.barcode = ''
            this.location = ''
            this.awb = ''
            // When form is cleared, set focus to the input location element
            this.$refs.location.focus();
        },
        // Get the intended courier destination
        // Currently only implemented for DHL but could be extended on backend
        onGetCourierDestination: function(dewar) {
            let url = this.$store.state.apiRoot + "stores/dewars/courier/destination"
            let theDewar = dewar
            // Set a flag on the dewar to indicate we are retrieving the courier destination
            theDewar.hover = true

            this.$http.get(url, {params: {'awb':dewar.awb}})
            .then(function(response) {
                // It's possible we have moved off the dewar link, in which case ignore the response
                if (theDewar.hover) {
                    let json = response.data
                    theDewar.courierDestination = json.value
                }
            }).catch(function(error) {
                console.log(error)
            })
        },
        onResetCourierDestination: function(dewar) {
            // Its possible we have left before the api call returns.
            if (dewar.courierDestination) {
                dewar.courierDestination = ''
            }
            // Reset the "hover" tag
            dewar.hover = false
        },
        // Clear error/info messages in one go
        clearMessages: function() {
          this.message = ""
          this.isError = false
        },
        // Internal validation method - check for DHL Airway Bill
        isDHL: function(awb) {
            let pattern1 = /^[0-9]{10}$/
            let pattern2 = /^JJ?D[0-9]{18}$/

            if (pattern1.test(awb) || pattern2.test(awb)) {
                return true
            } else {
                return false
            }
        },
        // Internal validation method - check for FedEx Airway Bill
        isFedex: function(awb) {
            // In future Fedex will only be 34 characters...
            // For now we need to accommodate 16 digits too
            let pattern1 = /^[0-9]{16}$/
            let pattern2 = /^[0-9]{34}$/

            if (pattern1.test(awb) || pattern2.test(awb)) {
                return true
            } else {
                return false
            }
        },
        // Validation method - used to determine value saved in ISPyB is Fedex
        isFedexDatabaseRecord: function(awb) {
            // In future we could check against delivery agent
            let pattern = /^[0-9]{14}$/

            if (pattern.test(awb)) {
                return true
            } else {
                return false
            }
        },
        // Method to return a tracking number for FedEx barcodes
        // New codes are 34 characters long but only the last 14 digits are the tracking number
        // Updated to handle legacy case where 16 digit code provided
        getFedexTrackingNumber: function(fedex_awb) {
            let result = fedex_awb

            if (fedex_awb.length === 16) {
                result = '00'+fedex_awb.slice(0,12)
            } else if (fedex_awb.length === 34) {
                result = fedex_awb.slice(-14)
            } else {
                console.log("Error - invalid fedex tracking code provided")
            }
            return result
        },
        // Internal validation method - check for valid location (stores in or out)
        isValidLocation: function(location) {
            if (location.toUpperCase() === "PICKING-POINT" || location.toUpperCase() === "DEWAR-HOTEL" || location.toUpperCase() === "BEAMLINE") {
                return true;
            } else {
                return false;
            }
        },

        // Prevent form submission and move focus to next form element
        onLocationEnter: function(event) {
            event.preventDefault()
            this.$refs.barcode.focus()
        },

        // Prevent form submission and move focus to next form element
        onBarcodeEnter: function(event) {
            event.preventDefault()

            if (this.isValidLocation(this.barcode)) {
                // Then user has entered barcode info here accidentally
                this.location = this.barcode
                this.barcode = ''
                this.$refs.barcode.focus()
            } else {
                if (this.location.toUpperCase() === 'STORES-IN') {
                    // In this case we submit the form
                    this.onSetLocation(event)
                } else {
                    this.$refs.awb.focus()
                }
            }
        },
        // Prevent form submission unless form conditions met
        onAwbEnter: function(event) {
            event.preventDefault()

            if (this.isValidLocation(this.awb)) {
                this.location = this.awb
                this.awb = ''
                this.$refs.barcode.focus()
            } else {
                if (this.barcode && this.location) {
                    // Try to submit form
                    this.onSetLocation(event)
                }
            }
        },
        // Audio feedback methods
        playSuccess: function() {
            console.log("HAPPY BEEPS")
            this.sounds.success.play()
        },
        playFail: function() {
            console.log("SAD BEEPS")
            this.sounds.fail.play()
        },
    }
}
</script>


<!-- Small style changes to override default table colours -->
<style>
tr:nth-child(even) {
  @apply bg-blue-100;
}
</style>
